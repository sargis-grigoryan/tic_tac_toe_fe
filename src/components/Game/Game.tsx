import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import queryString from 'query-string';
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { fetchGameState, makeStep } from "../../requests";
import { GameState, XO } from "../../types";
import { Board } from "../Board/Board";
import { GameControl } from "../GameControl/GameControl";
import { BoardWrapper } from "./GameStyles";


export const Game: FC = () => {
    const queryParams = queryString.parse(window.location.search);

    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [playerType, setPlayerType] = useState<XO>((queryParams.player || "x") as XO);
    const [gameId, setGameId] = useState<string>();

    useEffect(() => {
        if (typeof queryParams.game_id === "string" && queryParams.game_id?.length &&
            typeof queryParams.player === "string" && ["x", "o"].includes(queryParams.player)) {
            setGameId(queryParams.game_id);
            setPlayerType(queryParams.player as XO);
            setIsGameStarted(true);
        }
    }, [queryParams.game_id, queryParams.player]);

    const {
        data: { data: { board, turn } = { board: undefined, turn: null } } = {},
        isLoading,
        refetch
    } = useQuery<{ data: GameState }>({
        queryKey: ['gameState'],
        queryFn: () => fetchGameState(gameId!),
        refetchInterval: 3000,
        enabled: !!(gameId && isGameStarted)
    });

    const toggleGame = (selectedPlayerType: XO) => {
        if (isGameStarted) {
            setIsGameStarted(false);
            return;
        }

        const stringified = queryString.stringify({
            game_id: uuidv4(),
            player: selectedPlayerType
        });

        window.location.search = stringified;
    };

    const handleCellClick = async (coord_x: number, coord_y: number) => {
        console.log(coord_x, coord_y);
        if (!board || !turn || !gameId || isLoading) return;

        await makeStep({
            game_id: gameId,
            player_type: turn,
            coord_x: coord_x,
            coord_y: coord_y
        });

        refetch();
    }

    return (
        <Grid container spacing={2}>
            <Grid item lg={2} xs={12}>
                <GameControl
                    isGameStarted={isGameStarted}
                    toggleGame={toggleGame}
                    initialPlayerType={playerType}
                />
            </Grid>
            <BoardWrapper item lg={10} xs={12}>
                {board && turn && (
                    <Board
                        board={board}
                        turn={turn}
                        onCellClick={handleCellClick}
                    />
                )}
            </BoardWrapper>
        </Grid>
    );
}
