// Card details only. Edit long-form case-study writing in content/projects/*.md.
window.projectData = {
  "selected": [
    {
      "id": "abacus",
      "tag": "Discovery research · survey · interviews · NDA",
      "name": "ABACUS Digital",
      "image": "assets/project-figma.svg",
      "imageAlt": "Pencil sketch of scattered dots narrowing through a funnel toward a phone prototype",
      "description": "Scoped open-ended discovery research on micro-business owners to inform a product roadmap decision.",
      "route": "abacus.html",
      "order": 1,
      "accent": "#bcb2e5",
      "note": "(Internship, NDA)"
    },
    {
      "id": "values",
      "tag": "AI and values · interviews, think-aloud, toolkit",
      "name": "Designing AI around values",
      "image": "assets/project-mmmm.svg",
      "imageAlt": "Pencil sketch of an axis chart with 3 sticky notes and a zigzag line between 2 of them",
      "description": "Led interview and think-aloud studies on how designers weigh AI values and harms, and built a toolkit that a company building hiring AI adopted on its own.",
      "route": "values.html",
      "order": 2,
      "accent": "#ddc4ca"
    },
    {
      "id": "fortune-toolkit",
      "tag": "Survey research · NDA",
      "name": "Google Product Impression Toolkit",
      "image": "assets/project-nng.svg",
      "imageAlt": "Pencil sketch of a stack of cards beside a checklist",
      "description": "Validated Google’s internal Product Impression Toolkit through a large-scale consumer survey, and teams across the company adopted the revised version.",
      "route": "fortune-toolkit.html",
      "order": 3,
      "accent": "#c7d4c4",
      "note": "(NDA)"
    },
    {
      "id": "fortune-materials",
      "tag": "Lab experiments · NDA",
      "name": "Google touch comfort",
      "image": "assets/project-blink.svg",
      "imageAlt": "Pencil sketch of a touchscreen with a fingertip and 3 sliders",
      "description": "Ran lab experiments on touch comfort to inform material decisions for Google smart-home hardware.",
      "route": "fortune-materials.html",
      "order": 4,
      "accent": "#dac4b4",
      "note": "(NDA)"
    },
    {
      "id": "mr-ar",
      "tag": "Lab experiments · HoloLens 2",
      "name": "Augmented reality",
      "image": "assets/project-sandbox-1.svg",
      "imageAlt": "Pencil sketch of a headset visor, a grid of 20 dots, and a pinching hand",
      "description": "Published 2 first-authored HoloLens 2 studies on voice dictation and hand-tracked window management.",
      "route": "mr-ar.html",
      "order": 6,
      "accent": "#c4c2de"
    },
    {
      "id": "botnoi",
      "tag": "Research setup · internship",
      "name": "Botnoi Group",
      "image": "assets/project-sandbox-3.svg",
      "imageAlt": "Pencil sketch of an open handbook, 5 stick figures, and a sound wave",
      "description": "Set up UX research for 2 AI voice products, with a handbook and 5 mentored interns, tied to a 28% increase in user base.",
      "route": "botnoi.html",
      "order": 5,
      "accent": "#ded4bb",
      "note": "(Internship)"
    }
  ],
  "sandbox": [
    {
      "id": "design-jam",
      "tag": "Co-design · published",
      "name": "Future of AI-powered design",
      "image": "assets/project-sandbox-4.svg",
      "imageAlt": "Pencil sketch of 3 sticky notes above a prototype frame",
      "description": "Designed and ran a design jam with 11 working designers, published as a teaching approach at IEEE ProComm 2025.",
      "route": "etc/design-jam.html",
      "order": 1,
      "accent": "#d5c7dc"
    },
    {
      "id": "teaching",
      "tag": "Teaching · 7 courses",
      "name": "Mentoring HCI capstone teams",
      "image": "assets/project-sandbox-5.svg",
      "imageAlt": "Pencil sketch of a poster on an easel",
      "description": "Advised capstone teams and taught 7 HCDE and HCID courses at the University of Washington.",
      "route": "etc/teaching.html",
      "order": 2,
      "accent": "#c8c8c4"
    },
    {
      "id": "anatomyx",
      "tag": "Heuristic evaluation · user test",
      "name": "AnatomyX",
      "image": "assets/project-sandbox-2.svg",
      "imageAlt": "Pencil sketch of a target with a cursor that has drifted away from where a hand points",
      "description": "Led a heuristic evaluation and user test of an augmented reality anatomy app to rank what its sponsor should fix first.",
      "route": "etc/anatomyx.html",
      "order": 3,
      "accent": "#c5d2d8"
    }
  ]
};

document.querySelectorAll('[data-project-list]').forEach(list => {
  const items = [...(window.projectData[list.dataset.projectList] || [])].sort((a,b)=>a.order-b.order);
  for (const item of items) {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.style.setProperty('--project-accent',item.accent);
    const root=document.body.dataset.root || '';
    card.href=root+item.route;
    card.setAttribute('aria-label',`${item.name}${item.note ? ' ' + item.note : ''}: ${item.description}`);
    const image=document.createElement('div'); image.className='project-image'; image.setAttribute('aria-hidden','true');
    const img=document.createElement('img'); img.src=root+item.image; img.alt=item.imageAlt||''; img.loading='lazy'; img.addEventListener('error',()=>img.remove()); image.append(img);
    const copy=document.createElement('div'); copy.className='project-card__copy';
    const title=document.createElement('h3'); title.className='project-title'; title.textContent=item.name; copy.append(title);
    if(item.tag){const tag=document.createElement('p'); tag.className='project-tag'; tag.textContent=item.tag; copy.append(tag);}
    const desc=document.createElement('p'); desc.className='project-description'; desc.textContent=item.description; copy.append(desc);
    card.append(image,copy);list.append(card);
  }
});
