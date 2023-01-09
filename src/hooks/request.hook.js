import { useState, useCallback } from "react";

const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not find ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data;
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const removeError = useCallback(() => setError(null), []);

    return {loading, error, removeError, request};
}

export default useRequest;