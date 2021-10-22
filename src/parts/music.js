export default function() {
  
    const BaseAudioContext = window.AudioContext || window.webkitAudioContext
    const soundCtx = new BaseAudioContext()

    const osc = soundCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 350 
 
    const amp = soundCtx.createGain()
    amp.gain.setValueAtTime(1, soundCtx.currentTime)
  
     let lfo = soundCtx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 2
  
    
    lfo.connect(amp.gain)
    osc.connect(amp).connect(soundCtx.destination)
    lfo.start()
    osc.start()
   

    return [soundCtx,osc,lfo]

  }
  
  