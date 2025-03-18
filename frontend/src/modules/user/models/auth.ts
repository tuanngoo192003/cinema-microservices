export type ILoginForm = {
    username?: string
    password?: string
    remember?: string
}

export type ILoginParams = {
    identifier?: string;
    password?: string
}

export type ILoginResponse = {
    id?: number
    username?: string
    role?: string
    accessToken?: string
    refreshToken?: string
}

export type IRefreshingTokenParam = {
    refreshToken?: string
}

export interface IRefreshTokenResponse {
    accessToken: string
    refreshToken: string
}