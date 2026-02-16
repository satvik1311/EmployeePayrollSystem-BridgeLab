const express = require('express');
const app = express();
const PORT = 3000;

// Importing file handler functions
const { readFile, writeFile } = require('./payroll-app/modules/fileHandler');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");

// get 



app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});
