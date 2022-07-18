import KeywordListView from "./KeywordListView.js";
import { delegate, formatRelativeDate, qs } from "../helpers.js";

export default class HistoryListView extends KeywordListView{
    constructor(){
        super(qs("#history-list-view"), new Template);
    }
    bindEvent(){
        delegate(this.element, "click", "button.btn-remove", event =>this.handleClickRemove(event));
        super.bindEvent();
    }
    handleClickRemove(event){
        const value = event.target.parentElement.dataset.keyword;
        this.emit("@remove", {value} );
    }
}
class Template{
    getList(data = []){
        return `
            <ul class ="list">
                ${data.map(this._getItem).join("")}
            </ul>
        `;
    }
    _getItem({id, keyword, date}){
        return `
            <li data-keyword="${keyword}">
                ${keyword}
                <span class ="data">${formatRelativeDate(date)}</span>
                <button class ="btn-remove"></button>
            </li>
        `;
    }
    getEmpty(){
        return `
            <div class = "empty-box">최근 검색어가 없습니다.</div>
        `;
    }
}