import {explorations} from './explorations.mjs';
export const catalog=[
 {title:'Triangle solver',description:'Solve SSS, SAS, AAS, and ambiguous SSA triangles with worked steps.',href:'/triangle-solver/',category:'Geometry',icon:'△',meta:'Four solving modes'},
 {title:'Interactive unit circle',description:'Drag an angle and connect sine, cosine, tangent, and exact values.',href:'/unit-circle/',category:'Trigonometry',icon:'⊙',meta:'Exact values + radians'},
 {title:'Area & perimeter',description:'Measure rectangles, triangles, circles, and trapezoids.',href:'/area-calculator/',category:'Geometry',icon:'▱',meta:'Four plane shapes'},
 {title:'Volume & surface area',description:'Explore spheres, cylinders, cones, and rectangular prisms.',href:'/volume-calculator/',category:'Solids',icon:'▧',meta:'Four solid shapes'},
 ...explorations.map(t=>({title:t.title,description:t.description,href:'/tools/'+t.slug+'/',category:t.category,icon:t.icon,meta:'Visual explanation + steps'})),
 {title:'Shape atlas',description:'Compare the properties, formulas, and uses of familiar shapes.',href:'/shapes/',category:'Reference',icon:'◇',meta:'Eight detailed shape pages'},
 {title:'Printable shape nets',description:'Customize, download, print, and fold a cube, prism, or pyramid.',href:'/printable-nets/',category:'Solids',icon:'▧',meta:'SVG + print to PDF'},
 {title:'Worksheet builder',description:'Create a printable practice sheet with an optional answer key.',href:'/worksheets/',category:'Practice',icon:'▤',meta:'8, 12, or 20 questions'},
 {title:'Practice studio',description:'Take a short quiz, read explanations, and review your mistakes.',href:'/practice/',category:'Practice',icon:'∠',meta:'Five topics + mixed practice'},
 {title:'Formula field notes',description:'Learn the method, work through an example, and avoid common mistakes.',href:'/learn/',category:'Reference',icon:'ƒ',meta:'Sixteen concept guides'},
];
