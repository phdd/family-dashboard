<script setup lang="ts">
useHead({
  title: 'Mandala'
})

const colors = [
  "#B85C5C", // Vibrantes dunkles Pastell-Pink
  "#B87B5C", // Vibrantes dunkles Pastell-Pfirsich
  "#B8B05C", // Vibrantes dunkles Pastell-Gelb
  "#5CB85C", // Vibrantes dunkles Pastell-Minzgrün
  "#5C8BB8", // Vibrantes dunkles Pastell-Blau
  "#8C5CB8", // Vibrantes dunkles Pastell-Lavendel
  "#B85CB8", // Vibrantes dunkles Pastell-Lila
  "#B85C8C", // Vibrantes dunkles Pastell-Koralle
  "#5CB8B8", // Vibrantes dunkles Pastell-Türkis
  "#8CB85C", // Vibrantes dunkles Pastell-Limette
  "#B89C5C", // Vibrantes dunkles Pastell-Orange
  "#B87CB8", // Vibrantes dunkles Pastell-Magenta
  "#5C9CB8", // Vibrantes dunkles Pastell-Cyan
  "#8C7B5C", // Vibrantes dunkles Pastell-Braun
  "#8C8C8C", // Vibrantes dunkles Pastell-Grau
  "#5CB8A0"  // Vibrantes dunkles Pastell-Aqua
];

const selectedColor = ref('#acacff')
const lineWidth = ref(5)
const slices = ref(4)

const resetMandala = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

onMounted(() => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Dynamische Breite/Höhe setzen
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width
  canvas.height = height

  const center = { x: width / 2, y: height / 2 }
  const radius = (Math.min(width, height) / 2) - 10
  let prevX = 0, currX = 0, prevY = 0, currY = 0
  let drawing = false, dot_flag = false

  const d2r = (deg: number) => deg * Math.PI / 180

  const getPointOnCircle = (deg: number, center: {x: number, y: number}, radius: number) => {
    const rad = d2r(deg)
    const x = center.x + radius * Math.cos(rad)
    const y = center.y + radius * Math.sin(rad)
    return { x, y }
  }

  const lineStroke = (start: {x: number, y: number}, end: {x: number, y: number}, width: number, color: string) => {
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
  }

  const rotate = (p1: {x: number, y: number}, p2: {x: number, y: number}, a: number) => {
    a = d2r(a)
    const xr = (p1.x - p2.x) * Math.cos(a) - (p1.y - p2.y) * Math.sin(a) + p2.x
    const yr = (p1.x - p2.x) * Math.sin(a) + (p1.y - p2.y) * Math.cos(a) + p2.y
    return { x: xr, y: yr }
  }

  // Zeichnet die Hauptlinie und ihre rotierenden Kopien
  const draw = () => {
    // Hauptlinie zeichnen
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currX, currY)
    ctx.strokeStyle = selectedColor.value
    ctx.lineWidth = lineWidth.value
    ctx.stroke()
    ctx.closePath()

    // Berechne den Rotationswinkel anhand der aktuellen Segmente
    const angleStep = 360 / slices.value
    for (let i = 1; i < slices.value; i++) {
      const angle = i * angleStep
      const rP = rotate({ x: prevX, y: prevY }, center, angle)
      const rC = rotate({ x: currX, y: currY }, center, angle)
      lineStroke(rP, rC, lineWidth.value, selectedColor.value)
    }
  }

  // Zeichnet einen Punkt und seine rotierenden Kopien
  const drawDot = () => {
    ctx.beginPath()
    ctx.fillStyle = selectedColor.value
    ctx.fillRect(currX, currY, lineWidth.value, lineWidth.value)
    ctx.closePath()

    const angleStep = 360 / slices.value
    for (let i = 1; i < slices.value; i++) {
      const angle = i * angleStep
      const rotated = rotate({ x: currX, y: currY }, center, angle)
      ctx.beginPath()
      ctx.fillStyle = selectedColor.value
      ctx.fillRect(rotated.x, rotated.y, lineWidth.value, lineWidth.value)
      ctx.closePath()
    }
  }

  const findxy = (res: string, e: MouseEvent) => {
    if (res === 'down') {
      prevX = currX
      prevY = currY
      currX = e.clientX - canvas.offsetLeft
      currY = e.clientY - canvas.offsetTop

      drawing = true
      dot_flag = true
      if (dot_flag) {
        drawDot()
        dot_flag = false
      }
    }
    if (res === 'up' || res === 'out') {
      drawing = false
    }
    if (res === 'move' && drawing) {
      prevX = currX
      prevY = currY
      currX = e.clientX - canvas.offsetLeft
      currY = e.clientY - canvas.offsetTop
      draw()
    }
  }

  // Initialisierung: weißen Hintergrund setzen
  const init = () => {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
  }

  // Event-Listener hinzufügen
  canvas.addEventListener("mousedown", (e) => findxy('down', e), false)
  canvas.addEventListener("mousemove", (e) => findxy('move', e), false)
  canvas.addEventListener("mouseup", (e) => findxy('up', e), false)
  canvas.addEventListener("mouseout", (e) => findxy('out', e), false)

  init()
})
</script>

<template>
  <ion-page>
    <ion-content class="ion-no-padding">
      <ion-grid class="h-full">
        <ion-row class="h-full">
          <!-- Hauptbereich: Canvas -->
          <ion-col size="9" class="p-0">
            <canvas id="canvas" class="block w-full h-full"></canvas>
          </ion-col>
          <!-- Sidebar: Steuerung -->
          <ion-col size="3" class="ion-padding">
            <ion-list lines="none">
              <ion-item class="pb-4">
                <ion-grid>
                  <ion-row>
                    <ion-col size="3" v-for="color in colors" :key="color">
                      <ion-button
                        size="large"
                        :style="{ '--background': color, '--box-shadow': 'none' }"
                        @click="selectedColor = color"
                        fill="solid">
                        <ion-icon
                          v-if="selectedColor === color"
                          slot="icon-only"
                          :icon="ioniconsCheckmarkOutline">
                        </ion-icon>
                        <ion-icon
                          v-else
                          slot="icon-only">
                        </ion-icon>
                      </ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-item>
              <ion-item class="pb-4">
                <ion-label>Stärke</ion-label>
                <ion-range min="1" max="20" step="1" color="primary" v-model="lineWidth"></ion-range>
              </ion-item>
              <ion-item class="pb-4">
                <ion-label>Segmente</ion-label>
                <ion-range min="2" max="16" step="1" color="primary" v-model="slices">
                  <ion-icon slot="start" name="remove-circle-outline"></ion-icon>
                  <ion-icon slot="end" name="add-circle-outline"></ion-icon>
                </ion-range>
              </ion-item>
              <ion-item>
                <ion-button expand="block" @click="resetMandala" fill="clear" size="medium" class="w-full">
                  <ion-icon slot="start" :icon="ioniconsRefreshOutline"></ion-icon>
                  Neu anfangen
                </ion-button>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
