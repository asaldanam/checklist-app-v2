import React from 'react';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { Box } from 'reflexbox';
import UIHeader from 'ui/UIHeader/UIHeader';
import UIToolbar from 'ui/UIToolbar/UIToolbar';

const ViewSignIn: React.FC = () => {
  const history = useHistory();

  return (
    <Box height='100%'>
      <UIHeader 
        childDefault={
          <UIToolbar
            onBack={() => history.goBack()} 
            onMenu={true}
          />
        }
        childEnd={
          <div>test</div>
        }
      />
      <div>
        <Link to="/">Sign ins</Link>
        <button onClick={history.goBack}>Back</button>
      </div>
    </Box>
  );
};

export default ViewSignIn;