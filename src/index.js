import path from 'node:path'
import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.set(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});