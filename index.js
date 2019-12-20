const express = require("express");
const connection = require("./conf");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

// GET - Retrieve all of the data from your table
app.get('/api/surfspots', (req, res) => {
  connection.query('SELECT * from surfspots', (err, results) => {
    if (err) {
      res.status(500).send('Ups... There was an error retrieving the data');
    } else {
      res.json(results);
    }
  });
});

// GET - Retrieve specific fields (i.e. id, names, dates, etc.)
app.get('/api/surfspots/names', (req, res) => {
  connection.query('SELECT name from surfspots', (err, results) => {
    if (err) {
      res.status(500).send('Ups... There was an error retrieving the data');
    } else {
      res.json(results);
    }
  });
});

// GET - Retrieve a data set with the following filters (use one route per filter type):
// A filter for data that contains... (e.g. name containing the string 'wcs')
app.get('/api/surfspots/contain', (req, res) => {
  const q = 'SELECT * from surfspots where name like "%Puerto%"';
  connection.query(q, (err, results) => {
    if (err) {
      res.status(500).send('Ups... There was an error retrieving the data');
    } else {
      res.json(results);
    }
  });
});

// A filter for data that starts with... (e.g. name beginning with 'campus')
app.get('/api/surfspots/starts', (req, res) => {
  const q = 'SELECT * from surfspots where name like "Mav%"';
  connection.query(q, (err, results) => {
    if (err) {
      res.status(500).send('Ups... There was an error retrieving the data');
    } else {
      res.json(results);
    }
  });
});

// A filter for data that is greater than... (e.g. date greater than 18/10/2010)
app.get('/api/surfspots/greater_than', (req, res) => {
  const q = 'SELECT * from surfspots where starting_date > 15';
  connection.query(q, (err, results) => {
    if (err) {
      res.status(500).send('Ups... There was an error retrieving the data');
    } else {
      res.json(results);
    }
  });
});

// GET - Ordered data recovery (i.e. ascending, descending) - The order should be passed as a route parameter
app.get('/api/surfspots/:data/:order', (req, res) => {
  const q = `SELECT * from surfspots order by ${req.params.data} ${req.params.order}`;
  connection.query(q, (err, results) => {
    if (err) {
      res.status(500).send('Ups... There was an error retrieving the data');
    } else {
      res.json(results);
    }
  });
});

// POST - Insertion of a new entity
app.post('/api/surfspots', (req, res) => {
  // Get the data sent
  const formData = req.body;
  const q = 'INSERT INTO surfspots SET ?'
  // connection to the database, and insertion of the musicband
  connection.query(q, formData, (err, results) => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
      console.log("the err", err);
      res.status(500).send("Ups... There was an error saving the data");
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

// PUT - Modification of an entity
app.put('/api/surfspots/:id', (req, res) => {
  const idSurfspots = req.params.id;
  const formData = req.body;
  connection.query('UPDATE surfspots SET ? WHERE id = ?', [formData, idSurfspots], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Ups... There was an error editing the data");
    } else {
      res.sendStatus(200);
    }
  });
});

// // PUT - Toggle a Boolean value
// app.put('/api/musicbands/isActive/:id', (req, res) => {
//   const idMusicbands = req.params.id;
//   connection.query('UPDATE musicbands SET isActive=1-isActive WHERE id = ?', [idMusicbands], err => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Ups... There was an error editing the data");
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// DELETE - Delete an entity
app.delete('/api/surfspots/:id', (req, res) => {
  const idSurfspots = req.params.id;
  connection.query('DELETE FROM surfspots WHERE id = ?', [idSurfspots], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Ups... There was an error deleting the data");
    } else {
      res.sendStatus(200);
    }
  });
});

// // DELETE - Delete all entities where boolean value is false
// app.delete('/api/surfspots/', (req, res) => {
//   connection.query('DELETE FROM surfspots WHERE isActive = 0', err => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Ups... There was an error deleting the datas");
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });


app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");j
  }
  console.log(`Server is listening on ${port}`);
});
