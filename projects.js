// Card details only. Edit long-form case-study writing in content/projects/*.md.
window.projectData = {
  "selected": [
    {
      "id": "abacus",
      "name": "ABACUS Digital",
      "image": "assets/project-figma.svg",
      "description": "Finding the right product question for micro-business owners. Two months, no defined problem, and a notebook full of handwritten customer notes that redirected the concept. It earned a place on the product roadmap.",
      "route": "abacus.html",
      "order": 1,
      "accent": "#bcb2e5",
      "note": "(Internship)"
    },
    {
      "id": "values",
      "name": "Designing AI around values",
      "image": "assets/project-mmmm.svg",
      "description": "Designing AI around values and harms. Designers can feel harm before they can name a value, so I built a toolkit that starts there. A company building AI for hiring adopted it on its own.",
      "route": "values.html",
      "order": 2,
      "accent": "#ddc4ca"
    },
    {
      "id": "fortune-toolkit",
      "name": "Fortune 10 toolkit",
      "image": "assets/project-nng.svg",
      "description": "Checking the words a Fortune 10 company uses to ask about its products. A 250-person study cut a 108-word list to 99, and teams across the organization adopted the revised list.",
      "route": "fortune-toolkit.html",
      "order": 3,
      "accent": "#c7d4c4",
      "note": "(NDA)"
    },
    {
      "id": "fortune-materials",
      "name": "Fortune 10 materials",
      "image": "assets/project-blink.svg",
      "description": "How warm is too warm to touch? Lab studies behind material decisions on smart-home hardware, with every number redacted.",
      "route": "fortune-materials.html",
      "order": 4,
      "accent": "#dac4b4",
      "note": "(NDA)"
    },
    {
      "id": "mr-ar",
      "name": "Mixed and augmented reality",
      "image": "assets/project-sandbox-1.svg",
      "description": "Voice and hand interaction in mixed and augmented reality. Two published HoloLens 2 studies that landed on the same problem: people couldn't tell what the system was doing.",
      "route": "mr-ar.html",
      "order": 5,
      "accent": "#c4c2de"
    },
    {
      "id": "anatomyx",
      "name": "AnatomyX",
      "image": "assets/project-sandbox-2.svg",
      "description": "A mixed reality anatomy app, a beautiful body, and hands that couldn't quite grab it. I led a heuristic evaluation and user test on HoloLens 2.",
      "route": "anatomyx.html",
      "order": 6,
      "accent": "#c5d2d8"
    },
    {
      "id": "botnoi",
      "name": "Botnoi Group",
      "image": "assets/project-sandbox-3.svg",
      "description": "What I learned setting up UX research for two AI voice products, with a handbook, five mentored interns, and workshops on who a feature could help or harm.",
      "route": "botnoi.html",
      "order": 7,
      "accent": "#ded4bb",
      "note": "(Internship)"
    }
  ],
  "sandbox": [
    {
      "id": "design-jam",
      "name": "Future of AI-powered design",
      "image": "assets/project-sandbox-4.svg",
      "description": "A design jam with 11 UX designers, 3 industry partners, and a teaching approach published at IEEE ProComm 2025.",
      "route": "sandbox/design-jam.html",
      "order": 1,
      "accent": "#d5c7dc"
    },
    {
      "id": "teaching",
      "name": "Mentoring HCI capstone teams",
      "image": "assets/project-sandbox-5.svg",
      "description": "How I advise student teams at the University of Washington, with links to the teams' final concept videos.",
      "route": "sandbox/teaching.html",
      "order": 2,
      "accent": "#c8c8c4"
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
    const img=document.createElement('img'); img.src=root+item.image; img.alt=''; img.loading='lazy'; image.append(img);
    const copy=document.createElement('div'); copy.className='project-card__copy';
    const title=document.createElement('h3'); title.className='project-title'; title.textContent=item.name; copy.append(title);
    const desc=document.createElement('p'); desc.className='project-description'; desc.textContent=item.description; copy.append(desc);
    card.append(image,copy);list.append(card);
  }
});
