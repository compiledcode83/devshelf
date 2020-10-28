import { memo } from 'react';
import { WithChildren, PropsWithAs } from 'shared/types/types';

type ContainerProps = WithChildren<{
  className?: string;
}>;

type Tag = 'div' | 'main' | 'section' | 'article' | 'footer' | 'header';

const Container = memo<PropsWithAs<ContainerProps, Tag>>(
  ({ className, children, as: Tag = 'div' }) => <Tag className={className}>{children}</Tag>,
);

export default Container;
