import { navigateTo } from '../router.js';
import abstractView from './abstractView.js';
let curLimit=10;
let curPage=0;


export default class extends abstractView
{
    
    constructor(params)
    {
        super(params);
        this.setTitle('GamerNet - Time Line')
        
    }

    init()
    {
        
    }

    async getHtml()
    {  
        curLimit = 10;
        curPage = 0;
        let showLogOut = config.getAccessToken() ? true : false;
        let ac = config.getAccessToken();
        console.log('WHAAT IS HAPPENING?')
        
        let promise = await fetch("http://localhost:8081/api/v1/timeline/history?limit="+curLimit+"&page="+curPage+"", {method:'GET', mode:'cors',  headers:{'Sec-Fetch-Site': 'cross-site', 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})
        if(promise.status == 401)
        {
            await config.doRefreshToken();
           //promise = await fetch("http://localhost:8081/api/v1/timeline/history?limit="+curLimit+"&page="+curPage+"", {method:'GET', mode:'cors',  headers:{'Sec-Fetch-Site': 'cross-site', 'Authorization': 'Bearer '+ config.getAuthToken(), 'Content-Type': 'application/json'}})
            location.href = location.href; 
            return;
        }
        
        let result = await promise.text();
        console.log(result);

        let html =
        `
            <div class="home-body">
                <h1 id="big-title">`+result+`</h1>
                <button id="expand-obj">Espandi</button>
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
        document.querySelector('#expand-obj').onclick= async () => {await this.getTimelineEntities()};
    }

    async getTimelineEntities()
    {
        curPage++;

        console.log(curLimit);
        console.log(curPage);

    }
}
