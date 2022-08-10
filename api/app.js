const express = require('express');

const app = express();

const mongoose = require('mongoose');

const postRoutes = require ('./routes/post.js')
const userRoutes = require ('./routes/user')

// 'mongodb+srv://P_7:sRPNiKBZzSVYpJVm@cluster0.e4tgk.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://P_7:sRPNiKBZzSVYpJVm@cluster0.e4tgk.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api/post', postRoutes)
app.use('/api/auth', userRoutes)


module.exports = app;