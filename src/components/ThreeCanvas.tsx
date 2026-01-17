import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const GlassCard = () => {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!mesh.current) return;
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.x = Math.cos(t / 4) / 8 + 0.1;
        mesh.current.rotation.y = Math.sin(t / 4) / 8;
        mesh.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={mesh}>
                    <boxGeometry args={[4.5, 2.8, 0.1]} />
                    <meshPhysicalMaterial
                        color="#050505"
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.9} // Glass effect
                        thickness={0.5} // Refraction
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        ior={1.5}
                    />
                </mesh>
                {/* Glow Border Emulation */}
                <mesh position={[0, 0, -0.06]}>
                    <boxGeometry args={[4.55, 2.85, 0.05]} />
                    <meshBasicMaterial color="#00DC82" opacity={0.3} transparent />
                </mesh>

                {/* Text/Logo Overlay (Simple Plane for now) */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[4, 2]} />
                    <meshBasicMaterial color="#000" opacity={0.8} transparent />
                </mesh>
            </Float>
        </group>
    );
};

export default function ThreeCanvas() {
    return (
        <div className="w-full h-[500px] md:h-[600px] absolute top-0 left-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />
                <GlassCard />
            </Canvas>
        </div>
    );
}
