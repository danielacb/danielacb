import { ProfileCanvas } from './ProfileCanvas';
import styles from './styles.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.overlay} />
      <div id="header-text" className={styles.text}>
        <h1 className={styles.title}>Daniela Barbosa</h1>
        <h2 className={styles.subtitle}>
          Frontend Engineer & Creative Developer
        </h2>
      </div>
      <ProfileCanvas />
    </header>
  );
};
