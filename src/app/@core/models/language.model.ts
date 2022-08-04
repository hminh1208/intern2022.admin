export interface Language {
    id: string;
    name: string;
    abbName: string;
}

export interface LanguageResponseDto{
    results: Language[],
    total: number
}
