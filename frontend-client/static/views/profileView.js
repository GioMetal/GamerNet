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

    init()
    {
        this.editable = false;
        this.profile = undefined;
        this.checkers = [];
        this.errorMessage = '';
        
    }

    decodeSex(sex)
    {
        switch(sex)
        {
            case true:
                return 'Maschio';
            case false:
                return 'Femmina';
            default: 
                return 'Degenerato';
        }
    }

    encodeSexA(sex)
    {
        switch(sex)
        {
            case true:
                return 0;
            case false:
                return 1;
            case null: 
                return 2;
        }
    }

    encodeSexB(sex)
    {
        switch(sex)
        {
            case 0:
                return true;
            case 1:
                return false;
            case 2: 
                return null;
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

    checkerClick(id)
    {
        console.log(id + ' clicked')
        for(let i = 0; i < this.checkers.length; i++)
        {
            if(i != id)
            {
                this.checkers[i].checked = false;
            }
        }
    }

    async enableProfileEdit()
    {
        //console.log(this.profile.sex);
        this.editable = !this.editable;
        
        if(!this.editable)
        {
            let trueIndex = 0;
            for(let i = 0; i < this.checkers.length; i++)
            {
                if(this.checkers[i].checked)
                {
                    trueIndex = i;
                }  
            }
            
            let dbval = this.encodeSexB(trueIndex);
            console.log(this.textfield.value);

            if(this.textfield.value == '')
            {
                this.textfield.value = this.profile.username;
            }

            if(this.textfieldBio.value == '')
            {
                this.textfieldBio.value = this.profile.about;
            }


            let userBody = 
            {
                username:this.textfield.value,
                about:this.textfieldBio.value,
                sex:dbval
            }

            let promise = await fetch("http://localhost:8081/api/v1/user/"+this.params[1], {'body': JSON.stringify(userBody), method:'PUT', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})
            this.errorMessage=await promise.text();
            console.log(this.errorMessage);
            //console.log(checkCount);
        }

        //this.refresh();
        await this.getHtml();
        
    }

    async getHtml()
    {  

        let isMe = config.getAccessToken().sub == this.params[1];
        //console.log(this.editable);
        let promise = await fetch("http://localhost:8081/api/v1/user/"+this.params[1], {method:'GET', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})

        if(promise.status == 401) // maybe i should make a global helper function to allowing me to send requests in a safe manner, with error handing encapsulated.
        {
            await config.initFlow(); // request failed because access token has expired, by initing the flow, once logged it will try and refresh the token
            promise = await fetch("http://localhost:8081/api/v1/user/"+this.params[1], {method:'GET', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})
        }

        if(promise.status == 404)
        {
            navigateTo("/not-found");
            return;
        }

        let result = await promise.json();
        this.profile = result;
        let inEditMode = !this.editable ? '' : 'hidden';
        let outEditMode = this.editable ? '' : 'hidden';


        let isMeAndInEditMode = isMe && this.editable ? '' : 'hidden';
        let isMeAndOutEditMode = isMe && !this.editable ? '' : 'hidden';

        //console.log(isMeAndInEditMode);
        //console.log(isMeAndOutEditMode);
        
        let html =
        `
            <div class="container-profile">
                <aside>
                   
                    <div class="centered-element">
                        <img class="profile-bar-picture" src="userimgs/asd.bmp" alt="">
                        <button `+isMeAndInEditMode+` id="editin">CONFERMA MODIFICHE</button>
                        <button `+isMeAndOutEditMode+` id="editout">MODIFICA PROFILO</button>
                    </div>
                    <div class="proffy" `+inEditMode+` >
                        <h2>`+result.username+`</h2>
                        
                        <h2>Sesso</h2>
                        <h3>`+this.decodeSex(result.sex)+`</h3>
                        <h2>Su di me</h2>
                        <h3>`+this.resolveAbout(result.about)+`</h3>
                    </div>

                    <div `+outEditMode+`>
                        <h3 class="labelz">Nuovo Username</h3><input id="usernamefield"class="pedit-textbox" type="text" placeholder="`+result.username+`">
                        <h3 class="labelz">Nuova Biografia</h3><textarea rows="20" cols="47" id="usernamefield-bio" class="pedit-textbox-bio" placeholder="`+this.resolveAbout(result.about)+`"></textarea>
                        
                        <h3 class="labelz-h2">Sesso</h3>
                        <p class="labelz">Maschio</p><input id="checker" type="checkbox">
                        <p class="labelz">Femmina</p><input id="checker" type="checkbox">
                        <p class="labelz">Non specificato</p><input id="checker" type="checkbox">
                    </div>
                </aside>
                <main>
                <div class="home-body">
                    <h1 id="big-title">`+'TEST GIRGLIA, PER ORA LASCIAMO QUESTO SPAZIO VUOTO'+`</h1>//
                </div>
            </main>
            </div>    
        `;
        //`+checkersHtml+`
        let css = 
        `
        <style>
            
            .pedit-textbox
            {
                margin: 1rem;
            }
            .pedit-textbox-bio
            {
                margin:1rem;
        
            }
            .labelz
            {
                display:inline;
                margin: 1rem;
            }
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

            .proffy h3
            {
                white-space:pre;
            }
        </style>
        `;

        document.querySelector('#app').innerHTML = css + html;
        document.querySelector('#editin').onclick = () => this.enableProfileEdit();
        document.querySelector('#editout').onclick = () => this.enableProfileEdit();

        this.checkers = document.querySelectorAll('#checker');
        for(let i = 0; i < this.checkers.length; i++)
        {
            this.checkers[i].onclick = () => this.checkerClick(i);
        }

        this.checkers[this.encodeSexA(this.profile.sex)].checked = true;
        this.textfield = document.querySelector('#usernamefield');
        this.textfieldBio = document.querySelector('#usernamefield-bio');

        
    }
}
