import express from 'express';
import TestSchema from "../../models/Test.js";
import mongoose from 'mongoose';

const router = express.Router();

router.get('/test', (req, res) => {
    const Name = mongoose.model('Test', TestSchema);
    Name.find()
    .then(names => res.json(names))
    .catch(err => res.status(404).json({nonamesfound: 'No names found', error:err}))
})

router.post('/test', (req, res) => {
    const Name = mongoose.model('Test', TestSchema)
    Name.create(req.body)
    .then(book => res.json({ msg: 'Name added', name:book}))
    .catch(err => res.status(400).json({ error: err}))
})

export default router;