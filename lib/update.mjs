import schedule from 'node-schedule';
import woowaRepo from './singleton/woowaRepo';
import countRepo from './singleton/countRepo';

// every 30 secs
async function updateCurrentCount() {
    const count = await woowaRepo.getCurrentConnectorCount();
    await countRepo.setCurrentCount(count);
}

// every day
async function fetchAndStoreCurrentCount() {
    const count = await woowaRepo.getCurrentConnectorCount();
    await countRepo.addSample(count);
}

function registerSchedule() {
    schedule.scheduleJob('0/30 * * * * *', async () => {
        // every 30 secs
        await updateCurrentCount();
    });

    schedule.scheduleJob('0 0 * * * *', async () => {
        // every hour
        await fetchAndStoreCurrentCount();
    });
}

export default registerSchedule;
