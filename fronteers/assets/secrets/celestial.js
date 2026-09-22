import * as THREE from 'three'

/* Set to false to keep the original <picture> element. */
const use3dSun = false

/* Tweak these hex values to recolor the sun. */

class CreateCelestial {
  constructor(options) {
    this.container = options.container
    this.discRatio = 0.87
    this.sunRotationSpeed = 0.1
    this.maxPixelRatio = 2
    this.sunColors = {
      dark: '#A92402',
      mid: '#E55A01',
      bright: '#FDD002',
      highlight: '#FEFFFD',
      rim: '#FFEF7F',
      glowInner: '#EA6603',
      glowOuter: '#ffcc00'
    }

    this.sunColor = Object.fromEntries(
      Object.entries(this.sunColors).map(([key, hex]) => [key, this.hexToVec3(hex)])
    )

    this.noise = /* glsl */ `
      float hash31(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float valueNoise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(
            mix(hash31(i + vec3(0.0, 0.0, 0.0)), hash31(i + vec3(1.0, 0.0, 0.0)), f.x),
            mix(hash31(i + vec3(0.0, 1.0, 0.0)), hash31(i + vec3(1.0, 1.0, 0.0)), f.x),
            f.y
          ),
          mix(
            mix(hash31(i + vec3(0.0, 0.0, 1.0)), hash31(i + vec3(1.0, 0.0, 1.0)), f.x),
            mix(hash31(i + vec3(0.0, 1.0, 1.0)), hash31(i + vec3(1.0, 1.0, 1.0)), f.x),
            f.y
          ),
          f.z
        );
      }

      float fbm(vec3 p) {
        float sum = 0.0;
        float amplitude = 0.5;

        for (int i = 0; i < 5; i++) {
          sum += valueNoise(p) * amplitude;
          p *= 2.02;
          amplitude *= 0.5;
        }

        return sum;
      }
    `

    this.sunVertexShader = /* glsl */ `
      varying vec3 vObjectPosition;
      varying vec3 vViewNormal;

      void main() {
        vObjectPosition = position;
        vViewNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    this.sunFragmentShader = /* glsl */ `
      uniform float uTime;

      varying vec3 vObjectPosition;
      varying vec3 vViewNormal;

      ${this.noise}

      void main() {
        vec3 p = normalize(vObjectPosition);

        float granulation = fbm(p * 5.0 + vec3(0.0, uTime * 0.03, 0.0));
        float filaments = fbm(p * 17.0 + granulation * 2.0 - vec3(uTime * 0.02));
        float heat = granulation * 0.62 + filaments * 0.38;
        float pulse = sin(uTime * 0.5) * 0.03 + 0.03;

        vec3 color = mix(${this.sunColor.dark}, ${this.sunColor.mid}, smoothstep(0.3, 0.55, heat + pulse));
        color = mix(color, ${this.sunColor.bright}, smoothstep(0.5, 0.72, heat + pulse));
        color = mix(color, ${this.sunColor.highlight}, smoothstep(0.7, 0.88, heat + pulse + 0.04));

        float rim = 1.0 - abs(dot(vViewNormal, vec3(0.0, 0.0, 1.0)));
        color += ${this.sunColor.rim} * pow(rim, 3.0) * 0.9;

        gl_FragColor = vec4(color, 1.0);
      }
    `
    this.glowVertexShader = /* glsl */ `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    this.glowFragmentShader = /* glsl */ `
      uniform float uTime;
      uniform float uExtent;

      varying vec2 vUv;

      ${this.noise}

      void main() {
        vec2 p = (vUv - 0.5) * 2.0 * uExtent;
        float radius = length(p);

        float glow = pow(smoothstep(uExtent, 0.94, radius), 2.4);
        float rays = 0.72 + 0.28 * fbm(vec3(normalize(p) * 3.5, uTime * 0.04));

        vec3 color = mix(${this.sunColor.glowInner}, ${this.sunColor.glowOuter}, smoothstep(0.95, uExtent, radius));

        gl_FragColor = vec4(color, glow * rays * 0.8);
      }
    `

  }
  hexToVec3(hex) {
    const value = hex.replace('#', '')
    const r = parseInt(value.slice(0, 2), 16) / 255
    const g = parseInt(value.slice(2, 4), 16) / 255
    const b = parseInt(value.slice(4, 6), 16) / 255
    return `vec3(${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)})`
  }
  createSun(container) {
    const canvas = document.createElement('canvas')
    canvas.className = 'celestial-canvas'
    canvas.setAttribute('role', 'img')
    canvas.setAttribute('aria-label', 'The sun')
    this.container.append(canvas)

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    this.renderer.setClearAlpha(0)

    this.scene = new THREE.Scene()
    this.extent = 1 / this.discRatio
    this.camera = new THREE.OrthographicCamera(-this.extent, this.extent, this.extent, -this.extent, 0.1, 10)
    this.camera.position.z = 3

    this.uniforms = { uTime: { value: 0 } }
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.sunVertexShader,
        fragmentShader: this.sunFragmentShader
      })
    )
    this.sphere.rotation.z = 0.18
    this.scene.add(this.sphere)

    this.glow = new THREE.Mesh(
      new THREE.PlaneGeometry(this.extent * 2, this.extent * 2),
      new THREE.ShaderMaterial({
        uniforms: { ...this.uniforms, uExtent: { value: this.extent } },
        vertexShader: this.glowVertexShader,
        fragmentShader: this.glowFragmentShader,
        transparent: true,
        depthWrite: false
      })
    )
    this.glow.position.z = -1.5
    this.scene.add(this.glow)
    return {
      advance: (delta) => {
        this.uniforms.uTime.value += delta
        this.sphere.rotateOnAxis(new THREE.Vector3(-0.15, 0.5, 0), this.sunRotationSpeed * delta)
      },
      render: () => this.renderer.render(this.scene, this.camera)
    }
  }
  resize() {
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    if (!width || !height) return false

    const aspect = width / height
    this.camera.left = -this.extent * Math.max(aspect, 1)
    this.camera.right = this.extent * Math.max(aspect, 1)
    this.camera.top = this.extent / Math.min(aspect, 1)
    this.camera.bottom = -this.extent / Math.min(aspect, 1)
    this.camera.updateProjectionMatrix()

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.maxPixelRatio))
    this.renderer.setSize(width, height, false)

    return true
  }

  isVisible() {
    return this.container.checkVisibility ? this.container.checkVisibility() : getComputedStyle(this.container).display !== 'none'
  }
  start() {
    this.container.classList.add('celestial--3d')

    const sun = this.createSun(this.container)
    let sized = this.resize()
    let dirty = true

    new ResizeObserver(() => {
      sized = this.resize()
      dirty = true
    }).observe(this.container)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const clock = new THREE.Clock()

    const tick = () => {
      requestAnimationFrame(tick)

      const delta = Math.min(clock.getDelta(), 0.1)
      if (document.visibilityState === 'hidden' || !sized || !this.isVisible()) return

      if (!reducedMotion.matches) {
        sun.advance(delta)
        dirty = true
      }

      if (!dirty) return

      sun.render()
      dirty = false
    }

    tick()
  }
}


class CreateStars {
  constructor() {
    this.totalStarCount = 8000
    this.maxPixelRatio = 1.5
    this.drift = 0.012

    this.vertexShader = /* glsl */ `
      attribute float aSize;
      attribute float aPhase;
      attribute float aTwinkle;
      attribute vec3 aColor;

      uniform float uTime;
      uniform float uPixelRatio;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = aColor;

        float flicker = sin(uTime * 1.3 + aPhase);
        vAlpha = mix(0.28, 0.9 + 0.1 * flicker, aTwinkle);

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp(
          aSize * uPixelRatio * (70.0 / -mvPosition.z),
          1.0,
          3.25 * uPixelRatio
        );
        gl_Position = projectionMatrix * mvPosition;
      }
    `

    this.fragmentShader = /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        float alpha = smoothstep(0.5, 0.12, dist) * vAlpha;
        gl_FragColor = vec4(vColor, alpha);
      }
    `
  }

  createField() {
    const canvas = document.createElement('canvas')
    canvas.className = 'stars-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    document.body.prepend(canvas)

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false
    })
    this.renderer.setClearAlpha(0)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, 400)

    const count = this.totalStarCount
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const twinkles = new Float32Array(count)
    const color = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const radius = 28 + Math.random() * 90
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const bright = Math.random() > 0.94
      sizes[i] = bright ? 1.6 + Math.random() * 2.4 : 0.55 + Math.random() * 0.9
      phases[i] = Math.random() * Math.PI * 2
      twinkles[i] = bright ? 1 : 0

      const roll = Math.random()
      if (roll > 0.96) color.set('#FFE7A0')
      else if (roll > 0.88) color.set('#D7E3FF')
      else color.set('#F5F7FF')

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geometry.setAttribute('aTwinkle', new THREE.BufferAttribute(twinkles, 1))

    this.uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 }
    }

    this.points = new THREE.Points(
      geometry,
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false
      })
    )
    this.points.frustumCulled = false
    this.scene.add(this.points)

    return {
      advance: (delta) => {
        this.uniforms.uTime.value += delta
        this.points.rotation.y += this.drift * delta
        this.points.rotation.x = Math.sin(this.uniforms.uTime.value * 0.04) * 0.06
      },
      render: () => this.renderer.render(this.scene, this.camera)
    }
  }

  resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    if (!width || !height) return false

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    const pixelRatio = Math.min(window.devicePixelRatio, this.maxPixelRatio)
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(width, height, false)
    this.uniforms.uPixelRatio.value = pixelRatio
    return true
  }

  isDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  start() {
    const field = this.createField()
    let sized = this.resize()
    let dark = this.isDark()
    let dirty = true

    window.addEventListener('resize', () => {
      sized = this.resize()
      dirty = true
    })

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    colorScheme.addEventListener('change', () => {
      const nextDark = colorScheme.matches
      if (nextDark === dark) return
      dark = nextDark
      dirty = true
    })

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const clock = new THREE.Clock()

    const tick = () => {
      requestAnimationFrame(tick)

      const delta = Math.min(clock.getDelta(), 0.1)
      if (document.visibilityState === 'hidden' || !sized || !dark) return

      if (!reducedMotion.matches) {
        field.advance(delta)
        dirty = true
      }

      if (!dirty) return

      field.render()
      dirty = false
    }

    tick()
  }
}


if (use3dSun) {
  const container = document.querySelector('.page-header-sun')
  if (container) {
    new CreateCelestial({ container }).start()
    new CreateStars().start()
  }
}

