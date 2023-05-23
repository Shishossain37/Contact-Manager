// const mongoose = require('mongoose')
// const userSchema = mongoose.Schema({

//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },

//     password: {
//         type: String,
//         required: true
//     },

// }, {
//     timesTamps: true
// })
// module.exports = mongoose.model("User", userSchema)









const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timesTamp: true
})

module.exports = mongoose.model("User", userSchema)