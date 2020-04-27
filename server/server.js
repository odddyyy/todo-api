require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const moongose = require('mongoose')
const routes = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

//middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended : true }))

//database connection
moongose.connect(process.env.DB_CONNECT, {useNewUrlParser: true,
useUnifiedTopology: true}, (err) => {
    if (!err) console.log('database connected')
})

//routes
app.use('/', routes)
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))