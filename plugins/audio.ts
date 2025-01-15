export default defineNuxtPlugin((nuxtApp) => {
    // Initialize AudioContext only after user interaction
    let audioInitialized = false
    
    const initAudioContext = () => {
        if (audioInitialized) return
        // @ts-expect-error webkitAudioContext is not in the types
        const AudioContext = window.AudioContext || window.webkitAudioContext
        const audioContext = new AudioContext()
        audioContext.resume()
        audioInitialized = true
        console.log('AudioContext started')
    }
    
    document.addEventListener('click', initAudioContext, { once: true })
    document.addEventListener('touchstart', initAudioContext, { once: true })
});