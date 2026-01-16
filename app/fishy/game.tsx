// components/CanvasGameStructured.tsx
'use client';

import { RefObject, useCallback, useEffect, useRef } from 'react';

const normal = require('@stdlib/random-base-normal');
const rand = normal.factory(1, 0.5);
const randomNum = (average: number, min: number) => {
    return Math.max(min, rand() * average);
};

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const VIBRANT_COLORS = [
    '#FF6B6B', // Coral Red
    '#4ECDC4', // Tiffany Blue
    '#FFD166', // Sunshine Yellow
    '#06D6A0', // Emerald Green
    '#118AB2', // Ocean Blue
    '#EF476F', // Hot Pink
    '#073B4C', // Deep Teal
    '#FF9E6D', // Peach
    '#7209B7', // Electric Purple
    '#3A86FF', // Bright Blue
    '#FB5607', // Vivid Orange
    '#8338EC', // Vibrant Purple
    '#FF006E', // Magenta
    '#FFBE0B', // Golden Yellow
    '#3A86FF', // Azure Blue
    '#FB5607', // Tangerine
    '#8338EC', // Amethyst
    '#FF006E', // Raspberry
    '#FF9E00', // Amber
    '#38B000', // Lime Green
] as const;

type Direction = {
    array: number[];
    name: string;
    controls: string[];
};

const Directions: Direction[] = [
    {
        array: [0, -1],
        name: 'UP',
        controls: ['w', 'arrowup'],
    },
    {
        array: [0, 1],
        name: 'DOWN',
        controls: ['s', 'arrowdown'],
    },
    {
        array: [-1, 0],
        name: 'LEFT',
        controls: ['a', 'arrowleft'],
    },
    {
        array: [1, 0],
        name: 'RIGHT',
        controls: ['d', 'arrowright'],
    },
];

const accelerationPixelsPerSecond = 400;
const declerationMultiplierPerSecond = 0.4;
const decelerationStaticPixelsPerSecond = 5;

const fishEyeWidth = 0.25;
const fishEyeHeight = 0.4;
const fishEyeXPosition = 0.12;

type FishProps = {
    x: number;
    y: number;
    x_velocity: number;
    y_velocity: number;
    size: number;
    color?: string;
    isPlayer?: boolean;
};

class Fish {
    private x: number;
    private y: number;
    private x_velocity: number;
    private y_velocity: number;
    private size: number;
    private color: string;
    private facingRight: boolean;
    private isPlayer: boolean;

    constructor(props: FishProps) {
        this.x = props.x;
        this.y = props.y;
        this.x_velocity = props.x_velocity;
        this.y_velocity = props.y_velocity;
        this.color = props.color ?? VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)];
        this.size = props.size;
        this.isPlayer = props.isPlayer ?? false;
        this.facingRight = this.x_velocity >= 0 ? true : false;
    }

    get width() {
        return this.size;
    }

    get height() {
        return this.size * 0.675;
    }

    get shouldDespawn() {
        return Math.sign(this.x_velocity) === 1 ? this.x > CANVAS_WIDTH : this.x + this.size < 0;
    }

    public overlapWithFish(fish: Fish) {
        return false;
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#000000';
        ctx.fillRect(
            this.x + this.width * (this.facingRight ? 1 - fishEyeXPosition - fishEyeWidth : fishEyeXPosition),
            this.y + this.height * (1 - fishEyeHeight * 2),
            this.width * fishEyeWidth,
            this.height * fishEyeHeight,
        );
    }

    public update(updateTimeMilliseconds: number, keysPressedRef?: RefObject<Set<string>>) {
        const updateSeconds = updateTimeMilliseconds / 1000;

        if (this.isPlayer) {
            if (keysPressedRef == null) throw new Error('No keys pressed passed in for player');

            const keys = keysPressedRef.current;
            const directionIsPressed = (dir: Direction) =>
                dir.controls.some((control) => keysPressedRef.current.has(control));

            Directions.forEach((dir) => {
                if (directionIsPressed(dir)) {
                    this.x_velocity += dir.array[0] * accelerationPixelsPerSecond * updateSeconds;
                    this.y_velocity += dir.array[1] * accelerationPixelsPerSecond * updateSeconds;

                    if (dir.array[0] == 1) this.facingRight = true;
                    if (dir.array[0] == -1) this.facingRight = false;
                }
            });

            const multiplier = declerationMultiplierPerSecond ** updateSeconds;

            this.x_velocity *= multiplier;
            this.y_velocity *= multiplier;

            this.x_velocity -=
                Math.min(decelerationStaticPixelsPerSecond * updateSeconds, Math.abs(this.x_velocity)) *
                Math.sign(this.x_velocity);
            this.y_velocity -=
                Math.min(decelerationStaticPixelsPerSecond * updateSeconds, Math.abs(this.y_velocity)) *
                Math.sign(this.y_velocity);
        }

        this.x += this.x_velocity * updateSeconds;
        this.y += this.y_velocity * updateSeconds;
    }
}

type GameState = {
    player: Fish;
    fish: Fish[];
};

const STARTING_GAME_STATE: GameState = {
    player: new Fish({
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        x_velocity: 0,
        y_velocity: 0,
        color: '#ff9900',
        size: 25,
        isPlayer: true,
    }),
    fish: [],
};

class GameManager {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gameStateRef: RefObject<GameState>;
    private animationRef: RefObject<number>;
    private keysPressedRef: RefObject<Set<string>>;
    private timeOfLastUpdate: Date;
    private updateTimeIntervalMilliseconds: number;

    constructor(
        gameStateRef: RefObject<GameState>,
        canvasRef: RefObject<HTMLCanvasElement | null>,
        animationRef: RefObject<number>,
        keysPressedRef: RefObject<Set<string>>,
    ) {
        this.gameStateRef = gameStateRef;
        this.animationRef = animationRef;
        this.keysPressedRef = keysPressedRef;

        const canvas = canvasRef.current;
        if (!canvas) throw new Error('Canvas is null');
        this.canvas = canvas;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Context is null');
        this.ctx = ctx;

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        this.timeOfLastUpdate = new Date();
        this.updateTimeIntervalMilliseconds = 0;
    }

    public restart() {
        this.gameStateRef.current = STARTING_GAME_STATE;
        return this.gameStateRef;
    }

    public render() {
        const state = this.gameStateRef.current;

        this.ctx.fillStyle = 'rgba(0, 110, 255)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        state.fish.forEach((fish) => fish.render(this.ctx));
        state.player.render(this.ctx);
    }

    public checkCollisions() {
        //
    }

    public spawnFish() {
        const maxFish = 30;
        const chanceOfFishSpawningPerSecond =
            ((maxFish - this.gameStateRef.current.fish.length) * this.updateTimeIntervalMilliseconds) / 10000;

        // console.log(this.gameStateRef.current.fish.length);
        if (Math.random() > chanceOfFishSpawningPerSecond) return;

        const size = randomNum(30, 5);
        const side = Math.random() > 0.5 ? 'LEFT' : 'RIGHT';
        const x = side === 'LEFT' ? -1 * size : CANVAS_WIDTH + size;
        const y = Math.random() * (CANVAS_HEIGHT - size);
        const x_velocity = randomNum(70, 30) * (side === 'RIGHT' ? -1 : 1);

        this.gameStateRef.current.fish.push(
            new Fish({
                x: x,
                y: y,
                x_velocity: x_velocity,
                y_velocity: 0,
                size: size,
            }),
        );
    }

    public update() {
        const state = this.gameStateRef.current;

        const newUpdateTime = new Date();
        this.updateTimeIntervalMilliseconds = newUpdateTime.getTime() - this.timeOfLastUpdate.getTime();

        state.fish.forEach((fish) => fish.update(this.updateTimeIntervalMilliseconds));
        state.fish = state.fish.filter((fish) => !fish.shouldDespawn);
        state.player.update(this.updateTimeIntervalMilliseconds, this.keysPressedRef);

        state.player;

        this.checkCollisions();
        this.spawnFish();

        this.timeOfLastUpdate = newUpdateTime;
    }

    public start() {
        this.animationRef.current = requestAnimationFrame(this.gameLoop.bind(this));
    }

    public gameLoop() {
        this.update();
        this.render();
        this.animationRef.current = requestAnimationFrame(this.gameLoop.bind(this));
    }

    public cancelAnimiation() {
        cancelAnimationFrame(this.animationRef.current);
    }
}

export default function FishyGameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameStateRef = useRef<GameState>(STARTING_GAME_STATE);
    const animationRef = useRef<number>(0);
    const keysPressedRef = useRef<Set<string>>(new Set());

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        keysPressedRef.current.add(e.key.toLowerCase());
    }, []);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        keysPressedRef.current.delete(e.key.toLowerCase());
    }, []);

    useEffect(() => {
        const manager = new GameManager(gameStateRef, canvasRef, animationRef, keysPressedRef);
        if (manager == null) return;

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        manager.restart();
        manager.start();

        return () => {
            manager?.cancelAnimiation();

            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return <canvas ref={canvasRef} className="border border-gray-700 rounded-lg shadow-lg" />;
}
