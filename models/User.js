const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    googleID:{
        type: String,
        required: true,
        default: null
    },
    firstName:{
        type: String,
        required: true,
        default: null
    },
    lastName: {
        type: String,
        required: true,
        default: null
    },
    avatar:{
        type: String,
        required: true,
        default: 'https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg'
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
});

module.exports = mongoose.model('User', userSchema);