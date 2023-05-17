var oe=Object.create;var B=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var le=Object.getOwnPropertyNames;var de=Object.getPrototypeOf,he=Object.prototype.hasOwnProperty;var ce=(f,a)=>()=>(a||f((a={exports:{}}).exports,a),a.exports);var me=(f,a,_,D)=>{if(a&&typeof a=="object"||typeof a=="function")for(let y of le(a))!he.call(f,y)&&y!==_&&B(f,y,{get:()=>a[y],enumerable:!(D=se(a,y))||D.enumerable});return f};var ge=(f,a,_)=>(_=f!=null?oe(de(f)):{},me(a||!f||!f.__esModule?B(_,"default",{value:f,enumerable:!0}):_,f));var K=ce((G,J)=>{(function(f,a){typeof G=="object"&&typeof J<"u"?J.exports=a():typeof define=="function"&&define.amd?define(a):(f=typeof globalThis<"u"?globalThis:f||self).dayjs=a()})(G,function(){"use strict";var f=1e3,a=6e4,_=36e5,D="millisecond",y="second",z="minute",c="hour",u="day",$="week",x="month",b="quarter",h="year",O="date",M="Invalid Date",te=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,ae=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,re={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(r){var t=["th","st","nd","rd"],e=r%100;return"["+r+(t[(e-20)%10]||t[e]||t[0])+"]"}},Y=function(r,t,e){var n=String(r);return!n||n.length>=t?r:""+Array(t+1-n.length).join(e)+r},ne={s:Y,z:function(r){var t=-r.utcOffset(),e=Math.abs(t),n=Math.floor(e/60),i=e%60;return(t<=0?"+":"-")+Y(n,2,"0")+":"+Y(i,2,"0")},m:function r(t,e){if(t.date()<e.date())return-r(e,t);var n=12*(e.year()-t.year())+(e.month()-t.month()),i=t.clone().add(n,x),s=e-i<0,o=t.clone().add(n+(s?-1:1),x);return+(-(n+(e-i)/(s?i-o:o-i))||0)},a:function(r){return r<0?Math.ceil(r)||0:Math.floor(r)},p:function(r){return{M:x,y:h,w:$,d:u,D:O,h:c,m:z,s:y,ms:D,Q:b}[r]||String(r||"").toLowerCase().replace(/s$/,"")},u:function(r){return r===void 0}},N="en",E={};E[N]=re;var F=function(r){return r instanceof j},H=function r(t,e,n){var i;if(!t)return N;if(typeof t=="string"){var s=t.toLowerCase();E[s]&&(i=s),e&&(E[s]=e,i=s);var o=t.split("-");if(!i&&o.length>1)return r(o[0])}else{var l=t.name;E[l]=t,i=l}return!n&&i&&(N=i),i||!n&&N},p=function(r,t){if(F(r))return r.clone();var e=typeof t=="object"?t:{};return e.date=r,e.args=arguments,new j(e)},d=ne;d.l=H,d.i=F,d.w=function(r,t){return p(r,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var j=function(){function r(e){this.$L=H(e.locale,null,!0),this.parse(e)}var t=r.prototype;return t.parse=function(e){this.$d=function(n){var i=n.date,s=n.utc;if(i===null)return new Date(NaN);if(d.u(i))return new Date;if(i instanceof Date)return new Date(i);if(typeof i=="string"&&!/Z$/i.test(i)){var o=i.match(te);if(o){var l=o[2]-1||0,g=(o[7]||"0").substring(0,3);return s?new Date(Date.UTC(o[1],l,o[3]||1,o[4]||0,o[5]||0,o[6]||0,g)):new Date(o[1],l,o[3]||1,o[4]||0,o[5]||0,o[6]||0,g)}}return new Date(i)}(e),this.$x=e.x||{},this.init()},t.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},t.$utils=function(){return d},t.isValid=function(){return this.$d.toString()!==M},t.isSame=function(e,n){var i=p(e);return this.startOf(n)<=i&&i<=this.endOf(n)},t.isAfter=function(e,n){return p(e)<this.startOf(n)},t.isBefore=function(e,n){return this.endOf(n)<p(e)},t.$g=function(e,n,i){return d.u(e)?this[n]:this.set(i,e)},t.unix=function(){return Math.floor(this.valueOf()/1e3)},t.valueOf=function(){return this.$d.getTime()},t.startOf=function(e,n){var i=this,s=!!d.u(n)||n,o=d.p(e),l=function(T,w){var C=d.w(i.$u?Date.UTC(i.$y,w,T):new Date(i.$y,w,T),i);return s?C:C.endOf(u)},g=function(T,w){return d.w(i.toDate()[T].apply(i.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(w)),i)},m=this.$W,v=this.$M,L=this.$D,S="set"+(this.$u?"UTC":"");switch(o){case h:return s?l(1,0):l(31,11);case x:return s?l(1,v):l(0,v+1);case $:var k=this.$locale().weekStart||0,A=(m<k?m+7:m)-k;return l(s?L-A:L+(6-A),v);case u:case O:return g(S+"Hours",0);case c:return g(S+"Minutes",1);case z:return g(S+"Seconds",2);case y:return g(S+"Milliseconds",3);default:return this.clone()}},t.endOf=function(e){return this.startOf(e,!1)},t.$set=function(e,n){var i,s=d.p(e),o="set"+(this.$u?"UTC":""),l=(i={},i[u]=o+"Date",i[O]=o+"Date",i[x]=o+"Month",i[h]=o+"FullYear",i[c]=o+"Hours",i[z]=o+"Minutes",i[y]=o+"Seconds",i[D]=o+"Milliseconds",i)[s],g=s===u?this.$D+(n-this.$W):n;if(s===x||s===h){var m=this.clone().set(O,1);m.$d[l](g),m.init(),this.$d=m.set(O,Math.min(this.$D,m.daysInMonth())).$d}else l&&this.$d[l](g);return this.init(),this},t.set=function(e,n){return this.clone().$set(e,n)},t.get=function(e){return this[d.p(e)]()},t.add=function(e,n){var i,s=this;e=Number(e);var o=d.p(n),l=function(v){var L=p(s);return d.w(L.date(L.date()+Math.round(v*e)),s)};if(o===x)return this.set(x,this.$M+e);if(o===h)return this.set(h,this.$y+e);if(o===u)return l(1);if(o===$)return l(7);var g=(i={},i[z]=a,i[c]=_,i[y]=f,i)[o]||1,m=this.$d.getTime()+e*g;return d.w(m,this)},t.subtract=function(e,n){return this.add(-1*e,n)},t.format=function(e){var n=this,i=this.$locale();if(!this.isValid())return i.invalidDate||M;var s=e||"YYYY-MM-DDTHH:mm:ssZ",o=d.z(this),l=this.$H,g=this.$m,m=this.$M,v=i.weekdays,L=i.months,S=function(w,C,W,I){return w&&(w[C]||w(n,s))||W[C].slice(0,I)},k=function(w){return d.s(l%12||12,w,"0")},A=i.meridiem||function(w,C,W){var I=w<12?"AM":"PM";return W?I.toLowerCase():I},T={YY:String(this.$y).slice(-2),YYYY:this.$y,M:m+1,MM:d.s(m+1,2,"0"),MMM:S(i.monthsShort,m,L,3),MMMM:S(L,m),D:this.$D,DD:d.s(this.$D,2,"0"),d:String(this.$W),dd:S(i.weekdaysMin,this.$W,v,2),ddd:S(i.weekdaysShort,this.$W,v,3),dddd:v[this.$W],H:String(l),HH:d.s(l,2,"0"),h:k(1),hh:k(2),a:A(l,g,!0),A:A(l,g,!1),m:String(g),mm:d.s(g,2,"0"),s:String(this.$s),ss:d.s(this.$s,2,"0"),SSS:d.s(this.$ms,3,"0"),Z:o};return s.replace(ae,function(w,C){return C||T[w]||o.replace(":","")})},t.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},t.diff=function(e,n,i){var s,o=d.p(n),l=p(e),g=(l.utcOffset()-this.utcOffset())*a,m=this-l,v=d.m(this,l);return v=(s={},s[h]=v/12,s[x]=v,s[b]=v/3,s[$]=(m-g)/6048e5,s[u]=(m-g)/864e5,s[c]=m/_,s[z]=m/a,s[y]=m/f,s)[o]||m,i?v:d.a(v)},t.daysInMonth=function(){return this.endOf(x).$D},t.$locale=function(){return E[this.$L]},t.locale=function(e,n){if(!e)return this.$L;var i=this.clone(),s=H(e,n,!0);return s&&(i.$L=s),i},t.clone=function(){return d.w(this.$d,this)},t.toDate=function(){return new Date(this.valueOf())},t.toJSON=function(){return this.isValid()?this.toISOString():null},t.toISOString=function(){return this.$d.toISOString()},t.toString=function(){return this.$d.toUTCString()},r}(),Z=j.prototype;return p.prototype=Z,[["$ms",D],["$s",y],["$m",z],["$H",c],["$W",u],["$M",x],["$y",h],["$D",O]].forEach(function(r){Z[r[1]]=function(t){return this.$g(t,r[0],r[1])}}),p.extend=function(r,t){return r.$i||(r(t,j,p),r.$i=!0),p},p.locale=H,p.isDayjs=F,p.unix=function(r){return p(1e3*r)},p.en=E[N],p.Ls=E,p.p={},p})});var V=`perspective-viewer-summary {
    overflow: auto;
}
`;var U='.summary-container{display:flex;}.align-horizontal{flex-direction:row;}.align-vertical{flex-direction:column;}.summary-column{display:flex;text-align:center;align-items:center;justify-content:space-between;margin:5px;}.align-header-top .summary-column,.align-header-bottom .summary-column{flex-direction:column;}.align-header-left .summary-column,.align-header-right .summary-column{flex-direction:row;}.summary-header{display:flex;justify-content:center;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1.3vh;}.align-header-top .summary-header,.align-header-bottom .summary-header{flex-direction:column;}.align-header-left .summary-header,.align-header-right .summary-header{transform:rotate(-180deg);-webkit-transform:rotate(-180deg);-moz-transform:rotate(-180deg);-ms-transform:rotate(-180deg);-o-transform:rotate(-180deg);writing-mode:vertical-lr;text-overflow:ellipsis;display:inline-block;font-size:0.8vh;}.align-header-left .summary-header{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider,.align-header-right .summary-header-divider{display:none;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:3vh;}.summary-header-divider::after{content:"";display:block;margin:auto;}.align-header-top .summary-header-divider::after{border-bottom:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider::after{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header-divider::after{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-bottom .summary-header-divider::after{border-top:1px solid var(--inactive--color,#6e6e6e);}.align-header-top .summary-header-divider,.align-header-bottom .summary-header-divider{width:100%;}.align-horizontal.align-header-top .summary-header-divider::after,.align-horizontal.align-header-bottom .summary-header-divider::after{height:1px;width:90%;}.align-vertical.align-header-top .summary-header-divider::after,.align-vertical.align-header-bottom .summary-header-divider::after{height:1px;width:50%;}.align-horizontal.align-header-left .summary-header-divider::after,.align-horizontal.align-header-right .summary-header-divider::after{height:90%;width:1px;}.align-vertical.align-header-left .summary-header-divider::after,.align-vertical.align-header-right .summary-header-divider::after{height:50%;width:1px;}';var q=".summary-container{display:flex;}.align-horizontal{flex-direction:row;}.align-vertical{flex-direction:column;}.summary-column{display:flex;text-align:center;align-items:center;justify-content:space-between;margin:5px;}.align-header-top .summary-column,.align-header-bottom .summary-column{flex-direction:column;}.align-header-left .summary-column,.align-header-right .summary-column{flex-direction:row;}.summary-header{display:flex;justify-content:center;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1.3vh;}.align-header-top .summary-header,.align-header-bottom .summary-header{flex-direction:column;}.align-header-left .summary-header,.align-header-right .summary-header{transform:rotate(-180deg);-webkit-transform:rotate(-180deg);-moz-transform:rotate(-180deg);-ms-transform:rotate(-180deg);-o-transform:rotate(-180deg);writing-mode:vertical-lr;text-overflow:ellipsis;display:inline-block;font-size:0.8vh;}.align-header-left .summary-header{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider,.align-header-right .summary-header-divider{display:none;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:3vh;}.summary-header{display:none;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:4vh;}";var Q='.summary-container{display:flex;}.align-horizontal{flex-direction:row;}.align-vertical{flex-direction:column;}.summary-column{display:flex;text-align:center;align-items:center;justify-content:space-between;margin:5px;}.align-header-top .summary-column,.align-header-bottom .summary-column{flex-direction:column;}.align-header-left .summary-column,.align-header-right .summary-column{flex-direction:row;}.summary-header{display:flex;justify-content:center;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1.3vh;}.align-header-top .summary-header,.align-header-bottom .summary-header{flex-direction:column;}.align-header-left .summary-header,.align-header-right .summary-header{transform:rotate(-180deg);-webkit-transform:rotate(-180deg);-moz-transform:rotate(-180deg);-ms-transform:rotate(-180deg);-o-transform:rotate(-180deg);writing-mode:vertical-lr;text-overflow:ellipsis;display:inline-block;font-size:0.8vh;}.align-header-left .summary-header{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider,.align-header-right .summary-header-divider{display:none;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:3vh;}.summary-container{display:flex;}.align-horizontal{flex-direction:row;}.align-vertical{flex-direction:column;}.summary-column{display:flex;text-align:center;align-items:center;justify-content:space-between;margin:5px;}.align-header-top .summary-column,.align-header-bottom .summary-column{flex-direction:column;}.align-header-left .summary-column,.align-header-right .summary-column{flex-direction:row;}.summary-header{display:flex;justify-content:center;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1.3vh;}.align-header-top .summary-header,.align-header-bottom .summary-header{flex-direction:column;}.align-header-left .summary-header,.align-header-right .summary-header{transform:rotate(-180deg);-webkit-transform:rotate(-180deg);-moz-transform:rotate(-180deg);-ms-transform:rotate(-180deg);-o-transform:rotate(-180deg);writing-mode:vertical-lr;text-overflow:ellipsis;display:inline-block;font-size:0.8vh;}.align-header-left .summary-header{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider,.align-header-right .summary-header-divider{display:none;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:3vh;}.summary-header-divider::after{content:"";display:block;margin:auto;}.align-header-top .summary-header-divider::after{border-bottom:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider::after{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header-divider::after{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-bottom .summary-header-divider::after{border-top:1px solid var(--inactive--color,#6e6e6e);}.align-header-top .summary-header-divider,.align-header-bottom .summary-header-divider{width:100%;}.align-horizontal.align-header-top .summary-header-divider::after,.align-horizontal.align-header-bottom .summary-header-divider::after{height:1px;width:90%;}.align-vertical.align-header-top .summary-header-divider::after,.align-vertical.align-header-bottom .summary-header-divider::after{height:1px;width:50%;}.align-horizontal.align-header-left .summary-header-divider::after,.align-horizontal.align-header-right .summary-header-divider::after{height:90%;width:1px;}.align-vertical.align-header-left .summary-header-divider::after,.align-vertical.align-header-right .summary-header-divider::after{height:50%;width:1px;}.summary-column{text-align:left;align-items:center;justify-content:unset;}.align-header-left .summary-header,.align-header-right .summary-header{transform:rotate(0deg);-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);writing-mode:unset;font-size:1vh;}.align-header-left .summary-header{margin-right:5px;padding-right:5px;border-right:4px solid var(--inactive--color,#6e6e6e);border-left:0px;}.align-header-right .summary-header{margin-left:5px;padding-left:5px;border-left:4px solid var(--inactive--color,#6e6e6e);border-right:0px;}.align-header-top .summary-header-divider::after{border-bottom:4px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider::after{border-right:4px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header-divider::after{border-left:4px solid var(--inactive--color,#6e6e6e);}.align-header-bottom .summary-header-divider::after{border-top:4px solid var(--inactive--color,#6e6e6e);}.align-horizontal.align-header-top .summary-header-divider::after,.align-horizontal.align-header-bottom .summary-header-divider::after{height:4px;}.align-vertical.align-header-top .summary-header-divider::after,.align-vertical.align-header-bottom .summary-header-divider::after{height:4px;}.align-horizontal.align-header-left .summary-header-divider::after,.align-horizontal.align-header-right .summary-header-divider::after{width:4px;}.align-vertical.align-header-left .summary-header-divider::after,.align-vertical.align-header-right .summary-header-divider::after{width:4px;}';var R=ge(K()),ye=["horizontal","vertical"],X="horizontal",ve={horizontal:["top","bottom"],vertical:["top","bottom","left","right"]},ee={default:{horizontal:"top",vertical:"top"},minimal:{horizontal:"top",vertical:"top"},modern:{horizontal:"bottom",vertical:"right"}},ie={default:U,minimal:q,modern:Q},P=class extends HTMLElement{constructor(){super(),this._config={plugin_config:{theme:"default",align:X,align_header:void 0,format:{},header_class:"",data_class:"",header_classes:{},data_classes:{}}},this._data=null,this._schema=null,this._container=null,this._style=null,this._loaded=!1}connectedCallback(){this._loaded||(this._shadow=this.attachShadow({mode:"open"}),this._container=document.createElement("div"),this._container.classList.add("summary-container"),this._style=document.createElement("style"),this._shadow.appendChild(this._style),this._shadow.appendChild(this._container),this._global_style=document.createElement("style"),this._global_style.textContent=V,document.head.appendChild(this._global_style)),this._loaded=!0}disconnectedCallback(){}async activate(a){}get name(){return"Summary"}get select_mode(){return"select"}get min_config_columns(){return 1}async draw(a){await this.render(a)}async update(a){await this.render(a)}async render(a){let _=await a.get_config();this._config={...this._config,..._,plugin_config:this._config.plugin_config},this._schema=await a.schema();let y={start_row:0,start_col:0,end_row:1,end_col:_.columns.length,id:!1};this._data=await a.to_columns(y),this.format(_.plugin_config)}async resize(){}async clear(){}save(){return{...this._config.plugin_config}}restore(a){this.format(a)}validate(a){a=a||this._config.plugin_config;let _=a.theme!==void 0&&a.theme!==this._config.plugin_config.theme;console.log(_,JSON.stringify(a)),this._config.plugin_config.theme=a.theme||this._config.plugin_config.theme,Object.keys(ie).indexOf(this._config.plugin_config.theme)<0&&(this._config.plugin_config.theme="default"),this._config.plugin_config.align=a.align||this._config.plugin_config.align,ye.indexOf(this._config.plugin_config.align)<0&&(this._config.plugin_config.align=X),this._config.plugin_config.align_header=a.align_header||this._config.plugin_config.align_header,ve[this._config.plugin_config.align].indexOf(this._config.plugin_config.align_header)<0&&(this._config.plugin_config.align_header=ee[this._config.plugin_config.theme][this._config.plugin_config.align]),(this._config.plugin_config.align_header===void 0||_&&a.align_header===void 0)&&(this._config.plugin_config.align_header=ee[this._config.plugin_config.theme][this._config.plugin_config.align]),this._config.plugin_config.header_class=a.header_class||this._config.plugin_config.header_class,this._config.plugin_config.data_class=a.data_class||this._config.plugin_config.data_class,this._config.plugin_config.header_classes=a.header_classes||this._config.plugin_config.header_classes,this._config.plugin_config.data_classes=a.data_classes||this._config.plugin_config.data_classes,this._config.plugin_config.format=a.format||this._config.plugin_config.format||{}}format(a){if(!this._loaded)return;this.validate(a),this._style.textContent=ie[this._config.plugin_config.theme]||U;let _=this._config.columns,D=this._config.aggregates,y=this._data.__ROW_PATH__&&this._data.__ROW_PATH__.length>0,z=new Map;for(_.forEach(c=>{let u=document.createElement("div");u.classList.add("summary-column");let $=document.createElement("span");$.classList.add("summary-header");let x=document.createElement("span");x.classList.add("summary-header-divider"),this._config.plugin_config.header_class&&$.classList.add(this._config.plugin_config.header_class),this._config.plugin_config.header_classes&&this._config.plugin_config.header_classes[c]&&$.classList.add(this._config.plugin_config.header_classes[c]),$.textContent=c;let b=document.createElement("span");if(b.classList.add("summary-data"),this._config.plugin_config.data_class&&b.classList.add(this._config.plugin_config.data_class),this._config.plugin_config.data_classes&&this._config.plugin_config.data_classes[c]&&b.classList.add(this._config.plugin_config.data_classes[c]),["top","left"].indexOf(this._config.plugin_config.align_header)>=0?(u.appendChild($),u.appendChild(x),u.appendChild(b)):(u.appendChild(b),u.appendChild(x),u.appendChild($)),z.set(c,u),y){let h=this._data[c],O=D[c]||(Number.isNaN(h)?"count":"sum");b.title=`${O}("${c}")`;let M=this._config.plugin_config.format[c];["integer"].indexOf(this._schema[c])>=0?this._config.plugin_config.theme==="modern"?h=`${+h<0?"-":""}${new Intl.NumberFormat("en-US",{maximumFractionDigits:+(M||0),notation:"compact",compactDisplay:"short"}).format(Math.abs(+h))}`:h=Number(h).toFixed(+(M||0)):["float"].indexOf(this._schema[c])>=0?this._config.plugin_config.theme==="modern"?h=new Intl.NumberFormat("en-US",{maximumFractionDigits:+(M||1),notation:"compact",compactDisplay:"short"}).format(Number(h)):h=Number(h).toFixed(+(M||1)):["boolean"].indexOf(this._schema[c])>=0||(["datetime","date"].indexOf(this._schema[c])>=0?this._config.plugin_config.theme==="modern"?h=(0,R.default)(+h).format(M||"MMM D"):h=(0,R.default)(+h).format(M):M!==void 0&&(h=new String(h).substring(0,+M))),b.textContent=h,this._config.plugin_config.data_classes&&this._config.plugin_config.data_classes[c]&&b.classList.add(this._config.plugin_config.data_classes[c])}else b.textContent="--";this._container.classList.remove("align-horizontal"),this._container.classList.remove("align-vertical"),this._container.classList.add(`align-${this._config.plugin_config.align}`),this._container.classList.remove("align-header-top"),this._container.classList.remove("align-header-bottom"),this._container.classList.remove("align-header-left"),this._container.classList.remove("align-header-right"),this._container.classList.add(`align-header-${this._config.plugin_config.align_header}`)});this._container.lastChild;)this._container.removeChild(this._container.lastChild);z.forEach((c,u)=>{this._container.appendChild(c)})}async restyle(a){}delete(){}};customElements.define("perspective-viewer-summary",P);function xe(){customElements.get("perspective-viewer").registerPlugin("perspective-viewer-summary")}customElements.whenDefined("perspective-viewer").then(xe);export{P as PerspectiveViewerSummaryPluginElement};
//# sourceMappingURL=perspective-viewer-summary.js.map
