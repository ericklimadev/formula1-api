const Joi = require('@hapi/joi');
const ClassificacaoGeralController = require ('../controllers/classificacaogeral.controller');

module.exports = [
    {
        method: 'GET',
        path: '/classificacaogeral/',
        options: {
            handler: ClassificacaoGeralController.findAll, 
            description: 'CLASSIFICAÇÃO GERAL',
            tags: ['api'],

        }
    },
]