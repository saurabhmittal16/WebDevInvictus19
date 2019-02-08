const fastify = require('fastify');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/users')
const app = fastify();

app.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
});
  
const mongo_url = 'mongodb://localhost:27017/webdev19';

app.post('/user', (req, res) => {
    const user = new User ({
        email : req.body.email,
        phone : req.body.phone,
        college : req.body.college,
        name: req.body.name
    })
    user.save().then(() => {
        res.send('Successfull');
    },(e) => {
        res.status(400).send(e)
    })
    // const user = {
    //     email : req.body.email,
    //     phone : req.body.phone,
    //     college : req.body.college
    // }
    // User.create(user, (err) => {
    //     if(err) {
    //         res.send('Error')
    //     }
    // })

})

app.get('*', (req, res) => {
    res.sendFile('index.html');
});

mongoose.connect(mongo_url, {useNewUrlParser: true})
    .then(
        () => {
            console.log("Connected to DB")
            app.listen(8000, '0.0.0.0', function(err, address) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                console.log(`Server listening on ${address}`);
            });
        }
    )
    .catch(err => console.log(err.message));