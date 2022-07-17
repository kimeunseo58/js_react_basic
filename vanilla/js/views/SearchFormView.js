import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View{
    constructor(){
        console.log(tag, "constructor");
        super(qs("#search-form-view"));

        this.inputElement = qs("[type=text]", this.element);
        this.resetElement = qs("[type=reset]", this.element);
        this.showResetButton(false);
        this.bindEvent();
    }
    showResetButton(visible = true){
        this.resetElement.style.display = visible?"block":"none";
    }
    bindEvent(){
        on(this.inputElement, "keyup", () =>this.handleKeyup());
        on(this.element, "submit", event =>this.handleSunbmit(event));
        on(this.resetElement, "click", () =>this.handleReset());
    }
    handleKeyup(){
        console.log(tag,"handlekeyup", this.inputElement.value);
        const {value} =this.inputElement;
        this.showResetButton(value.length >0);
        if(value.length <= 0) this.handleReset();

    }

    handleSunbmit(event){
        event.preventDefault();
        console.log(tag, "handleSubmit");
        const {value} =this.inputElement;
        this.emit("@submit",{value});
    }
    handleReset(){
        console.log(tag, "handleReset");
        this.emit("@reset");
    }
}