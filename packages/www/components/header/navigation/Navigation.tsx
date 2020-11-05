import styles from './navigation.module.scss';
import Search from 'components/header/search/Search';
import List from './list/List';
import UserProfile from './userProfile/UserProfile';
import { useHeaderState } from '../shared/stores/HeaderContext';
import cn from 'classnames';

const Navigation = () => {
  const { isMenuVisible } = useHeaderState();
  return (
    <>
      <nav
        id="navigation"
        aria-label="Menu główne"
        className={cn(styles.nav, { [styles.hide]: isMenuVisible })}
      >
        {/* <Search /> */}
        <List />
        <UserProfile />
      </nav>
    </>
  );
};

export default Navigation;
