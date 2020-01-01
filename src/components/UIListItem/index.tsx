import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { getIconClassName } from '@uifabric/styling';

interface Props {
  text: string;
  id: string;
  checked: boolean;
  onChecked?: any;
}

const UIListItem: React.FC<Props> = (props) => {

  const [checked, setCheck] = useState(props.checked)

  const animInnerCircle = useSpring({
    transform: `scale(${checked ? '1' : '0.3'})`,
    opacity: checked ? '1' : '0'
  })
  
  const animTextLine = useSpring({
    transform: `scaleX(${checked ? '1' : '0'})`
  })
  
  const animCheckIcon = useSpring({
    delay: 300,
    opacity: checked ? '1' : '0'
  })

  const animListItem = useSpring({
    delay: 600,
    opacity: checked ? '0' : '1',
    transform: `scaleY(${checked ? '0' : '1'})`,
    height: checked ? '0px' : '48px'
  })

  return (
    <ListItem onClick={() => {setCheck(true); props.onChecked([props.id, props.checked])}} style={animListItem}>
      <Check>
        <InnerCheckCircle style={animInnerCircle} />
        <CheckIcon style={{opacity: animCheckIcon.opacity}} className={getIconClassName('StatusCircleCheckmark')} />
      </Check>
      
      <Text>
        {props.text}
        <TextLine style={animTextLine} />
      </Text>
    </ListItem>
  );
};

export default React.memo(UIListItem);

const ListItem = styled<any>(animated.div)`
  height: 48px;
  width: 100%;
  padding: 0 1.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;
  will-change: height;
`

const Icon = styled<any>('div')`
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border-radius: 50%;
  position: relative;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
`

const InnerCheckCircle = styled<any>(animated.div)`
  background-color: #4C407C;
  position: absolute;
  z-index: 1;
  height: 16px;
  width: 16px;
  border-radius: 50%;
`

const Check = styled<any>(Icon)`
  border-color: #4C407C;
  margin-right: 0.5rem;
  color: white;
`

const CheckIcon = styled<any>(animated.i)`
  position: relative;
  z-index: 2;
  left: 1px;
  bottom: 1px;
`

const Text = styled<any>('div')`
  font-size: 15px;
  position: relative;
  padding-bottom: 3px;
  &::first-letter {
    text-transform: uppercase;
  }
`

const TextLine = styled<any>(animated.div)`
  position: absolute;
  transform-origin: left;
  width: 100%;
  height: 1px;
  background-color: #4C407C;
  top: calc(50% + 1px);
`