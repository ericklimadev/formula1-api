const Joi = require('@hapi/joi');
const ResultadosController = require ('../controllers/resultados.controller');

const resultadoValid = {
    id_gp: Joi.number().required(),
    id_piloto: Joi.number().required(),
    posicao: Joi.number().required(),
    estado: Joi.string().required(),
    tempo: Joi.string().required(),
    pontos: Joi.string().required(),
}



module.exports = [

    {
        method: 'POST',
        path: '/resultados',
        options: {
            handler: ResultadosController.create,
            description: 'ADICIONAR UM RESULTADO',
            tags: ['api'],
            validate: {
                payload: resultadoValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/resultados',
        options: {
            handler: ResultadosController.findAll, 
            description: 'LISTA DE RESULTADOS',
            tags: ['api']

        }
    },
    {
        method: 'PUT',
        path: '/resultados/{id_gp}/{id_piloto}',
        options: {
            handler: ResultadosController.update,
            description: 'ATUALIZAR UM RESULTADO',
            tags: ['api'],
            validate: {
                params:{
                    id_gp: Joi.number().required(),
                    id_piloto: Joi.number().required(),
                },

                payload: resultadoValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },

    {
        method: 'DELETE',
        path: '/resultados/{id_gp}/{id_piloto}',
        options: {
            handler: ResultadosController.delete,
            description: 'DELETAR UM RESULTADO',
            tags: ['api'],
            validate: {
                params:{
                    id_gp: Joi.number().required(),
                    id_piloto: Joi.number().required()
                },
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
]