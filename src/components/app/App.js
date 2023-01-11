import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import Page404 from '../errorPage/404';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelected = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <Router>
            <div className="app">
            <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <ErrorBoundary>
                                <RandomChar />
                            </ErrorBoundary>
                            <div className="char__content">
                                <ErrorBoundary>
                                    <CharList onCharacterSelected={onCharacterSelected} />
                                </ErrorBoundary>
                                
                                <ErrorBoundary>
                                    <CharInfo characterId={selectedCharacter} />
                                </ErrorBoundary>
                            </div>
                            <img className="bg-decoration" src={decoration} alt="vision"/>
                        </Route>

                        <Route exact path="/comics">
                            <AppBanner />
                            <ComicsList />
                        </Route>

                        <Route path="/comics/:comicId">
                            <SingleComic />
                        </Route>

                        <Route path="*">
                            <Page404 />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;