import { FormLabel } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FC, FormEventHandler, useState } from 'react';
import { XO } from '../../types';
import { Button, FormControl, Paper } from './GameControl.styles';

interface GameControlProps {
  isGameStarted: boolean;
  toggleGame: (playerType: XO) => void;
  initialPlayerType: XO;
}

export const GameControl: FC<GameControlProps> = ({ isGameStarted, toggleGame, initialPlayerType }) => {
  const [selectedPlayerType, setSelectedPlayerType] = useState<XO>(initialPlayerType);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    toggleGame(selectedPlayerType);
  };

  console.log("initialPlayerType", initialPlayerType);
  

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
          </div>
          <Button variant="contained" type="submit">
            {isGameStarted ? "Stop Game" : "New Game"}
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
}
