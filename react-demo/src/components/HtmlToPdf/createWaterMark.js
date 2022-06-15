export default function ({
  text = '水印',
  textMargin = 100, // 水印间距
  width = 400,
  height = 400,
} = {}){
  let canvas = document.createElement('canvas')
  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext("2d");
  // 背景
  // ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  // ctx.fillRect(0, 0, width, height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '40px Microsoft Yahei';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  const textW = ctx.measureText(text).width;

  for (let i = textW/2; i < width; i += (textW + textMargin)) {
    for(let j = 0; j < height; j += textW + textMargin) {
      ctx.save();
      ctx.translate(i, j);
      ctx.rotate(Math.PI / 180 * 45);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };
  }
  ctx.save();

  const pageData = canvas.toDataURL('image/png', 1.0)

  canvas = null;
  return pageData;
}