import * as express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { MoviesClient } from "./clients/MoviesClient";

(async () => {
    mongoose.set('strictQuery', true);
    dotenv.config();
    const connectionString = process.env.DATABASE_URL || ".";
    mongoose.connect(connectionString);
    const database = mongoose.connection;
    database.once('connected', () => {
        console.log('Database Connected');
    })

    const app = express();
    app.use(express.json());
    app.use((_, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        next();
    });

    const moviesClient = await MoviesClient.Create();

    app.get("/movies/:id", async (req, res) => {
        const movie = await moviesClient.GetMovie(req.params.id);
        res.send(movie);
    });

    app.get("/movies", async (_, res) => {
        const movies = await moviesClient.GetMovies();
        res.send(movies);
    });

    app.post("/movies", async (req, res) => {
        const id = await moviesClient.CreateMovie(req.body);
        res.send({ id: id });
    });

    app.put("/movies/:id", async (req, res) => {
        console.log(req.body);
        await moviesClient.UpdateMovie(req.params.id, req.body);
        res.send();
    });

    app.delete("/movies/:id", async (req, res) => {
        const id = await moviesClient.DeleteMovie(req.params.id);
        res.send();
    });

    const port = process.env.PORT || 3001;

    app.listen(port, () => console.log(`Express API listening on PORT ${port}`));
})();
