const fastify = require('fastify');
const mongoose = require('mongoose');
const app = fastify();

const mongo_url = 'mongodb://localhost:27017/webdev19';

app.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs')
    }
})

app.get('/', (req, res) => {
    res.send("HELLO WORLD");
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