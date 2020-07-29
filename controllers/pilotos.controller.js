const Boom = require('@hapi/boom');

module.exports = {

    create: async (request, h) => {
        const pool = request.mysql.pool;

        try {
            
                await pool.query('insert into pilotos set ?', request.payload);
                return h.response({message: 'PILOTO CRIADO!'}).code(201);

        } catch (error) {
            throw Boom.badRequest(error);       
        
        }
    
    },
    findAll: async (request, h) => {
        const pool = request.mysql.pool;
        try {
            const [rows, fields] = await pool.query('select * from pilotos order by nome');
            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('NÃO ENCOTRADO!');
            }
            return h.response(rows).code(200);
        } catch (error) {
            throw Boom.badRequest(error);
        }
    },

    update: async (request, h) => {
        const pool = request.mysql.pool;

        const id = request.params.id;

        try {
            const [rows, fields] = await pool.query('select * from pilotos where id = ?', id);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('PILOTO NÃO ENCOTRADO!');
            }
            
            await pool.query('update pilotos set ? where id = ?', [request.payload, id]);

            return h.response({message: 'PILOTO ATUALIZADO COM SUCESSO!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    },

    delete: async (request, h) => {
        const pool = request.mysql.pool;

        const id = request.params.id;

        try {
            const [rows, fields] = await pool.query('select * from pilotos where id = ?', id);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('PILOTO NÃO ENCOTRADO!');
            }
            
            await pool.query('delete from pilotos where id = ?',  id);

            return h.response({message: 'PILOTO DELETADO COM SUCESSO!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    }
}