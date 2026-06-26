import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, W / H, 1, 2000);
    camera.position.z = 520;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 2, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.7);
    rim.position.set(-4, 0, -2);
    scene.add(rim);

    const CX = 94.5187;
    const CY = 92.5491;
    const POLYS = [
      '131.5689 39.1317 4.4394 39.1438 0 .0121 127.1295 0 131.5689 39.1317',
      '108.5457 113.5971 12.8873 113.6077 8.4478 74.476 104.1063 74.4654 108.5457 113.5971',
      '186.4703 .0056 189.0374 19.5719 144.2707 5.9391 143.6286 .0011 186.4703 .0056',
      '68.4689 185.0939 20.9978 185.0982 16.5583 145.9664 64.0295 145.9622 68.4689 185.0939',
    ];

    function buildShape(str) {
      const nums = str.trim().split(/\s+/).map(Number);
      const pts = [];
      for (let i = 0; i < nums.length; i += 2) {
        pts.push([nums[i] - CX, CY - nums[i + 1]]);
      }
      const f = pts[0];
      const l = pts[pts.length - 1];
      if (Math.abs(f[0] - l[0]) < 0.01 && Math.abs(f[1] - l[1]) < 0.01) pts.pop();
      const shape = new THREE.Shape();
      shape.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
      shape.closePath();
      return shape;
    }

    const extOpts = {
      depth: 14,
      bevelEnabled: true,
      bevelThickness: 2.5,
      bevelSize: 2,
      bevelSegments: 4,
    };
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.15,
      roughness: 0.35,
    });
    const group = new THREE.Group();
    POLYS.forEach((s) =>
      group.add(new THREE.Mesh(new THREE.ExtrudeGeometry(buildShape(s), extOpts), mat))
    );

    const box = new THREE.Box3().setFromObject(group);
    const centre = new THREE.Vector3();
    box.getCenter(centre);
    group.position.sub(centre);
    scene.add(group);

    const BASE_VEL = 0.003;
    let vel = BASE_VEL;
    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);
      vel += (BASE_VEL - vel) * 0.02;
      group.rotation.y += vel;
      group.rotation.x = Math.sin(Date.now() * 0.0002) * 0.08;
      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      const W2 = container.offsetWidth;
      const H2 = container.offsetHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div id="hero-canvas" ref={containerRef} />;
}
