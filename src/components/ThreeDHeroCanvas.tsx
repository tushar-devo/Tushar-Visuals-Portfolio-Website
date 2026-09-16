import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
  interactive?: boolean;
}

export const ThreeDHeroCanvas: React.FC<Props> = ({ className = '', interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Visibility observer to pause animation when scrolled away
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

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
    renderer.toneMappingExposure = 1.35;

    // Center Master Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- MATERIALS ---
    // Ultra-glossy obsidian metallic black
    const metallicBlack = new THREE.MeshStandardMaterial({
      color: 0x090909,
      roughness: 0.12,
      metalness: 0.95,
      wireframe: false
    });

    // Dark brushed titanium
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.28,
      metalness: 0.88
    });

    // Signature Crimson Red Emissive Accent (#FF2A2A)
    const redEmissive = new THREE.MeshStandardMaterial({
      color: 0xff2a2a,
      emissive: 0xff1010,
      emissiveIntensity: 0.95,
      roughness: 0.1,
      metalness: 0.4
    });

    // Architectural neon wireframe accent
    const wireframeAccent = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });

    // Frosted glass-like ring material
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x505050,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: false
    });

    // --- 3D MONOGRAM "T" SCULPTURE ---
    const tGroup = new THREE.Group();

    // 1. Horizontal crossbar of 'T'
    const topBarGeo = new THREE.BoxGeometry(2.4, 0.45, 0.7);
    const topBar = new THREE.Mesh(topBarGeo, metallicBlack);
    topBar.position.y = 1.0;
    tGroup.add(topBar);

    // Subtle red laser slice along top bar
    const topLaserGeo = new THREE.BoxGeometry(2.42, 0.06, 0.72);
    const topLaser = new THREE.Mesh(topLaserGeo, redEmissive);
    topLaser.position.y = 0.8;
    tGroup.add(topLaser);

    // 2. Vertical stem of 'T'
    const stemGeo = new THREE.BoxGeometry(0.58, 2.1, 0.68);
    const stem = new THREE.Mesh(stemGeo, metallicBlack);
    stem.position.y = -0.2;
    tGroup.add(stem);

    // Vertical red laser rib
    const stemLaserGeo = new THREE.BoxGeometry(0.08, 2.12, 0.7);
    const stemLaser = new THREE.Mesh(stemLaserGeo, redEmissive);
    stemLaser.position.set(0.28, -0.2, 0);
    tGroup.add(stemLaser);

    // 3. Faceted architectural plinth / base
    const baseGeo = new THREE.CylinderGeometry(0.9, 1.25, 0.25, 8);
    const baseMesh = new THREE.Mesh(baseGeo, darkMetal);
    baseMesh.position.y = -1.35;
    tGroup.add(baseMesh);

    // Floating wireframe bounding cage around the 'T'
    const cageGeo = new THREE.BoxGeometry(2.8, 2.9, 1.4);
    const cageMesh = new THREE.Mesh(cageGeo, wireframeAccent);
    cageMesh.position.y = 0.05;
    tGroup.add(cageMesh);

    mainGroup.add(tGroup);

    // --- ORBITAL MULTI-AXIS GIMBAL RINGS & SATELLITES ---
    const ringGroup = new THREE.Group();

    // Ring 1 - inclined torus
    const ring1Geo = new THREE.TorusGeometry(2.25, 0.025, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2 - tilted counter ring
    const ring2Geo = new THREE.TorusGeometry(2.65, 0.02, 16, 120);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // Ring 3 - outer razor ring with red emissive sheen
    const ring3Geo = new THREE.TorusGeometry(3.05, 0.012, 16, 140);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xff2a2a,
      emissive: 0x880505,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    ringGroup.add(ring3);

    // Floating satellite geometric crystals
    const satellites: { mesh: THREE.Mesh; baseAngle: number; speed: number; radius: number; rotSpeed: { x: number; y: number } }[] = [];
    const satGeos = [
      new THREE.OctahedronGeometry(0.18, 0),
      new THREE.TetrahedronGeometry(0.16, 0),
      new THREE.IcosahedronGeometry(0.15, 0),
      new THREE.BoxGeometry(0.15, 0.15, 0.15)
    ];

    for (let i = 0; i < 6; i++) {
      const isRed = i % 2 === 0;
      const geo = satGeos[i % satGeos.length];
      const sat = new THREE.Mesh(geo, isRed ? redEmissive : metallicBlack);
      const angle = (i / 6) * Math.PI * 2;
      const radius = 2.2 + (i % 3) * 0.35;
      sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * 0.7, Math.sin(angle) * radius);
      ringGroup.add(sat);
      satellites.push({
        mesh: sat,
        baseAngle: angle,
        speed: (i % 2 === 0 ? 0.35 : -0.28),
        radius,
        rotSpeed: { x: 0.02 + Math.random() * 0.02, y: 0.015 + Math.random() * 0.02 }
      });
    }

    mainGroup.add(ringGroup);

    // --- BACKGROUND DYNAMIC 3D VORTEX PARTICLES ---
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cWhite = new THREE.Color(0xffffff);
    const cRed = new THREE.Color(0xff2a2a);
    const cDim = new THREE.Color(0x666666);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 14;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 12;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 9 - 1;

      const rand = Math.random();
      const color = rand > 0.75 ? cRed : rand > 0.4 ? cWhite : cDim;
      particleColors[idx] = color.r;
      particleColors[idx + 1] = color.g;
      particleColors[idx + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.058,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa0c0ff, 0.9);
    fillLight.position.set(-5, -3, 2);
    scene.add(fillLight);

    // Signature Crimson Red Point Lights
    const redLight = new THREE.PointLight(0xff2a2a, 4.0, 14, 1.4);
    redLight.position.set(2, -1.5, 2.5);
    scene.add(redLight);

    const redLightTop = new THREE.PointLight(0xff2a2a, 2.2, 10, 1.8);
    redLightTop.position.set(-2, 3, -1);
    scene.add(redLightTop);

    // --- INTERACTIVE DRAG & VELOCITY PHYSICS ---
    let isUserDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0;
    let rotVelY = 0;
    let hoverParallaxX = 0;
    let hoverParallaxY = 0;
    let shockwaveEnergy = 0;

    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isUserDragging = true;
      setIsDragging(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      rotVelX = 0;
      rotVelY = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;

      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = -(e.clientY / innerHeight) * 2 + 1;
      hoverParallaxX = nx * 0.35;
      hoverParallaxY = -ny * 0.25;

      if (isUserDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        mainGroup.rotation.y += deltaX * 0.008;
        mainGroup.rotation.x += deltaY * 0.008;

        rotVelY = deltaX * 0.008;
        rotVelX = deltaY * 0.008;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isUserDragging) {
        isUserDragging = false;
        setIsDragging(false);
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {
          // pointer capture release fallback
        }
      }
    };

    const handleClick = () => {
      // Trigger a shockwave pulse
      shockwaveEnergy = 1.0;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    canvas.addEventListener('click', handleClick);

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

      if (!isVisible) return; // Save GPU when scrolled away

      const elapsedTime = clock.getElapsedTime();

      // Inertia decay
      if (!isUserDragging) {
        rotVelX *= 0.94;
        rotVelY *= 0.94;

        mainGroup.rotation.x += rotVelX;
        mainGroup.rotation.y += rotVelY;

        // Idle slow spin + hover parallax
        mainGroup.rotation.y += 0.004;
        mainGroup.rotation.x += (hoverParallaxY - mainGroup.rotation.x) * 0.02;
        mainGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.04;
      }

      // Floating gentle bobbing
      tGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Gimbal counter-rotations
      ringGroup.rotation.y = -elapsedTime * 0.15;
      ringGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.12;

      // Orbit satellites around their paths
      satellites.forEach((sat, i) => {
        sat.mesh.rotation.x += sat.rotSpeed.x;
        sat.mesh.rotation.y += sat.rotSpeed.y;

        const currentAngle = sat.baseAngle + elapsedTime * sat.speed;
        const r = sat.radius + Math.sin(elapsedTime * 2 + i) * 0.12;
        sat.mesh.position.x = Math.cos(currentAngle) * r;
        sat.mesh.position.z = Math.sin(currentAngle) * r;
        sat.mesh.position.y = Math.sin(elapsedTime * 1.8 + i) * 0.45;
      });

      // Particle vortex motion
      particles.rotation.y = elapsedTime * 0.035;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.06;

      // Shockwave decay & light pulse
      if (shockwaveEnergy > 0.01) {
        shockwaveEnergy *= 0.92;
        cageMesh.scale.setScalar(1 + shockwaveEnergy * 0.35);
        redLight.intensity = 4.0 + shockwaveEnergy * 8.0;
      } else {
        cageMesh.scale.setScalar(1);
        redLight.intensity = 3.8 + Math.sin(elapsedTime * 2.5) * 0.9;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      canvas.removeEventListener('click', handleClick);
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
        ring3Geo,
        ...satGeos,
        particleGeometry
      ].forEach((g) => g.dispose());

      [
        metallicBlack,
        darkMetal,
        redEmissive,
        wireframeAccent,
        ringMat,
        ring3Mat,
        particleMaterial
      ].forEach((m) => m.dispose());

      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      aria-label="3D Interactive Monogram Sculpture"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} touch-none`}
      />
    </div>
  );
};
