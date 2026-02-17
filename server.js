const express = require('express');
const app = express();
const PORT = 3000;

// Importing file handler functions
const { readFile, writeFile } = require('./payroll-app/modules/fileHandler');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static("public"));


// get 
app.get('/', (req, res) => {
    const employees = readFile();   // JSON file se data read karo
    res.render('index', { employees });  // index.ejs ko data bhejo
});

// post
app.post('/add',(req,res)=>{
   
    const { name, department, salary } = req.body;

    const employees = readFile();  // Pehle se existing data read karo
 console.log(employees);
 
    
    const newEmployee = {
        id: Date.now(),  // Unique ID generate karo
        name,   
        department,
        salary: parseFloat(salary)  // Salary ko number me convert karo
    };
    
    
    
    employees.push(newEmployee);  // Naya employee data array me add karo
    writeFile(employees);  // Updated data ko file me write karo
    res.redirect('/');  // Form submit hone ke baad home page pe redirect karo


});

// delete
app.get('/delete/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    let employees = readFile();

    employees = employees.filter(emp => emp.id !== employeeId);

    writeFile(employees);
    res.redirect('/');
});


// edit
// Show Edit Form
app.get('/edit/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employees = readFile();

    const employee = employees.find(emp => emp.id === employeeId);

    if (!employee) {
        return res.redirect('/');
    }

    res.render('edit', { employee });
});


// Handle Update
app.post('/edit/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const { name, department, salary } = req.body;

    let employees = readFile();

    const index = employees.findIndex(emp => emp.id === employeeId);

    if (index !== -1) {
        employees[index] = {
            id: employeeId,
            name,
            department,
            salary: Number(salary)
        };

        writeFile(employees);
    }

    res.redirect('/');
});




app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});
