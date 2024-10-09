export interface activityDto {
    id : number
    title: string
    description: string
    categoryActivitiesId: number
    disorderId: number,
    categoryActivities: CategoryActivities
};

export interface CategoryActivities{
    id: number,
    type: string
}