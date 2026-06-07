"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/* ============================================================
   Hero3D — Three.js starfield + coral nebula + atmospheric
   bloom, scoped to the hero container (not a full-page takeover).
   Recolored from the generic blue/pink cosmos to the brand
   ink/paper/coral system. Camera drifts and parallaxes to the
   pointer. Full reduced-motion path (one static frame, no loop).
   ============================================================ */

export function Hero3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let W = wrap.clientWidth || 1;
    let H = wrap.clientHeight || 1;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f14, 0.00045);

    const camera = new THREE.PerspectiveCamera(72, W / H, 0.1, 2000);
    camera.position.set(0, 16, 150);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.62;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.7, 0.5, 0.82);
    composer.addPass(bloom);

    // ---- starfield (3 rotating depth layers) ----
    const starLayers: THREE.Points[] = [];
    const starMats: THREE.ShaderMaterial[] = [];
    for (let layer = 0; layer < 3; layer++) {
      const count = 2600;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const siz = new Float32Array(count);
      const c = new THREE.Color();
      for (let j = 0; j < count; j++) {
        const radius = 220 + Math.random() * 760;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        pos[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[j * 3 + 2] = radius * Math.cos(phi);
        const r = Math.random();
        if (r < 0.72) c.setHSL(0.09, 0.18, 0.82 + Math.random() * 0.18); // warm paper
        else if (r < 0.92) c.setHSL(0.025, 0.85, 0.62); // coral
        else c.setHSL(0.07, 0.4, 0.7); // dim amber
        col[j * 3] = c.r;
        col[j * 3 + 1] = c.g;
        col[j * 3 + 2] = c.b;
        siz[j] = Math.random() * 2 + 0.5;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(siz, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size; attribute vec3 color;
          varying vec3 vColor; uniform float time; uniform float depth;
          void main(){
            vColor = color; vec3 p = position;
            float a = time * 0.04 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
            p.xy = rot * p.xy;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main(){
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float o = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, o);
          }`,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      starLayers.push(pts);
      starMats.push(mat);
    }

    // ---- coral nebula plane ----
    const nebGeo = new THREE.PlaneGeometry(7000, 3600, 80, 80);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x2a0d08) }, // deep ember
        color2: { value: new THREE.Color(0xff553d) }, // coral
        opacity: { value: 0.26 },
      },
      vertexShader: `
        varying vec2 vUv; varying float vE; uniform float time;
        void main(){
          vUv = uv; vec3 p = position;
          float e = sin(p.x*0.01+time)*cos(p.y*0.01+time)*20.0;
          p.z += e; vE = e;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
        }`,
      fragmentShader: `
        uniform vec3 color1; uniform vec3 color2; uniform float opacity; uniform float time;
        varying vec2 vUv; varying float vE;
        void main(){
          float m = sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);
          vec3 col = mix(color1, color2, m*0.5+0.5);
          float a = opacity * (1.0 - length(vUv-0.5)*2.0);
          a *= 1.0 + vE*0.01;
          gl_FragColor = vec4(col, a);
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebGeo, nebMat);
    nebula.position.z = -900;
    scene.add(nebula);

    // ---- coral atmosphere shell ----
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vN;
        void main(){
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      fragmentShader: `
        varying vec3 vN; uniform float time;
        void main(){
          float i = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 2.0);
          vec3 atm = vec3(1.0, 0.33, 0.24) * i;
          atm *= sin(time*2.0)*0.1 + 0.9;
          gl_FragColor = vec4(atm, i*0.22);
        }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(560, 32, 32), atmMat));

    // ---- camera drift + pointer parallax ----
    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let raf = 0;
    let running = true;

    function render(time: number) {
      const t = time * 0.001;
      for (const m of starMats) m.uniforms.time.value = t;
      nebMat.uniforms.time.value = t * 0.5;
      atmMat.uniforms.time.value = t;

      smooth.x += (target.x - smooth.x) * 0.05;
      smooth.y += (target.y - smooth.y) * 0.05;
      camera.position.x = smooth.x * 40 + Math.sin(t * 0.1) * 3;
      camera.position.y = 16 + smooth.y * 24 + Math.cos(t * 0.15) * 2;
      camera.lookAt(0, 8, -200);

      composer.render();
    }

    function loop(time: number) {
      if (!running) return;
      render(time);
      raf = requestAnimationFrame(loop);
    }

    function resize() {
      W = wrap!.clientWidth || 1;
      H = wrap!.clientHeight || 1;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      composer.setSize(W, H);
    }

    const onMove = (e: MouseEvent) => {
      if (reduce) return;
      const r = wrap!.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width - 0.5;
      target.y = -((e.clientY - r.top) / r.height - 0.5);
    };
    const onVis = () => {
      running = !document.hidden && !reduce;
      if (running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      running = false;
      render(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      starLayers.forEach((p) => {
        p.geometry.dispose();
        (p.material as THREE.Material).dispose();
      });
      nebGeo.dispose();
      nebMat.dispose();
      atmMat.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
