import { FormLabel } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FC, FormEventHandler, useState } from 'react';
import { Button, FormControl, Paper } from './GameControl.styles';

interface GameControlProps {
  isGameStarted: boolean;
  toggleGame: (playerType: string) => void;
}

export const GameControl: FC<GameControlProps> = ({ isGameStarted, toggleGame }) => {
  const [playerType, setPlayerType] = useState<string>("x");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    toggleGame(playerType);
  };

  return (
    <Paper elevation={3}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <div>
            <FormLabel>Choose Player Type</FormLabel>
            <RadioGroup
              onChange={(e) => setPlayerType(e.target.value)}
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
          </div>
          <Button variant="contained" type="submit">
            {isGameStarted ? "Stop Game" : "Start Game"}
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
}
