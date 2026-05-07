export interface Point {
  id: string;
  nom: string;
  adresse?: string;
  type?: string;
  domaine?: string;
  distance_km?: number;
  source?: string;
  lat?: number;
  lon?: number;
}
