export interface IMovie {
    movieId: number
    movieName: string 
    imageURL: string 
    description: string 
    duration: number 
    releaseDate: Date
    movieGenre: string 
}

export interface IMovieSelect {
    movieId: number
    movieName: string 
    moviePrice: number 
    duration: number 
    releaseDate: Date 
}

export interface ICreateMovieParam {
    movieName: string 
    moviePrice: number
    imageURL: string 
    description: string 
    duration: number 
    releaseDate: string
    movieGenre: string[]
}

export interface IUpdateMovieParam {
    id: number 
    movieName: string 
    imageURL: string 
    description: string 
    duration: number 
    releaseDate: string
    movieGenre: string 
    isDeleted: boolean
}