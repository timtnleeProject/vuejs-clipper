(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d0afd380","chunk-ec2d6c48"],{"1c8d":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=this,t=a.$createElement,r=a._self._c||t;return r("div",[a.popup?r("div",{staticClass:"popup"},[r("div",{staticClass:"popup-content"},[r("div",{staticClass:"flow"},[r("loader",{attrs:{done:a.done}},[a._v("Converting")]),r("img",{staticClass:"img",attrs:{src:a.clipResult}}),r("div",{staticClass:"flex-center"},[r("div",{staticClass:"flex-center"},[r("input",{directives:[{name:"model",rawName:"v-model",value:a.filename,expression:"filename"}],attrs:{type:"text"},domProps:{value:a.filename},on:{input:function(e){e.target.composing||(a.filename=e.target.value)}}}),r("span",[a._v(".jpeg")])])]),r("div",{staticClass:"flex-center"},[r("button",{staticClass:"btn g"},[r("a",{attrs:{href:a.link,download:a.filename}},[a._v("download")])]),r("button",{staticClass:"btn r",on:{click:function(){e.popup=!1}}},[a._v("close")])])],1),r("img",{staticClass:"close",attrs:{src:"icon/cancel.png",alt:""},on:{click:function(){e.popup=!1}}})])]):a._e(),r("div",{staticClass:"content"},[r("h2",[a._v("clipper-fixed")]),a._m(0),r("h4",[a._v("gallary")]),r("gallary",{attrs:{gallary:a.gallary},model:{value:a.imgUrl,callback:function(e){a.imgUrl=e},expression:"imgUrl"}}),r("div",{staticClass:"flex-center"},[r("div",[r("h4",[a._v("demo")]),r("clipper-fixed",{ref:"clipper",staticClass:"fixed-sample",attrs:{src:a.imgUrl,border:a.border,ratio:a.ratio,rotate:a.rotate,grid:a.grid,bgColor:a.bgColor,shadow:a.shadow,round:a.round,preview:"preview"},on:{load:a.imgLoad}})],1),r("div",{staticClass:"settings"},[r("h4",[a._v("settings")]),r("button",{staticClass:"btn",on:{click:a.clip}},[a._v("clip image")]),r("label",{staticClass:"btn",attrs:{for:"upload"}},[a._v("upload image")]),r("input",{attrs:{id:"upload",type:"file"},on:{change:function(e){return a.upload(e)}}}),r("div",{staticClass:"flex"},[r("div",{staticClass:"flex"},[r("span",{staticClass:"label"},[a._v("border: ")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model.number",value:a.border,expression:"border",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:a.border},on:{input:function(e){e.target.composing||(a.border=a._n(e.target.value))},blur:function(e){return a.$forceUpdate()}}})])])]),r("div",{staticClass:"flex"},[r("span",{staticClass:"label"},[a._v("layout: ")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.grid,expression:"grid"}],attrs:{type:"checkbox",name:"grid"},domProps:{checked:Array.isArray(a.grid)?a._i(a.grid,null)>-1:a.grid},on:{change:function(e){var t=a.grid,r=e.target,i=!!r.checked;if(Array.isArray(t)){var o=null,s=a._i(t,o);r.checked?s<0&&(a.grid=t.concat([o])):s>-1&&(a.grid=t.slice(0,s).concat(t.slice(s+1)))}else a.grid=i}}}),a._v("grid")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.round,expression:"round"}],attrs:{type:"checkbox",name:"round"},domProps:{checked:Array.isArray(a.round)?a._i(a.round,null)>-1:a.round},on:{change:function(e){var t=a.round,r=e.target,i=!!r.checked;if(Array.isArray(t)){var o=null,s=a._i(t,o);r.checked?s<0&&(a.round=t.concat([o])):s>-1&&(a.round=t.slice(0,s).concat(t.slice(s+1)))}else a.round=i}}}),a._v("round")])]),r("div",{staticClass:"flex"},[r("span",{staticClass:"label"},[a._v("image type: ")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model.number",value:a.type,expression:"type",modifiers:{number:!0}}],attrs:{type:"radio",name:"type",value:"image/jpeg"},domProps:{checked:a._q(a.type,a._n("image/jpeg"))},on:{change:function(e){a.type=a._n("image/jpeg")}}}),a._v("jpeg")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model.number",value:a.type,expression:"type",modifiers:{number:!0}}],attrs:{type:"radio",name:"type",value:"image/png"},domProps:{checked:a._q(a.type,a._n("image/png"))},on:{change:function(e){a.type=a._n("image/png")}}}),a._v("png")])]),r("div",{staticClass:"flex"},[r("span",{staticClass:"label"},[a._v("ratio: ")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model.number",value:a.ratio,expression:"ratio",modifiers:{number:!0}}],attrs:{type:"radio",name:"ratio"},domProps:{value:1,checked:a._q(a.ratio,a._n(1))},on:{change:function(e){a.ratio=a._n(1)}}}),a._v("1:1")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model.number",value:a.ratio,expression:"ratio",modifiers:{number:!0}}],attrs:{type:"radio",name:"ratio"},domProps:{value:4/3,checked:a._q(a.ratio,a._n(4/3))},on:{change:function(e){a.ratio=a._n(4/3)}}}),a._v("4:3")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model.number",value:a.ratio,expression:"ratio",modifiers:{number:!0}}],attrs:{type:"radio",name:"ratio"},domProps:{value:16/9,checked:a._q(a.ratio,a._n(16/9))},on:{change:function(e){a.ratio=a._n(16/9)}}}),a._v("16:9")])]),r("div",{staticClass:"flex"},[r("span",{staticClass:"label"},[a._v("bgColor: ")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.bgColor,expression:"bgColor"}],attrs:{type:"radio",name:"bgColor",value:"#000000"},domProps:{checked:a._q(a.bgColor,"#000000")},on:{change:function(e){a.bgColor="#000000"}}}),r("span",{staticClass:"color-tick",staticStyle:{"background-color":"#000000"}})]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.bgColor,expression:"bgColor"}],attrs:{type:"radio",name:"bgColor",value:"pink"},domProps:{checked:a._q(a.bgColor,"pink")},on:{change:function(e){a.bgColor="pink"}}}),r("span",{staticClass:"color-tick",staticStyle:{"background-color":"pink"}})]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.bgColor,expression:"bgColor"}],attrs:{type:"radio",name:"bgColor",value:"#a1cfea"},domProps:{checked:a._q(a.bgColor,"#a1cfea")},on:{change:function(e){a.bgColor="#a1cfea"}}}),r("span",{staticClass:"color-tick",staticStyle:{"background-color":"#a1cfea"}})]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.bgColor,expression:"bgColor"}],attrs:{type:"radio",name:"bgColor",value:"#bc1229"},domProps:{checked:a._q(a.bgColor,"#bc1229")},on:{change:function(e){a.bgColor="#bc1229"}}}),r("span",{staticClass:"color-tick",staticStyle:{"background-color":"#bc1229"}})])]),r("div",{staticClass:"flex"},[r("span",{staticClass:"label"},[a._v("shadow: ")]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.shadow,expression:"shadow"}],attrs:{type:"radio",name:"shadow",value:"rgba(0,0,0,0.4)"},domProps:{checked:a._q(a.shadow,"rgba(0,0,0,0.4)")},on:{change:function(e){a.shadow="rgba(0,0,0,0.4)"}}}),r("span",{staticClass:"shadow-tick",staticStyle:{"background-color":"rgba(0,0,0,0.4)"}})]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.shadow,expression:"shadow"}],attrs:{type:"radio",name:"shadow",value:"rgba(0,0,0,0.8)"},domProps:{checked:a._q(a.shadow,"rgba(0,0,0,0.8)")},on:{change:function(e){a.shadow="rgba(0,0,0,0.8)"}}}),r("span",{staticClass:"shadow-tick",staticStyle:{"background-color":"rgba(0,0,0,0.8)"}})]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.shadow,expression:"shadow"}],attrs:{type:"radio",name:"shadow",value:"rgba(255,255,255,0.2)"},domProps:{checked:a._q(a.shadow,"rgba(255,255,255,0.2)")},on:{change:function(e){a.shadow="rgba(255,255,255,0.2)"}}}),r("span",{staticClass:"shadow-tick",staticStyle:{"background-color":"rgba(255,255,255,0.2)"}})]),r("span",[r("input",{directives:[{name:"model",rawName:"v-model",value:a.shadow,expression:"shadow"}],attrs:{type:"radio",name:"shadow",value:"rgb(27, 170, 232,0.5)"},domProps:{checked:a._q(a.shadow,"rgb(27, 170, 232,0.5)")},on:{change:function(e){a.shadow="rgb(27, 170, 232,0.5)"}}}),r("span",{staticClass:"shadow-tick",staticStyle:{"background-color":"rgb(27, 170, 232,0.5)"}})])]),r("div",{staticClass:"flex"},[r("span",{staticClass:"w80 label"},[a._v("rotate: ")]),r("clipper-range",{staticClass:"range",attrs:{min:-180,max:180},model:{value:a.rotate,callback:function(e){a.rotate=e},expression:"rotate"}})],1)])]),r("div",{staticClass:"flex"},[r("clipper-preview",{staticClass:"preview preview-lg",attrs:{name:"preview"}}),r("clipper-preview",{staticClass:"preview preview-md",attrs:{name:"preview"}}),r("clipper-preview",{staticClass:"preview preview-sm",attrs:{name:"preview"}})],1)],1)])},i=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"area"},[t("ul",[t("li",[e._v("Drag and scale image to clip.")]),t("li",[e._v("It is recommended to use it to clip image in a fixed ratio, as the profile picture.")]),t("li",[e._v("Scale and ratio are default features, and also support rotate.")]),t("li",[e._v("Its height is auto adjust by ratio, you can only set the width of this component.")]),t("li",{staticStyle:{color:"blue"}},[e._v("This demo using normal input to upload files so it won't transform EXIF image.")])])])}],o=(t("7db0"),t("e260"),t("d3b7"),t("3ca3"),t("ddb0"),t("2b3d"),t("ab2a")),s=t("555f"),n=t("e4fd"),l={extends:{mixins:[o["a"]]},components:{Loader:s["default"],Gallary:n["default"]},data:function(){return{imgUrl:"lily.jpg",border:1,ratio:1,rotate:0,grid:!0,type:"image/jpeg",bgColor:"#000000",shadow:"rgba(0,0,0,0.4)",round:!1,popup:!1,done:!1,clipResult:null,link:null,filename:"clip",gallary:["lily.jpg","long.jpg","ex3.jpg"]}},methods:{upload:function(e){0!==e.target.files.length&&(this.imgUrl=window.URL.createObjectURL(e.target.files[0]))},clip:function(){this.popup=!0,this.done=!1,this.clipResult=null,this.clipToURL(this.type)},imgLoad:function(){var e=this;this.gallary.find((function(a){return a===e.imgUrl}))||this.gallary.push(this.imgUrl)}}},c=l,d=(t("faeb"),t("2877")),p=Object(d["a"])(c,r,i,!1,null,"7ae208ab",null);a["default"]=p.exports},"6bfe":function(e,a,t){},"7db0":function(e,a,t){"use strict";var r=t("23e7"),i=t("b727").find,o=t("44d2"),s=t("ae40"),n="find",l=!0,c=s(n);n in[]&&Array(1)[n]((function(){l=!1})),r({target:"Array",proto:!0,forced:l||!c},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o(n)},"965c":function(e,a,t){"use strict";var r=t("6bfe"),i=t.n(r);i.a},9799:function(e,a,t){},e4fd:function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"gallary"},e._l(e.gallary,(function(a,r){return t("div",{key:a,staticClass:"wrap",class:{select:e.selectedGallary[r]},on:{click:function(a){return e.switchGallary(r)}}},[t("img",{attrs:{src:a}})])})),0)},i=[],o=(t("d81d"),{props:{gallary:Array,value:String},methods:{switchGallary:function(e){this.$emit("input",this.gallary[e])}},computed:{selectedGallary:function(){var e=this;return this.gallary.map((function(a){return a===e.value}))}}}),s=o,n=(t("965c"),t("2877")),l=Object(n["a"])(s,r,i,!1,null,"b34e18ae",null);a["default"]=l.exports},faeb:function(e,a,t){"use strict";var r=t("9799"),i=t.n(r);i.a}}]);
//# sourceMappingURL=chunk-d0afd380.b4780fc9.js.map