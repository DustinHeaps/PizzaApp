import { GeoPosition } from './../types/index';

export const getAddress = async ({ latitude, longitude }: GeoPosition) => {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
};
