import countRepo from '../lib/singleton/countRepo';

export default {
    name: 'current',
    register: async (server) => {
        server.route({
            method: 'GET',
            path: '/current',
            handler: async (request, h) => {
                return await countRepo.getCurrentCount();
            },
        });
    },
};
