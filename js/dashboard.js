(async()=>{
 const kta=localStorage.getItem("login");
 if(!kta) location.href="index.html";
 const r=await fetch("data/kta.json");
 const d=await r.json();
 let h="<tr><th>No</th><th>Nama</th><th>Status</th><th>KTA</th></tr>";
 d.forEach((u,i)=>{
  h+=`<tr><td>${i+1}</td><td>${u.nama}</td><td>${u.status}</td><td>${u.no_kta}</td></tr>`;
 });
 list.innerHTML=h;
})();