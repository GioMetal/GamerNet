import abstractView from './abstractView.js';

export default class extends abstractView
{
    constructor(params, href)
    {
        super(params, href);
        this.setTitle('GamerNet - 404 NON TROVATO')
    }

    init()
    {
        
    }

    getHtml()
    {
        document.querySelector('#app').innerHTML = "404 NOT FOUND";
    }
}