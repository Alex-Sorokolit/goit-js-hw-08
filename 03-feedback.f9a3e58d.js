function e(e){return e&&e.__esModule?e.default:e}var t,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,a=/^0o[0-7]+$/i,f=parseInt,c="object"==typeof n&&n&&n.Object===Object&&n,u="object"==typeof self&&self&&self.Object===Object&&self,l=c||u||Function("return this")(),s=Object.prototype.toString,d=Math.max,m=Math.min,g=function(){return l.Date.now()};function p(e,t,n){var o,r,i,a,f,c,u=0,l=!1,s=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function y(t){var n=o,i=r;return o=r=void 0,u=t,a=e.apply(i,n)}function h(e){return u=e,f=setTimeout(j,t),l?y(e):a}function S(e){var n=e-c;return void 0===c||n>=t||n<0||s&&e-u>=i}function j(){var e=g();if(S(e))return O(e);f=setTimeout(j,function(e){var n=t-(e-c);return s?m(n,i-(e-u)):n}(e))}function O(e){return f=void 0,p&&o?y(e):(o=r=void 0,a)}function T(){var e=g(),n=S(e);if(o=arguments,r=this,c=e,n){if(void 0===f)return h(c);if(s)return f=setTimeout(j,t),y(c)}return void 0===f&&(f=setTimeout(j,t)),a}return t=b(t)||0,v(n)&&(l=!!n.leading,i=(s="maxWait"in n)?d(b(n.maxWait)||0,t):i,p="trailing"in n?!!n.trailing:p),T.cancel=function(){void 0!==f&&clearTimeout(f),u=0,o=c=r=f=void 0},T.flush=function(){return void 0===f?a:O(g())},T}function v(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function b(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==s.call(e)}(e))return NaN;if(v(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=v(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=i.test(e);return n||a.test(e)?f(e.slice(2),n?2:8):r.test(e)?NaN:+e}t=function(e,t,n){var o=!0,r=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return v(n)&&(o="leading"in n?!!n.leading:o,r="trailing"in n?!!n.trailing:r),p(e,t,{leading:o,maxWait:t,trailing:r})};const y={form:document.querySelector(".feedback-form"),textarea:document.querySelector('textarea[name="message"]')};let h={};y.form.addEventListener("submit",(function(e){e.preventDefault(),console.log("Відправляємо форму"),e.currentTarget.reset(),console.log("Очищаємо форму"),localStorage.removeItem("feedback-form-state"),console.log("Очищаємо localeStorage")})),y.form.addEventListener("input",e(t)((function(e){const{name:t,value:n}=e.target;try{h=localStorage.getItem("feedback-form-state"),h=h?JSON.parse(h):{},h[t]=n;const e=JSON.stringify(h);localStorage.setItem("feedback-form-state",e)}catch(e){console.error(e)}}),500)),function(){const e=localStorage.getItem("feedback-form-state");if(e)try{const t=JSON.parse(e);Object.entries(t).forEach((([e,t])=>{y.form.elements[e].value=t}))}catch(e){console.error(e)}}();
//# sourceMappingURL=03-feedback.f9a3e58d.js.map