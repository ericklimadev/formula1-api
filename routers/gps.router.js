const Joi = require('@hapi/joi');
const GpsController = require ('../controllers/gps.controller');

const gpValid = {
    id: Joi.number().required(),
    nome: Joi.string().required(),
    circuito: Joi.string().required(),
    data_gp: Joi.date().required(),
    hora_gp: Joi.string().required(),

}


module.exports = [

    {
        method: 'POST',
        path: '/gps',
        options: {
            handler: GpsController.create,
            description: 'ADICIONAR UM GP',
            tags: ['api'],
            validate: {
                payload: gpValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/gps',
        options: {
            handler: GpsController.findAll, 
            description: 'LISTA DE GPS',
            tags: ['api']

        }
    },
    
    {
        method: 'PUT',
        path: '/gps/{id}',
        options: {
            handler: GpsController.update,
            description: 'ATUALIZAR UM GP',
            tags: ['api'],
            validate: {
                params:{
                    id: Joi.number().required()
                },

                payload: gpValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },

    {
        method: 'DELETE',
        path: '/gps/{id}',
        options: {
            handler: GpsController.delete,
            description: 'DELETAR UM GP',
            tags: ['api'],
            validate: {
                params:{
                    id: Joi.number().required()
                },
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
]