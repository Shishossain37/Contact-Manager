// const mongoose = require('mongoose')
// const objectId = mongoose.Schema.Types.ObjectId

// const contactSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Please give a name"]
//     },
//     email: {
//         type: String,
//         required: [true, "Please give a email"]
//     },
//     phone: {
//         type: Number,
//         required: [true, "Please give a number"]
//     },
//     user_id: {
//         type: objectId,
//         required: true,
//         ref: "User",
//     }

// }, {
//     timesTamps: true
// })
// module.exports = mongoose.model("Contact", contactSchema)



const mongoose = require('mongoose')
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timesTamp: true
})
module.exports = mongoose.model("Contact", contactSchema)