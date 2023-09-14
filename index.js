const USER = document.getElementById("jugador"),USER2 = document.getElementById("jugador2"),USER3 = document.getElementById("jugador3"),USER4 = document.getElementById("jugador4")
const FILAS = document.getElementById("numero_filas"), COLUMNAS = document.getElementById("numero_columnas")
const COMENCAR = document.getElementById("submit")
const DESTINO = document.getElementById("destino")
const H = document.getElementById("horas"), M = document.getElementById("minutos"),S = document.getElementById("sgnds")
let Name_user = document.getElementById("Name_user")
let hor = 0,min = 0,seg = 0
const POSITIONS = []
let comprovar2
let players=[]
let winners_order=[]
const timeout_main = 3000,time_interval_main = 1000
let turnos_user=0
let imgs = [
  img1 = {positions: [],Positions_Elimitnated: [],Positions_Registred: [],src: "imgs/img1.png",},
  img2 = {positions: [],Positions_Elimitnated: [],Positions_Registred: [],src: "imgs/img2.png",},
  img3 = {positions: [],Positions_Elimitnated: [],Positions_Registred: [],src: "imgs/img3.png",}]
let jugadores = [
  jugador1 = {nombre: "",Positions_Win: [],turnos: 0,},
  jugador2 = {nombre: "",Positions_Win: [],turnos: 0,},
  jugador3 = {nombre: "",Positions_Win: [],turnos: 0,},
  jugador4 = { nombre: "",Positions_Win: [],turnos: 0,}]
COMENCAR.addEventListener("click", juego)
function juego() {
  const NUMFILAS = FILAS.value, NUMCOL = COLUMNAS.value
  const NOMBRE = USER.value,NOMBRE2 = USER2.value,NOMBRE3 = USER3.value,NOMBRE4 = USER4.value
  if(NUMFILAS=="" || NUMCOL=="" || NOMBRE=="" && NOMBRE2=="" && NOMBRE3=="" && NOMBRE==""){
    alert("debes poner correctamente la informacion de las columnas y las filas y los jugadores que van a jugar ^^")
  }else{
      COMENCAR.removeEventListener("click", juego)
      setInterval_main = setInterval(temporizador, time_interval_main)
      jugadores[0].nombre = NOMBRE
      jugadores[1].nombre = NOMBRE2
      jugadores[2].nombre = NOMBRE3
      jugadores[3].nombre = NOMBRE4
      for(i=0;i<=jugadores.length-1;i++){
      if(jugadores[i].nombre!=''){
        players.push(i)
      }  
    }
    Name_user.innerHTML = jugadores[players[turnos_user]].nombre
    let contador = 1
    let contador2 = 0
    for (i = 0; i < NUMFILAS; i++) {
      for (i2 = 1; i2 <= NUMCOL; i2++) {
        let divParent = document.createElement("div")
        divParent.className = "divs_main"
        divParent.id = contador2
        POSITIONS.push(contador2)
        if (contador > NUMCOL) {
          let br = document.createElement("br")
          br.className = "br"
          DESTINO.appendChild(br)
          contador = 1
        }
        DESTINO.appendChild(divParent)
        contador++
        contador2++
      }
    }
    POSITIONS.forEach(i => {
      let elements_main = document.getElementById(i)
      elements_main.addEventListener("click", i => {
        User_wins(i.target.id)
      })
    })
    RandomPositions()
  }
}
function User_wins(d) {
  let id = d
  for (i = 0; i < imgs.length; i++) {
    imgs[i].positions.forEach(i2 => {
      if (i2 == id) {
        if (comprovar2 == undefined) {
          comprovar2 = i
        }
        if(id==""){
          comprovar2=undefined
        }else{
         if (comprovar2 != i) {
          alert("error!!")
          let destino_img = document.getElementById(id)
          let create_img = document.createElement("img")
          create_img.src = imgs[i].src
          create_img.className="imgs"
          destino_img.appendChild(create_img)
          setTimeout(() => {
            error(id)
          }, 1000)
        } else {
          if (imgs[i].Positions_Elimitnated.length < 1) {
            imgs[i].Positions_Elimitnated.push(id)
          }
          jugadores[players[turnos_user]].Positions_Win.push(i2)
          if (jugadores[players[turnos_user]].Positions_Win.length % 2 == 0 ) {
            imgs[comprovar2].Positions_Elimitnated = []
            comprovar2 = undefined
          }          
          let destino_img = document.getElementById(id)
          let create_img = document.createElement("img")
          create_img.src = imgs[i].src
          create_img.className="imgs"
          destino_img.appendChild(create_img)
          imgs[i].positions.splice(imgs[i].positions.indexOf(i2), 1,)
          if (imgs[i].positions.length == 0) {
            comprovar2 = undefined
          }
          if (imgs[0].positions.length == 0 && imgs[1].positions.length == 0 && imgs[2].positions.length == 0) {
            alert("HAS GANADO adiwjd0jdwodoawd")
            let ant_number=turnos_user
            winners_order.push(players[turnos_user])
            positions_regenerated_for_users()
            players.splice(ant_number,1)
            winners()
            turnos_user=players.length-1
          }
        }
      }    
        }
    })
  }
}
function RandomPositions() {
  let contador = 0
  let length_main = POSITIONS.length
  let pares_cartas = POSITIONS.length % 2
  if (pares_cartas != 0) {
    length_main = length_main - pares_cartas
  }
  for (i = 3; 0 < length_main; i++) {
    let positions_randoms = POSITIONS[Math.floor(Math.random() * POSITIONS.length)]
    if (i % 2 == 0) {
      imgs[contador].positions.push(positions_randoms)
      imgs[contador].Positions_Registred.push(positions_randoms)
      POSITIONS.splice(POSITIONS.indexOf(positions_randoms), 1,)
      contador++
      length_main--
      i = 0
    } else {
      imgs[contador].positions.push(positions_randoms)
      imgs[contador].Positions_Registred.push(positions_randoms)
      POSITIONS.splice(POSITIONS.indexOf(positions_randoms), 1,)
      length_main--
    }
    if (contador >= imgs.length) {
      contador = 0
    }
  }
   for(i=0;i<imgs.length;i++){
      if (imgs[i].positions.length % 2 != 0) {
        imgs[i].positions.pop()
        }
    }
  for(i=0;i<imgs.length;i++){
    imgs[i].positions.forEach(i2 => {
    let divs = document.getElementById(i2)
    let img_create = document.createElement("img")
    img_create.src = imgs[i].src
    img_create.className="imgs"
    divs.appendChild(img_create)
    setTimeout(() => {
      divs.innerHTML = ""
    }, timeout_main)
  })
  }
}
function temporizador() {
  seg++
  S.innerHTML = seg
  if (seg >= 60) {
    seg = 0
    min++
    M.innerHTML = min + ":"
  }
  if (seg < 10) {
    S.innerHTML = "0" + seg
  }
  if (min >= 60) {
    min = 0
    hor++
    H.innerHTML = hor+":"
  } if (min < 10) {
    M.innerHTML = "0" + min + ":"
  }
  if (hor >= 23) {
    hor = 0
  } if (hor < 10) {
    H.innerHTML = "0" + hor + ":"
  }
}
function error(id) {
jugadores[players[turnos_user]].Positions_Win.splice(jugadores[players[turnos_user]].Positions_Win.indexOf(id), 1)
  imgs[comprovar2].Positions_Elimitnated.forEach(i2 => {
    let destino_img = document.getElementById(i2)
    destino_img.innerHTML = ""
  imgs[comprovar2].positions.push(i2)
  })
  document.getElementById(id).innerHTML = ""
  imgs[comprovar2].Positions_Elimitnated = []
  comprovar2 = undefined
  positions_regenerated_for_users()
}
function positions_regenerated_for_users (){
  imgs[0].positions=[]
  imgs[1].positions=[]
  imgs[2].positions=[]
  for(i=0;i<imgs.length;i++){
       imgs[i].Positions_Registred.forEach(i2=>{
        imgs[i].positions.push(i2)
    })
  }
  if(jugadores[players[turnos_user]].turnos<1 && players.length<1){
           jugadores[players[turnos_user]].turnos++
  }else if(players.length>0){
       jugadores[players[turnos_user]].turnos++
  }
    turnos_user++
    if(turnos_user>players.length-1){
            turnos_user=0
          }
   document.getElementById("Name_user").innerHTML=jugadores[players[turnos_user]].nombre
    for(i=0;i<imgs.length;i++){
      imgs[i].positions.forEach(i2=>{
          document.getElementById(i2).innerHTML=""
      })
    }
   jugadores[players[turnos_user]].Positions_Win.forEach(i4=>{
     if(imgs[0].positions.indexOf(i4)>-1){
            imgs[0].positions.splice(imgs[0].positions.indexOf(i4),1)
            document.getElementById(i4).innerHTML="<img class='imgs' src=imgs/img1.png>"
     }
      if(imgs[1].positions.indexOf(i4)>-1){
            imgs[1].positions.splice(imgs[1].positions.indexOf(i4),1)
            document.getElementById(i4).innerHTML="<img class='imgs' src=imgs/img2.png>"
      }
      if(imgs[2].positions.indexOf(i4)>-1){
            imgs[2].positions.splice(imgs[2].positions.indexOf(i4),1)
            document.getElementById(i4).innerHTML="<img class='imgs' src=imgs/img3.png>"
      }
   })
}
function winners(){
  if(players.length<1){
    const winner_element=document.getElementById("div_Ranking")
    const confeti=document.createElement("img")
    let nums_order_users=1
    let confeti_position=document.getElementById("confeti")
    let sonido = new Audio("sonidos/Felicitaciones.mp3")
    document.getElementById("destino").className="display_none"
    document.getElementById("back_ranking").className="display"
    confeti.src="imgs/ganar_confeti.gif"
    confeti.id="confeti_img"
    sonido.play()
    confeti_position.appendChild(confeti)
    setTimeout(()=>{
      confeti_position.removeChild(confeti)
    },2000)
    clearInterval(setInterval_main)
    winners_order.forEach(i=>{
      let h3= document.createElement("h3")
      h3.innerHTML+="<h3>"+nums_order_users+". "+jugadores[i].nombre+" turnos utilizados: "+jugadores[i].turnos+"</h3>"
      winner_element.appendChild(h3)
      nums_order_users++
    })
  }
}