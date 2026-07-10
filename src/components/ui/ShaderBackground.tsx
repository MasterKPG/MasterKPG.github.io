import { useEffect, useRef } from 'react'
import { useTheme } from '@/lib/theme'

/**
 * WebGL aurora shader background.
 * Adapted from 21st.dev "Shader Animation" (Scottclayton3d) — retuned to the
 * site's aurora palette, theme-aware brightness, capped DPR for perf.
 */
export function ShaderBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const vertexSrc = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `

    const fragmentSrc = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_light; // 0 = dark theme, 1 = light theme

      // Aurora palette: cyan → blue → violet → magenta
      vec3 palette(float t) {
        vec3 a = vec3(0.35, 0.42, 0.62);
        vec3 b = vec3(0.45, 0.38, 0.52);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.55, 0.72, 0.95);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 uv0 = uv;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;

        float d = length(uv);
        vec3 col = vec3(0.0);

        for (float i = 0.0; i < 3.0; i++) {
          uv = fract(uv * 1.4) - 0.5;
          d = length(uv) * exp(-length(uv0));
          vec3 color = palette(length(uv0) + i * 0.35 + u_time * 0.02);
          d = sin(d * 5.0 + u_time * 0.35) / 32.0;
          d = pow(0.004 / abs(d), 1.25);

          vec2 mouseEffect = u_mouse - uv0;
          float mouseDist = length(mouseEffect);
          d *= 1.0 + sin(mouseDist * 8.0 - u_time * 1.5) * 0.12;

          col += color * d;
        }

        // Dark theme: deep void base; light theme: pale porcelain wash
        vec3 darkBase = vec3(0.024, 0.024, 0.06);
        vec3 lightBase = vec3(0.965, 0.968, 0.985);
        col = mix(darkBase + col * 0.55, lightBase - col * 0.18, u_light);

        gl_FragColor = vec4(col, 1.0);
      }
    `

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type)!
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compile(gl.VERTEX_SHADER, vertexSrc)
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSrc)
    if (!vs || !fs) return

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(program, 'a_position')
    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uLight = gl.getUniformLocation(program, 'u_light')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouse)

    let raf = 0
    let lightMix = themeRef.current === 'light' ? 1 : 0
    const start = performance.now()

    const render = () => {
      const t = (performance.now() - start) * 0.001
      // Ease theme transition inside the shader itself
      const target = themeRef.current === 'light' ? 1 : 0
      lightMix += (target - lightMix) * 0.05

      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(aPosition)
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, reduceMotion ? 0 : t)
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
      gl.uniform1f(uLight, lightMix)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden="true" />
}
