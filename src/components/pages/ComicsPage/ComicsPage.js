import { Helmet } from 'react-helmet';
import ArrowUp from '../../arrowUp/ArrowUp';

import AppBanner from '../../appBanner/AppBanner';
import ComicsList from '../../comicsList/ComicsList';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with our comics"
                />
                <title>Comics page</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
            <ArrowUp />
        </>
    )
}

export default ComicsPage;