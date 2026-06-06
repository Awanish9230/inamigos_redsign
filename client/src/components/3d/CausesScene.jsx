import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Sphere, Box, Cylinder, Torus, Octahedron, Cone } from '@react-three/drei';

export const OrbitingIcons = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x += (mousePosition.y * 0.2 - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.z += (-mousePosition.x * 0.2 - groupRef.current.rotation.z) * 0.1;
  });

  const icons = [
    { component: Sphere, color: '#00C875', pos: [3, 0, 0] },     // Health
    { component: Box, color: '#FF6B00', pos: [1.5, 0, 2.6] },    // Education
    { component: Cone, color: '#1B2A6B', pos: [-1.5, 0, 2.6] },  // Animal
    { component: Torus, color: '#3B82F6', pos: [-3, 0, 0] },     // Women
    { component: Cylinder, color: '#059669', pos: [-1.5, 0, -2.6] }, // Sustainability
    { component: Octahedron, color: '#F97316', pos: [1.5, 0, -2.6] } // Skills
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {icons.map((Icon, i) => (
        <group key={i} position={Icon.pos}>
          <Icon.component args={i === 3 ? [0.6, 0.2, 16, 100] : [0.8]}>
            <meshStandardMaterial color={Icon.color} roughness={0.2} metalness={0.8} />
          </Icon.component>
        </group>
      ))}
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#1B2A6B" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const CausesScene = () => {
  return <OrbitingIcons />;
};

export default CausesScene;
