import React, { useState, useEffect } from 'react';
import * as api from '../../api/serviceApi';

export default function TestData() {
  const [servicos, setServicos] = useState([]);
  const [matServs, setMatServs] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const serv = await api.Servico();
      const ms = await api.MatServ();
      setServicos(serv);
      setMatServs(ms);
    };
    getData();
  }, [servicos, matServs]);

  useEffect(() => {
    const total = () => {
      const getRes = (rs) => matServs.filter((s) => s.numero_rs === rs);

      const resServs = servicos.map((s) => {
        const reqs = getRes(s.id);
        const {
          numero_rs,
          numero_os,
          data_abertura,
          data_fechamento,
          unidade,
          departamento,
          setor,
          obs,
          custo,
        } = s;
        return {
          numero_rs,
          numero_os,
          data_abertura,
          data_fechamento,
          unidade,
          departamento,
          setor,
          obs,
          custo,
          reqs,
        };
      });
      setResults(resServs);
    };
    total();
  }, [matServs, servicos]);

  return (
    <div>
      <ul>
        {results.map((r) => (
          <li key={r.id}>{r.numero_rs}</li>
        ))}
      </ul>
    </div>
  );
}
