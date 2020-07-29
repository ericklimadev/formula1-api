const Joi = require('@hapi/joi');
const ClassificacaoGPController = require ('../controllers/classificacaogp.controller');





module.exports = [
    {
        method: 'GET',
        path: '/classificacaogp/{id_gp}',
        options: {
            handler: ClassificacaoGPController.findAll, 
            description: 'CLASSIFICAÇÃO DO GP',
            tags: ['api'],
            validate: {
                params:{
                    id_gp: Joi.number().required()
                },

               failAction: (request, h, error) => {
                    throw error;
                }
            }


        }
    },
]