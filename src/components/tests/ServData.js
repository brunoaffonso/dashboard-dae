import React, { useState, useEffect } from 'react';
import * as api from '../../api/serviceApi';

export default function ServData() {
  const [results, setResults] = useState([]);

  const data = async () => {
    const services = await api.getServices();
    setResults(services);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <ul>
        {results.map((r) => (
          <li key={r.id}>{r.numero_rs}</li>
        ))}
        <button onClick={(c) => console.log(results)}>Log</button>
        <button onClick={(c) => data()}>Test</button>
      </ul>
    </div>
  );
}
