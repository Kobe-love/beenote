import{d as ze,C as b,r as i,y as ee,D as xe,q as Ne,u as Ue,o as Ae,c as C,e as d,f as e,w as o,g as n,k as r,F as V,G as te,H as Se,t as y,E as P,p as _,I as $e,s as ae,J as Me,K as Be,L as De,M as Ee,x as f,A as le,N as oe,O as ne,P as se,i as Ie,Q as Pe,j as p,R as z,S as Te,_ as Ge}from"./index-QuKtLSdM.js";import{c as Le,d as Re,e as je,f as Fe,u as Ke}from"./index-qzufOvKB.js";import{r as qe}from"./relativeTime-CL59KOQP.js";import{M as He}from"./style-Dx89tEz_.js";const Je={class:"notes-container"},Oe={class:"header"},Qe={class:"left"},We={class:"right"},Xe=["onClick"],Ye={class:"pagination-container"},Ze={class:"note-card-header"},et={class:"title"},tt={class:"header-right"},at={class:"note-card-content"},lt={class:"note-card-footer"},ot={class:"time"},nt={class:"pagination-container"},st=ze({__name:"Notes",setup(ut){b.extend(qe);const x=Ie(),T=i([]),G=i([]),N=i(!1),k=i(null),U=i(""),A=i("grid"),v=i(1),g=i(12),S=i(0),L=ee(()=>T.value),ue=l=>b(l).fromNow(),de=({row:l})=>{const t=b(),u=b(l.updated_at);return t.diff(u,"day")<1?"recent-row":""},h=async()=>{N.value=!0;try{const l=await Le({page:v.value,page_size:g.value,group__id:k.value||void 0});T.value=l.data.results,S.value=l.data.count}catch(l){console.error(l),P.error("获取笔记列表失败")}finally{N.value=!1}},re=async()=>{try{const l=await Re();G.value=l.data}catch(l){console.error(l)}},ie=()=>{x.push("/notes/edit")},R=l=>{x.push(`/notes/edit/${l.id}`)},j=async l=>{try{await Pe.confirm("确定要删除该笔记吗？","提示",{type:"warning"}),await je(l.id),await h()}catch(t){console.error(t)}},ce=xe(()=>{h()},300),F=l=>{g.value=l,v.value=1,h()},K=l=>{v.value=l,h()},q=l=>{x.push(`/notes/view/${l.id}`)};Ne([k,U],()=>{v.value=1,h()});const $=i(!1),H=i([]),M=i(!1),w=i(null),J=async l=>{w.value=l,$.value=!0,await pe()},pe=async()=>{if(w.value){M.value=!0;try{const l=await Fe();H.value=l.data.map(t=>{var u;return{...t,hasAuth:(u=t.notes)==null?void 0:u.includes(w.value.id)}})}catch(l){console.error(l)}finally{M.value=!1}}},_e=async l=>{var t,u;if(w.value)try{const c=l.hasAuth?[...l.notes||[],w.value.id]:(l.notes||[]).filter(D=>D!==w.value.id);await Ke(l.id,{note:c,note_group:l.note_group||[]}),l.notes=c,P.success("授权更新成功")}catch(c){console.error(c),P.error(((u=(t=c.response)==null?void 0:t.data)==null?void 0:u.detail)||"授权更新失败"),l.hasAuth=!l.hasAuth}},O=Ue(),B=ee(()=>{var l,t;return((l=O.user)==null?void 0:l.role)==="admin"||((t=O.user)==null?void 0:t.role)==="superuser"});return Ae(()=>{h(),re()}),(l,t)=>{const u=n("el-icon"),c=n("el-button"),D=n("el-option"),ve=n("el-select"),me=n("el-input"),Q=n("el-radio-button"),fe=n("el-radio-group"),m=n("el-table-column"),E=n("el-tag"),ge=n("el-button-group"),W=n("el-table"),X=n("el-pagination"),I=n("el-dropdown-item"),he=n("el-dropdown-menu"),we=n("el-dropdown"),ye=n("el-card"),Ce=n("el-col"),ke=n("el-row"),be=n("el-switch"),Ve=n("el-dialog"),Y=Se("loading");return p(),C("div",Je,[d("div",Oe,[d("div",Qe,[e(c,{type:"primary",onClick:ie},{default:o(()=>[e(u,null,{default:o(()=>[e(r($e))]),_:1}),t[9]||(t[9]=_("新建笔记 "))]),_:1}),e(ve,{modelValue:k.value,"onUpdate:modelValue":t[0]||(t[0]=a=>k.value=a),placeholder:"选择分组",clearable:"",class:"group-select"},{default:o(()=>[(p(!0),C(V,null,ae(G.value,a=>(p(),y(D,{key:a.id,label:a.name,value:a.id},{default:o(()=>[d("span",null,f(a.name),1)]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue"])]),d("div",We,[e(me,{modelValue:U.value,"onUpdate:modelValue":t[1]||(t[1]=a=>U.value=a),placeholder:"搜索笔记",class:"search-input",onInput:r(ce)},{prefix:o(()=>[e(u,null,{default:o(()=>[e(r(Me))]),_:1})]),_:1},8,["modelValue","onInput"]),e(fe,{modelValue:A.value,"onUpdate:modelValue":t[2]||(t[2]=a=>A.value=a),size:"small"},{default:o(()=>[e(Q,{value:"table"},{default:o(()=>[e(u,null,{default:o(()=>[e(r(Be))]),_:1})]),_:1}),e(Q,{value:"grid"},{default:o(()=>[e(u,null,{default:o(()=>[e(r(De))]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),A.value==="table"?(p(),C(V,{key:0},[te((p(),y(W,{data:L.value,"row-class-name":de,stripe:""},{default:o(()=>[e(m,{prop:"title",label:"标题"},{default:o(({row:a})=>[d("div",{class:"note-title clickable",onClick:s=>q(a)},[e(u,null,{default:o(()=>[e(r(Ee))]),_:1}),d("span",null,f(a.title),1)],8,Xe)]),_:1}),e(m,{prop:"group_id",label:"分组"},{default:o(({row:a})=>[e(E,{size:"small"},{default:o(()=>{var s;return[_(f(((s=a.group_detail)==null?void 0:s.name)||"-"),1)]}),_:2},1024)]),_:1}),e(m,{prop:"created_at",label:"创建时间",width:"180"}),e(m,{prop:"updated_at",label:"更新时间",width:"180"}),e(m,{label:"操作",width:B.value?280:200,fixed:"right"},{default:o(({row:a})=>[e(ge,null,{default:o(()=>[e(c,{type:"primary",icon:r(oe),onClick:s=>R(a)},{default:o(()=>t[10]||(t[10]=[_(" 编辑 ")])),_:2},1032,["icon","onClick"]),B.value?(p(),y(c,{key:0,type:"success",icon:r(ne),onClick:s=>J(a)},{default:o(()=>t[11]||(t[11]=[_(" 授权 ")])),_:2},1032,["icon","onClick"])):le("",!0),e(c,{type:"danger",icon:r(se),onClick:s=>j(a)},{default:o(()=>t[12]||(t[12]=[_(" 删除 ")])),_:2},1032,["icon","onClick"])]),_:2},1024)]),_:1},8,["width"])]),_:1},8,["data"])),[[Y,N.value]]),d("div",Ye,[e(X,{"current-page":v.value,"onUpdate:currentPage":t[3]||(t[3]=a=>v.value=a),"page-size":g.value,"onUpdate:pageSize":t[4]||(t[4]=a=>g.value=a),"page-sizes":[12,24,48,96],total:S.value,layout:"total, sizes, prev, pager, next",onSizeChange:F,onCurrentChange:K},null,8,["current-page","page-size","total"])])],64)):(p(),C(V,{key:1},[e(ke,{gutter:20},{default:o(()=>[(p(!0),C(V,null,ae(L.value,a=>(p(),y(Ce,{span:6,key:a.id},{default:o(()=>[e(ye,{class:"note-card","body-style":{padding:"15px"},shadow:"hover",onClick:s=>q(a)},{default:o(()=>[d("div",Ze,[d("span",et,f(a.title),1),d("div",tt,[e(E,{size:"small",type:"warning",effect:"plain",class:"creator-tag"},{default:o(()=>{var s,Z;return[_(f(((s=a.creator)==null?void 0:s.name)||((Z=a.creator)==null?void 0:Z.username)),1)]}),_:2},1024),e(we,{trigger:"click"},{dropdown:o(()=>[e(he,null,{default:o(()=>[e(I,{onClick:z(s=>R(a),["stop"])},{default:o(()=>[e(u,null,{default:o(()=>[e(r(oe))]),_:1}),t[13]||(t[13]=_("编辑 "))]),_:2},1032,["onClick"]),B.value?(p(),y(I,{key:0,onClick:z(s=>J(a),["stop"])},{default:o(()=>[e(u,null,{default:o(()=>[e(r(ne))]),_:1}),t[14]||(t[14]=_("授权 "))]),_:2},1032,["onClick"])):le("",!0),e(I,{onClick:z(s=>j(a),["stop"]),class:"danger"},{default:o(()=>[e(u,null,{default:o(()=>[e(r(se))]),_:1}),t[15]||(t[15]=_("删除 "))]),_:2},1032,["onClick"])]),_:2},1024)]),default:o(()=>[e(c,{link:"",onClick:t[5]||(t[5]=z(()=>{},["stop"]))},{default:o(()=>[e(u,null,{default:o(()=>[e(r(Te))]),_:1})]),_:1})]),_:2},1024)])]),d("div",at,[e(r(He),{modelValue:a.content.slice(0,100)||""},null,8,["modelValue"])]),d("div",lt,[e(E,{size:"small"},{default:o(()=>{var s;return[_(f(((s=a.group_detail)==null?void 0:s.name)||"-"),1)]}),_:2},1024),d("span",ot,f(ue(a.updated_at)),1)])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1}),d("div",nt,[e(X,{"current-page":v.value,"onUpdate:currentPage":t[6]||(t[6]=a=>v.value=a),"page-size":g.value,"onUpdate:pageSize":t[7]||(t[7]=a=>g.value=a),"page-sizes":[10,20,50,100],total:S.value,layout:"total, sizes, prev, pager, next",onSizeChange:F,onCurrentChange:K},null,8,["current-page","page-size","total"])])],64)),e(Ve,{modelValue:$.value,"onUpdate:modelValue":t[8]||(t[8]=a=>$.value=a),title:"笔记授权",width:"600px"},{default:o(()=>[te((p(),y(W,{data:H.value,style:{width:"100%"}},{default:o(()=>[e(m,{prop:"username",label:"用户名"}),e(m,{prop:"name",label:"姓名"}),e(m,{label:"授权",width:"100"},{default:o(({row:a})=>[e(be,{modelValue:a.hasAuth,"onUpdate:modelValue":s=>a.hasAuth=s,onChange:s=>_e(a)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1})]),_:1},8,["data"])),[[Y,M.value]])]),_:1},8,["modelValue"])])}}}),pt=Ge(st,[["__scopeId","data-v-66020628"]]);export{pt as default};
