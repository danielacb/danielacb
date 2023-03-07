import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import SplineLoader from '@splinetool/loader'

// camera
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    -100000,
    100000
)
camera.position.set(0, 0, 1000)
camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0))

// scene
const scene = new THREE.Scene()

// spline scene
const loader = new SplineLoader()
loader.load(
    'https://draft.spline.design/ceSvc6mk4glhT3ig/scene.splinecode',
    (splineScene) => {
        scene.add(splineScene)
    }
)

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

// scene settings
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

scene.background = new THREE.Color('#ffd1b6')
renderer.setClearAlpha(1)

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.125

window.addEventListener('resize', onWindowResize)
function onWindowResize() {
    camera.left = window.innerWidth / -2
    camera.right = window.innerWidth / 2
    camera.top = window.innerHeight / 2
    camera.bottom = window.innerHeight / -2
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = -(event.clientY / window.innerHeight - 0.5)
})

function animate(time) {
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 2
    camera.lookAt(renderer.domElement)

    controls.update()
    renderer.render(scene, camera)
}
