const fastify = require('fastify');
const mongoose = require('mongoose');
const path = require('path');
const app = fastify();

app.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
});
  
const mongo_url = 'mongodb://localhost:27017/webdev19';


app.get('/', (req, res) => {
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