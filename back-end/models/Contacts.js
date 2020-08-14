const mongoose = require('mongoose');
const Joi = require('joi');
const { join } = require('lodash');

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['personal', 'professional'],
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);


function validateContact(data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email(),
        phone: Joi.string().min(10).max(10).required(),
        type: Joi.string()
    })

    return schema.validate(data);
}

exports.Contact = Contact;
exports.validateContact = validateContact;