import { navigateTo } from '../router.js';
import abstractView from './abstractView.js';



export default class extends abstractView
{
    constructor(params)
    {
        super(params);
        this.setTitle('MiaLib - Time Line')
        
    }

    async getHtml()
    {  
        let showLogOut = config.getAccessToken() ? true : false;
        let ac = config.getAccessToken();
        console.log(this.params[1]);
        let promise = await fetch("http://localhost:8081/api/v1/user/"+this.params[1], {method:'GET', mode:'cors',  headers:{'Sec-Fetch-Site': 'cross-site', 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})
        let result = await promise.text();

        let html =
        `
            <div class="home-body">
                <h1 id="big-title">`+result+`</h1>
                
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
