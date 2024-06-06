const mongoose = require('mongoose')
require('dotenv').config()
const username = process.env.USERR
const password = process.env.PASSWORD
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.hbh3oen.mongodb.net/docalgo`)

const requestSchema = mongoose.Schema({
        timestamp: String,
        url: String,
        referrer: String,
        userAgent: String,
        ip: String,
        language: String,
        screenResolution: String,
        viewportSize: String,
        timezone: String,
        platform: String
})
const Request = mongoose.model('request', requestSchema);
module.exports = {
    Request
}
