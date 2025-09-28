import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';

const app = express();

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');


// Setup Middleware
app.use(express.static('src/public'));
app.use(express.urlencoded()); // Parse form data from req

// Routes
app.use(routes)

// Start Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});