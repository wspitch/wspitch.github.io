(() => {
  const id = document.body.dataset.projectId;
  const root = document.body.dataset.root || '';
  const host = document.querySelector('[data-project-detail]');
  const all = window.projectData || {selected:[],more:[],sandbox:[]};
  const cardData = [...all.selected, ...(all.more || []), ...all.sandbox].find(project => project.id === id);
  if (!id || !host || !cardData) return;

  fetch(`${root}content/projects/${id}.md?v=20261111a`)
    .then(response => {
      if (!response.ok) throw new Error(`Could not load content/projects/${id}.md`);
      return response.text();
    })
    .then(source => render(parseMarkdownFile(source)))
    .catch(error => {
      console.error(error);
      host.textContent = `Project copy could not load. Check that content/projects/${id}.md is present and preview the site through a local web server.`;
    });

  function parseMarkdownFile(source) {
    const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (!match) throw new Error('Project Markdown needs a frontmatter block between --- lines.');
    const meta = {meta:[]};
    let currentList = '';
    for (const line of match[1].split('\n')) {
      const listItem = line.match(/^\s+-\s+(.*)$/);
      if (listItem && currentList) { meta[currentList].push(unquote(listItem[1])); continue; }
      const field = line.match(/^([\w-]+):\s*(.*)$/);
      if (!field) continue;
      currentList = field[2] ? '' : field[1];
      if (!field[2]) meta[field[1]] = [];
      else if (field[1] === 'heroOrder') meta.heroOrder = field[2].split(',').map(part => part.trim());
      else if (field[1] === 'meta') meta.meta = [unquote(field[2])];
      else meta[field[1]] = unquote(field[2]);
    }
    meta.sections = match[2];
    return meta;
  }

  function unquote(value) {
    const text = value.trim();
    if (text.startsWith('"') && text.endsWith('"')) { try { return JSON.parse(text); } catch {} }
    return text;
  }

  function render(item) {
    document.title = `Pitch – ${cardData.name}`;
    const opening = document.createElement('header'); opening.className = 'case-opening';
    const title = makeText('h1','page-title',item.title || cardData.name);
    const eyebrow = makeText('p','case-eyebrow',item.eyebrow || '');
    const meta = document.createElement('div'); meta.className = 'detail-meta';
    for (const value of item.meta || []) meta.append(makeText('span','',value));
    const lead = makeText('p','case-lede',item.lead || '');
    const hero = document.createElement('figure'); hero.className = 'detail-art';
    const heroValue = item.hero || 'Add a wide project cover image';
    const hasHeroAsset = /^(https?:\/\/|\/|assets\/).+\.(png|jpe?g|gif|webp|svg|mp4|webm)(\?.*)?$/i.test(heroValue);
    if (hasHeroAsset) hero.append(makeMedia(heroValue,item.heroAlt || heroValue));
    else {
      hero.append(makeSlot('image',heroValue));
      hero.append(makeText('figcaption','','Replace this placeholder with a project image you are allowed to use.'));
    }
    const pieces = {eyebrow,title,meta,lead,hero:item.hero ? hero : null};
    for (const piece of item.heroOrder || ['eyebrow','title','meta','lead','hero']) if (pieces[piece]) opening.append(pieces[piece]);
    host.append(opening);
    renderSections(item.sections);
    const back = makeText('a','back-link',cardData.route.startsWith('etc/') ? '← Back to etc' : '← Back to Selected Projects');
    back.href = root + (cardData.route.startsWith('etc/') ? 'etc/' : 'index.html#work'); host.append(back);
  }

  function renderSections(markdown) {
    markdown = markdown.replace(/<!--[\s\S]*?-->/g, '');
    let section = null, list = null, paragraph = [], sectionTitle = '', glanceList = null, table = null;
    const flushParagraph = () => {
      if (!paragraph.length) return;
      const target = getSection()._content || section;
      const p = document.createElement('p'); p.className='case-copy'; appendInline(p,paragraph.join(' ')); target.append(p); paragraph=[];
    };
    const getSection = () => {
      if (!section) { section = document.createElement('section'); section.className='case-section case-section--text'; host.append(section); }
      return section;
    };
    const endList = () => { list = null; };
    let gallery = null, prevWasImage = false;
    for (const raw of markdown.split(/\r?\n/)) {
      const line = raw.trim();
      const isImageLine = /^!\[[^\]]*\]\([^)]*\)$/.test(line);
      if (!isImageLine) { gallery = null; prevWasImage = false; }
      if (!line) { flushParagraph(); endList(); continue; }
      if (line.startsWith('## ')) {
        flushParagraph();
        section = document.createElement('section'); section.className='case-section case-section--text';
        sectionTitle = line.slice(3).trim().toLowerCase(); glanceList = null; table = null;
        const content=document.createElement('div'); content.className='case-section-content';
        const heading=makeText('h2','case-section-title',line.slice(3));
        heading.id=`case-section-${host.querySelectorAll('.case-section').length+1}`;
        section.setAttribute('aria-labelledby',heading.id); content.append(heading); section.append(content); host.append(section); section._content=content;
        if(sectionTitle==='at a glance'||sectionTitle==='what i can share'){ glanceList=document.createElement('dl'); glanceList.className=sectionTitle==='at a glance'?'case-glance':'case-glance case-share'; content.append(glanceList); }
        endList(); continue;
      }
      const target=getSection()._content || section;
      const glanceMatch = (sectionTitle==='at a glance'||sectionTitle==='what i can share') && line.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
      if (line.startsWith('|')) {
        flushParagraph(); endList();
        const cells=line.replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
        if (cells.every(c=>/^:?-+:?$/.test(c))) continue;
        if (!table) { table=document.createElement('table'); table.className='case-table'; const wrap=document.createElement('div'); wrap.className='case-table-wrap'; wrap.append(table); target.append(wrap); table._head=true; }
        const tr=document.createElement('tr');
        cells.forEach(c=>{ const cell=document.createElement(table._head?'th':'td'); appendInline(cell,c); tr.append(cell); });
        table._head=false; table.append(tr); continue;
      }
      table=null;
      const explore = line.match(/^\{\{explore:([\w-]+)\}\}$/);
      if (explore) { flushParagraph(); const node=makeExplorable(explore[1]); if (node) target.append(node); endList(); continue; }
      if (glanceMatch) {
        flushParagraph();
        const row=document.createElement('div'); row.className='case-glance-row';
        row.append(makeText('dt','',glanceMatch[1].replace(/\.$/,'')));
        const value=document.createElement('dd'); appendInline(value,glanceMatch[2]); row.append(value); glanceList.append(row); endList(); continue;
      }
      if (line.startsWith('### ')) { flushParagraph(); target.append(makeText('h3','markdown-subtitle',line.slice(4))); endList(); continue; }
      if (line.startsWith('> ')) {
        flushParagraph();
        const quote=line.slice(2);
        const media=quote.match(/^(Image|Video) placeholder:\s*(.*)$/i);
        if (media) target.append(makeSlot(media[1].toLowerCase(),media[2]));
        else { const block=document.createElement('blockquote'); appendInline(block,quote); target.append(block); }
        endList(); continue;
      }
      if (line.startsWith('![ ') || line.startsWith('![')) {
        flushParagraph();
        const image=line.match(/^!\[([^\]]*)\]\(([^)]*)\)$/);
        if (image) {
          const media=makeMedia(image[2],image[1]);
          if (prevWasImage && gallery) gallery.append(media);
          else if (prevWasImage) {
            const prev=target.lastElementChild; gallery=document.createElement('div'); gallery.className='media-gallery';
            prev.replaceWith(gallery); gallery.append(prev,media);
          } else target.append(media);
          prevWasImage = true;
        }
        endList(); continue;
      }
      if (line.startsWith('- ')) {
        flushParagraph();
        if (!list) { list=document.createElement('ul'); list.className='impact-list'; target.append(list); }
        const li=document.createElement('li'); appendInline(li,line.slice(2)); list.append(li); list.classList.toggle('impact-list--cols',list.children.length>6); continue;
      }
      const video=line.match(/^\[Video: ([^\]]+)\]\(([^)]+)\)$/i);
      if (video) { flushParagraph(); target.append(makeMedia(video[2],video[1])); endList(); continue; }
      if (/^\*[^*].*\*$/.test(line)) {
        flushParagraph(); const p=document.createElement('p'); p.className='markdown-meta'; appendInline(p,line.slice(1,-1)); target.append(p); endList(); continue;
      }
      paragraph.push(line); endList();
    }
    flushParagraph();
  }

  function makeExplorable(name) {
    if (name !== 'mr-ar') return null;
    const box = document.createElement('div'); box.className = 'explore';
    const toggleGroup = (controls, activeButton) => controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button === activeButton)));
    const scroll = document.createElement('div'); scroll.className = 'explore-part';
    scroll.append(makeText('p', 'explore-title', 'Scrolling, 20 participants'));
    const dots = document.createElement('div'); dots.className = 'explore-dots';
    const people = [...Array(10).fill('success'), ...Array(9).fill('partial'), 'failed'];
    const names = {success: 'Succeeded', partial: 'Partly succeeded', failed: 'Failed'};
    people.forEach((kind, index) => { const dot = document.createElement('span'); dot.className = `explore-dot explore-dot--${kind}`; dot.dataset.kind = kind; dot.title = `Participant ${index + 1}: ${names[kind]}`; dots.append(dot); });
    const scrollRead = makeText('p', 'explore-readout', 'Select an outcome to highlight it. People expected trackpad scrolling, and the headset expected touchscreen swipes.'); scrollRead.setAttribute('aria-live', 'polite');
    const scrollControls = document.createElement('div'); scrollControls.className = 'explore-controls';
    [['success', 'Succeeded (10)', '10 of 20 scrolled successfully.'], ['partial', 'Partly (9)', '9 of 20 scrolled partly.'], ['failed', 'Failed (1)', '1 of 20 could not scroll.']].forEach(([kind, label, text]) => {
      const button = makeText('button', 'explore-chip', label); button.type = 'button'; button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        const on = button.getAttribute('aria-pressed') !== 'true';
        toggleGroup(scrollControls, on ? button : null);
        dots.classList.toggle('is-filtering', on);
        dots.querySelectorAll('.explore-dot').forEach(dot => dot.classList.toggle('is-on', on && dot.dataset.kind === kind));
        scrollRead.textContent = on ? text : 'Select an outcome to highlight it. People expected trackpad scrolling, and the headset expected touchscreen swipes.';
      });
      scrollControls.append(button);
    });
    scroll.append(scrollControls, dots, scrollRead);
    const speech = document.createElement('div'); speech.className = 'explore-part';
    speech.append(makeText('p', 'explore-title', 'Dictation, by background noise'));
    const bar = document.createElement('div'); bar.className = 'explore-bar'; const fill = document.createElement('span'); bar.append(fill);
    const speechRead = makeText('p', 'explore-readout', ''); speechRead.setAttribute('aria-live', 'polite');
    const speechControls = document.createElement('div'); speechControls.className = 'explore-controls';
    [['40 dB', 94.7, '47.4 words per minute, 2% word errors, perceived usability 78.9 (good). An earlier HoloLens 1 study found 6% errors at this level.'], ['55 dB', 86.7, '43.4 words per minute, 4% word errors, perceived usability 73.0. The HoloLens 1 study found 13% errors here.'], ['70 dB', 81.4, '40.7 words per minute, 5% word errors, perceived usability 68.3, and higher mental demand and effort. The HoloLens 1 study found 55% errors here.']].forEach(([label, width, text], i) => {
      const button = makeText('button', 'explore-chip', label); button.type = 'button'; button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => { toggleGroup(speechControls, button); fill.style.width = width + '%'; bar.classList.remove('is-empty'); speechRead.textContent = text; });
      speechControls.append(button); if (i === 0) button.click();
    });
    speech.append(speechControls, bar, speechRead);
    box.append(scroll, speech); return box;
  }

  function appendInline(parent,text) {
    const pattern=/(!\[([^\]]*)\]\(([^)]*)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
    let cursor=0;
    for (const match of text.matchAll(pattern)) {
      parent.append(document.createTextNode(text.slice(cursor,match.index)));
      if (match[1]?.startsWith('!')) parent.append(makeMedia(match[3],match[2]));
      else if (match[4]) {
        const link=makeText('a','body-link',match[4]); link.href=match[5];
        if (/^https?:/i.test(match[5])) { link.target='_blank'; link.rel='noopener noreferrer'; }
        parent.append(link);
      } else if (match[6]) parent.append(makeText('strong','',match[6]));
      else parent.append(makeText('em','',match[7]));
      cursor=match.index+match[0].length;
    }
    parent.append(document.createTextNode(text.slice(cursor)));
  }

  function makeText(tag,className,value) { const node=document.createElement(tag); if(className)node.className=className; node.textContent=value||''; return node; }
  function makeMedia(path,alt) {
    let clean=path.trim(); const small=/#small$/.test(clean); clean=clean.replace(/#small$/,'');
    if (!clean) return makeSlot('image',alt || 'Add an image');
    const src=/^(https?:|\/)/i.test(clean) ? clean : root+clean;
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(clean)) {
      const figure=document.createElement('div'); figure.className='media-slot media-slot--video media-slot--filled';
      const video=document.createElement('video'); video.src=src; video.controls=true; video.preload='metadata'; video.setAttribute('aria-label',alt || 'Project video'); figure.append(video); return figure;
    }
    const figure=document.createElement('div'); figure.className='media-slot media-slot--image media-slot--filled'+(small?' media-slot--small':'');
    const img=document.createElement('img'); img.src=src; img.alt=alt || ''; img.loading='lazy'; img.addEventListener('load',()=>{ if (img.naturalHeight) figure.style.setProperty('--ar',(img.naturalWidth/img.naturalHeight).toFixed(3)); }); img.addEventListener('error',()=>figure.replaceWith(makeSlot('image',alt || 'Image coming soon'))); figure.append(img); return figure;
  }
  function makeSlot(type,label) {
    const figure=document.createElement('div'); figure.className=`media-slot media-slot--${type}`;
    figure.setAttribute('role',type==='video'?'group':'img'); figure.setAttribute('aria-label',label || 'Media placeholder');
    const kind=makeText('span','media-slot-type',type==='video'?'VIDEO':'IMAGE');
    const text=makeText('span','media-slot-label',label || 'Replace with approved media'); figure.append(kind,text); return figure;
  }
})();
