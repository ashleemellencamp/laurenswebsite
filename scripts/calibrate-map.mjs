import { readFileSync } from "fs";
import { svgPathProperties } from "svg-path-properties";

const svg = readFileSync("public/images/experience/world-map.svg", "utf8");
const w = 1010;
const h = 666;

function pathStart(id) {
  const m = svg.match(new RegExp(`id="${id}"[\\s\\S]*?d="m\\s*([\\d.-]+),([\\d.-]+)`));
  if (!m) return null;
  return { x: +m[1], y: +m[2] };
}

const anchors = [
  ["ad", 42.5, 1.5],
  ["be", 50.5, 4.5],
  ["ch", 46.8, 8.2],
  ["at", 47.5, 14.0],
  ["it", 41.9, 12.5],
  ["gr", 39.0, 22.0],
  ["es", 40.4, -3.7],
  ["pt", 39.5, -8.0],
  ["ie", 53.0, -8.0],
  ["gb", 54.0, -2.0],
  ["is", 64.9, -19.0],
  ["jp", 36.2, 138.0],
  ["au", -25.0, 133.0],
  ["nz", -41.0, 174.0],
  ["za", -33.9, 18.4],
  ["eg", 26.8, 30.8],
  ["in", 20.6, 78.9],
  ["br", -15.8, -47.9],
  ["mx", 23.6, -102.5],
  ["ca", 56.0, -96.0],
  ["us", 40.7, -74.0], // NYC proxy - won't match path start
];

console.log("Path starts vs equirect:");
for (const [id, lat, lon] of anchors) {
  const p = pathStart(id);
  if (!p) continue;
  const eqX = ((lon + 180) / 360) * w;
  const eqY = ((90 - lat) / 180) * h;
  console.log(
    id,
    "actual",
    p.x.toFixed(0),
    p.y.toFixed(0),
    `(${(p.x / w * 100).toFixed(1)}%, ${(p.y / h * 100).toFixed(1)}%)`,
    "eq",
    eqX.toFixed(0),
    eqY.toFixed(0),
    `(${(eqX / w * 100).toFixed(1)}%, ${(eqY / h * 100).toFixed(1)}%)`,
  );
}

function millerY(lat) {
  const rad = (lat * Math.PI) / 180;
  return 1.25 * Math.log(Math.tan(Math.PI / 4 + rad / 2));
}

// Build fit from European anchors (more reliable small countries)
const fitPoints = [
  ["ad", 42.5, 1.5],
  ["be", 50.5, 4.5],
  ["at", 47.5, 14.0],
  ["it", 41.9, 12.5],
  ["es", 40.4, -3.7],
  ["pt", 39.5, -8.0],
  ["ie", 53.0, -8.0],
  ["gr", 37.9, 23.7],
  ["jp", 36.2, 138.0],
  ["za", -33.9, 18.4],
  ["br", -15.8, -47.9],
  ["mx", 23.6, -102.5],
]
  .map(([id, lat, lon]) => {
    const p = pathStart(id);
    return p ? { lat, lon, x: p.x, y: p.y, my: millerY(lat) } : null;
  })
  .filter(Boolean);

function fit(pairs, xKey = "a", yKey = "b") {
  let sumA = 0,
    sumB = 0,
    sumAB = 0,
    sumA2 = 0;
  for (const p of pairs) {
    const a = p[xKey];
    const b = p[yKey];
    sumA += a;
    sumB += b;
    sumAB += a * b;
    sumA2 += a * a;
  }
  const n = pairs.length;
  const slope = (n * sumAB - sumA * sumB) / (n * sumA2 - sumA * sumA);
  const intercept = (sumB - slope * sumA) / n;
  return { slope, intercept };
}

const lonFit = fit(
  fitPoints.map((p) => ({ a: p.lon, b: p.x })),
  "a",
  "b",
);
const latFit = fit(
  fitPoints.map((p) => ({ a: p.my, b: p.y })),
  "a",
  "b",
);

console.log("\nFits from path starts:", { lonFit, latFit });

function project(lat, lon) {
  const x = lonFit.slope * lon + lonFit.intercept;
  const y = latFit.slope * millerY(lat) + latFit.intercept;
  return { mapX: (x / w) * 100, mapY: (y / h) * 100 };
}

const dests = [
  ["national-parks", 37.87, -119.54],
  ["nyc", 40.71, -74.01],
  ["cape-town", -33.92, 18.42],
  ["greece", 37.98, 23.73],
  ["italy", 43.77, 11.25],
  ["spain", 40.42, -3.7],
  ["french-coast", 43.7, 7.26],
];

console.log("\nDestination pins:");
for (const [name, lat, lon] of dests) {
  const p = project(lat, lon);
  console.log(name, p.mapX.toFixed(1), p.mapY.toFixed(1));
}

console.log("\nAnchor validation:");
for (const p of fitPoints) {
  const pred = project(p.lat, p.lon);
  console.log(
    p.lat,
    p.lon,
    "actual",
    (p.x / w * 100).toFixed(1),
    (p.y / h * 100).toFixed(1),
    "pred",
    pred.mapX.toFixed(1),
    pred.mapY.toFixed(1),
  );
}

// Also try pure equirect for comparison
console.log("\nPure equirect destinations:");
for (const [name, lat, lon] of dests) {
  console.log(
    name,
    ((lon + 180) / 360 * 100).toFixed(1),
    ((90 - lat) / 180 * 100).toFixed(1),
  );
}
