import { IMovie } from "src/app/models/movie";

export const existingMovie: IMovie = {
    _id: 'testid12345',
    cast: [],
    genre: [],
    runtime: 0,
    year: 2000,
    title: ''
};

export const newMovie: IMovie = {
    cast: [],
    genre: [],
    runtime: 0,
    year: 2000,
    title: ''
};

export const testMovies: IMovie[] = [
    {
        title: "Star Wars: Empire Strikes Back",
        year: 1980,
        runtime: 126,
        genre: [
            "Science Fiction",
            "Fantasy"
        ],
        cast: [
            "Harrison Ford",
            "Mark Hamill",
            "Carrie Fisher"
        ]
    },
    {
        title: "Star Wars: Empire Strikes Back",
        year: 1980,
        runtime: 126,
        genre: [
            "Science Fiction",
            "Fantasy"
        ],
        cast: [
            "Harrison Ford",
            "Mark Hamill",
            "Carrie Fisher"
        ]
    },
    {
        title: "Star Wars: Empire Strikes Back",
        year: 1980,
        runtime: 126,
        genre: [
            "Science Fiction",
            "Fantasy"
        ],
        cast: [
            "Harrison Ford",
            "Mark Hamill",
            "Carrie Fisher"
        ]
    },
    {
        title: "hfgdhgf",
        year: 2010,
        runtime: 343,
        genre: [
            "fdsgfds",
            "sdffs"
        ],
        cast: [
            "gfdgsfd",
            "fdf"
        ]
    }
];
