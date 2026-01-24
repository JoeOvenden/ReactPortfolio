// components/CanvasGameStructured.tsx
'use client';

import { RefObject, useCallback, useEffect, useRef } from 'react';
import GameManager from '../canvas_games/GameManager';

const normal = require('@stdlib/random-base-normal');
const rand = normal.factory(1, 0.5);
const randomNum = (average: number, min: number) => {
    return Math.max(min, rand() * average);
};

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const ORANGE = '#ff9900';

const VIBRANT_COLORS = [
    '#FF6B6B', // Coral Red
    '#4ECDC4', // Tiffany Blue
    '#FFD166', // Sunshine Yellow
    '#06D6A0', // Emerald Green
    '#EF476F', // Hot Pink
    '#073B4C', // Deep Teal
    '#FF9E6D', // Peach
    '#7209B7', // Electric Purple
    '#FB5607', // Vivid Orange
    '#8338EC', // Vibrant Purple
    '#FF006E', // Magenta
    '#FFBE0B', // Golden Yellow
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

const between = (x: number, a: number, b: number) => {
    const smaller = Math.min(a, b);
    const larger = Math.max(a, b);
    return x >= smaller && x <= larger;
};

class Rect {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    get area() {
        return this.width * this.height;
    }

    private get x2() {
        return this.x + this.width;
    }

    private get y2() {
        return this.y + this.height;
    }

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public move(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public overlaps(rect: Rect) {
        if (between(this.x, rect.x, rect.x2) && between(this.y, rect.y, rect.y2)) return true;
        if (between(this.x, rect.x, rect.x2) && between(this.y2, rect.y, rect.y2)) return true;
        if (between(this.x2, rect.x, rect.x2) && between(this.y, rect.y, rect.y2)) return true;
        if (between(this.x2, rect.x, rect.x2) && between(this.y2, rect.y, rect.y2)) return true;

        if (between(rect.x, this.x, this.x2) && between(rect.y, this.y, this.y2)) return true;
        if (between(rect.x, this.x, this.x2) && between(rect.y2, this.y, this.y2)) return true;
        if (between(rect.x2, this.x, this.x2) && between(rect.y, this.y, this.y2)) return true;
        if (between(rect.x2, this.x, this.x2) && between(rect.y2, this.y, this.y2)) return true;
    }
}

const accelerationPixelsPerSecond = 500;
const declerationMultiplierPerSecond = 0.4;
const decelerationStaticPixelsPerSecond = 5;
const bounceSpeedProportion = 0.2;

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
    private x_velocity: number;
    private y_velocity: number;
    private color: string;
    private facingRight: boolean;
    private isPlayer: boolean;
    private rect: Rect;
    static readonly SIZE_RATIO: number = 0.675;

    constructor(props: FishProps) {
        this.x_velocity = props.x_velocity;
        this.y_velocity = props.y_velocity;
        this.color = props.color ?? VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)];
        this.isPlayer = props.isPlayer ?? false;
        this.facingRight = this.x_velocity >= 0 ? true : false;
        this.rect = new Rect(props.x, props.y, props.size, props.size * Fish.SIZE_RATIO);
    }

    get size() {
        return this.rect.width;
    }

    set size(size: number) {
        this.rect.width = size;
        this.rect.height = size * Fish.SIZE_RATIO;
    }

    get shouldDespawn() {
        return Math.sign(this.x_velocity) === 1 ? this.rect.x > CANVAS_WIDTH : this.rect.x + this.size < 0;
    }

    public overlapsWithFish(fish: Fish) {
        return this.rect.overlaps(fish.rect);
    }

    public eat(fish: Fish) {
        const prevSize = this.size;
        this.size = (this.size ** 2 + fish.size ** 2 * 0.03) ** 0.5;

        console.log(prevSize, this.size);
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        this.rect.render(ctx);

        ctx.fillStyle = '#000000';
        ctx.fillRect(
            this.rect.x + this.rect.width * (this.facingRight ? 1 - fishEyeXPosition - fishEyeWidth : fishEyeXPosition),
            this.rect.y + this.rect.height * (1 - fishEyeHeight * 2),
            this.rect.width * fishEyeWidth,
            this.rect.height * fishEyeHeight,
        );
    }

    public bounce() {
        if (this.isPlayer) {
            if (this.rect.x <= 0) {
                this.rect.x = 0;
                this.x_velocity *= -1 * bounceSpeedProportion;
            } else if (this.rect.x + this.rect.width >= CANVAS_WIDTH) {
                this.rect.x = CANVAS_WIDTH - this.rect.width;
                this.x_velocity *= -1 * bounceSpeedProportion;
            }

            if (this.rect.y <= 0) {
                this.rect.y = 0;
                this.y_velocity *= -1 * bounceSpeedProportion;
            } else if (this.rect.y + this.rect.height >= CANVAS_HEIGHT) {
                this.rect.y = CANVAS_HEIGHT - this.rect.height;
                this.y_velocity *= -1 * bounceSpeedProportion;
            }
        }
    }

    public handleKeysPressed(updateSeconds: number, keysPressedRef?: RefObject<Set<string>>) {
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
    }

    public update(updateTimeMilliseconds: number, keysPressedRef?: RefObject<Set<string>>) {
        const updateSeconds = updateTimeMilliseconds / 1000;

        this.handleKeysPressed(updateSeconds, keysPressedRef);
        this.rect.move(this.x_velocity * updateSeconds, this.y_velocity * updateSeconds);
        this.bounce(); // bounce against walls
    }
}

type State = 'PLAYING' | 'DEAD';
type GameState = {
    player: Fish;
    fish: Fish[];
    state: State;
};

const startingGameState = (): GameState => {
    return {
        player: new Fish({
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            x_velocity: 0,
            y_velocity: 0,
            color: ORANGE,
            size: 25,
            isPlayer: true,
        }),
        fish: [],
        state: 'PLAYING',
    };
};

class FishyGameManager extends GameManager<GameState> {
    private static fishStartingSize: number = 25;

    get startingGameState() {
        return startingGameState();
    }

    get score() {
        return Math.trunc((this.gameStateRef.current.player.size - FishyGameManager.fishStartingSize) * 100);
    }

    public restart() {
        this.gameStateRef.current = this.startingGameState;
        return this.gameStateRef;
    }

    public clearScreen() {
        this.ctx.fillStyle = 'rgba(0, 110, 255)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public render() {
        const state = this.gameStateRef.current;

        this.clearScreen();

        state.fish.forEach((fish) => fish.render(this.ctx));
        state.player.render(this.ctx);

        this.ctx.fillStyle = ORANGE;
        this.ctx.font = '24px verdana';
        this.ctx.fillText(`Score: ${this.score}`, CANVAS_WIDTH - 200, 50);
    }

    public gameOver() {
        this.gameStateRef.current.state = 'DEAD';
    }

    public checkCollisions() {
        const state = this.gameStateRef.current;
        for (let i = state.fish.length - 1; i >= 0; i--) {
            const fish = state.fish[i];

            if (!state.player.overlapsWithFish(fish)) continue;
            if (state.player.size > fish.size) {
                state.player.eat(fish);
                state.fish.splice(i, 1);
            } else {
                this.gameOver();
                break;
            }
        }
    }

    public spawnFish() {
        const maxFish = 30;
        const chanceOfFishSpawningPerSecond =
            ((maxFish - this.gameStateRef.current.fish.length) * this.updateTimeIntervalMilliseconds) / 10000;

        // console.log(this.gameStateRef.current.fish.length);
        if (Math.random() > chanceOfFishSpawningPerSecond) return;

        const size = randomNum(this.gameStateRef.current.player.size * 1.3, 5);
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

    public continueAnimation() {
        const state = this.gameStateRef.current.state;
        let fn;
        if (state === 'DEAD') fn = this.deadLoop;
        else fn = this.gameLoop;

        this.animationRef.current = requestAnimationFrame(fn.bind(this));
    }

    public menuLoop() {
        this.continueAnimation();
    }

    public deadLoop() {
        this.clearScreen();

        this.ctx.fillStyle = ORANGE;
        this.ctx.font = '32px verdana';
        this.ctx.fillText(`Oh dear, you are DEAD!`, CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT / 2 - 25);
        this.ctx.fillText(`Final score: ${this.score}`, CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT / 2 + 25);

        this.ctx.fillText(`Press enter to play again`, CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT / 2 + 200);

        if (this.keysPressedRef.current.has('enter')) {
            this.gameStateRef.current = this.startingGameState;
        }

        this.continueAnimation();
    }

    public gameLoop() {
        this.update();
        this.render();
        this.continueAnimation();
    }

    public cancelAnimiation() {
        cancelAnimationFrame(this.animationRef.current);
    }
}

export default function FishyGameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameStateRef = useRef<GameState>(startingGameState());
    const animationRef = useRef<number>(0);
    const keysPressedRef = useRef<Set<string>>(new Set());

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        keysPressedRef.current.add(e.key.toLowerCase());
    }, []);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        keysPressedRef.current.delete(e.key.toLowerCase());
    }, []);

    useEffect(() => {
        const manager = new FishyGameManager(
            gameStateRef,
            canvasRef,
            animationRef,
            keysPressedRef,
            CANVAS_WIDTH,
            CANVAS_HEIGHT,
        );
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
