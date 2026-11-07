(() => {
  const fine = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || reduced.matches) return;

  const root = document.createElement('div');
  root.className = 'cursor-root cursor-offscreen';
  root.setAttribute('aria-hidden', 'true');
  root.style.setProperty('--cursor-accent', '#874FFF');
  root.innerHTML = '<div class="cursor-rig"><div class="cursor-ring"></div><div class="cursor-caret"></div><span class="cursor-sticker">click</span></div>';
  document.body.append(root);
  document.documentElement.classList.add('custom-cursor-active');

  const rig = root.querySelector('.cursor-rig');
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  let previousX = x, previousY = y, frame = 0, target = null, state = 'default';
  const textSelector = 'p,h1,h2,h3,h4,li,blockquote,.eyebrow,.section-heading small,.experience-date,.experience-role,.project-description,.footer-copy,.footer-local span';

  function setState(next, element) {
    if (next === state && element === target) return;
    state = next;
    target = element;
    root.dataset.state = next;
    root.querySelector('.cursor-sticker').textContent = 'click';
    root.classList.toggle('cursor-native-zone', Boolean(element?.closest('[data-cursor="none"],input,textarea,select,[contenteditable="true"]')));
    if (next === 'text' && element) {
      const size = parseFloat(getComputedStyle(element).fontSize) || 16;
      root.style.setProperty('--cursor-text-h', `${Math.max(13, size)}px`);
    }
  }

  function move(event) {
    tx = event.clientX;
    ty = event.clientY;
    root.classList.remove('cursor-offscreen');
    const element = document.elementFromPoint(tx, ty);
    const clickable = element?.closest('a,button,[role="button"]');
    const text = element?.closest(textSelector);
    setState(clickable ? (clickable.matches('button,[role="button"]') ? 'button' : 'link') : text ? 'text' : 'default', element);
    if (!frame) frame = requestAnimationFrame(animate);
  }

  function animate() {
    const dx = tx - x, dy = ty - y;
    x += dx * .34;
    y += dy * .34;
    const vx = x - previousX, vy = y - previousY;
    previousX = x;
    previousY = y;
    const angle = Math.atan2(vy, vx) * 180 / Math.PI;
    const tilt = Math.max(-10, Math.min(10, angle * .12));
    const stretch = 1 + Math.min(.18, Math.hypot(vx, vy) * .018);
    rig.style.transform = `translate(-50%,-50%) rotate(${tilt}deg) scaleX(${stretch})`;
    root.style.transform = `translate3d(${x}px,${y}px,0)`;
    if (Math.abs(dx) > .15 || Math.abs(dy) > .15) frame = requestAnimationFrame(animate);
    else frame = 0;
  }

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', () => root.classList.add('cursor-pressed'));
  window.addEventListener('pointerup', () => root.classList.remove('cursor-pressed'));
  window.addEventListener('pointerleave', () => {
    root.classList.add('cursor-offscreen');
    setState('default', null);
  });
  fine.addEventListener?.('change', event => {
    if (!event.matches) { root.remove(); document.documentElement.classList.remove('custom-cursor-active'); }
  });
  reduced.addEventListener?.('change', event => {
    if (event.matches) { root.remove(); document.documentElement.classList.remove('custom-cursor-active'); }
  });
})();
