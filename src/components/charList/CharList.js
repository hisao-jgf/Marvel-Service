import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charListEnded, setCharListEnded] = useState(false);
    
    const charRefs = useRef([]);

    const marvelServices = new MarvelServices();

    useEffect(() => {
        onCharacterListLoadRequest();
    }, []);

    const onCharacterListLoadRequest = (offset) => {
        onCharacterListLoading();   
        marvelServices.getAllCharacters(offset)
            .then(onCharacterListLoaded)
            .catch(onCharacterListLoadError)
    }

    const onCharacterListLoading = () => {
        setNewCharsLoading(true);
    }

    const onCharacterListLoaded = (newCharList) => {
        let listEnded = false;
        if (newCharList.length < 9) {
            listEnded = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewCharsLoading(false);
        setOffset(offset => offset + 9);
        setCharListEnded(listEnded);
    }

    const onCharacterListLoadError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharacterSelectedFocus = (index) => {
        charRefs.current.forEach(char => char.classList.remove('char__item_selected'));
        charRefs.current[index].classList.add('char__item_selected');
        charRefs.current[index].focus();
    }

    function renderCharacters(characterList) {
        const characters = characterList.map((char, index) => {
            const {id, name, thumbnail} = char;
    
            let imgStyle = {'objectFit': 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                imgStyle = {'objectFit': 'unset'};
            }
    
            return (
                <li 
                    className="char__item" 
                    tabIndex={0}
                    key={id}
                    ref={elem => charRefs.current[index] = elem}
                    onClick={() => {
                        props.onCharacterSelected(id);
                        onCharacterSelectedFocus(index);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharacterSelected(id);
                            onCharacterSelectedFocus(index);
                        }
                    }}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    
        return (
            <ul className="char__grid">
                {characters}
            </ul>
        )
    }

    const renderedChars = renderCharacters(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const viewContent = !(loading || error) ? renderedChars : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {viewContent}
            <button 
                className="button button__main button__long"
                disabled={newCharsLoading}
                style={charListEnded ? {display: 'none'} : {display: 'block'}}
                onClick={() => onCharacterListLoadRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
}

export default CharList;