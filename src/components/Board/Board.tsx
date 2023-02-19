import { FC } from "react"
import classNames from "classnames"
import { XO } from "../../types";
import { AbsoluteBoard, BoardContainer, Cell, Row } from "./BoardStyles"

interface BoardProps {
    board: [(XO | null), boolean][][];
    turn: XO;
    playerType: XO;
    isActive: boolean;
    onCellClick: (coord_x: number, coord_y: number) => void;
}

export const Board: FC<BoardProps> = ({
    board,
    turn,
    playerType,
    isActive,
    onCellClick
}) => {
    return (
        <BoardContainer
            elevation={3}
            data-turn={turn}
            data-player-type={playerType}
            data-is-active={isActive}
        >
            <AbsoluteBoard>
                {
                    board.map((row, coord_y) => (
                        <Row key={coord_y}>
                            {
                                row.map(([value, isWinner], coord_x) => (
                                    <Cell
                                        key={coord_x}
                                        className={classNames({
                                            "x-cell": value === "x",
                                            "o-cell": value === "o",
                                            "win": isWinner
                                        })}
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
