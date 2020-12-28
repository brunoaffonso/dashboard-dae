import React, { useEffect, useState } from 'react';

export default function Materiais() {
  const [materiais, setMateriais] = useState(0);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/core/unidade/';
    async function results() {
      const res = await fetch(apiUrl);
      const json = await res.json();
      setMateriais(json);
      return json;
    }
    return results;
  }, []);
  console.log(materiais);
  const name = materiais[0].name;
  console.log(name);
  return (
    <div>
      <ul>
        {materiais.forEach((i) => {
          return <li>Unidade:{console.log(i.name)}</li>;
        })}
      </ul>
    </div>
  );
}
