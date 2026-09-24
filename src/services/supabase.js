import {createClient} from '@supabase/supabase-js';
export const supabase=createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_ANON_KEY);
export async function salvarCliente(cliente){return supabase.from('clientes').insert(cliente);}
export async function listarClientes(){return supabase.from('clientes').select('*').order('created_at',{ascending:false});}
export async function salvarSessao(sessao){return supabase.from('sessoes').insert(sessao);}
export async function uploadFoto(path,file){return supabase.storage.from('occhy-fotos').upload(path,file,{upsert:true});}