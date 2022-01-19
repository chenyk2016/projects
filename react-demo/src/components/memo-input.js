import React, { useState, useMemo, useEffect, memo } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';


/**
 * 输入框组件优化，避免多次render，每次输入只会触发一次
 *
 * @param {*} props
 ** @param.value [str | number | boolean]
 ** @param.onChange [fn]
 * @returns
 */
function useInput(props) {
  const { onChange = () => {}, value } = props
  // useState 数据相同不触发render
  const [_value, _setValue] = useState('');

  useEffect(() => {
    // 避免重复渲染
    if(value !== _value) {
      _setValue(value)
    }
    return () => {}
  }, [value]) // _value是内部变化，_onChange 里面已经处理了，不需要触发 useEffect

  const _onChange = useMemo(() => {
    return (e) => {
      const v = e.target.value
      _setValue(v)
      onChange(v)
    }
  }, [onChange])

  return [_value, _onChange]
}

function Input(props) {
  console.log('memo-input: render');
  const [value, onChange] = useInput({ value: props.value, onChange: props.onChange })

  return (
    <input type="text" value={value} onChange={onChange} />
  )
}


export default memo(Input);