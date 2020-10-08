const express = require("express")
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const Pusher = require('pusher');

const Vote = require("../models/Model");

const pusher = new Pusher({
    appId: '987422',
    key: '48e85979e8fd1563cbed',
    secret: '054457c708f5bee2282f',
    cluster: 'eu',
    encrypted: true
  });

router.get("/" , (req,res) => res.sendFile(path.join(__dirname,"../public","index.html")))
router.get("/statistika" , (req,res) => res.sendFile(path.join(__dirname,"../public","statistika.html")))
router.get("/panel", (req,res) => res.sendFile(path.join(__dirname,"../public","panel.html")))

router.get("/files", (req,res) => {
  Vote.find({}).then(votes => {
    
   
    res.json({votes:votes});
  })
  
  
  
})

router.post("/add", (req,res) => {
  let {os} = req.body;  

  let newVote = new Vote({
    os,
    points:1
  })
  
  newVote.save()
  .then((vote,req,res) => {
    console.log(vote)  
    
    
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    })
    

    

  });
   
    return res.json({success:true,message: "Thank you for voting"});
    
    
  
  });

module.exports = router;