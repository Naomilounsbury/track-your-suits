
const express = require('express');
// import dotenv so we can use process.env environment variables
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./apiRoutes")
const db = require("./db/connection")
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database

app.use('/', apiRoutes);
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
  