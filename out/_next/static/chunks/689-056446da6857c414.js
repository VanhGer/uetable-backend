(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[689],{75826:function(e,t,n){"use strict";var s=n(92173),l=n(99110),a=n(99231),r=n.n(a);let c=new l.Z,i=s.Z.create({baseURL:"http://fall2324w3g4.int3306.freeddns.org/api"});i.interceptors.request.use(e=>{let t=c.get("authToken");return r()(t)||(e.headers.Authorization="Bearer ".concat(t)),e},e=>Promise.reject(e)),i.interceptors.response.use(e=>e.data,e=>e.response?Promise.reject({status:e.response.status,data:e.response.data}):Promise.reject(e.request?e.request:e.message)),t.Z=i},10689:function(e,t,n){"use strict";n.r(t),n.d(t,{accessibleRoute:function(){return accessibleRoute},cookies:function(){return er},default:function(){return DashboardLayout}});var s=n(57437),l=n(75826),a=n(16691),r=n.n(a),c=n(2265),i={src:"/_next/static/media/uet-logo.07cd0605.svg",height:80,width:80,blurWidth:0,blurHeight:0},o=n(78073);function Footer(){return(0,s.jsx)("footer",{className:"bg-secondary rounded-layout-el p-3 mt-layout-el ml-layout-el mr-body-pd shadow",children:(0,s.jsx)("div",{className:"flex-row",children:(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)(r(),{src:i,alt:"uet-logo"}),(0,s.jsxs)("div",{className:"flex-col ml-2",children:[(0,s.jsx)("div",{className:"font-semibold",style:{color:o.C.PRIMARY_COLOR},children:"Trường Đại học C\xf4ng nghệ, Đại học Quốc gia H\xe0 Nội"}),(0,s.jsx)("div",{className:"text-gray-400 text-xs",children:"Nh\xe0 E3, 144 Xu\xe2n Thuỷ, Cầu Giấy, H\xe0 Nội"})]})]})})})}var u=n(3198),d=n(58837),h=n(25418),x=n(2114),m=n(76431),g=n(95381),f=n(61396),p=n.n(f),v=n(24033),b=n(48794),j=n(41791),N=n(75204),I=n(40155),C=n(60171);let NotiAPI=class NotiAPI{static async getAllNoti(){try{let e=await l.Z.get("/notification/getNotification");return e.map(e=>({content:e.Content,createdAt:new Date(e.CreatedAt),id:e.Id,link:e.Link,seen:0!==e.Seen,reply:e.author}))}catch(e){return console.log(e),C.toast.error("Tải th\xf4ng b\xe1o thất bại"),[]}}static async markAllAsRead(){return await this.seenNoti(5,"all")}static async seenNoti(e,t){try{let n=await l.Z.post("/notification/seenNotification",{seenType:t,notiId:e});return console.log(n),{ok:!0}}catch(e){return console.log(e),{ok:!1}}}};function NotificationIcon(e){let{size:t,color:n,className:l,solid:a=!1}=e;return(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:null!=t?t:24,height:null!=t?t:24,fill:null!=n?n:o.C.ROYAL_GRAY_COLOR,className:l,children:a?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("path",{d:"M7.424,21a4.99,4.99,0,0,0,9.152,0Z"}),(0,s.jsx)("path",{d:"M22.392,12.549,20.656,6.826A9.321,9.321,0,0,0,2.58,7.28L1.232,12.817A5,5,0,0,0,6.09,19H17.607a5,5,0,0,0,4.785-6.451Z"})]}):(0,s.jsx)("path",{d:"M22.555,13.662l-1.9-6.836A9.321,9.321,0,0,0,2.576,7.3L1.105,13.915A5,5,0,0,0,5.986,20H7.1a5,5,0,0,0,9.8,0h.838a5,5,0,0,0,4.818-6.338ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm8.126-5.185A2.977,2.977,0,0,1,17.737,18H5.986a3,3,0,0,1-2.928-3.651l1.47-6.616a7.321,7.321,0,0,1,14.2-.372l1.9,6.836A2.977,2.977,0,0,1,20.126,16.815Z"})})}var w=n(69814),O=n(82881),L=n(22393),R=n.n(L),y=n(88302),Z=n(95022),A=n(89158),S=n(63908),_=n(80338),M=n(35302),k=n(36468),E=n(42333);let{Text:G,Paragraph:F,Title:T}=M.default;function Notifications(){let{data:e,isLoading:t}=(0,E.ZP)("get noti",NotiAPI.getAllNoti,{refreshInterval:1e3}),[n,l]=(0,c.useState)(0),[a,r]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{var t;l(null!==(t=null==e?void 0:e.reduce((e,t)=>e+(t.seen?0:1),0))&&void 0!==t?t:0)},[e]),(0,s.jsx)(m.default,{content:(0,s.jsx)(NotiList,{notiList:e}),trigger:"click",arrow:!1,placement:"bottom",onOpenChange:e=>r(e),children:(0,s.jsx)(Z.default,{count:n,overflowCount:9,title:"Th\xf4ng b\xe1o",className:"mr-7 ".concat(R().className),children:(0,s.jsx)("div",{className:"w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer",children:(0,s.jsx)(NotificationIcon,{solid:a})})})})}let H=["all","unseen"],D={all:"Tất cả",unseen:"Chưa đọc"};function NotiList(e){let{notiList:t}=e,[n,l]=(0,c.useState)(!1),[a,r]=(0,c.useState)("all"),i=(0,v.useRouter)(),o=(0,c.useMemo)(()=>{switch(a){case"all":return t;case"unseen":return null==t?void 0:t.filter(e=>!e.seen)}return[]},[a,t]);return(0,s.jsxs)(_.default,{direction:"vertical",className:"max-h-[80vh] w-[25vw] overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin",children:[(0,s.jsxs)("div",{className:"w-full flex",children:[(0,s.jsx)(T,{level:4,children:"Th\xf4ng b\xe1o"}),(0,s.jsx)(m.default,{open:n,placement:"bottomRight",content:(0,s.jsx)("button",{onClick:e=>{e.preventDefault(),NotiAPI.markAllAsRead().then(e=>{let{ok:t}=e;t||C.toast.error("Update th\xf4ng b\xe1o thất bại")}).catch(e=>{C.toast.error("Update th\xf4ng b\xe1o thất bại")}),l(!1)},children:(0,s.jsxs)(_.default,{className:"rounded-lg p-2 hover:bg-gray-200",children:[(0,s.jsx)(G,{children:"Đ\xe1nh dấu tất cả l\xe0 đ\xe3 đọc"}),(0,s.jsx)(w.Z,{})]})}),onOpenChange:e=>l(e),trigger:"click",children:(0,s.jsx)(O.Z,{onClick:()=>l(!0),className:"ml-auto hover:bg-gray-200",rounded:!0,children:(0,s.jsx)(k.Ppk,{size:"1.5em"})})})]}),(0,s.jsx)(S.Z,{options:H.map(e=>({value:e,label:(0,s.jsx)(G,{strong:!0,className:"".concat(e===a?"text-primary":""),children:D[e]})})),onChange:e=>r(e)}),(null==t?void 0:t.length)===0?(0,s.jsx)("div",{className:"mt-5",children:(0,s.jsx)(G,{type:"secondary",italic:!0,children:"Bạn kh\xf4ng c\xf3 th\xf4ng b\xe1o n\xe0o"})}):(0,s.jsx)(A.Z,{bordered:!1,children:null==o?void 0:o.map(e=>(0,s.jsx)(A.Z.Item,{children:(0,s.jsx)("button",{onClick:()=>{i.replace(e.link),e.seen||NotiAPI.seenNoti(e.id,"single")},className:"text-start",children:(0,s.jsxs)(_.default,{className:"hover:bg-gray-200 rounded-lg p-2",children:[(0,s.jsxs)(_.default,{align:"start",children:[(0,s.jsx)(x.ZP,{src:e.reply.avatar,alt:e.reply.name,size:50}),(0,s.jsxs)("span",{children:[(0,s.jsx)(G,{children:e.content})," ",(0,s.jsx)("br",{}),(0,s.jsx)(G,{type:"secondary",className:"text-[0.85rem]",children:(0,y.i)(e.createdAt)})]})]}),(0,s.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#55CA36] ".concat(e.seen?"invisible":"visible")})]})})},e.id))})]})}function Header(){var e;let[t,n]=(0,c.useState)(o.C.PRIMARY_COLOR),a=(0,u.v9)(h.a),r=(0,u.I0)(),i=(0,v.useRouter)(),[f,C]=(0,c.useState)(!1),[w,O]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{let handleScroll=()=>{window.scrollY>0?C(!0):C(!1)};return(null==a?void 0:a.signedIn)&&l.Z.get("/users/"+(null==a?void 0:a.studentId)).then(e=>{r(d.Y.updateAuthState({avtLink:e.avatar}))}),window.addEventListener("scroll",handleScroll),()=>{window.removeEventListener("scroll",handleScroll)}},[null==a?void 0:a.signedIn,null==a?void 0:a.studentId,r]),(0,s.jsx)("header",{className:"sticky top-0 z-[1000] bg-underground",style:{transition:"padding-left 0.3s ease-in-out"},children:(0,s.jsxs)("div",{className:"flex items-center h-[80px] bg-secondary px-8",style:{transition:"border-radius 0.3s ease-in-out",boxShadow:"inset 1px 0px 0px #F4F4F4, inset 0 -1px 0px #EFEFEF"},children:[(0,s.jsx)("div",{className:"flex-1",children:(0,s.jsx)(g.Z,{placeholder:"T\xecm kiếm học phần",className:"w-[25vw]"})}),a.signedIn?(0,s.jsxs)("div",{className:"flex mr-5 items-center",children:[(0,s.jsx)(Notifications,{}),(0,s.jsx)("button",{onMouseEnter:()=>n(o.C.DARK_PRIMARY_COLOR),onMouseLeave:()=>n(o.C.PRIMARY_COLOR),children:(0,s.jsx)("div",{className:"relative flex",children:(0,s.jsxs)(m.default,{content:(e=er.get("role"),(0,s.jsxs)("div",{className:"rounded-lg flex-col flex w-[200px] gap-2",children:[(0,s.jsxs)("button",{className:"w-full font-semibold flex rounded-lg hover:bg-gray-100 p-2",onClick:()=>{O(!1),i.push("/profile?studentid="+er.get("studentid"))},children:[(0,s.jsx)("div",{className:" mr-5",children:(0,s.jsx)(N.Z,{})}),"Hồ sơ"]}),"admin"==e&&(0,s.jsx)("button",{className:"w-full font-semibold flex rounded-lg hover:bg-gray-100 p-2",children:(0,s.jsxs)("a",{href:"http://localhost:8000/admin",className:"flex",children:[(0,s.jsx)("div",{className:"mr-5",children:(0,s.jsx)(j.Z,{})}),"Admin"]})}),(0,s.jsx)(I.default,{className:"m-0"}),(0,s.jsxs)("button",{className:"w-full text-red-500 font-semibold flex rounded-lg hover:bg-gray-100 p-2",onClick:()=>{er.remove("authToken",{path:"/"}),r(d.Y.updateAuthState({signedIn:!1,logging:!1,name:"",studentId:""})),i.push("/")},children:[(0,s.jsx)("div",{className:"mr-5",children:(0,s.jsx)(b.Z,{})}),"Đăng xuất"]})]})),trigger:"click",arrow:!1,placement:"bottomLeft",open:w,onOpenChange:e=>O(e),children:[(0,s.jsx)(x.ZP,{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",src:a.avtLink,size:40}),(0,s.jsx)("svg",{width:"50",height:"50",viewBox:"0 0 32 32",children:(0,s.jsx)("circle",{r:"15",cx:"16",cy:"16",fill:"none",strokeWidth:"2",style:{stroke:t}})})]})})}),(0,s.jsxs)("div",{className:"ml-3",children:[(0,s.jsx)("div",{className:"font-semibold ",children:"Xin ch\xe0o,"}),(0,s.jsx)("div",{className:"text-xs font-semibold",children:"".concat(a.studentId," ").concat(a.name)})]})]}):(0,s.jsxs)("div",{className:"flex gap-4",children:[(0,s.jsx)(p(),{href:"/signup",children:(0,s.jsx)("button",{className:"bg-gray-200 hover:bg-gray-300 shadow rounded-lg text-primary px-[17px] py-[7px]",children:"Đăng k\xfd"})}),(0,s.jsx)(p(),{href:"/signin",children:(0,s.jsx)("button",{className:"bg-primary hover:bg-dark-primary shadow rounded-[10px] text-secondary",style:{padding:"7px 17px"},children:"Đăng nhập"})})]})]})})}var B=n(2762),Y=n(99150),P=n(95653);function AllSubjectsIcon(e){let{size:t,color:n,className:l}=e;return(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:null!=t?t:P.G.ICON_SIZE,height:null!=t?t:P.G.ICON_SIZE,fill:null!=n?n:P.G.ICON_COLOR,className:l,children:(0,s.jsx)("path",{d:"M19.95,5.536l-3.485-3.485c-1.322-1.322-3.08-2.05-4.95-2.05H7C4.243,0,2,2.243,2,5v14c0,2.757,2.243,5,5,5h10c2.757,0,5-2.243,5-5V10.485c0-1.87-.728-3.627-2.05-4.95Zm-1.414,1.414c.318,.318,.587,.671,.805,1.05h-4.341c-.551,0-1-.449-1-1V2.659c.379,.218,.733,.487,1.05,.805l3.485,3.485Zm1.464,12.05c0,1.654-1.346,3-3,3H7c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h4.515c.163,0,.325,.008,.485,.023V7c0,1.654,1.346,3,3,3h4.977c.015,.16,.023,.322,.023,.485v8.515Zm-4.5-6h-7c-1.378,0-2.5,1.122-2.5,2.5v2c0,1.378,1.122,2.5,2.5,2.5h7c1.378,0,2.5-1.122,2.5-2.5v-2c0-1.378-1.122-2.5-2.5-2.5Zm.5,4.5c0,.276-.224,.5-.5,.5h-7c-.276,0-.5-.224-.5-.5v-2c0-.276,.224-.5,.5-.5h7c.276,0,.5,.224,.5,.5v2ZM6,10c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1s-.448,1-1,1h-2c-.552,0-1-.448-1-1Zm0-4c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1s-.448,1-1,1h-2c-.552,0-1-.448-1-1Z"})})}function HomeIcon(e){let{size:t,color:n,className:l}=e;return(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:null!=t?t:P.G.ICON_SIZE,height:null!=t?t:P.G.ICON_SIZE,fill:null!=n?n:P.G.ICON_COLOR,className:l,viewBox:"0 0 24 24",children:(0,s.jsx)("path",{d:"m23.121 9.069-7.585-7.586a5.008 5.008 0 0 0-7.072 0L.879 9.069A2.978 2.978 0 0 0 0 11.19v9.817a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V11.19a2.978 2.978 0 0 0-.879-2.121ZM15 22.007H9v-3.934a3 3 0 0 1 6 0Zm7-1a1 1 0 0 1-1 1h-4v-3.934a5 5 0 0 0-10 0v3.934H3a1 1 0 0 1-1-1V11.19a1.008 1.008 0 0 1 .293-.707L9.878 2.9a3.008 3.008 0 0 1 4.244 0l7.585 7.586a1.008 1.008 0 0 1 .293.704Z"})})}var V=n(13749),z=n(28797);function StatIcon(e){let{size:t,color:n,className:l}=e;return(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:null!=t?t:P.G.ICON_SIZE,height:null!=t?t:P.G.ICON_SIZE,fill:null!=n?n:P.G.ICON_COLOR,className:l,children:[(0,s.jsx)("path",{d:"M23,22H5a3,3,0,0,1-3-3V1A1,1,0,0,0,0,1V19a5.006,5.006,0,0,0,5,5H23a1,1,0,0,0,0-2Z"}),(0,s.jsx)("path",{d:"M6,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,6,20Z"}),(0,s.jsx)("path",{d:"M10,10v9a1,1,0,0,0,2,0V10a1,1,0,0,0-2,0Z"}),(0,s.jsx)("path",{d:"M15,13v6a1,1,0,0,0,2,0V13a1,1,0,0,0-2,0Z"}),(0,s.jsx)("path",{d:"M20,9V19a1,1,0,0,0,2,0V9a1,1,0,0,0-2,0Z"}),(0,s.jsx)("path",{d:"M6,9a1,1,0,0,0,.707-.293l3.586-3.586a1.025,1.025,0,0,1,1.414,0l2.172,2.172a3,3,0,0,0,4.242,0l5.586-5.586A1,1,0,0,0,22.293.293L16.707,5.878a1,1,0,0,1-1.414,0L13.121,3.707a3,3,0,0,0-4.242,0L5.293,7.293A1,1,0,0,0,6,9Z"})]})}var U=n(9273),K=n(9736),W={src:"/_next/static/media/curve-nav.d3136a58.svg",height:14,width:14,blurWidth:0,blurHeight:0},q=n(94176);function LinkIcon(e){let{size:t,color:n,className:l}=e;return(0,s.jsx)("svg",{width:null!=t?t:P.G.ICON_SIZE,height:null!=t?t:P.G.ICON_SIZE,fill:null!=n?n:P.G.ICON_COLOR,className:l,viewBox:"0 0 24 24",children:(0,s.jsx)("path",{xmlns:"http://www.w3.org/2000/svg",d:"M7.835,16.17c-.23-.23-.446-.482-.641-.748-.325-.446-.227-1.072,.22-1.397,.446-.325,1.071-.227,1.397,.219,.129,.178,.274,.349,.437,.511,.803,.803,1.87,1.245,3.005,1.245s2.203-.442,3.005-1.245l5.5-5.5c1.657-1.657,1.657-4.354,0-6.011s-4.354-1.657-6.011,0l-1.058,1.058c-.391,.391-1.023,.391-1.414,0s-.391-1.023,0-1.414l1.058-1.058c2.437-2.438,6.402-2.438,8.839,0,2.437,2.437,2.437,6.402,0,8.839l-5.5,5.5c-1.18,1.181-2.75,1.831-4.419,1.831s-3.239-.65-4.418-1.83Zm-1.582,7.83c1.67,0,3.239-.65,4.419-1.831l1.058-1.058c.391-.39,.391-1.023,0-1.414-.39-.391-1.023-.39-1.414,0l-1.059,1.058c-.803,.803-1.87,1.245-3.005,1.245s-2.202-.442-3.005-1.245-1.245-1.87-1.245-3.005,.442-2.203,1.245-3.005l5.5-5.5c.803-.803,1.87-1.245,3.005-1.245s2.203,.442,3.005,1.245c.16,.161,.306,.332,.436,.51,.324,.447,.949,.547,1.397,.221,.447-.325,.546-.95,.221-1.397-.19-.262-.405-.513-.639-.747-1.181-1.182-2.751-1.832-4.42-1.832s-3.239,.65-4.419,1.831L1.834,13.331C.653,14.511,.003,16.081,.003,17.75c0,1.669,.65,3.239,1.831,4.419,1.18,1.181,2.749,1.831,4.419,1.831Z"})})}var X=n(2890),$=n.n(X);let Q=["","schedule","mysubjects","all-subjects","statistic","links","subject-class","calendar","exam","semester","registered","curriculum","credit","gpa","personal","subject"];function NavMenu(e){let{expand:t}=e,n=(0,v.usePathname)(),l=(0,v.useRouter)(),[a,r]=(0,c.useState)(""),[i,o]=(0,c.useState)([]),u=(0,c.useMemo)(()=>(function(e,t){function getLabel(e){return t?ee[e]:""}return[getGroupMenuItem("general","Chung",[getNormalMenuItem("",e,getLabel(""),!1,HomeIcon),getSubMenuItem("schedule",getLabel("schedule"),z.Z,[getNormalMenuItem("subject-class",e,getLabel("subject-class"),!0),getNormalMenuItem("calendar",e,getLabel("calendar"),!0)]),getSubMenuItem("mysubjects",getLabel("mysubjects"),V.Z,[getNormalMenuItem("semester",e,getLabel("semester"),!0),getNormalMenuItem("registered",e,getLabel("registered"),!0)]),getNormalMenuItem("all-subjects",e,getLabel("all-subjects"),!1,AllSubjectsIcon)]),getGroupMenuItem("explore","Kh\xe1m ph\xe1",[getSubMenuItem("statistic",getLabel("statistic"),StatIcon,[getNormalMenuItem("credit",e,getLabel("credit"),!0),getNormalMenuItem("gpa",e,getLabel("gpa"),!0),getNormalMenuItem("personal",e,getLabel("personal"),!0),getNormalMenuItem("subject",e,getLabel("subject"),!0)]),getNormalMenuItem("links",e,getLabel("links"),!1,LinkIcon)])]})(a,t),[a,t]);return(0,c.useEffect)(()=>{let e=n.split("/"),t=e.length;for(let t of e.toReversed())if(Q.includes(t)){r(t);break}t>=3&&o(t=>[...t,e[1]])},[n,l]),(0,s.jsx)(U.default,{theme:{components:{Menu:{itemSelectedBg:"transparent",itemHoverBg:"transparent",itemActiveBg:"transparent"}}},children:(0,s.jsx)("div",{className:"overflow-y-auto no-scrollbar",children:(0,s.jsx)(K.default,{mode:"inline",onSelect:e=>{r(e.key)},onOpenChange:e=>{o(e)},items:u,...t?{}:{expandIcon:null},onClick:e=>{let t="/"+$().join($().reverse(e.keyPath),"/");accessibleRoute(t)?l.replace(t):l.replace("/signin")},selectedKeys:[a],openKeys:i})})})}function NavLabel(e){let{children:t,subMenu:n,selected:l=!1}=e,[a]=(0,q.u)(),r="font-semibold text-base text-royal-gray tracking-tight group-hover:text-nav-highlight ";return n&&(r+=" pl-3"),(0,s.jsx)("span",{ref:a,className:r,style:l?{color:P.G.ITEM_HIGHLIGHT_COLOR}:void 0,children:t})}let J={boxShadow:"inset 0px -2px 1px rgba(0, 0, 0, 0.05), inset 0px 1px 1px #FFFFFF",backgroundColor:P.G.ITEM_SELECTED_BACKGROUND_COLOR},itemStyle=e=>e?J:void 0,iconClassName=e=>"group-hover:fill-nav-highlight "+(e?"fill-nav-highlight":""),ee={general:"Chung","":"Trang chủ",schedule:"Thời kho\xe1 biểu",mysubjects:"M\xf4n học của t\xf4i",semester:"Điểm học k\xec",registered:"M\xf4n đ\xe3 đăng k\xed",curriculum:"Chương tr\xecnh đ\xe0o tạo","all-subjects":"Học phần",explore:"Kh\xe1m ph\xe1",statistic:"Thống k\xea",credit:"T\xedn chỉ",gpa:"Điểm số",personal:"C\xe1 nh\xe2n",subject:"C\xe1c m\xf4n học",links:"Li\xean kết","subject-class":"Lịch học",calendar:"Lịch l\xe0m việc",exam:"Lịch thi"};function getNormalMenuItem(e,t,n,l,a){let r=e===t;return{key:e,label:(0,s.jsx)(NavLabel,{subMenu:void 0===a,selected:r,children:n}),icon:void 0===a?void 0:(0,s.jsx)(a,{className:iconClassName(r)}),style:itemStyle(r),className:"group"+(l?"\n            !w-auto\n            relative\n            !ml-[37px] !pl-0 !pr-0\n            ":"")}}function getSubMenuItem(e,t,n,l){return{key:e,label:(0,s.jsxs)("div",{className:"flex gap-3 group",children:[(0,s.jsx)(n,{className:iconClassName(!1)}),(0,s.jsx)(NavLabel,{children:t})]}),children:l.map(e=>({...e,label:(0,s.jsxs)("div",{className:"flex",children:[(0,s.jsx)(r(),{src:W,alt:"hehe",className:"absolute left-0 top-[7px]"}),(0,s.jsx)("span",{className:"ml-[14px] flex-1 rounded-[8px] pr-2",style:e.style,children:e.label})]}),style:{}})),className:"\n            relative\n            before:content-['']\n            before:absolute\n            before:bg-[#e8e8e8]\n            before:top-[37px]\n            before:left-[37px]\n            before:bottom-[32px]\n            before:w-[2px]\n            before:rounded-full\n        "}}function getGroupMenuItem(e,t,n){return{type:"group",label:t,key:e,children:n}}let{Text:et}=M.default,{Sider:en}=B.default;function NavBar(){let[e,t]=(0,c.useState)(!0),[n,l]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{let handleScroll=()=>{window.scrollY>0?l(!0):l(!1)};return window.addEventListener("scroll",handleScroll),()=>{window.removeEventListener("scroll",handleScroll)}},[]),(0,s.jsx)("div",{className:"   sticky left-0 top-0   bg-underground   flex flex-col   h-screen   ",children:(0,s.jsxs)("div",{className:e?"bg-secondary h-full shadow min-w-[300px] flex flex-col gap-[30px]":"bg-secondary h-full shadow min-w-fit flex flex-col gap-[30px]",style:{transition:"border-radius 0.3s ease-in-out"},children:[(0,s.jsxs)("div",{className:"flex gap-3 h-[70px] items-center mx-[25px]",children:[(0,s.jsx)(O.Z,{onClick:()=>{t(!e)},className:"rounded-full hover:bg-gray-100",children:(0,s.jsx)(Y.qTj,{size:P.G.ICON_SIZE})}),e&&(0,s.jsx)(p(),{href:"/",children:(0,s.jsx)("div",{className:"text-3xl font-extrabold tracking-wide text-primary",children:"UETable"})})]}),(0,s.jsx)(NavMenu,{expand:e})]})})}var es=n(99231),el=n.n(es),ea=n(99110);let er=new ea.Z,ec=["","links"];function accessibleRoute(e){let t=e.split("/").slice(1);if(el()(er.get("authToken"))){let e=!1;for(let n of t)e=e||ec.includes(n);return e}return!0}function DashboardLayout(e){let{children:t}=e,n=(0,u.v9)(h.a),a=(0,v.usePathname)(),r=(0,u.I0)(),i=(0,v.useRouter)(),o=(0,c.useCallback)(()=>{n.signedIn||l.Z.get("/users/"+er.get("studentid")).then(e=>{r(d.Y.updateAuthState({signedIn:!0,logging:!1,name:e.name,studentId:er.get("studentid")}))}).catch(e=>{r(d.Y.updateAuthState({signedIn:!1,logging:!1})),er.remove("authToken",{path:"/"}),accessibleRoute(a)||i.push("/")})},[n.signedIn,r,a,i]);return((0,c.useEffect)(()=>{o()},[o]),(0,c.useEffect)(()=>{accessibleRoute(a)||i.replace("/signin")},[a,i]),n.logging)?(0,s.jsx)(s.Fragment,{}):(0,s.jsxs)("div",{className:"flex",children:[(0,s.jsx)(NavBar,{}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)(Header,{}),accessibleRoute(a)&&t,(0,s.jsx)(Footer,{})]})]})}},13749:function(e,t,n){"use strict";n.d(t,{Z:function(){return MySubjectIcon}});var s=n(57437);n(2265);var l=n(95653);function MySubjectIcon(e){let{size:t,color:n,className:a}=e;return(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:null!=t?t:l.G.ICON_SIZE,height:null!=t?t:l.G.ICON_SIZE,fill:null!=n?n:l.G.ICON_COLOR,className:a,children:(0,s.jsx)("path",{d:"m12,10c-1.93,0-3.5,1.57-3.5,3.5s1.57,3.5,3.5,3.5,3.5-1.57,3.5-3.5-1.57-3.5-3.5-3.5Zm0,5c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5.673,1.5,1.5-.673,1.5-1.5,1.5Zm7.949-9.464l-3.484-3.486c-1.323-1.322-3.081-2.05-4.95-2.05h-4.515C4.243,0,2,2.243,2,5v14c0,2.757,2.243,5,5,5h10c2.757,0,5-2.243,5-5v-8.515c0-1.871-.729-3.628-2.051-4.95Zm-1.414,1.415c.318.317.587.67.805,1.05h-4.341c-.552,0-1-.449-1-1V2.659c.38.218.733.487,1.051.805l3.484,3.486Zm-9.363,15.05c.413-1.164,1.524-2,2.828-2s2.415.836,2.828,2h-5.656Zm10.828-3c0,1.654-1.346,3-3,3h-.101c-.465-2.279-2.485-4-4.899-4s-4.435,1.721-4.899,4h-.101c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h4.515c.163,0,.325.008.485.023v4.977c0,1.654,1.346,3,3,3h4.977c.015.16.023.322.023.485v8.515Z"})})}},28797:function(e,t,n){"use strict";n.d(t,{Z:function(){return ScheduleIcon}});var s=n(57437);n(2265);var l=n(95653);function ScheduleIcon(e){let{size:t,color:n,className:a}=e;return(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:null!=t?t:l.G.ICON_SIZE,height:null!=t?t:l.G.ICON_SIZE,fill:null!=n?n:l.G.ICON_COLOR,className:a,children:(0,s.jsx)("path",{d:"M19,2h-1V1c0-.552-.448-1-1-1s-1,.448-1,1v1H8V1c0-.552-.448-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h4c.552,0,1-.448,1-1s-.448-1-1-1H5c-1.654,0-3-1.346-3-3V10H23c.552,0,1-.448,1-1v-2c0-2.757-2.243-5-5-5Zm3,6H2v-1c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v1Zm-3.121,4.879l-5.707,5.707c-.755,.755-1.172,1.76-1.172,2.829v1.586c0,.552,.448,1,1,1h1.586c1.069,0,2.073-.417,2.828-1.172l5.707-5.707c.567-.567,.879-1.32,.879-2.122s-.312-1.555-.878-2.121c-1.134-1.134-3.11-1.134-4.243,0Zm2.828,2.828l-5.708,5.707c-.377,.378-.879,.586-1.414,.586h-.586v-.586c0-.534,.208-1.036,.586-1.414l5.708-5.707c.377-.378,1.036-.378,1.414,0,.189,.188,.293,.439,.293,.707s-.104,.518-.293,.707Zm-16.707-1.707c0-.552,.448-1,1-1h7c.552,0,1,.448,1,1s-.448,1-1,1H6c-.552,0-1-.448-1-1Zm6,4c0,.552-.448,1-1,1H6c-.552,0-1-.448-1-1s.448-1,1-1h4c.552,0,1,.448,1,1Z"})})}},1333:function(e,t,n){"use strict";n.d(t,{Z:function(){return SearchIcon}});var s=n(57437),l=n(78073);function SearchIcon(e){let{size:t,color:n,className:a}=e;return(0,s.jsx)("svg",{viewBox:"0 0 16 16",width:null!=t?t:20,height:null!=t?t:20,fill:null!=n?n:l.C.ROYAL_GRAY_COLOR,className:a,children:(0,s.jsx)("path",{d:"M7.333 1.333a6 6 0 0 1 6 6c0 1.417-.491 2.719-1.312 3.745h0l1.783 1.783c.26.26.26.682 0 .943s-.682.26-.943 0h0l-1.783-1.783c-1.026.821-2.328 1.312-3.745 1.312a6 6 0 1 1 0-12zm0 1.333a4.67 4.67 0 0 0-4.667 4.667A4.67 4.67 0 0 0 7.333 12 4.67 4.67 0 0 0 12 7.333a4.67 4.67 0 0 0-4.667-4.667z"})})}},69814:function(e,t,n){"use strict";n.d(t,{Z:function(){return SelectedIcon}});var s=n(57437),l=n(78073);function SelectedIcon(e){let{size:t,color:n,className:a}=e;return(0,s.jsx)("svg",{viewBox:"0 0 16 16",width:null!=t?t:20,height:null!=t?t:20,fill:null!=n?n:l.C.ROYAL_GRAY_COLOR,className:a,children:(0,s.jsx)("path",{d:"M1.528 8.195c.26-.26.682-.26.943 0h0l1.724 1.724.009.009 1.325 1.325a2 2 0 0 1-2.277-.391h0L1.528 9.138c-.26-.26-.26-.682 0-.943zm12.943-3.367c.26.26.26.682 0 .943l-5.091 5.091a2 2 0 0 1-2.828 0L4.828 9.138c-.26-.26-.26-.682 0-.943s.682-.26.943 0l1.724 1.724c.26.26.682.26.943 0l5.091-5.091c.26-.26.682-.26.943 0zm-4.276.033c.26-.26.682-.26.943 0s.26.682 0 .943h0L7.966 8.976l-.943-.943z"})})}},82881:function(e,t,n){"use strict";n.d(t,{Z:function(){return MyButtonWrapper}});var s=n(57437),l=n(88110),a=n.n(l),r=n(49385),c=n(2265),i=n(23986),o=n(44143),u=n(25727),d=n.n(u),h=n(54952),x=n(52410);function MyButtonWrapper(e){var t;let{displayChildrenWhenLoading:n=!0}=e,l="p-1 h-fit w-fit  border-0 group hover:!border-contrast hover:!text-contrast",[u,m]=(0,c.useState)(null!==(t=e.loading)&&void 0!==t&&t),g=(0,c.useCallback)(()=>{p(!0),setTimeout(()=>{var t;p(!1),m(!1),null===(t=e.onDoneAnimationEnd)||void 0===t||t.call(e)},1500)},[e]),[f,p]=(0,c.useState)(!1);return e.rounded&&(l+=" rounded-full"),(0,s.jsx)(a(),{...d()(e,["rounded","loading"]),onClick:t=>{var n;(0,o.$)(e.onClick)?(m(!0),e.onClick().then(()=>{g()})):null===(n=e.onClick)||void 0===n||n.call(e,t)},className:(0,i.m)(l,e.className),disabled:u&&!f,children:(0,s.jsxs)("div",{className:"flex gap-3 items-center",children:[u?n&&e.children:e.children,u&&(f?(0,s.jsx)(x.DVR,{size:"1.2em"}):(0,s.jsx)(r.default,{indicator:(0,s.jsx)(h.default,{}),className:"text-current"}))]})})}},95381:function(e,t,n){"use strict";n.d(t,{Z:function(){return SearchBar}});var s=n(57437),l=n(43574);n(2265);var a=n(23986),r=n(1333);function SearchBar(e){return(0,s.jsx)(l.default,{size:"large",placeholder:"T\xecm kiếm",allowClear:!0,prefix:(0,s.jsx)(r.Z,{className:"hover:fill-[#1A1D1F]"}),classNames:{input:"bg-[#F4F4F4]"},...e,className:(0,a.m)("bg-[#F4F4F4] w-1/3 hover:border-2 rounded-xl h-12 border-2 border-transparent",e.className)})}n(42337)},25418:function(e,t,n){"use strict";n.d(t,{a:function(){return authSelector}});let authSelector=e=>e.auth},58837:function(e,t,n){"use strict";n.d(t,{Y:function(){return a},d:function(){return l}});var s=n(98340);let{reducer:l,actions:a}=(0,s.oM)({name:"auth",initialState:{signedIn:!1,logging:!0,role:"user",studentId:""},reducers:{updateAuthState:function(e,t){return{...e,...t.payload}}}})},95653:function(e,t,n){"use strict";n.d(t,{G:function(){return l}});var s=n(78073);let l={ICON_COLOR:s.C.ROYAL_GRAY_COLOR,ICON_SIZE:"1.5em",ITEM_HIGHLIGHT_COLOR:"#1A1D1F",ITEM_SELECTED_BACKGROUND_COLOR:"#EFEFEF"}},78073:function(e,t,n){"use strict";n.d(t,{C:function(){return s}});let s={PRIMARY_COLOR:"#4096ff",DARK_PRIMARY_COLOR:"#19619D",LIGHT_PRIMARY_COLOR:"#c6e0f6",SECONDARY_COLOR:"#FFFFFF",SECONDARY_CONTRAST_COLOR:"#1A1D1F",ROYAL_GRAY_COLOR:"#6F767E",TABLE_BORDER_COLOR:"rgba(75, 85, 99)",DANGER_COLOR:"#FF4D4F",PRIMARY_ICON_COLOR:"#7D7C7C",UNDERGROUND_COLOR:"#f4f4f4",CLICKABLE_COLOR:"#4096ff",LAYOUT_ELEMENT_SPACE:"15px",LAYOUT_ELEMENT_BORDER_RADIUS:"15px",BODY_PADDING:"12px"}},88302:function(e,t,n){"use strict";function shortTime(e){let t=Date.now()-e.getTime();return t<60?"Vừa xong":t<6e4?"".concat(Math.floor(t/1e3)," gi\xe2y trước"):t<36e5?"".concat(Math.floor(t/6e4)," ph\xfat trước"):t<864e5?"".concat(Math.floor(t/36e5)," giờ trước"):t<31536e6?"".concat(Math.floor(t/864e5)," ng\xe0y trước"):t<31536e6?e.toLocaleDateString("en-GB",{day:"numeric",month:"short"}):e.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}n.d(t,{i:function(){return shortTime}})},44143:function(e,t,n){"use strict";function isUndefined(e){return void 0===e}function isAsyncFunction(e){return!!e&&"AsyncFunction"===e.constructor.name}n.d(t,{$:function(){return isAsyncFunction},o:function(){return isUndefined}})},42337:function(){}}]);