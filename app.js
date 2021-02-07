'use strict';
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');

const env = process.env;
const port = env.PORT || 3001;

const server = new Hapi.Server({
    port,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'static')
        }
    }
});

const provision = async () => {

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
