const Boom = require('@hapi/boom');

module.exports = {


    findAll: async (request, h) => {
        const pool = request.mysql.pool;
        const id_gp = request.params.id_gp;
        try {
            const [rows, fields] = await pool.query('select R.posicao as "POS", P.nome as "PILOTO", P.equipe as "EQUIPE", P.id as "Nº", R.tempo as "TEMPO", R.pontos as "PONTOS" from pilotos P inner join resultados R on P.id=R.id_piloto inner join gps G on G.id=R.id_gp where id_gp=? order by posicao',id_gp);
            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('CLASSIFICAÇÃO NÃO ENCOTRADO!');
            }
            return h.response(rows).code(200);
        } catch (error) {
            throw Boom.badRequest(error);
        }
    },
    
}
