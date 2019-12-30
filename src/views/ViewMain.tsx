import React from 'react';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { Box } from 'reflexbox';
import UIHeader from 'ui/UIHeader';
import UIToolbar from 'ui/UIToolbar/UIToolbar';
import UIInput from 'ui/UIInput/UIInput';
import UIContent from 'ui/UIContent';
import { useSpring, animated, config } from 'react-spring';

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
        {Array.from({length: 60}).map((_, index) => 
          <p>Element {index}</p>
        )}
      </UIContent>
      <div>
        <Link to="/">Sign ins</Link>
        <button onClick={history.goBack}>Back</button>
      </div>
    </React.Fragment>
  );
};

export default ViewSignIn;