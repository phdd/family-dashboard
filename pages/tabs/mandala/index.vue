<script setup lang="ts">
import { onMounted } from 'vue'
useHead({
  title: 'Mandala'
})

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
  let flag = false, dot_flag = false
  let drawColor = '#acacff'
  const drawLineWidth = 1
  const lineColorTransparent = 'rgba(120, 120, 120, 0.3)'
  const slices = 24
  const _angle = 360 / slices
  let _start = 0

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

  const draw = () => {
    // Hauptlinie zeichnen
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currX, currY)
    ctx.strokeStyle = drawColor
    ctx.lineWidth = drawLineWidth
    ctx.stroke()
    ctx.closePath()

    _start = 0
    // Kopien zeichnen
    for (let i = 0; i < slices - 1; i++) {
      _start += _angle
      const rP = rotate({ x: prevX, y: prevY }, center, _start)
      const rC = rotate({ x: currX, y: currY }, center, _start)
      lineStroke(rP, rC, drawLineWidth, drawColor)
    }
  }

  const drawDot = () => {
    ctx.beginPath()
    ctx.fillStyle = drawColor
    ctx.fillRect(currX, currY, drawLineWidth, drawLineWidth)
    ctx.closePath()

    _start = 0
    for (let i = 0; i < slices - 1; i++) {
      _start += _angle
      const rotated = rotate({ x: currX, y: currY }, center, _start)
      ctx.beginPath()
      ctx.fillStyle = drawColor
      ctx.fillRect(rotated.x, rotated.y, drawLineWidth, drawLineWidth)
      ctx.closePath()
    }
  }

  const findxy = (res: string, e: MouseEvent) => {
    if (res === 'down') {
      prevX = currX
      prevY = currY
      currX = e.clientX - canvas.offsetLeft
      currY = e.clientY - canvas.offsetTop

      flag = true
      dot_flag = true
      if (dot_flag) {
        drawDot()
        dot_flag = false
      }
    }
    if (res === 'up' || res === 'out') {
      flag = false
    }
    if (res === 'move' && flag) {
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
  canvas.addEventListener("mousemove", (e) => findxy('move', e), false)
  canvas.addEventListener("mousedown", (e) => findxy('down', e), false)
  canvas.addEventListener("mouseup", (e) => findxy('up', e), false)
  canvas.addEventListener("mouseout", (e) => findxy('out', e), false)

  init()
});

const colors = [
  "#FFB3BA", // Pastell-Pink
  "#FFDFBA", // Pastell-Pfirsich
  "#FFFFBA", // Pastell-Gelb
  "#BAFFC9", // Pastell-Mint
  "#BAE1FF", // Pastell-Blau
  "#CDB4DB", // Pastell-Lavendel
  "#D5A6BD", // Pastell-Lila
  "#FF9AA2", // Pastell-Koralle
  "#B2EBF2", // Pastell-Türkis
  "#CCFF90", // Pastell-Limette
  "#FFD1A9", // Pastell-Orange
  "#FFB2FF", // Pastell-Magenta
  "#A2D2FF", // Pastell-Cyan
  "#CFC3A7", // Pastell-Braun
  "#D3D3D3", // Pastell-Grau
  "#A0E7E5"  // Pastell-Aqua
];


const selectedColor = ref('#acacff');
const slices = ref(12);
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
            <ion-item>
              <ion-label>Stärke</ion-label>
              <ion-range min="0" max="100" step="1" color="primary" value="50"></ion-range>
            </ion-item>
            <ion-item>
              <ion-label>Segmente</ion-label>
              <ion-range min="2" max="16" step="1" value="24" @ionChange="slices = $event.detail.value">
                <ion-icon slot="start" name="remove-circle-outline"></ion-icon>
                <ion-icon slot="end" name="add-circle-outline"></ion-icon>
              </ion-range>
            </ion-item>
            <ion-item>
              <!-- <ion-label>Farbe</ion-label> -->
              <ion-grid>
                <ion-row>
                  <ion-col size="3" v-for="color in colors" :key="color">
                    <ion-button size="large" :style="{'--background': color, '--box-shadow': 0}" @click="selectedColor = color" elevation="0">
                      <ion-icon slot="icon-only" :icon="ioniconsCheckmarkOutline" v-if="selectedColor === color"></ion-icon>
                      <ion-icon slot="icon-only" v-else></ion-icon>
                    </ion-button>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
            <ion-item>
              <ion-button expand="block" @click="" fill="clear" size="medium" class="w-full">
                <ion-icon slot="start" :icon="ioniconsRefreshOutline"></ion-icon>
                Neu anfangen
              </ion-button>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
