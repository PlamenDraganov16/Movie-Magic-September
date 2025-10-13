import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create');
})

movieController.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const creatorId = req.user.id;

    await movieService.create(movieData, creatorId);

    res.redirect('/');

});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOneDetailed(movieId);

    // const isOwner = movie.creator === req.user?.id;
    const isOwner = movie.creator && movie.creator.equals(req.user?.id);

    const ratingViewData = '&#x2605; '.repeat(Math.trunc(movie.rating));

    res.render('movies/details', { movie, rating: ratingViewData, isOwner})

});

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter })
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({excludes: movie.casts});
    
    res.render('casts/attach', { movie, casts });
});

movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    // Check if creator
    if (!movie.creator?.equals(req.user.id)) {
        return res.redirect('/');
    }

    await movieService.delete(movieId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    const categoriesViewData = getMovieCategoryViewData(movie.category);

    res.render('movies/edit', { movie, categories: categoriesViewData});
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    await movieService.edit(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`)
});

function getMovieCategoryViewData(selectedCategory) {
    const categories = [
        { value: 'tv-show', label: 'TV Show' },
        { value: 'animation', label: 'Animation' },
        { value: 'movie', label: 'Movie' },
        { value: 'documentary', label: 'Documentary' },
        { value: 'short-film', label: 'Short Film' },
    ];

    const viewData = categories.map(category => ({ ...category, selected: selectedCategory === category.value ? 'selected' : '' }))

    return viewData;
}

export default movieController;