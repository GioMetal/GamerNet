import { navigateTo } from "../router.js";
export default class
{
    constructor(params, href)
    {
        this.params = params;
        this.baseHtml = "";
        this.baseCss = "";
        this.href = href;

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
        this.baseHtml = "";
        this.baseCss = "";
        document.querySelector('#app').innerHTML = '';
        await this.getHtml();
    }
}