import { Component } from 'react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedCharacter: null
    }

    onCharactersSelected = (id) => {
        this.setState({
            selectedCharacter: id
        });
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharacterSelected={this.onCharactersSelected}/>
                        </ErrorBoundary>
                        
                        <ErrorBoundary>
                            <CharInfo characterId={this.state.selectedCharacter}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;