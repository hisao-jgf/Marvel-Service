class MarvelServices {
    _apiKey = process.env.REACT_APP_API_KEY;
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    getResources = async (url) => {
        const getResult = await fetch(url);
        if (!getResult.ok) {
            throw new Error(`Could not find ${url}, status: ${getResult.status}`);
        }
        return await getResult.json();
    };

    getAllCharacters = async () => {
        return await this.getResources(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`)
    }
    getCharacter = async (id) => {
        return await this.getResources(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
    }
}

export default MarvelServices;