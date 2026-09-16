import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
  serviceId: string;
}

export const ThreeDServicesCanvas: React.FC<Props> = ({ className = '', serviceId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store active serviceId in ref for the animation loop
  const serviceIdRef = useRef(serviceId);
  useEffect(() => {
    serviceIdRef.current = serviceId;
  }, [serviceId]);

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
    camera.position.set(0, 0, 6.0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // Master Morph Group
    const group = new THREE.Group();
    scene.add(group);

    // --- MATERIALS ---
    const glossyBlack = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.15,
      metalness: 0.95
    });

    const crimsonNeon = new THREE.MeshStandardMaterial({
      color: 0xff2a2a,
      emissive: 0xff1010,
      emissiveIntensity: 0.85,
      roughness: 0.1,
      metalness: 0.5
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const brushedMetal = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.85
    });

    // 1. BRAND IDENTITY MODEL: Monolith with orbital crystal satellites
    const brandGroup = new THREE.Group();
    const monolithGeo = new THREE.BoxGeometry(1.2, 2.2, 0.4);
    const monolithMesh = new THREE.Mesh(monolithGeo, glossyBlack);
    brandGroup.add(monolithMesh);

    const monolithStripeGeo = new THREE.BoxGeometry(1.24, 0.08, 0.44);
    const monolithStripe = new THREE.Mesh(monolithStripeGeo, crimsonNeon);
    monolithStripe.position.y = 0.4;
    brandGroup.add(monolithStripe);

    const brandRingGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 64);
    const brandRing = new THREE.Mesh(brandRingGeo, brushedMetal);
    brandRing.rotation.x = Math.PI / 3;
    brandGroup.add(brandRing);

    group.add(brandGroup);

    // 2. WORDPRESS MODEL: Interlocking architectural code blocks
    const wpGroup = new THREE.Group();
    const blockGeos: THREE.BoxGeometry[] = [];
    const wpBlocks: THREE.Mesh[] = [];

    for (let i = 0; i < 3; i++) {
      const bGeo = new THREE.BoxGeometry(1.8 - i * 0.35, 0.28, 1.8 - i * 0.35);
      blockGeos.push(bGeo);
      const bMesh = new THREE.Mesh(bGeo, i === 1 ? crimsonNeon : glossyBlack);
      bMesh.position.y = (i - 1) * 0.65;
      wpGroup.add(bMesh);
      wpBlocks.push(bMesh);
    }

    const wpCageGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const wpCage = new THREE.Mesh(wpCageGeo, wireframeMat);
    wpGroup.add(wpCage);

    group.add(wpGroup);

    // 3. UI/UX & PERFORMANCE: Concentric dual-torus gyroscope
    const uiGroup = new THREE.Group();
    const torus1Geo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
    const torus1 = new THREE.Mesh(torus1Geo, crimsonNeon);
    uiGroup.add(torus1);

    const torus2Geo = new THREE.TorusGeometry(1.8, 0.03, 16, 64);
    const torus2 = new THREE.Mesh(torus2Geo, glossyBlack);
    torus2.rotation.y = Math.PI / 2;
    uiGroup.add(torus2);

    const centerSphereGeo = new THREE.IcosahedronGeometry(0.65, 1);
    const centerSphere = new THREE.Mesh(centerSphereGeo, wireframeMat);
    uiGroup.add(centerSphere);

    group.add(uiGroup);

    // Background Particle Stardust
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 8;
      pPos[i + 1] = (Math.random() - 0.5) * 8;
      pPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xff2a2a,
      size: 0.04,
      transparent: true,
      opacity: 0.5
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(0xffffff, 2.2);
    dir.position.set(4, 5, 3);
    scene.add(dir);

    const point = new THREE.PointLight(0xff2a2a, 3.8, 10);
    point.position.set(2, -1, 2);
    scene.add(point);

    // Mouse / Touch Drag
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

        group.rotation.y += dx * 0.008;
        group.rotation.x += dy * 0.008;
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
      const currentService = serviceIdRef.current;

      // Determine which sub-model to show / scale based on current service
      const isBrand = currentService.includes('brand') || currentService.includes('identity');
      const isWP = currentService.includes('wordpress') || currentService.includes('ecommerce');
      const isUI = !isBrand && !isWP;

      // Smooth scale interpolation for morphing between states
      brandGroup.scale.lerp(new THREE.Vector3(isBrand ? 1 : 0.001, isBrand ? 1 : 0.001, isBrand ? 1 : 0.001), 0.1);
      wpGroup.scale.lerp(new THREE.Vector3(isWP ? 1 : 0.001, isWP ? 1 : 0.001, isWP ? 1 : 0.001), 0.1);
      uiGroup.scale.lerp(new THREE.Vector3(isUI ? 1 : 0.001, isUI ? 1 : 0.001, isUI ? 1 : 0.001), 0.1);

      brandGroup.visible = brandGroup.scale.x > 0.01;
      wpGroup.visible = wpGroup.scale.x > 0.01;
      uiGroup.visible = uiGroup.scale.x > 0.01;

      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        group.rotation.x += velX;
        group.rotation.y += velY;

        group.rotation.y += 0.006;
        group.rotation.x = Math.sin(t * 0.5) * 0.12;
      }

      // Sub-model internal motions
      brandRing.rotation.z = t * 0.4;
      wpBlocks.forEach((b, i) => {
        b.rotation.y = (i % 2 === 0 ? 1 : -1) * Math.sin(t * 0.8 + i) * 0.3;
      });
      torus1.rotation.x = t * 0.5;
      torus2.rotation.z = -t * 0.4;
      centerSphere.rotation.y = t * 0.3;

      particles.rotation.y = t * 0.02;

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

      [
        monolithGeo,
        monolithStripeGeo,
        brandRingGeo,
        ...blockGeos,
        wpCageGeo,
        torus1Geo,
        torus2Geo,
        centerSphereGeo,
        pGeo
      ].forEach((g) => g.dispose());

      [glossyBlack, crimsonNeon, wireframeMat, brushedMetal, pMat].forEach((m) =>
        m.dispose()
      );
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}
      aria-label="3D Interactive Capability Sculpture"
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      <div className="absolute top-3 right-3 text-[10px] font-mono text-neutral-400 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] animate-pulse" />
        <span>3D MORPH ARTIFACT</span>
      </div>
    </div>
  );
};
