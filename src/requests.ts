import axios from "axios";
import { GameState, XO } from "./types";

export const fetchGameState = (gameId: string) => {
    return axios
        .request<GameState>({
            url: `game/${gameId}`,
            method: "GET"
        })
};

export const makeStep = (params: {
    game_id: string;
    player_type: XO;
    coord_x: number;
    coord_y: number;
}) => {
    return axios
        .request({
            url: `steps`,
            method: "POST",
            data: params
        })
}