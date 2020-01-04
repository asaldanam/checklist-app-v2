import React, { useRef, useState, useEffect } from 'react';
import { config, useSpring, animated } from 'react-spring';
import UIInput from 'components/UIInput/UIInput';
import { Box } from 'reflexbox';
import useGlobalFilter from 'core/filterContext';
import { fire } from 'core/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const SearchBar: React.FC = () => {

  const [filter, setFilter] = useGlobalFilter();
  const [value, setValue] = useState(filter || '');
  const [, firebaseLoading] = useCollection(fire.getProductList('lzCiykDQBPMjr1rCBCZK', filter));
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
      setFilter({filter: newValue.toLowerCase()})
      setLoading(false);
    } 
    
    else if (newValue.length >= 3) {
      setLoading(true);
      valueChangeDelay.current = setTimeout(() => {
        setFilter({filter: newValue.toLowerCase()})
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