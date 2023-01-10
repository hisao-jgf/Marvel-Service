import useRequest from '../hooks/request.hook';

const useMarvelServices = () => {
    const {loading, error, removeError, request} = useRequest();

    const _apiKey = process.env.REACT_APP_API_KEY;
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _baseCharacterOffset = 210;
    const _baseComicsOffset = 0;

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
    const _transformComicsData = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || 'There is no description available for this comic.',
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            pages: comic.pageCount ? `${comic.pageCount} p.` : 'There is no information available about the number of pages.',
            language: comic.textObjects.language || 'en-us',
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'Not available'
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

    const getAllComics = async (offset = _baseComicsOffset) => {
        const result = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
        return result.data.results.map(_transformComicsData);
    }
    const getComic = async (id) => {
        const result = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`)
        return _transformComicsData(result.data.results[0]);
    }

    return {loading, error, removeError, request, getCharacter, getAllCharacters, getComic, getAllComics};
}

export default useMarvelServices;