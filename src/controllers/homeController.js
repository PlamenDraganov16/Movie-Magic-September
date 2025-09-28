import { Router } from 'express';
import movieService from '../services/movieService.js';

const homeController = Router();

homeController.get('/', (req, res) => {
    const movies = movieService.getAll();

    res.render('home', { movies , pageTitle: 'Home Page'}); 
});

homeController.get('/about', (req, res) => {
    res.render('about');
});


export default homeController;