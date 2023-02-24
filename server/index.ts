import * as express from 'express';
import * as dotenv from 'dotenv';
import * as http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { MoviesClient } from './clients/MoviesClient';

(async () => {
    mongoose.set('strictQuery', true);
    dotenv.config();
    const connectionString = process.env.DATABASE_URL || '.';
    mongoose.connect(connectionString);
    const database = mongoose.connection;
    database.once('connected', () => {
        console.log('Database Connected');
    })

    const clientOrigin = 'http://localhost:4200';

    const app = express();
    const httpServer = new http.Server(app);
    const io = new Server(httpServer, { cors: { origin: clientOrigin } });

    app.use(express.json());
    app.use((_, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', clientOrigin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        next();
    });

    const moviesClient = await MoviesClient.Create();

    const emitUpdatedMovies = async () => {
        const movies = await moviesClient.GetMovies();
        io.emit('movies-updated', movies);
    }

    app.get('/movies/:id', async (req, res) => {
        const movie = await moviesClient.GetMovie(req.params.id);
        res.send(movie);
    });

    app.get('/movies', async (_, res) => {
        const movies = await moviesClient.GetMovies();
        res.send(movies);
    });

    app.post('/movies', async (req, res) => {
        const id = await moviesClient.CreateMovie(req.body);
        res.send({ id: id });
        emitUpdatedMovies();
    });

    app.put('/movies/:id', async (req, res) => {
        console.log(req.body);
        await moviesClient.UpdateMovie(req.params.id, req.body);
        res.send();
        emitUpdatedMovies();
    });

    app.delete('/movies/:id', async (req, res) => {
        const id = await moviesClient.DeleteMovie(req.params.id);
        res.send();
        emitUpdatedMovies();
    });

    const port = process.env.PORT || 3001;

    httpServer.listen(port, () => console.log(`Express API listening on PORT ${port}`));
})();
