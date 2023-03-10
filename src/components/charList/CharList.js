import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (stateProcess, Component, newCharsLoading) => {
    switch (stateProcess) {
        case 'waiting':
            return <Spinner />;
        case 'loading': 
            return newCharsLoading ? <Component /> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new ErrorMessage('Unexpected state process error');
    }
}

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charListEnded, setCharListEnded] = useState(false);
    
    const charRefs = useRef([]);

    const {stateProcess, setStateProcess, getAllCharacters} = useMarvelServices();

    useEffect(() => {
        onCharacterListLoadRequest(offset, true);
    }, []);

    const onCharacterListLoadRequest = (offset, initialCharsLoad) => {
        initialCharsLoad ? setNewCharsLoading(false) : setNewCharsLoading(true);   
        getAllCharacters(offset)
            .then(onCharacterListLoaded)
            .then(() => setStateProcess('confirmed'));
    }

    const onCharacterListLoaded = (newCharList) => {
        let listEnded = false;
        if (newCharList.length < 9) {
            listEnded = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewCharsLoading(false);
        setOffset(offset => offset + 9);
        setCharListEnded(listEnded);
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

    const renderElements = useMemo(() => {
        return setContent(stateProcess, () => renderCharacters(charList), newCharsLoading);
    }, [stateProcess])

    return (
        <div className="char__list">
            {renderElements}
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