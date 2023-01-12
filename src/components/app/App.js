import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage/SingleComicPage'));
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

                            <Route exact path="/comics/:comicId">
                                <SingleComicPage />
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