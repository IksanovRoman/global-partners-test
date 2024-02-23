import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css';
import clsx from 'clsx';

function Menu() {
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? clsx(styles.active, styles.navbar__item)
      : styles.navbar__item;
  };

  return (
    <div className={styles.menu}>
      <div className={styles.navbar}>
        <ul className={styles.navbar__wrapper}>
          <li>
            <NavLink className={getLinkStyle} to="/">
              Главный экран
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Menu;
