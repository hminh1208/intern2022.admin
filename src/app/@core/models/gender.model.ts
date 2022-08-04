export interface Gendermanagerment {
    id: string;
    name: string;
}

export interface GenderResponseDto{
    results: Gendermanagerment[],
    total: number
}
