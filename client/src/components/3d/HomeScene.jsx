import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export const ParticleRain = () => {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 15 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#F5F7FF" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
    </group>
  );
};

export const Globe = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.2;
    const targetX = mousePosition.x * 0.5;
    const targetY = mousePosition.y * 0.5;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.z += (-targetX - groupRef.current.rotation.z) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh>
        <icosahedronGeometry args={[2.5, 3]} />
        <meshBasicMaterial color="#00C875" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshStandardMaterial color="#1B2A6B" emissive="#1B2A6B" emissiveIntensity={0.5} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.6, 2]} />
        <pointsMaterial color="#FF6B00" size={0.08} sizeAttenuation={true} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const HomeScene = () => {
  return (
    <>
      <ParticleRain />
      <Globe />
    </>
  );
};

export default HomeScene;
