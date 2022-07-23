export interface AccountAuthResponseDto{
    "id": string,
    "title": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "role": string,
    "created": string,
    "updated": string,
    "isVerified": string,
    "jwtToken": string,
    "refreshToken": string
}

export interface AccountAuthRequestDto{
    "email": string,
    "password": string
}
