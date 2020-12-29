import React, { useEffect, useState } from 'react';

export default function Materiais() {
  const [materiais, setMateriais] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/core/unidade/';
    async function results() {
      const res = await fetch(apiUrl);
      const json = await res.json();
      setMateriais(json);
    }
    results();
  }, []);
  console.log(materiais);
  // const name = materiais[0].name;
  // console.log(name);
  return (
    <div>
      <ul>
        {materiais.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
