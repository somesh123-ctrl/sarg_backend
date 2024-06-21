const express = require('express');
const mysql = require('mysql2'); // Updated to mysql2
const multer = require('multer');
const dotenv = require("dotenv");
const csv = require('csv-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware
dotenv.config();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

// Configure multer for file uploads
const upload = multer({ dest: uploadDir });

// Helper function to map CSV columns to database columns
const mapCsvToDb = (row) => {
  return {
    DischargePort: row['Discharge Port'],
    SevenIslandsTotal: parseFloat(row['Seven Islands total']) || null,
    SevenIslandsIFO: parseFloat(row['Seven Islands IFO']) || null,
    SevenIslandsSECA: parseFloat(row['Seven Islands SECA']) || null,
    BaltimoreTotal: parseFloat(row['Baltimore total']) || null,
    BaltimoreIFO: parseFloat(row['Baltimore IFO']) || null,
    BaltimoreSECA: parseFloat(row['Baltimore Seca']) || null,
    PortCartierTotal: parseFloat(row['Port Cartier total']) || null,
    PortCartierIFO: parseFloat(row['Port Cartier IFO']) || null,
    PortCartierSECA: parseFloat(row['Port Cartier Seca']) || null,
    TubaraoTotal: parseFloat(row['Tubarao Total']) || null,
    TubaraoIFO: parseFloat(row['Tubarao IFO']) || null,
    TubaraoSECA: parseFloat(row['Tubarao SECA']) || null,
    PDMTotal: parseFloat(row['PDM total']) || null,
    PDMIFO: parseFloat(row['PDM IFO']) || null,
    PDMSECA: parseFloat(row['PDM SECA']) || null,
    MurmanskTotal: parseFloat(row['Murmansk total']) || null,
    MurmanskIFO: parseFloat(row['Murmansk IFO']) || null,
    MurmanskSECA: parseFloat(row['Murmansk SECA']) || null,
  };
};

// CRUD APIs

// Create
app.post('/data', (req, res) => {
  const sql = 'INSERT INTO DistanceTable SET ?';
  pool.query(sql, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(`Inserted row id: ${result.insertId}`);
  });
});

// Read
app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM DistanceTable';
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Update
app.put('/data/:id', (req, res) => {
  const sql = 'UPDATE DistanceTable SET ? WHERE id = ?';
  pool.query(sql, [req.body, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(`Updated ${result.affectedRows} row(s)`);
  });
});

// Delete
app.delete('/data/:id', (req, res) => {
  const sql = 'DELETE FROM DistanceTable WHERE id = ?';
  pool.query(sql, req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(`Deleted ${result.affectedRows} row(s)`);
  });
});

// Upload CSV file and insert data
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  let errorOccurred = false;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      const mappedRow = mapCsvToDb(row);
      const sql = 'INSERT INTO DistanceTable SET ?';
      pool.query(sql, mappedRow, (err) => {
        if (err) {
          errorOccurred = true;
          console.error(err); // Log error to console
        }
      });
    })
    .on('end', () => {
      fs.unlinkSync(filePath); // Delete the file after processing
      if (errorOccurred) {
        res.status(500).send('An error occurred while processing the CSV file');
      } else {
        res.send('CSV file successfully processed');
      }
    })
    .on('error', (err) => {
      fs.unlinkSync(filePath); // Delete the file in case of error
      res.status(500).send('An error occurred while reading the CSV file');
    });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
