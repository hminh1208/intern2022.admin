export interface Language {
    id: string;
    name: string;
    shortName: string;
}

export interface LanguageResponseDto{
    results: Language[],
    total: number
}
