export const useRequest = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
        const response = await fetch(url, {method, body, headers});

        if (!response.ok) {
            throw new Error(`Could not find ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    return {request};
}

export default useRequest;