import path from 'node:path'
import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');


// Middleware
app.set(express.static('public'));

// Routes
app.get('/', (req, res) => {
   res.render('home', {layout: false}); 
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});