import React from 'react';
import styled from 'styled-components';
import { NotFound } from 'assets/images/not-found';
import { Flex } from 'reflexbox';

interface Props {
  children?: any;
}

const UIEmptyState: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <ImageContainer justifyContent={'center'} mt={'20%'}>
        <NotFound />      
      </ImageContainer>
    </React.Fragment>
  );
};

export default UIEmptyState;

const ImageContainer = styled<any>(Flex)`
`