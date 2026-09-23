import { useState } from 'react';

export default function App(){
 const [pin,setPin]=useState('');
 const [ok,setOk]=useState(false);
 const [clientes,setClientes]=useState([]);
 const [nome,setNome]=useState('');
 const [telefone,setTelefone]=useState('');
 const [pacote,setPacote]=useState('Essencial');
 const totais={Essencial:3,'Ativação':6,Continuidade:9,Anual:24};

 if(!ok){
   return <div className='login'>
     <h1>OCCHY</h1>
     <p>Passaporte Digital</p>
     <input type='password' maxLength='6' value={pin} onChange={e=>setPin(e.target.value)} placeholder='PIN'/>
     <button onClick={()=>pin==='123456'&&setOk(true)}>Entrar</button>
     <small>PIN inicial: 123456</small>
   </div>
 }

 return <div className='app'>
   <header><h1>OCCHY</h1><p>Passaporte Digital</p></header>

   <div className='card'>
     <input placeholder='Nome da cliente' value={nome} onChange={e=>setNome(e.target.value)}/>
     <input placeholder='WhatsApp' value={telefone} onChange={e=>setTelefone(e.target.value)}/>
     <select value={pacote} onChange={e=>setPacote(e.target.value)}>
       <option>Essencial</option>
       <option>Ativação</option>
       <option>Continuidade</option>
       <option>Anual</option>
     </select>
     <button className='novo' onClick={()=>{
       if(!nome.trim()) return;
       setClientes([{nome,telefone,pacote,total:totais[pacote],usadas:0},...clientes]);
       setNome('');setTelefone('');setPacote('Essencial');
     }}>+ Nova Cliente</button>
   </div>

   <div className='lista'>
     {clientes.length===0?
      <div className='cliente'><div><h3>Nenhuma cliente cadastrada</h3><span>Começa pelo primeiro cadastro.</span></div></div>
      :
      clientes.map((c,i)=><div key={i} className='cliente'>
        <div>
          <h3>{c.nome}</h3>
          <span>{c.pacote} • {c.usadas}/{c.total}</span>
        </div>
        <button className='sessao' onClick={()=>{
          const n=[...clientes];
          if(n[i].usadas<n[i].total) n[i].usadas++;
          setClientes(n);
        }}>Iniciar Sessão</button>
      </div>)
     }
   </div>
   <nav><span>Clientes</span><span>Hoje</span><span>Perfil</span></nav>
 </div>
}