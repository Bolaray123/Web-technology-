const express = require('express');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Serve static files from 'public' directory
app.use(express.static('public'));

// Basic route for homepage
app.get('/', (req, res) => {
res.render('index', { pagetitle: 'Welcome to the Homepage' });
});

// Dynamic route example
app.get('/user/:userid', (req, res) => {
res.send(`<h1>User ID: ${req.params.userid}</h1>`);
});

// Start the server
app.listen(3000, () => {
console.log('Server started on http://localhost:3000');
});
