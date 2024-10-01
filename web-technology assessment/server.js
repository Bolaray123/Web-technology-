const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();

app.use(express.static("public"));

// Home Route
app.get('/', (req, res) => {
  db.all('SELECT * FROM Areas', (err, rows) => {
    if (err) {
      res.status(500).send('Error retrieving areas');
    } else {
      // Assuming rows is an array with at least 3 elements
      const [poolSide, waterslides, riverRides] = rows;
      res.render('index', { poolSide, waterslides, riverRides });
    }
  });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index' ,{ text : 'Star'});
});

app.get('/areas', (req, res) => {
  db.all('SELECT * FROM Areas', (err, rows) => {
    if (err) {
      res.status(500).send('Error retrieving areas');
    } else {
      // Assuming rows is an array with at least 3 elements
      const [poolSide, waterslides, riverRides] = rows;
      res.render('areas', { poolSide, waterslides, riverRides });
    }
  });
});



app.get('/attractions', (req, res) => {
  db.all('SELECT * FROM Attractions', (err, rows) => {
    if (err) {
      res.status(500).send('Error retrieving rides');
    } else {
      const [courosel, hangCourosel, rollerCoaster, arcadeGame] = rows;
      res.render('attractions', { courosel, hangCourosel, rollerCoaster, arcadeGame });
    }
  });
});

// FAQ Route
app.get('/faq', (req, res) => {
  res.render('faq', { title: 'Frequently Asked Questions' });
});

// Contact Route
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});