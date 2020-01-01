import React, { useState, useRef } from 'react';
import { config, useSpring, animated } from 'react-spring';
import UIInput from 'components/UIInput/UIInput';
import { Box } from 'reflexbox';
import useGlobalFilter from 'core/filterContext';

const SearchBar: React.FC = () => {

  const [filter, setFilter] = useGlobalFilter();
  const valueChangeDelay = useRef<any>()

  const searchAnimation = useSpring({
    config: config.wobbly,
    delay: 850,
    from: {transform: 'scale(0.9) translateY(10px)', opacity: 0},
    to: {transform: 'scale(1) translateY(0)', opacity: 1}
  })

  const handleChange = (value) => {
    if (valueChangeDelay?.current) {
      clearTimeout(valueChangeDelay.current);
    }
    valueChangeDelay.current = setTimeout(() => {
      if (value.length >= 3 || value === '') {
        setFilter({filter: value})
      }
    }, 400)
  }

  return (
    <React.Fragment>
      <animated.div style={{...searchAnimation, willChange: 'opacity, transform'}}>
        <Box pt={1} px={2}>
          <UIInput onChange={(value) => handleChange(value)}/>
        </Box>
      </animated.div>
    </React.Fragment>
  )
  
}

export default React.memo(SearchBar);