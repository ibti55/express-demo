// const mongoose = require('mongoose');

// // Create separate connection instances for each collection
// //const logincon = mongoose.createConnection('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });
// const Medicinecon = mongoose.createConnection('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });



// // const mongoURI1 = 'mongodb://localhost:27017/admin'; // Update with your first MongoDB URI
// // const mongoURI2 = 'mongodb://localhost:27017/medicine'; // Update with your second MongoDB URI

// // // Create separate MongoClient instances for each database
// // const logincon =  mongoose.createConnection(mongoURI1, { useNewUrlParser: true, useUnifiedTopology: true });
// // const Medicinecon = mongoose.createConnection(mongoURI2, { useNewUrlParser: true, useUnifiedTopology: true });


// // Schema for the LogInCollection
// const logInSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     }
//   });
  
  // Schema for the MedicineCollection
  // const medicineSchema = new mongoose.Schema({
  //   // Define the schema fields for the Medicine collection
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   dosage: {
  //     type: String,
  //     required: true
  //   },
  //   manufacturer: {
  //     type: String,
  //     required: true
  //   }
  // });


// //const LogInCollection = logincon.model('LogInCollection', logInSchema);
// const MedicineCollection = Medicinecon.model('MedicineCollection', medicineSchema);
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/admin';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // // Schema for the MedicineCollection
  // const medicineSchema = new MongoClient.sche({
  //   // Define the schema fields for the Medicine collection
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   dosage: {
  //     type: String,
  //     required: true
  //   },
  //   manufacturer: {
  //     type: String,
  //     required: true
  //   }
  // });

// Connect to the MongoDB server
async function connectDB() {
    await client.connect();
    console.log('Connected to the database');
}

// Call the connectDB function to establish a connection
connectDB();

// Get the database instance
const database = client.db();

  // Get a list of all collections (tables) in the database
  // const collections = database.listCollections().toArray();
  // console.log(collections)

  // Iterate through each collection
//   for (const collectionInfo of collections) {
//     const collectionName = collectionInfo.name;
//     console.log(`Processing collection: ${collectionName}`);

//     // Get the collection object
//     const medCollection = database.collection(collectionName);
//     // if(collectionName === 'medicinecollections'){
//     //   const entry = await medCollection.findOne({ name: 'tufnil' })
//     //   console.log(entry)
//     //   medCollection.deleteOne(entry)
//     // }
//     // else if(collectionName === 'logincollections'){
//     //   const entry = await medCollection.findOne({ name: 'rakib' })
//     //   console.log(entry)
//     //   medCollection.deleteOne(entry)
//     // }

//     // Your update logic goes here
//     // Example: Update all documents in the collection
//     //await collection.updateMany({}, { $set: { key: 'value' } });

//     console.log(`Updated collection: ${collectionName}`);
//   }
// } finally {
//   // Close the connection when done
//   console.log('Connection closed');
// }

const MedicineCollection = database.collection('medicineStock');
const loginCollection = database.collection('newUserCollection');

async function insertMedicine({ name, dosage, manufacturer }) {
    //const collection = database.collection(medicine);

    try {        
        const result = await MedicineCollection.insertOne({ name, dosage, manufacturer });
    } catch (error) {
        console.error('Error updating document:', error);
    }
}


const bodyParser = require("body-parser"); 
const express = require("express")
const path = require("path")
const cors = require('cors');
const app = express()
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

const templatePath = path.join(__dirname, 'views')
app.set('views', templatePath)

app.set('view engine', '.hbs')


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



app.post('/signup', async (req, res) => {


  try {
    const {
      name,
      email,
      password,
      birthdate,
      city,
      village,
      streetNumber,
      houseNumber,
    } = req.body;
      // const { name, password } = req.body;
      const result = await loginCollection.insertOne({
        name,
        email,
        password,
        birthdate,
        city,
        village,
        streetNumber,
        houseNumber,
      });
      res.status(201).render("home")
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.post('/login', async (req, res) => {
  //console.log('asdasd')
  try {
      //console.log('orre')
      const check = await loginCollection.findOne({ name: req.body.name })
      //console.log(check.body)
      if (check.password === req.body.password) {
          res.status(201).render("home")
      }
      else {
          res.send("incorrect password")
      }
  } 
  
  catch (e) {
    res.send("wrong details")
  }


})


// app.get('/dashboard_view_stock', (req, res) => {
//   console.log('hererer')
//   res.render('dashboard_view_stock')
// })

app.get('/show_med_list', async (req, res) => {
  const MedicineCollection = database.collection('medicinecollections');
  // Find all documents in the collection
  const cursor = MedicineCollection.find();

  // Convert the cursor to an array and print the results
  const documents = await cursor.toArray();
  console.log('All documents in the collection:', documents);
  // Render the HTML page with the fetched data
  //res.render('index', { documents });
  const jsonString = JSON.stringify(documents, null, 2);
  res.set('Content-Type', 'application/json');
  res.send(jsonString);


  // const medicineList = await MedicineCollection.find();
  // console.log(medicineList)
  // const filteredMedicines = medicineList.map(medicine => ({
  //   name: medicine.name,
  //   dosage: medicine.dosage,
  //   manufacturer: medicine.manufacturer,
  // }));

  // const jsonString = JSON.stringify(filteredMedicines, null, 2);
  // res.set('Content-Type', 'application/json');
  // res.send(jsonString);
  //res.status(201).render('home')
    //const medicines = await MedicineCollection.find();
  //   console.log('printing')
  //   // Create a new array with only the desired attributes
  // const filteredMedicines = medicines.map(medicine => ({
  //   name: medicine.name,
  //   dosage: medicine.dosage,
  //   manufacturer: medicine.manufacturer,
  // }));

  // const jsonString = JSON.stringify(filteredMedicines, null, 2);

  // res.set('Content-Type', 'application/json');
  // res.send(jsonString);
  //res.render('delete_med')
    //res.render('showmed', { medicines });
})

// app.post('/signup', async (req, res) => {

//     try {
//         const { name, password } = req.body;
//         const medAdded = new LogInCollection({ name, password });
//         await medAdded.save();

//         const Users = await LogInCollection.find();
//         const filteredUsers = Users.map(user => ({
//           name: user.name
//         }));

//         const jsonString = JSON.stringify(filteredUsers, null, 2);

//         res.set('Content-Type', 'application/json');
//         res.status(201).send(jsonString);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
//     res.status(201).render("home", { naming: req.body.name})
// })


app.post('/login', async (req, res) => {
    console.log('asdasd')
    try {
        console.log('orre')
        const check = await LogInCollection.findOne({ name: req.body.name })
        console.log(check.body)
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

const fs = require('fs');
const html = fs.readFileSync('./views/dashboard_view_stock.hbs', 'utf-8')
let medicineListHtml = fs.readFileSync('./views/product_list.hbs', 'utf-8');

const medicines = MedicineCollection.find({}).project({ _id: 0 });
//console.log(medicines)

async function replaceHtml(template, medicine){
    let output = template.replace('{{%ID%}}', medicine.medicine_id);
    output = output.replace('{{%NAME%}}', medicine.medicine_name);
    output = output.replace('{{%MODELNAME%}}', medicine.generic_name);
    output = output.replace('{{%SIZE%}}', medicine.quantity);
    //console.log(output)
    return output;
}

// let productHtmlArray = medicines.map((medicine) => {
//     let output = medicineListHtml.replace('{{%ID%}}', medicine.medicine_id);
//     output = output.replace('{{%NAME%}}', medicine.medicine_name);
//     output = output.replace('{{%MODELNAME%}}', medicine.generic_name);
//     output = output.replace('{{%SIZE%}}', medicine.quantity);
    
//     return output;
// })
// productHtmlArray = productHtmlArray.toArray();


app.get('/dashboard_products', async (req, res) => {
  res.render('dashboard_products')
})


// app.get('/demo', async (req, res) => {
//   res.render('demo')
// })

app.get('/dashboard_view_stock', async (req, res) => {
  try {
    //const medicines = await MedicineCollection.find();
    const medicines = await MedicineCollection.find({}).project({ _id: 0 });
    //const medicines = await MedicineCollection.find({}, { medicine_id: 1, medicine_name: 1, generic_name: 1, quantity: 1 }).sort({ createdAt: -1 });
    let productHtmlArray = await medicines.map((product) => {
      //console.log(product)
        return replaceHtml(medicineListHtml, product);
    })
    //console.log(productHtmlArray)
    let productResponseHtml = html.replace('{{%CONTENT%}}', (await productHtmlArray.toArray()).join(' '));
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(productResponseHtml);
    //const documents = await medicines.toArray();
    //console.log(medicines);
    // res.header('Content-Type', 'application/json');
    // res.send(medicines);
    //res.send(medicines);
    // res.render('dashboard_view_stock', { documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/home', async (req, res) => {
  res.render('home')
})

app.post('/home', async (req, res) => {

    try {
        const { name, dosage, manufacturer } = req.body;
        // const newUser = new MedicineCollection({ name, dosage, manufacturer });
        // await newUser.save();
        insertMedicine({ name, dosage, manufacturer });
        res.render('show_med_list');
        //console.log("oioi")
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/delete_page', async (req, res) => {
  res.render('delete_page')
})


app.delete('/delete_page/:name', async (req, res) => {
  const entryName = req.params.name;
  console.log(entryName)

  try {
    const result = await MedicineCollection.deleteOne({ name: entryName });
    //res.redirect('home');
      //const result = await db.collection(collectionName).deleteOne({ name: entryName });
    if (result.deletedCount === 1) {
        res.json({ success: true, message: 'Entry deleted successfully' });
    } else {
        res.status(404).json({ success: false, message: 'Entry not found' });
    }
  } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/update_entry', async (req, res) => {
  res.render('update_entry')
})


app.put('/update_entry/:oldName', async (req, res) => {
    const oldName = req.params.oldName;
    const { name, dosage, manufacturer } = req.body;
    console.log(oldName)

    try {
        const result = await MedicineCollection.updateOne(
            { name: oldName },
            { $set: { name, dosage, manufacturer } }
        );

        if (result.modifiedCount === 1) {
            res.json({ success: true, message: 'Entry updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Entry not found' });
        }
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
        await client.close();
    }
});



app.listen(port, () => {
    console.log('port connected');
})