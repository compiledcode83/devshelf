import { memo } from 'react';
import cn from 'classnames';
import { useHeaderState } from '../../shared/context/HeaderContext';
import { ListItem } from '../linksList/listItem/ListItem';
import styles from './linksList.module.scss';

export const LinksList = memo(() => {
  const { isMenuVisible } = useHeaderState();

  return (
    <ul className={cn(styles.list, { [styles.active]: isMenuVisible })} id="navigation">
      <ListItem title="Strona główna" href="/" />
      <ListItem title="Moje projekty" href="/projekty" />
      <ListItem title="Feedback" href="/feedback" />
    </ul>
  );
});
