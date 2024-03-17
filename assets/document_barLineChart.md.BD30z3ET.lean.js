import{_ as y,h as F,l as C,E as r,o as d,b as o,N as c,c as _,J as t,w as m,F as f,a as u,m as D,aR as B}from"./chunks/framework.DJz3fccL.js";const v={__name:"1.柱-折线混合",setup(g){const s=F(),a={xAxisData:["1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],seriesData:[{type:"bar",yAxisIndex:0,data:[101,31,66,120,123,9,22,128,62]},{type:"bar",yAxisIndex:0,data:[158,171,43,143,178,96,67,18,143]},{type:"line",yAxisIndex:1,data:[389,283,213,315,313,256,304,233,372]},{type:"line",lineType:"dashed",yAxisIndex:1,data:[273,245,364,252,283,368,319,389,400]}],yAxisName:["亿元","%"],legendData:["住宅类均价","办公类均价","商业类均价","住宅类增速","办公类增速","商业类增速"],color:["blue","green","celeste","grey"]};return C(()=>s.value.renderChart()),(l,n)=>{const h=r("bar-line-chart");return d(),o(h,c(a,{ref_key:"chartRef",ref:s}),null,16)}}},q=y(v,[["__scopeId","data-v-ba8026a9"]]),T={__name:"2.只有折线",setup(g){const s=F(),i=["1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],p=["yellow","celeste","green","grey","violet","pink"],E=[{type:"line",data:[163,129,123,198,152,152,178,133,193]},{type:"line",data:[81,37,30,94,45,54,60,1,69]},{type:"line",data:[36,17,43,26,23,77,66,60,18]},{type:"line",data:[61,76,63,53,82,82,74,57,79]},{type:"line",data:[85,74,112,74,83,86,111,112,80]},{type:"line",data:[71,77,113,120,60,65,79,61,113]},{type:"line",data:[111,116,89,107,67,97,86,116,98]},{type:"line",data:[120,65,93,82,112,63,75,100,81]}],e=["亿元"],k=["汽车","家电","成品油","日用品","化妆品","粮油","天然气","煤炭"],a=i.map(n=>`2023年${n}`),l={xAxisData:i,seriesData:E,yAxisName:e,legendData:k,tooltipTitle:a,color:p};return C(()=>s.value.renderChart()),(n,h)=>{const A=r("bar-line-chart");return d(),o(A,c(l,{ref_key:"chartRef",ref:s}),null,16)}}},I=y(T,[["__scopeId","data-v-26221b28"]]),R={__name:"3.只有柱",setup(g){const s=F(),k={xAxisData:["1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],yAxisName:["家"],seriesData:[{type:"bar",yAxisIndex:0,data:[163,129,123,198,152,152,178,133,193]},{type:"bar",yAxisIndex:0,data:[81,37,30,94,45,54,60,1,69]},{type:"bar",yAxisIndex:0,data:[36,17,43,26,23,77,66,60,18]}],legendData:["总数","房建","市政"]};return C(()=>s.value.renderChart()),(a,l)=>{const n=r("bar-line-chart");return d(),o(n,c(k,{ref_key:"chartRef",ref:s}),null,16)}}},N=y(R,[["__scopeId","data-v-0b365ca5"]]),S=!1,O={__name:"4.与图表联动",setup(g){const s=F();let i=null;const p=(h,A)=>i=A,E=h=>i.dispatchAction({type:"legendToggleSelect",name:l[0]}),e=["1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],k=[{type:"bar",yAxisIndex:0,data:[163,129,123,198,152,152,178,133,193]}],a=["亿元"],l=["营业额"],n={xAxisData:e,seriesData:k,yAxisName:a,legendData:l,showLegend:S,afterSetOption:p};return C(()=>s.value.renderChart()),(h,A)=>{const x=r("bar-line-chart"),b=r("el-button");return d(),_(f,null,[t(x,c(n,{ref_key:"chartRef",ref:s}),null,16),t(b,{style:{margin:"20px 0"},type:"primary",onClick:E},{default:m(()=>[u("显示/隐藏")]),_:1})],64)}}},P=y(O,[["__scopeId","data-v-e0c45ba9"]]),V={__name:"5.指定区域高亮",setup(g){const s=F(),a={xAxisData:["1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],yAxisName:["家","%"],seriesData:[{type:"bar",yAxisIndex:0,data:[163,129,123,198,152,152,178,133,193]},{type:"line",yAxisIndex:1,data:[81,37,30,94,45,54,60,1,69]},{type:"bar",yAxisIndex:0,data:[36,17,43,26,23,77,66,60,18]}],legendData:["总数","房建","市政"],xAxisHighlightArea:[3,4]};return C(()=>s.value.renderChart()),(l,n)=>{const h=r("bar-line-chart");return d(),o(h,c(a,{ref_key:"chartRef",ref:s}),null,16)}}},w=y(V,[["__scopeId","data-v-4bc0d64b"]]),M=4,L="slider",H={__name:"6.拖拽区域为滚动条",setup(g){const s=F(),a={xAxisData:["1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],yAxisName:["家","%"],seriesData:[{type:"bar",yAxisIndex:0,data:[163,129,123,198,152,152,178,133]},{type:"line",lineType:"dashed",yAxisIndex:1,data:[81,37,30,94,45,54,60,69]},{type:"bar",yAxisIndex:0,data:[36,17,43,26,23,77,66,60]}],legendData:["总数","房建","市政"],xAxisHighlightArea:[3,4],showCount:M,dataZoomType:L};return C(()=>s.value.renderChart()),(l,n)=>{const h=r("bar-line-chart");return d(),o(h,c(a,{ref_key:"chartRef",ref:s}),null,16)}}},$=y(H,[["__scopeId","data-v-13f9b97d"]]),Z=D("h2",{id:"_1-柱-折线混合",tabindex:"-1"},[u("1.柱-折线混合 "),D("a",{class:"header-anchor",href:"#_1-柱-折线混合","aria-label":'Permalink to "1.柱-折线混合"'},"​")],-1),J=B("",2),j=B("",2),z=B("",2),G=B("",2),K=B("",2),Q=B("",1),X=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"document/barLineChart.md","filePath":"document/barLineChart.md"}'),U={name:"document/barLineChart.md"},Y=Object.assign(U,{setup(g){return(s,i)=>(d(),_("div",null,[Z,t(q),J,t(I),j,t(N),z,t(P),G,t(w),K,t($),Q]))}});export{X as __pageData,Y as default};