import countRepo from '../lib/singleton/countRepo';

async function getCurrentCount_shouldReturnSomethingAfterSet() {
    await countRepo.setCurrentCount(99);
    const result = await countRepo.getCurrentCount();

    console.log((result) ? `Success: ${JSON.stringify(result)}` : "Fail");
}

async function getSamples_shouldReturnSomethingAfterAdd() {
    await countRepo.addSample(9999);
    const result = await countRepo.getSamples(10);

    console.log(result);
}

getCurrentCount_shouldReturnSomethingAfterSet();
getSamples_shouldReturnSomethingAfterAdd();
