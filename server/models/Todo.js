const moongose = require('mongoose')
const Schema = moongose.Schema

const TodoSchema = new Schema({
    title: { type: String, required: [true, 'please insert title'] },
    description: { type: String, required: [true, 'please insert description'] },
    status: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() },
    userId: { type: String }
})

module.exports = moongose.model('Todos', TodoSchema)