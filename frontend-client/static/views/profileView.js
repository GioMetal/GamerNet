import { navigateTo } from '../router.js';
import abstractView from './abstractView.js';
import {initDropDown, getDropVal, selectDropVal} from  '../classes/dropdown-reusable.js';



export default class extends abstractView
{
    constructor(params)
    {
        super(params);
        this.setTitle('GamerNet')
    }

    init()
    {
        this.editable = false;
        this.profile = undefined;
        this.checkers = [];
        this.errorMessage = '';
        this.titleCharsLeft = 128;
        this.contentCharsLeft = 256;
    }

    decodeSex(sex)
    {
        switch(sex)
        {
            case 0:
                return 'Maschio';
            case 1:
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
            
            let dbval = getDropVal('.sex-dp');
            if(dbval == -1)
            {
                dbval = this.profile.sex;
            }

            if(this.textfield.value == '')
            {
                this.textfield.value = this.profile.username;
            }

            if(this.textfieldBio.value == '')
            {
                this.textfieldBio.value = this.profile.about;
            }

            console.log('CONTRO CHI PROTESTI AO: ' + getDropVal('.sex-dp'));
            let userBody = 
            {
                username:this.textfield.value,
                about:this.textfieldBio.value,
                sex:dbval
            }

            let promise = await fetch("http://localhost:8081/api/v1/user/"+this.params[1], {'body': JSON.stringify(userBody), method:'PUT', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})
            
            if(promise.status == 401) // maybe i should make a global helper function to allowing me to send requests in a safe manner, with error handing encapsulated.
            {
                await config.doRefreshToken(); // request failed because access token has expired, by initing the flow, once logged it will try and refresh the token
                promise = await fetch("http://localhost:8081/api/v1/user/"+this.params[1], {'body': JSON.stringify(userBody), method:'PUT', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})
                await this.refresh();
                return;
            }
            
            this.errorMessage=await promise.text();
            console.log(this.errorMessage);
            
            //console.log(checkCount);
        }

        //this.refresh();
        await this.getHtml();
        
    }

    ngForPosts = function(obj)
    {
        let html = "";
        for(let i = 0; i < obj.length; i++)
        {
            console.log();
            html +=
            `
            <div class="postget-container">
                <div class="postget-title">
                    <div class="postget-title-field">`+obj[i].title+`</div>
                    <button id="mod-post-btn" class="posttget-btn-edit">MODIFICA</button>
                </div>
                <div class="postget-content">`+obj[i].content+`</div>
                <div class="postget-btnsdock">
                    <button>LIKE</button>
                    <button>DISLIKE</button>
                    <div hidden>Pubblicato: 18/09/2022 alle 20:12</div>
                    <div class="text-float-right">Modificato: `+obj[i].creation_date+` alle `+obj[i].creation_time+`</div>
                </div>
            </div>
            `;
        }

        return html;
    }

    async getHtml()
    {  

        let isMe = config.getAccessToken().sub == this.params[1];
        //console.log(this.editable);
        let promise = await fetch("http://localhost:8081/api/v1/user/"+this.params[1], {method:'GET', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})
        let postsPromise = await fetch("http://localhost:8081/api/v1/posts/"+this.params[1], {method:'GET', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})

        if(promise.status == 401) // maybe i should make a global helper function to allowing me to send requests in a safe manner, with error handing encapsulated.
        {
            await config.doRefreshToken(); // request failed because access token has expired, by initing the flow, once logged it will try and refresh the token
            location.href = location.href;
            return;
        }

        if(promise.status == 404)
        {
            navigateTo("/not-found");
            return;
        }

        if(postsPromise.status == 401) // maybe i should make a global helper function to allowing me to send requests in a safe manner, with error handing encapsulated.
        {
            await config.doRefreshToken(); // request failed because access token has expired, by initing the flow, once logged it will try and refresh the token
            location.href = location.href;
            return;
        }

        let postsResult = await postsPromise.json();
        console.log(postsResult);

        let result = await promise.json();
        this.profile = result;
        let inEditMode = !this.editable ? '' : 'hidden';
        let outEditMode = this.editable ? '' : 'hidden';


        let isMeAndInEditMode = isMe && this.editable ? '' : 'hidden';
        let isMeAndOutEditMode = isMe && !this.editable ? '' : 'hidden';
        let doIHaveAGender = result.sex > -1 && result.sex < 2 ? '' : 'hidden';
        let isMyProfile = isMe ? '' : 'hidden';
        //console.log(isMeAndInEditMode);
        //console.log(isMeAndOutEditMode);
        console.log(doIHaveAGender + " " + result.sex);
        
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
                        <h2 `+doIHaveAGender+`>Sesso</h2>
                        <h3 `+doIHaveAGender+`>`+this.decodeSex(result.sex)+`</h3>
                        <h2>Su di me</h2>
                        <h3>`+this.resolveAbout(result.about)+`</h3>
                    </div>
                    <div `+outEditMode+`>
                        <h3 class="labelz">Nuovo Username</h3><input id="usernamefield"class="pedit-textbox" type="text" placeholder="`+result.username+`">
                        <h3 class="labelz">Nuova Biografia</h3><textarea rows="20" cols="47" id="usernamefield-bio" class="pedit-textbox-bio" placeholder="`+this.resolveAbout(result.about)+`"></textarea>
                        <div class="label-grid">
                            <div class="label-grid-st">Sesso</div>
                            <div class="dropdown">
                                <div class="dropdown-transform">
                                    <div class="sex-dp">
                                    <div class="dropdown-value"></div>
                                    <div class="dropdown-options">
                                        <div class="dropdown-option">Maschio</div>
                                        <div class="dropdown-option">Femmina</div>
                                        <div class="dropdown-option">Non specificato</div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <main>
                    <div class="home-body">
                        <div `+isMyProfile+`>
                            <div class="post-container">
                                <div class="post-title-bar">
                                    <input id="title" maxlength="128"></input>
                                    <div id="titleChars" class="post-counter-title-chars">0/128</div>
                                </div>
                                <textarea rows="8" maxlength="256" id="content" class="post-area"></textarea>
                            </div>
                        <div class="post-footer">
                            <div class="post-btn-left">
                                <div class="dropdown">
                                    <div class="dropdown-transform">
                                        <div class="vis-dp">
                                            <div class="dropdown-value"></div>
                                            <div class="dropdown-options">
                                            <div class="dropdown-option">Pubblico</div>
                                            <div class="dropdown-option">Privato</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="post-btn-submit">Posta</button>
                        </div>
                        <div class="post-btn-right">
                            <div id="contentChars" class="post-counter-chars">0/256</div>
                        </div>
                    </div>
                </div>
                <h1 id="big-title">`+'TEST GRIGLIA, PER ORA LASCIAMO QUESTO SPAZIO VUOTO'+`</h1>//
                `+
                this.ngForPosts(postsResult);
                +`
            </div>
        </main>
    </div>    
        `;
   
        let css = 
        `<style>
            .label-grid-st{margin-left: 1rem;vertical-align:center;text-weight:bold;color:white;display:flex;font-size:1.2rem;}
            .label-grid{display: grid;grid-template-columns: auto auto;}
            .pedit-textbox{ margin: 1rem;}
            .pedit-textbox-bio{margin:1rem;}
            .labelz{display:inline;margin: 1rem;}
            .container-profile{display:grid;grid-template-columns: 400px auto;}
            .container-profile h3{color:white; margin: 1rem;}
            .container-profile h2{color:white;margin: 1rem;}
            aside{height: calc(100vh - 4rem);background-color:gray;}
            .centered-element{display: flex;justify-content: flex-start;align-items: center;}
            .centered-element img{width: 100px;height: 100px; margin: 1rem;display: inline;}
            .home-body{ padding-left:16rem; padding-right:16rem; display:grid; grid-template-rows: auto auto; text-align:center; }
            .centered-element button{padding:1rem;background-color:orange;border-color:white;border-style:solid;}
            .centered-element button:hover{cursor:pointer;color:gray;background-color:white;}
            .proffy h3{white-space:pre;}
            .dropdown{display:inline-block;}
            .dropdown-value{text-align:center;padding-left:2rem;padding-right:2rem;background-color:rgb(170,170,170);padding-top:0.25rem;padding-bottom:0.25rem;}
            .dropdown-option{text-align:center;background-color:rgb(180, 180, 180);width:100%; padding-top:0.25rem; padding-bottom:0.25rem;}
            .dropdown-transform{width:15rem;}
            .dropdown-value:hover{background-color:rgb(200,200,200);cursor:pointer;}
            .dropdown-option:hover{background-color:rgb(150,150,150);cursor:pointer;}
            .post-container{background-color:rgb(180, 180, 180);display: grid;grid-template-rows: 1.5rem auto;}
            .post-title-bar{display:inline-grid;grid-template-columns: 90% auto;}
            .post-counter-title-chars{text-align:right;}
            .post-footer{display:grid;grid-template-columns:20rem auto;}
            .post-btn-left{display:inline-grid;grid-template-columns:auto auto;}
            .post-counter-chars{float: right;}
            .post-btn-submit { background-color:orange; border-style:none; color:white; height:1.6rem;}
            .post-btn-submit:hover { background-color:gray; }
            .post-btn-submit:active {background-color:orange;}
            .postget-container{display:grid;grid-template-rows: 2rem auto 2rem;}
            .postget-title{display:grid;grid-template-columns: 80% auto;text-align:left;background-color:rgb(200,200,200);}
            .postget-content{border-style:solid;border-width:1px;border-top:0;text-align:left;}
            .posttget-btn-edit {height:1.5rem;}
            .postget-btnsdock{background-color:rgb(200,200,200);display:grid;grid-template-columns: 5rem 5rem auto;border-style:solid;border-width:1px;height:1.33rem;border-top:0;}
            .text-float-right{text-align:right;}
            .postget-title{border-style:solid; border-width:1px;}
            .postget-title-field{padding-top:0.33rem;padding-left:0.33rem;}
        </style>
        `;

        document.querySelector('#app').innerHTML = css + html;
        document.querySelector('#editin').onclick = () => this.enableProfileEdit();
        document.querySelector('#editout').onclick = () => this.enableProfileEdit();

        //this.checkers[this.encodeSexA(this.profile.sex)].checked = true;
        this.textfield = document.querySelector('#usernamefield');
        this.textfieldBio = document.querySelector('#usernamefield-bio');

        initDropDown('Sesso', '.sex-dp');
        selectDropVal(result.sex, '.sex-dp');
        initDropDown('Visibilità', '.vis-dp');
        selectDropVal(0, '.vis-dp');
        let title=document.querySelector('#title');
        let content = document.querySelector('#content');
        let titleChars = document.querySelector('#titleChars');
        let contentChars = document.querySelector('#contentChars');
        
        title.oninput=()=>{this.OnTitleInput(titleChars, title)};
        content.oninput=()=>{this.OnContentInput(contentChars, content)};
        titleChars.innerHTML= "128/128";
        contentChars.innerHTML= "256/256";

        let post = document.querySelector('.post-btn-submit').onclick= async() => {await this.UserPost(config.getAccessToken().sub, title.value, content.value, getDropVal('.vis-dp'))};


        

        /*
        if(promise.status == 404)
        {
            navigateTo("/not-found");
            return;
        }
        */
    }

    OnTitleInput = function(titleChars, title)
    {
        
        this.titleCharsLeft = 128 - title.value.length;
        titleChars.innerHTML= this.titleCharsLeft + "/128";
    }

    OnContentInput = function(contentChars, content)
    {

        this.contentCharsLeft = 256 - content.value.length;
        contentChars.innerHTML= this.contentCharsLeft+ "/256";
    }

    UserPost = async function(id, title, content, visibility)
    {
        if(title.length > 128)
        {
            return;
        }

        if(content.length > 256)
        {
            return;
        }

        let body = 
        {
            id_user : id,
            id_profile : this.params[1],
            title : title,
            content : content,
            visibility : visibility
        };

        let promise = await fetch("http://localhost:8081/api/v1/posts/newpost", {'body': JSON.stringify(body), method:'POST', mode:'cors',  headers:{ 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}});
        console.log(await promise.text());
    }
}
