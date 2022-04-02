const Pet = require("../models/pet.model");

//test function to check routes
module.exports.index = (req, res) =>{
    res.json({message: "Hello Dojo!"});
}
module.exports.getAllPets = (req,res) => {
    Pet.find({}).sort({petType: 1})
        .then(allPets => res.json({results: allPets}))
        .catch(err =>res.status(400).json({message: "Couldn't get all Pets!", err}));
}
module.exports.createPet= (req,res) => {
    Pet.create(req.body)
    .then(newPet =>res.json({results: newPet}))
    .catch(err=>res.status(400).json({message: "Couldn't create the Pet!", err}));
}
module.exports.getOnePet = (req, res) => {
    Pet.findOne({_id: req.params.id})
        .then(onePet => res.json({results: onePet}))
        .catch(err =>res.status(400).json({message: "Couldn't get the Pet!", err}));
}
module.exports.updatePet = (req, res) => {
    Pet.updateOne({_id:req.params.id}, req.body, {runValidators: true})
    .then(updatedPet => res.json({results: updatedPet}))
        .catch(err =>res.status(400).json({message: "Couldn't update the Pet!", err}));
}
module.exports.deletePet = (req, res) => {
    Pet.deleteOne({_id: req.params.id})
        .then(deletedPet => res.json({results: deletedPet}))
        .catch(err =>res.status(400).json({message: "Couldn't delete the Pet!", err}));
}