const PetController = require("../controllers/pet.controller");

module.exports = app =>{
    app.get("/check/index", PetController.index);
    app.get("/api/pets/getAll", PetController.getAllPets);
    app.post("/api/pets/new", PetController.createPet);
    app.get("/api/pets/:id", PetController.getOnePet);
    app.patch("/api/pets/:id/update", PetController.updatePet);
    app.delete("/api/pets/:id/delete", PetController.deletePet);
}