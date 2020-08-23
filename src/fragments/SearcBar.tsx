import UIInput from 'components/UIInput/UIInput';
import { fire } from 'core/firebase';
import { setFilterAction } from 'core/redux';
import React, { useEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
import { Box } from 'reflexbox';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.data.filter);
  const setFilter = (filter) => dispatch(setFilterAction(filter));
  const [value, setValue] = useState(filter || '');
  const [, firebaseLoading] = useCollection(fire.getProductList(fire.PROVISIONAL_listId, filter));
  const [loading, setLoading] = useState(false);
  const valueChangeDelay = useRef<any>()

  const searchAnimation = useSpring({
    config: config.wobbly,
    delay: 350,
    from: {transform: 'scale(0.9) translateY(10px)', opacity: 0},
    to: {transform: 'scale(1) translateY(0)', opacity: 1}
  })

  useEffect(() => {
    if (!filter) {
      setValue('')
    }
  }, [filter])

  const handleChange = (newValue: string) => {
    if (valueChangeDelay?.current) { clearTimeout(valueChangeDelay.current); }
    setValue(newValue);

    if (newValue === '') {
      setFilter(newValue.toLowerCase())
      setLoading(false);
    } 
    
    else if (newValue.length >= 3) {
      setLoading(true);
      valueChangeDelay.current = setTimeout(() => {
        setFilter(newValue.toLowerCase())
        setLoading(false);
      }, 600)
    }
  }

  return (
    <React.Fragment>
      <animated.div style={{...searchAnimation, willChange: 'opacity, transform'}}>
        <Box pt={1} px={2}>
          <UIInput 
            value={value}
            loading={loading || firebaseLoading}
            onChangeValue={(value) => handleChange(value)}
          />
        </Box>
      </animated.div>
    </React.Fragment>
  )
  
}

export default React.memo(SearchBar);