(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4957],{43211:function(e,t,n){Promise.resolve().then(n.bind(n,32522))},33610:function(e,t,n){"use strict";n.d(t,{R:function(){return DocumentAPI}});var a=n(41962),s=n(75826),r=n(60171),c=n(2890),l=n.n(c),i=n(15230);let DocumentAPI=class DocumentAPI{static async getTopDocumentsOfSubject(e,t){try{return await s.Z.get("/document/getDocumentOfSubject",{params:{subjectId:e,limit:t}})}catch(e){return console.log(e),r.toast.error("Fetch t\xe0i liệu thất bại"),[]}}static async userUploadFiles(e){console.log("haha");try{return await Promise.all(e.files.map(async t=>{let n=new FormData;console.log(t.name),n.append("request",JSON.stringify({name:t.name,category:e.category,subjectId:e.subjectId})),t.originFileObj&&n.append("up",t.originFileObj);try{await s.Z.post("/document/createDocument",n,{headers:{"Content-Type":"multipart/form-data"}})}catch(e){console.log(e),r.toast.error("Tải t\xe0i liệu thất bại")}})),{ok:!0}}catch(e){return console.log(e),r.toast.error("Tải t\xe0i liệu thất bại"),{ok:!1}}}static async getMySubjectDocs(e,t){try{let n=await s.Z.get("/document/getMyDocumentByStudentId",{params:{studentId:t}});if(n=n.filter(t=>t.subjectId+""===e),0===n.length)return[];let a=l().map(l().groupBy(n,"category"),(e,t)=>({category:t,files:l().map(e,e=>({name:e.name,ext:(0,i.N)(e.link).ext.toUpperCase(),id:e.id,link:e.link,createdAt:new Date(e.createdAt)}))}));return a}catch(e){throw console.log(e),r.toast.error("Lấy m\xf4n học của bạn thất bại"),e}}static async deleteMySubjectDoc(e){return await (0,a.g)(2e3),{ok:!0}}static async getAllDocumentsOfSubject(e){try{let t=await s.Z.get("/document/getDocumentOfSubject",{params:{subjectId:e}});return t.map(e=>({...e,createdAt:new Date(e.createdAt)}))}catch(e){return console.log(e),r.toast.error("Fetch document thất bại"),[]}}static async toggleShare(e){return await (0,a.g)(2e3),{ok:!0}}}},75826:function(e,t,n){"use strict";var a=n(92173),s=n(99110),r=n(99231),c=n.n(r);let l=new s.Z,i=a.Z.create({baseURL:"http://fall2324w3g4.int3306.freeddns.org/api"});i.interceptors.request.use(e=>{let t=l.get("authToken");return c()(t)||(e.headers.Authorization="Bearer ".concat(t)),e},e=>Promise.reject(e)),i.interceptors.response.use(e=>e.data,e=>e.response?Promise.reject({status:e.response.status,data:e.response.data}):Promise.reject(e.request?e.request:e.message)),t.Z=i},32522:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return SearchPage}});var a=n(57437),s=n(33610),r=n(60171),c=n(75826);let SearchAPI=class SearchAPI{static async searchSubjects(e){try{return(await c.Z.get("/subject/getSubjectByName",{params:{name:e}})).map(e=>({id:e.Id+"",name:e.Name,credits:e.Credit,code:e.Code}))}catch(e){return console.log(e),r.toast.error("Fetch m\xf4n học t\xecm kiếm thất bại"),[]}}};var l=n(55820),i=n(49394),o=n(78840),u=n(14666),d=n(24010),m=n(38371),f=n(15230),h=n(93406),x=n(40155),g=n(89158),p=n(26782),j=n(80338),v=n(35302),N=n(61396),w=n.n(N),b=n(24033),y=n(2265);let{Text:O}=v.default;function SearchPage(){var e;let t=(0,b.useSearchParams)(),n=null!==(e=t.get("subjectName"))&&void 0!==e?e:"",[r,c]=(0,y.useState)(!0),[m,v]=(0,y.useState)([]),N=(0,b.useRouter)(),[R,C]=(0,y.useState)(!1);return(0,y.useEffect)(()=>{C(!0),c(!0),setTimeout(()=>C(!1),1e3)},[N,n]),(0,a.jsx)(d.default,{title:n,children:(0,a.jsxs)("div",{className:"flex h-full gap-4",children:[(0,a.jsxs)("div",{className:"flex-[7] flex flex-col gap-5",children:[(0,a.jsx)(u.Z,{title:"M\xf4n học"}),!R&&(0,a.jsx)(o.Z,{render:e=>(0,a.jsx)(i.Z,{url:(0,h.A)("/all-subjects/details",{subjectId:e.id}),title:e.name,info:(0,a.jsx)(O,{type:"secondary",children:"".concat(e.code,", ").concat(e.credits," t\xedn chỉ")}),imgHeight:150}),dataKey:e=>e.id,fetchMore:()=>SearchAPI.searchSubjects(n),howManyFetch:1,fetchKey:n,onLoadMoreDone:async e=>{c(!0);let t=await Promise.all(e.map(async e=>(await s.R.getTopDocumentsOfSubject(e.id,5)).map(t=>({...t,subjectName:e.name})))),n=[];for(let e of t)n.push(...e);v(n),c(!1)}})]}),(0,a.jsx)(x.default,{type:"vertical",className:"h-auto"}),(0,a.jsxs)("div",{className:"flex flex-col flex-[3]",children:[(0,a.jsx)(u.Z,{title:"T\xe0i liệu li\xean quan"}),(0,a.jsx)(p.Z,{active:!0,round:!0,loading:r,className:"mt-5",children:m.length>0?(0,a.jsx)(g.Z,{children:m.map(e=>(0,a.jsx)(g.Z.Item,{children:(0,a.jsx)(w(),{href:(0,h.A)("/all-subjects/documents/details",{documentId:e.id}),children:(0,a.jsxs)(j.default,{className:"pr-8 w-full max-w-[30vw]",children:[(0,a.jsx)("div",{className:"w-[40px]",children:(0,a.jsx)(l.Z,{ext:(0,f.N)(e.link).ext})}),(0,a.jsxs)("p",{children:[(0,a.jsx)(O,{strong:!0,className:"text-inherit",children:e.name})," ",(0,a.jsx)("br",{}),(0,a.jsx)(O,{strong:!0,type:"secondary",children:"".concat(e.subjectName)})]})]})})},e.id))}):(0,a.jsx)(O,{strong:!0,italic:!0,type:"secondary",className:"mt-5",children:"Kh\xf4ng c\xf3 t\xe0i liệu"})})]})]})})}(0,m.Z)()},36045:function(e,t,n){"use strict";var a=n(57437),s=n(35302),r=n(99231),c=n.n(r),l=n(33147),i=n(2265),o=n(23986);let{Text:u}=s.default,d=["#7bb8ea","#FFBC99","#FFD88D","#B5E4CA","#CABDFF","#B1E5FC","#E0C9C1"];t.Z=i.memo(e=>{let{color:t,className:n,children:s}=e;return(c()(t)&&(t=d[(0,l.Z)(d.length-1)]),s)?(0,a.jsx)("div",{className:(0,o.m)("min-h-8 px-1 min-w-8 rounded-md flex items-center justify-center text-center",n),style:{backgroundColor:t},children:(0,a.jsx)(u,{strong:!0,className:"font-semibold text-xl",children:s})}):(0,a.jsx)("div",{className:(0,o.m)("h-8 w-4 rounded",n),style:{backgroundColor:t}})})},55820:function(e,t,n){"use strict";n.d(t,{Z:function(){return DocumentImage}});var a=n(57437),s=n(16691),r=n.n(s),c=n(2265);function DocumentImage(e){let{ext:t}=e,[n,s]=(0,c.useState)("/images/icons/".concat(t.toUpperCase(),".png"));return(0,a.jsx)(r(),{src:n,alt:t,width:5e3,height:5e3,className:"!w-[40px] !h-[40px]",onError:e=>s("/images/icons/documents.png")})}},49394:function(e,t,n){"use strict";n.d(t,{Z:function(){return Preview}});var a=n(57437),s=n(93406),r=n(26782),c=n(35302),l=n(16691),i=n.n(l),o=n(24033),u=n(2265),d=n(99231),m=n.n(d),f=n(33147);let{Text:h,Title:x}=c.default;function Preview(e){let{imgSrc:t,imgAlt:n,star:c,stared:l=!1,url:i,newTab:u=!1,params:d,title:f,info:h,tag:p,loading:j=!1,imgHeight:v=200,children:N}=e,w=(0,o.useRouter)();return j?(0,a.jsxs)("div",{className:"flex flex-col gap-3 w-full",children:[(0,a.jsx)(r.Z.Image,{active:!0,className:"!w-full",style:{height:v}}),(0,a.jsx)(r.Z.Input,{active:!0,size:"small",style:{width:"70%",height:15}}),(0,a.jsx)(r.Z.Input,{active:!0,size:"small",style:{width:"70%",height:15}})]}):(0,a.jsxs)("div",{className:"group/preview cursor-pointer flex flex-col gap-3 w-full h-fit relative animate__animated animate__fadeIn",onClick:()=>{m()(i)||(u?(0,s.R)(i,d):w.push((0,s.A)(i,d)))},children:[(0,a.jsxs)("div",{className:"relative overflow-hidden",style:{height:v},children:[(0,a.jsx)(g,{imgSrc:t,imgAlt:n,url:i}),(0,a.jsx)("div",{className:"absolute top-0 left-0 group-hover/preview:bg-[rgba(17,19,21,0.8)] w-full h-full transition-all duration-300 rounded-[15px]"}),(0,a.jsx)("div",{className:"z-20 absolute top-4 right-4 ".concat(l?"":"hidden opacity-0 group-hover/preview:block group-hover/preview:opacity-100 transition-opacity duration-300"),children:c})]}),(0,a.jsxs)("div",{className:"flex gap-5 w-full",children:[(0,a.jsxs)("div",{className:"flex flex-col flex-1 items-start text-start",children:[(0,a.jsx)(x,{level:5,className:"group-hover/preview:text-[#69b1ff]",children:f}),h]}),(0,a.jsx)("div",{className:"",children:p})]})]})}let g=u.memo(function(e){let{imgSrc:t,imgAlt:n,url:s}=e;return(0,a.jsx)(i(),{src:t||"/images/preview/".concat((0,f.Z)(7),".png"),alt:null!=n?n:s,className:"rounded-[12px]",fill:!0,objectFit:"cover"})})},78840:function(e,t,n){"use strict";n.d(t,{Z:function(){return PreviewList}});var a=n(57437),s=n(18142),r=n(20020),c=n(49385),l=n(35302),i=n(2890),o=n.n(i),u=n(2265),d=n(42333),m=n(61109);let{Text:f}=l.default;function PreviewList(e){var t;let{render:n,dataKey:l,fetchMore:h,filter:x,dataPerFetch:g=6,cols:p,howManyFetch:j=99999999,fetchKey:v,onLoadMoreDone:N}=e,w=o().mapValues({xs:1,md:2,lg:3,xxl:4,...p},e=>24/e),[b,y]=(0,u.useState)([]),[O,R]=(0,u.useState)(1),[C,_]=(0,u.useState)(!1),{data:A}=(0,d.ZP)([v,O,O+g-1],e=>{let[t,n,a]=e;return h(n,a)});return(0,u.useEffect)(()=>{(0,i.isUndefined)(A)||(null==N||N(A),0==--j&&_(!0),A.length>0?(1===O&&y(()=>[]),y(e=>[...e,...A])):_(!0))},[A,j]),(0,u.useEffect)(()=>{R(()=>1)},[v]),(0,a.jsx)(m.Z,{dataLength:b.length,hasMore:!C,loader:(0,a.jsx)(c.default,{className:"mt-5"}),next:()=>{R(O+g)},endMessage:(0,a.jsx)(f,{type:"secondary",strong:!0,className:"self-center mt-5 text-xl",children:"".concat(b.length,"/").concat(b.length)}),className:"flex flex-col !overflow-visible",children:(0,a.jsx)(r.Z,{gutter:[25,33],className:"flex-wrap",children:(null!==(t=null==x?void 0:x(b))&&void 0!==t?t:b).map((e,t)=>(0,a.jsx)(s.Z,{...w,className:"animate__animated animate__fadeIn",children:n(e)},l(e)))})})}},14666:function(e,t,n){"use strict";n.d(t,{Z:function(){return TitleWithBox}});var a=n(57437);n(2265);var s=n(36045),r=n(23986);function TitleWithBox(e){let{color:t,title:n,titleClassName:c,size:l="large",boxContent:i,className:o,boxClassName:u}=e;return(0,a.jsxs)("div",{className:(0,r.m)("flex gap-4 items-center",o),children:[(0,a.jsx)(s.Z,{color:t,className:u,children:i}),(0,a.jsx)("span",{className:(0,r.m)("font-semibold ".concat("ultra"===l?"text-3xl":"text-2xl"),c),children:n})]})}},24010:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Main}});var a=n(57437),s=n(89271),r=n(35302);n(2265);var c=n(23986),l=n(78073);function BackTopIcon(e){let{size:t,color:n,className:s}=e;return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:null!=t?t:30,height:null!=t?t:30,fill:null!=n?n:l.C.ROYAL_GRAY_COLOR,className:s,children:(0,a.jsx)("path",{d:"M17.71,9.88l-4.3-4.29a2,2,0,0,0-2.82,0L6.29,9.88a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0L11,8V19a1,1,0,0,0,2,0V8l3.29,3.29a1,1,0,1,0,1.42-1.41Z"})})}let{Title:i}=r.default;function Main(e){let{className:t,children:n,title:r,goToTop:l=!0}=e;return(0,a.jsxs)("div",{className:"flex flex-col ml-layout-el w-auto mr-body-pd",children:[r&&(0,a.jsx)(i,{level:2,className:"mt-3",children:r}),(0,a.jsxs)("main",{className:(0,c.m)("\n                bg-secondary\n                rounded-layout-el\n                p-8\n                min-h-[calc(100vh-109px)]\n                shadow\n            ",t),children:[n,l&&(0,a.jsx)(s.Z.BackTop,{icon:(0,a.jsx)(BackTopIcon,{className:"absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 group-hover:fill-black"}),className:"group"})]})]})}},78073:function(e,t,n){"use strict";n.d(t,{C:function(){return a}});let a={PRIMARY_COLOR:"#4096ff",DARK_PRIMARY_COLOR:"#19619D",LIGHT_PRIMARY_COLOR:"#c6e0f6",SECONDARY_COLOR:"#FFFFFF",SECONDARY_CONTRAST_COLOR:"#1A1D1F",ROYAL_GRAY_COLOR:"#6F767E",TABLE_BORDER_COLOR:"rgba(75, 85, 99)",DANGER_COLOR:"#FF4D4F",PRIMARY_ICON_COLOR:"#7D7C7C",UNDERGROUND_COLOR:"#f4f4f4",CLICKABLE_COLOR:"#4096ff",LAYOUT_ELEMENT_SPACE:"15px",LAYOUT_ELEMENT_BORDER_RADIUS:"15px",BODY_PADDING:"12px"}},41962:function(e,t,n){"use strict";function delay(e){return new Promise(t=>setTimeout(t,e))}n.d(t,{g:function(){return delay}})},38371:function(e,t,n){"use strict";n.d(t,{Z:function(){return genId}});var a=n(51872);function genId(){return(0,a.Z)()}},15230:function(e,t,n){"use strict";function getExtOfFile(e){let t,n;let a=e.lastIndexOf(".");return -1!==a?(t=e.slice(0,a),n=e.slice(a+1)):(t=e,n=""),{ext:n,name:t}}n.d(t,{N:function(){return getExtOfFile}})},93406:function(e,t,n){"use strict";n.d(t,{A:function(){return getURL},R:function(){return openNewTab}});var a=n(2890),s=n.n(a);function openNewTab(e,t){e=getURL(e,t),window.open(e,"_blank")}function getURL(e,t){return t&&(e+="?"+s().join(s().map(t,(e,t)=>"".concat(t,"=").concat(encodeURIComponent(e))),"&")),e}}},function(e){e.O(0,[1866,9020,7614,9273,2808,9235,3986,4890,9271,9385,5623,413,1396,2333,5895,9158,5203,3293,2971,2472,1744],function(){return e(e.s=43211)}),_N_E=e.O()}]);