import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';
import { ServerLocation } from '../types/vpn';
import { Radio } from 'lucide-react';

interface TooltipData {
  x: number;
  y: number;
  server: ServerLocation;
}

export const NetworkGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { servers } = useApp();
  const [hoveredTooltip, setHoveredTooltip] = useState<TooltipData | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 3.6 : 3.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    const globeRadius = 1.25;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    globeGroup.rotation.x = 0.2;
    globeGroup.rotation.y = -1.2;

    const sphereGeo = new THREE.SphereGeometry(globeRadius, isMobile ? 32 : 48, isMobile ? 32 : 48);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x07080b,
      emissive: 0x020304,
      specular: 0x222630,
      shininess: 30,
      transparent: true,
      opacity: 0.94,
      wireframe: false
    });
    const baseGlobe = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(baseGlobe);

    const wireGeo = new THREE.SphereGeometry(globeRadius * 1.002, 24, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x333a4d,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireGlobe = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireGlobe);

    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const serverNodes: { mesh: THREE.Mesh; server: ServerLocation; pos: THREE.Vector3 }[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.024, 16, 16);
    const nodeGlowGeo = new THREE.RingGeometry(0.028, 0.05, 16);

    servers.forEach((server) => {
      const pos = latLngToVector3(server.coordinates.lat, server.coordinates.lng, globeRadius * 1.01);
      
      const nodeMat = new THREE.MeshBasicMaterial({
        color: 0xffffff
      });
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { server };
      globeGroup.add(nodeMesh);

      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const haloMesh = new THREE.Mesh(nodeGlowGeo, haloMat);
      haloMesh.position.copy(pos.clone().multiplyScalar(1.002));
      haloMesh.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(haloMesh);

      serverNodes.push({ mesh: nodeMesh, server, pos });
    });

    const hubConnections: [string, string][] = [
      ['ru-msk-01', 'nl-ams-01'],
      ['ru-msk-01', 'de-fra-01'],
      ['ru-spb-01', 'fi-hel-01'],
      ['nl-ams-01', 'de-fra-01'],
      ['nl-ams-01', 'gb-lon-01'],
      ['nl-ams-01', 'pl-waw-01'],
      ['de-fra-01', 'ee-tll-01'],
      ['de-fra-01', 'tr-ist-01'],
      ['se-sto-01', 'fi-hel-01'],
      ['se-sto-01', 'nl-ams-01'],
      ['gb-lon-01', 'us-nyc-01'],
      ['nl-ams-01', 'us-nyc-01'],
      ['de-fra-01', 'sg-sin-01'],
      ['tr-ist-01', 'ru-msk-01']
    ];

    interface PulsePacket {
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }

    const pulsePackets: PulsePacket[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.016, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    hubConnections.forEach(([fromCode, toCode]) => {
      const fromNode = serverNodes.find((n) => n.server.id === fromCode);
      const toNode = serverNodes.find((n) => n.server.id === toCode);
      if (!fromNode || !toNode) return;

      const p1 = fromNode.pos;
      const p2 = toNode.pos;
      
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      const elevation = globeRadius + distance * 0.28;
      mid.normalize().multiplyScalar(elevation);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(isMobile ? 24 : 40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.18
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(arcLine);

      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      globeGroup.add(pMesh);
      pulsePackets.push({
        curve,
        mesh: pMesh,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004
      });
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 3, 5);
    scene.add(dirLight1);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;
        globeGroup.rotation.y += deltaX * 0.005;
        globeGroup.rotation.x += deltaY * 0.005;
        globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x));
        previousMousePosition = { x: clientX, y: clientY };
      }

      if (!('touches' in e)) {
        mouse.x = ((clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouse.y = -((clientY - rect.top) / container.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(serverNodes.map((n) => n.mesh));

        if (intersects.length > 0) {
          const hitServer = intersects[0].object.userData.server as ServerLocation;
          setHoveredTooltip({
            x: clientX - rect.left,
            y: clientY - rect.top,
            server: hitServer
          });
          container.style.cursor = 'pointer';
        } else {
          setHoveredTooltip(null);
          container.style.cursor = isDragging ? 'grabbing' : 'grab';
        }
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.0018;
      }

      pulsePackets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pt = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [servers]);

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] flex items-center justify-center select-none overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {hoveredTooltip && (
        <div
          className="absolute pointer-events-none z-30 transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{ left: hoveredTooltip.x, top: hoveredTooltip.y }}
        >
          <div className="liquid-glass rounded-xl p-3.5 shadow-2xl border border-white/20 min-w-[210px] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{hoveredTooltip.server.flag}</span>
                <span className="text-sm font-semibold text-white">
                  {hoveredTooltip.server.country}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Online
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 border-t border-white/10 pt-2 mt-1">
              <span className="text-slate-400">Локация:</span>
              <span className="font-mono text-white">{hoveredTooltip.server.city}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
              <span className="text-slate-400">Latency:</span>
              <span className="font-mono font-bold text-white">{hoveredTooltip.server.ping} ms</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
              <span className="text-slate-400">Канал:</span>
              <span className="font-mono text-white">{hoveredTooltip.server.bandwidth}</span>
            </div>

            {hoveredTooltip.server.isSpecialRussia && (
              <div className="mt-2 text-[10px] text-white bg-white/10 rounded px-1.5 py-0.5 border border-white/20 text-center font-mono">
                🇷🇺 Full Work режим в РФ
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto pointer-events-none z-10">
        <div className="liquid-glass-subtle rounded-xl px-3.5 py-2.5 flex items-center justify-between sm:justify-start gap-4 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
            <span>10 Gbps Узлы</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>РФ Full Work</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
            <Radio className="w-3.5 h-3.5 text-white/60" />
            <span>Вращайте мышкой</span>
          </div>
        </div>
      </div>
    </div>
  );
};
