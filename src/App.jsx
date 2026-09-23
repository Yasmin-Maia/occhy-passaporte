import {useState,useRef} from 'react';

export default function App(){
 const [pin,setPin]=useState('');const [ok,setOk]=useState(false);
 const [clientes,setClientes]=useState([]);const [nome,setNome]=useState('');const [tel,setTel]=useState('');
 const [pacote,setPacote]=useState('Essencial');const [ativo,setAtivo]=useState(null);
 const [obs,setObs]=useState('');const [antes,setAntes]=useState(null);const [depois,setDepois]=useState(null);const [slider,setSlider]=useState(50);
 const ref=useRef(null);const totais={Essencial:3,'Ativação':6,Continuidade:9,Anual:24};

 if(!ok) return <div className='login'><h1>OCCHY</h1><p>Passaporte Digital</p><input type='password' maxLength='6' value={pin} onChange={e=>setPin(e.target.value)} placeholder='PIN'/><button onClick={()=>pin==='123456'&&setOk(true)}>Entrar</button></div>;

 if(ativo!==null){
   const c=clientes[ativo];
   return <div className='app'>
     <button className='back' onClick={()=>setAtivo(null)}>← Voltar</button>
     <h2>{c.nome}</h2><p>{c.pacote} • {c.usadas}/{c.total}</p>

     <div className='photos'>
       <label className='photoBox'>{antes?<img src={antes} alt='antes'/>:<span>Foto Antes</span>}<input type='file' accept='image/*' hidden onChange={e=>{const f=e.target.files?.[0];if(f)setAntes(URL.createObjectURL(f));}}/></label>
       <label className='photoBox'>{depois?<img src={depois} alt='depois'/>:<span>Foto Depois</span>}<input type='file' accept='image/*' hidden onChange={e=>{const f=e.target.files?.[0];if(f)setDepois(URL.createObjectURL(f));}}/></label>
     </div>

     {antes&&depois&&<div className='compare'><div className='compareWrap'><img src={antes} className='imgA'/><div className='mask' style={{width:`${slider}%`}}><img src={depois} className='imgB'/></div></div><input type='range' min='0' max='100' value={slider} onChange={e=>setSlider(e.target.value)}/></div>}

     <textarea rows='3' placeholder='Observação da sessão' value={obs} onChange={e=>setObs(e.target.value)}/>
     <canvas ref={ref} width='360' height='140' style={{width:'100%',background:'#111',borderRadius:'16px'}} onPointerDown={e=>{const ctx=ref.current.getContext('2d');ctx.strokeStyle='#E8E1D8';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);const move=f=>{ctx.lineTo(f.offsetX,f.offsetY);ctx.stroke()};const up=()=>{ref.current.onpointermove=null;window.onpointerup=null};ref.current.onpointermove=f=>move(f.nativeEvent);window.onpointerup=up;}}/>

     <button className='novo' onClick={()=>{const n=[...clientes];if(n[ativo].usadas<n[ativo].total){n[ativo].usadas++;n[ativo].historico=[...(n[ativo].historico||[]),{data:new Date().toLocaleDateString('pt-PT'),obs,antes,depois}];setClientes(n);setObs('');setAntes(null);setDepois(null);setAtivo(null);}}}>Concluir Sessão</button>

     <div className='lista'>{(c.historico||[]).slice().reverse().map((h,i)=><div className='cliente' key={i}><div><h3>Sessão {c.historico.length-i}</h3><span>{h.data}</span><p>{h.obs}</p></div></div>)}</div>
   </div>;
 }

 return <div className='app'>
   <header><h1>OCCHY</h1><p>Passaporte Digital</p></header>
   <div className='card'>
     <input placeholder='Nome da cliente' value={nome} onChange={e=>setNome(e.target.value)}/>
     <input placeholder='WhatsApp' value={tel} onChange={e=>setTel(e.target.value)}/>
     <select value={pacote} onChange={e=>setPacote(e.target.value)}><option>Essencial</option><option>Ativação</option><option>Continuidade</option><option>Anual</option></select>
     <button className='novo' onClick={()=>{if(!nome.trim())return;setClientes([{nome,telefone:tel,pacote,total:totais[pacote],usadas:0,historico:[]} ,...clientes]);setNome('');setTel('');}}>+ Nova Cliente</button>
   </div>

   <div className='lista'>{clientes.length===0?<div className='cliente'><div><h3>Nenhuma cliente cadastrada</h3><span>Começa pelo primeiro cadastro.</span></div></div>:clientes.map((c,i)=><div key={i} className='cliente'><div><h3>{c.nome}</h3><span>{c.pacote} • {c.usadas}/{c.total}</span></div><button className='sessao' onClick={()=>setAtivo(i)}>Abrir</button></div>)}</div>
   <nav><span>Clientes</span><span>Hoje</span><span>Perfil</span></nav>
 </div>;
}