const express = require('express')
const router = express.Router()
const Contact = require('../model/contactModel')
const requireLogin = require("../middleware/requireLogin")


router.get('/contact', requireLogin, async (req, res) => {
    await Contact.find({ user_id: req.user._id }).then((contacts) => {
        res.status(201).json(contacts)
    }).catch(err => console.log(err))
})

router.get('/contact/:id', requireLogin, async (req, res) => {
    Contact.findById(req.params.id).then((user) => {
        if (!user) {
            res.status(402).json({ error: "Not found" })
        } else {
            res.status(202).json({ user })
        }
    }).catch((err) => { console.log(err); })
})
router.post('/create', requireLogin, async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(402).json({ error: "Please fill all the fields" })
    } else {
        // const contact = await Contact.create({
        //     name, email, phone, user_id: req.user._id
        // })
        // res.status(201).json({ message: "Contact created Successfully", contact })

        await Contact.create().then(() => {
            const contact = new Contact({
                name, email, phone, user_id: req.user._id
            })
            contact.save().then(() => {
                res.status(201).json({ message: "Contact created Successfully", contact })
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
})
router.put('/contact/:id', requireLogin, async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(402).json({ error: "Not found" })
    }
    if (contact.user_id.toString() !== req.user._id) {
        res.status(402).json({ error: "User don't have permission to update this contact" })
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(202).json({ message: "Contact is updated", updatedContact })

})
router.delete('/contact/:id', requireLogin, async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(402).json({ error: "Not found" })
    }
    if (contact.user_id.toString() !== req.user._id) {
        res.status(402).json({ error: "User don't have permission to delete this contact" })
    }
    const updatedContact = await Contact.findByIdAndDelete(req.params.id)
    res.status(202).json({ message: "Contact is Deleted", updatedContact })

})


module.exports = router