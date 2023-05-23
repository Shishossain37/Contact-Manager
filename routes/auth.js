// const express = require('express')
// const mongoose = require('mongoose')
// const router = express.Router()
// const User = require('../model/user')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const validateToken = require('../middleware/validateToken')
// router.post("/register", (req, res) => {
//     const { name, email, password } = req.body;
//     // console.log(req.body);
//     if (!name || !email || !password) {
//         // console.log(name, email, password);
//         return res.status(422).json({ error: "please fill all the filled" });
//     } else {
//         // console.log(req.body);

//         User.findOne({ email: email })
//             .then((savedUser) => {
//                 console.log(savedUser);
//                 if (savedUser) {
//                     return res.status(422).json({ error: "User is already exist" });
//                 } else {
//                     bcrypt
//                         .hash(password, 12)
//                         .then((hassPass) => {
//                             const user = new User({ name, email, password: hassPass });
//                             user
//                                 .save()
//                                 .then((user) => {
//                                     return res.status(200).json({
//                                         name,
//                                         email,
//                                         password,
//                                         message: "Saved successfully",
//                                     });
//                                 })
//                                 .catch((err) => console.log(err));
//                         })
//                         .catch((err) => {
//                             console.log(err);
//                         });
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// });
// router.post('/signin', (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         return res.status(400).json({ error: "Please fill all the fields" })
//     }
//     User.findOne({ email }).then((savedUser) => {
//         if (!savedUser) {
//             return res.status(400).json({ error: "Invalid email or password" })
//         } else {
//             bcrypt.compare(password, savedUser.password).then((doMatch) => {
//                 if (!doMatch) {
//                     return res.status(400).json({ error: "Invalid email or password" })
//                 } else {
//                     const { _id, name, email } = savedUser
//                     const token = jwt.sign({ user: { _id, name, email } }, process.env.JWT_SECRET)

//                     return res.status(200).json({ token, user: { _id, name, email } })

//                 }
//             }).catch(err => console.log(err))
//         }
//     })

// })
// router.get('/current', validateToken, (req, res) => {
//     return res.json(req.user)
// })

// module.exports = router












const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/signup', (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(401).json({ error: "Please fill all the fields" })
    } else {
        User.findOne({ email }).then((savedUser) => {
            if (savedUser) {
                return res.status(401).json({ error: "User is already exist" })
            }
            else {
                bcrypt.hash(password, 12).then((hashPass) => {
                    const user = new User({
                        name, email, password: hashPass
                    })
                    user.save().then(() => {
                        return res.status(401).json({ message: "Signup Successfully", user })
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(402).json({ error: "Please fill all the fields" })
    } else {
        User.findOne({ email }).then((savedUser) => {
            if (!savedUser) {
                res.status(402).json({ error: "Invalid Email or Password" })
            } else {
                bcrypt.compare(password, savedUser.password).then((doMatch) => {
                    if (!doMatch) {
                        res.status(402).json({ error: "Invalid Email or Password" })
                    } else {
                        const { _id, name, email } = savedUser
                        const token = jwt.sign({ user: { _id, name, email } }, process.env.JWT_SECRET)
                        res.status(202).json({ message: "Signin Successfully", token, user: { _id, name, email } })
                    }
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
})
module.exports = router