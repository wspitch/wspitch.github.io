(() => {
  const id = document.body.dataset.projectId;
  const root = document.body.dataset.root || '';
  const host = document.querySelector('[data-project-detail]');
  const all = window.projectData || {selected:[],more:[],sandbox:[]};
  const cardData = [...all.selected, ...(all.more || []), ...all.sandbox].find(project => project.id === id);
  if (!id || !host || !cardData) return;

  fetch(`${root}content/projects/${id}.md?v=20261107`)
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
    const pieces = {eyebrow,title,meta,lead,hero};
    for (const piece of item.heroOrder || ['eyebrow','title','meta','lead','hero']) if (pieces[piece]) opening.append(pieces[piece]);
    host.append(opening);
    renderSections(item.sections);
    if (item.source) {
      const ref = document.createElement('p'); ref.className = 'case-source';
      ref.append(document.createTextNode('Reference: '));
      const link = makeText('a','body-link','Mingjin’s original page ↗'); link.href = item.source; link.target='_blank'; link.rel='noopener noreferrer'; ref.append(link); host.append(ref);
    }
    const back = makeText('a','back-link',cardData.route.startsWith('sandbox/') ? '← Back to etc' : '← Back to Selected Projects');
    back.href = root + (cardData.route.startsWith('sandbox/') ? 'sandbox.html' : 'index.html#work'); host.append(back);
  }

  function renderSections(markdown) {
    markdown = markdown.replace(/<!--[\s\S]*?-->/g, '');
    let section = null, list = null, paragraph = [], sectionTitle = '', glanceList = null;
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
    for (const raw of markdown.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line) { flushParagraph(); endList(); continue; }
      if (line.startsWith('## ')) {
        flushParagraph();
        section = document.createElement('section'); section.className='case-section case-section--text';
        sectionTitle = line.slice(3).trim().toLowerCase(); glanceList = null;
        const content=document.createElement('div'); content.className='case-section-content';
        const heading=makeText('h2','case-section-title',line.slice(3));
        heading.id=`case-section-${host.querySelectorAll('.case-section').length+1}`;
        section.setAttribute('aria-labelledby',heading.id); content.append(heading); section.append(content); host.append(section); section._content=content;
        if(sectionTitle==='at a glance'){ glanceList=document.createElement('dl'); glanceList.className='case-glance'; content.append(glanceList); }
        endList(); continue;
      }
      const target=getSection()._content || section;
      const glanceMatch = sectionTitle==='at a glance' && line.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
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
        if (image) target.append(makeMedia(image[2],image[1]));
        endList(); continue;
      }
      if (line.startsWith('- ')) {
        flushParagraph();
        if (!list) { list=document.createElement('ul'); list.className='impact-list'; target.append(list); }
        const li=document.createElement('li'); appendInline(li,line.slice(2)); list.append(li); continue;
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
    const clean=path.trim();
    if (!clean) return makeSlot('image',alt || 'Add an image');
    const src=/^(https?:|\/)/i.test(clean) ? clean : root+clean;
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(clean)) {
      const figure=document.createElement('div'); figure.className='media-slot media-slot--video media-slot--filled';
      const video=document.createElement('video'); video.src=src; video.controls=true; video.preload='metadata'; video.setAttribute('aria-label',alt || 'Project video'); figure.append(video); return figure;
    }
    const figure=document.createElement('div'); figure.className='media-slot media-slot--image media-slot--filled';
    const img=document.createElement('img'); img.src=src; img.alt=alt || ''; img.loading='lazy'; figure.append(img); return figure;
  }
  function makeSlot(type,label) {
    const figure=document.createElement('div'); figure.className=`media-slot media-slot--${type}`;
    figure.setAttribute('role',type==='video'?'group':'img'); figure.setAttribute('aria-label',label || 'Media placeholder');
    const kind=makeText('span','media-slot-type',type==='video'?'VIDEO':'IMAGE');
    const text=makeText('span','media-slot-label',label || 'Replace with approved media'); figure.append(kind,text); return figure;
  }
})();
