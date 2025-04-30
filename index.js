const express = require('express')
const db = require('./backend/db.js')
const app = express()
const port = 3000
const dbConn = new db.DBController();
app.use(express.json());

app.get('/', async (req, res) => {
   try {
      

      if (await dbConn.connect()) {
         res.send({ code: 200, msg: 'Connected' });
      }
      else 
      res.send({ code: 404, msg: 'Failed connect to the database' });
   }
   catch (e) {
      res.send({ code: 404, msg: 'Failed connect to the server' });
   }
})

app.post('/getAllNotes', async (req, res) => {
   try {
      var allNotes = await dbConn.getAllNotes(req.body.email);
      res.send({ code: 200, msg: allNotes });
   }
   catch (e) {
      res.send({ code: 404, msg: [] });
      
   }
})

app.post('/insert', async (req, res) => {
   try {
      await dbConn.insertNote(req.body.title, req.body.text, req.body.color);
      res.send({ code: 200, msg: 'OK' });
   }
   catch (e) {
      res.send({ code: 404, msg: 'Error!' });
      
   }
})

app.delete('/remove', async (req, res) => {
   try {
      await dbConn.deleteNote(req.body.id);
      res.send({ code: 200, msg: 'OK' });
   }
   catch (e) {
      res.send({ code: 404, msg: 'Error!' });
      
   }
})

app.put('/update', async (req, res) => {
   try {
      await dbConn.updateNote(req.body.id, req.body.title, req.body.text);
      res.send({ code: 200, msg: 'OK' });
   }
   catch (e) {
      res.send({ code: 404, msg: 'Error!' });
      
   }
})

app.post('/registerUser', async (req, res) => {
   try {
      let created =  await dbConn.registerUser(req.body.email, req.body.password);

      if(created){
      res.send({ code: 200, msg: 'User created!' });}

      else res.send({ code: 404, msg: 'User already exist' });
   }
   catch (e) {
      res.send({ code: 404, msg: 'Error!' });
      
   }
})

app.post('/login', async (req, res) => {
   try {
      let created =  await dbConn.authenticateUser(req.body.email, req.body.password);

      if(created){
      res.send({ code: 200, msg: 'OK' });}

      else res.send({ code: 404, msg: 'Invalid credentials!' });
   }
   catch (e) {
      res.send({ code: 404, msg: 'Error!' });
      
   }
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})