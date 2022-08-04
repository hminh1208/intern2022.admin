export interface Gender {
    id: string;
    name: string;
    abbName: string;
}

export interface GenderResponseDto{
    results: Gender[],
    total: number
}
