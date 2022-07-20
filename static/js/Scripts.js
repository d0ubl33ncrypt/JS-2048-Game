var papan2048;
var skor = 0;
var baris2 = 4;
var kolom2 = 4;

window.onload = function () {
  mulaiGame();
};

function mulaiGame() {
  papan2048 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],

    // [2, 2, 4, 0],
    // [2, 2, 4, 4],
    // [4, 4, 8, 8],
    // [8, 8, 0, 0],
  ];

  for (let baris = 0; baris < baris2; baris++) {
    for (let kolom = 0; kolom < kolom2; kolom++) {
      let kotakAngka = document.createElement("div");
      kotakAngka.id = baris.toString() + "-" + kolom.toString();
      let angka = papan2048[baris][kolom];
      perbaharuiKotakAngka(kotakAngka, angka);
      document.getElementById("papan2048").append(kotakAngka);
    }
  }

  munculin2();
  munculin2();
}

function kotakTersedia() {
  for (let b = 0; b < b.baris2; b++) {
    for (let k = 0; k < kolom2; k++) {
      if (papan2048[b][k] == 0) {
        return true;
      }
    }
  }
}

function munculin2() {
  if (!kotakTersedia) {
    return;
  }

  let found = false;
  while (!found) {
    let b = Math.floor(Math.random() * baris2);
    let k = Math.floor(Math.random() * kolom2);

    if (papan2048[b][k] == 0) {
      papan2048[b][k] = 2;
      let kotakAngka = document.getElementById(
        b.toString() + "-" + k.toString()
      );
      kotakAngka.innerText = "2";
      kotakAngka.classList.add("angka2");
      found = true;
    }
  }
}
function perbaharuiKotakAngka(kotakAngka, angka) {
  kotakAngka.innerText = "";
  kotakAngka.classList.value = "";
  kotakAngka.classList.add("kotakAngka");
  if (angka > 0) {
    kotakAngka.innerText = angka;
    if (angka <= 4096) {
      kotakAngka.classList.add("angka" + angka.toString());
    } else {
      kotakAngka.classList.add("angka8192");
    }
  }
}

/*Buat slide arrow*/
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    geserKiri();
  }
  if (e.code == "ArrowRight") {
    geserKanan();
  }
  if (e.code == "ArrowUp") {
    geserAtas();
  } else if (e.code == "ArrowDown") {
    geserBawah();
  }
  munculin2();
  document.getElementById("skor").innerText = skor;
});

function cek0(baris) {
  return baris.filter((angka) => angka != 0);
}

function geser(baris) {
  //
  baris = cek0(baris);

  for (let i = 0; i < baris.length; i++) {
    // cek
    if (baris[i] == baris[i + 1]) {
      baris[i] *= 2;
      baris[i + 1] = 0;
      skor += baris[i];
    }
  }

  baris = cek0(baris);

  while (baris.length < kolom2) {
    baris.push(0);
  }

  return baris;
}

function geserKiri() {
  for (let b = 0; b < baris2; b++) {
    let baris = papan2048[b];
    baris = geser(baris);
    papan2048[b] = baris;

    for (let k = 0; k < kolom2; k++) {
      let kotakAngka = document.getElementById(
        b.toString() + "-" + k.toString()
      );
      let angka = papan2048[b][k];
      perbaharuiKotakAngka(kotakAngka, angka);
    }
  }
}

function geserKanan() {
  for (let b = 0; b < baris2; b++) {
    let baris = papan2048[b];
    baris.reverse();
    baris = geser(baris);
    baris.reverse();
    papan2048[b] = baris;

    for (let k = 0; k < kolom2; k++) {
      let kotakAngka = document.getElementById(
        b.toString() + "-" + k.toString()
      );
      let angka = papan2048[b][k];
      perbaharuiKotakAngka(kotakAngka, angka);
    }
  }
}

function geserAtas() {
  for (let k = 0; k < kolom2; k++) {
    let baris = [
      papan2048[0][k],
      papan2048[1][k],
      papan2048[2][k],
      papan2048[3][k],
    ];
    baris = geser(baris);
    // papan2048[0][k] = baris[0];
    // papan2048[1][k] = baris[1];
    // papan2048[2][k] = baris[2];
    // papan2048[3][k] = baris[3];

    for (let b = 0; b < baris2; b++) {
      papan2048[b][k] = baris[b];
      let kotakAngka = document.getElementById(
        b.toString() + "-" + k.toString()
      );
      let angka = papan2048[b][k];
      perbaharuiKotakAngka(kotakAngka, angka);
    }
  }
}

function geserBawah() {
  for (let k = 0; k < kolom2; k++) {
    let baris = [
      papan2048[0][k],
      papan2048[1][k],
      papan2048[2][k],
      papan2048[3][k],
    ];
    baris.reverse();
    baris = geser(baris);
    baris.reverse();
    // papan2048[0][k] = baris[0];
    // papan2048[1][k] = baris[1];
    // papan2048[2][k] = baris[2];
    // papan2048[3][k] = baris[3];

    for (let b = 0; b < baris2; b++) {
      papan2048[b][k] = baris[b];
      let kotakAngka = document.getElementById(
        b.toString() + "-" + k.toString()
      );
      let angka = papan2048[b][k];
      perbaharuiKotakAngka(kotakAngka, angka);
    }
  }
}
