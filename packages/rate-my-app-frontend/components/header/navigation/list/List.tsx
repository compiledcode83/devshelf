import { useCallback, useRef } from 'react';
import Link from 'next/link';
import styles from './list.module.scss';
import DocumentIcon from '../../../../public/icons/document.svg';
import UserIcon from '../../../../public/icons/user.svg';
import FlagIcon from '../../../../public/icons/flag.svg';
import IdeaIcon from '../../../../public/icons/idea.svg';
import MoreIcon from '../../../../public/icons/more.svg';
import ArrowUpIcon from '../../../../public/icons/arrow-up.svg';
import useToggle from '../../../../shared/hooks/useToggle';
import cn from 'classnames';
import useClickOutside from '../../../../shared/hooks/useClickOutside';

const List = () => {
  const [isMenuVisible, toogleMenu, closeMenu] = useToggle();
  const menuRef = useRef<HTMLDivElement>(null!);
  useClickOutside(menuRef, () => closeMenu());
  return (
    <>
      <button
        onClick={toogleMenu}
        aria-haspopup="true"
        aria-controls="navigationList"
        aria-expanded={isMenuVisible}
        className={styles.button}
      >
        <span className="visually-hidden">{isMenuVisible ? 'Zamknij ' : 'Otwórz '} menu</span>
        <MoreIcon aria-hidden="true" />
      </button>
      <div className={styles.popoverWrapper}>
        <div
          ref={menuRef}
          className={cn(styles.popoverInner, { [styles.popoverInnerVisible]: isMenuVisible })}
          tabIndex={-1}
        >
          <span aria-hidden="true" className={styles.triangle}>
            <ArrowUpIcon />
          </span>
          <ul className={styles.list} id="navigationList" aria-label="Dodatkowe informacje">
            <li className={styles.listItem}>
              <Link href="/">
                <a className={styles.link}>
                  <DocumentIcon aria-hidden="true" className={styles.icon} />
                  Jak korzystać?
                </a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/">
                <a className={styles.link}>
                  <UserIcon aria-hidden="true" className={styles.icon} />
                  Autorzy
                </a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/">
                <a className={styles.link}>
                  <FlagIcon aria-hidden="true" className={styles.icon} />
                  Polityka prywatności
                </a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/">
                <a className={styles.link}>
                  <IdeaIcon aria-hidden="true" className={styles.icon} />
                  Kontrybucja
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default List;
