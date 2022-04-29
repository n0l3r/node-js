const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const studentRouter = require('./routes/students.router');
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    const start = Date.now();
    next();
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${elapsed}ms`);
});
// Method GET 
app.use('/', (req, res) => {
    res.render('index', {
        title: 'Learn Express JS',
        content: 'Welcome to my website'
        });
});

app.use('/students', studentRouter);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});