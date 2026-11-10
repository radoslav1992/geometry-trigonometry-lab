// Copy for the individual net pages at /printable-nets/<slug>/. Kept apart from nets.mjs so the
// browser bundle only carries the geometry. Keys match NETS; every number on a page comes from
// nets.mjs (the page fills in pieces, areas, fold lines and seams), so the copy here has none to drift.
const formulas=['Volume & surface area formulas ↗','/learn/volume-and-surface-area/'];
const calculator=['Volume & surface area calculator ↗','/volume-calculator/'];
export const netPages={
 cube:{
  title:'Printable Cube Net: Free Template to Print and Fold',
  description:'Free printable cube net with glue tabs and labeled faces. Set the edge length, print at true size on A4 or download the SVG, then cut and fold.',
  intro:'A free printable net of a cube: six equal squares in a cross that fold into a cube. Set the edge length in millimeters, choose glue tabs and face labels, then print at true size or download the SVG.',
  faceText:'6 equal square faces',
  fold:['Print the net at 100% and cut along the solid outline, keeping the glue tabs.','Fold every dashed line away from you, so the printed labels end up on the outside.','Stand the row of four squares (Front, Right, Back, Left) up into a square tube and glue the tab on Left under the free edge of Front.','Fold Top and Bottom over the open ends like lids and glue their tabs inside the tube.'],
  links:[['Rectangular prism (cuboid): properties & calculator ↗','/shapes/cuboid/'],calculator,formulas],
  note:'A cube is a rectangular prism whose width, height, and depth are equal, so the rectangular prism page and calculator apply to it.'},
 prism:{
  title:'Printable Rectangular Prism Net (Cuboid): Free Template',
  description:'Free printable rectangular prism (cuboid) net with glue tabs. Set the width, height and depth, print at true size on A4 or download the SVG, then fold.',
  intro:'A free printable net of a rectangular prism, also called a cuboid: six rectangles in three matching pairs that fold into a box. Set the width, height, and depth in millimeters, then print at true size or download the SVG.',
  faceText:'6 rectangular faces in 3 equal pairs',
  fold:['Print the net at 100% and cut along the solid outline, keeping the glue tabs.','Fold every dashed line away from you, so the printed labels end up on the outside.','Stand the row of four rectangles (Front, Right, Back, Left) up into a tube and glue the tab on Left under the free edge of Front.','Fold Top and Bottom over the open ends like lids and glue their tabs inside the tube.'],
  links:[['Rectangular prism (cuboid): properties & calculator ↗','/shapes/cuboid/'],calculator,formulas]},
 'triangular-prism':{
  title:'Printable Triangular Prism Net: Free Template to Fold',
  description:'Free printable triangular prism net with glue tabs: three rectangles and two equilateral triangles. Set the size, print at true size on A4, then fold.',
  intro:'A free printable net of a triangular prism: three equal rectangles in a row with an equilateral triangle on each end of the middle one. Set the triangle side and the length in millimeters, then print at true size or download the SVG.',
  faceText:'5 faces: 2 equilateral triangles and 3 rectangles',
  fold:['Print the net at 100% and cut along the solid outline, keeping the glue tabs.','Fold every dashed line away from you, so the printed labels end up on the outside.','Fold the three rectangles into a triangular tube and glue the tab on the last rectangle under the free edge of the first.','Fold each triangle over an open end and glue its two tabs inside the tube.'],
  links:[['Triangle: properties & formulas ↗','/shapes/triangle/'],formulas,calculator],
  note:'This template uses equilateral triangles, so all three rectangles are the same size. The triangle page covers the area of each end.'},
 'hexagonal-prism':{
  title:'Printable Hexagonal Prism Net: Free Template to Fold',
  description:'Free printable hexagonal prism net with glue tabs: six rectangles and two regular hexagons. Set the size, print at true size on A4, then cut and fold.',
  intro:'A free printable net of a hexagonal prism: six equal rectangles in a row with a regular hexagon above and below. Set the hexagon side and the length in millimeters, then print at true size or download the SVG.',
  faceText:'8 faces: 2 regular hexagons and 6 rectangles',
  fold:['Print the net at 100% and cut along the solid outline, keeping the glue tabs.','Fold every dashed line away from you, so the printed labels end up on the outside.','Fold the six rectangles into a six-sided tube and glue the tab on the last rectangle under the free edge of the first.','Fold each hexagon over an open end and glue its five tabs inside the tube, one side at a time.'],
  links:[['Regular polygon calculator: area of a hexagon ↗','/tools/polygon-explorer/'],formulas,calculator],
  note:'The polygon calculator gives the area of each hexagonal end; set the number of sides to 6.'},
 pyramid:{
  title:'Printable Square Pyramid Net: Free Template to Print & Fold',
  description:'Free printable square pyramid net with glue tabs: a square base and four triangles. Set the base and slant height, print at true size on A4, then fold.',
  intro:'A free printable net of a square pyramid: a square base with a triangle on each side. Set the base width and the slant height in millimeters, then print at true size or download the SVG.',
  faceText:'5 faces: 1 square base and 4 equal triangles',
  fold:['Print the net at 100% and cut along the solid outline, keeping the glue tabs.','Fold the four dashed lines around the square away from you, so the labels end up on the outside.','Lift the four triangles until their tips meet above the middle of the square.','Glue each tab under the edge of the triangle next to it.'],
  links:[['Triangle: properties & formulas ↗','/shapes/triangle/'],['Pythagorean calculator: pyramid height from slant height ↗','/tools/right-triangle/'],formulas],
  note:'Slant height is the height of each triangular face, measured along the face. The pyramid itself is shorter: its height is √(slant height² − (half the base width)²).'},
 tetrahedron:{
  title:'Printable Tetrahedron Net (Triangular Pyramid) Template',
  description:'Free printable tetrahedron (triangular pyramid) net with glue tabs: four equilateral triangles. Set the edge length, print at true size, then fold.',
  intro:'A free printable net of a regular tetrahedron, the triangular pyramid with four equal faces: four equilateral triangles that make one large triangle. Set the edge length in millimeters, then print at true size or download the SVG.',
  faceText:'4 equal equilateral triangles',
  fold:['Print the net at 100% and cut along the solid outline, keeping the glue tabs.','Fold the three dashed lines of the middle triangle away from you, so the labels end up on the outside.','Lift the three outer triangles until their tips meet above the middle triangle.','Glue each tab under the edge of the triangle next to it.'],
  links:[['Triangle: properties & formulas ↗','/shapes/triangle/'],formulas,['Heron’s formula calculator: area of one face ↗','/tools/herons-formula-calculator/']],
  note:'A regular tetrahedron is one of the five Platonic solids: every face is the same equilateral triangle and three faces meet at every vertex.'},
 octahedron:{
  title:'Printable Octahedron Net: Free Template to Print and Fold',
  description:'Free printable octahedron net with glue tabs: eight equilateral triangles in a strip. Set the edge length, print at true size on A4, then cut and fold.',
  intro:'A free printable net of a regular octahedron: eight equilateral triangles, six in a strip with one more on each side. Set the edge length in millimeters, then print at true size or download the SVG.',
  faceText:'8 equal equilateral triangles',
  fold:['Print the net at 100% and cut along the solid outline, keeping the glue tabs.','Fold all seven dashed lines away from you, so the labels end up on the outside.','Bring the two ends of the strip of six triangles together to make a ring, and glue the end tab under the triangle at the other end.','Fold the two remaining triangles over the two openings like lids and glue their tabs inside.'],
  links:[['Triangle: properties & formulas ↗','/shapes/triangle/'],formulas,['Heron’s formula calculator: area of one face ↗','/tools/herons-formula-calculator/']],
  note:'A regular octahedron is one of the five Platonic solids. It looks like two square pyramids joined base to base, and four triangles meet at every vertex.'},
 cylinder:{
  title:'Printable Cylinder Net: Free Template to Print and Fold',
  description:'Free printable cylinder net: a rectangle 2πr wide and two circles, with glue tabs. Set the radius and height, print at true size on A4, then roll it up.',
  intro:'A free printable net of a cylinder: a rectangle that rolls into the curved surface, plus a circle for each end. The rectangle is exactly one circumference (2πr) wide. Set the radius and height in millimeters, then print at true size or download the SVG.',
  faceText:'2 flat circular faces and 1 curved surface',
  fold:['Print the net at 100% and cut out the rectangle with its tabs and the two circles. Each circle touches the rectangle at one point; you can leave it attached there or cut it free.','Roll the rectangle into a tube with the printed side out, and glue the long tab under the opposite edge.','Fold the small teeth along the top and bottom edges inwards, towards the middle of the tube.','Put glue on the teeth and press a circle onto each end.'],
  links:[['Cylinder: properties & calculator ↗','/shapes/cylinder/'],calculator,formulas],
  note:'The rectangle must be as wide as the distance around the circle, so its width is the circumference 2πr. A wider or narrower strip would not close the tube.'},
 cone:{
  title:'Printable Cone Net: Free Template to Print and Fold',
  description:'Free printable cone net: a sector with angle 360° × r ÷ slant height and a circle base, with glue tabs. Set the size, print at true size, then roll.',
  intro:'A free printable net of a cone: a sector of a circle that rolls into the curved surface, plus a circle for the base. The sector’s angle is 360° × radius ÷ slant height, so its arc is exactly as long as the edge of the base. Set the radius and slant height in millimeters, then print at true size or download the SVG.',
  faceText:'1 flat circular face and 1 curved surface',
  fold:['Print the net at 100% and cut out the sector with its tabs and the circle. The circle touches the sector at one point; you can leave it attached there or cut it free.','Roll the sector with the printed side out until its two straight edges meet, and glue the long tab under the other straight edge.','Fold the small teeth around the curved edge inwards, towards the middle of the opening.','Put glue on the teeth and press the circle on to close the base.'],
  links:[['Cone: properties & calculator ↗','/shapes/cone/'],calculator,['Arc length & sector area calculator ↗','/tools/circle-sectors/']],
  note:'Slant height ℓ is measured along the side of the cone, from the tip to the edge of the base. The cone’s vertical height is shorter: h = √(ℓ² − r²).'},
};
