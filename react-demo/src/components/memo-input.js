import React, { useState, useMemo, useEffect, memo } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';


function Input(props) {
  console.log(`memo-input ${props.memo || ''}: render`);

  const { onChange = () => {}, value } = props
  // useState 数据相同不触发render
  const [_value, _setValue] = useState(value);
  // 当useState 的值是对象时
  const [_state, _setState] = useState({});

  useEffect(() => {
    console.log('memo-input: useEffect');
    if(value !== _value) {
      console.log('memo-input: do _setValue');
      _setValue(value)
    }
    _setValue(value)

    return () => {}
  }, [value])

  useEffect

  const _onChange = useMemo(() => {
    console.log('memo-input: do useMemo');

    return (e) => {
      const v = e.target.value
      _setValue(v)
      _setState({a: 1})
      onChange(v)
    }
  }, [])

  return (
    <input type="text" value={_value} onChange={_onChange} />
  )
}


export default memo(Input);