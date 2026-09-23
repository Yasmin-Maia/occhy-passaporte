import { useState } from 'react';

export default function App() {
  const [clientes] = useState([
    { nome: 'Ana Silva', restante: '2 sessões' },
    { nome: 'Beatriz Costa', restante: '5 sessões' }
  ]);

  return (
    <div className="app">
      <header>
        <h1>OCCHY</h1>
        <p>Passaporte Digital</p>
      </header>

      <button className="novo">+ Nova Cliente</button>

      <div className="lista">
        {clientes.map((c, i) => (
          <div key={i} className="cliente">
            <div>
              <h3>{c.nome}</h3>
              <span>{c.restante}</span>
            </div>
            <b>›</b>
          </div>
        ))}
      </div>

      <nav>
        <span>Clientes</span>
        <span>Hoje</span>
        <span>Perfil</span>
      </nav>
    </div>
  );
}
