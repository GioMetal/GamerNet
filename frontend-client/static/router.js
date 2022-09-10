
import abstractView from "./views/abstractView.js";
import homeView from "./views/homeView.js";
import notFoundView from "./views/notFoundView.js";
import profileView from "./views/profileView.js";
import timeLine from "./views/timeLine.js";
import welcomeView from "./views/welcomeView.js";

export {navigateTo};

function navigateTo(url)
{
    history.pushState(null, null, url);
    router();
}

function sanitizeParameters(params)
{
    let l = 0;
    let resParams = [];
    for(let i = 0; i < params.length; i++)
    {
        
        if(params[i] != '')
        {
            resParams[l] = params[i];
            l++;
        }
    }

    return resParams;
}

async function router()
{
    const routes = 
    [
        {path : '/welcome', view: welcomeView},
        {path : '/', view: homeView},
        {path : '/profile', view: profileView},
        {path : '/timeline', view: timeLine},
        {path:'/not-found', view: notFoundView}
    ];

    let match = null;
    let splitStr = location.pathname.split('/');
    
    for(let i = 0; i < routes.length; i++)
    {
        let matchStr = routes[i].path.slice(1);
        
        if(matchStr == splitStr[1] && (splitStr[1] != '' || location.pathname == '/'))
        {
            match = routes[i];
            break;
        }
    }

    if(!match)
    {
        navigateTo(location.origin + '/not-found')
        match = {path:'not-found', view: notFoundView};
    }

    const view = new match.view(sanitizeParameters(splitStr), location.href);
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', async () => {
    if(!config.isLoggedIn())
    {
        if(config.isHandshakeInitiated())
        {
            config.finilizeHandshake(window.location.href);
            return;
        }

        navigateTo('/welcome');
        return;
    }
    else
    {
        await config.initFlow();
    }

    document.body.addEventListener('click', async e => {
        if(e.target.matches('[router]'))
        {
            e.preventDefault();
            navigateTo(e.target.href);
            await config.initFlow();
        }

        
    });
    router();
});


