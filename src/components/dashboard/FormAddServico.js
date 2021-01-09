import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as api from '../../api/serviceApi';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function BasicTextFields() {
  const [numeroRs, setNumeroRs] = useState([]);
  const [numeroOs, setNumeroOs] = useState([]);
  const [abertura, setAbertura] = useState([]);
  const [fechamento, setFechamento] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = useState([]);
  const [selectedDepto, setSelectedDepto] = useState([]);
  const [selectedSetor, setSelectedSetor] = useState([]);
  const [obs, setObs] = useState([]);
  const [results, setResults] = useState([]);
  const classes = useStyles();

  const data = async () => {
    const services = await api.getServices();
    setResults(services);
  };

  useEffect(() => {
    data();
  }, []);

  const getData = async () => {
    const unid = await api.Unidade();
    const depto = await api.Departamento();
    const setor = await api.Setor();
    setUnidades(unid);
    setDepartamentos(depto);
    setSetores(setor);
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   console.log(obs);
  // }, [obs]);

  const handleButton = (event) => {
    event.preventDefault();
    const value = {
      numero_rs: numeroRs,
      numero_os: numeroOs,
      data_abertura: abertura,
      data_fechamento: fechamento,
      unidade: selectedUnidade,
      departamento: selectedDepto,
      setor: selectedSetor,
      obs: obs,
    };
    api.insertServico(value);
    setNumeroRs('');
    setNumeroOs('');
    setAbertura('');
    setFechamento('');
    setSelectedUnidade('');
    setSelectedDepto('');
    setSelectedSetor('');
    setObs('');
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Número RS"
          value={numeroRs}
          onInput={(e) => setNumeroRs(e.target.value)}
        />
        <TextField
          label="Número OS"
          value={numeroOs}
          onInput={(e) => setNumeroOs(e.target.value)}
        />
        <TextField
          label="Data de Abertura"
          type="date"
          defaultValue={abertura}
          className={classes.textField}
          onInput={(e) => setAbertura(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Data de Fechamento"
          type="date"
          defaultValue={fechamento}
          className={classes.textField}
          onInput={(e) => setFechamento(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Unidade</InputLabel>
          <Select
            native
            onChange={(e) => setSelectedUnidade(parseInt(e.target.value))}
          >
            <option aria-label="None" value="" />
            {unidades.map((unidade) => (
              <option key={unidade.id} value={unidade.id}>
                {unidade.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Departamento</InputLabel>
          <Select
            id="select-departamento"
            native
            onChange={(e) => setSelectedDepto(parseInt(e.target.value))}
          >
            <option aria-label="None" value="" />
            {departamentos
              .filter(
                (departamento) => departamento.unidade === selectedUnidade
              )
              .map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Setor</InputLabel>
          <Select
            native
            onChange={(e) => setSelectedSetor(parseInt(e.target.value))}
          >
            <option aria-label="None" value="" />
            {setores
              .filter((setor) => setor.departamento === selectedDepto)
              .map((setor) => (
                <option key={setor.id} value={setor.id}>
                  {setor.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <TextField
          label="Observações"
          value={obs}
          onInput={(e) => setObs(e.target.value)}
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
      <Divider variant="middle" />
      <Title>Serviços</Title>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
