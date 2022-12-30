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
    _transformCharacterData = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 228)}...` : 'There is no description available for this character.',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

    getAllCharacters = async () => {
        const result = await this.getResources(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
        return result.data.results.map(this._transformCharacterData);
    }
    getCharacter = async (id) => {
        const result = await this.getResources(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacterData(result.data.results[0]);
    }
}

export default MarvelServices;