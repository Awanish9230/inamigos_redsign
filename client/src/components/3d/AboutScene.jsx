import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useStore } from '../../store/store';

export const Helix = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  // Generate helix positions
  const count = 40;
  const radius = 1.5;
  const height = 8;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 4;
      
      temp.push({
        pos1: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        pos2: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius]
      });
    }
    return temp;
  }, [count, radius, height]);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.5;
    groupRef.current.rotation.x += (mousePosition.y * 0.2 - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.z += (-mousePosition.x * 0.2 - groupRef.current.rotation.z) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
      {particles.map((p, i) => (
        <React.Fragment key={i}>
          <Sphere position={p.pos1} args={[0.15, 16, 16]}>
            <meshStandardMaterial color="#00C875" emissive="#00C875" emissiveIntensity={0.8} />
          </Sphere>
          <Sphere position={p.pos2} args={[0.15, 16, 16]}>
            <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={0.8} />
          </Sphere>
          {/* Connector line */}
          <mesh position={[0, p.pos1[1], 0]} rotation={[0, (i / count) * Math.PI * 4, 0]}>
            <cylinderGeometry args={[0.02, 0.02, radius * 2]} />
            <meshBasicMaterial color="#F5F7FF" transparent opacity={0.2} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
};

const AboutScene = () => {
  return <Helix />;
};

export default AboutScene;
