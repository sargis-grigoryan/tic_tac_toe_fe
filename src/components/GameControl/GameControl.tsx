import { FormLabel, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FC, FormEventHandler, useState } from 'react';
import { XO } from '../../types';
import CopyToClipboardButton from '../CopyToClipboardButton';
import { Button, ClipboardRow, FormControl, GameOver, Paper, PlayerTurn, YouWin } from './GameControl.styles';

interface GameControlProps {
  isGameStarted: boolean;
  toggleGame: (playerType: XO) => void;
  initialPlayerType: XO;
  turn: XO | null;
  winner: XO | null;
}

export const GameControl: FC<GameControlProps> = ({ isGameStarted, toggleGame, initialPlayerType, turn, winner }) => {
  const [selectedPlayerType, setSelectedPlayerType] = useState<XO>(initialPlayerType);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    toggleGame(selectedPlayerType);
  };

  const currentURL = window.location.href;
  const urlForNextPlayer = selectedPlayerType === "x" ?
    currentURL.replace("/x", "/o") :
    currentURL.replace("/o", "/x");

  return (
    <Paper elevation={3}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <div>
            <FormLabel>Choose Player Type</FormLabel>
            <RadioGroup
              onChange={(e) => setSelectedPlayerType(e.target.value as XO)}
              value={selectedPlayerType}
              row
              name="player-type"
            >
              <FormControlLabel
                value="x"
                control={<Radio />}
                label="Player X"
                disabled={isGameStarted}
              />
              <FormControlLabel
                value="o"
                control={<Radio />}
                label="Player O"
                disabled={isGameStarted}
              />
            </RadioGroup>
            {isGameStarted &&
              <PlayerTurn align='center'>{turn === selectedPlayerType ?
                "It is your turn!" :
                "Waiting for next player..."
              }</PlayerTurn>
            }
            {winner && winner !== selectedPlayerType &&
              <GameOver align='center'>Game Over!</GameOver>
            }
            {winner === selectedPlayerType &&
              <YouWin align='center'>You Win!</YouWin>
            }
          </div>
          <div>
            {isGameStarted &&
              <ClipboardRow>
                {urlForNextPlayer.slice(0, 20)}...
                <CopyToClipboardButton text={urlForNextPlayer} />
              </ClipboardRow>
            }
            <Button variant="contained" type="submit" fullWidth>
              {isGameStarted ? "Stop Game" : "New Game"}
            </Button>
          </div>
        </FormControl>
      </form>
    </Paper >
  );
}
