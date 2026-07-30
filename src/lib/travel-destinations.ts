import { latLonToMapPercent } from "@/lib/map-coordinates";

export type TravelDestination = {
  id: string;
  name: string;
  region: string;
  description: string;
};

export type MapPinLocation = {
  id: string;
  destinationId: string;
  label: string;
  lat: number;
  lon: number;
  mapX: number;
  mapY: number;
};

function pin(
  data: Omit<MapPinLocation, "mapX" | "mapY">,
): MapPinLocation {
  const { mapX, mapY } = latLonToMapPercent(data.lat, data.lon);

  return { ...data, mapX, mapY };
}

export const travelDestinations: TravelDestination[] = [
  {
    id: "national-parks",
    name: "U.S. National Parks",
    region: "United States",
    description:
      "The national parks are high on my bucket list — wide-open spaces, dramatic landscapes, and the kind of light you can't find anywhere else. Planning a wedding, elopement, or session somewhere wild? I'd love to be your photographer — reach out and let's make it happen.",
  },
  {
    id: "nyc",
    name: "NYC",
    region: "New York",
    description:
      "New York is one of those places I've been dreaming of shooting — city energy, rooftop light, and love in the middle of it all. Planning a wedding, elopement, or session there? I'd love to be your photographer — reach out and let's make it happen.",
  },
  {
    id: "cape-town",
    name: "Cape Town",
    region: "South Africa",
    description:
      "Cape Town is on my dream list — Table Mountain backdrops and ocean air. Planning a wedding, elopement, or session there? I'd love to be your photographer — reach out and let's make it happen.",
  },
  {
    id: "greece",
    name: "Greece",
    region: "Greece",
    description:
      "Greece has been calling my name — whitewashed cliffs, island light, and slow Mediterranean evenings. Planning a wedding, elopement, or session there? I'd love to be your photographer — reach out and let's make it happen.",
  },
  {
    id: "italy",
    name: "Italy",
    region: "Italy",
    description:
      "Italy is absolutely on my bucket list — vineyards, piazzas, and the kind of romance that feels like a film. Planning a wedding, elopement, or session there? I'd love to be your photographer — reach out and let's make it happen.",
  },
  {
    id: "spain",
    name: "Spain",
    region: "Spain",
    description:
      "Spain is one of those places I've been dreaming of shooting — warm light, bold architecture, and long golden hours. Planning a wedding, elopement, or session there? I'd love to be your photographer — reach out and let's make it happen.",
  },
  {
    id: "french-coast",
    name: "Coast of France",
    region: "France",
    description:
      "The French coast is on my must-shoot list — Riviera blues, lavender hills, and seaside celebrations. Planning a wedding, elopement, or session there? I'd love to be your photographer — reach out and let's make it happen.",
  },
];

export const mapPinLocations: MapPinLocation[] = [
  pin({
    id: "yosemite",
    destinationId: "national-parks",
    label: "Yosemite National Park",
    lat: 37.87,
    lon: -119.54,
  }),
  pin({
    id: "yellowstone",
    destinationId: "national-parks",
    label: "Yellowstone National Park",
    lat: 44.43,
    lon: -110.59,
  }),
  pin({
    id: "grand-canyon",
    destinationId: "national-parks",
    label: "Grand Canyon National Park",
    lat: 36.06,
    lon: -112.14,
  }),
  pin({
    id: "nyc",
    destinationId: "nyc",
    label: "New York City",
    lat: 40.71,
    lon: -74.01,
  }),
  pin({
    id: "cape-town",
    destinationId: "cape-town",
    label: "Cape Town",
    lat: -33.92,
    lon: 18.42,
  }),
  pin({
    id: "greece",
    destinationId: "greece",
    label: "Greece",
    lat: 37.98,
    lon: 23.73,
  }),
  pin({
    id: "italy",
    destinationId: "italy",
    label: "Italy",
    lat: 43.77,
    lon: 11.25,
  }),
  pin({
    id: "spain",
    destinationId: "spain",
    label: "Spain",
    lat: 40.42,
    lon: -3.7,
  }),
  pin({
    id: "french-coast",
    destinationId: "french-coast",
    label: "French Riviera",
    lat: 43.7,
    lon: 7.26,
  }),
];

export function getDestinationById(id: string) {
  return travelDestinations.find((destination) => destination.id === id);
}
