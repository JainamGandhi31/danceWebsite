const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');  //this is needed if you want to use Express to save your data into database
const app = express();
const path = require('path');
const port = 8000;

//Mongoose Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
//contactDance will be the name of our database.

//Defining Mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    gender: String,
    address: String,
    concern: String,
  });

  //making mongoose model from schema
  const Contact = mongoose.model('Contact', ContactSchema);
//here the name of the collection would be 'contacts' because it will take plural form of the first argument.


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//if user clicks on home then he will be redirected to home page.
app.get('/',(req,res)=>{
    
    res.status(200).render('home.pug');
})

//if user clicks on contact then he will be redirected to home page.
app.get('/contact',(req,res)=>{

    res.status(200).render('contact.pug');
})


//Post request from the contact-form if you want to save in the file
// app.post('/contact',(req,res)=>{

//     let form = req.body;
// let ClientDetails = `Name of client:-\n${form.name}\n\nContact no. of client:-\n${form.phone}\n\nemail of client:-\n${form.email}\n\nClient's Age:\n${form.age}\n\nClient's gender:\n${form.gender}\n\nAddress of client:-\n${form.address}\n\nConcern:\n${form.concern}\n\n` 
//     fs.writeFileSync('output.txt',ClientDetails);
//     const param = {
//         'message' : "Your form has been submitted successfully.",
//     }

//     res.status(200).render('contact.pug',param);
// })

app.post('/contact',(req,res)=>{
    //I have commented the below line because I have used the alert() of Javascript.
    // const param = {
    //             'message' : "Your form has been submitted successfully to database."}


    let clientdata = new Contact(req.body);

clientdata.save().then(()=>{
  
//I have commented the below line because I have used the alert() of Javascript.
    // res.status(200).render('contact.pug',param); 
    
    res.status(200).render('contact.pug');
}).catch(()=>{
    res.status(404).send("Item was not saved to the database");
})
//here if there is no error then the code inside then() will run and if any error occurs then the code inside catch() will run.

})


app.listen(port, ()=>{
    console.log(`Application is running at port ${port}`);
})