import countRepo from '../lib/singleton/countRepo';

export default {
    name: 'past',
    register: async (server) => {
        server.route({
            method: 'GET',
            path: '/past',
            handler: async (request, h) => {
                return await countRepo.getSamples(50);
            },
        });
    },
};
