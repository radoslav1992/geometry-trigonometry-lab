// Editorial questions are rendered into the page HTML, including collapsed answers.
const q = (question, answer, href, label) => ({ question, answer, href, label });
export const faqs = {
  home: [
    q('What can I do with Geometry Lab?', 'Solve triangles, calculate area and volume, explore the unit circle, and watch graphs and shapes respond as you change their values. Each calculator connects the result to a diagram or worked explanation.', '/tools/', 'Explore all tools'),
    q('Is Geometry Lab free to use?', 'Yes. The calculators, lessons, practice questions, and printable resources are free to use without an account. Calculations run in your browser.', '/about/', 'About the lab'),
    q('Which tool helps me find a missing side or angle?', 'For a right triangle with two known sides, start with the Pythagorean calculator. For other triangles, use the triangle solver with three sides, two sides and their included angle, two angles and a side, or the supported SSA case. Three angles alone cannot determine side lengths.', '/triangle-solver/', 'Open the triangle solver'),
    q('Can I see how an answer is calculated?', 'Yes. Calculators show formula substitutions or worked steps, while the concept lessons explain the reasoning with examples and common mistakes. Change an input to see how the result changes.', '/learn/', 'Read the concept lessons'),
    q('Can I use these resources for teaching or practice?', 'Yes. Try an eight-question practice round with explanations, create a worksheet with an optional answer key, or print a shape net to fold. Worksheets can contain 8, 12, or 20 questions.', '/worksheets/', 'Create a worksheet'),
  ],
  'learn/herons-formula': [
    q('What is s in Heron’s formula?', 'The letter s is the semiperimeter: half of the triangle’s perimeter, s = (a + b + c)/2. For sides 3, 4, and 5, s = 6. It is not a side length, and using the full perimeter instead of s gives the wrong area.', '/triangle-solver/', 'Calculate s and the area'),
    q('When should I use Heron’s formula?', 'Use it when you know all three side lengths but not a height or an angle. If you already know a base and its perpendicular height, A = bh/2 is quicker. If you know two sides and the angle between them, use A = ½ab sin C.', '/learn/area-and-perimeter/', 'Compare area formulas'),
    q('Does Heron’s formula work for right and obtuse triangles?', 'Yes. It works for every valid triangle. For a 3-4-5 right triangle it gives √(6 × 3 × 2 × 1) = 6, which matches ½ × 3 × 4. The sides only need to satisfy the triangle inequality.', '/learn/pythagorean-theorem/', 'Review right triangles'),
    q('Who discovered Heron’s formula?', 'It is named after Heron (or Hero) of Alexandria, who recorded the formula with a proof in his Metrica around the first century AD. Some historians think Archimedes knew it earlier.'),
  ],
  'learn/law-of-cosines': [
    q('When do you use the law of cosines instead of the law of sines?', 'Use the law of cosines for SAS (two sides and the angle between them) and SSS (three sides). Use the law of sines when you know a side and its opposite angle, as in AAS, ASA, or SSA.', '/learn/law-of-sines/', 'Read the law of sines'),
    q('How do you find an angle with the law of cosines?', 'Rearrange it: cos C = (a² + b² − c²)/(2ab), then take the inverse cosine. For sides 7, 8, and 9, the angle opposite 9 is arccos(32/112) ≈ 73.40°. Find the largest angle first; its cosine shows whether the triangle is obtuse.', '/triangle-solver/', 'Solve an SSS triangle'),
    q('Is the law of cosines the same as the cosine rule?', 'Yes. “Law of cosines” is common in the United States and “cosine rule” in the United Kingdom and elsewhere. Both name c² = a² + b² − 2ab cos C.'),
    q('How is the law of cosines related to the Pythagorean theorem?', 'When the angle C is 90°, cos C = 0, so the 2ab cos C term disappears and the formula becomes c² = a² + b². The extra term corrects for angles that are not right angles.', '/learn/pythagorean-theorem/', 'Review the Pythagorean theorem'),
  ],
  'learn/law-of-sines': [
    q('What is the law of sines used for?', 'It finds missing sides and angles when you know at least one side together with its opposite angle. Typical cases are two angles and a side (AAS or ASA) and two sides with a non-included angle (SSA).', '/triangle-solver/', 'Open the triangle solver'),
    q('What is the ambiguous case of the law of sines?', 'In SSA, the known angle may not fix one triangle. Because sin B = sin(180° − B), there can be zero, one, or two valid triangles. Compare the side opposite the known angle with the height h = b sin A to decide.', '/triangle-solver/', 'Explore both SSA solutions'),
    q('How do you find an angle using the law of sines?', 'Rearrange to sin B = b sin A / a, then take the inverse sine. Check whether 180° − B also fits: it does when A + (180° − B) is still less than 180°.'),
    q('Can the law of sines be used on right triangles?', 'Yes. With C = 90°, sin C = 1, so a / sin A = c, which gives sin A = a / c: the familiar opposite-over-hypotenuse definition.', '/learn/trigonometric-ratios/', 'Connect to SOH CAH TOA'),
  ],
  'learn/arcs-and-sectors': [
    q('What is the formula for the area of a sector?', 'With the angle θ in radians, sector area is A = ½r²θ. With θ in degrees, A = (θ/360) × πr². A 90° sector of a circle with radius 4 has area ¼ × 16π = 4π ≈ 12.57 square units.', '/tools/circle-sectors/', 'Calculate a sector'),
    q('How do you find the area of a sector in radians?', 'Multiply half the square of the radius by the angle: A = ½r²θ. For r = 10 and θ = 0.8 radians, A = ½ × 100 × 0.8 = 40 square units. No π is needed because radians already measure the fraction of the circle.'),
    q('How do you find the central angle from the arc length?', 'Divide the arc length by the radius: θ = s / r gives the angle in radians. Multiply by 180/π for degrees. An arc of 15 cm on a 6 cm radius gives 2.5 radians, about 143.24°.', '/learn/radians-and-degrees/', 'Convert radians to degrees'),
    q('What is the difference between a sector and a segment?', 'A sector is bounded by two radii and an arc, like a slice of pizza. A segment is bounded by a chord and an arc. Segment area is the sector area minus the triangle: ½r²(θ − sin θ), with θ in radians.'),
  ],
  'learn/transformations': [
    q('What are the rules for reflecting over the x-axis and y-axis?', 'Reflecting over the x-axis keeps x and changes the sign of y: (x, y) → (x, −y). Reflecting over the y-axis changes the sign of x: (x, y) → (−x, y). For example, (3, 1) becomes (3, −1) or (−3, 1).', '/tools/transformations/', 'Try a reflection'),
    q('What is the rule for a 90° rotation?', 'A 90° counterclockwise rotation about the origin maps (x, y) → (−y, x). A 90° clockwise rotation, which equals 270° counterclockwise, maps (x, y) → (y, −x). A 180° rotation maps (x, y) → (−x, −y).'),
    q('What are translations, reflections, and rotations called?', 'They are rigid transformations, also called isometries or congruence transformations. Each one keeps lengths, angles, and area, so the image is congruent to the original. A dilation is not rigid because it changes size.', '/learn/similarity-and-scale/', 'Compare with dilations'),
    q('Does the order of transformations matter?', 'Often, yes. Translating (2, 5) by (−3, 1) and then reflecting over the y-axis gives (1, 6), but reflecting first and then translating gives (−5, 6). Apply the steps in the order they are written.'),
  ],
  'learn/area-and-perimeter': [
    q('How do you find the area and perimeter of a shape?', 'Area uses a formula for the space inside, such as A = wh for a rectangle or A = πr² for a circle. Perimeter adds the lengths around the outside, such as P = 2(w + h). Area is in square units; perimeter is in length units.', '/area-calculator/', 'Open the area calculator'),
    q('Can you find the area from the perimeter?', 'Only for shapes fixed by one length, such as a square (side = P/4) or a circle (r = C/2π). A rectangle with perimeter 20 could be 5 × 5 (area 25) or 9 × 1 (area 9), so you also need one side.'),
    q('How do you find the area of a composite shape?', 'Split it into rectangles, triangles, and circle parts. Add the areas of the pieces, and subtract any holes or cut-out corners. The area calculator can add and subtract parts for you.', '/area-calculator/', 'Calculate a composite area'),
  ],
  'learn/volume-and-surface-area': [
    q('What is the difference between volume and surface area?', 'Volume measures how much space is inside a solid, in cubic units such as cm³. Surface area measures how much material covers the outside, in square units such as cm². Filling a box is about volume; wrapping it is about surface area.', '/volume-calculator/', 'Open the volume calculator'),
    q('Can you convert volume to surface area?', 'Not directly. Different shapes with the same volume can have different surface areas. You need the dimensions: for a cube, find the edge s = ∛V, then S = 6s². A 64 cm³ cube has edge 4 cm and surface area 96 cm².'),
    q('How do cubic centimeters relate to liters?', 'One cubic centimeter holds one milliliter, so 1,000 cm³ = 1 liter. One cubic meter holds 1,000 liters.'),
  ],
  'learn/pythagorean-theorem': [
    q('What is the Pythagorean theorem?', 'In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c². The hypotenuse c is the side opposite the right angle.', '/tools/right-triangle/', 'Use the Pythagorean calculator'),
    q('Does the Pythagorean theorem work for all triangles?', 'No. It only holds for right triangles. For any other triangle, use the law of cosines, c² = a² + b² − 2ab cos C, which reduces to Pythagoras when C = 90°.', '/learn/law-of-cosines/', 'Read the law of cosines'),
  ],
  'printable-nets': [
    q('How do I print a net at the right size?', 'Print on A4 paper at 100% scale (not “fit to page”) and turn off browser headers and footers. Measure the 20 mm reference line at the bottom of the page; if it is 20 mm, every edge is printed to the size you chose.'),
    q('What is the net of a square pyramid?', 'A square base with four triangles attached to its sides. Each triangle’s height is the pyramid’s slant height, which must be more than half the base width so the faces can meet at a point.', '/learn/volume-and-surface-area/', 'Pyramid volume and surface area'),
    q('How many different nets does a cube have?', 'A cube has 11 different nets, not counting rotations and reflections. This generator uses the familiar cross-shaped net: four faces in a row with one face above and one below.'),
    q('Which edges get glue tabs?', 'Tabs go on outside edges that must join another face. A cube or rectangular prism net needs seven glued seams to close; a square pyramid needs four. Fold every dashed line inward before gluing.'),
  ],
  'triangle-solver': [
    q('How do I find a missing angle in a triangle?', 'If you know two interior angles, subtract their sum from 180°. For example, angles of 50° and 60° leave 70°. If you know side lengths instead, choose a supported solver mode to calculate the angles using the sine or cosine rule.', '/learn/law-of-cosines/', 'Understand the cosine rule'),
    q('What information do I need to solve a triangle?', 'Use SSS for three sides, SAS for two sides and the angle between them, or AAS for two angles and a side. SSA uses two sides and an angle opposite one of them and may have zero, one, or two solutions. All lengths must use the same unit.', '/learn/law-of-sines/', 'Understand the sine rule'),
    q('Why does the solver sometimes show two triangles?', 'In the ambiguous SSA case, the known measurements may fit two different triangles. An acute angle and its supplementary obtuse angle have the same sine. The solver shows both solutions when both satisfy the supplied measurements.', '/learn/law-of-sines/', 'Explore the ambiguous case'),
  ],
  'unit-circle': [
    q('Where is tangent on the unit circle?', 'Tangent is the ratio of the coordinates: tan θ = sin θ / cos θ = y / x. Geometrically, extend the radius until it meets the vertical line x = 1; the height of that meeting point is tan θ. That is why tangent grows without bound near 90°.', '#unit-circle-chart', 'See tangent for every special angle'),
    q('How does the unit circle show sine and cosine?', 'A unit circle has radius 1. Measure an angle counterclockwise from the positive x-axis: the point on the circle has coordinates (cos θ, sin θ). Its horizontal coordinate is cosine and its vertical coordinate is sine.', '/learn/trigonometric-ratios/', 'Connect the trigonometric ratios'),
    q('Why is tangent undefined at 90° and 270°?', 'Tangent is sin θ divided by cos θ. At 90° and 270°, cosine is zero, so the ratio would divide by zero. The explorer displays “undefined” at those angles.', '/tools/trig-graphs/', 'Explore sine and cosine graphs'),
    q('What is the difference between degrees and radians?', 'Both measure angles. A full turn is 360° or 2π radians, so 180° equals π radians. Multiply degrees by π/180 to convert to radians; multiply radians by 180/π to convert to degrees.', '/tools/angle-converter/', 'Convert degrees and radians'),
  ],
  'area-calculator': [
    q('What is the difference between area and perimeter?', 'Area measures the space inside a flat shape and uses square units, such as cm². Perimeter measures the distance around its boundary and uses length units, such as cm. Shapes can have equal areas but different perimeters.', '/learn/area-and-perimeter/', 'Compare area and perimeter'),
    q('How do I calculate the area of a triangle?', 'Multiply the base by its perpendicular height, then divide by two: A = bh/2. A base of 8 cm and a height of 5 cm give 20 cm². The height must meet the base, or its extension, at a right angle.', '/shapes/triangle/', 'Explore triangle area'),
    q('Can I enter dimensions in different units?', 'Convert every length to the same unit before entering it. For example, 2 m and 50 cm become 2 m and 0.5 m, giving a rectangle area of 1 m². The calculator does not automatically convert mixed units.', '/shapes/rectangle/', 'Try the rectangle calculator'),
  ],
  'volume-calculator': [
    q('How are volume and surface area different?', 'Volume is the three-dimensional space inside a solid, measured in cubic units. Surface area is the area of its outer surfaces, measured in square units. Filling a box concerns volume; covering it concerns surface area.', '/learn/volume-and-surface-area/', 'Compare volume and surface area'),
    q('Does the calculator include the bases in surface area?', 'Yes. It reports total surface area: both circular bases for a closed cylinder, the circular base for a cone, and all six faces for a rectangular prism. An open container needs a separate adjustment for any missing face.', '/shapes/cylinder/', 'See the cylinder formulas'),
    q('Which height should I enter for a cone?', 'Enter the perpendicular height from the circular base to the tip, not the sloping distance along the side. For the right circular cone used here, the calculator derives slant height as √(r² + h²) when finding total surface area.', '/shapes/cone/', 'Explore the cone calculator'),
  ],
  'right-triangle': [
    q('When can I use the Pythagorean theorem?', 'Use a² + b² = c² only for a right triangle. The legs a and b meet at 90°, and the hypotenuse c is opposite that right angle. For a triangle without a right angle, use the general triangle solver.', '/triangle-solver/', 'Solve a general triangle'),
    q('How do I calculate a missing leg?', 'Subtract the square of the known leg from the square of the hypotenuse, then take the square root: b = √(c² − a²). A hypotenuse of 13 and a known leg of 5 give a missing leg of 12. The hypotenuse must be longer than either leg.', '/learn/pythagorean-theorem/', 'See the Pythagorean method'),
  ],
  'polygon-explorer': [
    q('What makes a polygon regular?', 'A regular polygon has equal side lengths and equal interior angles. This explorer uses that assumption for its diagram, individual angles, apothem, and area. Equal side lengths alone do not make every polygon regular.', '/learn/polygon-angles/', 'Learn about polygon angles'),
    q('How do I calculate a regular polygon’s interior angle?', 'For n sides, each interior angle is (n − 2) × 180° / n. A regular hexagon has six sides, so each angle is 120°. The interior-angle sum of any simple polygon with n sides is (n − 2) × 180°.', '/learn/polygon-angles/', 'Work through the angle formula'),
  ],
  'coordinate-geometry': [
    q('How do I find the distance and midpoint between two points?', 'For points (x₁, y₁) and (x₂, y₂), distance is √[(x₂ − x₁)² + (y₂ − y₁)²]. The midpoint is ((x₁ + x₂)/2, (y₁ + y₂)/2). Points (0, 0) and (6, 8) are 10 units apart with midpoint (3, 4).', '/learn/distance-and-midpoint/', 'See a worked coordinate example'),
    q('Why is a vertical line’s slope undefined?', 'Slope is the change in y divided by the change in x. A vertical line has no change in x, so the calculation divides by zero. A horizontal line has slope zero; two identical points do not determine a unique line.', '/learn/slope-and-lines/', 'Understand slope and line equations'),
  ],
  'circle-sectors': [
    q('How do I calculate arc length and sector area?', 'With θ in radians, arc length is rθ and sector area is r²θ/2. This tool accepts degrees and converts them automatically. For a 90° sector with radius 4, the arc length is 2π and the sector area is 4π.', '/learn/arcs-and-sectors/', 'Work through arcs and sectors'),
    q('What is the difference between a chord and an arc?', 'A chord is the straight segment joining two points on a circle. An arc follows the curved circumference between them. For a central angle θ, the chord length is 2r sin(θ/2); the selected arc length is rθ when θ is in radians.', '/shapes/circle/', 'Explore circle measurements'),
  ],
  'angle-converter': [
    q('How do I convert degrees to radians?', 'Multiply degrees by π/180. For example, 90° = π/2 radians and 360° = 2π radians. To convert back, multiply radians by 180/π. Use a preset or a decimal number for a π-based radian input.', '/learn/radians-and-degrees/', 'Understand radians and degrees'),
    q('What are coterminal angles?', 'Coterminal angles finish in the same direction and differ by whole turns. For example, −90°, 270°, and 630° are coterminal. The converter also shows the equivalent angle from 0° up to, but not including, 360°.', '/unit-circle/', 'See angles on the unit circle'),
  ],
  'trig-graphs': [
    q('What do amplitude and period mean?', 'Amplitude is the distance from a wave’s midline to a peak. In y = A sin(B(x − h)) + k, amplitude is |A| and the period is 2π/|B| for nonzero A and B. This explorer uses nonnegative A and positive B. When A is zero, the graph is constant and has no unique fundamental period.', '/learn/trig-graph-transformations/', 'Explore the wave parameters'),
    q('How do phase shift and vertical shift move the graph?', 'In y = A sin(B(x − h)) + k, a positive h moves the graph right and a negative h moves it left. The value k moves the midline to y = k. Here, horizontal values and phase shift are measured in radians.', '/learn/trig-graph-transformations/', 'See graph transformation examples'),
  ],
  transformations: [
    q('Which transformations keep a triangle the same size?', 'Translations, rotations, and reflections preserve lengths, angles, and area. A dilation changes lengths by its scale factor while preserving angles. In this playground, rotations and dilations are centered at the origin.', '/learn/transformations/', 'Learn the transformation rules'),
    q('Why does doubling a shape’s size quadruple its area?', 'A dilation by a positive factor k multiplies each length by k, so area is multiplied by k². Doubling every length makes the area four times as large; halving every length makes it one quarter as large.', '/learn/similarity-and-scale/', 'Explore similarity and scale'),
  ],
  'triangle-playground': [
    q('What is the centroid of a triangle?', 'The centroid is where the three medians meet. Each median joins a vertex to the midpoint of the opposite side. Average the three x-coordinates and the three y-coordinates to find the centroid; it divides each median in a 2:1 ratio from the vertex.', '/learn/triangle-centers/', 'Learn about triangle centers'),
    q('Why do points on a straight line not make a triangle?', 'Three collinear points enclose no area, so they form a degenerate triangle. The sandbox asks you to move a point instead of treating that arrangement as a valid triangle. Overlapping vertices also cannot form a nondegenerate triangle.', '/triangle-solver/', 'Explore triangle measurements'),
  ],
  rectangle: [
    q('How do I find a rectangle’s dimensions from its area and perimeter?', 'The width and height are the two numbers whose product is the area and whose sum is half the perimeter. For area 24 and perimeter 20, look for two numbers that multiply to 24 and add to 10: the rectangle is 6 × 4.'),
    q('How do I calculate a rectangle’s area and perimeter?', 'Multiply width by height for area: A = wh. Add width and height and double the result for perimeter: P = 2(w + h). A 6 cm by 4 cm rectangle has area 24 cm² and perimeter 20 cm.', '/learn/area-and-perimeter/', 'Compare area and perimeter'),
    q('Is a square also a rectangle?', 'Yes. A rectangle has four right angles, and a square satisfies that definition with all four sides equal. Enter the same width and height to calculate a square’s area and perimeter.', '/tools/polygon-explorer/', 'Explore regular polygons'),
  ],
  circle: [
    q('What is the length of a circle?', 'The length around a circle is its circumference: C = 2πr, or πd using the diameter. A circle with a 10 cm diameter is about 31.42 cm around. The diameter is the length across, through the center.'),
    q('Should I enter a circle’s radius or diameter?', 'Enter the radius: the distance from the center to the circumference. The diameter is twice the radius, so divide a given diameter by two first. A diameter of 10 cm means a radius of 5 cm.', '/learn/area-and-perimeter/', 'Read the area formulas'),
    q('How do I calculate a circle’s area and circumference?', 'Area is πr² and circumference is 2πr. For radius 3, these are 9π square units and 6π length units. The calculator displays rounded decimal results, so keep π in your working when you need an exact answer.', '/tools/circle-sectors/', 'Explore part of a circle'),
  ],
  triangle: [
    q('What are the types of triangles?', 'By sides: equilateral (three equal sides), isosceles (at least two equal sides), and scalene (no equal sides). By angles: acute (all angles under 90°), right (one 90° angle), and obtuse (one angle over 90°). Every triangle has one label from each list.', '/tools/triangle-playground/', 'Discover triangle types'),
    q('Can I use a sloping side as the height of a triangle?', 'Only if that side is perpendicular to your chosen base. In A = bh/2, height means the perpendicular distance from the opposite vertex to the line containing the base. In an obtuse triangle, that height may lie outside the triangle.', '/learn/area-and-perimeter/', 'Understand the area formula'),
    q('How can I find area if I only know the three side lengths?', 'Use Heron’s formula: A = √[s(s − a)(s − b)(s − c)], where s = (a + b + c)/2. The side lengths must form a valid triangle. Choose SSS in the triangle solver to calculate it with worked steps.', '/triangle-solver/', 'Calculate from three sides'),
  ],
  trapezoid: [
    q('What are the properties of a trapezoid?', 'A trapezoid has four sides with at least one pair of parallel sides, called the bases. Its angles add up to 360°, and the two angles along each leg add to 180°. An isosceles trapezoid also has equal legs, equal base angles, and equal diagonals.'),
    q('Is a trapezoid the same as a trapezium?', 'In American English, a trapezoid has a pair of parallel sides. In British English that shape is called a trapezium. The area formula A = (a + b)h/2 is the same either way.'),
    q('Which sides belong in the trapezoid area formula?', 'Use the two parallel sides a and b, together with their perpendicular separation h: A = (a + b)h/2. The nonparallel sloping sides are not the height. Parallel sides of 8 and 5 with height 4 give area 26 square units.', '/learn/area-and-perimeter/', 'Explore area formulas'),
    q('Can I find the perimeter from the inputs here?', 'Not in general. Two parallel side lengths and a height determine area, but they do not uniquely determine the two remaining side lengths. To find perimeter, add all four side lengths when they are known.', '/area-calculator/', 'Compare plane-shape calculators'),
  ],
  sphere: [
    q('How many faces, edges, and vertices does a sphere have?', 'A sphere has one continuous curved surface and no flat faces, no edges, and no vertices. Every point on its surface is the same distance, the radius, from the center.'),
    q('How do I calculate a sphere’s volume and surface area?', 'For radius r, volume is 4πr³/3 and surface area is 4πr². Enter the radius, not the diameter. A sphere with radius 3 has volume 36π cubic units and surface area 36π square units.', '/learn/volume-and-surface-area/', 'Understand volume and surface area'),
    q('What happens when a sphere’s radius doubles?', 'Its surface area becomes four times as large because area depends on r². Its volume becomes eight times as large because volume depends on r³. These scale factors apply when every length of a similar solid changes by the same factor.', '/learn/similarity-and-scale/', 'Learn the scaling rules'),
  ],
  cylinder: [
    q('How many faces, edges, and vertices does a cylinder have?', 'A cylinder has 2 flat circular faces and 1 curved surface. The two circular rims where they meet are its 2 curved edges, and it has no vertices. Some curricula count only the flat circles as faces.'),
    q('How do I calculate the volume of a cylinder?', 'Multiply the area of the circular base by the perpendicular height: V = πr²h. A cylinder with radius 2 and height 5 has volume 20π cubic units. All lengths must use the same unit.', '/learn/volume-and-surface-area/', 'Read the volume formulas'),
    q('Does cylinder surface area include the top and bottom?', 'Yes. Total surface area is 2πr² + 2πrh: two circular bases plus the curved side. For a container without a top, subtract one base area, πr², from the total shown.', '/volume-calculator/', 'Compare solid-shape calculators'),
  ],
  cone: [
    q('How many faces, edges, and vertices does a cone have?', 'A cone has 1 flat circular face, 1 curved surface, 1 curved edge around the base, and 1 vertex at the apex. Some curricula list the edge count as zero because the edge is curved rather than straight.'),
    q('Is a cone a 2D or 3D shape?', 'A cone is a three-dimensional solid. Its side view is a triangle and its base is a circle, which are two-dimensional. Unrolled, its net is a circle and a circular sector.', '/printable-nets/', 'See printable nets'),
    q('What is the cross-sectional area of a cone?', 'A cut parallel to the base is a circle. At distance y from the apex, its radius is r × y / h, so its area is π(ry / h)². A vertical cut through the apex gives an isosceles triangle with area r × h.'),
    q('Why is cone volume one third of cylinder volume?', 'A cone has one third the volume of a cylinder with the same base area and perpendicular height. Their formulas are πr²h/3 and πr²h respectively. The comparison only applies when both radius and height match.', '/shapes/cylinder/', 'Compare with a cylinder'),
    q('How do perpendicular height and slant height differ?', 'Perpendicular height runs from the tip straight down to the base plane. Slant height runs along the cone’s side. For a right circular cone, slant height is √(r² + h²). This calculator accepts perpendicular height and derives slant height for surface area.', '/learn/pythagorean-theorem/', 'See the Pythagorean connection'),
  ],
  cuboid: [
    q('Is a rectangular prism the same as a cuboid?', 'Yes. Rectangular prism is the usual name in the United States; cuboid is common in the United Kingdom and elsewhere. Both describe a solid with six rectangular faces meeting at right angles.'),
    q('How many faces, edges, and vertices does a rectangular prism have?', 'It has 6 faces, 12 edges, and 8 vertices. Euler’s formula checks it: 6 − 12 + 8 = 2. A cube is the special rectangular prism whose 12 edges are all equal.'),
    q('How do I calculate a rectangular prism’s volume?', 'Multiply width, height, and depth: V = whd. A box measuring 6 cm by 4 cm by 3 cm holds 72 cm³ of space. To estimate internal capacity, use its inside dimensions.', '/learn/volume-and-surface-area/', 'Read about volume'),
    q('Why does the surface area formula have a factor of two?', 'A closed rectangular prism has three pairs of equal opposite faces. Add the areas wh, wd, and hd, then double the sum: S = 2(wh + wd + hd). Subtract any missing face separately for an open box.', '/printable-nets/', 'Build a prism from a net'),
  ],
};
