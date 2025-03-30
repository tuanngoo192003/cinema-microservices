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
}

export interface ICreateMovieParam {
    movieName: string 
    imageURL: string 
    description: string 
    duration: number 
    releaseDate: Date
    movieGenre: string 
}

export interface IUpdateMovieParam {
    id: number 
    movieName: string 
    imageURL: string 
    description: string 
    duration: number 
    releaseDate: Date
    movieGenre: string 
    isDeleted: boolean
}