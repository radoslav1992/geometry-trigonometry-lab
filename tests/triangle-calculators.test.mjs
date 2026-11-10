// The law of cosines, law of sines and Heron's formula calculators: answers checked against
// independent formulas, the lessons' worked examples, and each other.
import test from 'node:test';import assert from 'node:assert/strict';
import {explorations,explore,toolSeo} from '../src/lib/explorations.mjs';import {explorationDiagram} from '../src/lib/diagrams.mjs';
import {solveTriangle,ssaTriangles} from '../src/lib/math.mjs';import {lessons} from '../src/lib/lessons.mjs';import {catalog} from '../src/lib/catalog.mjs';import {faqs} from '../src/lib/faqs.mjs';
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} ≠ ${b}`);
const rad=x=>x*Math.PI/180,sin=x=>Math.sin(rad(x)),cos=x=>Math.cos(rad(x));
const metric=(result,label)=>result.metrics.find(m=>m.label===label)?.value;
const cosines=(v,mode)=>explore('law-of-cosines-calculator',v,mode),sines=(v,mode)=>explore('law-of-sines-calculator',v,mode),heron=v=>explore('herons-formula-calculator',v);
const draws=(slug,result)=>{const svg=explorationDiagram(slug,result.model);assert.ok(svg.length>200);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);return svg};

test('law of cosines finds the third side from two sides and the included angle',()=>{
 const r=cosines({a:6,b:8,C:60},'sas');close(r.model.t.c,Math.sqrt(52));assert.equal(metric(r,'Side c'),'7.211');assert.equal(metric(r,'c²'),'52');
 assert.ok(r.steps[1].includes('36 + 64 − 96 × 0.5 = 100 − 48 = 52'),r.steps[1]);assert.ok(r.steps[2].includes('√52 = 7.211'));
 close(cosines({a:5,b:8,C:60},'sas').model.t.c,7);close(cosines({a:6,b:8,C:90},'sas').model.t.c,10);
 // An obtuse angle turns the subtraction into an addition.
 const obtuse=cosines({a:6,b:8,C:120},'sas');close(obtuse.model.t.c,Math.sqrt(148));assert.ok(obtuse.steps[1].includes('96 × (−0.5) = 100 + 48 = 148'),obtuse.steps[1]);
 for(let i=1;i<40;i++){const a=1+i*0.7,b=12-i*0.2,C=4*i+3,t=cosines({a,b,C},'sas').model.t;close(t.c,Math.sqrt(a*a+b*b-2*a*b*cos(C)),1e-7);close(t.C,C,1e-7);close(t.A+t.B+t.C,180,1e-7);close(t.area,a*b*sin(C)/2,1e-7);}
 draws('law-of-cosines-calculator',r);
});

test('law of cosines finds every angle from three sides',()=>{
 const r=cosines({a:7,b:8,c:9},'sss');assert.equal(metric(r,'Angle C'),'73.398°');assert.equal(metric(r,'Angle A'),'48.19°');assert.equal(metric(r,'Angle B'),'58.412°');assert.equal(metric(r,'cos C'),'0.2857');
 assert.ok(r.steps[1].includes('(49 + 64 − 81) / 112 = 32 / 112 = 0.2857'),r.steps[1]);
 const obtuse=cosines({a:4,b:6,c:9},'sss');assert.equal(metric(obtuse,'Angle C'),'127.169°');assert.ok(obtuse.steps[2].includes('obtuse'));
 const right=cosines({a:3,b:4,c:5},'sss');assert.equal(metric(right,'Angle C'),'90°');assert.ok(right.steps[2].includes('right angle'));
 for(const [a,b,c] of [[2,3,4],[10,10,1],[5,12,13],[8,3,6.5]]){const t=cosines({a,b,c},'sss').model.t;close(cos(t.C),(a*a+b*b-c*c)/(2*a*b));close(cos(t.A),(b*b+c*c-a*a)/(2*b*c));close(t.A+t.B+t.C,180);}
 // The two modes undo each other.
 const back=cosines({a:6,b:8,c:cosines({a:6,b:8,C:75},'sas').model.t.c},'sss');close(back.model.t.C,75,1e-7);
 draws('law-of-cosines-calculator',obtuse);
});

test('law of cosines rejects impossible triangles and only checks the fields its mode uses',()=>{
 for(const sides of [{a:2,b:3,c:6},{a:1,b:2,c:3},{a:0,b:2,c:3},{a:-1,b:2,c:3},{a:NaN,b:2,c:3}])assert.throws(()=>cosines(sides,'sss'),JSON.stringify(sides));
 for(const v of [{a:6,b:8,C:180},{a:6,b:8,C:0},{a:6,b:8,C:-20},{a:6,b:NaN,C:60},{a:6,b:8}])assert.throws(()=>cosines(v,'sas'),JSON.stringify(v));
 assert.throws(()=>cosines({a:6,b:8,C:60,c:9},'aas'));assert.throws(()=>cosines({a:6,b:8,C:60,c:9}));
 // A leftover value in the hidden field cannot block the other mode.
 close(cosines({a:6,b:8,C:60,c:NaN},'sas').model.t.c,Math.sqrt(52));close(cosines({a:7,b:8,C:999,c:9},'sss').model.t.C,solveTriangle('sss',[7,8,9])[0].C);
});

test('law of sines solves two angles and a side (AAS and ASA)',()=>{
 const r=sines({A:40,B:60,a:10},'aas');assert.equal(metric(r,'Angle C'),'80°');assert.equal(metric(r,'Side b'),'13.473');assert.equal(metric(r,'Side c'),'15.321');
 close(r.model.t.b,10*sin(60)/sin(40));close(r.model.t.c,10*sin(80)/sin(40));close(r.model.t.a,10);assert.equal(metric(r,'a / sin A'),'15.557');
 const asa=sines({A:30,B:60,c:10},'asa');close(asa.model.t.a,5);close(asa.model.t.b,5*Math.sqrt(3));assert.equal(metric(asa,'Angle C'),'90°');assert.equal(metric(asa,'c / sin C'),'10');
 // Both modes describe the same triangle, and every side over the sine of its opposite angle agrees.
 for(let i=1;i<30;i++){const A=5+i*3,B=170-A-i*2.5,a=2+i,t=sines({A,B,a},'aas').model.t,again=sines({A,B,c:t.c},'asa').model.t;
  close(again.a,a,1e-7);close(again.b,t.b,1e-7);close(t.a/sin(A),t.b/sin(B),1e-7);close(t.a/sin(A),t.c/sin(t.C),1e-7);close(t.A+t.B+t.C,180,1e-7);}
 for(const v of [{A:100,B:80,a:5},{A:120,B:90,a:5},{A:0,B:60,a:5},{A:40,B:60,a:0},{A:40,B:60,a:-3},{A:40,B:NaN,a:5}])assert.throws(()=>sines(v,'aas'),JSON.stringify(v));
 assert.throws(()=>sines({A:40,B:60,a:10},'asa'));
 draws('law-of-sines-calculator',r);draws('law-of-sines-calculator',asa);
});

test('the ambiguous case (SSA) reports zero, one or two triangles',()=>{
 const two=sines({a:7,b:10,A:30},'ssa');assert.equal(metric(two,'Triangles'),'2');assert.equal(metric(two,'Angle B'),'45.585° or 134.415°');assert.equal(metric(two,'Angle C'),'104.415° or 15.585°');assert.equal(metric(two,'Side c'),'13.559 or 3.761');assert.equal(metric(two,'Height h = b sin A'),'5');
 assert.match(draws('law-of-sines-calculator',two),/Two triangles/);
 // Too short to reach the base: a result, not an error.
 const none=sines({a:4,b:10,A:30},'ssa');assert.equal(metric(none,'Triangles'),'0');assert.equal(metric(none,'sin B'),'1.25');assert.equal(metric(none,'Angle B'),undefined);assert.ok(none.steps.some(s=>s.includes('no triangle exists')));assert.ok(none.metrics.length>=3&&none.steps.length>=3);
 assert.match(draws('law-of-sines-calculator',none),/No triangle/);
 const tangent=sines({a:5,b:10,A:30},'ssa');assert.equal(metric(tangent,'Triangles'),'1');assert.equal(metric(tangent,'Angle B'),'90°');close(tangent.model.triangles[0].c,5*Math.sqrt(3));
 const longer=sines({a:8,b:6,A:50},'ssa');assert.equal(metric(longer,'Triangles'),'1');assert.equal(metric(longer,'Angle B'),'35.067°');assert.equal(metric(longer,'Angle C'),'94.933°');
 const obtuse=sines({a:10,b:6,A:120},'ssa');assert.equal(metric(obtuse,'Triangles'),'1');assert.match(draws('law-of-sines-calculator',obtuse),/One triangle/);
 for(const v of [{a:5,b:10,A:120},{a:10,b:10,A:90},{a:6,b:10,A:100},{a:9,b:10,A:120}]){const r=sines(v,'ssa');assert.equal(metric(r,'Triangles'),'0',JSON.stringify(v));assert.ok(r.steps[1].includes('no triangle exists'));draws('law-of-sines-calculator',r);}
 for(const v of [{a:7,b:10,A:180},{a:0,b:10,A:30},{a:7,b:-1,A:30},{a:7,b:10,A:NaN}])assert.throws(()=>sines(v,'ssa'),JSON.stringify(v));
});

test('the number of SSA triangles follows the table in the law of sines guide',()=>{
 let seen=new Set();
 for(const A of [20,35,50,65,80,90,100,125,150])for(const b of [4,7,10])for(const k of [0.3,0.6,0.9,1.1,1.5,2.2,3.5]){
  const h=b*sin(A),a=A<90?h*k:b*k*0.8,expected=A<90?(a<h?0:a<b?2:1):(a>b?1:0),ts=ssaTriangles(a,b,A);
  assert.equal(ts.length,expected,`A=${A} a=${a} b=${b}`);assert.equal(metric(sines({a,b,A},'ssa'),'Triangles'),String(expected));seen.add(expected);
  for(const t of ts){close(t.a,a,1e-7);close(t.b,b,1e-7);close(t.A,A,1e-7);close(t.A+t.B+t.C,180,1e-7);close(t.a/sin(t.A),t.b/sin(t.B),1e-7);close(t.a/sin(t.A),t.c/sin(t.C),1e-7);}
  if(ts.length===2){assert.ok(ts[0].B<90&&ts[1].B>90&&ts[0].c>ts[1].c);close(ts[0].B+ts[1].B,180,1e-7);}
  // The triangle solver's SSA mode is built on the same function.
  if(expected)assert.deepEqual(solveTriangle('ssa',[a,b,A]),ts);else assert.throws(()=>solveTriangle('ssa',[a,b,A]));
 }
 assert.deepEqual([...seen].sort(),[0,1,2]);
 const table=lessons.find(l=>l.slug==='law-of-sines').table.rows.map(row=>row.join(' | '));
 for(const row of ['Acute | a < h | None','Acute | a = h | One right triangle','Acute | h < a < b | Two','Acute | a ≥ b | One','Right or obtuse | a ≤ b | None','Right or obtuse | a > b | One'])assert.ok(table.includes(row),row);
});

test('Heron’s formula gives the area from three sides and checks the triangle inequality',()=>{
 const r=heron({a:5,b:6,c:7});close(r.model.area,Math.sqrt(216));assert.equal(metric(r,'Area'),'14.697 units²');assert.equal(metric(r,'Semiperimeter s'),'9');assert.equal(metric(r,'Perimeter'),'18');
 assert.ok(r.steps[0].includes('5 + 6 = 11 is greater than 7'));assert.ok(r.steps[2].includes('s − a = 4, s − b = 3, s − c = 2'));assert.ok(r.steps[3].includes('√(9 × 4 × 3 × 2) = √216 = 14.697'),r.steps[3]);
 close(heron({a:13,b:14,c:15}).model.area,84);close(heron({a:3,b:4,c:5}).model.area,6);close(heron({a:6,b:6,c:6}).model.area,9*Math.sqrt(3));close(heron({a:5,b:5,c:6}).model.area,12);close(heron({a:5,b:5,c:8}).model.area,12);
 assert.equal(metric(heron({a:3,b:4,c:5}),'Height to c'),'2.4');assert.equal(metric(heron({a:13,b:14,c:15}),'Height to b'),'12');
 // Against ½ab sin C for triangles built from two sides and an angle, and in any order of the sides.
 for(let i=1;i<40;i++){const a=2+i*0.4,b=15-i*0.3,C=4*i+2,c=Math.sqrt(a*a+b*b-2*a*b*cos(C)),area=a*b*sin(C)/2;for(const [x,y,z] of [[a,b,c],[c,a,b],[b,c,a]]){const t=heron({a:x,b:y,c:z});close(t.model.area,area,1e-7);const s=(a+b+c)/2;close(t.model.area**2,s*(s-a)*(s-b)*(s-c),1e-6);}}
 assert.throws(()=>heron({a:2,b:3,c:6}),/2 \+ 3 = 5 is not greater than 6/);assert.throws(()=>heron({a:6,b:2,c:3}),/2 \+ 3 = 5 is not greater than 6/);assert.throws(()=>heron({a:1,b:2,c:3}),/1 \+ 2 = 3 is not greater than 3/);
 for(const v of [{a:0,b:2,c:3},{a:-5,b:6,c:7},{a:NaN,b:6,c:7},{a:5,b:6},{a:Infinity,b:6,c:7}])assert.throws(()=>heron(v),JSON.stringify(v));
 assert.match(draws('herons-formula-calculator',r),/Area = 14.697 square units/);draws('herons-formula-calculator',heron({a:4,b:6,c:9}));draws('herons-formula-calculator',heron({a:9,b:4,c:6}));
});

test('the calculators are listed, titled and linked like every other tool',()=>{
 const wanted={'law-of-cosines-calculator':['Law of Cosines Calculator','law-of-cosines'],'law-of-sines-calculator':['Law of Sines Calculator','law-of-sines'],'herons-formula-calculator':['Heron’s Formula Calculator','herons-formula']};
 for(const [slug,[lead,lessonSlug]] of Object.entries(wanted)){
  const tool=explorations.find(t=>t.slug===slug),lesson=lessons.find(l=>l.slug===lessonSlug),seo=toolSeo[slug];
  assert.ok(tool&&seo,slug);assert.ok(seo.title.startsWith(lead),seo.title);assert.ok(seo.title.length<=60);assert.ok(seo.description.length>=120&&seo.description.length<=155,`${seo.description.length}`);assert.ok(seo.intro.length>100&&seo.h1);
  // The tool links to its lesson and the lesson links back, both under its calculator and in its closing strip.
  assert.equal(tool.lesson,lessonSlug);assert.equal(lesson.href,`/tools/${slug}/`);assert.equal(lesson.calculatorLink[1],`/tools/${slug}/`);
  assert.ok(catalog.some(item=>item.href===`/tools/${slug}/`),slug);assert.ok(faqs[slug].length>=3,slug);for(const item of faqs[slug])assert.doesNotMatch(item.answer,/NaN|undefined|Infinity/);
  for(const [mode,keys] of Object.entries(tool.modeFields||{})){assert.ok(tool.modes.some(m=>m[0]===mode));for(const key of keys)assert.ok(tool.fields.some(f=>f.key===key),`${slug} ${mode} ${key}`);}
 }
 assert.match(toolSeo['law-of-cosines-calculator'].title+toolSeo['law-of-cosines-calculator'].intro,/cosine rule/i);assert.match(toolSeo['law-of-sines-calculator'].intro,/ambiguous case/i);
 // The numbers quoted in the questions are the calculators' own.
 assert.ok(faqs['law-of-cosines-calculator'][2].answer.includes('32 / 112 = 0.2857')&&faqs['law-of-cosines-calculator'][2].answer.includes('73.398°'));
 assert.ok(faqs['law-of-sines-calculator'][1].answer.includes('45.585° or 134.415°')&&faqs['law-of-sines-calculator'][1].answer.includes('13.559 or 3.761'));
 assert.ok(faqs['herons-formula-calculator'][0].answer.includes('√216 = 14.697')&&faqs['herons-formula-calculator'][1].answer.includes('2 + 3 = 5 is not greater than 6'));
});
