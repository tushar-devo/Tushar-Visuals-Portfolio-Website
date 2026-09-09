import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
  interactive?: boolean;
}

export const ThreeDHeroCanvas: React.FC<Props> = ({ className = '', interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Center Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- MATERIALS ---
    // Ultra-glossy obsidian metallic black
    const metallicBlack = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.12,
      metalness: 0.95,
      wireframe: false
    });

    // Dark brushed metal
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.25,
      metalness: 0.85
    });

    // Crimson Red Emissive Accent (#FF2A2A)
    const redEmissive = new THREE.MeshStandardMaterial({
      color: 0xff2a2a,
      emissive: 0xff1010,
      emissiveIntensity: 0.85,
      roughness: 0.1,
      metalness: 0.3
    });

    // Wireframe accent for architectural drafting feel
    const wireframeAccent = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });

    // --- 3D MONOGRAM "T" SCULPTURE ---
    const tGroup = new THREE.Group();

    // 1. Horizontal crossbar of 'T'
    const topBarGeo = new THREE.BoxGeometry(2.4, 0.45, 0.7);
    const topBar = new THREE.Mesh(topBarGeo, metallicBlack);
    topBar.position.y = 1.0;
    tGroup.add(topBar);

    // Subtle red laser slice along top bar
    const topLaserGeo = new THREE.BoxGeometry(2.42, 0.05, 0.72);
    const topLaser = new THREE.Mesh(topLaserGeo, redEmissive);
    topLaser.position.y = 0.8;
    tGroup.add(topLaser);

    // 2. Vertical stem of 'T'
    const stemGeo = new THREE.BoxGeometry(0.58, 2.1, 0.68);
    const stem = new THREE.Mesh(stemGeo, metallicBlack);
    stem.position.y = -0.2;
    tGroup.add(stem);

    // Vertical red light rib
    const stemLaserGeo = new THREE.BoxGeometry(0.06, 2.12, 0.7);
    const stemLaser = new THREE.Mesh(stemLaserGeo, redEmissive);
    stemLaser.position.set(0.28, -0.2, 0);
    tGroup.add(stemLaser);

    // 3. Architectural faceted plinth / base
    const baseGeo = new THREE.CylinderGeometry(0.9, 1.2, 0.25, 8);
    const baseMesh = new THREE.Mesh(baseGeo, darkMetal);
    baseMesh.position.y = -1.35;
    tGroup.add(baseMesh);

    // Floating wireframe bounding cage around the 'T'
    const cageGeo = new THREE.BoxGeometry(2.7, 2.8, 1.3);
    const cageMesh = new THREE.Mesh(cageGeo, wireframeAccent);
    cageMesh.position.y = 0.05;
    tGroup.add(cageMesh);

    mainGroup.add(tGroup);

    // --- ORBITAL RINGS & SATELLITES ---
    const ringGroup = new THREE.Group();

    // Ring 1 - inclined torus
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x404040,
      roughness: 0.2,
      metalness: 0.8
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2 - wider tilted ring with red accent bead
    const ring2Geo = new THREE.TorusGeometry(2.6, 0.015, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x303030,
      roughness: 0.3,
      metalness: 0.9
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // Floating satellite geometric crystals
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.18, 0);
    for (let i = 0; i < 4; i++) {
      const isRed = i % 2 === 0;
      const sat = new THREE.Mesh(satGeo, isRed ? redEmissive : metallicBlack);
      const angle = (i / 4) * Math.PI * 2;
      const radius = 2.1 + (i % 2) * 0.4;
      sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * 0.8, Math.sin(angle) * radius);
      ringGroup.add(sat);
      satellites.push(sat);
    }

    mainGroup.add(ringGroup);

    // --- BACKGROUND FLOATING PARTICLES ---
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cWhite = new THREE.Color(0xffffff);
    const cRed = new THREE.Color(0xff2a2a);
    const cDark = new THREE.Color(0x555555);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 12;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 10;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 8 - 1;

      // Color choice: 15% red, 35% white, 50% subtle gray
      const rand = Math.random();
      const color = rand > 0.85 ? cRed : rand > 0.5 ? cWhite : cDark;
      particleColors[idx] = color.r;
      particleColors[idx + 1] = color.g;
      particleColors[idx + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- LIGHTING ---
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Key Light - White rim light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    // Fill Light - Soft cool white
    const fillLight = new THREE.DirectionalLight(0xc0d0ff, 0.8);
    fillLight.position.set(-5, -3, 2);
    scene.add(fillLight);

    // Dramatic Crimson Red Point Light (adds the signature #FF2A2A glow reflections)
    const redLight = new THREE.PointLight(0xff2a2a, 3.5, 12, 1.5);
    redLight.position.set(2, -1.5, 2.5);
    scene.add(redLight);

    const redLightTop = new THREE.PointLight(0xff2a2a, 1.8, 8, 2);
    redLightTop.position.set(-2, 3, -1);
    scene.add(redLightTop);

    // --- INTERACTION / MOUSE PARALLAX ---
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = -(e.clientY / innerHeight) * 2 + 1;

      targetRotY = x * 0.45;
      targetRotX = -y * 0.3;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse parallax
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      // Subtle continuous idle rotation + parallax
      tGroup.rotation.y = elapsedTime * 0.28 + currentRotY;
      tGroup.rotation.x = Math.sin(elapsedTime * 0.35) * 0.08 + currentRotX;
      tGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      // Counter-rotate rings for multi-dimensional depth
      ringGroup.rotation.y = -elapsedTime * 0.18 + currentRotY * 0.5;
      ringGroup.rotation.z = Math.cos(elapsedTime * 0.25) * 0.15;

      // Orbit satellites around their paths
      satellites.forEach((sat, i) => {
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
        const angle = (i / 4) * Math.PI * 2 + elapsedTime * 0.3 * (i % 2 === 0 ? 1 : -1);
        const radius = 2.2 + Math.sin(elapsedTime + i) * 0.15;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.z = Math.sin(angle) * radius;
        sat.position.y = Math.sin(elapsedTime * 1.5 + i) * 0.4;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Pulse red accent light subtly
      redLight.intensity = 3.2 + Math.sin(elapsedTime * 2) * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up geometries and materials
      [
        topBarGeo,
        topLaserGeo,
        stemGeo,
        stemLaserGeo,
        baseGeo,
        cageGeo,
        ring1Geo,
        ring2Geo,
        satGeo,
        particleGeometry
      ].forEach((g) => g.dispose());

      [
        metallicBlack,
        darkMetal,
        redEmissive,
        wireframeAccent,
        ring1Mat,
        ring2Mat,
        particleMaterial
      ].forEach((m) => m.dispose());

      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
