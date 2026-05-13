const mongoose = require('mongoose');

const Urlschema = new mongoose.Schema({

    originalUrl: {
        type: String,
        required: true,
        unique: true
    },

    shortCode: {
        type: String,
        required: true,
        unique: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register"
    },
    
    clicks:{
   type:Number,
   default:0
}
}, { timestamps: true });

const URL = mongoose.model('URL', Urlschema);

module.exports = URL;