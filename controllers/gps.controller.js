const Boom = require('@hapi/boom');

module.exports = {

    create: async (request, h) => {
        const pool = request.mysql.pool;

        try {
            
                await pool.query('insert into gps set ?', request.payload);
                return h.response({message: 'GP CRIADO!'}).code(201);

        } catch (error) {
            throw Boom.badRequest(error);       
        
        }
    
    },
    findAll: async (request, h) => {
        const pool = request.mysql.pool;
        try {
            const [rows, fields] = await pool.query('select * from gps order by id');
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
            const [rows, fields] = await pool.query('select * from gps where id = ?', id);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('GP NÃO ENCOTRADO!');
            }
            
            await pool.query('update gps set ? where id = ?', [request.payload, id]);

            return h.response({message: 'GP ATUALIZADO COM SUCESSO!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    },

    delete: async (request, h) => {
        const pool = request.mysql.pool;

        const id = request.params.id;

        try {
            const [rows, fields] = await pool.query('select * from gps where id = ?', id);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('GP NÃO ENCOTRADO!');
            }
            
            await pool.query('delete from gps where id = ?',  id);

            return h.response({message: 'GP DELETADO COM SUCESSO!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    }
}