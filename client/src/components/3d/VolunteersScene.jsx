import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Capsule } from '@react-three/drei';
import { useStore } from '../../store/store';

export const Crowd = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  // Generate a crowd of capsule figures
  const count = 50;
  const figures = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 8 + 2;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = Math.random() * 0.5 + 0.5;
      const speed = Math.random() * 2 + 1;
      const offset = Math.random() * Math.PI * 2;
      
      temp.push({ x, z, scale, speed, offset });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x += (mousePosition.y * 0.1 - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.z += (-mousePosition.x * 0.1 - groupRef.current.rotation.z) * 0.1;

    // Pulse effect
    groupRef.current.children.forEach((child, i) => {
      if(child.type === 'Mesh' && i < figures.length) { // skip the ground plane
        const time = state.clock.getElapsedTime();
        const figure = figures[i];
        if(child.material) {
          const pulse = (Math.sin(time * figure.speed + figure.offset) + 1) / 2;
          child.material.emissiveIntensity = pulse * 0.8 + 0.2;
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -2, -5]}>
      {figures.map((fig, i) => (
        <Capsule key={i} args={[0.2 * fig.scale, 0.6 * fig.scale, 4, 8]} position={[fig.x, 0.4 * fig.scale, fig.z]}>
          <meshStandardMaterial color={i % 3 === 0 ? "#FF6B00" : (i % 2 === 0 ? "#00C875" : "#F5F7FF")} emissive={i % 3 === 0 ? "#FF6B00" : (i % 2 === 0 ? "#00C875" : "#F5F7FF")} emissiveIntensity={0.5} roughness={0.5} />
        </Capsule>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0D1B2A" roughness={0.1} metalness={0.8} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const VolunteersScene = () => {
  return <Crowd />;
};

export default VolunteersScene;
