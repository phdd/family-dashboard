<script setup lang="ts">
import { useVibrate } from '@vueuse/core';
import { onMounted } from 'vue'
useHead({
  title: 'Kalender'
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
})
</script>

<template>
  <ion-page>
    <ion-content>
      <canvas id="canvas" class="block w-full h-full"></canvas>
    </ion-content>
    <ion-footer class="">
      <ion-toolbar>
        <ion-buttons slot="start" class="w-96 px-4">
          <ion-range min="0" max="100" step="1" color="primary" value="50" label="Dicke">
            <ion-icon slot="start" :icon="ioniconsRemoveCircleOutline" class="w-6 h-6" />
            <ion-icon slot="end" :icon="ioniconsAddCircleOutline" class="w-6 h-6" />
          </ion-range>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only"
              :icon="ioniconsRefreshOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
