export type XO = ("x" | "o");

export interface GameState {
    board?: (XO | null)[][];
    turn: XO;
}