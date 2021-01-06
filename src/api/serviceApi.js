import axios from 'axios';

const apiUnidadesUrl = 'http://127.0.0.1:8000/core/unidade/';
const apiDepartamentoUrl = 'http://127.0.0.1:8000/core/departamento/';
const apiSetorUrl = 'http://127.0.0.1:8000/core/setor/';
const apiContratoUrl = 'http://127.0.0.1:8000/core/contrato/';
const apiMateriaisUrl = 'http://127.0.0.1:8000/materiais/';
const apiEstoqueUrl = 'http://127.0.0.1:8000/estoque/';
const apiServicoUrl = 'http://127.0.0.1:8000/servico/';
const apiMatServUrl = 'http://127.0.0.1:8000/matserv/';

export async function Unidade() {
  const res = await axios.get(apiUnidadesUrl);
  // console.log(res.data);
  const results = res.data.map((item) => {
    return { unidade: item.name };
  });
  return results;
}

export async function insertUnidade(value) {
  const response = await axios.post(apiUnidadesUrl, value);
  return response.data.id;
}

export async function Departamento() {
  const res = await axios.get(apiDepartamentoUrl);
  // console.log(res.data);
  const results = res.data.map((item) => {
    return { departamento: item.name };
  });
  return results;
}

export async function Setor() {
  const res = await axios.get(apiSetorUrl);
  // console.log(res.data);
  return res.data;
}

export async function Contrato() {
  const res = await axios.get(apiContratoUrl);
  // console.log(res.data);
  return res.data;
}

export async function Materiais() {
  const res = await axios.get(apiMateriaisUrl);
  // console.log(res.data);

  const mats = res.data.map((mat) => {
    const { id, numero_item, descricao, quantidade_ano, valor } = mat;
    return {
      id,
      numero_item,
      descricao,
      quantidade_ano,
      valor,
    };
  });
  return mats;
}

export async function Estoque() {
  const res = await axios.get(apiEstoqueUrl);
  // console.log(res.data);
  return res.data;
}

export async function Servico() {
  const res = await axios.get(apiServicoUrl);
  // console.log(res.data);
  return res.data;
}

export async function MatServ() {
  const res = await axios.get(apiMatServUrl);
  // console.log(res.data);
  return res.data;
}