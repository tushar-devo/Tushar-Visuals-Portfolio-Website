import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
  activeCategory?: string;
}

const SKILL_NODES = [
  { name: 'Photoshop', category: 'graphic', pos: [1.8, 0.6, 0.4] as const },
  { name: 'Illustrator', category: 'graphic', pos: [1.2, 1.4, -0.6] as const },
  { name: 'Brand Systems', category: 'graphic', pos: [0.3, 1.8, 0.7] as const },
  { name: 'WordPress', category: 'wordpress', pos: [-1.4, 1.1, 0.8] as const },
  { name: 'Elementor Pro', category: 'wordpress', pos: [-1.8, -0.3, 0.5] as const },
  { name: 'WooCommerce', category: 'wordpress', pos: [-1.1, -1.4, -0.6] as const },
  { name: 'Figma UI/UX', category: 'digital', pos: [0.4, -1.8, 0.6] as const },
  { name: 'Tailwind CSS', category: 'digital', pos: [1.4, -1.0, 0.9] as const },
  { name: 'Three.js / 3D', category: 'digital', pos: [-0.6, 0.5, -1.7] as const },
  { name: 'Speed Tuning', category: 'wordpress', pos: [0.8, -0.6, -1.6] as const },
];

export const ThreeDSkillsCanvas: React.FC<Props> = ({ className = '', activeCategory = 'all' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

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

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 1. Central Core Wireframe Geodesic Sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    constellationGroup.add(coreMesh);

    // Inner glowing core point
    const innerCoreGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xff2a2a,
      emissive: 0xff1010,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.8
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    constellationGroup.add(innerCore);

    // 2. Orbital Cyber Rings around the core
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      wireframe: true
    });
    const ring1Geo = new THREE.TorusGeometry(1.7, 0.012, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    constellationGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.1, 0.008, 16, 72);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    constellationGroup.add(ring2);

    // 3. Skill Data Nodes (Interactive 3D crystals)
    const nodeMeshes: { mesh: THREE.Mesh; halo: THREE.Mesh; data: typeof SKILL_NODES[0] }[] = [];
    const nodeGeo = new THREE.OctahedronGeometry(0.14, 0);
    const haloGeo = new THREE.SphereGeometry(0.24, 12, 12);

    SKILL_NODES.forEach((node) => {
      const isRed = node.category === 'graphic' || node.category === 'digital';

      const mat = new THREE.MeshStandardMaterial({
        color: isRed ? 0xff2a2a : 0xffffff,
        emissive: isRed ? 0x990000 : 0x222222,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8
      });

      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(node.pos[0], node.pos[1], node.pos[2]);

      // Halo aura
      const haloMat = new THREE.MeshBasicMaterial({
        color: isRed ? 0xff2a2a : 0xffffff,
        transparent: true,
        opacity: 0.16,
        wireframe: true
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(mesh.position);

      constellationGroup.add(mesh);
      constellationGroup.add(halo);
      nodeMeshes.push({ mesh, halo, data: node });
    });

    // 4. Connecting Laser Constellation Lines
    const linePositions: number[] = [];
    for (let i = 0; i < SKILL_NODES.length; i++) {
      for (let j = i + 1; j < SKILL_NODES.length; j++) {
        const p1 = SKILL_NODES[i].pos;
        const p2 = SKILL_NODES[j].pos;
        const dist = Math.hypot(p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]);

        // Connect nodes within proximity
        if (dist < 2.5) {
          linePositions.push(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0xff2a2a,
      transparent: true,
      opacity: 0.18
    });
    const constellationLines = new THREE.LineSegments(linesGeo, linesMat);
    constellationGroup.add(constellationLines);

    // 5. Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(4, 5, 3);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xff2a2a, 3.5, 8);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Pointer Drag & Parallax Interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      targetParallaxX = ((e.clientX / innerWidth) * 2 - 1) * 0.3;
      targetParallaxY = -((e.clientY / innerHeight) * 2 - 1) * 0.2;

      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;

        constellationGroup.rotation.y += dx * 0.008;
        constellationGroup.rotation.x += dy * 0.008;
        velY = dx * 0.008;
        velX = dy * 0.008;
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

    // Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        constellationGroup.rotation.x += velX;
        constellationGroup.rotation.y += velY;

        // Continuous slow celestial drift
        constellationGroup.rotation.y += 0.005;
        constellationGroup.rotation.x += (targetParallaxY - constellationGroup.rotation.x) * 0.02;
        constellationGroup.rotation.z = Math.sin(t * 0.4) * 0.05;
      }

      // Rotate inner core & rings
      coreMesh.rotation.y = -t * 0.3;
      coreMesh.rotation.x = t * 0.2;
      ring1.rotation.z = t * 0.25;
      ring2.rotation.z = -t * 0.18;

      // Animate individual nodes
      nodeMeshes.forEach((item, idx) => {
        item.mesh.rotation.y += 0.02;
        item.mesh.rotation.x += 0.015;
        item.halo.rotation.y -= 0.01;

        // Subtle pulsing scale
        const pulse = 1 + Math.sin(t * 2 + idx) * 0.12;
        item.mesh.scale.setScalar(pulse);

        // Highlight if matches active category
        const matchesCategory =
          activeCategory === 'all' || activeCategory === item.data.category;
        const targetOpacity = matchesCategory ? 0.3 : 0.05;
        (item.halo.material as THREE.MeshBasicMaterial).opacity = targetOpacity;
      });

      // Point light pulsing
      pointLight.intensity = 3.0 + Math.sin(t * 3) * 0.8;

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

      [coreGeo, innerCoreGeo, ring1Geo, ring2Geo, nodeGeo, haloGeo, linesGeo].forEach((g) =>
        g.dispose()
      );
      [coreMat, innerCoreMat, ringMat, ring2Mat, linesMat].forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [activeCategory]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}
      aria-label="3D Interactive Skill Constellation"
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      <div className="absolute bottom-3 left-4 text-[10px] font-mono text-neutral-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] animate-ping" />
        <span>3D CONSTELLATION • DRAG TO ROTATE</span>
      </div>
    </div>
  );
};
