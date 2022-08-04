export interface City {
    id: string;
    name: string;
    shortName: string;
}

export interface CityResponseDto {
    results: City[];
    total: number;
}
