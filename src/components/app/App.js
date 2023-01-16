import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/SingleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/SingleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage/SinglePage'));
const Page404 = lazy(() => import('../pages/Error404Page/404'));

const App = () => {

    return (
        <Router>
            <div className="app">
            <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage />
                            </Route>

                            <Route exact path="/comics">
                                <ComicsPage />
                            </Route>

                            <Route exact path="/comics/:id">
                                <SinglePage Component={SingleComicLayout} dataType="comic"/>
                            </Route>
                            <Route exact path="/characters/:id">
                                <SinglePage Component={SingleCharacterLayout} dataType="character"/>
                            </Route>

                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;