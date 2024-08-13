import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Sphere() {
  const [time, setTime] = useState(0)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    setTime(elapsedTime)
  })

  return (
    <mesh position={[0, 0, 3]}>
      <sphereGeometry args={[6, 32, 32]} attach="geometry" />
      <shaderMaterial
        attach="material"
        args={[
          {
            vertexShader,
            fragmentShader,
            side: THREE.DoubleSide,
            uniforms: { uTime: { value: time } },
          },
        ]}
      />
    </mesh>
  )
}

export const vertexShader = `
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`

const fragmentShader = `
uniform float uTime;

float speed = 1.0;
float scale = 2.0;
float intensity = 0.4;
float noiseScale = 1.8;

varying vec2 vUv;

float random (in vec2 _st) {
  return fract(sin(dot(_st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 3

float fbm ( in vec2 _st) {
  float v = 0.0;
  float a = intensity;
  vec2 shift = vec2(0.580,-0.350);

  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * abs(noise(_st));
      v = abs(v);
      _st = rot * _st * noiseScale + shift;
      a *= 0.50;
  }
  return v;
}

float cubicPulse( float c, float w, float x ){
  x = abs(x - c);
  if( x>w ) return 0.0;
  x /= w;
  return 1.0 - x*x*(3.0-2.0*x);
}

float plot(vec2 st, float pct){
return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
  vec2 st = vUv * scale;
  vec3 color = vec3(0.0);

  vec2 q = vec2(0.);
  q.x = fbm( st + speed * uTime);
  q.y = fbm( st + vec2(1.0));

  vec2 r = vec2(0.);
  r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime );
  r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.125 * uTime);

  float f = fbm(st + r);

  color = mix(vec3(0.0), vec3(1.0), clamp((f*f)*4.0,0.0,1.0));
  color = mix(color, vec3(0.631,0.631,0.647), clamp(length(q),0.0,1.0));
  color = mix(color, vec3(0.0), clamp(length(r.x),0.0,1.0));

  float x = cubicPulse(1.8,2.0,st.y);
  vec3 colormix = vec3(x);
  colormix = (1.0) * colormix;

  gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color * colormix,1.);
}
`
