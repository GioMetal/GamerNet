function SecurityConfig()
{
    // Generic values that other IDPs use
    this.client_id = "";
    this.client_secret = "";
    this.scope = "";
    this.redirect_uri = "";
    this.handshake_redirect_uri = "";
    this.post_logout_redirect_uri = "";
    this.code_challenge_method = "";
    this.code_challenge = "";
    this.code_verifier = "";
    this.state = "";
    this.response_type = "";
    this.grant_type = "";

    this.sso = "";
    this.sso_token = "";
    this.sso_logout = "";
    // token
    // logout

    let isLogged = false;
    let startedHandShake = false;

    this.init = function()
    {
        isLogged = localStorage.getItem('isLogged') != null ?  true : false
        startedHandShake = localStorage.getItem('startedHandShake') != null ? true : false;
    }

    this.doRefreshToken = async function()
    {
        let refreshToken = this.getRefreshToken();
        if(Math.floor((new Date().getTime() / 1000)) > refreshToken.exp)
        {
            cancelFlow();
            return;
        }
        
        // if refresh token is valid, we will request a new token
        let bod = 
            "client_id=gamer-net-front&"+
            "client_secret=" + this.client_secret + "&"+
            "refresh_token=" + localStorage.getItem('refresh_token') + "&"+
            "grant_type=refresh_token";
        let promise = await fetch('http://localhost:8080/realms/GamerNet/protocol/openid-connect/token',{method: 'POST',body: bod, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        let result = await promise.json();

        console.log(result);

    

        if(result?.access_token == undefined) // to check if the post request failed, for any reason. 
        {
            cancelFlow();
            return;
        }

        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('expires_in', result.expires_in);
        localStorage.setItem('refresh_token', result.refresh_token);
        localStorage.setItem('refresh_expires_in', result.refresh_expires_in);
        localStorage.setItem('id_token', result.id_token);
        localStorage.setItem('session_state', result.session_state);
        localStorage.setItem('token_type', result.token_type);
        localStorage.setItem('DEBUG FLAG', 'LOL')

        console.log('Token Refreshed Successfully');
    }

    // login flow, you can call this afterwards to start the validation process
    this.initFlow = async function()
    {
        if(!isLogged && !startedHandShake)
        {
            cancelFlow();
            logIn(this.constructSSO());
        }

        if(isLogged)
        {
            // validation
            let accessToken = this.getAccessToken();
            

            // check if access token has expired
            /*
            console.log((new Date().getTime() / 1000) +" "+accessToken.exp);
            console.log(localStorage.access_token)
            console.log(localStorage.refresh_token)
            */
            if(Math.floor((new Date().getTime() / 1000)) > accessToken.exp)
            {
                // check if refresh token has expired
                
                this.doRefreshToken();
                //location.href=location.href;
                return;
            }
        }
    }

    // Called after being redirected from IDP's login
    this.finilizeHandshake = function(url)
    {
        this.postTokenRequest(this.constructCodeLogin(url));
    }

    // Constructs SSO string to redirect the user to the SSO page
    this.constructSSO = function()
    {
        let returnString =
        this.sso + "?" +
        "client_id=" + this.client_id +"&" +
        "response_type=" + this.response_type +"&" +
        "scope=" + this.scope +"&" +
        "redirect_uri=" + this.handshake_redirect_uri +"&" +
        "state=" + this.state +"&" +
        "code_challenge_method=" + this.code_challenge_method +"&" +
        "code_challenge=" + this.code_challenge + "";

        return encodeURI(returnString);
    }

    // Constructs the string for POST login to retrieve the Token
    this.constructCodeLogin = function(url)
    {
        // when we get redirected from the SSO page, we need the code that comes with it
        if(url.indexOf('?') == -1)
        {
            cancelFlow();
            return;
        }

        return getUrlParameters(url).code;
    }

    // Starts "handshake" *PLESE NOTE THAT I DON'T MEAN A SOCKET HANDSHAKE, MORE LIKE A PROCESS WHERE THE CLIENT CAN KNOW WETHER IT HAS STARTED A PROCESS WITH IDP OR NOT, DON'T MURDER ME*
    let logIn =  function(url)
    {
        localStorage.setItem('startedHandShake', '');
        window.location = url;
    }

    this.postTokenRequest = async function(code)
    {
        if(code == null)
        {
            cancelFlow();
            return;
        }
        console.log('POST REQUEST')
        let returnString =
        "client_id=" + this.client_id +"&" +
        "scope=" + this.scope +"&" +
        "redirect_uri=" + this.redirect_uri +"&" +
        "state=" + this.state +"&" +
        "code=" + code +"&" +
        "client_secret=" + this.client_secret +"&" +
        "grant_type=" + this.grant_type +"&" +
        "code_verifier=" + this.code_verifier + "";
        
        let promise = await fetch(this.sso_token, {method: 'POST', body: returnString, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        let result = await promise.json();

        if(result.error)
        {
            cancelFlow();
            return;
        }

        //cleanFlow();

        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('expires_in', result.expires_in);
        localStorage.setItem('refresh_token', result.refresh_token);
        localStorage.setItem('refresh_expires_in', result.refresh_expires_in);
        localStorage.setItem('id_token', result.id_token);
        localStorage.setItem('session_state', result.session_state);
        localStorage.setItem('token_type', result.token_type);
        localStorage.setItem('isLogged', '');

        window.location = this.redirect_uri;
    }


    this.logOut = async function()
    {
        
        let resultStr = 
        
        "client_id="+ this.client_id +"&"+
        "refresh_token="+this.getLogOutToken() +"&"+
        //"id_token_hint="+this.getLogOutToken()+"&"+
        "client_secret="+config.client_secret+"&"+
        "post_logout_redirect_uri="+ this.post_logout_redirect_uri;

        isLogged = false;
        startedHandShake = false;
        localStorage.clear();

        let promise = null;
        try
        {
            await fetch(this.sso_logout,{method: 'POST',body: resultStr, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        }
        catch{}

        
       window.location = this.post_logout_redirect_uri;
    }

    this.isLoggedIn = function()
    {
        return isLogged;
    }

    this.isHandshakeInitiated = function()
    {
        return startedHandShake;
    }

    let cancelFlow = function()
    {
        isLogged = false;
        startedHandShake = false;
        localStorage.clear();
        window.location= '/welcome';
    }


    this.getAccessToken = function()
    {
        return parseJwt(localStorage.getItem('access_token'));
    }

    this.getLogOutToken = function()
    { 
        return localStorage.getItem('refresh_token');
    }

    this.getAuthToken = function()
    { 
        return localStorage.getItem('access_token');
    }

    this.getIdToken = function()
    { 
        return parseJwt(localStorage.getItem('id_token'));
    }

    this.getRefreshToken = function()
    {
        return parseJwt(localStorage.getItem('refresh_token'));
    }
};

function parseJwt(token) 
{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getUrlParameters(url)
{
    let firstSplit = url.split('?');
    if(firstSplit.length <= 1)
    {
        return null;
    }

    let secondSplit = firstSplit[1].split('&');

    let result = {};

    for(let i = 0; i < secondSplit.length; i++)
    {
        let thisSplit = secondSplit[i].split('=');
        result[thisSplit[0]] = thisSplit[1];
    }

    return result;
}
