import type {APIRoute} from 'astro';
import {unitCircleChartSvg} from '../lib/diagrams.mjs';
export const GET:APIRoute=()=>new Response(unitCircleChartSvg(),{headers:{'Content-Type':'image/svg+xml; charset=utf-8'}});
