import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
}

export const ThreeDContactBeacon: React.FC<Props> = ({ className = '' }) => {
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
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const beaconGroup = new THREE.Group();
    scene.add(beaconGroup);

    // Materials
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.25,
      metalness: 0.9
    });

    const crimsonNeon = new THREE.MeshStandardMaterial({
      color: 0xff2a2a,
      emissive: 0xff1010,
      emissiveIntensity: 1.0,
      roughness: 0.1,
      metalness: 0.5
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // 1. Central Core Diamond / Octahedron
    const coreGeo = new THREE.OctahedronGeometry(0.7, 0);
    const coreMesh = new THREE.Mesh(coreGeo, crimsonNeon);
    beaconGroup.add(coreMesh);

    // Wireframe halo around core
    const coreWireGeo = new THREE.IcosahedronGeometry(0.95, 1);
    const coreWire = new THREE.Mesh(coreWireGeo, wireframeMat);
    beaconGroup.add(coreWire);

    // 2. Gimbal Rings
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.025, 16, 80);
    const ring1 = new THREE.Mesh(ring1Geo, darkMetal);
    ring1.rotation.x = Math.PI / 3;
    beaconGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.75, 0.02, 16, 90);
    const ring2 = new THREE.Mesh(ring2Geo, crimsonNeon);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    beaconGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ring3 = new THREE.Mesh(ring3Geo, darkMetal);
    ring3.rotation.z = Math.PI / 5;
    beaconGroup.add(ring3);

    // 3. Vertical Signal Beam Line
    const beamGeo = new THREE.CylinderGeometry(0.02, 0.02, 3.8, 8);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
      transparent: true,
      opacity: 0.7
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beaconGroup.add(beam);

    // 4. Orbiting Signal Satellites
    const sats: { mesh: THREE.Mesh; angle: number; speed: number; radius: number }[] = [];
    const satGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      beaconGroup.add(sat);
      sats.push({
        mesh: sat,
        angle: (i / 4) * Math.PI * 2,
        speed: 0.8 + i * 0.2,
        radius: 1.45 + (i % 2) * 0.4
      });
    }

    // 5. Surrounding Signal Particles
    const pCount = 90;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 6;
      pPos[i + 1] = (Math.random() - 0.5) * 6;
      pPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xff2a2a,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(0xffffff, 2.0);
    dir.position.set(4, 5, 3);
    scene.add(dir);

    const redLight = new THREE.PointLight(0xff2a2a, 4.0, 10);
    redLight.position.set(0, 0, 0);
    scene.add(redLight);

    // Pointer Drag & Inertia
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;

        beaconGroup.rotation.y += dx * 0.009;
        beaconGroup.rotation.x += dy * 0.009;
        velY = dx * 0.009;
        velX = dy * 0.009;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {
          // release fallback
        }
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        beaconGroup.rotation.x += velX;
        beaconGroup.rotation.y += velY;

        beaconGroup.rotation.y += 0.008;
        beaconGroup.rotation.x = Math.sin(t * 0.4) * 0.1;
      }

      // Internal spins
      coreMesh.rotation.y = t * 0.8;
      coreMesh.rotation.x = t * 0.5;
      coreWire.rotation.y = -t * 0.4;

      ring1.rotation.z = t * 0.4;
      ring2.rotation.z = -t * 0.35;
      ring3.rotation.y = t * 0.25;

      // Pulse core
      const pulse = 1 + Math.sin(t * 3) * 0.1;
      coreMesh.scale.setScalar(pulse);

      // Orbit satellites
      sats.forEach((s) => {
        const curAngle = s.angle + t * s.speed;
        s.mesh.position.x = Math.cos(curAngle) * s.radius;
        s.mesh.position.z = Math.sin(curAngle) * s.radius;
        s.mesh.position.y = Math.sin(t * 2 + s.angle) * 0.3;
      });

      particles.rotation.y = t * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      [coreGeo, coreWireGeo, ring1Geo, ring2Geo, ring3Geo, beamGeo, satGeo, pGeo].forEach((g) =>
        g.dispose()
      );
      [darkMetal, crimsonNeon, wireframeMat, beamMat, satMat, pMat].forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}
      aria-label="3D Interactive Communication Beacon"
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-400 bg-black/70 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] animate-ping" />
        <span>3D SIGNAL BEACON • DRAG TO SPIN</span>
      </div>
    </div>
  );
};
