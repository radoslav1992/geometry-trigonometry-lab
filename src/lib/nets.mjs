import {fmt} from './math.mjs';
// Printable nets in millimeters for one A4 page. Shared by the live generator, the prerendered
// previews, the net pages, and the downloadable SVG files. Text sizes are inline styles so page CSS
// cannot enlarge them.
//
// Polyhedra are built as 3D meshes and unfolded along a chosen tree of fold edges, so every face has
// its true size and is attached along a real edge of the solid: the net folds up by construction.
// The cylinder and cone are drawn directly: a rectangle 2πr wide, and a sector whose arc is 2πr long.
const TAU=2*Math.PI,SQ3=Math.sqrt(3);
export const NETS={
 cube:{slug:'cube',title:'Cube',file:'cube-net',labels:['Edge length (mm)'],values:[30],faces:6,edges:12,vertices:8,text:'Six equal squares in a cross. Fold them up into a box with all edges equal.'},
 prism:{slug:'rectangular-prism',title:'Rectangular prism',file:'rectangular-prism-net',labels:['Width (mm)','Height (mm)','Depth (mm)'],values:[35,40,25],faces:6,edges:12,vertices:8,text:'Six rectangles in three matching pairs. Choose any width, height, and depth that fits the page.'},
 'triangular-prism':{slug:'triangular-prism',title:'Triangular prism',file:'triangular-prism-net',labels:['Triangle side (mm)','Length (mm)'],values:[35,60],faces:5,edges:9,vertices:6,text:'Three equal rectangles in a row with an equilateral triangle on each end of the middle one.'},
 'hexagonal-prism':{slug:'hexagonal-prism',title:'Hexagonal prism',file:'hexagonal-prism-net',labels:['Hexagon side (mm)','Length (mm)'],values:[20,45],faces:8,edges:18,vertices:12,text:'Six equal rectangles in a row with a regular hexagon above and below.'},
 pyramid:{slug:'square-pyramid',title:'Square pyramid',file:'square-pyramid-net',labels:['Base width (mm)','Slant height (mm)'],values:[40,45],faces:5,edges:8,vertices:5,text:'A square base with four triangular faces. Slant height is the height of each triangle, not of the pyramid.'},
 tetrahedron:{slug:'tetrahedron',title:'Tetrahedron',file:'tetrahedron-net',labels:['Edge length (mm)'],values:[50],faces:4,edges:6,vertices:4,text:'Four equilateral triangles that make one large triangle. A regular tetrahedron is a triangular pyramid with all edges equal.'},
 octahedron:{slug:'octahedron',title:'Octahedron',file:'octahedron-net',labels:['Edge length (mm)'],values:[40],faces:8,edges:12,vertices:6,text:'Eight equilateral triangles: a strip of six with one more on each side.'},
 cylinder:{slug:'cylinder',title:'Cylinder',file:'cylinder-net',labels:['Radius (mm)','Height (mm)'],values:[20,50],curved:'2 flat circular faces · 1 curved surface · 2 curved edges · 0 vertices',text:'A rectangle that rolls into the curved surface, with a circle for each end. The rectangle is exactly one circumference wide.'},
 cone:{slug:'cone',title:'Cone',file:'cone-net',labels:['Radius (mm)','Slant height (mm)'],values:[20,50],curved:'1 flat circular face · 1 curved surface · 1 curved edge · 1 vertex (apex)',text:'A sector of a circle that rolls into the curved surface, with a circle for the base. Slant height is measured along the side of the cone.'},
};
// Faces, edges and vertices as one line, for cards and page summaries.
export const netCounts=shape=>NETS[shape].curved||`${NETS[shape].faces} faces · ${NETS[shape].edges} edges · ${NETS[shape].vertices} vertices`;
// The sector that rolls into a cone: its arc must equal the base circumference, so θ = 360° × r / ℓ.
export const coneSectorAngle=(r,slant)=>360*r/slant;

function check(shape,vals){
 const net=NETS[shape];if(!net)throw Error('Choose a solid from the list.');
 if(vals.length!==net.labels.length||vals.some(v=>!Number.isFinite(v)||v<5||v>100))throw Error('Use dimensions between 5 and 100 mm.');
 if(shape==='pyramid'&&vals[1]<=vals[0]/2)throw Error('Slant height must be greater than half the base width.');
 if(shape==='cone'&&vals[1]<=vals[0])throw Error('Slant height must be greater than the radius.');
 return net;
}

// --- Solids as meshes. Faces list their vertices counter-clockwise seen from outside. `tree` holds
// [face, parent] pairs: the fold edges that stay joined. Every other edge is cut and shows up twice on
// the outline; one copy of each pair gets a glue tab, preferring the faces listed in `tabs`.
const ring=(n,R,y)=>Array.from({length:n},(_,i)=>{const t=-Math.PI/2-Math.PI/n+i*TAU/n;return[R*Math.cos(t),y,-R*Math.sin(t)]});
function box(w,h,d){
 const v=[[0,0,d],[w,0,d],[w,h,d],[0,h,d],[0,0,0],[w,0,0],[w,h,0],[0,h,0]];
 return{v,faces:[['Front',[0,1,2,3]],['Right',[1,5,6,2]],['Back',[5,4,7,6]],['Left',[4,0,3,7]],['Top',[3,2,6,7]],['Bottom',[4,5,1,0]]],tree:[[1,0],[2,1],[3,2],[4,0],[5,0]],tabs:[4,5,3]};
}
// A right prism on a regular n-sided base: the side faces unfold in a row, with both bases on face `mid`.
function prism(n,s,length){
 const R=s/(2*Math.sin(Math.PI/n)),mid=Math.floor((n-1)/2),next=i=>(i+1)%n;
 const sides=Array.from({length:n},(_,i)=>['Side',[i,next(i),n+next(i),n+i]]);
 return{v:[...ring(n,R,0),...ring(n,R,length)],faces:[...sides,['Base',Array.from({length:n},(_,i)=>n+i)],['Base',Array.from({length:n},(_,i)=>n-1-i)]],tree:[...Array.from({length:n-1},(_,i)=>[i+1,i]),[n,mid],[n+1,mid]],tabs:[n,n+1,n-1]};
}
// A right pyramid on a regular n-sided base. `slant` is the height of each triangular face. A triangular
// base is turned half a turn so the finished net points upwards.
function pyramid(n,s,slant,baseName='Base'){
 const R=s/(2*Math.sin(Math.PI/n)),apothem=s/(2*Math.tan(Math.PI/n)),height=Math.sqrt(slant*slant-apothem*apothem);
 const sides=Array.from({length:n},(_,i)=>['Face',[i,(i+1)%n,n]]);
 return{v:[...ring(n,R,0),[0,height,0]],faces:[[baseName,Array.from({length:n},(_,i)=>n-1-i)],...sides],tree:sides.map((_,i)=>[i+1,0]),tabs:sides.map((_,i)=>i+1).filter(i=>i%2),spin:n===3?Math.PI:0};
}
function octahedron(a){
 const r=a/Math.SQRT2,v=[[r,0,0],[-r,0,0],[0,r,0],[0,-r,0],[0,0,r],[0,0,-r]],faces=[];
 for(const sz of [1,-1])for(const [sx,sy] of [[1,1],[-1,1],[-1,-1],[1,-1]]){const x=sx>0?0:1,y=sy>0?2:3,z=sz>0?4:5;faces.push(['Face',sx*sy*sz>0?[x,y,z]:[y,x,z]]);}
 // Faces 0–3 meet at the top vertex and 4–7 at the bottom one. A straight strip of six, then one triangle on each side.
 return{v,faces,tree:[[1,0],[5,1],[6,5],[7,6],[3,7],[2,6],[4,5]],tabs:[2,4,0,3]};
}
export function netMesh(shape,vals){
 const [a,b,c]=vals;
 if(shape==='cube')return box(a,a,a);
 if(shape==='prism')return box(a,b,c);
 if(shape==='triangular-prism')return prism(3,a,b);
 if(shape==='hexagonal-prism')return prism(6,a,b);
 if(shape==='pyramid')return pyramid(4,a,b);
 if(shape==='tetrahedron')return pyramid(3,a,a*SQ3/2,'Face');
 if(shape==='octahedron')return octahedron(a);
 return null;
}
const sub=(p,q)=>[p[0]-q[0],p[1]-q[1],p[2]-q[2]],dot=(p,q)=>p[0]*q[0]+p[1]*q[1]+p[2]*q[2],cross=(p,q)=>[p[1]*q[2]-p[2]*q[1],p[2]*q[0]-p[0]*q[2],p[0]*q[1]-p[1]*q[0]],unit=p=>{const l=Math.hypot(...p);return p.map(n=>n/l)};
// Lay every face flat. Each child face is rotated about the edge it shares with its parent, which in the
// plane means matching that edge's two endpoints with a turn and a slide (never a mirror image).
function unfold({v,faces,tree,spin=0}){
 const local=faces.map(([,idx])=>{const p=idx.map(i=>v[i]),u=unit(sub(p[1],p[0])),n=unit(cross(u,sub(p[2],p[0]))),w=cross(n,u);return p.map(q=>[dot(sub(q,p[0]),u),dot(sub(q,p[0]),w)])});
 const flat=[local[0].map(([x,y])=>[x*Math.cos(spin)-y*Math.sin(spin),x*Math.sin(spin)+y*Math.cos(spin)])];
 for(const [child,parent] of tree){
  const c=faces[child][1],p=faces[parent][1];
  const k=c.findIndex((a,i)=>{const j=p.indexOf(c[(i+1)%c.length]);return j>=0&&p[(j+1)%p.length]===a});
  if(k<0||!flat[parent])throw Error('Net faces must share an edge with a face that is already placed.');
  const A=flat[parent][p.indexOf(c[k])],B=flat[parent][p.indexOf(c[(k+1)%c.length])],La=local[child][k],Lb=local[child][(k+1)%c.length];
  const turn=Math.atan2(B[1]-A[1],B[0]-A[0])-Math.atan2(Lb[1]-La[1],Lb[0]-La[0]),cos=Math.cos(turn),sin=Math.sin(turn);
  flat[child]=local[child].map(([x,y])=>[A[0]+(x-La[0])*cos-(y-La[1])*sin,A[1]+(x-La[0])*sin+(y-La[1])*cos]);
 }
 return flat;
}
// True when two convex polygons overlap by more than a hairline (separating-axis test).
export function polygonsOverlap(P,Q){
 for(const poly of [P,Q])for(let i=0;i<poly.length;i++){
  const [x1,y1]=poly[i],[x2,y2]=poly[(i+1)%poly.length],nx=y2-y1,ny=x1-x2,len=Math.hypot(nx,ny);if(len<1e-9)continue;
  const span=R=>{let lo=Infinity,hi=-Infinity;for(const [x,y] of R){const d=(x*nx+y*ny)/len;lo=Math.min(lo,d);hi=Math.max(hi,d)}return[lo,hi]};
  const [a,b]=span(P),[c,d]=span(Q);if(b-c<1e-6||d-a<1e-6)return false;
 }
 return true;
}
// A glue tab on edge p→q of a face whose corners run counter-clockwise: the tab points away from the face.
function tabOn(p,q){
 const dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy),depth=Math.min(5,len/5),inset=Math.min(3,len/6),ux=dx/len,uy=dy/len,nx=uy,ny=-ux;
 return[p,[p[0]+ux*inset+nx*depth,p[1]+uy*inset+ny*depth],[q[0]-ux*inset+nx*depth,q[1]-uy*inset+ny*depth],q];
}
function polyhedronNet(mesh,tabs){
 const flat=unfold(mesh),ids=mesh.faces.map(f=>f[1]),key=(a,b)=>a<b?`${a}-${b}`:`${b}-${a}`;
 const folds=new Set(mesh.tree.map(([child,parent])=>{const c=ids[child],k=c.findIndex((a,i)=>ids[parent].includes(a)&&ids[parent].includes(c[(i+1)%c.length]));return key(c[k],c[(k+1)%c.length])}));
 const copies=new Map();
 ids.forEach((idx,f)=>idx.forEach((a,k)=>{const id=key(a,idx[(k+1)%idx.length]),side={f,p:flat[f][k],q:flat[f][(k+1)%idx.length]};copies.has(id)?copies.get(id).push(side):copies.set(id,[side])}));
 const rank=f=>{const i=mesh.tabs.indexOf(f);return i<0?mesh.faces.length:i},strokes=[],tabPolys=[];
 for(const [id,sides] of copies){
  if(folds.has(id)){strokes.push({pts:[sides[0].p,sides[0].q],fold:true});continue;}
  // A cut edge: try the preferred copy first, and never let a tab cover a face or another tab.
  const pick=tabs?[...sides].sort((a,b)=>rank(a.f)-rank(b.f)).find(s=>{const poly=tabOn(s.p,s.q);return!flat.some(face=>polygonsOverlap(poly,face))&&!tabPolys.some(t=>polygonsOverlap(poly,t))}):null;
  if(pick)tabPolys.push(tabOn(pick.p,pick.q));
  for(const s of sides)strokes.push({pts:[s.p,s.q],fold:s===pick});
 }
 // Screen coordinates run downwards, so flip y last: the printed side is the outside of the solid.
 const flip=pts=>pts.map(([x,y])=>[x,-y]);
 return{parts:flat.map((pts,i)=>({kind:'polygon',name:mesh.faces[i][0],pts:flip(pts)})),tabs:tabPolys.map(flip),strokes:strokes.map(s=>({...s,pts:flip(s.pts)})),seams:copies.size-folds.size};
}
// Small glue teeth along a straight or curved edge, left out wherever they would cover the touching circle.
function teeth(point,normal,length,circle){
 const n=Math.max(3,Math.round(length/10)),depth=Math.min(4,length/n/2),out=[];
 const reach=(p,q)=>{const dx=q[0]-p[0],dy=q[1]-p[1],t=Math.max(0,Math.min(1,((circle.c[0]-p[0])*dx+(circle.c[1]-p[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(p[0]+t*dx-circle.c[0],p[1]+t*dy-circle.c[1])};
 for(let i=0;i<n;i++){
  const t0=i/n,t1=(i+1)/n,lift=t=>{const p=point(t),m=normal(t);return[p[0]+m[0]*depth,p[1]+m[1]*depth]};
  const poly=[point(t0),lift(t0+(t1-t0)/4),lift(t1-(t1-t0)/4),point(t1)];
  out.push({t0,t1,poly,keep:[0,1,2].every(j=>reach(poly[j],poly[j+1])>circle.r+0.5)});
 }
 return out;
}
function cylinderNet([r,h],tabs){
 const W=TAU*r,top={c:[W/2,-r],r},bottom={c:[W/2,h+r],r};
 const out={parts:[{kind:'polygon',name:'Curved surface',pts:[[0,0],[W,0],[W,h],[0,h]]},{kind:'circle',name:'Base',...top},{kind:'circle',name:'Base',...bottom}],tabs:[],strokes:[{pts:[[0,0],[0,h]],fold:false},{pts:[[W,0],[W,h]],fold:tabs}],seams:3};
 if(tabs)out.tabs.push(tabOn([W,0],[W,h]));
 for(const [y,dir,circle] of [[0,-1,top],[h,1,bottom]]){
  if(!tabs){out.strokes.push({pts:[[0,y],[W,y]],fold:false});continue;}
  for(const tooth of teeth(t=>[W*t,y],()=>[0,dir],W,circle)){if(tooth.keep)out.tabs.push(tooth.poly);out.strokes.push({pts:[tooth.poly[0],tooth.poly[3]],fold:tooth.keep});}
 }
 return out;
}
function coneNet([r,slant],tabs){
 const theta=coneSectorAngle(r,slant)*Math.PI/180,a0=Math.PI/2-theta/2,a1=Math.PI/2+theta/2,at=(rho,phi)=>[rho*Math.cos(phi),rho*Math.sin(phi)],circle={c:[0,slant+r],r};
 const arc=(from,to)=>{const p=at(slant,from),q=at(slant,to);return`M ${num(p[0])} ${num(p[1])} A ${num(slant)} ${num(slant)} 0 ${to-from>Math.PI?1:0} 1 ${num(q[0])} ${num(q[1])}`};
 const out={parts:[{kind:'sector',name:'Curved surface',c:[0,0],r:slant,a0,a1},{kind:'circle',name:'Base',...circle}],tabs:[],strokes:[{pts:[[0,0],at(slant,a1)],fold:false},{pts:[[0,0],at(slant,a0)],fold:tabs}],seams:2};
 if(!tabs){out.strokes.push({d:arc(a0,a1),fold:false});return out;}
 // The straight-edge tab must stay inside the gap left by the sector, however flat the cone is.
 const gap=(TAU-theta)/2,depth=Math.min(5,slant/5,gap<Math.PI/2?0.35*slant*Math.tan(gap):Infinity),inset=Math.min(3,slant/6);
 const start=Math.max(inset+0.6*depth,gap<Math.PI/2?depth/Math.tan(gap):0),side=[Math.sin(a0)*depth,-Math.cos(a0)*depth],shift=p=>[p[0]+side[0],p[1]+side[1]];
 out.tabs.push([at(inset,a0),shift(at(start,a0)),shift(at(slant-inset-0.6*depth,a0)),at(slant-inset,a0)]);
 for(const tooth of teeth(t=>at(slant,a0+theta*t),t=>at(1,a0+theta*t),slant*theta,circle)){if(tooth.keep)out.tabs.push(tooth.poly);out.strokes.push({d:arc(a0+theta*tooth.t0,a0+theta*tooth.t1),fold:tooth.keep});}
 return out;
}
const num=n=>String(+n.toFixed(3));
// The flat pieces of a net (true size, in mm), its glue tabs, and its cut and fold lines.
export function netGeometry(shape,vals,{tabs=true}={}){
 check(shape,vals);
 const net=shape==='cylinder'?cylinderNet(vals,tabs):shape==='cone'?coneNet(vals,tabs):polyhedronNet(netMesh(shape,vals),tabs);
 const xs=[],ys=[];
 for(const part of net.parts){
  if(part.kind==='polygon')for(const [x,y] of part.pts){xs.push(x);ys.push(y);}
  if(part.kind==='circle'){xs.push(part.c[0]-part.r,part.c[0]+part.r);ys.push(part.c[1]-part.r,part.c[1]+part.r);}
  if(part.kind==='sector'){xs.push(part.c[0]);ys.push(part.c[1]);for(let i=0;i<=180;i++){const phi=part.a0+(part.a1-part.a0)*i/180;xs.push(part.c[0]+part.r*Math.cos(phi));ys.push(part.c[1]+part.r*Math.sin(phi));}}
 }
 return{...net,box:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)]};
}
export const partArea=part=>part.kind==='circle'?Math.PI*part.r**2:part.kind==='sector'?part.r**2*(part.a1-part.a0)/2:Math.abs(part.pts.reduce((sum,p,i)=>{const q=part.pts[(i+1)%part.pts.length];return sum+p[0]*q[1]-p[1]*q[0]},0))/2;
const centre=part=>part.kind==='polygon'?[0,1].map(i=>part.pts.reduce((sum,p)=>sum+p[i],0)/part.pts.length):part.kind==='sector'?[part.c[0]+0.62*part.r*Math.cos((part.a0+part.a1)/2),part.c[1]+0.62*part.r*Math.sin((part.a0+part.a1)/2)]:part.c;
// Width available for a face label at its centre, so names are left off faces too small to hold them.
const room=part=>{if(part.kind==='circle')return 2*part.r;if(part.kind==='sector')return 1.24*part.r*Math.sin(Math.min(Math.PI,part.a1-part.a0)/2);const xs=part.pts.map(p=>p[0]),ys=part.pts.map(p=>p[1]);return Math.max(...ys)-Math.min(...ys)<5?0:(Math.max(...xs)-Math.min(...xs))*(part.pts.length===3?0.55:1)};
const path=pts=>pts.map((p,i)=>`${i?'L':'M'} ${num(p[0])} ${num(p[1])}`).join(' ');
export function netSvg(shape,vals,{tabs=true,labels=true}={}){
 const net=check(shape,vals),g=netGeometry(shape,vals,{tabs}),[minX,minY,maxX,maxY]=g.box;
 if(maxX-minX+(tabs?12:0)>180||maxY-minY+(tabs?12:0)>210)throw Error('This net is too large for one A4 page. Reduce the dimensions.');
 const ink='stroke="#263e34" stroke-width="0.3"',fill='fill="#f8fbf9"';
 let content=g.parts.map(part=>part.kind==='polygon'?`<polygon points="${part.pts.map(p=>`${num(p[0])},${num(p[1])}`).join(' ')}" ${fill}/>`:part.kind==='circle'?`<circle cx="${num(part.c[0])}" cy="${num(part.c[1])}" r="${num(part.r)}" ${fill} ${ink}/>`:`<polygon points="${[part.c,...Array.from({length:91},(_,i)=>{const phi=part.a0+(part.a1-part.a0)*i/90;return[part.c[0]+part.r*Math.cos(phi),part.c[1]+part.r*Math.sin(phi)]})].map(p=>`${num(p[0])},${num(p[1])}`).join(' ')}" ${fill}/>`).join('');
 if(labels)content+=g.parts.filter(part=>room(part)>=part.name.length*1.9).map(part=>{const [x,y]=centre(part);return`<text x="${num(x)}" y="${num(y)}" text-anchor="middle" dominant-baseline="middle" style="font-size:3.4px;fill:#66796f">${part.name}</text>`}).join('');
 content+=g.tabs.map(pts=>`<path d="${path(pts)}" fill="#edf3ef" ${ink}/>`).join('');
 content+=g.strokes.map(s=>s.d?`<path d="${s.d}" fill="none" ${ink}${s.fold?' stroke-dasharray="2 1.5"':''}/>`:`<line x1="${num(s.pts[0][0])}" y1="${num(s.pts[0][1])}" x2="${num(s.pts[1][0])}" y2="${num(s.pts[1][1])}" ${ink}${s.fold?' stroke-dasharray="2 1.5"':''}/>`).join('');
 const size=net.labels.map((label,i)=>`${label.replace(' (mm)','').toLowerCase()} ${fmt(vals[i])}`).join(' · ');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="190mm" height="250mm" viewBox="0 0 190 250" role="img" aria-label="Printable ${net.title.toLowerCase()} net"><rect width="190" height="250" fill="white"/><text x="10" y="12" font-family="sans-serif" style="font-size:5px;fill:#173c3a">Geometry Lab · ${net.title} net</text><text x="10" y="20" font-family="sans-serif" style="font-size:3px;fill:#617674">${size} mm · solid: cut · dashed: fold</text><g transform="translate(${num(95-(maxX+minX)/2)} ${num(125-(maxY+minY)/2)})" font-family="sans-serif">${content}</g><path d="M 10 236 v 4 M 10 238 h 20 M 30 236 v 4" stroke="#263e34" stroke-width="0.4"/><text x="36" y="239" font-family="sans-serif" style="font-size:3px;fill:#263e34">20 mm scale check · print at 100% · geometrylab.net</text></svg>`;
}
// What a net is made of and the surface area it adds up to, with the working written out for the net pages.
export function netDetails(shape,vals){
 check(shape,vals);
 const [a,b,c]=vals,n=fmt,sq=x=>`${n(x)} mm²`,tri=s=>SQ3/4*s*s;
 const sum=(formula,rows)=>{const area=rows.reduce((total,row)=>total+row[2],0);return{formula,pieces:rows.map(row=>row[0]),steps:[...rows.map(row=>`${row[1]} = ${sq(row[2])}`),`${formula}${rows.length>1?` = ${rows.map(row=>n(row[2])).join(' + ')}`:''} = ${sq(area)} (${n(area/100)} cm²)`],area}};
 if(shape==='cube')return sum('S = 6a²',[[`6 squares, ${n(a)} × ${n(a)} mm`,`Six squares: 6 × ${n(a)} × ${n(a)}`,6*a*a]]);
 if(shape==='prism')return sum('S = 2(wh + wd + hd)',[[`Front and back: 2 rectangles, ${n(a)} × ${n(b)} mm`,`Front and back: 2 × ${n(a)} × ${n(b)}`,2*a*b],[`Left and right: 2 rectangles, ${n(c)} × ${n(b)} mm`,`Left and right: 2 × ${n(c)} × ${n(b)}`,2*c*b],[`Top and bottom: 2 rectangles, ${n(a)} × ${n(c)} mm`,`Top and bottom: 2 × ${n(a)} × ${n(c)}`,2*a*c]]);
 if(shape==='triangular-prism')return sum('S = 2 × (√3/4)s² + 3sL',[[`2 equilateral triangles with ${n(a)} mm sides`,`Two triangles: 2 × (√3/4) × ${n(a)}²`,2*tri(a)],[`3 rectangles, ${n(a)} × ${n(b)} mm`,`Three rectangles: 3 × ${n(a)} × ${n(b)}`,3*a*b]]);
 if(shape==='hexagonal-prism')return sum('S = 2 × (3√3/2)s² + 6sL',[[`2 regular hexagons with ${n(a)} mm sides`,`Two hexagons: 2 × (3√3/2) × ${n(a)}²`,12*tri(a)],[`6 rectangles, ${n(a)} × ${n(b)} mm`,`Six rectangles: 6 × ${n(a)} × ${n(b)}`,6*a*b]]);
 if(shape==='pyramid')return sum('S = b² + 2bℓ',[[`1 square base, ${n(a)} × ${n(a)} mm`,`Square base: ${n(a)} × ${n(a)}`,a*a],[`4 triangles with base ${n(a)} mm and height ${n(b)} mm`,`Four triangles: 4 × ½ × ${n(a)} × ${n(b)}`,2*a*b]]);
 if(shape==='tetrahedron')return sum('S = √3 a²',[[`4 equilateral triangles with ${n(a)} mm sides`,`Four triangles: 4 × (√3/4) × ${n(a)}²`,4*tri(a)]]);
 if(shape==='octahedron')return sum('S = 2√3 a²',[[`8 equilateral triangles with ${n(a)} mm sides`,`Eight triangles: 8 × (√3/4) × ${n(a)}²`,8*tri(a)]]);
 if(shape==='cylinder')return sum('S = 2πr² + 2πrh',[[`1 rectangle, ${n(TAU*a)} × ${n(b)} mm (width = 2πr)`,`Rectangle: 2π × ${n(a)} × ${n(b)}`,TAU*a*b],[`2 circles with radius ${n(a)} mm`,`Two circles: 2 × π × ${n(a)}²`,TAU*a*a]]);
 const angle=coneSectorAngle(a,b);
 return sum('S = πr² + πrℓ',[[`1 sector with radius ${n(b)} mm and angle ${n(angle)}° (360° × r ÷ ℓ)`,`Sector: (${n(angle)} ÷ 360) × π × ${n(b)}² = π × ${n(a)} × ${n(b)}`,Math.PI*a*b],[`1 circle with radius ${n(a)} mm`,`Circle: π × ${n(a)}²`,Math.PI*a*a]]);
}
