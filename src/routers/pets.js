const express = require('express');
const router = express.Router();
const { getAllPets, createPet, updatePet, deletePet} = require("../domain/petsRepository");

router.get('/', async (req, res) => {
    const allPets = await getAllPets(req.query)

    res.status(200).json({
        pets: allPets.rows
    })
});

router.post('/', async (req, res) => {
    const newPet = await createPet(req.body)

    res.status(201).json({
        pet: newPet.rows[0]
    })
});

router.get('/:id', async (req, res) => {
    const petByID = await getAllPets(req.params)

    res.status(200).json({
        pet: petByID.rows[0]
    })
});

router.put('/:id', async (req, res) => {
    const queryData = await updatePet(req.body, req.params)

    res.status(201).json({
        pet: queryData.rows[0]
    })
});

router.delete('/:id', async (req, res) => {
    const queryData = await deletePet(req.params);
    
    res.status(201).json({
        pet: queryData.rows[0]
    })
});

module.exports = router
