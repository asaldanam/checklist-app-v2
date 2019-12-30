import React from 'react';
import { Box } from 'reflexbox';
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components';

interface Props {
  children?: any;
  convexEnd?: any;
} 

const UIHeader: React.FC<Props> = (props: Props) => {

  const headerAnimation = useSpring({
    delay: 300,
    from: { opacity: 0, transform: 'translateY(-100%)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  })

  return (
    <Header style={headerAnimation}>
      <Top pt={2} pb={2}> {props.children} </Top>
      { props.convexEnd && 
        <ConvexEndContainer>
          <ConvexEnd />
        </ConvexEndContainer>
      }
    </Header>
  );
};

export default UIHeader;


const Header = styled<any>(animated.header)`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`

const Top = styled<any>(Box)`
  position: absolute;
  background-color: #ffb300;
  color: white;
  z-index: 11;
  width: 100%;
  height: 76px;
`

const ConvexEndContainer = styled<any>('div')`
  position: absolute;
  width: 100%;
  height: 27px;
  top: 76px;
  left: 0;
`

const ConvexEnd = styled<any>('div')`
  position: absolute;
  background-color: #ffb300;
  border-radius: 50%;
  height: 6rem;
  width: 150%;
  left: -25%;
  top: -70px;
`