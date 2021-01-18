import React, { useState, useEffect, useCallback } from 'react';
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
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormAddServico() {
  const [numeroRs, setNumeroRs] = useState('');
  const [numeroOs, setNumeroOs] = useState('');
  const [abertura, setAbertura] = useState('');
  const [fechamento, setFechamento] = useState('');
  const [unidades, setUnidades] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = useState('');
  const [selectedDepto, setSelectedDepto] = useState('');
  const [selectedSetor, setSelectedSetor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedQuantidade, setSelectedQuantidade] = useState('');
  const [selectedObs, setSelectedObs] = useState('');
  const [obs, setObs] = useState('');
  const [newService, setNewService] = useState('');
  const [newMatServ, setNewMatServ] = useState([]);
  const [serviceDisabled, setServiceDisabled] = useState(false);
  const [matServDisabled, setMatServDisabled] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (newService) {
      setServiceDisabled((prevState) => !prevState);
      setMatServDisabled((prevState) => !prevState);
    }
  }, [newService]);

  const getData = useCallback(async () => {
    const unid = await api.Unidade();
    const depto = await api.Departamento();
    const setor = await api.Setor();
    const material = await api.Materiais();
    setUnidades(unid);
    setDepartamentos(depto);
    setSetores(setor);
    setMateriais(material);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleButton = async (event) => {
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
    const resp = async (value) => {
      const res = await api.insertServico2(value);
      setNewService(res);
    };
    await resp(value);
  };

  const handleButtonTempService = (event) => {
    event.preventDefault();
    const mat = materiais.filter((m) => m.id === selectedMaterial);
    const value = {
      numero_rs: newService,
      material: mat[0].id,
      quantidade: selectedQuantidade,
      comentarios: selectedObs,
      numero_item: mat[0].numero_item,
      descricao: mat[0].descricao,
    };
    setNewMatServ((prevState) => [...prevState, value]);
    setSelectedMaterial('');
    setSelectedQuantidade('');
    setSelectedObs('');
  };

  const saveMatServs = async (event) => {
    event.preventDefault();
    newMatServ.forEach((ms) => {
      const value = {
        numero_rs: ms.numero_rs,
        material: ms.material,
        quantidade: ms.quantidade,
        comentarios: ms.comentarios,
      };
      api.insertMatServ(value);
    });
    setNumeroRs('');
    setNumeroOs('');
    setAbertura('');
    setFechamento('');
    setSelectedUnidade('');
    setSelectedDepto('');
    setSelectedSetor('');
    setObs('');
    setSelectedMaterial('');
    setSelectedQuantidade('');
    setSelectedObs('');
    setNewService('');
    setNewMatServ([]);
    setServiceDisabled((prevState) => !prevState);
    setMatServDisabled((prevState) => !prevState);
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          disabled={serviceDisabled}
          label="Número RS"
          value={numeroRs}
          onInput={(e) => setNumeroRs(e.target.value)}
        />
        <TextField
          disabled={serviceDisabled}
          label="Número OS"
          value={numeroOs}
          onInput={(e) => setNumeroOs(e.target.value)}
        />
        <TextField
          disabled={serviceDisabled}
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
          disabled={serviceDisabled}
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
            disabled={serviceDisabled}
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
            disabled={serviceDisabled}
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
            disabled={serviceDisabled}
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
          disabled={serviceDisabled}
          label="Observações"
          value={obs}
          onInput={(e) => setObs(e.target.value)}
        />
        <Button
          disabled={serviceDisabled}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleButton}
          className={classes.button}
        >
          Inserir
        </Button>
      </form>
      <Divider />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          disabled
          label=" "
          value={`ID: ${newService} | RS: ${numeroRs}`}
          size="small"
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Material</InputLabel>
          <Select
            disabled={matServDisabled}
            native
            onChange={(e) => setSelectedMaterial(parseInt(e.target.value))}
          >
            <option aria-label="None" value="" />
            {materiais.map((material) => (
              <option key={material.id} value={material.id}>
                {material.numero_item} - {material.descricao}
              </option>
            ))}
          </Select>
        </FormControl>
        <TextField
          disabled={matServDisabled}
          label="Quantidade"
          value={selectedQuantidade}
          onInput={(e) => setSelectedQuantidade(e.target.value)}
        />
        <TextField
          disabled={matServDisabled}
          label="Comentários"
          value={selectedObs}
          onInput={(e) => setSelectedObs(e.target.value)}
        />
        <Button
          disabled={matServDisabled}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleButtonTempService}
          className={classes.button}
        >
          Inserir
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Código</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Comentários</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newMatServ.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.numero_item}</TableCell>
                <TableCell component="th" scope="row">
                  {row.descricao}
                </TableCell>
                <TableCell align="center">{row.quantidade}</TableCell>
                <TableCell align="center">{row.comentarios}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          disabled={matServDisabled}
          type="submit"
          variant="contained"
          color="primary"
          onClick={saveMatServs}
          className={classes.button}
        >
          Salvar
        </Button>
      </TableContainer>
    </div>
  );
}
