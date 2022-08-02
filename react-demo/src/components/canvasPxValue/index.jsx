/*
 * @Author: 陈亚昆
 * @Date: 2022-07-29 16:01:34
 * @LastEditTime: 2022-08-01 15:45:31
 * @LastEditors: 陈亚昆
 * @Description: 测试获取canvas像素点的rgba值
 */

// 获取画布的像素数据
// var myImageData = ctx.getImageData(left, top, width, height);

import React, { useEffect, useState } from "react";
import './index.scss';

const CanvasPxValue = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas')
    window.inst = canvas;
    const text = '水印(20201000)';
    const  textMargin = 0; // 水印间距
    const  width = canvas.width;
    const  height = canvas.height;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px Microsoft Yahei';
    ctx.fillStyle = 'blue';
    const textW = ctx.measureText(text).width;

    for (let i = textW/2; i < width; i += (textW + textMargin)) {
      for(let j = 0; j < height; j += (textW + textMargin) / 2) {
        ctx.save();
        ctx.translate(i, j);
        // ctx.rotate(Math.PI / 180 * 25);
        ctx.fillText(text, 0, 0);
        ctx.restore();
      };
    }

    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    ctx.restore();

    function pick(event, destination) {
      var x = event.layerX;
      var y = event.layerY;
      var pixel = ctx.getImageData(x, y, 1, 1);
      var data = pixel.data;

        const rgba = `x:${x},y:${y},rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        destination.style.background = rgba;
        destination.textContent = rgba;

        return rgba;
    }

    // 获取像素数据
    function getAllPixelData () {
      return ctx.getImageData(0, 0, width, height);
    }
    // 获取整行像素数据
    function getRowData(i) {
      var pixel = ctx.getImageData(0, i, width, 1);
      console.log(pixel);
      return pixel;
    }
    // 改变某几个点的像素数据
    function changePointData (conf) {
      const _conf = Object.assign({
        left: 0, // 左起点
        top: 0, // 上起点
        width: 0, // 宽度
        height: 0, // 高度
        value: '', // 像素值 rgba(),
      }, conf)

      const value = conf.value.replace(/[rgba\(\)]/g, '').split(',');
      var pixel = ctx.getImageData(0, 0, width, height);

      for (let h = 0; h < conf.height; h++) {
        for(let w = 0; w < conf.width; w++) {
          const start = ((conf.left + w) + (conf.top + h) * width) * 4;
          console.log(start, value);
          pixel.data[start] = value[0];
          pixel.data[start + 1] = value[1];
          pixel.data[start + 2] = value[2];
          pixel.data[start + 3] = Math.floor(255 * value[3]); // 0-1要转换成0-255
        };
      }
      console.log( pixel );
      ctx.putImageData(pixel, 0, 0);
    }

    // 判断某一行空白比例
    function calcRowEmptyPercent(rowI) {
      const data = getRowData(rowI).data;
      let emptyAccount = 0
      let i = 0
      // 50 个元素都没有空白的，不当成文字
      while (i < width) {
        if (data.slice(i * 4, (i + 1) * 4).join(',') === '255,255,255,255') {
          emptyAccount++;
        }
        i++
      }
      return Math.floor(emptyAccount / width * 100) / 100;
    }

    // 获取某一行，及其前多少行中，空白比例最大的行
    // 如果是1，就返回该行
    function getLikeEmptyRow(rowIndex, previousOffset) {

      let i = 0;
      let max = 0;
      let minIndex = rowIndex;
      while (i < previousOffset) {
        const index = rowIndex - i
        const p = calcRowEmptyPercent(index);
        console.log( index );

        if (p > max) {
          max = p;
          minIndex = index;
        }
        // 跳出执行
        if (p === 1 ) {
          break;
        }
        i++;
      }

      return minIndex;
    }

    window.getRowData = getRowData;
    window.changePointData = changePointData;
    window.calcRowEmptyPercent = calcRowEmptyPercent;
    window.getLikeEmptyRow = getLikeEmptyRow;

    const hoveredColor = document.getElementById('hoveredColor')
    const selectedColor = document.getElementById('selectedColor')

    canvas.addEventListener('mousemove', function(event) {
        pick(event, hoveredColor);

    });
    canvas.addEventListener('click', function(event) {
        pick(event, selectedColor);
    });

  }, []);

  return (
    <div className="warp">
      <canvas width="400px" height="400px" className="canvas" id="canvas" />
      <div className="flex">
        <div>
          <p>hover的颜色</p>
          <div className="box" id="hoveredColor"></div>
        </div>
        <div>
          <p>选中的颜色</p>
          <div className="box" id="selectedColor"></div>
        </div>
      </div>
    </div>
  )
}


export default CanvasPxValue;