export interface Hospital {
  id: number;
  name: string;
  address: string;
  telephone: string;
  email: string;
  website: string;
  director: string;
  openingHours: string;
  type: string;
  specialties: Array<{
    specialtyId: number;
    specialty: {
      name: string;
    };
  }>;
  services: Array<{
    serviceId: number;
    service: {
      name: string;
    };
  }>;
  userId: string
}
