const mongoose = require('mongoose');
const { model, Schema  } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', 'female', 'others'].includes(value)) {
                throw new Error('Gender data is not valid');
            }
        }
    },
    photoUrl: {
        type: String,
        default: 'https://hostalitecloud.com/crb/wp-content/uploads/2025/10/dummy-user-male.jpg',
    },
    about: {
        type: String,
        default: 'This is a default about of the user',
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

module.exports = model('User', userSchema);