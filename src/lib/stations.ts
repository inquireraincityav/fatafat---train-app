import { Station, RailLine } from './types';

export const stations: Station[] = [
  { id: 'churchgate', name: 'Churchgate', lines: ['western'], coordinates: [72.8268, 18.9352] },
  { id: 'marine-lines', name: 'Marine Lines', lines: ['western'], coordinates: [72.8276, 18.9432] },
  { id: 'charni-road', name: 'Charni Road', lines: ['western'], coordinates: [72.8197, 18.9518] },
  { id: 'grant-road', name: 'Grant Road', lines: ['western'], coordinates: [72.8145, 18.9631] },
  { id: 'mumbai-central', name: 'Mumbai Central', lines: ['western'], coordinates: [72.8196, 18.9710] },
  { id: 'mahalaxmi', name: 'Mahalaxmi', lines: ['western'], coordinates: [72.8193, 18.9826] },
  { id: 'lower-parel', name: 'Lower Parel', lines: ['western'], coordinates: [72.8277, 18.9930] },
  { id: 'prabhadevi', name: 'Prabhadevi', lines: ['western'], coordinates: [72.8282, 19.0019] },
  { id: 'dadar-w', name: 'Dadar', lines: ['western', 'central'], coordinates: [72.8432, 19.0185] },
  { id: 'matunga-road', name: 'Matunga Road', lines: ['western'], coordinates: [72.8467, 19.0272] },
  { id: 'mahim', name: 'Mahim', lines: ['western'], coordinates: [72.8402, 19.0377] },
  { id: 'bandra', name: 'Bandra', lines: ['western', 'harbour'], coordinates: [72.8401, 19.0544] },
  { id: 'khar-road', name: 'Khar Road', lines: ['western'], coordinates: [72.8368, 19.0660] },
  { id: 'santacruz', name: 'Santacruz', lines: ['western'], coordinates: [72.8422, 19.0798] },
  { id: 'vile-parle', name: 'Vile Parle', lines: ['western'], coordinates: [72.8446, 19.0988] },
  { id: 'andheri', name: 'Andheri', lines: ['western', 'harbour', 'metro-1'], coordinates: [72.8469, 19.1197] },
  { id: 'jogeshwari', name: 'Jogeshwari', lines: ['western'], coordinates: [72.8489, 19.1360] },
  { id: 'goregaon', name: 'Goregaon', lines: ['western'], coordinates: [72.8494, 19.1553] },
  { id: 'malad', name: 'Malad', lines: ['western'], coordinates: [72.8463, 19.1866] },
  { id: 'kandivali', name: 'Kandivali', lines: ['western'], coordinates: [72.8491, 19.2046] },
  { id: 'borivali', name: 'Borivali', lines: ['western'], coordinates: [72.8565, 19.2288] },
  { id: 'dahisar', name: 'Dahisar', lines: ['western'], coordinates: [72.8546, 19.2504] },
  { id: 'mira-road', name: 'Mira Road', lines: ['western'], coordinates: [72.8581, 19.2814] },
  { id: 'virar', name: 'Virar', lines: ['western'], coordinates: [72.8112, 19.4559] },
  { id: 'csmt', name: 'CSMT', lines: ['central', 'harbour'], coordinates: [72.8354, 18.9398] },
  { id: 'masjid', name: 'Masjid', lines: ['central'], coordinates: [72.8395, 18.9451] },
  { id: 'sandhurst-road', name: 'Sandhurst Road', lines: ['central', 'harbour'], coordinates: [72.8415, 18.9571] },
  { id: 'byculla', name: 'Byculla', lines: ['central'], coordinates: [72.8332, 18.9785] },
  { id: 'chinchpokli', name: 'Chinchpokli', lines: ['central'], coordinates: [72.8327, 18.9853] },
  { id: 'currey-road', name: 'Currey Road', lines: ['central'], coordinates: [72.8401, 18.9946] },
  { id: 'parel', name: 'Parel', lines: ['central'], coordinates: [72.8419, 19.0041] },
  { id: 'dadar-c', name: 'Dadar', lines: ['central', 'western'], coordinates: [72.8432, 19.0185] },
  { id: 'matunga', name: 'Matunga', lines: ['central'], coordinates: [72.8497, 19.0275] },
  { id: 'sion', name: 'Sion', lines: ['central'], coordinates: [72.8621, 19.0424] },
  { id: 'kurla', name: 'Kurla', lines: ['central', 'harbour'], coordinates: [72.8796, 19.0657] },
  { id: 'ghatkopar', name: 'Ghatkopar', lines: ['central', 'metro-1'], coordinates: [72.9081, 19.0868] },
  { id: 'vikhroli', name: 'Vikhroli', lines: ['central'], coordinates: [72.9274, 19.1009] },
  { id: 'bhandup', name: 'Bhandup', lines: ['central'], coordinates: [72.9371, 19.1481] },
  { id: 'mulund', name: 'Mulund', lines: ['central'], coordinates: [72.9509, 19.1730] },
  { id: 'thane', name: 'Thane', lines: ['central'], coordinates: [72.9668, 19.1860] },
  { id: 'dombivli', name: 'Dombivli', lines: ['central'], coordinates: [73.0867, 19.2183] },
  { id: 'kalyan', name: 'Kalyan', lines: ['central'], coordinates: [73.1305, 19.2437] },
  { id: 'wadala', name: 'Wadala Road', lines: ['harbour'], coordinates: [72.8570, 19.0155] },
  { id: 'gtb-nagar', name: 'GTB Nagar', lines: ['harbour'], coordinates: [72.8616, 19.0283] },
  { id: 'chunabhatti', name: 'Chunabhatti', lines: ['harbour'], coordinates: [72.8660, 19.0388] },
  { id: 'chembur', name: 'Chembur', lines: ['harbour'], coordinates: [72.8968, 19.0620] },
  { id: 'govandi', name: 'Govandi', lines: ['harbour'], coordinates: [72.9078, 19.0488] },
  { id: 'mankhurd', name: 'Mankhurd', lines: ['harbour'], coordinates: [72.9279, 19.0485] },
  { id: 'vashi', name: 'Vashi', lines: ['harbour'], coordinates: [72.9988, 19.0660] },
  { id: 'panvel', name: 'Panvel', lines: ['harbour'], coordinates: [73.1080, 18.9940] },
  { id: 'versova', name: 'Versova', lines: ['metro-1'], coordinates: [72.8175, 19.1317] },
  { id: 'dn-nagar', name: 'D N Nagar', lines: ['metro-1'], coordinates: [72.8320, 19.1260] },
  { id: 'azad-nagar', name: 'Azad Nagar', lines: ['metro-1'], coordinates: [72.8410, 19.1230] },
  { id: 'chakala', name: 'Chakala', lines: ['metro-1'], coordinates: [72.8568, 19.1128] },
  { id: 'marol-naka', name: 'Marol Naka', lines: ['metro-1'], coordinates: [72.8786, 19.1068] },
  { id: 'saki-naka', name: 'Saki Naka', lines: ['metro-1'], coordinates: [72.8888, 19.0996] },
  { id: 'asalpha', name: 'Asalpha', lines: ['metro-1'], coordinates: [72.8983, 19.0932] },
  { id: 'jagruti-nagar', name: 'Jagruti Nagar', lines: ['metro-1'], coordinates: [72.9034, 19.0905] },
];

export function getStation(id: string): Station | undefined {
  return stations.find((s) => s.id === id);
}

export function searchStations(query: string): Station[] {
  const q = query.toLowerCase();
  return stations.filter((s) => s.name.toLowerCase().includes(q));
}

export function getStationsByLine(line: RailLine): Station[] {
  return stations.filter((s) => s.lines.includes(line));
}
