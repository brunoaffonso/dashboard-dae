import React, { useState, useEffect } from 'react';
import * as api from '../../api/serviceApi';

export default function TestAPI() {
  const [materiais, setMateriais] = useState([]);

  useEffect(() => {
    const getMats = async () => {
      const mats = await api.Materiais();
      setTimeout(() => {
        setMateriais(mats);
      }, 2000);
    };
    getMats();
  }, []);
  console.log(materiais);

  return (
    <div>
      <ul>
        {materiais.forEach((m) => (
          <li key={m.numero_item}>{m.descricao}</li>
        ))}
      </ul>
    </div>
  );
}
