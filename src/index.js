import express from 'express';
import handlebars from 'express-handlebars';

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

const app = express();

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');


// Setup Middleware
app.use(express.static('src/public'));

// Routes
app.use(homeController);
app.use(movieController);


// Start Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});