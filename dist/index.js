/*!
 *  name: @feizheng/react-draggable-tree
 *  description: Draggable tree for react.
 *  homepage: https://github.com/afeiship/react-draggable-tree#readme
 *  version: 1.0.9
 *  date: 2020-09-07T06:36:58.503Z
 *  license: MIT
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ReactDraggableTree=t():e.ReactDraggableTree=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("@feizheng/next-swap")},function(e,t){e.exports=require("@feizheng/noop")},function(e,t){e.exports=require("@feizheng/react-tree")},function(e,t){e.exports=require("classnames")},function(e,t){e.exports=require("react-dom")},function(e,t){e.exports=require("sortablejs")},function(e,t,n){"use strict";n.r(t);var r=n(2),o=n.n(r),i=n(3),u=n.n(i),a=n(4),c=n.n(a),f=n(5),l=n.n(f),p=n(0),s=n.n(p),d=n(1),y=n.n(d),b=n(6),m=n.n(b),h=n(7),v=n.n(h);function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function j(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function P(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function R(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=q(e);if(t){var o=q(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return D(this,n)}}function D(e,t){return!t||"object"!==g(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function q(e){return(q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var C="react-draggable-tree",I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(u,e);var t,n,r,i=R(u);function u(){var e;P(this,u);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=i.call.apply(i,[this].concat(n))).template=function(t,n){var r=t.item,o=t.independent;return(0,e.props.template)({item:r,independent:o,sortable:function(t){return e.initSortable(t,r)}},n)},e.handleSort=function(t,n){if(e.moved){var r=n.newIndex;e.getItems(t).splice(r,0,e.moved),e.moved=null,e.handleChange()}},e.handleRemove=function(t,n){var r=n.oldIndex,o=e.getItems(t);e.moved=o[r],o.splice(r,1),e.handleChange()},e.handleUpdate=function(t,n){var r=n.oldIndex,i=n.newIndex,u=e.getItems(t);o()(u,r,i),e.handleChange()},e}return t=u,(n=[{key:"componentDidMount",value:function(){var e=m.a.findDOMNode(this.root);this.initSortable(e,null)}},{key:"initSortable",value:function(e,t){var n=this.props,r=n.options,o=n.disabled;e&&new v.a(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){x(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({draggable:".is-node",disabled:o,onSort:this.handleSort.bind(null,t),onRemove:this.handleRemove.bind(null,t),onUpdate:this.handleUpdate.bind(null,t)},r))}},{key:"getItems",value:function(e){var t=this.props,n=t.items,r=function(e){return"function"==typeof e?e:function(t,n){return n[e]}}(t.itemsKey);return e?r(-1,e):n}},{key:"handleChange",value:function(){var e=this.props,t=e.items;(0,e.onChange)({target:{value:t}})}},{key:"render",value:function(){var e=this,t=this.props,n=t.className,r=(t.options,t.template,t.disabled),o=j(t,["className","options","template","disabled"]);return y.a.createElement(c.a,O({ref:function(t){return e.root=t},"data-component":C,disabled:r,className:l()(C,n),template:this.template},o))}}])&&S(t.prototype,n),r&&S(t,r),u}(d.Component);I.displayName=C,I.version="1.0.9",I.propTypes={className:s.a.string,items:s.a.array,onChange:s.a.func,template:s.a.func.isRequired,itemsKey:s.a.oneOfType([s.a.string,s.a.func]),options:s.a.object},I.defaultProps={itemsKey:"children",onChange:u.a};t.default=I}])}));
//# sourceMappingURL=index.js.map