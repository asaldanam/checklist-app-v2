import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
  headerSize?: string;
  footerSize?: string;
} 

const UIContent: React.FC<Props> = (props: Props) => {
  return (
    <Content mt={props.headerSize} mb={props.footerSize}>
      <ScrollContent>
        {props.children} 
      </ScrollContent>
    </Content>
  );
};

export default UIContent;


const Content = styled<any>('main')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* width: 100%; */
  /* height: 100%; */
  margin-top: ${props => props.mt || '0px'};
  margin-bottom: ${props => props.mb || '0px'};
  z-index: 1;
`;

const ScrollContent = styled<any>('div')`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position, transform;
  contain: size style layout;
`