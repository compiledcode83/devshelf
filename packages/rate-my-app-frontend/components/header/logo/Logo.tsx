import Link from 'next/link';

const Logo = () => (
  <Link href="/">
    <a>
      <Logo aria-hidden="true" />
    </a>
  </Link>
);

export default Logo;
