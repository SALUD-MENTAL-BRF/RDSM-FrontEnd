import { disorderDto } from "./disorder.dto";

export interface activityXPatientDto {
    id: number;
    patientId: number;
    professionalId: number;
    activityId: number;
    activity: activityDto
}

export interface activityDto {
    id : number;
    title: string;
    description: string;
    active: boolean;
    categoryActivitiesId: number;
    disorderId: number;
    categoryActivities?: CategoryActivitiesDto;
};

export interface CategoryActivitiesDto{
    id: number;
    type: string;
    disorderId: number;
    disorder?: disorderDto
}