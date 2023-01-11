import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsListEnded, setComicsListEnded] = useState(false);
    

    const {loading, error, getAllComics} = useMarvelServices();

    useEffect(() => {
        onComicsListLoadRequest(offset, true);
    }, []);

    const onComicsListLoadRequest = (offset, initialComicsLoad) => {
        initialComicsLoad ? setNewComicsLoading(false) : setNewComicsLoading(true);   
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let listEnded = false;
        if (newComicsList.length < 8) {
            listEnded = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffset(offset => offset + 8);
        setComicsListEnded(listEnded);
    }

    function renderComics(comicsList) {
        const comics = comicsList.map((comic, index) => {
            const {id, title, thumbnail, price} = comic;
    
            return (
                <li 
                    className="comics__item" 
                    key={index} >
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img" />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
    
        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        )
    }

    const renderedComics = renderComics(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newComicsLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {renderedComics}
            <button 
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={comicsListEnded ? {display: 'none'} : {display: 'block'}}
                onClick={() => onComicsListLoadRequest(offset)} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;