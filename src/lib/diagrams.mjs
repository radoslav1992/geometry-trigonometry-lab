import {fmt,rad,radiansLabel,exactTrig} from './math.mjs';
const point=p=>[360+p[0]*22,260-p[1]*22];
const text=(x,y,value,color='#274f46',size=16)=>`<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" style="fill:${color};font-size:${size}px">${value}</text>`;
const line=(p,q,color='#087f8c',dash=false)=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${color}" stroke-width="2" ${dash?'stroke-dasharray="6 5"':''}/>`;
const polygon=(points,color='#087f8c')=>`<polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="${color}18" stroke="${color}" stroke-width="2.5"/>`;
function axisGrid(){let out='';for(let i=-10;i<=10;i++){out+=line(point([i,-10]),point([i,10]),i===0?'#90aaa0':'#dfebe5');out+=line(point([-10,i]),point([10,i]),i===0?'#90aaa0':'#dfebe5');if(i!==0&&i%2===0){out+=text(point([i,0])[0],280,i,'#6a8076',12);out+=text(345,point([0,i])[1]+4,i,'#6a8076',12)}}return out+text(598,255,'x')+text(372,29,'y');}
const dot=(p,label,index,color='#087f8c')=>`<circle cx="${p[0]}" cy="${p[1]}" r="15" fill="transparent" ${index!==null?`data-point="${index}" style="cursor:grab"`:''}/><circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${color}" stroke="white" stroke-width="2" pointer-events="none"/>${text(p[0]+15,p[1]-13,label,color)}`;
// Labels for the triangle calculators: orange marks a value the tool worked out.
const HOT='#be632c',INK='#274f46';
const label=(x,y,value,anchor='middle',color=INK,size=18)=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" fill="${color}" style="fill:${color};font-size:${size}px">${value}</text>`;
const short=(value,digits=2)=>fmt(value,digits).replace('-','−');
// A triangle drawn to scale on side c, with A at the left, B at the right and C on top.
function triangleSketch(t,hot=[],inside=''){
 const ux=(t.b*t.b+t.c*t.c-t.a*t.a)/(2*t.c),uy=Math.sqrt(Math.max(0,t.b*t.b-ux*ux)),minX=Math.min(0,ux),maxX=Math.max(t.c,ux),scale=Math.min(400/(maxX-minX),285/uy),left=360-(maxX+minX)*scale/2;
 const A=[left,400],B=[left+t.c*scale,400],C=[left+ux*scale,400-uy*scale],tone=key=>hot.includes(key)?HOT:INK,mid=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2];
 // Side labels sit just outside their side: pushed away from the opposite vertex.
 const beside=(p,q,other,text,key)=>{const [mx,my]=mid(p,q),dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy)||1;let nx=-dy/len,ny=dx/len;if((other[0]-mx)*nx+(other[1]-my)*ny>0){nx=-nx;ny=-ny;}return label(mx+nx*14,my+ny*14+5,text,nx<-0.2?'end':nx>0.2?'start':'middle',tone(key))};
 let out=polygon([A,B,C])+inside;
 if(inside)out+=line(C,[C[0],400],'#d57b42',true)+(C[0]<A[0]-1||C[0]>B[0]+1?line(C[0]<A[0]?A:B,[C[0],400],'#aabdb1',true):'');
 out+=[A,B,C].map(p=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="#087f8c" stroke="white" stroke-width="2"/>`).join('');
 out+=label(Math.min(A[0]+8,(A[0]+B[0])/2-5),A[1]+28,`A = ${short(t.A)}°`,'end',tone('A'))+label(Math.max(B[0]-8,(A[0]+B[0])/2+5),B[1]+28,`B = ${short(t.B)}°`,'start',tone('B'))+label(C[0],C[1]-16,`C = ${short(t.C)}°`,'middle',tone('C'));
 out+=label((A[0]+B[0])/2,A[1]+54,`c = ${short(t.c,3)}`,'middle',tone('c'))+beside(A,C,B,`b = ${short(t.b,3)}`,'b')+beside(B,C,A,`a = ${short(t.a,3)}`,'a');
 return out;
}
// The ambiguous case: side b is fixed along angle A, and side a swings from C like a compass.
// Where its arc meets the base line there is a triangle: twice, once, or not at all.
function ambiguousSketch(m){
 const A=rad(m.A),C=[m.b*Math.cos(A),m.b*Math.sin(A)],ends=m.triangles.map(t=>[t.c,0]),down=-Math.PI/2;
 const turns=ends.map(p=>Math.atan2(p[1]-C[1],p[0]-C[0])),from=ends.length?Math.min(...turns)-0.3:down-0.9,to=ends.length?Math.max(...turns)+0.3:down+0.9;
 const arc=Array.from({length:41},(_,i)=>{const t=from+(to-from)*i/40;return[C[0]+m.a*Math.cos(t),C[1]+m.a*Math.sin(t)]});
 const reach=Math.max(C[0],m.b*0.6,...ends.map(p=>p[0]),...arc.map(p=>p[0]))*1.08,all=[[0,0],C,[reach,0],...arc],xs=all.map(p=>p[0]),ys=all.map(p=>p[1]);
 const minX=Math.min(...xs),maxY=Math.max(...ys),minY=Math.min(...ys),scale=Math.min(470/(Math.max(...xs)-minX),300/(maxY-minY)),left=360-(Math.max(...xs)+minX)*scale/2+minX*scale;
 const at=p=>[left+(p[0]-minX)*scale,105+(maxY-p[1])*scale],a=at([0,0]),c=at(C),foot=at([C[0],0]);
 // The label for side b sits on its outer side, and moves towards A when the arc would cross it.
 const along=Math.abs(m.a-m.b/2)<0.2*m.b?0.22:0.5;
 let out=line(at([Math.min(0,C[0]),0]),at([reach,0]),'#90aaa0')+`<polyline points="${arc.map(p=>at(p).map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#d57b42" stroke-width="2" stroke-dasharray="6 5"/>`;
 ends.forEach((p,i)=>{out+=i?`<polygon points="${[a,at(p),c].map(q=>q.map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="#d0753b18" stroke="#d0753b" stroke-width="2.5"/>`:polygon([a,at(p),c])});
 if(!ends.length)out+=line(a,c);
 if(m.A<90)out+=line(c,foot,'#8aa39a',true)+label(foot[0]+8,(c[1]+foot[1])/2+5,`h = ${short(m.h,3)}`,'start','#6a8076',16);
 ends.forEach((p,i)=>{const q=at(p),name=ends.length>1?`B${'₁₂'[i]}`:'B';out+=`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="5" fill="${i?'#d0753b':'#087f8c'}" stroke="white" stroke-width="2"/>`+(i?label(q[0]+6,q[1]+48,`${name} = ${short(m.triangles[i].B)}°`,'end',HOT):label(q[0]+10,q[1]+24,`${name} = ${short(m.triangles[i].B)}°`,'start',HOT))});
 out+=[a,c].map(p=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="#087f8c" stroke="white" stroke-width="2"/>`).join('')+label(a[0]-10,a[1]+26,`A = ${short(m.A)}°`,'end')+label(c[0],c[1]-16,'C')+label(a[0]+(c[0]-a[0])*along-12*Math.sin(A),a[1]+(c[1]-a[1])*along-12*Math.cos(A)+5,`b = ${short(m.b,3)}`,'end');
 out+=label(360,478,ends.length===2?`Two triangles: c = ${short(m.triangles[0].c,3)} or c = ${short(m.triangles[1].c,3)}`:ends.length?`One triangle: c = ${short(m.triangles[0].c,3)}`:`No triangle: side a = ${short(m.a,3)} cannot reach the base line`,'middle',HOT)+label(360,502,`Dashed arc: every place side a = ${short(m.a,3)} can end`,'middle','#6a8076',15);
 return out;
}
export function explorationDiagram(slug,m){
 let out='';
 if(slug==='law-of-cosines-calculator')out=triangleSketch(m.t,m.hot);
 if(slug==='law-of-sines-calculator')out=m.mode==='ssa'?ambiguousSketch(m):triangleSketch(m.t,m.hot);
 if(slug==='herons-formula-calculator')out=triangleSketch(m.t,m.hot,label(360,455+38,`Area = ${short(m.area,3)} square units`,'middle',HOT));
 if(slug==='right-triangle'){const scale=Math.min(350/m.b,300/m.a),p=[200,405],q=[200+m.b*scale,405],r=[200,405-m.a*scale];out=polygon([p,q,r])+`<path d="M 200 383 h 22 v 22" stroke="#d57b42" fill="none" stroke-width="2"/>`+text(175,(p[1]+r[1])/2,`a = ${fmt(m.a)}`)+text((p[0]+q[0])/2,442,`b = ${fmt(m.b)}`)+text((q[0]+r[0])/2+35,(q[1]+r[1])/2,`c = ${fmt(m.c)}`);}
 if(slug==='polygon-explorer'){const pts=Array.from({length:m.n},(_,i)=>[360+170*Math.cos(i*2*Math.PI/m.n-Math.PI/2),250+170*Math.sin(i*2*Math.PI/m.n-Math.PI/2)]);out=polygon(pts);pts.forEach((p,i)=>{out+=line([360,250],p,'#b8d5c6',true);if(m.n<=12)out+=text(360+(p[0]-360)*1.14,250+(p[1]-250)*1.14+5,String(i+1),'#507666',13)});const mid=[(pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2];out+=line([360,250],mid,'#d57b42')+text(360,475,`${m.n} equal sides · ${m.n} equal angles`);}
 if(slug==='coordinate-geometry'){const [a,b]=m.points.map(point),mid=point(m.mid);out=axisGrid()+line(a,[b[0],a[1]],'#d57b42',true)+line([b[0],a[1]],b,'#d57b42',true)+line(a,b)+dot(mid,'M',null,'#bd713e')+dot(a,'A',0)+dot(b,'B',1);}
 if(slug==='circle-sectors'){const cx=360,cy=250,r=170,theta=m.theta,t=rad(theta),end=[cx+r*Math.cos(t),cy-r*Math.sin(t)];out=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#bed8ca" stroke-width="2"/>`;if(theta===360)out+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#dceee3" stroke="#087f8c" stroke-width="3"/>`;else if(theta>0)out+=`<path d="M ${cx} ${cy} L ${cx+r} ${cy} A ${r} ${r} 0 ${theta>180?1:0} 0 ${end.join(' ')} Z" fill="#087f8c20" stroke="#087f8c" stroke-width="2.5"/>`;out+=line([cx+r,cy],end,'#db783e',true)+text(cx,470,`${theta}° sector · radius ${fmt(m.r)}`)+text(cx+55*Math.cos(t/2),cy-55*Math.sin(t/2),`${theta}°`);}
 if(slug==='angle-converter'){const t=rad(m.normalized),end=[360+170*Math.cos(t),260-170*Math.sin(t)];out=`<circle cx="360" cy="260" r="170" fill="#dceee340" stroke="#aec9b8" stroke-width="2"/>`+line([150,260],[565,260],'#aabdb1')+line([360,60],[360,460],'#aabdb1')+line([360,260],end)+dot(end,'θ',null)+text(360,500,`${fmt(m.degrees,3)}° → ${fmt(m.normalized,3)}° after full turns`);}
 if(slug==='trig-graphs'){const px=x=>60+(x+2*Math.PI)/(4*Math.PI)*600,py=y=>260-y*26;for(let i=-8;i<=8;i+=2){out+=line([60,py(i)],[660,py(i)],i===0?'#9db7aa':'#dfebe5')+text(40,py(i)+5,i,'#6a8076',12)}for(let i=-2;i<=2;i++){const x=px(i*Math.PI);out+=line([x,42],[x,474],i===0?'#9db7aa':'#dfebe5')+text(x,497,i===0?'0':i===1?'π':i===-1?'−π':i+'π','#6a8076',13)}out+=line([60,py(m.k)],[660,py(m.k)],'#c76b26',true);const pts=Array.from({length:601},(_,i)=>{const x=-2*Math.PI+i*4*Math.PI/600;const y=m.a*Math[m.fn](m.b*(x-m.h))+m.k;return[px(x),py(y)]});out+=`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#167860" stroke-width="3"/>`;}
 if(slug==='transformations'){out=axisGrid()+polygon(m.before.map(point),'#86a69a')+polygon(m.after.map(point),'#d0753b');m.before.forEach((p,i)=>out+=dot(point(p),'ABC'[i],null,'#729686'));m.after.forEach((p,i)=>out+=dot(point(p),'ABC'[i]+'′',null,'#be632c'));}
 if(slug==='triangle-playground'){out=axisGrid()+polygon(m.points.map(point));const centroid=point(m.center);m.points.forEach((p,i)=>{const others=m.points.filter((_,j)=>i!==j);const mid=point([(others[0][0]+others[1][0])/2,(others[0][1]+others[1][1])/2]);out+=line(point(p),mid,'#dca77f',true)});out+=dot(centroid,'G',null,'#c47139');m.points.forEach((p,i)=>out+=dot(point(p),'ABC'[i],i));}
 return out;
}
// A printable unit-circle chart: each special angle with its radian measure, (cos θ, sin θ), and tan θ.
export const SPECIAL_ANGLES=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330];
export function unitCircleChartSvg(){
 const c=450,r=210,label=318,esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const t=(x,y,value,size=15,color='#142b40',weight=400)=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(value)}</text>`;
 let out=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" width="900" height="900" font-family="Georgia, serif" role="img" aria-labelledby="unit-circle-chart-title"><title id="unit-circle-chart-title">Unit circle chart with degrees, radians, sine, cosine, and tangent for every special angle</title><rect width="900" height="900" fill="#fffefa"/>`;
 out+=`<line x1="${c-r-45}" y1="${c}" x2="${c+r+45}" y2="${c}" stroke="#a8bdb5" stroke-width="1.5"/><line x1="${c}" y1="${c-r-45}" x2="${c}" y2="${c+r+45}" stroke="#a8bdb5" stroke-width="1.5"/><circle cx="${c}" cy="${c}" r="${r}" fill="#64bfc512" stroke="#087f8c" stroke-width="2.5"/>`;
 out+=['I','II','III','IV'].map((q,i)=>t(c+(i===0||i===3?1:-1)*95,c+(i<2?-1:1)*95+6,q,26,'#9fc7cb',700)).join('');
 for(const a of SPECIAL_ANGLES){
  const th=rad(a),x=Math.cos(th),y=Math.sin(th),px=c+x*r,py=c-y*r,lx=c+x*label,ly=c-y*label;
  const tan=exactTrig(a,'tan');
  out+=`<line x1="${c}" y1="${c}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="#cfe3e1" stroke-width="1"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5.5" fill="#087f8c" stroke="#fff" stroke-width="2"/>`;
  out+=t(lx,ly-17,`${a}° · ${radiansLabel(a)}`,15,'#087f8c',700)+t(lx,ly+2,`(${exactTrig(a,'cos')}, ${exactTrig(a,'sin')})`,14)+t(lx,ly+20,`tan ${tan==='undefined'?'undefined':tan}`,13,'#b85b20');
 }
 out+=t(c,32,'The unit circle · point = (cos θ, sin θ) · tan θ = sin θ / cos θ',18,'#142b40',700)+t(c,880,'geometrylab.net/unit-circle/',13,'#526779');
 return out+'</svg>';
}
