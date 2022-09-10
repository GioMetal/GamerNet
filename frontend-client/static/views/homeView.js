import { navigateTo } from '../router.js';
import abstractView from './abstractView.js';



export default class extends abstractView
{
    constructor(params)
    {
        super(params);
        this.setTitle('GamerNet - Home')
    }

    async getHtml()
    {  
        let html =
        `
            <div class="home-body">
                <h1 id="big-title">Benvenuti su GamerNet</h1>
                <h3>In lavorazione...</h3>
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
