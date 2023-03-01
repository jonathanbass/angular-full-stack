import { Request, Response } from "express";
import { MoviesClient } from "../clients/MoviesClient";
import { IMovie } from "../models/IMovie";

export class MoviesController {
    private moviesClient: MoviesClient;
    private socketCallback: (movies: IMovie[]) => Promise<void>;

    private constructor(socketCallback: (movies: IMovie[]) => Promise<void>) {
        this.socketCallback = socketCallback;
        this.moviesClient = MoviesClient.Create();
    }

    public static Create = async (socketCallback: (movies: IMovie[]) => Promise<void>) => { 
        const instance = new MoviesController(socketCallback);
        return instance;
    };

    getMovie = async (req: Request, res: Response) => {
        const movie = await this.moviesClient.GetMovie(req.params.id);
        res.send(movie);
    }

    getMovies = async (_: Request, res: Response) => {
        const movies = await this.moviesClient.GetMovies();
        res.send(movies);
    }

    createMovie = async (req: Request, res: Response) => {
        const id = await this.moviesClient.CreateMovie(req.body);
        res.send({ id: id });
        this.invokeCallback();        
    }

    updateMovie = async (req: Request, res: Response) => {
        await this.moviesClient.UpdateMovie(req.params.id, req.body);
        res.send();
        this.invokeCallback();        
    }

    deleteMovie = async (req: Request, res: Response) => {
        const id = await this.moviesClient.DeleteMovie(req.params.id);
        res.send(`Movie with Id='${id}' deleted successfully.`);
        this.invokeCallback();        
    }

    private invokeCallback = async () => {
        const movies = await this.moviesClient.GetMovies();
        this.socketCallback(movies);
    }
}
