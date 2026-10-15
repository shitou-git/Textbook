// 图表逻辑：课外故事与配套阅读题规模
(function () {
  var root = document.documentElement;
  var style = getComputedStyle(root);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var el = document.getElementById('chart-story');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });
  chart.setOption({
    animation: false,
    color: [accent, accent2],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      backgroundColor: 'rgba(255,255,255,.96)',
      borderColor: rule,
      textStyle: { color: ink }
    },
    legend: {
      top: 0,
      icon: 'roundRect',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 20,
      textStyle: { color: muted, fontSize: 12, fontWeight: 600 }
    },
    grid: { left: 6, right: 18, bottom: 4, top: 46, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['语文', '英语'],
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: { color: ink, fontSize: 13, fontWeight: 600 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 12 }
    },
    series: [
      {
        name: '课外故事（篇）',
        type: 'bar',
        data: [188, 96],
        barWidth: 30,
        itemStyle: { borderRadius: [8, 8, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontWeight: 700, fontSize: 12 }
      },
      {
        name: '配套阅读题（道）',
        type: 'bar',
        data: [936, 290],
        barWidth: 30,
        itemStyle: { borderRadius: [8, 8, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontWeight: 700, fontSize: 12 }
      }
    ]
  });
  window.addEventListener('resize', function () { chart.resize(); });
})();
