import Nav from '../Nav'
import Scene from './Scene'
import styles from './styles.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <Nav />
      <Scene />
      <div className={styles.overlay} />
      <div className={styles.darkGradient} />
      <div className={styles.orangeGradient} />
      <h1 className={styles.hidden}>Daniela Barbosa</h1>
      <p className={styles.hidden}>Front-end Developer</p>
    </header>
  )
}
