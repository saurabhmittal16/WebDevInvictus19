const fastify = require('fastify');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/users')
const app = fastify();

const setPassword = '1234';

app.register(require('fastify-formbody'))
app.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
});
  
const mongo_url = 'mongodb://localhost:27017/webdev19';

app.post('/user', (req, res) => {
    console.log(req.body);
    const user = new User ({
        email : req.body.email,
        phone : req.body.phone,
        college : req.body.college,
        name: req.body.name
    })
    user.save().then(() => {
        console.log("Successful");
        res.redirect('/');
    },(e) => {
        res.status(400).send(e)
    })
    
});

app.get('/user', async (req,res) => {
    const password = req.query.password;
    if (password === setPassword) {
        const users = await User.find({})
        res.send(users)
    } else {
        res.redirect('/');
    }
})

app.get('*', (req, res) => {
    res.sendFile('index.html');
});

mongoose.connect(mongo_url, {useNewUrlParser: true})
    .then(
        () => {
            console.log("Connected to DB")
            app.listen(8000 || process.env.PORT, '0.0.0.0', function(err, address) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                console.log(`Server listening on ${address}`);
            });
        }
    )
    .catch(err => console.log(err.message));