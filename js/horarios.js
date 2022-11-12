let horarios = [
  { id: 1, mes: "enero", dias: [] },
  { id: 2, mes: "febrero", dias: [] },
  { id: 3, mes: "marzo", dias: [] },
  { id: 4, mes: "abril", dias: [] },
  { id: 5, mes: "mayo", dias: [] },
  { id: 6, mes: "junio", dias: [] },
  { id: 7, mes: "julio", dias: [] },
  { id: 8, mes: "agosto", dias: [] },
  { id: 9, mes: "septiembre", dias: [] },
  { id: 10, mes: "octubre", dias: [] },
  { id: 11, mes: "noviembre", dias: [] },
  { id: 12, mes: "diciembre", dias: [] },
];
let fechaActual = new Date();

function horariosGenerator() {
  for (let i = 0; i < 12; i++) {
    let mes = horarios[i];
    for (let j = 0; j < mes.dias.length; j++) {
      for (let k = 0; k <= 8; k++) {
        mes.dias[j].horariosDelDia.push({
          id: k,
          horario: k + 9 + ":00",
          tel: "",
          nom: "",
          disponible: true,
        });
      }
    }
  }
}

function generator() {
  for (let j = 0; j < 12; j++) {
    let mes = horarios[j].id;
    if (
      mes == 1 ||
      mes == 3 ||
      mes == 5 ||
      mes == 7 ||
      mes == 8 ||
      mes == 10 ||
      mes == 12
    ) {
      for (let k = 1; k <= 31; k++) {
        horarios[j].dias.push({ id: k, horariosDelDia: [] });
      }
    } else if (mes == 2) {
      for (let k = 1; k <= 28; k++) {
        horarios[j].dias.push({ id: k, horariosDelDia: [] });
      }
    } else if (mes == 2 || mes == 4 || mes == 6 || mes == 9 || mes == 11) {
      for (let k = 1; k <= 30; k++) {
        horarios[j].dias.push({ id: k, horariosDelDia: [] });
      }
    }
  }

  horariosGenerator();
}

function mostrarFechaEnTitulo(){
  let fechaCalendario = document.getElementById("calendario").value;
  let diaCalendario = parseInt(fechaCalendario.substring(8, 10),10);
  let mesCalendario = parseInt(fechaCalendario.substring(5, 7), 10);
  console.log(fechaCalendario)

  if(fechaCalendario == ""){
    document.getElementById("tituloHorarios").innerHTML = "Horarios disponibles para hoy";
  }else{
    document.getElementById("tituloHorarios").innerHTML = "Horarios disponibles para el "+ diaCalendario+"/"+mesCalendario;
  }
  
}

function agendarhorario(id){
  console.log(id)
  
}

function mostrar(mes, dia) {
  let htmlContent = "";
  mostrarFechaEnTitulo();

    let mesMostrado = horarios.find(ms => ms.id == mes);
    let diaMostrado = mesMostrado.dias.find(day => day.id == dia);

  for (let i = 0; i < diaMostrado.horariosDelDia.length; i++) {
    if (diaMostrado.horariosDelDia[i].disponible == false) {
      htmlContent += `<li onclick="agendarhorario("document.getElementById('${i}')")" class="list-group-item list-group-item-danger text-center" id="li${i}">${diaMostrado.horariosDelDia[i].horario}</li>`;
    } else {
      htmlContent += `<li onclick="agendarhorario("document.getElementById('${i}')")" class="list-group-item list-group-item-action list-group-item-dark text-center" id="li${i}">${diaMostrado.horariosDelDia[i].horario}</li>`;
    }
  }

  document.getElementById("listaHorarios").innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", () => {
  
  generator();
  mostrar(fechaActual.getMonth()+1,fechaActual.getDate());
  mostrarFechaEnTitulo();

  document.getElementById("inicio").addEventListener("click", () => {
    window.location = "index.html";
  });

  document.getElementById("calendario").addEventListener("change", () => {
    let fechaSeleccionada = document.getElementById("calendario").value;
    let mesParaMostrar = parseInt(fechaSeleccionada.substring(5, 7), 10);
    let diaParaMostrar = parseInt(fechaSeleccionada.substring(8, 10),10);
    let dia = new Date(fechaSeleccionada.substring(0,4)+"-"+fechaSeleccionada.substring(5, 7)+"-"+(parseInt(fechaSeleccionada.substring(8, 10),10)+1))
    let diaDeLaSemana = dia.getDay();

    if (diaParaMostrar < fechaActual.getDate() || mesParaMostrar < fechaActual.getMonth() + 1) {
      Swal.fire({
        icon: "error",
        title: "Intentas seleccionar una fecha ya pasada.",
        text: "Por favor intente con una fecha válida.",
      });
    }else if(diaDeLaSemana == 0 || diaDeLaSemana == 6){
      Swal.fire({
        icon: "error",
        title: "Intentas seleccionar una fecha de fin de semana.",
        text: "Por favor intente con una fecha válida.",
      });
    }
    mostrar(mesParaMostrar,diaParaMostrar);
  });

  document.getElementById("agendar").addEventListener("click", () => {
    let select = document.getElementById("selectH");
    let turno = select.options[select.selectedIndex].text;
    let numero = document.getElementById("numero").value;
    let nombre = document.getElementById("nombre").value;


  });
});
