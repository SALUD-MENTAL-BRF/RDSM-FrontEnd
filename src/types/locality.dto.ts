import { ProvinceDto } from "./privinces.dto";
export interface localityDto {
    id: number;
    name: string;
    provinceId: number;
    province?: ProvinceDto
}