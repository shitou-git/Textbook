// 交互：截图放大 + 命令复制
(function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<button class="lb-close" type="button" aria-label="关闭">\u00D7</button>' +
    '<img alt="">' +
    '<span class="lb-cap"></span>';
  document.body.appendChild(overlay);

  var img = overlay.querySelector('img');
  var cap = overlay.querySelector('.lb-cap');

  function open(src, label) {
    img.src = src;
    img.alt = label || '界面截图';
    cap.textContent = label || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
  }

  overlay.addEventListener('click', function (e) {
    if (e.target !== img) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  document.querySelectorAll('[data-zoom]').forEach(function (node) {
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
    function trigger() {
      var inner = node.querySelector('img');
      var src = node.getAttribute('data-src') || (inner && inner.getAttribute('src'));
      if (src) open(src, node.getAttribute('data-cap'));
    }
    node.addEventListener('click', trigger);
    node.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
    });
  });

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var block = btn.closest('.codeblock');
      var code = block && block.querySelector('code');
      if (!code || !navigator.clipboard) return;
      navigator.clipboard.writeText(code.innerText).then(function () {
        var old = btn.textContent;
        btn.textContent = '已复制';
        btn.classList.add('ok');
        setTimeout(function () { btn.textContent = old; btn.classList.remove('ok'); }, 1400);
      });
    });
  });
})();
