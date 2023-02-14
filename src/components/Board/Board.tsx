import { FC } from "react"
import { AbsoluteBoard, BoardContainer, Cell, Row } from "./BoardStyles"

interface BoardProps {
    board?: ("x" | "o" | null)[][]
}

export const Board: FC<BoardProps> = ({
    board
}) => {
    return (
        <BoardContainer elevation={3}>
            <AbsoluteBoard>
                {
                    board?.map(row => (
                        <Row>
                            {
                                row.map(cell => (
                                    <Cell>
                                        {cell ?? "-"}
                                    </Cell>
                                ))
                            }
                        </Row>
                    ))
                }
            </AbsoluteBoard>
        </BoardContainer>
    )
}