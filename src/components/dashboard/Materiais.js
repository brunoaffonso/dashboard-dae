import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import * as api from '../../api/serviceApi';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Materiais() {
  const [materiais, setMateriais] = useState([]);

  useEffect(() => {
    const getMateriais = async () => {
      await api.Materiais().then((r) => setMateriais(r));
    };
    getMateriais();
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Materiais</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materiais.map((item) => (
            <TableRow key={item.numero_item}>
              <TableCell>{item.numero_item}</TableCell>
              <TableCell>{item.descricao}</TableCell>
              <TableCell>{item.quantidade_ano}</TableCell>
              <TableCell>{item.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Adicionar
        </Link>
      </div>
    </React.Fragment>
  );
}
