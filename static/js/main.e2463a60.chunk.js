(this["webpackJsonpgoit-react-hw-03-image-finder"]=this["webpackJsonpgoit-react-hw-03-image-finder"]||[]).push([[0],{14:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(9),s=a.n(r),i=(a(14),a(2)),o=a(3),h=a(5),l=a(4),u=a(0),m=function(e){Object(h.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={searchItem:""},e.handleFormChange=function(t){e.setState({searchItem:t.currentTarget.value.toLowerCase()})},e.handleSubmit=function(t){t.preventDefault(),""!==e.state.searchItem.trim()?(e.props.onSubmit(e.state.searchItem),e.setState({searchItem:""})):console.log("enter image name")},e}return Object(o.a)(a,[{key:"render",value:function(){return Object(u.jsx)("header",{className:"Searchbar",children:Object(u.jsxs)("form",{className:"SearchForm",onSubmit:this.handleSubmit,children:[Object(u.jsx)("button",{type:"submit",className:"SearchForm-button",onClick:this.handleSubmit,children:Object(u.jsx)("span",{className:"SearchForm-button-label",children:"Search"})}),Object(u.jsx)("input",{onChange:this.handleFormChange,className:"SearchForm-input",type:"text",placeholder:"Search images and photos"})]})})}}]),a}(n.Component),b=function(e){Object(h.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={page:1,per_page:12,searchResult:null},e}return Object(o.a)(a,[{key:"componentDidUpdate",value:function(e,t){var a=this,n=this.props.searchItem;e.searchItem!==this.props.searchItem&&fetch("".concat("https://pixabay.com/api/","?q=").concat(n,"&page=").concat(this.state.page,"&key=").concat("22569115-02a432c6c1c62bbb3a59801b7","&image_type=photo&orientation=horizontal&per_page=").concat(this.state.per_page,"}")).then((function(e){return e.json()})).then((function(e){var t=e.hits;return a.props.searchResult(t),a.setState({searchResult:t})}))}},{key:"render",value:function(){return Object(u.jsx)("section",{children:Object(u.jsx)("ul",{className:"ImageGallery",children:this.props.children})})}}]),a}(n.Component),p=function(e){var t=e.id,a=e.src,n=e.tag;return Object(u.jsx)("li",{className:"ImageGalleryItem",children:Object(u.jsx)("img",{src:a,alt:n,className:"ImageGalleryItem-image"})},t)},j=(a(7),a(8),function(e){Object(h.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={searchItem:"",searchResult:null},e.handleFormSubmit=function(t){e.setState({searchItem:t})},e.handleSearchResult=function(t){e.setState({searchResult:t})},e}return Object(o.a)(a,[{key:"render",value:function(){return console.log(this.state.searchItem),console.log(this.state.searchResult),Object(u.jsxs)("div",{children:[Object(u.jsx)(m,{onSubmit:this.handleFormSubmit}),Object(u.jsx)(b,{searchItem:this.state.searchItem,searchResult:this.handleSearchResult,children:this.state.searchItem&&this.state.searchResult&&this.state.searchResult.map((function(e){return Object(u.jsx)(p,{id:e.id,src:e.webformatURL,tag:e.tag},e.id)}))})]})}}]),a}(n.Component)),d=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,18)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))};s.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(j,{})}),document.getElementById("root")),d()},7:function(e,t){},8:function(e,t){}},[[16,1,2]]]);
//# sourceMappingURL=main.e2463a60.chunk.js.map