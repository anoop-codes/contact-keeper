const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        trim: true
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'), { expiresIn: 360000 });
}

const User = mongoose.model('User', userSchema);


function validateUser(data) {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    })

    return schema.validate(data);
}

exports.User = User;
exports.validateUser = validateUser;