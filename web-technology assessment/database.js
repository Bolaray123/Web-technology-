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
    db.run(`INSERT INTO Areas (name, description) VALUES ('Pool Side', 'Relax by the sparkling poolside, where the sun shines bright, and the fun never stops. Unwind on comfy loungers or take a refreshing dip in crystal-clear waters.')`);
    db.run(`INSERT INTO Areas (name, description) VALUES ('Waterslides', 'Feel the thrill as you zip down our exhilarating waterslides, designed for fun-seekers of all ages. Experience the ultimate splash and excitement at every twist and turn.')`);
    db.run(`INSERT INTO Areas (name, description) VALUES ('River Rides', 'Embark on a scenic adventure with our gentle river rides. Drift through winding waterways surrounded by lush greenery, perfect for a peaceful escape or a family journey.')`);
  
    // Insert sample rides
    db.run(`INSERT INTO Attractions (name, description, area_id) VALUES ('Roller Coaster', 'Get ready for heart-pounding drops and high-speed thrills on our roller coaster!', 001)`);
    db.run(`INSERT INTO Attractions (name, description, area_id) VALUES ('Courosel', 'Enjoy a classic ride on our charming, beautifully crafted carousel.', 002)`);
    db.run(`INSERT INTO Attractions (name, description, area_id) VALUES ('Arcade Game', 'Challenge your friends with fun and exciting arcade games for all ages!', 003)`);
    db.run(`INSERT INTO Attractions (name, description, area_id) VALUES ('Hanging Courosel', 'Enjoy a classic ride on our charming, beautifully crafted carousel.', 003)`);

    
  });

  
module.exports = db;
