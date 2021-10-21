import { forEachLimit } from 'async'
import music from './parts/music.js'

const socket = io("ws://localhost:3000");
const startButton = document.getElementsByClassName('start-button')[0]


startButton.addEventListener('click', () => {
    socket.emit('startGame');
});

socket.on('startGame', () => {
    console.log('startgameclient');
    startButton.style.display='none'
    socket.on('translation',(position)=>{
        if(position.y>0) {
            Translation('right',false)
        } else {
            Translation('left',false)
    
        }
    }) 
const background = new Image()
background.src="https://dcn.eestienne.info/QuentinBa/workshop/images/miniJeuCanvas/interfaceBackground3.png"
const [soundCtx,biquadFilter,osc] = music()

const canvas = document.getElementById('canvas')
canvas.width=window.innerWidth*0.8
canvas.height=window.innerHeight*0.8
const ctx = canvas.getContext('2d')

const imgAvion = new Image()
imgAvion.src ='https://dcn.eestienne.info/QuentinBa/jsavance/assets/avion.png'

let ennemies = {
    ennemi1 : {
        img:imgAvion,
        x:canvas.width*0.72,
        y:canvas.height*0.2
    },
    ennemi2: {
        img:imgAvion,
        x:canvas.width*0.91,
        y:canvas.height*0.7
    }
}

let avion = {
    img:imgAvion,
    x:canvas.width*0.05,
    y:canvas.height/2
}

let lose =false
let win =false

let distance = {x:canvas.width*0.25,y:canvas.height-200}



document.addEventListener('keydown',(e)=>onKeyDown(e))

function onKeyDown(e) {
    if(win===false && lose===false) {
        if(e.keyCode===39) {
             Translation('right')
            gestionMusic(e,'right')
           // socket.emit('translation')

        }
        if(e.keyCode===37) {
             Translation('left')
            gestionMusic(e,'left')
            //socket.emit('translation')

        }
    }

}

let varInterval = setInterval(interval, 500)

function interval() {
    refreshCanvas(0,15)

    if(hasCollision()) {
        gameOver()
    }
}

navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
    return document.getElementById('webcam').srcObject=stream
  }).catch(function(err) {
  });
document.addEventListener('resize',()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
})*
document.addEventListener('DOMContentLoaded', () => {
    gameLoop() 
})

function gameLoop() {
    if(win===false && lose===false) {
        background.onload = ()=>{
            ctx.drawImage(background,0,0,canvas.width,canvas.height)
        } 
        avion.onload = function (){
            ctx.drawImage(avion.img, canvas.width*0.5, canvas.height-100,this.naturalWidth/4,this.naturalHeight/4);
            ctx.drawImage(avion.img, canvas.width*0.25, 100,this.naturalWidth/4,this.naturalHeight/4);
            ctx.drawImage(avion.img, canvas.width*0.75, 100,this.naturalWidth/4,this.naturalHeight/4);
        }
    
    }
}

function refreshCanvas(nbDirectionAvion,avancementEnnemies) {
    ctx.clearRect(0,0,canvas.width,canvas.height)

    ctx.drawImage(background,0,0,canvas.width,canvas.height)

    for(const ennemy in ennemies) {
            ctx.drawImage(avion.img,ennemies[ennemy].x-=avancementEnnemies,ennemies[ennemy].y,avion.img.naturalWidth/8,avion.img.naturalHeight/8)
        
    }
        ctx.drawImage(avion.img,avion.x+=Math.abs(nbDirectionAvion),avion.y+=nbDirectionAvion,avion.img.naturalWidth/8,avion.img.naturalHeight/8)

    
}



function isWin()  {
    if(avion.x>canvas.width*0.85) {
        win=true
        return true
    }
    return false
}

function Win() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    clearInterval(varInterval)
    background.src='./assets/avion.jpg'
    ctx.drawImage(background,0,0,canvas.width,canvas.height)
    osc.stop
}



function hasCollision() {
    for(const ennemy in ennemies) {
        if(rectIntersect(ennemies[ennemy],avion)) {
            lose=true
            return true
        }
    
    }
    return false
}

function rectIntersect(a,b) {
    return a.x + a.img.naturalWidth/8 > b.x &&
          a.x < b.x + b.img.naturalWidth/8 && 
          a.y + a.img.naturalHeight/8 > b.y &&
          a.y < b.y + b.img.naturalHeight/8
}

function gameOver() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    clearInterval(varInterval)
    osc.stop()
} 



let distortionCurveNb = 400
function gestionMusic(e,action) {
    const distortion = soundCtx.createWaveShaper()


    
    function makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
        for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        }
        return curve;
    };
    
    
    distortion.oversample = '4x';

    if(action==='left') {
        //  osc.frequency.value -=1
    /*    distortionCurveNb -= 15
        distortion.curve = makeDistortionCurve(distortionCurveNb-15); */
         
         biquadFilter.type = 'lowshelf'
        biquadFilter.frequency.setValueAtTime(distortionCurveNb+15, soundCtx.currentTime)

    } else if(action==='right') {
        // osc.frequency.value +=1
         distortionCurveNb += 15
         distortion.curve = makeDistortionCurve(distortionCurveNb+15); 
    } 

}

function distanceEnnemies() {
    const moreDistance={x:100000,y:100000}
    for(const ennemy in ennemies) {
        const disty = Math.abs(ennemies[ennemy].y-avion.y)
        const distx = Math.abs(ennemies[ennemy].x-avion.x)
        if(moreDistance.y > Math.abs(ennemies[ennemy].y-avion.y)) {
            moreDistance.y = disty
        }
        if(moreDistance.x > Math.abs(ennemies[ennemy].x-avion.x)) {
            moreDistance.x = distx
        }
    }
    distance = moreDistance
    soundWithDistance()
}

function soundWithDistance() {
    const distRel = 100 - ((distance.x +distance.y)/10)
    if(distRel>70) {
        biquadFilter.gain.setValueAtTime(70,soundCtx.currentTime)
    } else if(distRel>60) {
        biquadFilter.gain.setValueAtTime(60,soundCtx.currentTime)
    }else if(distRel>50) {
        biquadFilter.gain.setValueAtTime(30,soundCtx.currentTime)
    }else if(distRel>40) {
        biquadFilter.gain.setValueAtTime(10,soundCtx.currentTime)
    }else if(distRel>30) {
        biquadFilter.gain.setValueAtTime(5,soundCtx.currentTime)
    }
}



function Translation(direction,mine=true) {
    let nbDirection=0

    if(direction==='left') {
        if(avion.y<canvas.height*0.05) {
            nbDirection =0
        } else {
            nbDirection=-15
            mine && socket.emit('translation',{x:15,y:-15})
        }
    } else if(direction==='right') {
        if(avion.y>canvas.height*0.83) {
            nbDirection =0
        } else {
            nbDirection=15
            mine && socket.emit('translation',{x:15,y:15})
        }
    }
    refreshCanvas(nbDirection,0)
    console.log(nbDirection);
    distanceEnnemies()

    if(hasCollision()) {
        gameOver()
    }
    if(isWin()) {
        Win()
    }
}

});
