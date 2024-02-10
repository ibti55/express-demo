const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/admin")
.then(()=>{
    console.log('mongoose admin connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection

















// const mongoose = require('mongoose');

// const databaseURI = "mongodb://localhost:27017/admin"; // Update with your MongoDB URI

// // Create separate connection instances for each collection
// const logincon = mongoose.createConnection(`${databaseURI}/Customer`, { useNewUrlParser: true, useUnifiedTopology: true });
// const Medicinecon = mongoose.createConnection(`${databaseURI}/Medicine`, { useNewUrlParser: true, useUnifiedTopology: true });



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
  
//   // Schema for the MedicineCollection
//   const medicineSchema = new mongoose.Schema({
//     // Define the schema fields for the Medicine collection
//     name: {
//       type: String,
//       required: true
//     },
//     dosage: {
//       type: String,
//       required: true
//     },
//     manufacturer: {
//       type: String,
//       required: true
//     }
//   });





// const LogInCollection = logincon.model('LogInCollection', logInSchema);

// const MedicineCollection = Medicinecon.model('MedicineCollection', medicineSchema);

// // // Example usage of the models
// // async function exampleUsage() {
// //   const document1 = new Collection1({ /* data for collection1 */ });
// //   await document1.save();

// //   const document2 = new Collection2({ /* data for collection2 */ });
// //   await document2.save();
// // }

// // Event listeners for connections
// logincon.on('connected', () => console.log('Connected to Collection1'));
// Medicinecon.on('connected', () => console.log('Connected to Collection2'));

// // Error event listeners
// logincon.on('error', (err) => console.error('Error in Collection1 connection:', err));
// Medicinecon.on('error', (err) => console.error('Error in Collection2 connection:', err));








// // //ekhane
// // const mongoose = require("mongoose");
// // // Connect to the MongoDB database
// // mongoose.connect("mongodb://localhost:27017/admin")
// //   .then(() => {
// //     console.log('mongoose admin connected');
// //   })
// //   .catch((e) => {
// //     console.log('failed');
// //   });

// // // Schema for the LogInCollection
// // const logInSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   password: {
// //     type: String,
// //     required: true
// //   }
// // });

// // // Model for the LogInCollection
// // const LogInCollection = mongoose.model('LogInCollection', logInSchema);

// // // Schema for the MedicineCollection
// // const medicineSchema = new mongoose.Schema({
// //   // Define the schema fields for the Medicine collection
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   dosage: {
// //     type: String,
// //     required: true
// //   },
// //   manufacturer: {
// //     type: String,
// //     required: true
// //   }
// // });

// // // Model for the MedicineCollection
// // const MedicineCollection = mongoose.model('Medicine', medicineSchema);

// module.exports = { LogInCollection, MedicineCollection };
