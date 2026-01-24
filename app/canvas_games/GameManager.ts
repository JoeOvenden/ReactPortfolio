import { RefObject } from 'react';

export default abstract class GameManager<GameState> {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected gameStateRef: RefObject<GameState>;
    protected animationRef: RefObject<number>;
    protected keysPressedRef: RefObject<Set<string>>;
    protected timeOfLastUpdate: Date;
    protected updateTimeIntervalMilliseconds: number;

    constructor(
        gameStateRef: RefObject<GameState>,
        canvasRef: RefObject<HTMLCanvasElement | null>,
        animationRef: RefObject<number>,
        keysPressedRef: RefObject<Set<string>>,
        canvas_width: number,
        canvas_height: number,
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

        canvas.width = canvas_width;
        canvas.height = canvas_height;

        this.timeOfLastUpdate = new Date();
        this.updateTimeIntervalMilliseconds = 0;
    }

    abstract get startingGameState(): GameState;

    abstract render(): void;
    abstract update(): void;

    public gameLoop() {
        this.update();
        this.render();
        this.animationRef.current = requestAnimationFrame(this.gameLoop.bind(this));
    }

    public cancelAnimiation() {
        cancelAnimationFrame(this.animationRef.current);
    }
}
