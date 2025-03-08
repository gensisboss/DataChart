console.log("数据分析表")
const padding = 40;
let keys, history = [];

document.addEventListener('DOMContentLoaded', function () {
    // 接收数据
    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'VALUE_CHANGE') {
            track(message.value);
            draw();
        }
    });
});


function track(obj) {
  if (!keys) keys = Object.keys(obj).sort();
  keys.forEach((k, i) => (history[i] ||= []).push(obj[k]));
}

function generateColors (count) {
    const colors = [];
    const hueStep = 360 / count;
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${hueStep * i}, 70%, 50%)`);
    }
    return colors;
};


function draw() {
    const canvas = document.getElementById('chartCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxValue = Math.max(...history.flat());
    const colors = generateColors(history.length);

    history.forEach((dataset, index) => {
      if (dataset.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = colors[index];
      ctx.lineWidth = 2;

      const xScale = (canvas.width - padding * 2) / (dataset.length - 1);
      const yScale = (canvas.height - padding * 2) / maxValue;

      dataset.forEach((point, i) => {
        const x = padding + i * xScale;
        const y = canvas.height - padding - point * yScale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      
      ctx.stroke();
    });

}




