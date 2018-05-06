'use strict';
const Hapi = require('hapi');
const inert = require('inert');
const env = process.env;

const server = new Hapi.Server();

var port = env.PORT || 3001;

server.connection({
    port: port
});


server.register([
{
    register: inert,
    options: {}
}], (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    //Serving static files
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'static'
            }
        }
    });
    server.start((err) => console.log('Server started at:', server.info.uri));
});
