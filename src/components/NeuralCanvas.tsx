import { useEffect, useRef } from "react";

export function NeuralCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed || !container) return;

      const NODE_COUNT = 1500;
      const CONNECTION_MAX_DIST = 0.4;
      const PULSE_INTERVAL = 4.0;

      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      const scene = new THREE.Scene();
      const clock = new THREE.Clock();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(1.5, 0.5, 5);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const nodeGeo = new THREE.SphereGeometry(0.012, 8, 8);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
      const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);

      const nodePositions: InstanceType<typeof THREE.Vector3>[] = [];
      const dummy = new THREE.Object3D();
      for (let i = 0; i < NODE_COUNT; i++) {
        const r = Math.pow(Math.random(), 0.7) * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        dummy.position.set(x, y, z);
        dummy.scale.setScalar(Math.random() * 0.5 + 0.5);
        dummy.updateMatrix();
        nodes.setMatrixAt(i, dummy.matrix);
        nodePositions.push(new THREE.Vector3(x, y, z));
      }
      scene.add(nodes);

      const linePairs: InstanceType<typeof THREE.Vector3>[] = [];
      outer: for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECTION_MAX_DIST) {
            if (Math.random() > 0.95) {
              linePairs.push(nodePositions[i], nodePositions[j]);
            }
          }
          if (linePairs.length > 3000) break outer;
        }
      }

      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePairs);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      const dustGeo = new THREE.BufferGeometry();
      const dustPos: number[] = [];
      for (let i = 0; i < 2000; i++) {
        dustPos.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
      }
      dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.005, transparent: true, opacity: 0.2 });
      const particles = new THREE.Points(dustGeo, dustMat);
      scene.add(particles);

      const mouse = new THREE.Vector2(0, 0);
      const targetMouse = new THREE.Vector2(0, 0);

      const onMove = (e: MouseEvent) => {
        targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        const t = clock.getElapsedTime();
        mouse.lerp(targetMouse, 0.05);
        camera.position.x = 1.5 + mouse.x * 0.2;
        camera.position.y = 0.5 + mouse.y * 0.2;
        camera.lookAt(0.5, 0, 0);

        const breathing = 1 + Math.sin(t * 0.5) * 0.02;
        nodes.rotation.y = t * 0.05;
        nodes.rotation.x = t * 0.02;
        nodes.scale.setScalar(breathing);
        lines.rotation.copy(nodes.rotation);
        lines.scale.copy(nodes.scale);

        const pulseProgress = (t % PULSE_INTERVAL) / PULSE_INTERVAL;
        if (pulseProgress < 0.3) {
          lineMat.opacity = 0.15 + Math.sin((pulseProgress * Math.PI) / 0.3) * 0.2;
        } else {
          lineMat.opacity = 0.15;
        }

        particles.rotation.y = t * 0.01;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(frameId);
        renderer.dispose();
        nodeGeo.dispose();
        nodeMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}