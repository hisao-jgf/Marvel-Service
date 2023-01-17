import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import setContent from '../../../utils/setContent';

import AppBanner from '../../appBanner/AppBanner';

import useMarvelServices from '../../../services/MarvelServices';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState({});

    const {stateProcess, setStateProcess, removeError, getCharacter, getComic} = useMarvelServices();

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
                    .then(onDataLoaded)
                    .then(() => setStateProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setStateProcess('confirmed'));
                break;
            default:
                return;
        }
       
    }

    return (
        <>
            <AppBanner />
            {setContent(stateProcess, Component, data)}
        </>
    )
}

export default SinglePage;
