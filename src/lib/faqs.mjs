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
  'triangle-solver': [
    q('How do I find a missing angle in a triangle?', 'If you know two interior angles, subtract their sum from 180°. For example, angles of 50° and 60° leave 70°. If you know side lengths instead, choose a supported solver mode to calculate the angles using the sine or cosine rule.', '/learn/law-of-cosines/', 'Understand the cosine rule'),
    q('What information do I need to solve a triangle?', 'Use SSS for three sides, SAS for two sides and the angle between them, or AAS for two angles and a side. SSA uses two sides and an angle opposite one of them and may have zero, one, or two solutions. All lengths must use the same unit.', '/learn/law-of-sines/', 'Understand the sine rule'),
    q('Why does the solver sometimes show two triangles?', 'In the ambiguous SSA case, the known measurements may fit two different triangles. An acute angle and its supplementary obtuse angle have the same sine. The solver shows both solutions when both satisfy the supplied measurements.', '/learn/law-of-sines/', 'Explore the ambiguous case'),
  ],
  'unit-circle': [
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
    q('How do I calculate a rectangle’s area and perimeter?', 'Multiply width by height for area: A = wh. Add width and height and double the result for perimeter: P = 2(w + h). A 6 cm by 4 cm rectangle has area 24 cm² and perimeter 20 cm.', '/learn/area-and-perimeter/', 'Compare area and perimeter'),
    q('Is a square also a rectangle?', 'Yes. A rectangle has four right angles, and a square satisfies that definition with all four sides equal. Enter the same width and height to calculate a square’s area and perimeter.', '/tools/polygon-explorer/', 'Explore regular polygons'),
  ],
  circle: [
    q('Should I enter a circle’s radius or diameter?', 'Enter the radius: the distance from the center to the circumference. The diameter is twice the radius, so divide a given diameter by two first. A diameter of 10 cm means a radius of 5 cm.', '/learn/area-and-perimeter/', 'Read the area formulas'),
    q('How do I calculate a circle’s area and circumference?', 'Area is πr² and circumference is 2πr. For radius 3, these are 9π square units and 6π length units. The calculator displays rounded decimal results, so keep π in your working when you need an exact answer.', '/tools/circle-sectors/', 'Explore part of a circle'),
  ],
  triangle: [
    q('Can I use a sloping side as the height of a triangle?', 'Only if that side is perpendicular to your chosen base. In A = bh/2, height means the perpendicular distance from the opposite vertex to the line containing the base. In an obtuse triangle, that height may lie outside the triangle.', '/learn/area-and-perimeter/', 'Understand the area formula'),
    q('How can I find area if I only know the three side lengths?', 'Use Heron’s formula: A = √[s(s − a)(s − b)(s − c)], where s = (a + b + c)/2. The side lengths must form a valid triangle. Choose SSS in the triangle solver to calculate it with worked steps.', '/triangle-solver/', 'Calculate from three sides'),
  ],
  trapezoid: [
    q('Which sides belong in the trapezoid area formula?', 'Use the two parallel sides a and b, together with their perpendicular separation h: A = (a + b)h/2. The nonparallel sloping sides are not the height. Parallel sides of 8 and 5 with height 4 give area 26 square units.', '/learn/area-and-perimeter/', 'Explore area formulas'),
    q('Can I find the perimeter from the inputs here?', 'Not in general. Two parallel side lengths and a height determine area, but they do not uniquely determine the two remaining side lengths. To find perimeter, add all four side lengths when they are known.', '/area-calculator/', 'Compare plane-shape calculators'),
  ],
  sphere: [
    q('How do I calculate a sphere’s volume and surface area?', 'For radius r, volume is 4πr³/3 and surface area is 4πr². Enter the radius, not the diameter. A sphere with radius 3 has volume 36π cubic units and surface area 36π square units.', '/learn/volume-and-surface-area/', 'Understand volume and surface area'),
    q('What happens when a sphere’s radius doubles?', 'Its surface area becomes four times as large because area depends on r². Its volume becomes eight times as large because volume depends on r³. These scale factors apply when every length of a similar solid changes by the same factor.', '/learn/similarity-and-scale/', 'Learn the scaling rules'),
  ],
  cylinder: [
    q('How do I calculate the volume of a cylinder?', 'Multiply the area of the circular base by the perpendicular height: V = πr²h. A cylinder with radius 2 and height 5 has volume 20π cubic units. All lengths must use the same unit.', '/learn/volume-and-surface-area/', 'Read the volume formulas'),
    q('Does cylinder surface area include the top and bottom?', 'Yes. Total surface area is 2πr² + 2πrh: two circular bases plus the curved side. For a container without a top, subtract one base area, πr², from the total shown.', '/volume-calculator/', 'Compare solid-shape calculators'),
  ],
  cone: [
    q('Why is cone volume one third of cylinder volume?', 'A cone has one third the volume of a cylinder with the same base area and perpendicular height. Their formulas are πr²h/3 and πr²h respectively. The comparison only applies when both radius and height match.', '/shapes/cylinder/', 'Compare with a cylinder'),
    q('How do perpendicular height and slant height differ?', 'Perpendicular height runs from the tip straight down to the base plane. Slant height runs along the cone’s side. For a right circular cone, slant height is √(r² + h²). This calculator accepts perpendicular height and derives slant height for surface area.', '/learn/pythagorean-theorem/', 'See the Pythagorean connection'),
  ],
  cuboid: [
    q('How do I calculate a rectangular prism’s volume?', 'Multiply width, height, and depth: V = whd. A box measuring 6 cm by 4 cm by 3 cm holds 72 cm³ of space. To estimate internal capacity, use its inside dimensions.', '/learn/volume-and-surface-area/', 'Read about volume'),
    q('Why does the surface area formula have a factor of two?', 'A closed rectangular prism has three pairs of equal opposite faces. Add the areas wh, wd, and hd, then double the sum: S = 2(wh + wd + hd). Subtract any missing face separately for an open box.', '/printable-nets/', 'Build a prism from a net'),
  ],
};
