import request from 'request';

class WoowaRepository {
    constructor() {
        // https://pf.kakao.com/_xdhKKT                        client
        // https://pf-wapi.kakao.com/web/profiles/_xdhKKT      api
        // Channel page now use React and client side rendering!
        this.sourceUrl = "https://pf-wapi.kakao.com/web/profiles/_xdhKKT"
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

        // Happy with it :)
        const data = JSON.parse(result);

        return data.profile.friend_count;
    }
}

export default WoowaRepository;
