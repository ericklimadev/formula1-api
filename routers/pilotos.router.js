const Joi = require('@hapi/joi');
const PilotosController = require ('../controllers/pilotos.controller');

const pilotoValid = {
    id: Joi.number().required(),
    nome: Joi.string().required(),
    equipe: Joi.string().required(),
    nacionalidade: Joi.string().required(),
}


module.exports = [

    {
        method: 'POST',
        path: '/pilotos',
        options: {
            handler: PilotosController.create,
            description: 'ADICIONAR UM PILOTO',
            tags: ['api'],
            validate: {
                payload: pilotoValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/pilotos',
        options: {
            handler: PilotosController.findAll, 
            description: 'LISTA DE PILOTOS',
            tags: ['api']

        }
    },
    
    {
        method: 'PUT',
        path: '/pilotos/{id}',
        options: {
            handler: PilotosController.update,
            description: 'ATUALIZAR UM PILOTO',
            tags: ['api'],
            validate: {
                params:{
                    id: Joi.number().required()
                },

                payload: pilotoValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },

    {
        method: 'DELETE',
        path: '/pilotos/{id}',
        options: {
            handler: PilotosController.delete,
            description: 'DELETAR UM PILOTO',
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