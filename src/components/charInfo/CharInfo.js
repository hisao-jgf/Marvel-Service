import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

import useMarvelServices from '../../services/MarvelServices';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);  
    const {stateProcess, setStateProcess, removeError, getCharacter} = useMarvelServices();

    useEffect(() => {
        updateCharacter();
    }, [props.characterId]);

    const onCharacterLoaded = (char) => {
        setChar(char);
    }

    const updateCharacter = () => {
        const {characterId} = props;
        if (!characterId) {
            return;
        }

        removeError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
            .then(() => setStateProcess('confirmed'));
    }

    return (
        <div className="char__info">
            {setContent(stateProcess, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        imgStyle = {'objectFit': 'unset'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="char__descr">
                {description}
            </div>
            
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'There are no comics this character has been in.' : null}
                {
                    comics.map((item, index) => {
                        const {name, resourceURI} = item;
                        const id = resourceURI.match(/\/\d\d+/g).join('').slice(1);

                        if (index >= 10) return;
                        return (
                            <li className="char__comics-item"
                                key={index}>
                                <Link to={`/comics/${id}`}>
                                    {name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    characterId: PropTypes.number
};

export default CharInfo;