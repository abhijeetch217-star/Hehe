const flowers = ["🌸","🌼","🌺","🌷","🌹"];
let autoInterval = null;

document.addEventListener("click", function(e){
  if(e.target.tagName === "BUTTON") return;

  createFlower(e.clientX, e.clientY);
  createSparkle(e.clientX, e.clientY);

  // vibration (mobile only)
  if(navigator.vibrate){
    navigator.vibrate(30);
  }
});

function createFlower(x,y){
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.innerText = flowers[Math.floor(Math.random()*flowers.length)];

  flower.style.left = x + "px";
  flower.style.top = y + "px";
  flower.style.fontSize = (Math.random()*20 + 25) + "px";

  document.body.appendChild(flower);
}

function createSparkle(x,y){
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.innerText = "✨";

  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";

  document.body.appendChild(sparkle);

  setTimeout(()=> sparkle.remove(),800);
}

function startAuto(){
  if(autoInterval) return;

  autoInterval = setInterval(()=>{
    let x = Math.random()*window.innerWidth;
    let y = Math.random()*window.innerHeight;
    createFlower(x,y);
  },200);
}

function resetGarden(){
  document.querySelectorAll(".flower").forEach(f=>f.remove());
  document.querySelectorAll(".sparkle").forEach(s=>s.remove());
  clearInterval(autoInterval);
  autoInterval = null;
}
