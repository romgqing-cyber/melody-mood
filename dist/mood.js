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
  let hearts = 0;
  heart.addEventListener('click', () => {
    hearts = Math.min(5, hearts + 1);
    heart.classList.remove('pop');
    requestAnimationFrame(() => heart.classList.add('pop'));
    heart.textContent = hearts === 5 ? '爱心收集完成 💗' : `收下这份心意（${hearts}/5） ♡`;
    document.querySelector('#soft-count').textContent = hearts === 5 ? 'My Melody 把一颗小爱心交给你啦：今天也请好好照顾自己。' : `再点 ${5 - hearts} 次，收好这颗小爱心。`;
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
if (mode === 'slow' && document.querySelector('#cloud-game')) {
  const target=document.querySelector('#cloud-target'), score=document.querySelector('#cloud-score'), start=document.querySelector('#start-cloud'), result=document.querySelector('#cloud-result');
  let hits=0,seconds=15,timer=null;
  target.addEventListener('click',()=>{if(!timer)return;hits++;score.textContent=`接住 ${hits} 朵 · ${seconds} 秒`;target.style.left=`${5+Math.random()*78}%`;target.style.top=`${5+Math.random()*70}%`;});
  start.addEventListener('click',()=>{if(timer)return;hits=0;seconds=15;result.textContent='';start.disabled=true;timer=setInterval(()=>{seconds--;score.textContent=`接住 ${hits} 朵 · ${seconds} 秒`;if(seconds<=0){clearInterval(timer);timer=null;start.disabled=false;start.textContent='再玩一局';result.textContent=hits?`你接住了 ${hits} 朵云。玉桂狗说：今天也辛苦啦，慢慢走就好。`:'云朵溜走啦也没关系，玉桂狗说：今天已经很努力了。';}},1000);});
}
if (mode === 'slow' && document.querySelector('#start-breath')) {
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
if (mode === 'unsure' && document.querySelector('#memory-board')) {
 const board=document.querySelector('#memory-board'),status=document.querySelector('#memory-status'),symbols=['🎀','☁️','💜','🎀','☁️','💜'];let first=null,locked=false,pairs=0;
 function resetCards(){board.innerHTML='';first=null;locked=false;pairs=0;status.textContent='找到三对相同图案';[...symbols].sort(()=>Math.random()-.5).forEach((symbol,i)=>{const card=document.createElement('button');card.type='button';card.className='memory-card';card.dataset.symbol=symbol;card.setAttribute('aria-label',`翻开第 ${i+1} 张卡片`);card.innerHTML='<span class="memory-back">?</span><span class="memory-front"></span>';card.querySelector('.memory-front').textContent=symbol;card.addEventListener('click',()=>{if(locked||card.classList.contains('matched')||card===first)return;card.classList.add('flipped');if(!first){first=card;return;}locked=true;if(first.dataset.symbol===card.dataset.symbol){first.classList.add('matched');card.classList.add('matched');first=null;locked=false;pairs++;status.textContent=`配对成功 ${pairs}/3`;if(pairs===3){status.textContent='三对都找到了！Kuromi 给你一张小心情签';document.querySelector('#postcard-line').textContent='不用立刻弄懂所有感受，愿意停下来看看自己就已经很勇敢。';document.querySelector('#postcard-care').textContent='今天可以先选一件最轻松的小事做，剩下的留到明天。';document.querySelector('#postcard').classList.add('visible');}}else{status.textContent='没关系，再记一记卡片的位置';setTimeout(()=>{first.classList.remove('flipped');card.classList.remove('flipped');first=null;locked=false;},750);}});board.appendChild(card);});}
 document.querySelector('#memory-reset').addEventListener('click',resetCards);resetCards();
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
