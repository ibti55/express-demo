const mongoose = require('mongoose');

const logincon = mongoose.createConnection('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema for the LogInCollection
const logInSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });

const LogInCollection = logincon.model('LogInCollection', logInSchema);


const express = require("express")
const path = require("path")
const app = express()

const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const publicPath = path.join(__dirname, 'public')
console.log(publicPath);
app.use(express.static(publicPath))


const templatePath = path.join(__dirname, 'views')
app.set('views', templatePath)

app.set('view engine', '.hbs')

// Set the views directory to the 'views' folder in your project
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));



app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})
// app.get('/delete_med', (req, res) => {
//     // Render your view for the delete_med page
//     res.render('home');
// });

// app.get('/showmed', (req, res) => {
//   res.render('showmed')
// })

// app.get('/delete_med', async (req, res) => {
//     const medicines = await MedicineCollection.find();
//     console.log('printing')
//     // Create a new array with only the desired attributes
//     const filteredMedicines = medicines.map(medicine => ({
//     name: medicine.name,
//     dosage: medicine.dosage,
//     manufacturer: medicine.manufacturer,
//     }));

//     // Convert the array to a JSON string with one object per line
//     const jsonString = JSON.stringify(filteredMedicines, null, 2);

//     // Send the formatted JSON string as the response
//     res.set('Content-Type', 'application/json');
//     res.send(jsonString);
//     //res.render('delete_med')
//     //res.render('showmed', { medicines });
// })

app.post('/signup', async (req, res) => {


    try {
        const { name, password } = req.body;

        const medAdded = new LogInCollection({ name, password });
        await medAdded.save();

        const Users = await LogInCollection.find();

        const filteredUsers = Users.map(user => ({
          name: user.name
        }));

        // Convert the array to a JSON string with one object per line
        const jsonString = JSON.stringify(filteredUsers, null, 2);

        res.set('Content-Type', 'application/json');
        res.status(201).send(jsonString);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).render("home", { naming: req.body.name})
})


app.post('/login', async (req, res) => {
    //console.log('asdasd')
    try {
        //console.log('orre')
        const check = await LogInCollection.findOne({ name: req.body.name })
        //console.log(check.body)
        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }
        else {
            res.send("incorrect password")
        }
    } 
    
    catch (e) {
      res.send("wrong details")
    }


})

// app.post('/home', async (req, res) => {


//     try {
//         // Extract user data from the request body
//         const { name, dosage, manufacturer } = req.body;
//         //console.log(req.body)

//         // Create a new user instance
//         const newUser = new MedicineCollection({ name, dosage, manufacturer });
//         //console.log(newUser)

//         // Save the user to the database
//         await newUser.save();
//         //console.log('ekahneeasfdad')
//         // Respond with a success message
//         res.status(201).render("delete_med", { naming: `${req.body.dosage}+${req.body.name}` });
//         console.log("oioi")
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

  
app.listen(port, () => {
    console.log('port connected');
})