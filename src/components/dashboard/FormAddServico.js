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

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const [numeroRs, setNumeroRs] = useState([]);
  const [numeroOs, setNumeroOs] = useState([]);
  const [abertura, setAbertura] = useState([]);
  const [fechamento, setFechamento] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [matServs, setMatServs] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = useState([]);
  const [selectedDepto, setSelectedDepto] = useState([]);
  const [selectedSetor, setSelectedSetor] = useState([]);
  const [obs, setObs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const mats = await api.Materiais();
      const serv = await api.Servico();
      const ms = await api.MatServ();
      const unid = await api.Unidade();
      const depto = await api.Departamento();
      const setor = await api.Setor();
      setMateriais(mats);
      setServicos(serv);
      setMatServs(ms);
      setUnidades(unid);
      setDepartamentos(depto);
      setSetores(setor);
    };
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
      departamento: setSelectedDepto,
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servicos.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.unidade}</TableCell>
              <TableCell>{item.data_abertura}</TableCell>
              <TableCell>{item.data_fechamento}</TableCell>
              <TableCell>{item.numero_rs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
