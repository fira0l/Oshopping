import React, { useState } from 'react';
import { cn } from '../../lib/utils';

const Tabs = ({ defaultValue, children, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className={cn('w-full', className)} {...props}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab, className, ...props }) => (
  <div
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full',
      className
    )}
    {...props}
  >
    {React.Children.map(children, child => 
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab, className, ...props }) => (
  <button
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all flex-1',
      activeTab === value 
        ? 'bg-background text-foreground shadow-sm' 
        : 'hover:bg-muted-foreground/10',
      className
    )}
    onClick={() => setActiveTab(value)}
    {...props}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab, className, ...props }) => {
  if (activeTab !== value) return null;
  
  return (
    <div
      className={cn('mt-2', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };