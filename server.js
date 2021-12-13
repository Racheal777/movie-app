//Requiring modules
const express = require('express')
const PORT = process.env.PORT || 4060


const app = express()

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


// app.redirect('/login', (req,res) => {
//     res.redirect('/')
// })





app.listen(PORT, () => console.log(`server connected at ${PORT}`))
