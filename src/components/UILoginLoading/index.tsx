import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
}

const UILoginLoading: React.FC<Props> = (props: Props) => {
  return (
    <Overlay>
      UILoginLoading
    </Overlay>
  );

};

export default UILoginLoading;

const Overlay = styled.div`
  background: red;
  position: fixed;
  z-index: 99;
  color: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`