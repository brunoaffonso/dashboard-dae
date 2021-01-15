import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Title from './Title';
import * as api from '../../api/serviceApi';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

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
          {row.id}
        </TableCell>
        <TableCell align="left">{row.unidade}</TableCell>
        <TableCell align="center">{row.data_abertura}</TableCell>
        <TableCell align="center">{row.data_fechamento}</TableCell>
        <TableCell align="center">{row.numero_rs}</TableCell>
        <TableCell align="center">{row.numero_os}</TableCell>
        <TableCell align="left">{row.obs}</TableCell>
        <TableCell align="left">{row.custo}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Materiais Utilizados
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Cód. Material</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell align="left">Comentários</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.reqs.map((matServ) => (
                    <TableRow key={matServ.id}>
                      <TableCell component="th" scope="row" align="center">
                        {matServ.descricao.numero_item}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {matServ.descricao.descricao}
                      </TableCell>
                      <TableCell align="center">{matServ.quantidade}</TableCell>
                      <TableCell align="left">
                        {matServ.comentarios ? matServ.comentarios : '-'}
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

export default function Servicos() {
  const [results, setResults] = useState([]);

  const data = async () => {
    const services = await api.getServices();
    setResults(services);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Title>Relatório de Materiais Utilizados</Title>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Id</TableCell>
            <TableCell align="left">Unidade</TableCell>
            <TableCell align="center">Data de Abertura</TableCell>
            <TableCell align="center">Data de Fechamento</TableCell>
            <TableCell align="center">RS</TableCell>
            <TableCell align="center">OS</TableCell>
            <TableCell align="left">Observações</TableCell>
            <TableCell align="left">Custo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
