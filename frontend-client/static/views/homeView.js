import { navigateTo } from '../router.js';
import abstractView from './abstractView.js';



export default class extends abstractView
{
    constructor(params)
    {
        super(params);
        this.setTitle('MiaLib - Home')
        
    }

    async getHtml()
    {  
        let showLogOut = config.getAccessToken() ? true : false;
        let ac = config.getAccessToken();
        let html =
        `
            <div class="home-body">
                <h1 id="big-title">Benvenuti su GamerNet</h1>
                <h3>In lavorazione...</h3>
                
                <h1>Ciao `+ ac.preferred_username +`!</h1>
                <h1>Io ti conosco, nella vita reale ti fai chiamare  `+ ac.given_name + ' ' + ac.family_name +`</h1>
                <h1>Conosco perfino il tuo indirizzo e-mail `+ ac.email +`</h1>
            </div>
        `;

        let css = 
        `
        <style>
            .home-body
            {
              
                margin-left: auto;
                text-align:center;
            }
        </style>
        `;

        document.querySelector('#app').innerHTML = css + html;
    }
}
