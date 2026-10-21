import type {APIRoute} from 'astro';
import {NETS,netSvg} from '../../lib/nets.mjs';
export function getStaticPaths(){return Object.entries(NETS).map(([shape,net])=>({params:{file:net.file},props:{shape}}));}
export const GET:APIRoute=({props})=>new Response(netSvg(props.shape,NETS[props.shape].values),{headers:{'Content-Type':'image/svg+xml; charset=utf-8'}});
