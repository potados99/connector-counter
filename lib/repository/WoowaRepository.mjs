import request from 'request';

class WoowaRepository {
    constructor() {
        this.sourceUrl = "https://pf.kakao.com/_xdhKKT"
    }

    async getCurrentConnectorCount() {
        const result = await new Promise((resolve, reject) => {
            request.get({
                url: this.sourceUrl,
            }, (error, httpResponse, body) => {
                if (error) {
                    reject();
                }
                else if (httpResponse.statusCode !== 200) {
                    reject();
                }
                else {
                    resolve(body);
                }
            });
        });

        const captured = /<span class="num_count">([0-9,]*)</.exec(result)[1].replace(',', '');

        return Number.parseInt(captured);
    }
}

export default WoowaRepository;
