import * as express from 'express';
import * as dotenv from 'dotenv';
import * as http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { MoviesController } from './controllers/MoviesController';
import { IMovie } from './models/IMovie';

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

    const emitUpdatedMovies = async (movies: IMovie[]) => {
        io.emit('movies-updated', movies);
    }

    const moviesController = await MoviesController.Create(emitUpdatedMovies);

    app.get('/movies/:id', moviesController.getMovie);

    app.get('/movies', moviesController.getMovies);

    app.post('/movies', moviesController.createMovie);

    app.put('/movies/:id', moviesController.updateMovie);

    app.delete('/movies/:id', moviesController.deleteMovie);

    const port = process.env.PORT || 3001;

    httpServer.listen(port, () => console.log(`Express API listening on PORT ${port}`));
})();
