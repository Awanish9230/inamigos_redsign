import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { useStore } from '../../store/store';

export const FilmStrip = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  const count = 15;
  const planes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        z: -i * 2, 
        x: Math.sin(i * 0.5) * 1.5,
        y: Math.cos(i * 0.3) * 0.5
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    groupRef.current.rotation.x += (mousePosition.y * 0.1 - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.y += (mousePosition.x * 0.1 - groupRef.current.rotation.y) * 0.1;

    groupRef.current.children.forEach((child) => {
      child.position.z += delta * 2;
      if (child.position.z > 2) {
        child.position.z -= count * 2;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {planes.map((plane, i) => (
        <Plane key={i} args={[1.6, 0.9]} position={[plane.x, plane.y, plane.z]}>
          <meshBasicMaterial color="#FF6B00" wireframe transparent opacity={0.4} />
        </Plane>
      ))}
    </group>
  );
};

const GalleryScene = () => {
  return <FilmStrip />;
};

export default GalleryScene;
