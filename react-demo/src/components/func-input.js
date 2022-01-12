import React, { useState, useMemo, useEffect } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';


function Input(props) {
  console.log(`func-input ${props.memo || ''}: render`);

  const { onChange = () => {}, value } = props
  const [_value, _setValue] = useState(value);

  useEffect(() => {
    console.log('func-input: useEffect');
    if(value !== _value) {
      console.log('func-input: do _setValue');
      _setValue(value)
    }

    return () => {}
  }, [value])

  const _onChange = useMemo(() => {
    console.log('func-input: do useMemo');

    return (e) => {
      console.log(e);
      _setValue(e.target.value)
      onChange(e)
    }
  }, [])

  return (
    <input type="text" value={_value} onChange={_onChange} />
  )
}

export default Input
