const mode = document.body.dataset.mood;
if (mode === 'soft') {
  const messages = {
    water: '先喝几口水吧，小雅。小小的照顾也算数。',
    stretch: '伸个懒腰，松一松肩膀。今天不用一直绷着。',
    song: '选一首喜欢的歌，给自己一点不被打扰的时间。'
  };
  document.querySelectorAll('[data-care]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-care]').forEach(item => item.classList.remove('chosen'));
    button.classList.add('chosen');
    document.querySelector('#care-result').textContent = messages[button.dataset.care];
  }));
  const heart = document.querySelector('#soft-heart');
  heart.addEventListener('click', () => {
    heart.classList.remove('pop');
    requestAnimationFrame(() => heart.classList.add('pop'));
    heart.textContent = '这颗心先送给认真生活的你 💗';
  });
}
if (mode === 'sparkle') {
  const stars = [...document.querySelectorAll('.collect-star')];
  const status = document.querySelector('#star-count');
  const bar = document.querySelector('#star-progress');
  const result = document.querySelector('#star-result');
  function refresh() {
    const count = stars.filter(star => star.classList.contains('collected')).length;
    status.textContent = `点亮 ${count} / 5`;
    bar.style.width = `${count * 20}%`;
    result.textContent = count === 5 ? '五颗小星星都收好啦。今天的开心，值得被你自己看见。' : count ? `已经有 ${count} 颗亮起来了。再想一件今天的小小开心吧。` : '';
  }
  stars.forEach(star => star.addEventListener('click', () => { star.classList.toggle('collected'); refresh(); }));
}
if (mode === 'slow') {
  const button = document.querySelector('#start-breath');
  const orb = document.querySelector('#breath-orb');
  const status = document.querySelector('#breath-status');
  const result = document.querySelector('#breath-result');
  let timer = null;
  let second = 0;
  function stopBreath(done = false) {
    clearInterval(timer); timer = null; button.disabled = false; button.textContent = '再慢充一轮  ·  约 12 秒';
    orb.classList.remove('inhale', 'exhale');
    if (done) { status.textContent = '这一小轮完成啦 🌙'; result.textContent = '不用马上变得有精神。先这样安静一会儿，也很好。'; }
    else { status.textContent = '停在这里也可以，照自己的节奏来。'; result.textContent = ''; }
  }
  button.addEventListener('click', () => {
    if (timer) { stopBreath(false); return; }
    second = 0; result.textContent = ''; button.disabled = false; button.textContent = '先停一下';
    const tick = () => {
      if (second >= 12) { stopBreath(true); return; }
      const inhale = second % 4 < 2;
      status.textContent = inhale ? '慢慢吸气……' : '慢慢呼气……';
      orb.classList.toggle('inhale', inhale); orb.classList.toggle('exhale', !inhale);
      second += 1;
    };
    tick(); timer = setInterval(tick, 1000);
  });
}
if (mode === 'unsure') {
  const chips = [...document.querySelectorAll('.feeling-chip')];
  const postcard = document.querySelector('#postcard');
  chips.forEach(chip => chip.addEventListener('click', () => {
    if (chip.classList.contains('chosen')) { chip.classList.remove('chosen'); return; }
    if (chips.filter(item => item.classList.contains('chosen')).length >= 3) return;
    chip.classList.add('chosen');
  }));
  document.querySelector('#make-postcard').addEventListener('click', () => {
    const picked = chips.filter(chip => chip.classList.contains('chosen')).map(chip => chip.textContent.trim());
    document.querySelector('#postcard-line').textContent = picked.length ? `今天的小雅，心里装着${picked.join('、')}。` : '今天暂时说不上来，也是一种真实的心情。';
    document.querySelector('#postcard-care').textContent = picked.includes('有点累') || picked.includes('脑袋很满') ? '今天不用一次想完所有事，先把自己照顾好。' : '这张卡不用发给任何人，先替自己留着就好。';
    postcard.classList.remove('visible'); requestAnimationFrame(() => postcard.classList.add('visible'));
  });
}
