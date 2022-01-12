import React, { useState, useMemo } from 'react';


/**
 * 一个奇怪的现象时，每次输入字符时，times会递增2
 * 但是其他输出只会执行一次
 * 为什么？？？
 */
let times = 0;
function Input() {
  console.log('times-test:', times++); // 输入框变化时触发一次times递增2
  console.log('times-test:', 1); // 输入框变化时触发一次

  const [_value, _setValue] = useState('');
  const _onChange = useMemo(() => {

    console.log('do useMemo');

    return (e) => {
      console.log(e);
      _setValue(e.target.value)
    }
  }, [])

  return (
   <div>
     <span> 变化一次，全局变量会加两次（看log）: </span>
      <input type="text" value={_value} onChange={_onChange} />
   </div>
  )
}

export default Input
