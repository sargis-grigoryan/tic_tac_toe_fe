export type XO = "x" | "o";

export interface GameState {
    board: [(XO | null), boolean][][];
    turn: XO;
    winner: XO | null;
}
