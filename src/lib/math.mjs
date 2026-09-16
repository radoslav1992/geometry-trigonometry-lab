export const rad = n => n * Math.PI / 180;
export const deg = n => n * 180 / Math.PI;
export const clamp = (n, low, high) => Math.min(high, Math.max(low, n));
export const fmt = (n, digits = 3) => Math.abs(n) < 1e-10 ? '0' : Number(n.toFixed(digits)).toLocaleString('en-US', { maximumFractionDigits: digits });
const positive = values => { if (values.some(n => !Number.isFinite(n) || n <= 0 || n > 1e9)) throw new Error('Enter positive, finite values no greater than 1 billion.'); };
function fromSides(a, b, c) {
  positive([a,b,c]);
  if (a+b<=c || a+c<=b || b+c<=a) throw new Error('These sides cannot form a triangle. Any two sides must add up to more than the third.');
  const A=deg(Math.acos(clamp((b*b+c*c-a*a)/(2*b*c),-1,1)));
  const B=deg(Math.acos(clamp((a*a+c*c-b*b)/(2*a*c),-1,1)));
  const C=180-A-B;
  const s=(a+b+c)/2;
  // Sorted form of Heron's formula reduces cancellation for thin triangles.
  const [x,y,z]=[a,b,c].sort((p,q)=>q-p);
  const area=Math.sqrt((x+(y+z))*(z-(x-y))*(z+(x-y))*(x+(y-z)))/4;
  return {a,b,c,A,B,C,area,perimeter:2*s,height:2*area/c};
}
export function solveTriangle(mode, values) {
  positive(values);
  const [x,y,z]=values;
  if (mode==='sss') return [fromSides(x,y,z)];
  if (mode==='sas') {
    if(z>=180) throw new Error('The included angle must be less than 180°.');
    return [fromSides(x,y,Math.sqrt((x-y)**2+4*x*y*Math.sin(rad(z)/2)**2))];
  }
  if (mode==='asa') {
    if(x+y>=180) throw new Error('The two angles must add up to less than 180°.');
    const C=180-x-y;
    return [fromSides(z*Math.sin(rad(x))/Math.sin(rad(C)),z*Math.sin(rad(y))/Math.sin(rad(C)),z)];
  }
  if (mode==='ssa') {
    if(z>=180) throw new Error('Angle A must be less than 180°.');
    const ratio=y*Math.sin(rad(z))/x;
    if(ratio>1+1e-12) throw new Error('No triangle exists for these measurements.');
    const B=deg(Math.asin(Math.abs(ratio-1)<1e-12?1:clamp(ratio,-1,1)));
    const angles=Math.abs(B-90)<1e-8?[B]:[B,180-B];
    const out=angles.filter(beta=>z+beta<180-1e-9).map(beta=>fromSides(x,y,x*Math.sin(rad(180-z-beta))/Math.sin(rad(z))));
    if(!out.length) throw new Error('No triangle exists for these measurements.');
    return out;
  }
  throw new Error('Choose a supported triangle mode.');
}
export function circleValues(angle) {
  const theta=rad(angle);
  const sin=Math.sin(theta),cos=Math.cos(theta);
  return {sin,cos,tan:Math.abs(cos)<1e-10?null:sin/cos,radians:theta};
}
export const SHAPES = {
  rectangle:{title:'Rectangle',kind:'area',fields:['Width','Height'],defaults:[8,5],formula:'A = w × h',calculate:([w,h])=>({Area:w*h,Perimeter:2*(w+h)})},
  circle:{title:'Circle',kind:'area',fields:['Radius'],defaults:[5],formula:'A = πr²',calculate:([r])=>({Area:Math.PI*r*r,Circumference:2*Math.PI*r})},
  triangle:{title:'Triangle',kind:'area',fields:['Base','Perpendicular height'],defaults:[8,5],formula:'A = ½bh',calculate:([b,h])=>({Area:b*h/2})},
  trapezoid:{title:'Trapezoid',kind:'area',fields:['Parallel side a','Parallel side b','Height'],defaults:[8,5,4],formula:'A = ½(a + b)h',calculate:([a,b,h])=>({Area:(a+b)*h/2})},
  sphere:{title:'Sphere',kind:'volume',fields:['Radius'],defaults:[5],formula:'V = ⁴⁄₃πr³',calculate:([r])=>({Volume:4/3*Math.PI*r**3,'Surface area':4*Math.PI*r*r})},
  cylinder:{title:'Cylinder',kind:'volume',fields:['Radius','Height'],defaults:[3,8],formula:'V = πr²h',calculate:([r,h])=>({Volume:Math.PI*r*r*h,'Surface area':2*Math.PI*r*(r+h)})},
  cone:{title:'Cone',kind:'volume',fields:['Radius','Height'],defaults:[3,8],formula:'V = ⅓πr²h',calculate:([r,h])=>({Volume:Math.PI*r*r*h/3,'Surface area':Math.PI*r*(r+Math.hypot(r,h))})},
  cuboid:{title:'Rectangular prism',kind:'volume',fields:['Width','Height','Depth'],defaults:[6,4,3],formula:'V = w × h × d',calculate:([w,h,d])=>({Volume:w*h*d,'Surface area':2*(w*h+w*d+h*d)})},
};
export function shapeValues(shape,values) { positive(values); if(!SHAPES[shape]) throw new Error('Choose a shape.'); if(values.length!==SHAPES[shape].fields.length) throw new Error('Fill in every dimension.'); return SHAPES[shape].calculate(values); }
export function gcd(a,b){while(b){[a,b]=[b,a%b];}return a;}
export function radiansLabel(angle){const rounded=Math.round(angle);if(Math.abs(angle-rounded)>1e-8)return fmt(rad(angle))+' rad';if(!rounded)return '0';const d=gcd(Math.abs(rounded),180);const n=rounded/d,den=180/d;return `${n===1?'':n===-1?'-':n}π${den===1?'':'/'+den}`;}
export function exactTrig(angle, type) {
  const a=((Math.round(angle)%360)+360)%360;
  if(Math.abs(angle-Math.round(angle))>1e-8)return null;
  const table={0:['0','1','0'],30:['½','√3/2','√3/3'],45:['√2/2','√2/2','1'],60:['√3/2','½','√3'],90:['1','0','undefined'],120:['√3/2','−½','−√3'],135:['√2/2','−√2/2','−1'],150:['½','−√3/2','−√3/3'],180:['0','−1','0'],210:['−½','−√3/2','√3/3'],225:['−√2/2','−√2/2','1'],240:['−√3/2','−½','√3'],270:['−1','0','undefined'],300:['−√3/2','½','−√3'],315:['−√2/2','√2/2','−1'],330:['−½','√3/2','−√3/3']};
  return table[a]?.[['sin','cos','tan'].indexOf(type)]??null;
}
