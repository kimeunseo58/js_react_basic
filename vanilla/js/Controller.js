const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView, searchResultView}) {
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.subscribeViewEvents();
  }

  subscribeViewEvents(){
    this.searchFormView.on("@submit", (event) =>
      this.search(event.detail.value)
    ).on("@reset", () => this.reset());

  }
  search(searchKeyword){
    console.log(tag,searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }
  reset(){
    console.log(tag, "reset");
    this.store.searchKeyword="";
    this.store.searchResult=[];
    this.render();
  }
  render(){
    if(this.store.searchKeyword.length>0){
      this.searchResultView.show(this.store.searchResult);
      return;
    }
    this.searchResultView.hide();
  }
}