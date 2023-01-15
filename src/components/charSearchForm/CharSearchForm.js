import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState(null);

    const {loading, error, removeError, getCharacterByName} = useMarvelServices();

    const onCharacterLoaded = (char) => {
        setChar(char);
    }

    const updateCharacter = (name) => {
        removeError();
        getCharacterByName(name)
            .then(onCharacterLoaded);
    }

    const criticalError = error ? 
                        <div className="char__search-critical-error">
                            <ErrorMessage />
                        </div> :
                        null;

    const searchResult = !char ? null : char.length > 0 ?
                        <div className="char__search-wrapper">
                            <div className="char__search-success">There is! Visit {char[0].name}'s page?</div>
                            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                                <div className="inner">To page</div>
                            </Link>
                        </div> :
                        <div className="char__search-error">
                            The character was not found. Please check the name and try again.
                        </div>

    const ViewForm = () => {
        return (
            <Formik 
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string()
                                  .required('Character name is required')
                })}
                onSubmit = {values => updateCharacter(values.charName)}
            >
                <div className="char__search-wrapper">
                    <Form>
                        <label htmlFor="charName" className="char__search-label">Or find a character by name:</label>
                        <Field 
                            name="charName"
                            placeholder="Enter characters' name"
                        />
                        <button 
                            type="submit"
                            disabled={loading}
                            className="button button__main"
                        >
                            <div className="inner">Find</div>
                        </button>
                        <FormikErrorMessage name="charName" className="char__search-error" component="div"/>
                    </Form>
                </div>
            </Formik>
        )
    }

    return (
        <div className="char__search-form">
            <ViewForm />
            {searchResult}
            {criticalError}
        </div>
    )
}

export default CharSearchForm;