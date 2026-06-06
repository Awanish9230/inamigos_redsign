import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { useStore } from '../../store/store';

export const FloatingPages = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  const count = 8;
  const pages = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        speed: Math.random() * 0.5 + 0.1
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x += (mousePosition.y * 0.1 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (-mousePosition.x * 0.1 - groupRef.current.rotation.z) * 0.05;

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * pages[i].speed;
      child.rotation.y += delta * pages[i].speed * 0.5;
      child.position.y += Math.sin(state.clock.elapsedTime * pages[i].speed) * 0.01;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {pages.map((p, i) => (
        <Plane key={i} args={[1, 1.4]} position={p.pos} rotation={p.rot}>
          <meshStandardMaterial color="#F5F7FF" transparent opacity={0.6} side={2} />
        </Plane>
      ))}
    </group>
  );
};

const BlogScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FF6B00" />
      <FloatingPages />
    </>
  );
};

export default BlogScene;
