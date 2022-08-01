export interface City {
    id: string;
    name: string;
    abbName: string;
}

export interface CityResponseDto{
    results: City[],
    total: number
}
