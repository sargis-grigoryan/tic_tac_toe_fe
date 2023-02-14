import { Grid, Paper, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Board } from "../Board/Board";
import { GameControl } from "../GameControl/GameControl";
import { BoardWrapper } from "./GameStyles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface GameState {
    board: ("x" | "o" | null)[][];
    turn: ("x" | "o")
}

const fetchGameState = (gameId: string) => {
    return axios
        .request({
            url: `game/${gameId}`,
            method: "GET"
        })
}

export const Game = () => {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const gameId = "06d54af8-fe8e-430c-870f-1b86affbb297";
    const toggleGame = (playerType: string) => {
        setIsGameStarted((currentValue) => !currentValue);
        console.log(playerType);

    }

    const { data: {data: gameState} = {}, refetch } = useQuery<{ data: GameState }>({ queryKey: ['gameState'], queryFn: () => fetchGameState(gameId), refetchInterval: 3000, enabled: isGameStarted });

    console.log(JSON.stringify(gameState, null, 4));

    return (
        <Grid container spacing={2}>
            <Grid item lg={2} xs={12}>
                <GameControl
                    isGameStarted={isGameStarted}
                    toggleGame={toggleGame}
                />
            </Grid>
            <BoardWrapper item lg={10} xs={12}>
                <Board board={gameState?.board} />
            </BoardWrapper>
        </Grid>
    );
}
