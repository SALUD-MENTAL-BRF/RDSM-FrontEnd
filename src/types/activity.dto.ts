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
    categoryActivities?: categoryActivitiesDto;
    activityXdisorder: Array<activityXdisorder>;
};

export interface categoryActivitiesDto{
    id: number;
    type: string;
}

export interface disorderXcategoryDto {
    id: number;
    disorderId: number;
    categoryId: number;
    category: categoryActivitiesDto
}

export interface activityXdisorder {
    id: number;
    disorderId: number;
    activityId: number;
}