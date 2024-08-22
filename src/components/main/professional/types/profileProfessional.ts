export interface Professional {
    id: number;
    description: string;
    availability: boolean;
    preference_communication: string;
    url_image: string;
    professionalId: number;
    professional: Profile;
}

interface Profile {
    id: number;
    firstname: string;
    lastname: string;
    title: string;
    specialization: string;
    tuition: number;
    birthdate: string;
    userId: number;
}