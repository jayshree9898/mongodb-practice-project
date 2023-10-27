const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: (value) => bcrypt.hashSync(value, 10)
    },
    deleted_at: {
        type: Date,
        required: false
    }
}, {
    timestamps: { created_At: 'create_at', updated_At: 'updated_at' },

    toJSON: {
        getters: true,
        setters: true
    },

    toObJ: {
        getters: true,
        setters: true
    }
});


const users = mongoose.model('users', userSchema);
module.exports = users