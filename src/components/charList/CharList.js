import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }
    marvelServices = new MarvelServices();

    componentDidMount() {
        this.marvelServices
            .getAllCharacters()
            .then(this.onCharacterListLoaded)
            .catch(this.onCharacterListLoadError)
    }

    onCharacterListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onCharacterListLoadError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {charList, error, loading} = this.state;

        const characters = charList.map(char => {
            const {id, name, thumbnail} = char;

            let imgStyle = {'objectFit': 'cover'};
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li className="char__item" key={id}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const viewContent = !(loading || error) ? characters : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {viewContent}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;