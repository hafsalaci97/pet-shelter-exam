const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PetSchema = new mongoose.Schema({
    //let's add some mongoose schema validations based on the mongoose doc. I will add also the timestamps.
    petName: {
        type: String,
        required: [true, "Pet Name is mandatory!"],
        minLength: [3, "The Name of the Pet can't be less than 3 characters!"],
        unique: true
    },
    petType: {
        type: String,
        required: [true, "Pet Type is mandatory!"],
        minLength: [3, "Pet Type can't be less than 3 characters!"]
    },
    petDescription: {
        type: String,
        required: [true, "Pet Description is mandatory!"],
        minLength: [3, "The Description can't be less than 3 characters!"]
    },
    skill1: {
        type: String,
        default: ""
    },
    skill2: {
        type: String,
        default: ""
    },
    skill3: {
        type: String,
        default: ""
    },
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

PetSchema.plugin(uniqueValidator);

const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;