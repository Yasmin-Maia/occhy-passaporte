import { useState } from 'react';

export default function App() {
  const [clientes] = useState([]);

  return (
    <div className="app">
      <header>
        <h1>OCCHY</h1>
        <p>Passaporte Digital</p>
      </header>

      <button className="novo">+ Nova Cliente</button>

      <div className="lista">
        <div className="cliente">
          <div>
            <h3>Nenhuma cliente cadastrada</h3>
            <span>Toque em Nova Cliente para começar.</span>
          </div>
        </div>
      </div>

      <nav>
        <span>Clientes</span>
        <span>Hoje</span>
        <span>Perfil</span>
      </nav>
    </div>
  );
}