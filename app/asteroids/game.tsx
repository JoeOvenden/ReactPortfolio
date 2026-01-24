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

type GameState = {};

class GameManager {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gameStateRef: RefObject<GameState>;
    private animationRef: RefObject<number>;
    private keysPressedRef: RefObject<Set<string>>;
    private timeOfLastUpdate: Date;
    private updateTimeIntervalMilliseconds: number;
    private static fishStartingSize: number = 25;

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

    get startingGameState(): GameState {
        return {};
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
    }

    public update() {
        const state = this.gameStateRef.current;
    }

    public start() {
        this.animationRef.current = requestAnimationFrame(this.gameLoop.bind(this));
    }

    public continueAnimation() {
        let fn;
        fn = this.gameLoop;

        this.animationRef.current = requestAnimationFrame(fn.bind(this));
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

export default function AsteroidsGameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameStateRef = useRef<GameState>({});
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
