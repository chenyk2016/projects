import React, { useState, useMemo, useEffect } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';


function Input(props) {
  console.log(`func-input: render`);

  const { onChange = () => {}, value } = props
  const [_value, _setValue] = useState(value);

  useEffect(() => {
    if(value !== _value) {
      _setValue(value)
    }
    return () => {}
  }, [value])

  const _onChange = useMemo(() => {

    return (e) => {
      _setValue(e.target.value)
      onChange(e)
    }
  }, [])

  return (
    <input type="text" value={_value} onChange={_onChange} />
  )
}

export default Input
