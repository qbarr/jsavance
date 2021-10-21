export default function() {
  
    const BaseAudioContext = window.AudioContext || window.webkitAudioContext
    const soundCtx = new BaseAudioContext()
    const biquadFilter = soundCtx.createBiquadFilter()

    biquadFilter.type = 'lowshelf'
    biquadFilter.frequency.setValueAtTime(480, soundCtx.currentTime)
    biquadFilter.gain.setValueAtTime(0, soundCtx.currentTime)
    const osc = soundCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 430
    osc.connect(biquadFilter)
 
    const amp = soundCtx.createGain()
    amp.gain.setValueAtTime(1, soundCtx.currentTime)
  
  /*   let lfo = soundCtx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 4 */
  
/*     lfo.connect(amp.gain)
 */    biquadFilter.connect(soundCtx.destination)
    // lfo.start()
    osc.start()

   

    return [soundCtx,biquadFilter,osc]

  }
  
  