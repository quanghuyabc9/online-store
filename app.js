const port = 3000;
const hostname = '127.0.0.1';

const express = require('express');
const exphbs = require('express-handlebars');
const exphbsSection = require('express-handlebars-sections');
const guess = require('./controllers/guess');
const errors = require('./middlewares/errors');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});
exphbsSection(hbs);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use("/", guess);

//error-handling middleware
errors(app);

app.listen(port, hostname, (req, res) => {
    console.log('App is listening on port: ' + port);
})