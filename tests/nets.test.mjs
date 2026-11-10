// Printable nets: each net must be the true unfolding of its solid, so that it folds back up.
import test from 'node:test';import assert from 'node:assert/strict';
import {NETS,netSvg,netGeometry,netDetails,netMesh,netCounts,partArea,polygonsOverlap,coneSectorAngle} from '../src/lib/nets.mjs';
import {netPages} from '../src/lib/net-pages.mjs';import {faqs} from '../src/lib/faqs.mjs';import {shapeValues} from '../src/lib/math.mjs';
import {shapeFacts} from '../src/lib/shape-facts.mjs';import {explorations} from '../src/lib/explorations.mjs';import {lessons} from '../src/lib/lessons.mjs';
const close=(a,b,tol=1e-6)=>assert.ok(Math.abs(a-b)<tol,`${a} ≠ ${b}`);
const SQ3=Math.sqrt(3),dist=(p,q)=>Math.hypot(...p.map((n,i)=>n-q[i]));
// Surface areas written out independently of nets.mjs.
const surface={cube:([a])=>6*a*a,prism:([w,h,d])=>2*(w*h+w*d+h*d),'triangular-prism':([s,l])=>SQ3/2*s*s+3*s*l,'hexagonal-prism':([s,l])=>3*SQ3*s*s+6*s*l,pyramid:([b,l])=>b*b+2*b*l,tetrahedron:([a])=>SQ3*a*a,octahedron:([a])=>2*SQ3*a*a,cylinder:([r,h])=>2*Math.PI*r*(r+h),cone:([r,l])=>Math.PI*r*(r+l)};
const samples={cube:[[30],[5],[42]],prism:[[35,40,25],[10,90,20],[42,40,42]],'triangular-prism':[[35,60],[50,10],[8,100]],'hexagonal-prism':[[20,45],[5,100],[27,10]],pyramid:[[40,45],[40,21],[50,55]],tetrahedron:[[50],[5],[80]],octahedron:[[40],[10],[48]],cylinder:[[20,50],[5,100],[26,20]],cone:[[20,50],[40,42],[5,100],[35,60]]};
const netArea=(shape,vals)=>netGeometry(shape,vals).parts.reduce((sum,part)=>sum+partArea(part),0);

test('the total area of every net equals the surface area of its solid',()=>{
 assert.deepEqual(Object.keys(samples).sort(),Object.keys(NETS).sort());
 for(const [shape,list] of Object.entries(samples))for(const vals of list){close(netArea(shape,vals),surface[shape](vals));close(netDetails(shape,vals).area,surface[shape](vals));}
 // The same answers as the volume calculator gives for the matching solids.
 close(netArea('prism',[35,40,25]),shapeValues('cuboid',[35,40,25])['Surface area']);close(netArea('cube',[30]),shapeValues('cuboid',[30,30,30])['Surface area']);
 close(netArea('cylinder',[20,50]),shapeValues('cylinder',[20,50])['Surface area']);close(netArea('cone',[30,50]),shapeValues('cone',[30,40])['Surface area']);
});

test('polyhedron meshes are closed solids with the stated faces, edges and vertices',()=>{
 for(const [shape,net] of Object.entries(NETS)){
  if(net.curved){assert.equal(netMesh(shape,net.values),null);continue;}
  for(const vals of samples[shape]){
   const {v,faces}=netMesh(shape,vals),edges=new Map(),centre=[0,1,2].map(i=>v.reduce((sum,p)=>sum+p[i],0)/v.length);
   for(const [,idx] of faces){
    idx.forEach((a,k)=>{const b=idx[(k+1)%idx.length],id=a<b?`${a}-${b}`:`${b}-${a}`;edges.set(id,[...(edges.get(id)||[]),`${a}>${b}`]);});
    // Corners run counter-clockwise seen from outside: the face normal points away from the middle of the solid.
    const [p,q,r]=idx.map(i=>v[i]),u=q.map((n,i)=>n-p[i]),w=r.map((n,i)=>n-p[i]),normal=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];
    assert.ok(normal.reduce((sum,n,i)=>sum+n*(p[i]-centre[i]),0)>0,`${shape}: a face points inwards`);
    for(const i of idx)close(normal.reduce((sum,n,j)=>sum+n*(v[i][j]-p[j]),0),0,1e-6);
   }
   // Every edge joins exactly two faces, which run along it in opposite directions.
   for(const [id,uses] of edges){assert.equal(uses.length,2,`${shape} edge ${id}`);assert.notEqual(uses[0],uses[1]);}
   assert.equal(faces.length,net.faces,shape);assert.equal(edges.size,net.edges,shape);assert.equal(v.length,net.vertices,shape);assert.equal(v.length-edges.size+faces.length,2);
  }
 }
 // Regular solids really have equal edges, and the pyramid's faces have the slant height asked for.
 for(const shape of ['tetrahedron','octahedron']){const {v,faces}=netMesh(shape,[40]);for(const [,idx] of faces)idx.forEach((a,k)=>close(dist(v[a],v[idx[(k+1)%idx.length]]),40));}
 const pyramid=netMesh('pyramid',[40,45]);close(dist(pyramid.v[4],[0,0,0].map((_,i)=>(pyramid.v[0][i]+pyramid.v[1][i])/2)),45);close(pyramid.v[4][1],Math.sqrt(45**2-20**2));
});

test('each face is unfolded at true size, joined along a real edge, without overlaps',()=>{
 for(const [shape,net] of Object.entries(NETS)){
  if(net.curved)continue;
  for(const vals of samples[shape]){
   const mesh=netMesh(shape,vals),g=netGeometry(shape,vals),polys=g.parts.map(part=>part.pts);
   assert.equal(polys.length,net.faces);
   polys.forEach((pts,f)=>{const idx=mesh.faces[f][1];assert.equal(pts.length,idx.length);
    // Every side and every diagonal keeps its 3D length, so the flat face is congruent to the real one.
    for(let i=0;i<idx.length;i++)for(let j=i+1;j<idx.length;j++)close(dist(pts[i],pts[j]),dist(mesh.v[idx[i]],mesh.v[idx[j]]));});
   for(let i=0;i<polys.length;i++)for(let j=i+1;j<polys.length;j++)assert.ok(!polygonsOverlap(polys[i],polys[j]),`${shape} ${vals}: faces ${i} and ${j} overlap`);
   // A net is a tree of faces: F − 1 fold lines; the other E − (F − 1) edges are cut and each needs one tab.
   const folds=g.strokes.filter(s=>s.fold).length-g.tabs.length;
   assert.equal(folds,net.faces-1,shape);assert.equal(g.seams,net.edges-net.faces+1,shape);assert.equal(g.tabs.length,g.seams,`${shape} ${vals}`);
   for(const [child,parent] of mesh.tree){const shared=polys[child].filter(p=>polys[parent].some(q=>dist(p,q)<1e-6));assert.equal(shared.length,2,`${shape}: face ${child} is not hinged to face ${parent}`);}
   for(const tab of g.tabs){for(const face of polys)assert.ok(!polygonsOverlap(tab,face),`${shape} ${vals}: a tab covers a face`);assert.equal(g.tabs.filter(other=>other!==tab&&polygonsOverlap(tab,other)).length,0);}
   assert.equal(netGeometry(shape,vals,{tabs:false}).tabs.length,0);
  }
 }
 assert.equal(netGeometry('cube',[30]).seams,7);assert.equal(netGeometry('pyramid',[40,45]).seams,4);assert.equal(NETS.octahedron.faces-1,7);
});

test('a cone net is a sector of angle 360° × r ÷ slant height with an arc as long as the base edge',()=>{
 close(coneSectorAngle(20,50),144);close(coneSectorAngle(3,5),216);close(coneSectorAngle(25,100),90);
 for(const [r,slant] of samples.cone){
  const [sector,circle]=netGeometry('cone',[r,slant]).parts,angle=sector.a1-sector.a0;
  assert.equal(sector.kind,'sector');assert.equal(circle.kind,'circle');
  close(angle*180/Math.PI,360*r/slant);close(sector.r,slant);close(circle.r,r);
  close(sector.r*angle,2*Math.PI*r);
  // The base circle touches the middle of the arc from outside.
  close(dist(circle.c,sector.c),slant+r);close(Math.atan2(circle.c[1]-sector.c[1],circle.c[0]-sector.c[0]),(sector.a0+sector.a1)/2);
  close(partArea(sector),Math.PI*r*slant);
 }
 assert.throws(()=>netSvg('cone',[30,30]));assert.throws(()=>netSvg('cone',[30,20]));
});

test('a cylinder net is a rectangle 2πr wide with two circles of radius r touching it',()=>{
 for(const [r,h] of samples.cylinder){
  const [rect,top,bottom]=netGeometry('cylinder',[r,h]).parts,xs=rect.pts.map(p=>p[0]),ys=rect.pts.map(p=>p[1]);
  close(Math.max(...xs)-Math.min(...xs),2*Math.PI*r);close(Math.max(...ys)-Math.min(...ys),h);
  for(const circle of [top,bottom]){close(circle.r,r);close(circle.c[0],(Math.max(...xs)+Math.min(...xs))/2);}
  close(Math.min(...ys)-top.c[1],r);close(bottom.c[1]-Math.max(...ys),r);
 }
});

test('glue teeth on curved nets never cover the circle they are glued to',()=>{
 for(const shape of ['cylinder','cone'])for(const vals of samples[shape]){
  const g=netGeometry(shape,vals),circles=g.parts.filter(part=>part.kind==='circle');
  assert.ok(g.tabs.length>=3,`${shape} ${vals}`);
  for(const tab of g.tabs)for(const circle of circles)for(const p of tab)assert.ok(dist(p,circle.c)>circle.r-1e-6,`${shape} ${vals}`);
 }
});

test('every net draws on one A4 page at every sample size and rejects sizes that do not fit',()=>{
 for(const [shape,list] of Object.entries(samples))for(const vals of list)for(const tabs of [true,false]){
  const svg=netSvg(shape,vals,{tabs});assert.match(svg,/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="190mm" height="250mm" viewBox="0 0 190 250"/);assert.doesNotMatch(svg,/NaN|undefined|Infinity/);
  const [x0,y0,x1,y1]=netGeometry(shape,vals,{tabs}).box;assert.ok(x1-x0<=180&&y1-y0<=210);
 }
 // The claim in the rectangular prism questions: with tabs, 2 × width + 2 × depth can be at most 168 mm.
 assert.ok(netSvg('prism',[42,40,42]));assert.throws(()=>netSvg('prism',[43,40,42]));
 for(const [shape,vals] of [['cube',[60]],['tetrahedron',[100]],['octahedron',[60]],['cylinder',[30,50]],['cone',[60,90]],['hexagonal-prism',[30,40]],['triangular-prism',[60,60]],['cylinder',[20]],['cone',[20,50,3]],['dodecahedron',[20]],['cube',[NaN]]])assert.throws(()=>netSvg(shape,vals),`${shape} ${vals}`);
 // Face labels can be switched off, and are left off faces too small to hold them.
 assert.ok(!netSvg('cube',[30],{labels:false}).includes('>Front<'));assert.ok(netSvg('cube',[30]).includes('>Front<'));assert.ok(!netSvg('cube',[5]).includes('>Bottom<'));
});

test('the three original nets keep their file names, layout and tab count',()=>{
 assert.deepEqual(['cube','prism','pyramid'].map(shape=>NETS[shape].file),['cube-net','rectangular-prism-net','square-pyramid-net']);
 // The cube cross: four squares in a row, with Top above and Bottom below Front.
 const byName=Object.fromEntries(netGeometry('cube',[30]).parts.map(part=>[part.name,part.pts]));
 const corner=name=>[Math.min(...byName[name].map(p=>p[0])),Math.min(...byName[name].map(p=>p[1]))];
 const [fx,fy]=corner('Front');
 for(const [name,dx,dy] of [['Right',30,0],['Back',60,0],['Left',90,0],['Top',0,-30],['Bottom',0,30]]){close(corner(name)[0]-fx,dx);close(corner(name)[1]-fy,dy);}
 assert.equal(netGeometry('cube',[30]).tabs.length,7);assert.equal(netGeometry('prism',[35,40,25]).tabs.length,7);assert.equal(netGeometry('pyramid',[40,45]).tabs.length,4);
});

test('every net has its own page copy, questions and working links',()=>{
 const slugs=Object.values(NETS).map(net=>net.slug);assert.equal(new Set(slugs).size,slugs.length);assert.ok(slugs.length>=9);
 assert.deepEqual(Object.keys(netPages).sort(),Object.keys(NETS).sort());
 const titles=new Set(),descriptions=new Set();
 for(const [shape,net] of Object.entries(NETS)){
  const page=netPages[shape];
  assert.match(page.title,new RegExp(`^Printable ${net.title} Net`,'i'),page.title);assert.ok(page.title.length<=60,page.title);
  assert.ok(page.description.length>=120&&page.description.length<=155,`${page.description.length}: ${page.description}`);
  titles.add(page.title);descriptions.add(page.description);
  assert.ok(page.intro.length>80&&page.fold.length>=4&&page.faceText,shape);
  assert.ok(faqs[`printable-nets/${net.slug}`].length>=3,shape);
  for(const item of faqs[`printable-nets/${net.slug}`])assert.doesNotMatch(item.answer,/NaN|undefined|Infinity/);
  assert.equal(net.file,`${net.slug}-net`);assert.ok(netCounts(shape).split(' · ').length>=3);
  const info=netDetails(shape,net.values);assert.ok(info.pieces.length>=1&&info.steps.length>=2&&info.formula.startsWith('S = '));
  for(const [label,href] of page.links){
   assert.ok(label.length>10,shape);
   const [,section,slug]=href.split('/');
   if(section==='shapes')assert.ok(shapeFacts[slug],href);else if(section==='tools')assert.ok(explorations.some(tool=>tool.slug===slug),href);else if(section==='learn')assert.ok(lessons.some(lesson=>lesson.slug===slug),href);else assert.equal(href,'/volume-calculator/');
  }
 }
 assert.equal(titles.size,slugs.length);assert.equal(descriptions.size,slugs.length);
 // Solids that have a shape page link to it.
 for(const [shape,href] of [['prism','/shapes/cuboid/'],['cube','/shapes/cuboid/'],['cylinder','/shapes/cylinder/'],['cone','/shapes/cone/']])assert.ok(netPages[shape].links.some(link=>link[1]===href),shape);
});
