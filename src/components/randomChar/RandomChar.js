import { useState, useEffect } from 'react';
import setContent from '../../utils/setContent';

import useMarvelServices from '../../services/MarvelServices';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const {stateProcess, setStateProcess, removeError, getCharacter} = useMarvelServices();

    useEffect(() => {
        updateCharacter();
    }, []);

    const onCharacterLoaded = (char) => {
        setChar(char);
    }

    const updateCharacter = () => {
        removeError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(onCharacterLoaded)
            .then(() => setStateProcess('confirmed'));
    }

    return (
        <div className="randomchar">
            {setContent(stateProcess, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;

    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        imgStyle = {'objectFit': 'unset'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;