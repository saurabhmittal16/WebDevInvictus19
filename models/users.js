const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        validate : {
            validator : function (email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(email)
            }
        },
        minlength : 1,
        unique : true,
        
    },
    phone :{
        type: String,
        validate: {
            validator: function(v) {
                return /[6-9][0-9]{9}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    },
    college : {
        type : String,
        required : true,
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);