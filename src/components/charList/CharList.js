import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newCharsLoading: false,
        offset: 210,
        charListEnded: false
    }
    charRefs = [];

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.onCharacterListLoadRequest();
    }

    onCharacterListLoadRequest = (offset) => {
        this.onCharacterListLoading();
        this.marvelServices
            .getAllCharacters(offset)
            .then(this.onCharacterListLoaded)
            .catch(this.onCharacterListLoadError)
    }

    onCharacterListLoading = () => {
        this.setState({
            newCharsLoading: true
        })
    }

    onCharacterListLoaded = (newCharList) => {
        let listEnded = false;
        if (newCharList.length < 9) {
            listEnded = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newCharsLoading: false,
            offset: offset + 9,
            charListEnded: listEnded
        }))
    }

    onCharacterListLoadError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    setCharacterRef = (ref) => {
        this.charRefs.push(ref);
    }

    onCharacterSelectedFocus = (index) => {
        this.charRefs.forEach(char => char.classList.remove('char__item_selected'));
        this.charRefs[index].classList.add('char__item_selected');
        this.charRefs[index].focus();
    }

    renderCharacters(characterList) {
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
                    ref={this.setCharacterRef}
                    onClick={() => {
                        this.props.onCharacterSelected(id);
                        this.onCharacterSelectedFocus(index);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            this.props.onCharacterSelected(id);
                            this.onCharacterSelectedFocus(index);
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

    render() {
        const {charList, error, loading, newCharsLoading, offset, charListEnded} = this.state;

        const renderedChars = this.renderCharacters(charList);

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
                    onClick={() => this.onCharacterListLoadRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
}

export default CharList;