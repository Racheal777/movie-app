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

//post request
app.post('/signup', async (req,res) =>{
    
        var FirstName    = req.body.FirstName;
        var LastName     = req.body.LastName;
        var Email        = req.body.Email;
        var Username     = req.body.Username;
        var Pass         = req.body.Password;
        
        var data = {
            "FirstName": FirstName,
            "LastName" : LastName,
            "Email"    :  Email,
            "Username"  : Username,
            "password"  : Pass,
            
         }
    const db = await connection.getConnection("Cinema")

    db.collection('Users').insertOne(data, (err,results) =>{
        if(err) throw err
        if(results) res.send(data) 
        console.log("Account created successfully")
   
        
    })
    // return res.redirect('success.html');

})

app.get('/redirect-path', (req,res) => {
    res.redirect('/')
})


// app.get('/login', (req,res) => {
//     res.set({"Access-control-Allow-Origin": '*'});
//     return res.redirect('index.html')
// })



connection.dbConnection().then(() =>{
    app.listen(PORT, () => console.log(`server connected at ${PORT}`))
})

