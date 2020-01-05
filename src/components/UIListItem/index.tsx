import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { animated, useSpring, config } from 'react-spring';
import { useDrag, useGesture } from 'react-use-gesture';
import { getIconClassName } from '@uifabric/styling';
import Theme from 'core/theme';

interface Props {
  text: string;
  id: string;
  type?: string;
  checked?: boolean;
  onChecked?: any;
  onDelete?: any;
}

const UIListItem: React.FC<Props> = (props) => {

  const {onChecked, onDelete, id} = props;
  const [deleteMode, setDeleteMode] = useState(false)
  const [checked, setCheck] = useState(props.checked || false)
  useEffect(() => { setCheck(props.checked) }, [props.checked]) 

  const [swipeAnimation, setSwipeAnimation] = useSpring(() => ({ 
    config: config.stiff,
    transform: `translateX(0px)`,
    backgroundColor: 'white'
  }))

  const bind = useDrag(({ down, movement: [mx] }) => {

    const value = down 
      ? (mx > 0 ? 0 : mx)
      : (mx < -96 ? -96 : 0)

    const bg = Math.abs(value) > 0 
      ? Math.abs(value) <= 96 ? (value/19) + 100 : 95
      : 100

    const isClick = Math.abs(mx) < 10;
    if (!down) {

      if (mx === -97 && !deleteMode) {
        setDeleteMode(true)
      }

      console.log(deleteMode, Math.abs(mx))
      if (isClick && !deleteMode) {
        setCheck(true); 
        onChecked([id, props.checked])
      }

      if (mx === 0) {
        setDeleteMode(false)
      } 
    }

    setSwipeAnimation({
      transform: `translateX(${value}px)`,
      backgroundColor: `hsl(210, 17%, ${bg}%)`
    })
    
    }, {
      bounds: { left: -97, right: 0 },
      rubberband: true,
      delay: 1000,
    }
  );


  const animOuterCircle = useSpring({
    borderColor: checked ? Theme.colors.secondary : Theme.colors.black
  })

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
    opacity: checked ? '0' : '1'
  })
  
  const animCheckProduct = useSpring({
    transform: checked ? 'rotate(0deg)' : 'rotate(45deg)',
    opacity: checked ? '1' : '0'
  })

  const animListItem = useSpring({
    ...(props.type === 'list' && {
      color: checked ? Theme.colors.greyDark : Theme.colors.black
    }),
    ...(props.type === 'product' && {
      color: checked ? Theme.colors.secondary : Theme.colors.black
    })
  })

  // const [animDelete, playAnimDelete] = useSpring(() => ({
  //   height: '0px'
  // }))

  const handleDelete = useCallback(() => {
    setTimeout(() => {
      onDelete(id)
    }, 1000)
  }, [onDelete, id])

  console.log('render list item')

  return (
    <Wrapper style={animListItem}>
      <ListItem {...bind()} style={swipeAnimation}>
        {props.type === 'list' && 
          <Check style={animOuterCircle}>
            <InnerCheckCircle style={animInnerCircle} />
            <CheckIcon style={{opacity: animCheckIcon.opacity}} className={getIconClassName('CheckMark')} />
          </Check>
        }
        {props.type === 'product' && 
          <Icon>
            <AddIcon style={animAddIcon} className={getIconClassName('ChromeClose')} />
            <CheckIcon style={animCheckProduct} className={getIconClassName('CheckMark')} />
          </Icon>
        }
        <Text>
          {props.text}
          {props.type === 'list' && 
            <TextLine style={animTextLine} />
          }
        </Text>
      </ListItem>
      <DeleteZone>
        <DeleteButton onClick={handleDelete}>Eliminar</DeleteButton>
      </DeleteZone>
    </Wrapper>
  );
};

export default React.memo(UIListItem);

const Wrapper = styled<any>(animated.div)`
  height: 48px;
  width: 100%;
  position: relative;
`

const ListItem = styled<any>(animated.div)`
  height: 100%;
  width: 100%;
  padding: 0 1.5rem;
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  overflow: hidden;
  will-change: height;
`

const DeleteZone = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  right: 0;
  left: 10%;
  display: flex;
  justify-content: flex-end;
  background-color: ${Theme.colors.error};
`

const DeleteButton = styled.button`
  color: white;
  margin: 0;
  height: 100%;
  border: none;
  background: none;
  outline: none;
  width: 96px;
  font-family: ${Theme.fonts.main};
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled<any>('div')`
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border-radius: 50%;
  position: relative;
  top: -1px;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`

const InnerCheckCircle = styled<any>(animated.div)`
  background-color: ${Theme.colors.secondary};
  position: absolute;
  z-index: 3;
  height: 16px;
  width: 16px;
  border-radius: 50%;
`

const Check = styled<any>(Icon)`
  border-color: #a4a2ad;
  font-size: 14px;
  color: white;
  top: 0px;
`

const CheckIcon = styled<any>(animated.i)`
  position: absolute;
  z-index: 4;
`

const AddIcon = styled<any>(animated.i)`
  position: absolute;
  color: ${Theme.colors.secondary};
  font-size: 10px;
  z-index: 4;
  /* top: 1px; */
  transform: rotate(45deg);
`

const Text = styled<any>('div')`
  /* font-size: 15px; */
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
  background-color: ${Theme.colors.greyDark};
  top: calc(50% + 1px);
`