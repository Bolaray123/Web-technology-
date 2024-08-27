const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db = new sqlite3.Database('./myDB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == 'SQLITE_CANTOPEN') {
        createDatabase();
        return;
    } else if (err) {
        console.log('Getting error ' + err);
        process.exit(1);
    }
});

function createDatabase() {
    var newdb = new sqlite3.Database('myDB.db', (err) => {
        if (err) {
            console.log('Getting error ' + err);
            process.exit(1);
        } else {
            newdb.run("CREATE TABLE staff (staffID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, department TEXT);", (err) => {
                if (err) {
                    console.log("Table creation error: " + err);
                } else {
                    newdb.run("INSERT INTO staff (name, department) VALUES ('John Doe', 'Engineering');");
                    newdb.run("INSERT INTO staff (name, department) VALUES ('Jane Smith', 'HR');");
                    console.log('Sample data inserted');
                }
            });
            console.log('New database created and connected');
        }
    });
}

// Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Staff Management System</h1><p>Go to <a href="/staff">Staff List</a></p>');
});

// GET request for staff
app.get('/staff', (req, res) => {
    db.all('SELECT * FROM staff', [], (err, rows) => {
        if (err) {
            console.log('Error retrieving data from the database:', err);
            res.send('Error retrieving data from the database.');
        } else {
            console.log('Data retrieved:', rows);
            res.render('staff', { results: rows });
        }
    });
});

// POST request to add staff
app.post('/staff', (req, res) => {
    db.run('INSERT INTO staff(name, department) VALUES(?,?)', [req.body.name, req.body.department], (err) => {
        res.render('addstaff', { err: err });
    });
});

// Fallback route
app.get('*', (req, res) => {
    res.send('This route does not exist. Try /staff.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
