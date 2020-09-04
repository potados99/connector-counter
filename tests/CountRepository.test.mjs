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

async function findNearest_test() {
    const col = [10, 9, 6, 5, 4, 3, 2, 1];

    console.log(countRepo._findNearest(col, 10));
}

// getCurrentCount_shouldReturnSomethingAfterSet();
// getSamples_shouldReturnSomethingAfterAdd();

findNearest_test();
