const  btnEmpezar =  document.getElementById("btnEmpezar")
const celeste = document.getElementById("celeste")
const violeta = document.getElementById("violeta")
const verde = document.getElementById("verde")
const naranja = document.getElementById("naranja")
const ULTIMO_NIVEL = 1


swal("BIENVENIDO !!", {
    buttons: false,
    timer: 2000,
  });
class Juego {
    constructor( ){  
        this.inicializar()
        this.generarSecuencia()
        this.inicializar = this.inicializar.bind(this)
        setTimeout(this.siguienteNivel(), 500 );

    }

    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()* 4 ))
       
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(num){
        switch (num) {
            case 0:
                return "celeste"   
            case 1:
                return "violeta"
            case 2: 
                return "naranja"
            case 3 :
                return "verde"
        }
    }

    transformarColorANumero(color){
        switch (color) {
            case "celeste":
                return  0
            case"violeta":
                return 1
            case "naranja": 
                return 2
            case "verde" :
                return 3
        }
    }

    iluminarSecuencia(){
        for (let i = 0;i < this.nivel; i++){
           let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000*i)          
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color),350)  
    }

    apagarColor(color){
        this.colores[color].classList.remove("light")
    }


    agregarEventosClick(){
        this.colores.celeste.addEventListener('click',this.elegirColor)
        this.colores.naranja.addEventListener('click',this.elegirColor)
        this.colores.verde.addEventListener('click',this.elegirColor)
        this.colores.violeta.addEventListener('click',this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click',this.elegirColor)
        this.colores.naranja.removeEventListener('click',this.elegirColor)
        this.colores.verde.removeEventListener('click',this.elegirColor)
        this.colores.violeta.removeEventListener('click',this.elegirColor)
    }
    
    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        
        this.iluminarColor(nombreColor)
        
        if (numeroColor == this.secuencia[this.subnivel]){
            
        this.subnivel++
        if (this.subnivel == this.nivel){
            this.nivel++
            this.eliminarEventosClick()
            if (this.nivel == (ULTIMO_NIVEL + 1)){
                   this.ganoElJuego()
            }else {
                setTimeout(this.siguienteNivel, 1500 ); 
                }
            }

        } else{
            this.perdioElJuego()
        }

    }

    ganoElJuego(){
        swal('SIMON DICE QUE GANASTE ','Felicitaciones, ganaste el juego','success')
        .then(() => this.inicializar()) 
    }

    perdioElJuego(){
        swal('SIMON DICE QUE PERDISTE :C','Intentalo nuevamente','error')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        }) 
    }

}



function empezarJuego() {
    window.juego = new Juego()

}