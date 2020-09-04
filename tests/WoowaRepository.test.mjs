import woowaRepo from '../lib/singleton/woowaRepo';

async function getCurrentConnectorCount_shouldWork() {
    console.log(await woowaRepo.getCurrentConnectorCount());
}

getCurrentConnectorCount_shouldWork();
