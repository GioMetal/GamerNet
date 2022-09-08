let selectedLink = 0;

document.addEventListener('DOMContentLoaded', () => {
    onInit();
});

function onInit()
{
    render();
}

function elementHover(i, links)
{
    links[i].style = 'text-decoration:underline;color:orange;';
}

function elementOut(i, links)
{
    links[i].style = 'text-decoration:none;color:white;';
    elementClick(selectedLink, links);
}

function elementClick(i, links)
{
    selectedLink = i;
    links[i].style = 'text-decoration:none;color:orange;';
    for(let j = 0; j < links.length; j++)
    {
        if(i != j)
        {
            links[j].style = 'text-decoration:none;color:white;';
        }
    }
}

let navBarComponentHtml = async ()=>
{
    let isLogged = config.isLoggedIn();
    let isLoggedOut = isLogged == true ? 'hidden' : '';
    let isLoggedIn = isLogged == false ? 'hidden' : '';
    let accessToken = isLogged ? config.getAccessToken() : undefined;

    let html = 
    `<nav class="navbar">
        <div class="navbar-title"> GamerNet</div>
        <div class="navbar-links">
            <ul>
                <li><a class="asd" href="/" router>Home</a></li>
                <li><a class="asd" href="/timeline" router>Timeline del Videogioco</a></li>
                <li><a class="asd" href="/news" router>News</a></li>
            </ul>
        </div>

        <div class="navbar-settings">
            <ul>
                <li><a class="asd" href="/profile/`+ accessToken?.sub +`" `+ isLoggedIn +` router>`+ accessToken?.preferred_username +`</a></li>
                <button class="navbar-logout" `+ isLoggedIn +`>Log Out</button>
                <button class="navbar-login" `+ isLoggedOut +`>Log In</button>
                
            </ul>
        </div>
    </nav>`;

    let css = navBarComponentCss();

    return  css + html;
}

let navBarComponentCss = ()=>
{
    let html = 
    `<style>
        
        .navbar
        {
            display:flex;
            justify-content:space-between;
            align-items:center;
            background-color:#242424;
            height:4rem;
        }
        .navbar-title
        {
            margin-left:2rem;
            font-size: 1.5rem;
            margin 0.5rem;
            color:white;
        }
        .navbar-links ul
        {
            margin:0;
            padding:0;
            display:flex;
        }
        .navbar-links li
        {
            
            margin-right:2rem;
            list-style:none;
        }
        .navbar-links li a
        {
           font-size:1.1rem;
           text-decoration:none;
           color:white;
        }

        .navbar-settings ul
        {
            margin:0;
            padding:0;
            display:flex;
            align-items:center;
        }

        .navbar-links li a:hover
        {
           color:orange;
        }
        .navbar-settings
        {
            margin-right:2rem;
        }

        .navbar-settings li
        {
            margin-right:2rem;
            list-style:none;
        }

        .navbar-settings li a
        {
            font-size:1.1rem;
            text-decoration:none;
            color:white;
        }

        .navbar-settings li a:hover
        {
            color:orange;
        }

        .navbar-settings button
        {
            padding:1rem;
            background-color:orange;
            border-color:white;
            border-style:solid;
        }
        .navbar-settings button:hover
        {
            cursor:pointer;
            color:white;
            background-color:gray;
        }
    </style>`;
    return html;
}

async function render()
{
    let isLogged = config.isLoggedIn();
    if(isLogged)
    {
        console.log(config.getAccessToken());
        //console.log(localStorage.getItem('access_token'))
    }
    

    document.querySelector('#app-navbar').innerHTML = await navBarComponentHtml();
    document.querySelector('.navbar-logout').onclick = () => config.logOut();
    document.querySelector('.navbar-login').onclick = () => {config.initFlow()};

    let links = document.querySelectorAll('.asd'); 
    for(let i = 0; i < links.length; i++)
    {
        links[i].onclick = () =>{elementClick(i, links)};
        links[i].onmouseover = () =>{elementHover(i, links)};
        links[i].onmouseout = () =>{elementOut(i, links)};
        //console.log(links[i].pathname + ' ' + location.pathname);
        if(links[i].pathname == location.pathname)
        {
            elementClick(i, links);
        }
    }

    
    

    /*

    let html = 
    `<nav class="main-nav">
    <ul>
        <li><h1>GamerNet</h1></li>
        <li><a href="/" router>HOME</a></li>
        <li><a href="/profile" router>PROFILE</a></li>
        <li><button class="btn-bello-lo" `+ logFlagIn+ `>Log In</button></li>
        <li><button class="btn-bello-li" `+logFlagOut+`>Log Out</button></li>
    </ul>
    </nav>`;

    let baseCss = `<style>
    .btn-bello-li, .btn-bello-lo
    {
        background-color:purple;
        color:white;
        margin-left: 64px;
    border: 0;

    padding: 16px;
    }

    .btn-bello-li:hover, .btn-bello-lo:hover
    {
        cursor:pointer;
        background-color:white;
        color:black;
    }
    </style>`;

    */

    //document.querySelector('#app-navbar').innerHTML = baseCss + html;
    //document.querySelector('.btn-bello-li').onclick = () => config.logOut();
    //document.querySelector('.btn-bello-lo').onclick = () => config.initFlow();
}