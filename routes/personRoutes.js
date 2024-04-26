const express = require('express');
const router = express.Router();

// connection
const Person = require("../models/Person");


router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const savedPerson = await newPerson.save();
      console.log("data saved", savedPerson);
      res.status(200).json(savedPerson);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("Data fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  
  // parameterised api
  router.get('/:worktype', async(req,res) => {
    try {
      const worktype = req.params.worktype; // Extract the worktype from the url parameter
      if(worktype === 'chef' || worktype === 'manager' || worktype === 'waiter'){
        const response = await Person.find({work: worktype});
        console.log('reponse fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error: "Invalid worktype"})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  })


  // update
  router.put('/:id',async (req,res)=>{
    try {
      const personId = req.params.id;
      const updatedPersonData = req.body;
      const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new: true,
        runValidators:true
      })
      if(!response){
        return res.status(404).json({error: 'Person not found'})
      }
      console.log("Data updated");
      res.status(200).json(response)
    } catch (error) {
      console.log("error");
      res.status(500).json({error: 'Internal server error'})
    }
  })

  // delete api
  // router.delete('/:id',async (req,res)=>{
  //   try {
  //     const personId = req.params.id;
  //     const response = await Person.findByIdAndRemove(personId);
  //     if(!response){
  //       return res.status(404).json({error: 'Person not found'})
  //     }
  //     console.log("Data removed");
  //     res.status(200).json(response)
  //   } catch (error) {
  //     console.log("error");
  //     res.status(500).json({error: 'Internal server error'})
  //   }
  // })

  router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const response = await Person.findByIdAndDelete(personId);
      if (!response) {
        return res.status(404).json({ error: 'Person not found' });
      }
      console.log("Data removed:", response);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error during person deletion:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


  module.exports = router;  