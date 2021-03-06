import React from 'react';
import styled from 'styled-components';
import { getIconClassName } from '@uifabric/styling';
import { useSpring, animated } from 'react-spring';

interface Props {
  onBack?: any;
  onMenu?: any;
  children?: any;
} 

const UIToolbar: React.FC<Props> = (props: Props) => {

  const menuIconAnimation = useSpring({
    delay: 250,
    from: { opacity: 0, transform: 'scaleX(0)' },
    to: { opacity: 1, transform: 'scaleX(1)' }
  })

  const backIconAnimation = useSpring({
    delay: 250,
    from: { opacity: 0, transform: 'translateX(-8px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  })

  const textAnimation = useSpring({
    delay: 350,
    from: { opacity: 0, transform: 'translateX(-12px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  })

  return (
    <Bar>
      {props.onBack && 
        <LeftButton onClick={() => props.onBack()} style={{...backIconAnimation, willChange: 'opacity, transform'}}>
          <Icon  className={getIconClassName('ChevronLeftMed')}  fontSize={20} />
        </LeftButton>
      }

      <Text style={{...textAnimation, willChange: 'opacity, transform'}}>{props.children}</Text>

      {props.onMenu && 
        <RightButton onClick={() => props.onMenu()} style={{...menuIconAnimation, willChange: 'opacity, transform'}}>          
          <Icon className={getIconClassName('Leave')}  fontSize={20}/>
        </RightButton>
      }
    </Bar>
  );
  
};

export default UIToolbar;

const Bar = styled.div`
  height: 44px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`

const Text = styled(animated.div)`
  font-size: 20px;
  font-weight: bolder;
  color: white;
`

const Button = styled(animated.button)`  
  transform-origin: right;
  color: white;
  margin: 0;
  padding: 0 2px;
  height: 32px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  background-color: transparent;
  outline: none;
  align-items: center;
  overflow: hidden;
  border: none;
`

const LeftButton = styled(Button)`
  margin-right: 12px;
`

const RightButton = styled(Button)`
  margin-left: auto;
`

const Icon = styled<any>(animated.i)<{
  fontSize: number;
}>`
  font-size: ${props => props.fontSize + 'px' || '20px'};
`;