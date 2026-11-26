document.documentElement.classList.add('js');


(()=>{
var TEL="573164763660";
var $=(s,e)=>(e||document).querySelector(s),$$=(s,e)=>Array.prototype.slice.call((e||document).querySelectorAll(s));
var guarda=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},lee=(k,d)=>{try{var a=localStorage.getItem(k);return a===null?d:a}catch(e){return d}};
var seguro=f=>{try{f()}catch(e){window.console&&console.warn(e)}};
var RED=(()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}})();
var IO=typeof IntersectionObserver!=="undefined";
var cop=n=>"$"+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,".");

var CAT={
  tc:{n:"Tamal de cerdo",p:16000},
  tm:{n:"Tamal mixto",p:16000},
  at:{n:"Atado de 2 tamales",p:30000},
  le:{n:"Lechona",p:35000},
  ar:{n:"Arroz con leche",p:8000},
  na:{n:"Reserva de natilla navideña",p:null},
  ac:{n:"Crema de arrechón del Pacífico",p:25000}
};
var ped={};
try{ped=JSON.parse(lee("hc-pedido","{}"))||{};Object.keys(ped).forEach(k=>{if(!CAT[k]||!(ped[k]>0))delete ped[k]})}catch(e){ped={}}
var guardaPed=()=>guarda("hc-pedido",JSON.stringify(ped));
var cuenta=()=>Object.keys(ped).length;

var tAv;
function aviso(t){seguro(()=>{var e=$("#aviso");e.textContent=t;e.classList.add("ve");clearTimeout(tAv);tAv=setTimeout(()=>e.classList.remove("ve"),2300)})}

var hBoton=()=>{};
function pinta(salta){
  seguro(()=>{
    var b=$("#ctz-boton"),n=cuenta();
    $("#ctz-n").textContent=n;
    b.classList.toggle("tiene",n>0);
    if(salta){b.classList.remove("salta");void b.offsetWidth;b.classList.add("salta")}
    hBoton();
  });
  $$("[data-id]").forEach(e=>{
    var id=e.getAttribute("data-id"),on=!!ped[id];
    if(e.classList.contains("ca-add")||e.classList.contains("ch"))e.setAttribute("aria-pressed",on?"true":"false");
    if(e.classList.contains("ca-add")){var l=e.querySelector(".lbl");if(l)l.innerHTML=on?"Agregado":(id==="na"?'Reservar<span class="t-larga"> mi natilla</span>':id==="at"?"Agregar el atado":"Agregar")}
  });
}
function alterna(id){
  if(!CAT[id])return;
  if(ped[id]){delete ped[id];aviso(CAT[id].n+" salió de tu pedido")}
  else{ped[id]=1;aviso(CAT[id].n+" agregado a tu pedido")}
  guardaPed();pinta(true);
}
function suma(){
  var t=0,sin=false;
  Object.keys(ped).forEach(k=>{var c=CAT[k];if(c.p==null)sin=true;else t+=c.p*ped[k]});
  return {t:t,sin:sin};
}
function mensaje(){
  var l=[],ks=Object.keys(ped);
  if(!ks.length)l.push("Hola, Herencia Culinaria. Quiero hacer un pedido.");
  else{
    l.push("Hola, Herencia Culinaria. Quiero hacer este pedido:");
    ks.forEach(k=>{var c=CAT[k],q=ped[k];l.push("• "+q+" × "+c.n+(c.p!=null?" — "+cop(c.p*q):" (precio por confirmar)"))});
    var s=suma();l.push("Total aproximado: "+cop(s.t)+(s.sin?" + la natilla":""));
  }
  var nom=($("#ped-nombre").value||"").trim(),lug=($("#ped-lugar").value||"").trim(),fe=($("#ped-fecha").value||"").trim();
  if(lug)l.push("Entregar en: "+lug);
  if(fe){var p=fe.split("-");l.push("Para el: "+(p.length===3?p[2]+"/"+p[1]+"/"+p[0]:fe))}
  if(nom)l.push("Mi nombre: "+nom);
  return l.join("\n");
}
var enlace=()=>seguro(()=>{$("#ped-enviar").href="https://wa.me/"+TEL+"?text="+encodeURIComponent(mensaje())});
function totales(){
  var s=suma(),ks=cuenta()>0;
  $("#ped-total").hidden=!ks;
  $("#ped-suma").textContent=cop(s.t);
  $("#ped-nota").textContent=s.sin?"La natilla se confirma por WhatsApp":"";
}
function pintaLista(){
  var ul=$("#ped-lista"),ks=Object.keys(ped);
  $("#ped-vacia").hidden=ks.length>0;
  ul.innerHTML="";
  ks.forEach(k=>{
    var c=CAT[k],li=document.createElement("li");
    li.className="ctz-it";
    li.innerHTML='<b></b><div class="ctz-paso"><button type="button" data-a="-" aria-label="Menos">−</button><output></output><button type="button" data-a="+" aria-label="Más">+</button></div><div class="ctz-uni"><span></span><button type="button" class="ctz-quitar">Quitar</button></div>';
    li.querySelector("b").textContent=c.n;
    li.querySelector("output").textContent=ped[k];
    var pr=li.querySelector(".ctz-uni span");
    var refr=()=>{pr.textContent=c.p!=null?cop(c.p*ped[k]):"Precio por confirmar"};refr();
    li.addEventListener("click",ev=>{
      var b=ev.target.closest("button");if(!b)return;
      if(b.classList.contains("ctz-quitar")){delete ped[k];guardaPed();pintaLista();pinta(false);return}
      var a=b.getAttribute("data-a");
      if(a){ped[k]=Math.max(1,Math.min(99,ped[k]+(a==="+"?1:-1)));li.querySelector("output").textContent=ped[k];refr();guardaPed();totales();enlace()}
    });
    ul.appendChild(li);
  });
  totales();enlace();
}
var foco=null;
function abre(){
  foco=document.activeElement;pintaLista();
  var v=$("#ped-velo");v.hidden=false;
  document.body.style.overflow="hidden";
  seguro(()=>$("#ped-cerrar").focus());
}
function cierra(){
  var v=$("#ped-velo");v.hidden=true;document.body.style.overflow="";
  seguro(()=>foco&&foco.focus&&foco.focus());
}

/* sonido de clic */
var SON=lee("hc-son","1")!=="0",AC=null,BUF=null,CARG=false,AU=$("#clic-audio");
function ctx(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext);if(AC.state==="suspended"&&AC.resume)AC.resume()}catch(e){AC=null}return AC}
function carga(){if(BUF||CARG||!AU)return;var c=ctx();if(!c)return;CARG=true;try{fetch(AU.currentSrc||AU.src).then(r=>r.arrayBuffer()).then(b=>new Promise((ok,no)=>{var p=c.decodeAudioData(b,ok,no);p&&p.then&&p.then(ok,no)})).then(b=>{BUF=b}).catch(()=>{})}catch(e){}}
function suena(v){
  if(!SON)return;var c=ctx();
  if(c&&BUF){try{var s=c.createBufferSource();s.buffer=BUF;var g=c.createGain();g.gain.value=v==null?1:v;s.connect(g);g.connect(c.destination);s.start(0);return}catch(e){}}
  if(AU){try{var a=AU.cloneNode();a.volume=v==null?1:v;var p=a.play();p&&p.catch&&p.catch(()=>{})}catch(e){}}
  carga();
}
["pointerdown","keydown"].forEach(t=>window.addEventListener(t,carga,{once:true,passive:true}));
document.addEventListener("click",e=>{var t=e.target.closest&&e.target.closest("a,button");if(t&&t.id!=="son")suena()});
seguro(()=>{var b=$("#son");b.setAttribute("aria-pressed",SON?"true":"false");b.addEventListener("click",()=>{SON=!SON;b.setAttribute("aria-pressed",SON?"true":"false");guarda("hc-son",SON?"1":"0");if(SON)suena()})});

/* entrada */
function listo(){document.body.classList.add("listo")}
seguro(()=>{
  var t=$("#pt-t"),w=t.textContent.trim().split(/\s+/),n=w.length;
  t.setAttribute("aria-label",t.textContent.trim());
  t.innerHTML=w.map((a,i)=>'<span class="pal" aria-hidden="true"><span style="--i:'+i+'"'+(i>=n-3?' class="acento"':'')+'>'+a+'</span></span>').join(" ");
});
seguro(()=>{
  var en=$("#en"),lg=$("#en-logo"),pl=$("#en-placa"),bt=$("#en-abrir"),hecho=false;
  document.body.style.overflow="hidden";
  requestAnimationFrame(()=>{lg.classList.add("arma");pl.classList.add("lista")});
  var golpe=g=>{pl.style.setProperty("--giro",g);pl.classList.remove("golpe");void pl.offsetWidth;pl.classList.add("golpe");try{navigator.vibrate&&navigator.vibrate(18)}catch(e){}};
  var entra=()=>{
    if(hecho)return;hecho=true;bt.disabled=true;
    var t=RED?[0,0,0,0]:[30,320,630,720];
    if(!RED){setTimeout(()=>golpe("-.6deg"),t[0]);setTimeout(()=>golpe(".6deg"),t[1]);setTimeout(()=>golpe("-.9deg"),t[2])}
    setTimeout(()=>{en.classList.add("abre");document.body.style.overflow=""},t[3]);
    setTimeout(listo,t[3]+380);
    setTimeout(()=>{en&&en.parentNode&&en.parentNode.removeChild(en)},t[3]+1450);
  };
  bt.addEventListener("click",entra);
  document.addEventListener("keydown",e=>{if(!hecho&&e.key==="Escape")entra()});
  setTimeout(()=>seguro(()=>bt.focus({preventScroll:true})),50);
});
if(!$("#en"))listo();

/* menú */
seguro(()=>{
  var m=$("#menu"),ab=$("#menu-abrir"),ce=$("#menu-cerrar");
  var o=()=>{m.hidden=false;ab.setAttribute("aria-expanded","true");requestAnimationFrame(()=>m.classList.add("abierto"));document.body.style.overflow="hidden";seguro(()=>ce.focus())};
  var c=()=>{m.classList.remove("abierto");m.hidden=true;ab.setAttribute("aria-expanded","false");document.body.style.overflow=""};
  ab.addEventListener("click",o);ce.addEventListener("click",c);
  $$("a",m).forEach(a=>a.addEventListener("click",c));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!m.hidden)c()});
});

/* scroll: cabecera, línea de tiempo, sección activa */
var tl=$("#tl"),rel=$("#tl-relleno"),its=$$(".tl-it"),links=$$("#hd-nav a"),secs=links.map(a=>$(a.getAttribute("href"))),tick=false;
function alScroll(){
  tick=false;var y=window.scrollY,h=window.innerHeight;
  seguro(()=>$("#hd").classList.toggle("fijo",y>40));
  seguro(()=>{
    var l=tl.querySelector(".tl-linea").getBoundingClientRect(),lim=h*.6;
    var p=Math.max(0,Math.min(1,(lim-l.top)/l.height));
    rel.style.height=(p*100).toFixed(2)+"%";
    its.forEach(i=>{var r=i.querySelector(".tl-hex").getBoundingClientRect();i.classList.toggle("act",r.top+r.height/2<lim)});
  });
  seguro(()=>{
    var a=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<h*.35)a=i});
    links.forEach((l,i)=>l.classList.toggle("act",i===a));
  });
}
window.addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(alScroll)}},{passive:true});
window.addEventListener("resize",()=>requestAnimationFrame(alScroll));
seguro(alScroll);

/* aparecer al bajar */
seguro(()=>{
  if(!IO||RED){$$(".rv").forEach(e=>e.classList.add("ve"));return}
  var o=new IntersectionObserver(es=>es.forEach(a=>{if(a.isIntersecting){a.target.classList.add("ve");o.unobserve(a.target)}}),{threshold:.14,rootMargin:"0px 0px -6% 0px"});
  $$(".rv").forEach(e=>o.observe(e));
  setTimeout(()=>$$(".rv:not(.ve)").forEach(e=>{if(e.getBoundingClientRect().top<innerHeight)e.classList.add("ve")}),2500);
});
seguro(()=>{if(!IO)return;var c=$("#cinta-env");new IntersectionObserver(es=>es.forEach(a=>c.classList.toggle("pausa",!a.isIntersecting))).observe(c)});

/* filtros */
function filtra(f){
  $$(".ca-f").forEach(b=>b.setAttribute("aria-pressed",b.getAttribute("data-f")===f?"true":"false"));
  $$(".ca-c").forEach(c=>{c.hidden=!(f==="todos"||c.getAttribute("data-cat")===f);if(!c.hidden)c.classList.add("ve")});
}
seguro(()=>{
  $$(".ca-f").forEach(b=>b.addEventListener("click",()=>filtra(b.getAttribute("data-f"))));
  $$("[data-ir]").forEach(a=>a.addEventListener("click",()=>filtra(a.getAttribute("data-ir"))));
});

/* pedido */
seguro(()=>{
  $$(".ca-add,.ch,[data-solo-add]").forEach(b=>b.addEventListener("click",()=>{
    var id=b.getAttribute("data-id");
    if(b.hasAttribute("data-solo-add")){if(!ped[id]){ped[id]=1;guardaPed();aviso(CAT[id].n+" agregado a tu pedido");pinta(true)}else aviso(CAT[id].n+" ya está en tu pedido");return}
    alterna(id);
  }));
  $$("[data-abrir-ped]").forEach(b=>b.addEventListener("click",abre));
  var v=$("#ped-velo");
  $("#ctz-boton").addEventListener("click",abre);
  $("#ped-cerrar").addEventListener("click",cierra);
  v.addEventListener("click",e=>{if(e.target===v)cierra()});
  ["#ped-nombre","#ped-lugar","#ped-fecha"].forEach(s=>$(s).addEventListener("input",enlace));
  $("#ped-enviar").addEventListener("click",enlace);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!v.hidden)cierra()});
});
seguro(()=>{
  var t=$(".pt-acc"),sobre=true;
  hBoton=()=>$("#ctz-boton").classList.toggle("oculto",sobre&&cuenta()===0);
  if(!IO){sobre=false;hBoton();return}
  new IntersectionObserver(es=>es.forEach(n=>{sobre=n.isIntersecting||n.boundingClientRect.top>0;hBoton()}),{threshold:0}).observe(t);
});
pinta(false);

/* compartir */
seguro(()=>{
  var texto="Herencia Culinaria: tamales vallunos, lechona y dulces con sazón valluna. Pedidos por WhatsApp.";
  $("#comp-wa").addEventListener("click",()=>{
    if(navigator.share){navigator.share({title:"Herencia Culinaria",text:texto,url:location.href}).catch(()=>{});return}
    window.open("https://wa.me/?text="+encodeURIComponent(texto+" "+location.href),"_blank");
  });
  $("#comp-link").addEventListener("click",()=>{
    var u=location.href,ok=()=>aviso("Enlace copiado"),res=()=>{try{var t=document.createElement("textarea");t.value=u;t.setAttribute("readonly","");t.style.cssText="position:fixed;opacity:0";document.body.appendChild(t);t.select();document.execCommand("copy");document.body.removeChild(t);ok()}catch(e){aviso(u)}};
    try{navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(u).then(ok,res):res()}catch(e){res()}
  });
  $("#anio").textContent=new Date().getFullYear();
});
})();
