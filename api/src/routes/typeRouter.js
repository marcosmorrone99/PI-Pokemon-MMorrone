const { Router } = require('express');
const {getType} = require('./controllers');

const typeRouter = Router()

typeRouter.get('/', async (req, res) => {
    try {
        const types = await getType()

        return res.status(200).json(types)
    } catch (error) {
        return res.status(404).send({message: 'No se encuentran tipos'})
    }
})



module.exports = typeRouter;

