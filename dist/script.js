const fortunes = [
  { line: '小雅不必一直表现得很厉害，松一口气也算今天的进度。', detail: '有些努力没有被看见，但它们没有白费。', action: '现在喝几口水，把肩膀放松一下。' },
  { line: '今天适合把喜欢的小事，留一点给自己。', detail: '喜欢的歌、舒服的衣服，都是认真生活的小证据。', action: '给自己留十分钟，做一件纯粹喜欢的事。' },
  { line: '没完成所有待办，也不影响你值得被喜欢。', detail: '清单可以明天继续，你不用靠忙碌证明自己。', action: '挑一件最小的事做完，然后就给自己打个勾。' },
  { line: '今天的小好运可能很普通，但也很珍贵。', detail: '刚好喝到喜欢的饮料，刚好听到一首好歌。', action: '路过窗边时抬头看看天，说不定有云朵彩蛋。' },
  { line: '慢慢走也会到，晚一点不代表错过。', detail: '你的节奏可以和别人不一样，依然很好。', action: '把下一步缩小一点，只做眼前这一小步。' },
  { line: '小雅的认真值得被看见，也值得被好好珍惜。', detail: '包括被你自己看见、被你自己温柔对待。', action: '睡前想一件今天做得不错的小事，哪怕很小。' }
];
const card = document.querySelector('#fortune-card');
const drawButton = document.querySelector('#fortune-button');
const saveButton = document.querySelector('#fortune-save');
const reveal = document.querySelector('#fortune-reveal');
const savedCount = document.querySelector('#fortune-count');
let currentFortune = null;
let lastFortune = -1;
let saved = [];
try { saved = JSON.parse(localStorage.getItem('xia-lucky-notes') || '[]'); } catch { saved = []; }
function updateSavedCount() { savedCount.textContent = `小雅收下了 ${saved.length} 份好运`; }
updateSavedCount();
drawButton.addEventListener('click', () => {
  let next;
  do { next = Math.floor(Math.random() * fortunes.length); } while (fortunes.length > 1 && next === lastFortune);
  lastFortune = next;
  currentFortune = next;
  const fortune = fortunes[next];
  document.querySelector('#fortune-text').textContent = '拆开看看，今天想送给你什么话。';
  document.querySelector('#fortune-line').textContent = fortune.line;
  document.querySelector('#fortune-detail').textContent = fortune.detail;
  document.querySelector('#fortune-action').textContent = `给今天的一件小事：${fortune.action}`;
  reveal.hidden = false;
  reveal.classList.remove('fortune-pop');
  requestAnimationFrame(() => reveal.classList.add('fortune-pop'));
  card.classList.add('is-open');
  drawButton.innerHTML = '<span>再翻一张</span><span aria-hidden="true">↻</span>';
  saveButton.hidden = false;
  saveButton.textContent = saved.includes(next) ? '这份好运已收好 ✓' : '把这份好运收好 ♡';
  saveButton.disabled = saved.includes(next);
});
saveButton.addEventListener('click', () => {
  if (currentFortune === null || saved.includes(currentFortune)) return;
  saved.push(currentFortune);
  try { localStorage.setItem('xia-lucky-notes', JSON.stringify(saved)); } catch {}
  saveButton.textContent = '收好啦，给心里留个小位置 ✓';
  saveButton.disabled = true;
  updateSavedCount();
});
document.querySelector('#wish-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('#wish-input');
  const result = document.querySelector('#wish-result');
  const wish = input.value.trim();
  if (!wish) return;
  result.textContent = `收好啦，小雅。愿“${wish}”慢慢向你靠近。`;
  result.classList.remove('wish-pop');
  requestAnimationFrame(() => result.classList.add('wish-pop'));
  input.value = '';
});
