const moodNotes = {
  sunny: { icon: '🌸', text: '收到啦，今天请对自己温柔一点点。' },
  spark: { icon: '✨', text: '闪闪发光的你，今天也会遇见闪闪的小事。' },
  cloud: { icon: '☁️', text: '那就慢慢来吧，休息也是今天很棒的安排。' },
  mystery: { icon: '🎀', text: '不用急着给心情起名字，做自己就已经很好啦。' }
};
const fortunes = [
  '文雅今天的好运：喜欢的人刚好也想起了你。',
  '好运提示：一杯喜欢的饮料，会让普通的一天变可爱。',
  '今日宜：把小小的开心，认真收藏起来。',
  '宇宙刚刚说：赵文雅比自己想的还要可爱一点。',
  '今日份好运：会有人因为你，偷偷笑一下。',
  '兔兔提醒：先照顾好自己，好事就会慢慢靠近。',
  '今天的隐藏彩蛋：转角可能有一朵很好看的云。'
];
const cards = [...document.querySelectorAll('.mood-card')];
const message = document.querySelector('#mood-message');
const icon = document.querySelector('.result-icon');
cards.forEach(card => card.addEventListener('click', () => {
  cards.forEach(item => { item.classList.remove('selected'); item.setAttribute('aria-pressed', 'false'); });
  card.classList.add('selected'); card.setAttribute('aria-pressed', 'true');
  const note = moodNotes[card.dataset.mood];
  icon.textContent = note.icon; message.textContent = note.text;
}));
let lastFortune = -1;
document.querySelector('#fortune-button').addEventListener('click', () => {
  let next;
  do { next = Math.floor(Math.random() * fortunes.length); } while (next === lastFortune);
  lastFortune = next;
  const target = document.querySelector('#fortune-text');
  target.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300 });
  target.textContent = fortunes[next];
});


document.querySelector('#wish-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('#wish-input');
  const result = document.querySelector('#wish-result');
  const wish = input.value.trim();
  if (!wish) return;
  result.textContent = `收好啦，文雅。愿“${wish}”慢慢向你靠近。`;
  input.value = '';
});
