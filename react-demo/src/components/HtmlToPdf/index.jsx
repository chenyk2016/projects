import React from 'react';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { Button } from 'antd';
import Chart from '../Chart';
import createWaterMark from './createWaterMark';
import './index.scss';


export default function () {


  const toPdf = () => {
    const element = document.getElementById('page-cont')
    const opts = {
      scale: 1.5, // 缩放比例，提高生成图片清晰度
      useCORS: true, // 允许加载跨域的图片
      allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
      tainttest: true, // 检测每张图片已经加载完成
      logging: false // 日志开关，发布的时候记得改成 false
    }
    const outPage = { name: 'A4', width: 595.28, height: 841.89 }

    const WaterMarkImg = createWaterMark({
      tex: 'chenyk',
      width: outPage.width * opts.scale,
      height: outPage.height * opts.scale,
    });

    html2canvas(element, opts)
      .then((canvas) => {

        const contentWidth = canvas.width
        const contentHeight = canvas.height
        console.log( contentWidth, contentHeight );




        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = (contentWidth / outPage.width) * outPage.height
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight
        // 页面偏移
        let position = 0
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = outPage.width;
        const imgHeight = (outPage.width / contentWidth) * contentHeight

        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        console.log(pageData)
        // a4纸纵向，一般默认使用；new JsPDF('landscape'); 横向页面
        const PDF = new JsPDF('', 'pt', 'a4')

        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          PDF.addImage(WaterMarkImg, 'JPEG', 0, 0, outPage.width, outPage.height)
        } else {
          // 超过一页时，分页打印（每页高度841.89）
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            PDF.addImage(WaterMarkImg, 'JPEG', 0, 0, outPage.width, outPage.height)
            leftHeight -= pageHeight
            position -= outPage.height
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save('test.pdf')
      })
      .catch((error) => {
        console.log('打印失败', error)
      })
  }

  return (
    <div className="pdf-page-wrap">
      <Button onClick={toPdf}>导出pdf</Button>
      <div id="page-cont">
        {
          new Array(100).fill('').map((item, index) => {
            return <div key={index}> hhhhhh{ index }</div>
          })
        }
        {/* {
          new Array(20).fill('').map((item, index) => {
            return <img key={index} className="middle-image" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84d15577dff14b488c086e0b3691ba9e~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?" alt="" />
          })
        }

        {
          new Array(20).fill('').map((item, index) => {
            return <Chart key={index} id={index} />
          })
        } */}

      </div>
    </div>
  )
}
