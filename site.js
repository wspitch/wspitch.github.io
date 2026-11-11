(() => {
  const page = document.body.dataset.page || '';
  const root = document.body.dataset.root || '';
  const content = window.portfolioContent;
  const email = content?.email || '';
  const addText = (parent, tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    parent.append(node);
    return node;
  };
  const addInlineText = (parent, value) => {
    const pattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let cursor = 0;
    for (const match of value.matchAll(pattern)) {
      parent.append(document.createTextNode(value.slice(cursor, match.index)));
      const link = document.createElement('a');
      link.className = 'body-link'; link.href = match[2]; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = match[1]; parent.append(link);
      cursor = match.index + match[0].length;
    }
    parent.append(document.createTextNode(value.slice(cursor)));
  };
  if (content?.home) {
    const title = document.querySelector('[data-home-title]');
    const intro = document.querySelector('[data-home-intro]');
    const list = document.querySelector('[data-experience-list]');
    const availability = document.querySelector('[data-home-availability]');
    if (availability) {
      if (content.home.availability) {
        availability.textContent = content.home.availability;
        if (content.email) {
          availability.append(document.createTextNode(' '));
          const hello = document.createElement('a'); hello.className = 'body-link'; hello.href = `mailto:${content.email}`; hello.textContent = 'Say hello';
          availability.append(hello, document.createTextNode(' 👋🏻✨'));
        }
      } else availability.hidden = true;
    }
    const research = document.querySelector('[data-research-list]');
    if (research && content.home.research) content.home.research.forEach(item => {
      const row = document.createElement('div'); row.className = 'experience-row';
      addText(row, 'span', 'experience-date', item.date);
      const p = document.createElement('p'); p.className = 'experience-role'; addInlineText(p, item.text); row.append(p); research.append(row);
    });
    if (title) title.textContent = content.home.title;
    if (intro) intro.textContent = content.home.intro;
    if (list) content.home.news.forEach(item => {
      const row = document.createElement('div'); row.className = 'experience-row';
      addText(row, 'span', 'experience-date', item.date);
      addText(row, 'p', 'experience-role', item.text); list.append(row);
    });
  }
  if (content?.about) {
    const title = document.querySelector('[data-about-title]');
    const copy = document.querySelector('[data-about-copy]');
    if (title) title.textContent = content.about.title;
    if (copy) content.about.paragraphs.forEach(paragraph => {
      const node = document.createElement('p'); addInlineText(node, paragraph); copy.append(node);
    });
  }
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label','Main navigation');
  const navInner=document.createElement('div'); navInner.className='nav-inner';
  const navLinks=document.createElement('div'); navLinks.className='nav-links'; navLinks.id='primary-nav-links';
  const navToggle=document.createElement('button'); navToggle.className='nav-toggle'; navToggle.type='button';
  navToggle.setAttribute('aria-controls',navLinks.id); navToggle.setAttribute('aria-expanded','false'); navToggle.setAttribute('aria-label','Open menu');
  navToggle.innerHTML='<span></span><span></span><span></span>';
  const links = [
    ['pitch s.',root+'index.html','home'],
    ['ETC',root+'etc','sandbox'],
    ['ABOUT',root+'about.html','about'],
    ['LINKEDIN','https://linkedin.com/in/wspitch','external']
  ];
  for (const [label,href,id] of links) {
    const a=document.createElement('a');a.textContent=label;a.href=href;
    if(id===page){a.setAttribute('aria-current','page')}
    if(id==='external'){a.target='_blank';a.rel='noopener noreferrer'}
    if(id==='home')a.className='home-link';
    navLinks.append(a);
  }
  navInner.append(navLinks,navToggle); nav.append(navInner);
  document.body.insertBefore(nav,document.querySelector('main'));
  const setMenuOpen=(open,returnFocus=false)=>{
    navToggle.setAttribute('aria-expanded',String(open));
    navToggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    navLinks.classList.toggle('is-open',open);
    if(open) navLinks.querySelector('a:not(.home-link)')?.focus();
    else if(returnFocus) navToggle.focus();
  };
  navToggle.addEventListener('click',()=>setMenuOpen(navToggle.getAttribute('aria-expanded')!=='true'));
  navLinks.addEventListener('click',event=>{if(event.target.closest('a:not(.home-link)'))setMenuOpen(false)});
  nav.addEventListener('keydown',event=>{if(event.key==='Escape'&&navToggle.getAttribute('aria-expanded')==='true')setMenuOpen(false,true)});
  document.addEventListener('pointerdown',event=>{if(!nav.contains(event.target))setMenuOpen(false)});

  const footerRoot=document.querySelector('[data-site-footer]');
  if(footerRoot){
    footerRoot.innerHTML=`<footer class="site-footer" data-sky="day"><div class="footer-sky" aria-hidden="true"></div><div class="footer-inner"><div class="footer-copy">Pitch Sinlapanuntakul © 2026</div><nav class="footer-actions" aria-label="Contact and resources"><button class="email-copy" type="button" data-email-copy>EMAIL</button><span class="footer-separator" aria-hidden="true">/</span><a href="https://scholar.google.com/citations?user=_RGPf2gAAAAJ&amp;hl=en" target="_blank" rel="noopener noreferrer">GOOGLE SCHOLAR</a><span class="footer-separator" aria-hidden="true">/</span><a href="${root}assets/Pitch-Sinlapanuntakul-Resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a></nav><div class="footer-local"><span class="footer-updated" data-updated hidden>Updated on <time data-updated-date></time></span><span class="footer-separator" data-updated-sep aria-hidden="true" hidden>|</span><span>Seattle <time data-seattle-time aria-label="Seattle time"></time></span></div></div><span class="copy-status" role="status" aria-live="polite"></span></footer>`;
  }
  const timeNode=document.querySelector('[data-seattle-time]');
  const updateTime=()=>{if(timeNode){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',timeZoneName:'short',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date());const value=Object.fromEntries(parts.map(part=>[part.type,part.value]));timeNode.textContent=`${value.timeZoneName} ${value.hour}:${value.minute}:${value.second}`}};
  const setSky=()=>{const footer=document.querySelector('.site-footer');if(!footer)return;const hour=Number(new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',hour:'2-digit',hourCycle:'h23'}).format(new Date()));footer.dataset.sky=hour>=21||hour<5?'night':hour<8?'dawn':hour<17?'day':'dusk'};
  updateTime();setSky();setInterval(updateTime,1000);setInterval(setSky,60000);

  const updatedNode=document.querySelector('[data-updated]');
  if(updatedNode){
    const showUpdated=iso=>{
      const date=new Date(iso); if(isNaN(date))return;
      const stamp=updatedNode.querySelector('time');
      stamp.dateTime=date.toISOString();
      stamp.textContent=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',month:'short',day:'numeric',year:'numeric'}).format(date);
      updatedNode.hidden=false; document.querySelector('[data-updated-sep]').hidden=false;
    };
    const fromFile=()=>fetch(`${root}assets/last-updated.json?v=${Date.now()}`).then(r=>r.json()).then(j=>showUpdated(j.date)).catch(()=>{});
    if(location.hostname==='wspitch.github.io'){
      fetch('https://api.github.com/repos/wspitch/wspitch.github.io/commits?per_page=1')
        .then(r=>r.ok?r.json():Promise.reject()).then(list=>showUpdated(list[0].commit.committer.date)).catch(fromFile);
    } else fromFile();
  }

  const emailButton=document.querySelector('[data-email-copy]');
  emailButton?.addEventListener('click',async()=>{
    const status=document.querySelector('.copy-status');
    let copied=false;
    try{await navigator.clipboard.writeText(email);copied=true}catch{
      const input=document.createElement('textarea');input.value=email;input.setAttribute('readonly','');input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();try{copied=document.execCommand('copy')}catch{}input.remove();
    }
    if(status)status.textContent=copied?'Copied':`Copy failed. Email: ${email}`;
    const sticker=document.querySelector('.cursor-sticker');
    if(copied&&sticker&&emailButton.matches(':hover'))sticker.textContent='copied';
  });

  const strip=document.querySelector('[data-photo-strip]');
  const toggle=document.querySelector('[data-photo-toggle]');
  if(strip&&toggle){
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){strip.classList.add('is-paused');toggle.textContent='Photos paused';toggle.setAttribute('aria-pressed','true');toggle.disabled=true}
    toggle.addEventListener('click',()=>{
      const paused=strip.classList.toggle('is-paused');
      toggle.textContent=paused?'Resume photos':'Pause photos';toggle.setAttribute('aria-pressed',String(paused));
    });
    strip.addEventListener('pointerenter',()=>strip.classList.add('is-paused'));
    strip.addEventListener('pointerleave',()=>{if(toggle.getAttribute('aria-pressed')==='false')strip.classList.remove('is-paused')});
    strip.addEventListener('focusin',()=>strip.classList.add('is-paused'));
    strip.addEventListener('focusout',e=>{if(!strip.contains(e.relatedTarget)&&toggle.getAttribute('aria-pressed')==='false')strip.classList.remove('is-paused')});
  }
})();
