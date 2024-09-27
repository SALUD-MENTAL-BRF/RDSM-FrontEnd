export interface Hospital {
  name: string;
  address: string;
  telephone: string;
  email: string;
  website: string;
  director: string;
  openingHours: string;
  typeHospital: string; // Nuevo campo para el tipo de hospital
  specialities: string[]; // Nuevo campo para las especialidades
}
