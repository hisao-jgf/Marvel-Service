import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelServices from '../../../services/MarvelServices';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState({});

    const {loading, error, removeError, getComic} = useMarvelServices();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        removeError();
        getComic(comicId)
            .then(onComicLoaded);
    }

    const View = ({comic}) => {
        const {title, description, thumbnail, pages, language, price} = comic;

        return (
            <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pages}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link exact to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const viewContent = !(loading || error) ? <View comic={comic} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {viewContent}
        </>
    )
}

export default SingleComicPage;