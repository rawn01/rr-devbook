const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String
    },
    skills: {
        type: [String]
    },
    bio: {
        type: String
    },
    github: {
        type: String
    },
    createdAt: {
        type: String,
        default: Date.now
    } 
});

const ProfileModel = mongoose.model("profile", profileSchema);

module.exports = ProfileModel;


// ref -> reference to collection 'user'