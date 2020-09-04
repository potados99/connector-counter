import redis from 'async-redis';

class CountRepository {
    constructor() {
        this.client = redis.createClient(process.env.REDIS_URL);

        this.client.on('connect', () => {
            console.log('Redis connected');
        });
    }


    // Realtime info

    /**
     * Set recent connector count at this time.
     * @param count The count
     * @return {Promise<void>}
     */
    async setCurrentCount(count) {
        const currentCountSample = {
            timestamp: new Date().getTime(),
            count: count,
        };

        await this.client.hmset("currentCount", currentCountSample);
    }

    /**
     * Get most recent connector count.
     * @return {Promise<Object>} An object whit keys: 'timestamp' and 'count', or null.
     */
    async getCurrentCount() {
        return await this.client.hgetall("currentCount");
    }

    async getDiffFromYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const sampleYesterday = await this._getMostCloseSampleOfPastFromRecent(yesterday.getTime());

        if (!sampleYesterday) {
            return {};
        }

        const sampleNow = await this.getCurrentCount();

        return {diff: sampleNow.count - sampleYesterday.count};
    }

    async _getMostCloseSampleOfPastFromRecent(timestamp, maxPadding=5400000/*90min*/) {
        const keys = await this.client.sort("samples", "alpha", "desc"); // -1 for no limit

        for (const sampleTimestamp of keys.map(key => Number.parseInt(key.replace('sample:', '')))) {
            if (sampleTimestamp - timestamp < maxPadding) {
                return await this.client.hgetall(`sample:${sampleTimestamp}`);
            }
        }

        return null;
    }


    // Chart drawing

    async addSample(count) {
        const now = new Date().getTime();

        const sample = {
            timestamp: now,
            count: count,
        };

        const sampleName = `sample:${now}`;

        await this.client.sadd("samples", sampleName);
        await this.client.hmset(sampleName, sample);
    }

    async getSamples(limit=-1) {
        const keys = await this.client.sort("samples", "alpha", "desc", "limit", "0", limit); // -1 for no limit

        const allSamples = await Promise.all(keys.map(async key => {
            return await this.client.hgetall(key);
        }));

        return allSamples.filter(sample => !!sample);
    }
}

export default CountRepository;



