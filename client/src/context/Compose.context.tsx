import React, { ReactNode, FC } from 'react';

interface IComposeContext {
  components?: FC<{ children?: ReactNode }>[];
  children?: ReactNode | undefined;
}

//Loops through and 'composes context'
export default function ComposeContext(props: IComposeContext) {
  const { components = [], children } = props;

  //Return elements with context
  return (
    <>
      {components.reduceRight((acc, Comp: any) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
