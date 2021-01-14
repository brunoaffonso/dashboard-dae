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
  // const results = res.data.map((item) => {
  //   const { id, name } = item;
  //   return { id, name };
  // });
  return res.data;
}

export async function insertUnidade(value) {
  const response = await axios.post(apiUnidadesUrl, value);
  return response.data.id;
}

export async function Departamento() {
  const res = await axios.get(apiDepartamentoUrl);
  // console.log(res.data);
  // const results = res.data.map((item) => {
  //   const { id, name, unidade } = item;
  //   return { departamento: item.name };
  // });
  return res.data;
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

export async function insertServico(value) {
  const response = await axios.post(apiServicoUrl, value);
  return response.data;
}

export async function insertServico2(value) {
  const response = await axios.post(apiServicoUrl, value);
  const servicos = await getServices();
  const serv = servicos
    .filter(
      (id) =>
        id.numero_rs === response.data.numero_rs &&
        id.data_fechamento === response.data.data_fechamento
    )
    .map((s) => {
      return {
        id: s.id,
      };
    });
  const idServ = serv[0];
  return idServ.id;
}

export async function MatServ() {
  const res = await axios.get(apiMatServUrl);
  // console.log(res.data);
  return res.data;
}

export async function insertMatServ(value) {
  const response = await axios.post(apiMatServUrl, value);
  return response.data;
}

export async function insertMatServ(value) {
  const response = await axios.post(apiMatServUrl, value);
  return response.data.id;
}

export async function getServices() {
  const matServ = await MatServ();
  const serv = await Servico();
  const mats = await Materiais();
  const res = serv.map((s) => {
    const reqs = matServ
      .filter((m) => m.numero_rs === s.id)
      .map((s) => {
        const matDesc = mats.filter((material) => material.id === s.material);
        return {
          id: s.id,
          numero_rs: s.numero_rs,
          material: s.material,
          descricao: matDesc,
          quantidade: s.quantidade,
        };
      });
    return {
      id: s.id,
      numero_rs: s.numero_rs,
      numero_os: s.numero_os,
      data_abertura: s.data_abertura,
      data_fechamento: s.data_fechamento,
      unidade: s.unidade,
      departamento: s.departamento,
      setor: s.setor,
      obs: s.obs,
      custo: s.custo,
      reqs,
    };
  });
  return res;
}
