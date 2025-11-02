import React from 'react';
import { cn } from '../../lib/utils';

const Separator = ({ className, orientation = 'horizontal', ...props }) => (
  <div
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
);

export { Separator };