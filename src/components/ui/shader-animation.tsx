"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type ShaderAnimationProps = {
  intensity?: number;
  speed?: number;
  className?: string;
};

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float waveX = sin((uv.x + uTime * 0.15) * 8.0) * uIntensity * 0.18;
    float waveY = cos((uv.y - uTime * 0.2) * 10.0) * uIntensity * 0.16;
    pos.z += waveX + waveY;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;

  float rippleAt(vec2 uv, vec2 center, float freq, float speed) {
    float d = length(uv - center);
    return sin(d * freq - uTime * speed);
  }

  vec3 palette(float t) {
    // Lavender palette: #F4EEFF #DCD6F7 #A6B1E1 #424874
    vec3 a = vec3(0.78, 0.76, 0.88);
    vec3 b = vec3(0.22, 0.20, 0.30);
    vec3 c = vec3(0.95, 0.92, 0.88);
    vec3 d = vec3(0.16, 0.34, 0.62);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float len = length(uv);
    float wave = sin((uv.x + uv.y) * 4.0 + uTime * 0.8);

    // Two ripple sources for layered pulses
    float ripplePrimary = rippleAt(uv, vec2(0.0, 0.0), 12.0, 1.2);
    float rippleOffset = rippleAt(uv, vec2(0.28, 0.16), 11.0, 1.05);
    float ripple = (ripplePrimary * 0.65 + rippleOffset * 0.55) * uIntensity;

    float pulse = 0.5 + 0.5 * sin(uTime * 0.5);
    float flux = wave * 0.25 + ripple * 0.65 + pulse * 0.2;

    vec3 color = palette(flux);
    color = mix(color, vec3(0.96, 0.93, 0.99), 0.18);
    float vignette = smoothstep(0.78, 0.28, len);
    gl_FragColor = vec4(color, vignette * 0.95);
  }
`;

export function ShaderAnimation({
  intensity = 0.55,
  speed = 0.75,
  className,
}: ShaderAnimationProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;

    // ✅ POLISH 1: ensure canvas behaves like a background layer
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(9, 9, 256, 256);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
      },
      fragmentShader,
      vertexShader,
      transparent: true,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.z = Math.PI * 0.03;
    scene.add(mesh);

    const clock = new THREE.Clock();

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // ✅ POLISH 2: keep pixel ratio in sync (cap optional)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // ✅ IMPORTANT: allow Three to update the canvas CSS size too
      renderer.setSize(width, height);
    };

    // ✅ POLISH 3: watch the container itself (better than window resize)
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    const animate = () => {
      const delta = clock.getDelta();
      material.uniforms.uTime.value += delta * speed * 1.2;
      mesh.rotation.z += 0.0004;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      ro.disconnect(); // ✅ cleanup observer

      scene.traverse((object) => {
        if ((object as THREE.Mesh).geometry) (object as THREE.Mesh).geometry.dispose();
        const mat = (object as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [intensity, speed]);

  return <div ref={mountRef} className={cn("h-full w-full", className)} />;
}
