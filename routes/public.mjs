export default {
    name: 'public',
    register: async (server) => {
        server.route({
            method: 'GET',
            path: '/public/{param*}',
            handler: {
                directory: {
                    path: "./public",
                    listing: false,
                    index: false
                },
            },
        });
    },
};
