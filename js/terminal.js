// ── TERMINAL TYPEWRITER ──
// Animates the terminal lines one by one on page load.

const LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Ankit — Physics Student,Tribhuvan University Kathmandu' },
  { type: 'gap' },
  { type: 'cmd', text: 'whatilovetodo' },
  { type: 'out', text: 'Build tools where physics meets machine learning' },
  { type: 'gap' },
  { type: 'cmd', text: 'interests' },
  { type: 'out', text: 'Physics |AI | ML | Quantum Computing | Data Science |' },
  { type: 'gap' },
  { type: 'cmd', text: 'collaboration?' },
  { type: 'out', text: 'Let\'s model something meaningful together.' },
];

const PROMPT   = 'ankit@terminal:~$ ';
const DELAY_MS = 38;   // ms per character
const LINE_GAP = 180;  // ms between lines

function buildLine(line) {
  const el = document.createElement('div');

  if (line.type === 'gap') {
    el.style.height = '0.6rem';
    return el;
  }

  if (line.type === 'cmd') {
    el.innerHTML =
      `<span class="t-prompt">$ </span>` +
      `<span class="t-cmd"></span>`;
  } else {
    el.classList.add('t-out');
  }

  return el;
}

async function typeText(el, text) {
  for (const ch of text) {
    el.textContent += ch;
    await sleep(DELAY_MS);
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runTerminal() {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  // Add the static header prompt line
  const headerLine = document.createElement('div');
  headerLine.innerHTML = `<span class="t-prompt">ankit@terminal:~</span>`;
  body.appendChild(headerLine);

  await sleep(400);

  for (const line of LINES) {
    const el = buildLine(line);
    body.appendChild(el);

    if (line.type === 'cmd') {
      await sleep(120);
      await typeText(el.querySelector('.t-cmd'), line.text);
      await sleep(LINE_GAP);
    } else if (line.type === 'out') {
      await typeText(el, line.text);
      await sleep(80);
    }
    // gap: just wait a moment
    else {
      await sleep(60);
    }

    // keep terminal scrolled to bottom
    body.scrollTop = body.scrollHeight;
  }

  // blinking cursor at the end
  const cursor = document.createElement('div');
  cursor.innerHTML = `<span class="t-prompt">$ </span><span class="t-cursor"></span>`;
  body.appendChild(cursor);
}

document.addEventListener('DOMContentLoaded', runTerminal);
