(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6233],{46427:function(t,e,n){var o=n(19612),r=n(566),i=n(42884);function SetCache(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new o;++e<n;)this.add(t[e])}SetCache.prototype.add=SetCache.prototype.push=r,SetCache.prototype.has=i,t.exports=SetCache},68795:function(t){t.exports=function(t,e){for(var n=-1,o=null==t?0:t.length;++n<o;)if(e(t[n],n,t))return!0;return!1}},66425:function(t,e,n){var o=n(66634),r=n(12387);t.exports=function baseIsEqual(t,e,n,i,a){return t===e||(null!=t&&null!=e&&(r(t)||r(e))?o(t,e,n,i,baseIsEqual,a):t!=t&&e!=e)}},66634:function(t,e,n){var o=n(98624),r=n(49507),i=n(10091),a=n(62080),s=n(9e3),l=n(12068),u=n(5067),c=n(8160),d="[object Arguments]",h="[object Array]",p="[object Object]",f=Object.prototype.hasOwnProperty;t.exports=function(t,e,n,g,v,y){var E=l(t),b=l(e),m=E?h:s(t),_=b?h:s(e);m=m==d?p:m,_=_==d?p:_;var C=m==p,R=_==p,Q=m==_;if(Q&&u(t)){if(!u(e))return!1;E=!0,C=!1}if(Q&&!C)return y||(y=new o),E||c(t)?r(t,e,n,g,v,y):i(t,e,m,n,g,v,y);if(!(1&n)){var x=C&&f.call(t,"__wrapped__"),w=R&&f.call(e,"__wrapped__");if(x||w){var S=x?t.value():t,O=w?e.value():e;return y||(y=new o),v(S,O,n,g,y)}}return!!Q&&(y||(y=new o),a(t,e,n,g,v,y))}},65225:function(t){t.exports=function(t,e){return t.has(e)}},49507:function(t,e,n){var o=n(46427),r=n(68795),i=n(65225);t.exports=function(t,e,n,a,s,l){var u=1&n,c=t.length,d=e.length;if(c!=d&&!(u&&d>c))return!1;var h=l.get(t),p=l.get(e);if(h&&p)return h==e&&p==t;var f=-1,g=!0,v=2&n?new o:void 0;for(l.set(t,e),l.set(e,t);++f<c;){var y=t[f],E=e[f];if(a)var b=u?a(E,y,f,e,t,l):a(y,E,f,t,e,l);if(void 0!==b){if(b)continue;g=!1;break}if(v){if(!r(e,function(t,e){if(!i(v,e)&&(y===t||s(y,t,n,a,l)))return v.push(e)})){g=!1;break}}else if(!(y===E||s(y,E,n,a,l))){g=!1;break}}return l.delete(t),l.delete(e),g}},10091:function(t,e,n){var o=n(79029),r=n(48709),i=n(600),a=n(49507),s=n(39883),l=n(97782),u=o?o.prototype:void 0,c=u?u.valueOf:void 0;t.exports=function(t,e,n,o,u,d,h){switch(n){case"[object DataView]":if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)break;t=t.buffer,e=e.buffer;case"[object ArrayBuffer]":if(t.byteLength!=e.byteLength||!d(new r(t),new r(e)))break;return!0;case"[object Boolean]":case"[object Date]":case"[object Number]":return i(+t,+e);case"[object Error]":return t.name==e.name&&t.message==e.message;case"[object RegExp]":case"[object String]":return t==e+"";case"[object Map]":var p=s;case"[object Set]":var f=1&o;if(p||(p=l),t.size!=e.size&&!f)break;var g=h.get(t);if(g)return g==e;o|=2,h.set(t,e);var v=a(p(t),p(e),o,u,d,h);return h.delete(t),v;case"[object Symbol]":if(c)return c.call(t)==c.call(e)}return!1}},62080:function(t,e,n){var o=n(40989),r=Object.prototype.hasOwnProperty;t.exports=function(t,e,n,i,a,s){var l=1&n,u=o(t),c=u.length;if(c!=o(e).length&&!l)return!1;for(var d=c;d--;){var h=u[d];if(!(l?h in e:r.call(e,h)))return!1}var p=s.get(t),f=s.get(e);if(p&&f)return p==e&&f==t;var g=!0;s.set(t,e),s.set(e,t);for(var v=l;++d<c;){var y=t[h=u[d]],E=e[h];if(i)var b=l?i(E,y,h,e,t,s):i(y,E,h,t,e,s);if(!(void 0===b?y===E||a(y,E,n,i,s):b)){g=!1;break}v||(v="constructor"==h)}if(g&&!v){var m=t.constructor,_=e.constructor;m!=_&&"constructor"in t&&"constructor"in e&&!("function"==typeof m&&m instanceof m&&"function"==typeof _&&_ instanceof _)&&(g=!1)}return s.delete(t),s.delete(e),g}},39883:function(t){t.exports=function(t){var e=-1,n=Array(t.size);return t.forEach(function(t,o){n[++e]=[o,t]}),n}},566:function(t){t.exports=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this}},42884:function(t){t.exports=function(t){return this.__data__.has(t)}},97782:function(t){t.exports=function(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}},42077:function(t,e,n){var o=n(66425);t.exports=function(t,e){return o(t,e)}},6233:function(t,e,n){"use strict";var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function __(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(__.prototype=e.prototype,new __)}),i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},a=this&&this.__spreadArrays||function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;for(var o=Array(t),r=0,e=0;e<n;e++)for(var i=arguments[e],a=0,s=i.length;a<s;a++,r++)o[r]=i[a];return o},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},l=s(n(2265)),u=s(n(54887)),c=s(n(42077)),d=s(n(38707)),h=function(t){function ReactQuill(e){var n=t.call(this,e)||this;n.dirtyProps=["modules","formats","bounds","theme","children"],n.cleanProps=["id","className","style","placeholder","tabIndex","onChange","onChangeSelection","onFocus","onBlur","onKeyPress","onKeyDown","onKeyUp"],n.state={generation:0},n.selection=null,n.onEditorChange=function(t,e,o,r){var i,a;"text-change"===t?null===(i=n.onEditorChangeText)||void 0===i||i.call(n,n.editor.root.innerHTML,e,r,n.unprivilegedEditor):"selection-change"===t&&(null===(a=n.onEditorChangeSelection)||void 0===a||a.call(n,e,r,n.unprivilegedEditor))};var o=n.isControlled()?e.value:e.defaultValue;return n.value=null!=o?o:"",n}return r(ReactQuill,t),ReactQuill.prototype.validateProps=function(t){if(l.default.Children.count(t.children)>1)throw Error("The Quill editing area can only be composed of a single React element.");if(l.default.Children.count(t.children)){var e=l.default.Children.only(t.children);if((null==e?void 0:e.type)==="textarea")throw Error("Quill does not support editing on a <textarea>. Use a <div> instead.")}if(this.lastDeltaChangeSet&&t.value===this.lastDeltaChangeSet)throw Error("You are passing the `delta` object from the `onChange` event back as `value`. You most probably want `editor.getContents()` instead. See: https://github.com/zenoamaro/react-quill#using-deltas")},ReactQuill.prototype.shouldComponentUpdate=function(t,e){var n,o=this;if(this.validateProps(t),!this.editor||this.state.generation!==e.generation)return!0;if("value"in t){var r=this.getEditorContents(),i=null!=(n=t.value)?n:"";this.isEqualValue(i,r)||this.setEditorContents(this.editor,i)}return t.readOnly!==this.props.readOnly&&this.setEditorReadOnly(this.editor,t.readOnly),a(this.cleanProps,this.dirtyProps).some(function(e){return!c.default(t[e],o.props[e])})},ReactQuill.prototype.shouldComponentRegenerate=function(t){var e=this;return this.dirtyProps.some(function(n){return!c.default(t[n],e.props[n])})},ReactQuill.prototype.componentDidMount=function(){this.instantiateEditor(),this.setEditorContents(this.editor,this.getEditorContents())},ReactQuill.prototype.componentWillUnmount=function(){this.destroyEditor()},ReactQuill.prototype.componentDidUpdate=function(t,e){var n=this;if(this.editor&&this.shouldComponentRegenerate(t)){var o=this.editor.getContents(),r=this.editor.getSelection();this.regenerationSnapshot={delta:o,selection:r},this.setState({generation:this.state.generation+1}),this.destroyEditor()}if(this.state.generation!==e.generation){var i=this.regenerationSnapshot,o=i.delta,a=i.selection;delete this.regenerationSnapshot,this.instantiateEditor();var s=this.editor;s.setContents(o),postpone(function(){return n.setEditorSelection(s,a)})}},ReactQuill.prototype.instantiateEditor=function(){this.editor?this.hookEditor(this.editor):this.editor=this.createEditor(this.getEditingArea(),this.getEditorConfig())},ReactQuill.prototype.destroyEditor=function(){this.editor&&this.unhookEditor(this.editor)},ReactQuill.prototype.isControlled=function(){return"value"in this.props},ReactQuill.prototype.getEditorConfig=function(){return{bounds:this.props.bounds,formats:this.props.formats,modules:this.props.modules,placeholder:this.props.placeholder,readOnly:this.props.readOnly,scrollingContainer:this.props.scrollingContainer,tabIndex:this.props.tabIndex,theme:this.props.theme}},ReactQuill.prototype.getEditor=function(){if(!this.editor)throw Error("Accessing non-instantiated editor");return this.editor},ReactQuill.prototype.createEditor=function(t,e){var n=new d.default(t,e);return null!=e.tabIndex&&this.setEditorTabIndex(n,e.tabIndex),this.hookEditor(n),n},ReactQuill.prototype.hookEditor=function(t){this.unprivilegedEditor=this.makeUnprivilegedEditor(t),t.on("editor-change",this.onEditorChange)},ReactQuill.prototype.unhookEditor=function(t){t.off("editor-change",this.onEditorChange)},ReactQuill.prototype.getEditorContents=function(){return this.value},ReactQuill.prototype.getEditorSelection=function(){return this.selection},ReactQuill.prototype.isDelta=function(t){return t&&t.ops},ReactQuill.prototype.isEqualValue=function(t,e){return this.isDelta(t)&&this.isDelta(e)?c.default(t.ops,e.ops):c.default(t,e)},ReactQuill.prototype.setEditorContents=function(t,e){var n=this;this.value=e;var o=this.getEditorSelection();"string"==typeof e?t.setContents(t.clipboard.convert(e)):t.setContents(e),postpone(function(){return n.setEditorSelection(t,o)})},ReactQuill.prototype.setEditorSelection=function(t,e){if(this.selection=e,e){var n=t.getLength();e.index=Math.max(0,Math.min(e.index,n-1)),e.length=Math.max(0,Math.min(e.length,n-1-e.index)),t.setSelection(e)}},ReactQuill.prototype.setEditorTabIndex=function(t,e){var n;(null===(n=null==t?void 0:t.scroll)||void 0===n?void 0:n.domNode)&&(t.scroll.domNode.tabIndex=e)},ReactQuill.prototype.setEditorReadOnly=function(t,e){e?t.disable():t.enable()},ReactQuill.prototype.makeUnprivilegedEditor=function(t){return{getHTML:function(){return t.root.innerHTML},getLength:t.getLength.bind(t),getText:t.getText.bind(t),getContents:t.getContents.bind(t),getSelection:t.getSelection.bind(t),getBounds:t.getBounds.bind(t)}},ReactQuill.prototype.getEditingArea=function(){if(!this.editingArea)throw Error("Instantiating on missing editing area");var t=u.default.findDOMNode(this.editingArea);if(!t)throw Error("Cannot find element for editing area");if(3===t.nodeType)throw Error("Editing area cannot be a text node");return t},ReactQuill.prototype.renderEditingArea=function(){var t=this,e=this.props,n=e.children,o=e.preserveWhitespace,r={key:this.state.generation,ref:function(e){t.editingArea=e}};return l.default.Children.count(n)?l.default.cloneElement(l.default.Children.only(n),r):o?l.default.createElement("pre",i({},r)):l.default.createElement("div",i({},r))},ReactQuill.prototype.render=function(){var t;return l.default.createElement("div",{id:this.props.id,style:this.props.style,key:this.state.generation,className:"quill "+(null!=(t=this.props.className)?t:""),onKeyPress:this.props.onKeyPress,onKeyDown:this.props.onKeyDown,onKeyUp:this.props.onKeyUp},this.renderEditingArea())},ReactQuill.prototype.onEditorChangeText=function(t,e,n,o){if(this.editor){var r,i,a=this.isDelta(this.value)?o.getContents():o.getHTML();a!==this.getEditorContents()&&(this.lastDeltaChangeSet=e,this.value=a,null===(i=(r=this.props).onChange)||void 0===i||i.call(r,t,e,n,o))}},ReactQuill.prototype.onEditorChangeSelection=function(t,e,n){if(this.editor){var o,r,i,a,s,l,u=this.getEditorSelection(),d=!u&&t,h=u&&!t;!c.default(t,u)&&(this.selection=t,null===(r=(o=this.props).onChangeSelection)||void 0===r||r.call(o,t,e,n),d?null===(a=(i=this.props).onFocus)||void 0===a||a.call(i,t,e,n):h&&(null===(l=(s=this.props).onBlur)||void 0===l||l.call(s,u,e,n)))}},ReactQuill.prototype.focus=function(){this.editor&&this.editor.focus()},ReactQuill.prototype.blur=function(){this.editor&&(this.selection=null,this.editor.blur())},ReactQuill.displayName="React Quill",ReactQuill.Quill=d.default,ReactQuill.defaultProps={theme:"snow",modules:{},readOnly:!1},ReactQuill}(l.default.Component);function postpone(t){Promise.resolve().then(t)}t.exports=h}}]);