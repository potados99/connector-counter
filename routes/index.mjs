export default {
    name: 'index',
    register: async (server) => {
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return h.file('./public/html/index.html')
            },
        });
    },
};
