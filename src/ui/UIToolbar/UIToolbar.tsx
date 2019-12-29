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
    delay: 650,
    from: { opacity: 0, transform: 'scaleX(0)' },
    to: { opacity: 1, transform: 'scaleX(1)' }
  })

  const backIconAnimation = useSpring({
    delay: 650,
    from: { opacity: 0, transform: 'translateX(-8px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  })

  const textAnimation = useSpring({
    delay: 750,
    from: { opacity: 0, transform: 'translateX(-12px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  })

  return (
    <Bar>

      {props.onBack && 
        <Button onClick={() => props.onBack()} style={backIconAnimation} alignLeft={true}>   
          <Icon  className={getIconClassName('ChevronLeftMed')}  fontSize={20} />
        </Button>
      }

      <Text style={textAnimation}>Lorem ipsum</Text>

      {props.onMenu && 
        <Button style={menuIconAnimation} alignRight={true}>          
          <Icon className={getIconClassName('ListMirrored')}  fontSize={24}/>
        </Button>
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
`

const Button = styled<any>(animated.button)`
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
  margin-left: ${props => props.alignRight ? 'auto' : 'none'};
  margin-right: ${props => props.alignLeft ? '12px' : '0px'};
`

const Icon = styled<any>(animated.i)<{
  fontSize: number;
  alignEnd?: boolean;
}>`
  font-size: ${props => props.fontSize + 'px' || '20px'};
`;
