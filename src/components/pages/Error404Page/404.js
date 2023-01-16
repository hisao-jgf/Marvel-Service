import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import ErrorMessage from "../../errorMessage/ErrorMessage";

import './404.scss'

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="404 Page not found"
                />
                <title>404 Page</title>
            </Helmet>
            <ErrorMessage />
            <p className="error404__status">404</p>
            <p className="error404__description">This page doesn't exist.</p>
            <Link to="/" className="error404__link">*Main page*</Link>
            <Link to="/comics" className="error404__link">*Comics page*</Link>
        </>
    )
}

export default Page404;