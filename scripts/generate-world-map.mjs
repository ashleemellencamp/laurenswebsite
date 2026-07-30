import { readFileSync, writeFileSync } from "fs";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath } from "d3-geo";

const world = JSON.parse(
  readFileSync("node_modules/world-atlas/countries-110m.json", "utf8"),
);

const width = 1010;
const height = 666;

const countries = feature(world, world.objects.countries);
const projection = geoEquirectangular().fitSize([width, height], countries);
const path = geoPath(projection);

const paths = countries.features
  .map((f) => {
    const d = path(f);
    if (!d) return "";
    return `  <path d="${d}" />`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" aria-label="Map of World">
  <style>
    path {
      fill: #556b4a;
      fill-opacity: 0.22;
      stroke: #3f5340;
      stroke-opacity: 0.35;
      stroke-width: 0.35;
    }
  </style>
${paths}
</svg>
`;

writeFileSync("public/images/experience/world-map.svg", svg);

const dests = [
  ["national-parks", 37.87, -119.54],
  ["nyc", 40.71, -74.01],
  ["cape-town", -33.92, 18.42],
  ["greece", 37.98, 23.73],
  ["italy", 43.77, 11.25],
  ["spain", 40.42, -3.7],
  ["french-coast", 43.7, 7.26],
];

console.log("Generated equirectangular map. Pin positions:");
for (const [name, lat, lon] of dests) {
  const [x, y] = projection([lon, lat]);
  console.log(name, ((x / width) * 100).toFixed(1), ((y / height) * 100).toFixed(1));
}

console.log("\nSimple formula:");
for (const [name, lat, lon] of dests) {
  console.log(
    name,
    (((lon + 180) / 360) * 100).toFixed(1),
    (((90 - lat) / 180) * 100).toFixed(1),
  );
}

// Export projection params for map-coordinates.ts
const bounds = projection.scale();
console.log("\nProjection scale:", projection.scale(), "translate:", projection.translate());
