async function login(){
 const kta=document.getElementById("kta").value;
 const pass=document.getElementById("pass").value;
 const r=await fetch("data/kta.json");
 const d=await r.json();
 const u=d.find(x=>x.no_kta===kta);
 if(!u){alert("KTA tidak terdaftar");return;}
 const s=localStorage.getItem("pass_"+kta);
 if(!s){localStorage.setItem("pass_"+kta,pass);}
 else if(s!==pass){alert("Password salah");return;}
 localStorage.setItem("login",kta);
 location.href=kta==="0812180001"?"dev.html":"dashboard.html";
}
function reset(){
 const kta=prompt("Nomor KTA");
 const p=prompt("Pesan");
 if(!kta||!p) return;
 location.href="mailto:diviganteng79@gmail.com?subject=Reset Sandi&body=No KTA:"+kta+"%0A"+p;
}