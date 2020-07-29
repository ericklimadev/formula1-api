const Boom = require('@hapi/boom');

module.exports = {

    create: async (request, h) => {
        const pool = request.mysql.pool;

        try {
            
                await pool.query('insert into resultados set ?', request.payload);
                return h.response({message: 'RESULTADO CRIADO!'}).code(201);

        } catch (error) {
            throw Boom.badRequest(error);       
        
        }
    
    },
    findAll: async (request, h) => {
        const pool = request.mysql.pool;
        try {
            const [rows, fields] = await pool.query('select * from resultados order by id_gp, posicao');
            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('RESULTADO NÃO ENCOTRADO!');
            }
            return h.response(rows).code(200);
        } catch (error) {
            throw Boom.badRequest(error);
        }
    },


    update: async (request, h) => {
        
        const pool = request.mysql.pool;
        const id_gp = request.params.id_gp;
        const id_piloto = request.params.id_piloto;

        try {
            const [rows, fields] = await pool.query('select * from resultados where id_gp = ? and id_piloto = ?', [id_gp, id_piloto]);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('RESULTADO NÃO ENCOTRADO!');
            }
            
            await pool.query('update resultados set ? where id_gp = ? and id_piloto = ?', [request.payload, id_gp, id_piloto]);

            return h.response({message: 'RESULTADO ATUALIZADO COM SUCESSO!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    },

    delete: async (request, h) => {
        
        const pool = request.mysql.pool;
        const id_gp = request.params.id_gp;
        const id_piloto = request.params.id_piloto;


        try {
            const [rows, fields] = await pool.query('select * from resultados where id_gp = ? and id_piloto = ?', [id_gp, id_piloto]);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('RESULTADO NÃO ENCOTRADO!');
            }
            
            await pool.query('delete from resultados where id_gp=? and id_piloto=?;', [id_gp, id_piloto]);

            return h.response({message: 'RESULTADO DELETADO COM SUCESSO!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    },
    
}