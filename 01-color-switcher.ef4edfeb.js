const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.body;let a=null;e.addEventListener("click",(()=>{e.disabled=!0,t.disabled=!1,a=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.addEventListener("click",(()=>{e.disabled=!1,t.disabled=!0,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.ef4edfeb.js.map
