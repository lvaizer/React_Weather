(this.webpackJsonpreact_weather=this.webpackJsonpreact_weather||[]).push([[0],{22:function(e,t,a){e.exports={card:"LocationItem_card__29Qw0",card_image:"LocationItem_card_image__6WsXK",card_margin_bottom:"LocationItem_card_margin_bottom__1sLs4",card_footer:"LocationItem_card_footer__2MrTa",favorite_div:"LocationItem_favorite_div__3a1zY"}},46:function(e,t,a){e.exports={header:"Header_header__39g7w",links:"Header_links__1KLEy"}},79:function(e,t,a){e.exports=a(99)},84:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(11),c=a.n(o),i=(a(84),a(46)),l=a.n(i),s=a(44),u=a(136),m=a(139),f=a(140),d=function(){return r.a.createElement("div",null,r.a.createElement(u.a,{position:"static",className:l.a.header},r.a.createElement(m.a,null,r.a.createElement(f.a,{variant:"h6",className:l.a.links},r.a.createElement("img",{src:"./logo192.png",alt:"header_image"})),r.a.createElement(f.a,{variant:"h6",className:l.a.links},r.a.createElement(s.b,{to:"/"},"Home")))))},h=a(50),v=a.n(h),g=a(62),p=a(14),w=a(22),b=a.n(w),E=a(63),_=function e(t,a,n,r,o,c,i,l,s,u){var m=this;Object(E.a)(this,e),this.generateImage=function(){return m.image="./img/"+O(m.id)+".jpg"},this.shouldRefresh=function(){return!isNaN(m.temp)||!m.name||!isNaN(m.min_temp)||!isNaN(m.max_temp)||!isNaN(m.wind)||!m.humidity||!m.description},this.lat=t,this.lon=a,this.name=n,this.temp=parseInt(r),this.min_temp=parseInt(o),this.max_temp=parseInt(c),this.feels_like=parseInt(i),this.humidity=l,this.wind=parseInt(s),this.description=u,this.id=1e3},O=function(e){switch(!0){case e<500:return"storm";case e<600:return"rain";case e<700:return"snow";case e<800:return"mist";case e<801:return"clear";default:return"clouds"}};var j=new function(){var e=function(){var e=[];return localStorage.getItem("locations")?(JSON.parse(localStorage.getItem("locations")).forEach((function(t){e.push(Object.assign(new _,t))})),e):e}(),t=function(){return localStorage.setItem("locations",JSON.stringify(e))};this.add=function(a){a&&e.push(a),t()},this.remove=function(a){if(a){var n=e.indexOf(e.filter((function(e){return e.name===a.name}))[0]);-1!==n&&(e.splice(n,1),t())}},this.get=function(){return e},this.isSaved=function(t){return!!t&&e.filter((function(e){return e.name===t.name})).length>0}};var y=new function(){this.getDataByLocation=function(t,a){return new Promise((function(n){fetch("https://api.openweathermap.org/data/2.5/weather?appid=620df9c48870a46c19bd4f30eb0be7b5&units=metric&lat="+t+"&lon="+a).then((function(e){return e.json()})).then((function(t){return n(e(t))})).catch((function(e){return n(e)}))}))};var e=function(e){var t;return e&&e.main?(t=new _(e.coord.lat,e.coord.lon,e.name,e.main.temp,e.main.temp_min,e.main.temp_max,e.main.feels_like,e.main.humidity),e.wind&&(t.wind=e.wind.speed),e.weather&&e.weather.length>0&&(t.description=e.weather[0].description,t.icon="http://openweathermap.org/img/wn/"+e.weather[0].icon+".png",t.id=e.weather[0].id,t.generateImage())):console.error(e),t}},k=a(64),S=a(27),C=a(141),I=a(142),N=a(143),T=a(144),R=a(145),x=a(146),L=Object(n.forwardRef)((function(e,t){var a=Object(n.useState)(),o=Object(p.a)(a,2)[1],c=Object(n.useState)(!1),i=Object(p.a)(c,2),l=i[0],s=i[1],u=Object(n.useState)(!1),m=Object(p.a)(u,2),d=m[0],h=m[1],v=Object(n.useState)(e.weatherObject),g=Object(p.a)(v,2),w=g[0],E=g[1],_=j.isSaved(w),O=null;Object(n.useImperativeHandle)(t,(function(){return{setWeatherObj:function(e){_=j.isSaved(e),E(e),L()}}}));var L=function(){return w&&w.shouldRefresh()&&H()},B=function(t){M(t),e.favoriteClicked&&e.favoriteClicked()},M=function(t){return e.showToast&&e.showToast(!0,t)},H=function(){h(!0),F(w.lat,w.lon).then((function(e){e&&Object.assign(w,e),O=!e||null,W(!e)})).catch((function(e){console.error(e),W(!0)}))},W=function(e){h(!1),e&&M("Error occurred, please try again later.")},F=function(e,t){return new Promise((function(a){y.getDataByLocation(e,t).then((function(e){return a(e)})).catch((function(e){console.error(e),a(e)}))}))},J=(_?"Remove from":"Add to")+" My locations",q="./img/favorite_"+(_?"remove":"add")+".svg",z={opacity:l?1:0,transform:l?"scale(1)":"scale(0)"},P={opacity:l?0:1,transform:l?"scale(0)":"scale(1)"};return r.a.createElement("div",{className:b.a.card},d?r.a.createElement(C.a,{style:{width:"18rem",alignItems:"center"},className:b.a.card},r.a.createElement(I.a,{disableShrink:!0})):O?r.a.createElement(C.a,{style:{width:"18rem",alignItems:"center"},className:b.a.card},r.a.createElement("div",{className:b.a.favorite_div},r.a.createElement("img",{alt:"refresh button",src:"./img/refresh.svg",onClick:H})),r.a.createElement(C.a.Title,null,"There is a temporary error, please try again later")):r.a.createElement(k.Animate,{duration:.2,play:!0,start:z,end:P},r.a.createElement(C.a,null,r.a.createElement("div",{className:b.a.favorite_div},r.a.createElement(N.a,{arrow:!0,title:J},r.a.createElement("div",null,r.a.createElement("img",{alt:"favorite button",src:q,onClick:function(){var t=j.isSaved(w);t?j.remove(w):j.add(w),_=!t,s(t&&e.canBeRemoved);var a="The location"+(w&&"undefined"!==typeof w.name?'"'+w.name+'"':"")+" was "+(t?"removed":"added")+" successfully";e.canBeRemoved&&t?setTimeout((function(){B(a)}),200):(o([]),B(a))}}))),r.a.createElement("div",null,r.a.createElement("img",{alt:"refresh button",src:"./img/refresh.svg",onClick:H}))),r.a.createElement(T.a,{className:b.a.card_image,image:w.image,component:"div",title:w.name}),r.a.createElement(R.a,null,r.a.createElement(f.a,{variant:"h5",component:"h2"},Object(S.capitalize)(w.name)),r.a.createElement(f.a,{className:b.a.card_margin_bottom,variant:"subtitle1",color:"textSecondary"},Object(S.capitalize)(w.description)),r.a.createElement(f.a,{className:b.a.card_margin_bottom},r.a.createElement("strong",null,w.temp,"\xb0"),"\xa0(feels like ",w.feels_like,"\xb0)"),r.a.createElement(x.a,{container:!0,className:b.a.card_footer},r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(f.a,null,r.a.createElement("img",{alt:"wind_icon",src:"./img/temperature_icon.svg"})),r.a.createElement(f.a,null,w.min_temp,"\xb0-",w.max_temp,"\xb0")),r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(f.a,null,r.a.createElement("img",{alt:"wind_icon",src:"./img/wind_icon.svg"})),r.a.createElement(f.a,null,w&&w.wind," km/h")),r.a.createElement(x.a,{item:!0,xs:4},r.a.createElement(f.a,null,r.a.createElement("img",{alt:"wind_icon",src:"./img/humidity_icon.svg"})),r.a.createElement(f.a,null,w&&w.humidity,"%")))))))})),B=function(e){var t=Object(n.useState)(),a=Object(p.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(!0),l=Object(p.a)(i,2),s=l[0],u=l[1];Object(n.useEffect)((function(){m().then()}));var m=function(){var e=Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:navigator.geolocation.getCurrentPosition((function(e){return t=e.coords.latitude,a=e.coords.longitude,c(new _(t,a));var t,a}),(function(e){console.error(e),u(!1)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return s?r.a.createElement("div",null,r.a.createElement("h5",null,"Current location"),o&&r.a.createElement(L,{key:"myLocation",weatherObject:o,favoriteClicked:e.favoriteClicked,showToast:e.showToast})):r.a.createElement(r.a.Fragment,null)},M=a(148),H=Object(n.forwardRef)((function(e,t){var a=Object(n.useState)(),o=Object(p.a)(a,2)[1];Object(n.useImperativeHandle)(t,(function(){return{favoriteClicked:function(){o([])}}}));var c=function(){return o([])};return r.a.createElement("div",null,r.a.createElement("h5",null,"Favorite locations"),r.a.createElement(x.a,null," ",j.get().map((function(t){return r.a.createElement(L,{key:t.name,weatherObject:t,canBeRemoved:!0,showToast:e.showToast,favoriteClicked:c})}))))})),W=a(149),F=a(150),J=function(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),o=a[0],c=a[1],i=Object(S.debounce)((function(e){e&&0!==e.trim().length&&fetch("https://places-dsn.algolia.net/1/places/query",{method:"POST",body:JSON.stringify({query:e,type:"city",language:"en"})}).then((function(e){return e.json()})).then((function(e){return l(e)})).catch((function(e){return console.error(e)}))}),500),l=function(e){if(e.hits){c([]);var t=[];e.hits.forEach((function(a){a.locale_names[0].toLowerCase().includes(e.query.toLowerCase())&&t.push({name:a.locale_names[0],lat:a._geoloc.lat,lon:a._geoloc.lng})})),c(t)}},s=function(e){return o.filter((function(t){return Object(S.isEqual)(t.name,e)}))};return r.a.createElement("div",null,r.a.createElement(F.a,{freeSolo:!0,onInputChange:function(e){return i(e.target.value)},onChange:function(t){var a=s(t.target.textContent);if(!Object(S.isEmpty)(a)){var n=new _(a[0].lat,a[0].lon,a[0].name);e.onLocationFound(n),c([])}},options:o.map((function(e){return e.name})),renderInput:function(e){return r.a.createElement(W.a,Object.assign({},e,{label:"Search location",margin:"normal",variant:"outlined"}))}}))},q=a(153),z=Object(n.forwardRef)((function(e,t){var a=Object(n.useRef)(),o=Object(n.useState)({weatherObj:null,showModal:!1}),c=Object(p.a)(o,2),i=c[0],l=c[1];return Object(n.useImperativeHandle)(t,(function(){return{setWeatherObj:function(e){l({weatherObj:e,showModal:!0}),a&&a.current&&a.current.setWeatherObj(e)}}})),r.a.createElement("div",null,i.weatherObj&&r.a.createElement(q.a,{open:i.showModal,onClose:function(){return l({weatherObj:null,showModal:!1})}},r.a.createElement(L,{key:"resultsFound",ref:a,favoriteClicked:e.favoriteClicked,weatherObject:i.weatherObj,canBeRemoved:!1,showToast:e.showToast})))})),P=a(152),D=a(147),A=Object(n.forwardRef)((function(e,t){var a=Object(n.useState)({showToast:!1,toastMessage:""}),o=Object(p.a)(a,2),c=o[0],i=o[1];Object(n.useImperativeHandle)(t,(function(){return{forceShowToast:function(e,t){l(e,t)}}}));var l=function(e,t){return i({showToast:e,toastMessage:t})};return r.a.createElement(P.a,{anchorOrigin:{vertical:"top",horizontal:"center"},TransitionComponent:D.a,open:c.showToast,onClose:function(){return l(!1)},autoHideDuration:1e3,message:c.toastMessage})})),K=function(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useRef)(),o=function(e,t){return a&&a.current.forceShowToast(e,t)},c=function(){return e&&e.current.favoriteClicked()};return r.a.createElement(M.a,null,r.a.createElement(J,{onLocationFound:function(e){return t&&t.current&&t.current.setWeatherObj(e)}}),r.a.createElement(A,{ref:a}),r.a.createElement(z,{ref:t,favoriteClicked:c,showToast:o}),r.a.createElement(B,{favoriteClicked:c,showToast:o,canBeRemoved:!1}),r.a.createElement(H,{ref:e,showToast:o}))},Q=function(){return r.a.createElement(s.a,null,r.a.createElement(d,null),r.a.createElement(K,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[79,1,2]]]);
//# sourceMappingURL=main.e20c62ef.chunk.js.map