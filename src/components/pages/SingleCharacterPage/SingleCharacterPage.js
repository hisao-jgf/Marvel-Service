import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AppBanner from '../../appBanner/AppBanner';

import useMarvelServices from '../../../services/MarvelServices';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState({});

    const {loading, error, removeError, getCharacter} = useMarvelServices();

    useEffect(() => {
        updateCharacter();
    }, []);

    const onCharacterLoaded = (char) => {
        setChar(char);
    }

    const updateCharacter = () => {
        removeError();
        getCharacter(charId)
            .then(onCharacterLoaded);
    }

    const View = ({character}) => {
        const {name, description, thumbnail} = character;

        return (
            <div className="single-character">
                <img src={thumbnail} alt={name} className="single-character__img"/>
                <div className="single-character__info">
                    <h2 className="single-character__name">{name}</h2>
                    <p className="single-character__descr">{description}</p>
                </div>
            </div>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const viewContent = !(loading || error) ? <View character={char} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {viewContent}
        </>
    )
}

export default SingleCharacterPage;
