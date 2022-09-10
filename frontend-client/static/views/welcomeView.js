import abstractView from './abstractView.js';

export default class extends abstractView
{
    constructor(params, href)
    {
        super(params, href);
        this.setTitle('MiaLib - Benvenuti');
    }

    init()
    {

    }

    getHtml()
    {
        let html = 
        `<img src="userimgs/asd.bmp" alt="">
        <h1>Accedi (potrai anche registrarti qualora tu non l'abbia ancora fatto!)"</h1>
        <button class="logInBtn">Log In</button>`;

        let css = 
        `<style>
        body
        {
            background-color:white;
        }
        </style>`;


        document.querySelector('#app').innerHTML = css + html;
        document.querySelector('.logInBtn').onclick = () => {config.initFlow()};
    }
}