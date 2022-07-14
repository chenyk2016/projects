import React, { useEffect, useState } from "react";
import './index.scss';
// 添加水印

export default function () {
  const [img, setImg] = useState('');

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const text = '水印(20201000)';
    const  textMargin = 40; // 水印间距
    const  width = canvas.width;
    const  height = canvas.height;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '14px Microsoft Yahei';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    const textW = ctx.measureText(text).width;

    for (let i = textW/2; i < width; i += (textW + textMargin)) {
      for(let j = 0; j < height; j += (textW + textMargin) / 2) {
        ctx.save();
        ctx.translate(i, j);
        ctx.rotate(Math.PI / 180 * 25);
        ctx.fillText(text, 0, 0);
        ctx.restore();
      };
    }

    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    setImg(pageData)
    ctx.restore();

    // ctx.fillText('chenyk', parseFloat(contentWidth) / 2, parseFloat(contentHeight) / 2);
  }, []);

  return (
    <div>
      <canvas width="400px" height="300px" className="canvas" id="canvas" />
      <img src={img} alt="" />
    </div>
  )
}