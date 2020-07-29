const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const gpsRouter = require ('./routers/gps.router');
const pilotosRouter = require ('./routers/pilotos.router');
const resultadosRouter = require ('./routers/resultados.router');
const classificacaogpRouter = require ('./routers/classificacaogp.router');
const classificacaogeralRouter = require ('./routers/classificacaogeral.router');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const swaggerOptions = {
        info: {
                title: 'Formula 1 API Documentation',
                version: Pack.version,
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.register({
        plugin: require('hapi-mysql2'),
        options: {
            settings:{
                connectionLimit: 10,
                host:'localhost',
                user: 'root',
                password:'2486',
                database:'formula1_db'
            },
            decorate: true
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route(gpsRouter);
    server.route(pilotosRouter);
    server.route(resultadosRouter);
    server.route(classificacaogpRouter);
    server.route(classificacaogeralRouter);
    
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
