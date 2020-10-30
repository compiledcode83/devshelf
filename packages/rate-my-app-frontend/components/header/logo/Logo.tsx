import Link from 'next/link';
import LogoIcon from '../../../public/icons/logo.svg';

const Logo = () => (
  <Link href="/">
    <a>
      <LogoIcon aria-hidden="true" />
    </a>
  </Link>
);

export default Logo;
