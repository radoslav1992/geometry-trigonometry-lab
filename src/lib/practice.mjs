export const QUESTIONS=[
 {topic:'geometry',q:'A right triangle has legs of 3 cm and 4 cm. How long is its hypotenuse?',choices:['5 cm','7 cm','12 cm','25 cm'],answer:0,why:'By Pythagoras, c = √(3² + 4²) = √25 = 5 cm.'},
 {topic:'geometry',q:'A triangle has angles of 45° and 65°. What is the third angle?',choices:['70°','80°','110°','60°'],answer:0,why:'The interior angles total 180°, so the missing angle is 180 − 45 − 65 = 70°.'},
 {topic:'geometry',q:'A circle has radius 3 cm. What is its exact area?',choices:['9π cm²','6π cm²','3π cm²','18π cm²'],answer:0,why:'A = πr² = π × 3² = 9π cm². The expression 6π cm would be its circumference.'},
 {topic:'geometry',q:'A rectangle measures 8 m by 5 m. What is its perimeter?',choices:['26 m','40 m','13 m','80 m'],answer:0,why:'Add all four sides: 8 + 5 + 8 + 5 = 26 m. Area would be 40 m².'},
 {topic:'geometry',q:'Which set of side lengths can form a triangle?',choices:['4, 5, 6','2, 3, 5','1, 2, 4','2, 2, 5'],answer:0,why:'Any two sides must sum to more than the third. The lengths 2, 3, 5 form a straight line, not a triangle.'},
 {topic:'geometry',q:'A triangle has base 10 cm and perpendicular height 6 cm. What is its area?',choices:['30 cm²','60 cm²','16 cm²','120 cm²'],answer:0,why:'A = ½bh = ½ × 10 × 6 = 30 cm².'},
 {topic:'geometry',q:'A cube has edge length 3 cm. What is its volume?',choices:['27 cm³','9 cm³','18 cm³','54 cm³'],answer:0,why:'V = edge³ = 3 × 3 × 3 = 27 cm³. Surface area would be 6 × 3² = 54 cm².'},
 {topic:'geometry',q:'Double the radius of a circle. What happens to its area?',choices:['It becomes 4 times larger','It doubles','It becomes 8 times larger','It stays the same'],answer:0,why:'A = πr². Replacing r with 2r gives π(2r)² = 4πr².'},
 {topic:'geometry',q:'A cylinder has radius 2 cm and height 5 cm. What is its volume?',choices:['20π cm³','10π cm³','40π cm³','25π cm³'],answer:0,why:'V = πr²h = π × 2² × 5 = 20π cm³.'},
 {topic:'geometry',q:'How many square faces does a cube have?',choices:['6','4','8','12'],answer:0,why:'A cube has 6 faces, 8 vertices, and 12 edges. Its net therefore contains 6 squares.'},
 {topic:'trigonometry',q:'What is sin 30°?',choices:['½','√3/2','√2/2','1'],answer:0,why:'At 30° on the unit circle, the y-coordinate is ½. Sine is the y-coordinate.'},
 {topic:'trigonometry',q:'What is cos 60°?',choices:['½','√3/2','0','1'],answer:0,why:'At 60°, the point on the unit circle is (½, √3/2). Cosine is its x-coordinate.'},
 {topic:'trigonometry',q:'How many radians is 180°?',choices:['π','2π','π/2','π/4'],answer:0,why:'One full turn is 360° = 2π radians. A half turn is therefore π radians.'},
 {topic:'trigonometry',q:'At which angle is tangent undefined?',choices:['90°','0°','45°','180°'],answer:0,why:'tan θ = sin θ / cos θ. At 90°, cosine is zero, so this would require division by zero.'},
 {topic:'trigonometry',q:'In quadrant II, what are the signs of sine and cosine?',choices:['Sine positive, cosine negative','Both positive','Both negative','Sine negative, cosine positive'],answer:0,why:'Quadrant II is above the x-axis and left of the y-axis. Therefore y = sin θ > 0 and x = cos θ < 0.'},
 {topic:'trigonometry',q:'What is sin² θ + cos² θ?',choices:['1','0','2','It depends on θ'],answer:0,why:'The point (cos θ, sin θ) lies on a circle of radius 1. By Pythagoras, cos² θ + sin² θ = 1.'},
 {topic:'trigonometry',q:'What is tan 45°?',choices:['1','0','½','√3'],answer:0,why:'At 45°, sine and cosine are equal. Their ratio is 1.'},
 {topic:'trigonometry',q:'How many degrees is π/3 radians?',choices:['60°','30°','90°','120°'],answer:0,why:'Multiply radians by 180/π: (π/3) × (180/π) = 60°.'},
 {topic:'trigonometry',q:'What is cos 180°?',choices:['−1','1','0','½'],answer:0,why:'At 180°, the point on the unit circle is (−1, 0). Cosine is the x-coordinate.'},
 {topic:'trigonometry',q:'In a right triangle, which ratio equals sine of an acute angle?',choices:['Opposite / hypotenuse','Adjacent / hypotenuse','Opposite / adjacent','Hypotenuse / opposite'],answer:0,why:'SOH: Sine = Opposite / Hypotenuse. CAH gives cosine and TOA gives tangent.'},
];
export function shuffle(items){const arr=[...items];for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
export function makeRound(topic='mixed',count=8){if(!['mixed','geometry','trigonometry','coordinates','polygons','solids'].includes(topic))throw new Error('Choose a valid topic.');if(!Number.isInteger(count)||count<1||count>20)throw new Error('Choose 1 to 20 questions.');return shuffle(QUESTIONS.filter(q=>topic==='mixed'||q.topic===topic)).slice(0,count).map(q=>{const choices=shuffle(q.choices.map((text,i)=>({text,correct:i===q.answer})));return {...q,choices};});}

function numericQuestion(topic,q,correct,why,unit=''){
 const format=n=>Number(n.toFixed(3)).toString()+unit;
 const values=[correct,correct+1,correct*2,correct/2,correct+3,correct-2,correct+7];
 const choices=[...new Set(values.map(format))].slice(0,4);
 QUESTIONS.push({topic,q,choices,answer:0,why});
}
for(const [a,b,c] of [[5,12,13],[8,15,17],[7,24,25],[9,12,15],[12,16,20]]){
 numericQuestion('geometry',`A right triangle has legs ${a} and ${b}. Find its hypotenuse.`,c,`c = √(${a}² + ${b}²) = ${c}.`);
 numericQuestion('geometry',`Find the area of a triangle with base ${a} and perpendicular height ${b}.`,a*b/2,`Area = ½ × ${a} × ${b} = ${a*b/2}.`,' units²');
}
for(const n of [1,2,4,5,7])numericQuestion('trigonometry',`Convert ${n}π/6 radians to degrees.`,n*30,`${n}π/6 × 180/π = ${n*30}°.`,'°');
for(const [angle,correct] of [[120,'−½'],[135,'−√2/2'],[150,'−√3/2'],[240,'−½'],[300,'½']])QUESTIONS.push({topic:'trigonometry',q:`What is the exact value of cos ${angle}°?`,choices:[correct,...['0','1','−1'].filter(x=>x!==correct)].slice(0,4),answer:0,why:`Use the reference angle and quadrant. At ${angle}°, the x-coordinate on the unit circle is ${correct}.`});
for(let i=1;i<=5;i++){
 numericQuestion('coordinates',`Find the distance from (0, 0) to (${3*i}, ${4*i}).`,5*i,`d = √(${3*i}² + ${4*i}²) = ${5*i}.`);
 numericQuestion('coordinates',`What is the slope through (0, ${i}) and (2, ${i+2*i})?`,i,`Slope = (${i+2*i} − ${i}) / (2 − 0) = ${i}.`);
 numericQuestion('coordinates',`What is the x-coordinate of the midpoint between (${i}, 2) and (${i+6}, 8)?`,i+3,`Average the x-coordinates: (${i} + ${i+6}) / 2 = ${i+3}. The full midpoint is (${i+3}, 5).`);
 QUESTIONS.push({topic:'coordinates',q:`Reflect (${i}, −${i+2}) across the x-axis. What is the new point?`,choices:[`(${i}, ${i+2})`,`(−${i}, −${i+2})`,`(−${i}, ${i+2})`,`(${i+2}, ${i})`],answer:0,why:'A reflection across the x-axis keeps x and changes the sign of y.'});
}
for(const n of [3,4,5,6,7,8,9,10,12,15]){
 numericQuestion('polygons',`What is the interior-angle sum of a ${n}-sided convex polygon?`,(n-2)*180,`(n − 2) × 180° = (${n} − 2) × 180° = ${(n-2)*180}°.`,'°');
 numericQuestion('polygons',`How many diagonals does a ${n}-sided convex polygon have?`,n*(n-3)/2,`n(n − 3)/2 = ${n} × ${n-3} / 2 = ${n*(n-3)/2}.`);
}
for(let edge=2;edge<=6;edge++){
 numericQuestion('solids',`Find the volume of a cube with edge ${edge} cm.`,edge**3,`V = edge³ = ${edge}³ = ${edge**3} cm³.`,' cm³');
 numericQuestion('solids',`Find the total surface area of a cube with edge ${edge} cm.`,6*edge*edge,`Six square faces give S = 6 × ${edge}² = ${6*edge*edge} cm².`,' cm²');
 numericQuestion('solids',`A prism measures ${edge} × 3 × 4 cm. What is its volume?`,edge*12,`V = width × height × depth = ${edge} × 3 × 4 = ${edge*12} cm³.`,' cm³');
 numericQuestion('solids',`A solid is uniformly enlarged by a scale factor of ${edge}. By what factor does its volume grow?`,edge**3,`Each of three dimensions scales by ${edge}, so volume scales by ${edge}³ = ${edge**3}.`,'×');
}
