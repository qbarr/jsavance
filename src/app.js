import GG from './parts/gg.js'
/* export default function() {
    return <div></div>
} */
const canvas = document.getElementById('canvas')
canvas.width=window.innerWidth
canvas.height=window.innerHeight
const ctx = canvas.getContext('2d')


navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
    return document.getElementById('webcam').srcObject=stream
  }).catch(function(err) {
    /* handle the error */
  });
document.addEventListener('resize',()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
})*
document.addEventListener('DOMContentLoaded', () => {
    gameLoop() 
})

function gameLoop() {
    ctx.fillStyle='blue'
    ctx.fillRect(10, 10, 100, 100);
    window.onload = function (){
        const image = document.getElementById('source')
        ctx.drawImage(source, 10, 30);
    }
}



  
  