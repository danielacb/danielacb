import { useState } from 'react'
import { Vector2 } from 'three'
import { Center, Svg } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { BlendFunction } from 'postprocessing'
import {
  Noise,
  EffectComposer,
  ChromaticAberration,
} from '@react-three/postprocessing'

export default function Title() {
  const [offset, setOffset] = useState([0.01, 0.01])

  const {
    viewport: { width, height },
  } = useThree()

  useFrame(({ mouse }) => {
    const x = (mouse.x * width * 0.1) / 400
    const y = (mouse.y * height * 0.1) / 400
    setOffset([x, y])
  })

  const scale = width > 6 ? width / 1100 : width / 720
  const positionY = width > 6 ? 0.25 : 1

  return (
    <Center position={[0, positionY, 0.1]}>
      <Svg scale={scale} src="/dcb.svg" fillMaterial={{ color: 'white' }} />
      <EffectComposer disableNormalPass>
        <Noise premultiply blendFunction={BlendFunction.OVERLAY} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(...offset)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Center>
  )
}
