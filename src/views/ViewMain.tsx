import React from 'react';
import 'firebase/auth';
import { useHistory } from 'react-router-dom'
import { Box } from 'reflexbox';
import UIHeader from 'components/UIHeader';
import UIToolbar from 'components/UIToolbar/UIToolbar';
import UIInput from 'components/UIInput/UIInput';
import UIContent from 'components/UIContent';
import { useSpring, animated, config } from 'react-spring';
import UIListItem from 'components/UIListItem';

const ViewSignIn: React.FC = () => {
  const history = useHistory();

  const searchAnimation = useSpring({
    config: config.wobbly,
    delay: 850,
    from: {transform: 'scale(0.9) translateY(10px)', opacity: 0},
    to: {transform: 'scale(1) translateY(0)', opacity: 1}
  })

  return (
    <React.Fragment>
      <UIHeader convexEnd>
        <UIToolbar onMenu={() => history.goBack()}>
          Mi lista
        </UIToolbar>
        <animated.div style={searchAnimation}>
          <Box pt={1} px={2}>
            <UIInput />
          </Box>
        </animated.div>
      </UIHeader>
      <UIContent headerSize={'88px'} >
        {Array.from({length: 10}).map((_, index) => 
          <UIListItem key={index}>
            Elemento nº {index}
          </UIListItem>
        )}
      </UIContent>
    </React.Fragment>
  );
};

export default ViewSignIn;