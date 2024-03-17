import{_ as r,h as d,l as g,E as y,o as n,b as F,N as C,c as u,J as e,m as _,a as b,aR as c}from"./chunks/framework.aiNfeHQZ.js";const x={__name:"1.基础用法",setup(k){const s=d(),p={showCount:3,xAxisData:["1月","1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],seriesData:[{type:"bar",yAxisIndex:0,data:[163,129,123,198,152,152,178,133,193]},{type:"line",yAxisIndex:1,data:[81,17,30,94,45,54,60,1,69]}],yAxisName:["亿元","%"],legendData:["销售额","贸易额"]};return g(()=>s.value.renderChart()),(t,E)=>{const a=y("elderly-bar-line-chart");return n(),F(a,C(p,{ref_key:"chartRef",ref:s}),null,16)}}},m=r(x,[["__scopeId","data-v-1cf159dc"]]),f=!0,v={__name:"2.只有折线",setup(k){const s=d(),a={showCount:3,xAxisData:["1月","1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],seriesData:[{type:"line",data:[163,129,123,198,152,152,178,133,193]},{type:"line",data:[81,17,30,94,45,54,60,1,69]}],yAxisName:["亿元","%"],legendData:["销售额","贸易额"],color:["yellow","celeste"],showLineArea:f,markLine:[{value:77,yAxisIndex:0,color:"#F74768"}],beforeSetOption:i=>{i.series.forEach(h=>h.type==="line"&&(h.markLine.data[0].label.formatter=D=>`目标增速：{value|${D.value}}`))}};return g(()=>s.value.renderChart()),(i,h)=>{const D=y("elderly-bar-line-chart");return n(),F(D,C(a,{ref_key:"chartRef",ref:s}),null,16)}}},q=r(v,[["__scopeId","data-v-8bbef399"]]),w={__name:"3.只有折线",setup(k){const s=d(),t={showCount:3,xAxisData:["1月","1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],seriesData:[{type:"line",data:[163,129,123,198,152,152,178,133,193]},{type:"line",data:[81,17,30,94,45,54,60,1,69]},{type:"line",data:[82,85,74,70,63,85,62,50,69,65]},{type:"line",data:[88,53,96,80,100,93,77,84,71,80]},{type:"line",data:[59,94,86,70,93,80,74,93,85,90]}],yAxisName:["亿元"],legendData:["香洲区","金湾区","斗门区","高新区","鹤洲新区"],color:["yellow","celeste","green","grey","pink"]};return g(()=>s.value.renderChart()),(E,a)=>{const i=y("elderly-bar-line-chart");return n(),F(i,C(t,{ref_key:"chartRef",ref:s}),null,16)}}},I=r(w,[["__scopeId","data-v-70e4b370"]]),N={__name:"4.混合",setup(k){const s=d(),E={showCount:3,xAxisData:["1月","1-2月","1-3月","1-4月","1-5月","1-6月","1-7月","1-8月","1-9月"],seriesData:[{type:"bar",data:[163,129,123,198,152,152,178,133,193]},{type:"bar",data:[81,17,30,94,45,54,60,1,69]},{type:"bar",data:[82,85,74,70,63,85,62,50,69,65]},{type:"bar",data:[88,53,96,80,100,93,77,84,71,80]},{type:"line",yAxisIndex:1,data:[59,94,86,70,93,80,74,93,85,90]},{type:"line",yAxisIndex:1,data:[83,86,62,83,70,82,97,59,74,80]},{type:"line",yAxisIndex:1,data:[90,67,74,76,70,93,54,97,90,68]},{type:"line",yAxisIndex:1,data:[66,73,58,91,95,84,51,73,91,82]}],yAxisName:["亿元","%"],legendData:["柱状图0","柱状图1","柱状图2","柱状图3","折线图0","折线图1","折线图2","折线图3"],color:["blue","green","celeste","grey","blue","green","celeste","grey"],beforeSetOption:a=>{a.legend.show=!1,a.series.forEach((i,h)=>{i.label.show=i.showBackground=!1,i.type==="bar"&&(i.barWidth=20/1080*window.innerHeight,i.barGap=`${12/20*100}%`)})}};return g(()=>s.value.renderChart()),(a,i)=>{const h=y("elderly-bar-line-chart");return n(),F(h,C(E,{ref_key:"chartRef",ref:s}),null,16)}}},R=r(N,[["__scopeId","data-v-b7e50464"]]),T=_("h2",{id:"_1-基础用法",tabindex:"-1"},[b("1.基础用法 "),_("a",{class:"header-anchor",href:"#_1-基础用法","aria-label":'Permalink to "1.基础用法"'},"​")],-1),O=c("",2),S=c("",2),P=c("",2),L=c("",1),$=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"document/elderlyBarLineChart.md","filePath":"document/elderlyBarLineChart.md"}'),V={name:"document/elderlyBarLineChart.md"},G=Object.assign(V,{setup(k){return(s,l)=>(n(),u("div",null,[T,e(m),O,e(q),S,e(I),P,e(R),L]))}});export{$ as __pageData,G as default};
