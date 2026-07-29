import { geoEquirectangular } from "d3-geo";

/** Matches public/images/experience/world-map.svg (generated via scripts/generate-world-map.mjs) */
export const WORLD_MAP_VIEWBOX = { width: 1010, height: 666 } as const;

// fitSize([1010, 666], countries-110m) — keeps pins aligned with the rendered map
const projection = geoEquirectangular()
  .scale(160.7464925228143)
  .translate([505, 324.0855295833333]);

export function latLonToMapPercent(lat: number, lon: number) {
  const projected = projection([lon, lat]);
  if (!projected) {
    return { mapX: 50, mapY: 50 };
  }

  const [x, y] = projected;

  return {
    mapX: (x / WORLD_MAP_VIEWBOX.width) * 100,
    mapY: (y / WORLD_MAP_VIEWBOX.height) * 100,
  };
}
