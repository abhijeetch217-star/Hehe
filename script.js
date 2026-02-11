let autoInterval=null;
let wind=2;

function randomFlowerShape(){
  const colors=["pink","red","yellow","violet","orange"];
  const color=colors[Math.floor(Math.random()*colors.length)];

  return `
  <line x1="50" y1="200" x2="50" y2="120" stroke="green" stroke-width="4"/>
  <ellipse cx="40" cy="150" rx="15" ry="8" fill="green"/>
  <ellipse cx="60" cy="150" rx="15" ry="8" fill="green"/>
  <circle cx="50" cy="110" r="15" fill="${color}"/>
  `;
}

function createFlower(x){
  const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("viewBox","0 0 100 200");
  svg.setAttribute("width","60");
  svg.setAttribute("height","120");
  svg.classList.add("flower","sway");
  svg.style.left=x+"px";
  svg.style.setProperty("--wind",wind);
  svg.innerHTML=randomFlowerShape();

  document.body.appendChild(svg);

  document.getElementById("bloomSound").volume=0.2;
  document.getElementById("bloomSound").play();
}

document.addEventListener("click",function(e){
  if(e.target.tagName==="BUTTON") return;
  createFlower(e.clientX);
});

function startAuto(){
  if(autoInterval) return;
  autoInterval=setInterval(()=>{
    createFlower(Math.random()*window.innerWidth);
  },1000);
}

function resetGarden(){
  document.querySelectorAll(".flower").forEach(f=>f.remove());
  clearInterval(autoInterval);
  autoInterval=null;
}

/* 🌬 Dynamic wind */
setInterval(()=>{
  wind = Math.random()*6;
  document.querySelectorAll(".flower").forEach(f=>{
    f.style.setProperty("--wind",wind);
  });
},5000);

/* 🌙 Fireflies */
setInterval(()=>{
  let t=new Date().getSeconds()%240;
  if(t>130){
    const f=document.createElement("div");
    f.className="firefly";
    f.style.left=Math.random()*window.innerWidth+"px";
    f.style.top=Math.random()*window.innerHeight+"px";
    document.body.appendChild(f);
    setTimeout(()=>f.remove(),5000);
  }
},1200);
