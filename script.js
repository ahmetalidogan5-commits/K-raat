let talebeler = JSON.parse(localStorage.getItem("talebeler")) || [];

goster();

function ekle(){

let ad = document.getElementById("ad").value;
let soyad = document.getElementById("soyad").value;
let sinif = document.getElementById("sinif").value;

if(ad=="" || soyad=="" || sinif==""){
alert("Bütün alanları doldur.");
return;
}

talebeler.push({

ad:ad,
soyad:soyad,
sinif:sinif,
mulakat:false,
not:""

});

kaydet();

document.getElementById("ad").value="";
document.getElementById("soyad").value="";
document.getElementById("sinif").value="";

goster();

}

function kaydet(){

localStorage.setItem("talebeler",JSON.stringify(talebeler));

}

function goster(){

let liste=document.getElementById("liste");

liste.innerHTML="";

document.getElementById("ogrenci").innerHTML=talebeler.length;

talebeler.forEach((t,index)=>{

liste.innerHTML+=`

<div class="ogrenci">

<h3>${t.ad} ${t.soyad}</h3>

<p>Sınıf : ${t.sinif}</p>

<label>

<input type="checkbox"

${t.mulakat ? "checked":""}

onchange="mulakat(${index},this.checked)">

Mülakat Yapıldı

</label>

<br><br>

<textarea

placeholder="Mülakat Notu"

onkeyup="notKaydet(${index},this.value)">${t.not}</textarea>

<br>

<button onclick="sil(${index})">

Sil

</button>

</div>

`;

});

}

function sil(index){

talebeler.splice(index,1);

kaydet();

goster();

}

function mulakat(index,durum){

talebeler[index].mulakat=durum;

kaydet();

}

function notKaydet(index,yazi){

talebeler[index].not=yazi;

kaydet();

}
