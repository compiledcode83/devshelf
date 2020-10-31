import { useCallback } from 'react';
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
import usePageWidth from 'shared/hooks/usePageWidth';

const List = () => {
  const [isMenuVisible, toogleMenu] = useToggle();
  const pageWidth = usePageWidth(0);
  const isPopover = pageWidth > 500;

  /* prettier-ignore */
  const injectAdditionalListProps = useCallback(() => {
    if (isPopover) {
      return {
        'role': 'menu',
      };
    }
    return null;
  },[isPopover]);

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
        <div className={cn(styles.popoverInner, { [styles.popoverInnerVisible]: isMenuVisible })}>
          <span aria-hidden="true" className={styles.triangle}>
            <ArrowUpIcon />
          </span>
          <ul
            className={cn(styles.list, { [styles.listVisible]: isMenuVisible })}
            id="navigationList"
            aria-label="Dodatkowe informacje"
            tabIndex={isMenuVisible ? 0 : -1}
            {...injectAdditionalListProps()}
          >
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
