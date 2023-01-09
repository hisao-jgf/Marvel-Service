import useRequest from '../hooks/request.hook';

const useMarvelServices = () => {
    const {loading, error, removeError, request} = useRequest();

    const _apiKey = process.env.REACT_APP_API_KEY;
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _baseCharacterOffset = 210;

    const _transformCharacterData = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 228)}...` : 'There is no description available for this character.',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllCharacters = async (offset = _baseCharacterOffset) => {
        const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return result.data.results.map(_transformCharacterData);
    }
    const getCharacter = async (id) => {
        const result = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        return _transformCharacterData(result.data.results[0]);
    }

    return {loading, error, removeError, request, getCharacter, getAllCharacters};
}

export default useMarvelServices;