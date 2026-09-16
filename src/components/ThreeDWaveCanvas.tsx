import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
}

export const ThreeDWaveCanvas: React.FC<Props> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Wave Mesh Plane
    const width = 16;
    const depth = 16;
    const segmentsX = 40;
    const segmentsY = 40;
    const planeGeo = new THREE.PlaneGeometry(width, depth, segmentsX, segmentsY);
    planeGeo.rotateX(-Math.PI / 2);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const waveMesh = new THREE.Mesh(planeGeo, wireMat);
    scene.add(waveMesh);

    // Floating Points on top of vertices
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.5
    });
    const wavePoints = new THREE.Points(planeGeo, pointsMat);
    scene.add(wavePoints);

    // Pointer Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = ((e.clientX / innerWidth) * 2 - 1) * 0.8;
      mouseY = -((e.clientY / innerHeight) * 2 - 1) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const posAttr = planeGeo.attributes.position as THREE.BufferAttribute;
    const count = posAttr.count;
    const basePositions = posAttr.array.slice() as Float32Array;

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const currentPos = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const x = basePositions[i * 3];
        const z = basePositions[i * 3 + 2];

        // Multi-frequency undulating cyber ripple
        const d = Math.sqrt(x * x + z * z);
        const y =
          Math.sin(x * 0.6 + t * 1.5) * 0.35 +
          Math.cos(z * 0.5 + t * 1.2) * 0.35 +
          Math.sin(d * 0.8 - t * 2.0) * 0.25;

        currentPos[i * 3 + 1] = y;
      }
      posAttr.needsUpdate = true;

      // Subtle camera tilt with mouse
      camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.04;
      camera.position.y += (4.2 + mouseY * 1.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      planeGeo.dispose();
      wireMat.dispose();
      pointsMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
