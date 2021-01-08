import React, { useState } from 'react';
import * as api from '../../api/serviceApi';

export default function ServData() {
  const [results, setResults] = useState([]);

  function dataServs() {
    api.getServices().then((r) => setResults(r));
  }

  dataServs();

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
