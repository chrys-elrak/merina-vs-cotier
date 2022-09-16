import { getFbClientId, getFbRedirectUri } from "../app.env";

export const facebookAuthService = {
    login: () => {
        // open Facebook login popup
        const url = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${getFbClientId()}&redirect_uri=${getFbRedirectUri()}&display=popup&response_type=token&auth_type=rerequest `;
        window.open(url, '_blank', 'width=600,height=600');
      }
} 