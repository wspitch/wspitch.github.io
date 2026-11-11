// Card details only. Edit long-form case-study writing in content/projects/*.md.
window.projectData = {
  "selected": [
    {
      "id": "abacus",
      "name": "ABACUS Digital",
      "image": "assets/project-figma.svg",
      "imageAlt": "Illustration of a ranked list of questions with the top 3 checked and one decision circled",
      "description": "Scoped open-ended discovery research on micro-business owners to inform a product roadmap decision.",
      "route": "abacus.html",
      "order": 1,
      "accent": "#bcb2e5",
      "note": "(Internship, NDA)"
    },
    {
      "id": "values",
      "name": "Designing AI around values",
      "image": "assets/project-mmmm.svg",
      "imageAlt": "Illustration of a value card and a harm card held in tension by a wavy line",
      "description": "Led interview and think-aloud studies on how designers weigh AI values and harms, and built a toolkit that a company building hiring AI adopted on its own.",
      "route": "values.html",
      "order": 2,
      "accent": "#ddc4ca"
    },
    {
      "id": "fortune-toolkit",
      "name": "Google Product Impression Toolkit",
      "image": "assets/project-nng.svg",
      "imageAlt": "Illustration of a word list with some words struck out and new words added",
      "description": "Validated Google’s internal Product Impression Toolkit through a large-scale consumer survey, and teams across the company adopted the revised version.",
      "route": "fortune-toolkit.html",
      "order": 3,
      "accent": "#c7d4c4",
      "note": "(NDA)"
    },
    {
      "id": "fortune-materials",
      "name": "Google touch comfort",
      "image": "assets/project-blink.svg",
      "imageAlt": "Illustration of a fingertip above a surface warming from cool to hot, beside a timer",
      "description": "Ran lab experiments on touch comfort to inform material decisions for Google smart-home hardware.",
      "route": "fortune-materials.html",
      "order": 4,
      "accent": "#dac4b4",
      "note": "(NDA)"
    },
    {
      "id": "mr-ar",
      "name": "Augmented reality",
      "image": "assets/project-sandbox-1.svg",
      "imageAlt": "Illustration of a headset with 3 floating windows and a voice waveform",
      "description": "Published 2 first-authored HoloLens 2 studies on voice dictation and hand-tracked window management.",
      "route": "mr-ar.html",
      "order": 6,
      "accent": "#c4c2de"
    },
    {
      "id": "botnoi",
      "name": "Botnoi Group",
      "image": "assets/project-sandbox-3.svg",
      "imageAlt": "Illustration of a chat bubble beside a voice waveform",
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
      "name": "Future of AI-powered design",
      "image": "assets/project-sandbox-4.svg",
      "imageAlt": "Illustration of 3 sticky notes above a prototype frame",
      "description": "Designed and ran a design jam with 11 working designers, published as a teaching approach at IEEE ProComm 2025.",
      "route": "sandbox/design-jam.html",
      "order": 1,
      "accent": "#d5c7dc"
    },
    {
      "id": "teaching",
      "name": "Mentoring HCI capstone teams",
      "image": "assets/project-sandbox-5.svg",
      "imageAlt": "Illustration of a poster on an easel with a question bubble",
      "description": "Advised capstone teams and taught 7 HCDE and HCID courses at the University of Washington.",
      "route": "sandbox/teaching.html",
      "order": 2,
      "accent": "#c8c8c4"
    },
    {
      "id": "anatomyx",
      "name": "AnatomyX",
      "image": "assets/project-sandbox-2.svg",
      "imageAlt": "Illustration of a target with a cursor that has drifted away from where the hand points",
      "description": "Led a heuristic evaluation and user test of an augmented reality anatomy app to rank what its sponsor should fix first.",
      "route": "sandbox/anatomyx.html",
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
    const desc=document.createElement('p'); desc.className='project-description'; desc.textContent=item.description; copy.append(desc);
    card.append(image,copy);list.append(card);
  }
});
