import { disorderDto } from "./disorder.dto";

export interface activityDto {
    id : number;
    title: string;
    description: string;
    categoryActivitiesId: number;
    disorderId: number;
    categoryActivities: CategoryActivitiesDto;
};

export interface CategoryActivitiesDto{
    id: number;
    type: string;
    disorderId: number;
    disorder?: disorderDto
}