import { memo } from 'react';
import cn from 'classnames';
import { useHeaderState } from '../../shared/context/HeaderContext';
import { ListItem } from '../linksList/listItem/ListItem';
import styles from './linksList.module.scss';
import { Profile } from '../profile/Profile';

export const LinksList = memo(() => {
  const { isMenuVisible } = useHeaderState();

  return (
    <div className={cn(styles.wrapper, { [styles.active]: isMenuVisible })}>
      <ul className={styles.list} id="navigation">
        <ListItem title="Strona główna" href="/" />
        <ListItem title="Moje projekty" href="/projekty" />
        <ListItem title="Feedback" href="/feedback" />
      </ul>
      <Profile />
    </div>
  );
});
