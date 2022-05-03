import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    class: String,
    name: {type: String, default: 'Nincs Megadva'},
    registered: {type: Date, default: Date.now},
    pictureID: {type: Number, default: 0},
    points: {type: Number, default: 0},
})

const User = mongoose.model('User', userSchema)

export default User