const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Languages = require('./languages');
const Instruments = require('./instruments')

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: true,
        min: 6,
        max: 14
    },
    roles: [{ 
        type: String, 
        enum: [ 'candidate', 'teacher', 'student', 'admin' ]
    }],
    profilePictureUrl: String,
    linkedin: String,
    spotify: String,
    itunes : String,
    soundcloud: String,
    description: String,
    workExperience: String,
    links: [ String ],
    youtubeVideos: [ String ],
    awards: [ String ],
    references: [ String ],
    interest: [{ type: String, enum: Instruments }],
    playedInstruments: [{ type: String, enum: Instruments }],
    languages: [{ type: String, enum: Languages, required: true }],
    classes: [{ type : Schema.Types.ObjectId, ref : 'Classroom' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;