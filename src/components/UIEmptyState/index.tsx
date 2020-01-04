import React from 'react';
import styled from 'styled-components';
import NotFound from 'assets/images/not-found';
import EmptyBag from 'assets/images/empty-bag';
import { Flex, Box } from 'reflexbox';
import { useSpring, animated } from 'react-spring';

// const NotFound = React.lazy(() => import('assets/images/not-found'));
// const EmptyBag = React.lazy(() => import('assets/images/empty-bag'));

interface Props {
  show: boolean;
  children?: any;
  image?: 'empty-bag' | 'not-found';
  title?: string;
  subtitle?: string;
}

const UIEmptyState: React.FC<Props> = (props: Props) => {

  const animation = {
    from: { opacity: '0', transform: 'translateY(10px)'},
    to: { opacity: '1', transform: 'translateY(0px)'}
  }

  const animImage = useSpring(animation)
  const animTitle = useSpring({...animation, delay: 100})
  const animSubtitle = useSpring({...animation, delay: 200})

  return (
    <React.Fragment>
      { props.show &&
        <React.Fragment>
          <ImageContainer style={animImage}>
            {props.image === 'empty-bag' &&  <EmptyBag />}      
            {props.image === 'not-found' &&  <NotFound />}      
          </ImageContainer>
          <TextContainer mx={'auto'}>
            {props.title && 
              <Title style={animTitle}>{props.title}</Title>
            }
            {props.subtitle && 
              <Subtitle style={animSubtitle}>{props.subtitle}</Subtitle>
            }
          </TextContainer>
          <Flex justifyContent={'center'} mt={4}>
            {props.children}
          </Flex>
        </React.Fragment>
      }
    </React.Fragment>
  );
};

export default UIEmptyState;

const ImageContainer = styled<any>(animated.div)`
  display: flex;
  justify-content: center;
  margin-top: 20%;
`

const TextContainer = styled<any>(Box)`
  text-align: center;
  max-width: 280px;
`

const Title = styled<any>(animated.div)`
  font-size: 20px;
  font-weight: 800;
  margin-top: 16px;
`

const Subtitle = styled<any>(animated.div)`
  color: #a4a2ad;
  margin-top: 8px;
  line-height: 1.5
`