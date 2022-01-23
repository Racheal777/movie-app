//Requiring modules
const express = require('express')
const connection = require('./db')
const PORT = process.env.PORT || 4060


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//requiring static files


// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile('/views/login.html', {root: __dirname})
})

app.get('/movies', (req,res) => {
    res.sendFile('/views/index.html', {root: __dirname})
})

app.get('/signup', (req,res) => {
    res.sendFile('/views/signup.html', {root: __dirname})
})

app.get('/success', (req,res) => {
    res.sendFile('/views/success.html', {root: __dirname})
})

//post request
app.post('/signup', async (req,res) =>{
    
        var fname    = req.body.fname;
        var lname     = req.body.lname;
        var email        = req.body.email;
        var username     = req.body.username;
        var Pass         = req.body.password;
        
        var data = {
            "fname": fname,
            "lname" : lname,
            "email"    :  email,
            "username"  : username,
            "password"  : Pass,
            
         }
    const db = await connection.getConnection("Cinema")

    db.collection('Users').insertOne(data, (err,results) =>{
        if(err) throw err
        if(results) res.redirect('/success')
        console.log(data)
        console.log("Account created successfully")
   
        
    })
    // return res.redirect('success.html');

})

//login post/find request

app.post('/login', async (req,res) => {

    
    const db = await connection.getConnection("Cinema")
    const username = req.body.username
    const password = req.body.password

   db.collection('Users').findOne({"username":username, "password":password}, (err,results) =>{
        if(err)  throw err
        if(results) res.send(username)
        console.log(results) 
        
     
    })
})



connection.dbConnection().then(() =>{
    app.listen(PORT, () => console.log(`server connected at ${PORT}`))
})

