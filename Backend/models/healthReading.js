const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
    heartrate: {
        type: Number,
        required: true,
    },
    bloodpressure: {
        type: String,
        required: true,
    },
    oxygensaturation: {
        type: Number,
        required: true,
    },
    sleepquality: {
        type: String,
        required: true,
    },
    steps: {
        type: Number,
        required: true,
    },
    metabolism: {
        type: String,
        required: true,
    },
    stresslevel: {
        type: String,
        required: true,
    },
    focus: {
        type: String,
        required: true,
    },
    mindfulness: {
        type: String,
        required: true, 
    },
    vatta: {
        type: String,
        required: true,
    },
    pitta: {
        type: String,
        required: true,
    },
    kapha: {
        type: String,
        required: true,
    }
});

const healthreading = mongoose.model("healthreading", healthSchema);

module.exports = healthreading;
