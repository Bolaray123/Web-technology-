const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./themePark.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  // Table for Theme Park Areas
  db.run(`
    CREATE TABLE IF NOT EXISTS Areas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
  `);

  // Table for Rides/Attractions in each area
  db.run(`
    CREATE TABLE IF NOT EXISTS Attractions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      area_id INTEGER,
      FOREIGN KEY (area_id) REFERENCES Areas(id)
    )
  `);
});

db.serialize(() => {
    // Insert sample areas
    db.run(`INSERT INTO Areas (name, description) VALUES ('Splash Zone', 'Water slides and wave pools')`);
    db.run(`INSERT INTO Areas (name, description) VALUES ('Lazy River', 'Relaxing float through the park')`);
  
    // Insert sample rides
    db.run(`INSERT INTO Attractions (name, description, area_id) VALUES ('Giant Slide', 'A thrilling high-speed water slide', 1)`);
    db.run(`INSERT INTO Attractions (name, description, area_id) VALUES ('Wave Pool', 'An ocean-like experience with waves', 1)`);
  });

  
module.exports = db;
