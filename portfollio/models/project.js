const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    }
});

module.exports = model('Project',projectSchema) 