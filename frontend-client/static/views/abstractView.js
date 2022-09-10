import { navigateTo } from "../router.js";
export default class
{
    constructor(params, href)
    {
        this.params = params;
        this.href = href;

        this.init();
        this.refresh();
    }

    setTitle(title)
    {
        document.title = title;
    }

    async getHtml()
    {

    }

    goTo = (url) =>
    {
        navigateTo(url);
    }

    goBack = (substrLen) =>
    {
        navigateTo(this.href.substr(0, this.href.length - substrLen));
    }

    async refresh()
    {
        document.querySelector('#app').innerHTML = '';
        await this.getHtml();
    }
}