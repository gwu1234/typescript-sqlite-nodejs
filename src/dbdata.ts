import sqlite3 from "sqlite3";

// create a database if not exist
let db = new sqlite3.Database('./guoping.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
          console.error(err.message);
      }
      console.log('Connected to the guoping database.');
});

// wait 1 second to create or read database file, and init() , and 1 more second to close  
( () => {
          // init 
          setTimeout(() => db_init (), 2000) ;
          // close 
          setTimeout( () => db.close((err) => {
               if (err) {
                  console.log (err.message);
                  return;
               }
               console.log('database guoping created.');
               }), 3000); 
        }
) ();

// init database
const db_init = async () => {
    // table Users
    await db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255),
        email VARCHAR(255)
      );
    `);
   
    await db.run(`
      INSERT OR IGNORE INTO students (id, name, email)
      VALUES
        (1, 'James Dubois', 'alien@hotmail.com'),
        (2, 'Banana Dubois', 'slippery@gmail.com'),
        (3, 'Aliana Dubois', 'meow@aws.com'),
        (4, 'Doggy Dubois', 'dawg@yahoo.com'),
        (5, 'Donalt Trump', '111@hotmail.com'),
        (6, 'Joe Biden', '222@mail.com'),
        (7, 'Genius Biden', '333@gmail.com'),
        (8, 'George Bush', '444@yahoo.com'),
        (9, 'Pickle Bush', '555@hotmail.com');
    `);

    // Table Work Orders
    await db.run(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255),
        status VARCHAR(255) CHECK( status IN ('OPEN', 'CLOSED') ) NOT NULL DEFAULT 'OPEN'
      );
    `);

    await db.run (`
      INSERT OR IGNORE INTO courses (id, name, status)
      VALUES
        (1, 'chemistry', 'OPEN'),
        (2, 'economy', 'OPEN'),
        (3, 'physics', 'OPEN'),
        (4, 'politics', 'OPEN'),
        (5, 'finance', 'CLOSED'),
        (6, 'mathematics', 'CLOSED'),
        (7, 'arts', 'OPEN'),
        (8, 'geology', 'OPEN'),
        (9, 'literature', 'CLOSED');
    `); 

    // Work Order Assignees
    await db.run(`
      CREATE TABLE IF NOT EXISTS course_student (
        course_id INT NOT NULL,
        student_id INT NOT NULL,
        PRIMARY KEY(course_id, student_id),
        FOREIGN KEY(course_id) REFERENCES courses(id),
        FOREIGN KEY(student_id) REFERENCES students(id)
      );
    `);

    await db.run(`
      INSERT OR IGNORE INTO course_student (course_id, student_id)
      VALUES
        (3, 1),
        (5, 1),
        (2, 3),
        (3, 4),
        (6, 5),
        (1, 2),
        (1, 3),
        (1, 4),
        (4, 8);
    `);

  };