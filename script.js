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

/* sonido (clic + cocina). Los dos se decodifican al cargar la página para que suenen al instante, también en el celular */
var SON=lee("hc-son","1")!=="0",AC=null,BUF={},CARG={};
function ctx(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)({latencyHint:"interactive"});if(AC.state==="suspended"&&AC.resume)AC.resume()}catch(e){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended"&&AC.resume)AC.resume()}catch(e2){AC=null}}return AC}
function carga(id){
  var el=$("#"+id+"-audio");if(BUF[id]||CARG[id]||!el)return;
  var c=AC||ctx();if(!c)return;CARG[id]=true;
  try{fetch(el.currentSrc||el.src).then(r=>r.arrayBuffer()).then(b=>new Promise((ok,no)=>{var p=c.decodeAudioData(b,ok,no);p&&p.then&&p.then(ok,no)})).then(b=>{BUF[id]=b}).catch(()=>{CARG[id]=false})}catch(e){CARG[id]=false}
}
function cargaTodo(){carga("clic");carga("cocina")}
function suena(v){
  if(!SON)return;var c=ctx();
  if(c&&BUF.clic){try{var s=c.createBufferSource();s.buffer=BUF.clic;var g=c.createGain();g.gain.value=v==null?1:v;s.connect(g);g.connect(c.destination);s.start(0);return}catch(e){}}
  var AU=$("#clic-audio");
  if(AU){try{AU.currentTime=0;AU.volume=v==null?1:v;var p=AU.play();p&&p.catch&&p.catch(()=>{})}catch(e){}}
  cargaTodo();
}
/* sonido de la cocina: dura solo mientras se abre la persiana */
var COC=null;
function cocina(){
  if(!SON)return;var c=ctx();
  if(c&&BUF.cocina){try{var s=c.createBufferSource();s.buffer=BUF.cocina;var g=c.createGain();g.gain.value=.9;s.connect(g);g.connect(c.destination);s.start(0);COC={s:s,g:g,c:c};return}catch(e){}}
  var A=$("#cocina-audio");
  if(A){try{A.currentTime=0;A.volume=.9;var p=A.play();p&&p.catch&&p.catch(()=>{});COC={a:A}}catch(e){}}
}
function paraCocina(ms){
  var k=COC;if(!k)return;COC=null;ms=ms||250;
  try{
    if(k.g){var t=k.c.currentTime;k.g.gain.cancelScheduledValues(t);k.g.gain.setValueAtTime(k.g.gain.value,t);k.g.gain.linearRampToValueAtTime(0,t+ms/1000);setTimeout(()=>{try{k.s.stop()}catch(e){}},ms+40)}
    else if(k.a){var v=k.a.volume,n=0,iv=setInterval(()=>{n++;try{k.a.volume=Math.max(0,v*(1-n/5))}catch(e){}if(n>=5){clearInterval(iv);try{k.a.pause();k.a.volume=v}catch(e){}}},ms/5)}
  }catch(e){}
}
/* el contexto se crea ya y se carga todo de inmediato; el primer toque solo lo "despierta" */
seguro(()=>{ctx();cargaTodo()});
["pointerdown","touchstart","keydown"].forEach(t=>window.addEventListener(t,()=>{ctx();cargaTodo()},{passive:true}));
/* En pantallas táctiles suena al levantar el dedo (pointerup), sin esperar al evento click; con mouse y teclado, en click */
var CLIC="a,button",ultimoToque=0;
var sonable=e=>{var t=e.target.closest&&e.target.closest(CLIC);return t&&t.id!=="son"};
document.addEventListener("pointerup",e=>{if(e.pointerType==="mouse")return;if(sonable(e)){ultimoToque=Date.now();suena()}},true);
document.addEventListener("click",e=>{if(Date.now()-ultimoToque<800)return;if(sonable(e))suena()});
seguro(()=>{var b=$("#son");b.setAttribute("aria-pressed",SON?"true":"false");b.addEventListener("click",()=>{SON=!SON;b.setAttribute("aria-pressed",SON?"true":"false");guarda("hc-son",SON?"1":"0");if(!SON)paraCocina(80);if(SON)suena()})});

/* indicador de sección activa en la barra (amarillo) */
seguro(()=>{
  var mapa=[["carta","#carta"],["promo","#promo"],["novedades","#novedades"],["nosotros","#nosotros"],["como-pedir","#como-pedir"],[null,".ll"],["contacto","#contacto"]]
    .map(p=>({id:p[0],el:$(p[1])})).filter(p=>p.el);
  var links=$$('.hd-nav a[href^="#"], .menu nav a[href^="#"]');
  var actual="",bloqueo=false,tb=null;
  function pinta(id){
    if(id===actual)return;actual=id;
    links.forEach(a=>{var on=!!id&&a.getAttribute("href")==="#"+id;a.classList.toggle("act",on);if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")});
  }
  function calcula(){
    var hd=$("#hd"),h=(hd?hd.offsetHeight:68)+Math.round(innerHeight*.25),id="";
    mapa.forEach(p=>{if(p.el.getBoundingClientRect().top<=h)id=p.id});
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)id="contacto";
    pinta(id||"");
  }
  /* mientras la página baja sola hacia la sección elegida, el indicador no cambia; se libera cuando el scroll se detiene */
  var iv=null;
  var libera=()=>{bloqueo=false;clearInterval(iv);iv=null;calcula()};
  function sigue(){
    bloqueo=true;clearInterval(iv);var ult=-1,quieto=0,n=0;
    iv=setInterval(()=>{n++;var y=Math.round(scrollY);if(y===ult)quieto++;else quieto=0;ult=y;if(quieto>=3||n>40)libera()},110);
  }
  addEventListener("scroll",()=>{if(!bloqueo)calcula()},{passive:true});
  addEventListener("resize",calcula);
  /* si la persona toma el control (rueda, dedo o teclado), se libera */
  ["wheel","touchstart","keydown"].forEach(t=>addEventListener(t,()=>{if(bloqueo)libera()},{passive:true}));
  /* al elegir una sección: se marca esa de inmediato, la anterior vuelve al color normal y se baja hasta ella */
  links.forEach(a=>a.addEventListener("click",()=>{
    var id=a.getAttribute("href").slice(1);if(!$("#"+id))return;
    pinta(id);sigue();
  }));
  var m=$(".hd-marca");if(m)m.addEventListener("click",()=>{pinta("");sigue()});
  calcula();
});

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
    setTimeout(cocina,150);
    setTimeout(()=>{en.classList.add("abre");document.body.style.overflow=""},t[3]);
    setTimeout(listo,t[3]+380);
    setTimeout(()=>paraCocina(300),t[3]+1150);
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
  /* el indicador de sección de la barra lo maneja el bloque "indicador de sección activa" */
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
