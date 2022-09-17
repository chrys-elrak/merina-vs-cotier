const AppEnv = {
    production: false,
    api: {
        url: 'https://localhost:5000',
        apiVersion: 'v1'
    },
    socket: {
        url: 'https://localhost:5000'
    },
    fb: {
        clientId: '8024871117554237', // App id
        redirectUri: '/facebook/__auth/callback',
    }
};

export function getApiUrl() {
    return AppEnv.api.url + '/api/' + AppEnv.api.apiVersion;
}

export function getSocketUrl() {
    return AppEnv.socket.url;
}

export function getFbClientId() {
    return AppEnv.fb.clientId;
}

export function getFbRedirectUri() {
    return AppEnv.api.url + AppEnv.fb.redirectUri;
}
