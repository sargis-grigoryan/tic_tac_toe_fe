import { FC } from "react"
import { XO } from "../../types";
import { AbsoluteBoard, BoardContainer, Cell, Row } from "./BoardStyles"

interface BoardProps {
    board: (XO | null)[][];
    turn: XO;
    onCellClick: (coord_x: number, coord_y: number) => void;
}

export const Board: FC<BoardProps> = ({
    board,
    turn,
    onCellClick
}) => {
    return (
        <BoardContainer elevation={3}>
            <AbsoluteBoard>
                {
                    board.map((row, coord_y) => (
                        <Row key={coord_y}>
                            {
                                row.map((cell, coord_x) => (
                                    <Cell
                                        key={coord_x}
                                        className={cell === "x" ? "x-cell" : (cell === "o" ? "o-cell" : "")}
                                        onClick={() => onCellClick(coord_x, coord_y)}
                                    />
                                ))
                            }
                        </Row>
                    ))
                }
            </AbsoluteBoard>
        </BoardContainer>
    )
}
