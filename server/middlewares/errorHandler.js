module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.name === 'ValidationError') {
        res.status(400).json('Please complete the required fields')
    }

    if (err.name === 'JsonWebTokenError') {
        res.status(404).json('Empty / invalid token')
    }
    res.status(err.status).json(err.message)
}