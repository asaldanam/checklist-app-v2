import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { getIconClassName } from '@uifabric/styling';

interface Props {
  text: string;
  id: string;
  type?: string;
  checked?: boolean;
  onChecked?: any;
}

const UIListItem: React.FC<Props> = (props) => {

  const [checked, setCheck] = useState(props.checked || false)
  useEffect(() => { setCheck(props.checked) }, [props.checked]) 

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
  
  const animAddIcon = useSpring({
    transform: checked ? 'rotate(0deg)' : 'rotate(45deg)',
    // color: checked ? 'white' : '#62B379'
  })

  const animListItem = useSpring({
    delay: 600,
    opacity: checked ? '0' : '1',
    transform: `scaleY(${checked ? '0' : '1'})`,
    height: checked ? '0px' : '48px'
  })

  const animProductItem = useSpring({
    backgroundColor: checked ? '#62B37922' : 'white'
  })

  return (
    <ListItem onClick={() => {setCheck(true); props.onChecked([props.id, props.checked])}} style={props.type === 'list' ? animListItem : animProductItem}>
      {props.type === 'list' && 
        <Check>
          <InnerCheckCircle style={animInnerCircle} />
          <CheckIcon style={{opacity: animCheckIcon.opacity}} className={getIconClassName('StatusCircleCheckmark')} />
        </Check>
      }
      <Text>
        {props.text}
        {props.type === 'list' && 
          <TextLine style={animTextLine} />
        }
      </Text>
      {props.type === 'product' && 
        <Add>
          <AddIcon style={animAddIcon} className={getIconClassName('ChromeClose')} />
        </Add>
      }
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
  top: 1px;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InnerCheckCircle = styled<any>(animated.div)`
  background-color: #62B379;
  position: absolute;
  z-index: 1;
  height: 16px;
  width: 16px;
  border-radius: 50%;
`

const Check = styled<any>(Icon)`
  border-color: #62B379;
  font-size: 17px;
  margin-right: 0.5rem;
  color: white;
`

const Add = styled<any>(Icon)`
  font-size: 10px;
  margin-left: auto;
`

const CheckIcon = styled<any>(animated.i)`
  position: relative;
  z-index: 2;
  left: 1px;
  bottom: 1px;
`

const AddIcon = styled<any>(animated.i)`
  color: #62B379;
  position: relative;
  z-index: 2;
  /* top: 1px; */
  transform: rotate(45deg);
`

const Text = styled<any>('div')`
  font-size: 15px;
  position: relative;
  &::first-letter {
    text-transform: uppercase;
  }
`

const TextLine = styled<any>(animated.div)`
  position: absolute;
  transform-origin: left;
  width: 100%;
  height: 1px;
  background-color: #62B379;
  top: calc(50% + 1px);
`