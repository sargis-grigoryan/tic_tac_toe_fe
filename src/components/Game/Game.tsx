import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { fetchGameState, makeStep } from "../../requests";
import { GameState, XO } from "../../types";
import { Board } from "../Board/Board";
import { GameControl } from "../GameControl/GameControl";
import { BoardWrapper } from "./GameStyles";
import { useParams, useNavigate } from 'react-router-dom';


export const Game: FC = () => {
    const navigate = useNavigate();
    const routeParams = useParams<{ game_id?: string, player_type?: XO }>();
    const [isGameStarted, setIsGameStarted] = useState<boolean>(!!(routeParams.game_id && routeParams.player_type));
    const [playerType, setPlayerType] = useState<XO>(routeParams.player_type || "x");
    const [gameId, setGameId] = useState<string>(routeParams.game_id || "");

    const {
        data: { data: { board, turn, winner } = { board: undefined, turn: null, winner: null } } = {},
        isLoading,
        refetch
    } = useQuery<{ data: GameState }>({
        queryKey: ['gameState'],
        queryFn: () => fetchGameState(gameId!),
        refetchInterval: 2000,
        enabled: !!(gameId && isGameStarted)
    });

    const toggleGame = (selectedPlayerType: XO) => {
        if (isGameStarted) {
            setIsGameStarted(false);
            return;
        }

        const newGameId = uuidv4();
        setGameId(newGameId);
        setPlayerType(selectedPlayerType);
        setIsGameStarted(true);

        navigate(`/${newGameId}/${selectedPlayerType}`);
    };

    useEffect(() => {
        if (winner) {
            setIsGameStarted(false);
        }
    }, [winner]);

    const handleCellClick = async (coord_x: number, coord_y: number) => {
        if (!isGameStarted ||
            !board ||
            !!board[coord_y][coord_x][0] ||
            turn !== playerType ||
            !gameId ||
            isLoading
        ) return;

        await makeStep({
            game_id: gameId,
            player_type: playerType,
            coord_x: coord_x,
            coord_y: coord_y
        });

        refetch();
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={"auto"} xs={12}>
                <GameControl
                    isGameStarted={isGameStarted}
                    toggleGame={toggleGame}
                    initialPlayerType={playerType}
                    turn={turn}
                    winner={winner}
                />
            </Grid>
            <BoardWrapper item md={9} xs={12}>
                {board && turn && (
                    <Board
                        board={board}
                        turn={turn}
                        playerType={playerType}
                        isActive={isGameStarted}
                        onCellClick={handleCellClick}
                    />
                )}
            </BoardWrapper>
        </Grid>
    );
}
