import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

async function createServer() {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
    });

    await registerPlugins(server);

    return server;
}

async function registerPlugins(server) {
    await server.register([
        Inert,
    ]);

    await server.register([
        ((await import('./routes/index')).default),
        ((await import('./routes/public')).default),
        ((await import('./routes/current')).default),
        ((await import('./routes/past')).default),
        ((await import('./routes/diff')).default),
    ]);
}

export default createServer;
