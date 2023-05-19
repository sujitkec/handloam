const express = require('express');
const {upload} = require('./utils');
const Sample = require('../model/sample')
const fs = require('fs')
const path = require('path')

const router = express.Router();

router.post("/image", (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).send("Something went wrong!");
        }
        const existing_sample = await Sample.findOne({title: req.body.title});
        if (existing_sample)
            return res.send({msg: "Sample Already exist"});
        const newsample = new Sample({
            title: req.body.title,
            imageUrl: req.file.filename
        })
        await newsample.save();
        console.log(newsample)
        res.send(req.file);
    });
});

router.get("/getsamples", async (req, res) => {
    const samples = await Sample.find({});
    if (samples.length == 0)
        res.send("no samples found")
    res.send(samples);
})

router.get("/select-img/:id", async (req, res) => {
    const sample = await Sample.findById(req.params.id);
    const crrpath = path.dirname(process.mainModule.filename);
    fs.copyFile(`${crrpath}/uploads/${sample.imageUrl}`, `${crrpath}/uploads/sample.jpg`, err => {
        if (err)
            res.send(err);
        res.send("onboarded sucessfully")
    });
})

router.get("/getonboard", (req, res) => {
    const crrpath = path.dirname(process.mainModule.filename);
    res.sendFile(`${crrpath}/uploads/onboard.jpg`)
})

module.exports = router
