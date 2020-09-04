import countRepo from '../lib/singleton/countRepo';

export default {
    name: 'diff',
    register: async (server) => {
        server.route({
            method: 'GET',
            path: '/diff',
            handler: async (request, h) => {
                return await countRepo.getDiffFromYesterday();
            },
        });
    },
};
