import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { useStore } from '../../store/store';
import gsap from 'gsap';

export const Envelope = () => {
  const groupRef = useRef();
  const flapRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  useEffect(() => {
    gsap.to(flapRef.current.rotation, {
      x: Math.PI,
      duration: 2,
      ease: "power2.inOut",
      delay: 0.5
    });
  }, []);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += (mousePosition.x * 0.2 - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (mousePosition.y * 0.2 - groupRef.current.rotation.x) * 0.1;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 - 1;
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <Plane args={[3, 2]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#1B2A6B" />
      </Plane>
      <Plane args={[3, 2]} position={[0, 0, 0.1]}>
        <meshStandardMaterial color="#0D1B2A" wireframe />
      </Plane>
      <group position={[0, 1, -0.1]}>
        <group ref={flapRef}>
          <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[2.1, 2.1]} />
            <meshStandardMaterial color="#FF6B00" wireframe opacity={0.8} transparent />
          </mesh>
        </group>
      </group>
    </group>
  );
};

const ContactScene = () => {
  return <Envelope />;
};

export default ContactScene;
