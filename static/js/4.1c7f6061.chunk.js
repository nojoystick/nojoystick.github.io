(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[4],{67:function(t,e,i){"use strict";i.r(e);var o=i(6),c=i(5),n=i(3),l=i(2),p=i.n(l),a=i(65),r=i.n(a),b={title:{color:c.b.purple,font:c.c.h1,margin:"0px 0px 20px",display:"flex",justifyContent:"center",maxWidth:"100%"},postTitle:{color:c.b.purple,font:c.c.h2,width:"100%",padding:"0px",margin:"0px"},postSubtitle:{color:c.b.purple,font:c.c.h4,fontStyle:"italic"},project:{display:"flex",flexDirection:"column",boxShadow:c.b.boxShadow,backgroundColor:c.b.white,borderRadius:"4px",margin:"0px 100px 20px 100px",padding:"30px",transition:"box-shadow 1s",maxWidth:"1000px","&:hover":{transition:"box-shadow 1s",boxShadow:c.b.boxShadowLight}},projectMobile:{margin:"0px 30px 20px"},projectHeader:{display:"flex",flexDirection:"column",width:"100%",padding:"10px"},header:{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"},projectBody:{display:"flex",flexDirection:"row",maxWidth:"100%"},projectBodyMobile:{flexDirection:"column",alignItems:"center"},para:{margin:"0px 0px 32px 0px"},content:{display:"flex",flexDirection:"column",font:c.c.bodySemibold,padding:"0px 100px"},contentMobile:{padding:"0px 30px"},highlightedText:{display:"flex",flexDirection:"column",padding:"30px",margin:"0px 0px 32px 0px"},highlightedTextRegular:{font:c.c.h5,fontStyle:"italic",color:c.b.purple},highlightedTextLarge:{font:c.c.h4,fontStyle:"italic",color:c.b.purple},image:{maxWidth:"100%",maxHeight:"100%",width:"auto",height:"auto",objectFit:"scale-down"},caption:{font:c.c.bodySemibold,fontStyle:"italic",float:"right"},imageParent:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"32px"}},d=function(t){var e=t.highlighted_text.split("<br />");return e.map((function(t){return t.replace("<br />","")})),Object(n.b)("div",{css:b.highlightedText},e.map((function(t,e){return Object(n.b)("span",{css:0===e?b.highlightedTextLarge:b.highlightedTextRegular,key:e},t)})))},s=function(t){var e=t.isMobile,i=t.title,c=t.subtitle,l=t.date,a=t.photos,s=t.body,x=t.highlighted_text;console.log(l);var h=r()(l.toDate());return Object(n.b)("div",{css:e?Object(o.a)(Object(o.a)({},b.project),b.projectMobile):b.project},Object(n.b)("div",{css:b.projectHeader},Object(n.b)("span",{css:b.header},Object(n.b)("h1",{css:b.postTitle},i),Object(n.b)("h2",{css:b.postSubtitle},h.format("DD.MM.YYYY"))),Object(n.b)("h2",{css:b.postSubtitle},c)),Object(n.b)("div",{css:e?Object(o.a)(Object(o.a)({},b.projectBody),b.projectBodyMobile):b.projectBody},Object(n.b)("div",{css:Object(o.a)(Object(o.a)({},b.content),b.contentMobile)},s&&s.map((function(t,e){return Object(n.b)(p.a.Fragment,{key:e},Object(n.b)("p",{css:b.para,key:e},t),0===e&&Object(n.b)(d,{highlighted_text:x}))})),a&&a.map((function(t,e){return console.log(t),Object(n.b)("div",{css:b.imageParent,key:e},Object(n.b)("span",{css:b.caption},t.alt),Object(n.b)("img",{src:t.src,css:b.image,alt:t.alt}))})))))},x={parent:{padding:"0px 0px 30px",backgroundColor:c.b.pink,width:"100%",display:"flex",flexDirection:"column",alignItems:"center"},title:{color:c.b.purple,font:c.c.h1,margin:"0px 0px 20px",display:"flex",justifyContent:"center",maxWidth:"100%"},subtitle:{color:c.b.purple,font:c.c.h3,width:"100%"},content:{display:"flex",flexDirection:"column",font:c.c.bodySemibold,padding:"0px 100px"},contentMobile:{padding:"0px 30px"}};e.default=function(t){var e=t.width,i=t.content,l=t.photos,p=e<c.a.tablet;return i?Object(n.b)("div",{css:x.parent},Object(n.b)("h1",{css:x.title},"blog"),i.blogs.map((function(t,e){return Object(n.b)(s,Object(o.a)(Object(o.a)({isMobile:p},t),{},{photos:l&&l[t.title]&&Object.values(l[t.title]),key:e,index:e}))}))):Object(n.b)("div",null)}}}]);
//# sourceMappingURL=4.1c7f6061.chunk.js.map