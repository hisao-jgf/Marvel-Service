import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AppBanner from '../../appBanner/AppBanner';

import useMarvelServices from '../../../services/MarvelServices';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState({});

    const {loading, error, removeError, getCharacter, getComic} = useMarvelServices();

    useEffect(() => {
        updateData();
    }, [id]);

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateData = () => {
        removeError();

        switch (dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded);
        }
       
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const viewContent = !(loading || error) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {viewContent}
        </>
    )
}

export default SinglePage;