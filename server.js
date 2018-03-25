const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to log data to file')
        }
    });
    next();
});

app.use((req, res, next) =>{
    res.render('maintenance.hbs', {
        maintenanceMessage : 'We will be back shortly'
    });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

/*
app.get('/', (req, res) => {
    
    res.send('<h1>Hello Express</h1>');
    res.send({
       name : 'Infaz',
        likes : [
            'sleeping', 'Gaming', 'Watching Cricket'
        ]
    });
});*/

app.get('/', (req, res) => {
   
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        welcomeMessage : 'Welcome to the Page'
    });
});

app.get('/about',(req,res) => {
    //res.send('This is about page');
    res.render('about.hbs', {
        pageTitle : 'Webservers About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Unable to load data'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});