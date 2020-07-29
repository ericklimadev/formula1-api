const Boom = require('@hapi/boom');

module.exports = {


    findAll: async (request, h) => {
        const pool = request.mysql.pool;

        try {

            const [rows, fields] = await pool.query('select row_number() over (order by sum(R.pontos) desc) as POS, P.nome as "PILOTO", P.equipe as "EQUIPE", sum(R.pontos) as PONTOS from pilotos P inner join resultados R on P.id=R.id_piloto inner join gps G on G.id=R.id_gp group by P.nome ORDER BY PONTOS desc');
           if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('CLASSIFICAÇÃO NÃO ENCOTRADA!');
           }
            return h.response(rows).code(200);
        } catch (error) {
            throw Boom.badRequest(error);
        }
    },
    
}