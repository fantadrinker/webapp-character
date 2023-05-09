const BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/fantadrinker';

export const postCharacters = (characters) => {
    return fetch(`${BASE_URL}/characters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(characters),
    });
}

export const getCharacters = () => {
    // this errors out because the API doesn't support cors
    /**
     * content-length: 42
        content-type: application/json
        date: Tue, 09 May 2023 17:43:10 GMT
        x-amz-apigw-id: EqnnQEEe4osFe-A=
        x-amzn-errortype: MissingAuthenticationTokenException
        x-amzn-requestid: d4b13ea3-eb9c-4eac-bd12-e7ee23dfcebd
     */
    return fetch(`${BASE_URL}/characters`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    });
}

export const saveCharactersInLocalStorage = (characters) => {
    localStorage.setItem('WEBAPP_CHARACTERS', JSON.stringify(characters));
}

export const getCharactersFromLocalStorage = () => {
    const lsItem = localStorage.getItem('WEBAPP_CHARACTERS');
    return lsItem? JSON.parse(lsItem) : [];
}