import { useRouter } from 'next/router';
import { Children, cloneElement } from 'react';
import Link, { LinkProps } from 'next/link';
import cn from 'classnames';

type ActiveLinkProps = {
  activeClassName: string;
  children: React.ReactElement<any>;
} & LinkProps;

const ActiveLink = ({ children, activeClassName, href, as, ...props }: ActiveLinkProps) => {
  const { asPath } = useRouter();
  const child = Children.only(children);

  const shouldAddClassName = () => {
    return asPath === href || asPath === as;
  };

  const newChild = cloneElement(child, {
    ...child.props,
    className: cn(child.props.className, { [activeClassName]: shouldAddClassName() }),
  });

  return (
    <Link href={href} {...props}>
      {newChild}
    </Link>
  );
};

export default ActiveLink;
