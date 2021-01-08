import React, { useState, useEffect } from 'react';
import * as api from '../../api/serviceApi';

export default function ServData() {
  const [results, setResults] = useState([]);
  const [materiaisServicos, setMateriaisServicos] = useState([]);
  const [servicosSolicitados, setServicosSolicitados] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const matServ = await api.MatServ();
      const serv = await api.Servico();
      setTimeout(() => {
        setServicosSolicitados(serv);
        setMateriaisServicos(matServ);
        const resServs = () => {
          const res = servicosSolicitados.map((s) => {
            const reqs = materiaisServicos.filter((m) => m.numero_rs === s.id);
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
        };
        setTimeout(() => {
          const r = resServs();
          setResults(r);
        }, 1000);
      }, 1000);
    };
    getData();
  }, []);

  return (
    <div>
      <ul>
        {results.map((r) => (
          <li key={r.id}>{r.numero_rs}</li>
        ))}
        <button onClick={(c) => console.log(results)}>Test</button>
      </ul>
    </div>
  );
}
