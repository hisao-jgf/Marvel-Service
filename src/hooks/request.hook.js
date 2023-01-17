import { useState, useCallback } from "react";

const useRequest = () => {
    const [stateProcess, setStateProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
        setStateProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not find ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setStateProcess('confirmed');
            return data;
        } catch(e) {
            setStateProcess('error');
            throw e;
        }
    }, []);

    const removeError = useCallback(() => {
        setStateProcess('loading');
    }, []);

    return {removeError, request, stateProcess, setStateProcess};
}

export default useRequest;