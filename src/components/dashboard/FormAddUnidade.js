import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as api from '../../api/serviceApi';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const [unidade, setUnidade] = useState('');
  const classes = useStyles();

  const handleButton = (event) => {
    event.preventDefault();
    const value = { name: unidade };
    api.insertUnidade(value);
    setUnidade('');
    console.log(unidade);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Unidade"
        value={unidade}
        onInput={(e) => setUnidade(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleButton}
        className={classes.button}
      >
        Inserir
      </Button>
    </form>
  );
}
