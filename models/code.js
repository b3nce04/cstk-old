import mongoose from 'mongoose'

const codeSchema = new mongoose.Schema({
    code: {type: String, maxLength: 8}
})

const Code = mongoose.model('Code', codeSchema)

export default Code