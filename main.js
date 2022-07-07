let truc = 4;
console.log("truc: ", truc);

const svgns = "http://www.w3.org/2000/svg";

const sampleGroup = document.querySelector("svg g.samples");

const sampleNbr = 10;

for (let i = 0; i < sampleNbr; i++) {
  const r = 1;
  const x = 34;
  const y = 45;

  const circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r", r);
  sampleGroup.appendChild(circle);
}
