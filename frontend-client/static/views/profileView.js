import { navigateTo } from '../router.js';
import abstractView from './abstractView.js';



export default class extends abstractView
{
    constructor(params)
    {
        super(params);
        let ac = config.getAccessToken();
        this.setTitle('GamerNet - ' + ac.preferred_username)
        
    }

    decodeSex(sex)
    {
        switch(sex)
        {
            case true:
                return "Maschio";
            case false:
                return "Femmina";
            default: 
                return "Degenerato";
        }
    }

    resolveAbout(about)
    {
        if(about)
        {
            return about;
        }
        else
        {
            return "(vuoto)";
        }
    }

    async getHtml()
    {  
        let isMe = config.getAccessToken().sub == this.params[1] ? '' : 'hidden';
        console.log(this.params[1]);
        let promise = await fetch("http://localhost:8081/api/v1/user/"+this.params[1], {method:'GET', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})

        if(promise.status == 404)
        {
            navigateTo("/not-found");
            return;
        }

        let result = await promise.json();

        let html =
        `
            <div class="container-profile">
                <aside>
                    <div class="centered-element">
                        <img class="profile-bar-picture" src="userimgs/asd.bmp" alt="">
                        <button `+isMe+`>MODIFICA PROFILO</button>
                    </div>
                    <h2>`+result.username+`</h2>
                    
                    <h2>Sesso</h2>
                    <h3>`+this.decodeSex(result.sex)+`</h3>
                    <h2>Su di me</h2>
                    <h3>`+this.resolveAbout(result.about)+`</h3>
                </aside>
                <main>
                <div class="home-body">
                    <h1 id="big-title">`+'TEST GIRGLIA, PER ORA LASCIAMO QUESTO SPAZIO VUOTO'+`</h1>//
                </div>
            </main>
            </div>    
        `;

        let css = 
        `
        <style>
            .container-profile
            {
                display:grid;
                grid-template-columns: auto auto auto;
            }

            .container-profile h3
            {
                color:white;
                margin: 1rem;
            }

            .container-profile h2
            {
                color:white;
                margin: 1rem;
            }

            aside
            {
                height: calc(100vh - 4rem);
                width: 400px;
                background-color:gray;
   
            }
            .centered-element
            {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .centered-element img
            {
                width: 100px;
                height: 100px; 
                margin: 1rem;
                display: inline;
            }

            .home-body
            {
              
                margin-left: auto;
                text-align:center;
            }

            .centered-element button
            {
                padding:1rem;
                background-color:orange;
                border-color:white;
                border-style:solid;
                
            }
            .centered-element button:hover
            {
                cursor:pointer;
                color:gray;
                background-color:white;
            }
        </style>
        `;

        document.querySelector('#app').innerHTML = css + html;
    }
}
