const express = require('express');
const { nextTick } = require('process');
const app = express();

const herbRoute = express.Router();
let Herb = require("../model/herb");

//add herb
herbRoute.route('/add-herb').post((req, res, nexxt) => {
    Herb.create(req.body, (error, data) =>{
        if(error){
            return next(error);
        }else{
            res.join(data);
        }
    })
})

//get all herb
herbRoute.route('/').get((req, res) => {
    Herb.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.join(data);
        }
    })
})

//get one herb
herbRoute.route('/herb-data/:id').get((req, res) => {
    Herb.findById(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.join(data);
        }
    })
})

//update herb
herbRoute.route('/herb-update/:id').put((req, res, next) => {
    Herb.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error){
            return next(error);
            console.log(error);
        }else{
            res.join(data);
            console.log("update complete");
        }
    })
})

//del one herb
herbRoute.route('/herb-delete/:id').get((req, res, next) => {
    Herb.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            });
        }
    })
})
