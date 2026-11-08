---
title: Designing AI around values and harms
eyebrow: PHD RESEARCH, UNIVERSITY OF WASHINGTON
meta: First author, two DIS 2026 papers · Interviews, think-aloud studies, toolkit design
lead: Designers increasingly use generative AI to imagine new AI products, so one AI helps shape another. I studied how that changes the way designers reason about values and harms, then built the free AI Concept Envisioning (ACE) Toolkit from what I found. A company building AI for hiring adopted it on its own.
hero: assets/projects/values/cover.jpg
heroAlt: A grid of blue and green Value-Harm Cards from the toolkit
---

## At a glance
**Role.** First author and lead researcher, advised by Mark Zachry, with co-authors on each paper.
**Timeline.** Part of my PhD research.
**Methods.** Think-aloud sessions and interviews with 18 designers, a survey of 30, think-aloud sessions and interviews with 12, and a research-through-design process for the toolkit.
**The decision.** What would help designers weigh values and harms at the start of an AI concept, when changing course is still cheap.

## The question
The first ideas for a product tend to stick. They set what it is for, who it serves, and what it could hurt, and later work mostly refines those choices. Designers usually make these calls with little structured support, because most guidance arrives late or assumes AI expertise they may not have. I wanted to study that earliest moment, then build something for it.

### Published at DIS 2026
- [“How Designers Envision Value-Oriented AI Concepts with Generative AI”](https://doi.org/10.1145/3800645.3813053) reports how designers reason.
- [“AI Concept Envisioning Toolkit for Reflective Juxtaposition of Values and Harms”](https://doi.org/10.1145/3800645.3813054) reports the toolkit.

## Observing how designers reason
Eighteen designers, each with at least two years of experience and prior use of generative AI, spent 20 minutes ideating an AI-powered design tool with the AI tools they already used. Each began from one value they chose. I then interviewed every one of them for 45 minutes. Four of us coded all 18 transcripts and reconciled every disagreement. Only 4 of the 18 had designed AI products professionally.

I scoped the session narrowly on purpose, with one value and a short time, so I could isolate what happened to a single value. The tradeoff is that it hid how designers handle several values at once, and the paper says so.

![Pitch presenting at the DIS conference](assets/projects/values/dis-talk.jpg)

## What the evidence showed

### Designers sensed a problem before they could articulate it
Sixteen of 18 couldn’t translate a value into product features. They could still tell when something was off. One said, *“I couldn’t articulate exactly why, but I knew it wasn’t right.”* That intuition was more specific than any value statement I collected, and it suggests designers already hold judgment that tools should help them surface.

### The AI’s fluency was persuasive
Thirteen of 18 accepted suggestions because they sounded technical and matched the value. One designer said they ended up *“essentially letting one AI define the possibilities for another AI I was trying to design.”*

Most people chose efficiency, the value generative AI serves most fluently, and their sketches converged on similar workflow automation. The designers who stopped to question a suggestion found more problems.

## Designing the toolkit, and revising it twice
The [AI Concept Envisioning (ACE) Toolkit](http://bit.ly/ACEtoolkit) has three parts: an AI Capability Library, 24 Value-Harm Cards, and a Value-Tension Map. It starts from what should not happen and asks designers to set values and harms side by side.

![Blank and filled examples of the Value-Tension Map](assets/projects/values/tension-map.jpg)

### Version 1: a standalone website
I tested it with 30 designers. They rated it very useful (6.47 out of 7), but their likelihood to adopt it lagged (5.57), and 26 of 30 hesitated about leaving the tools they already worked in. **A tool people like can still go unopened.** So I rebuilt it inside FigJam, published it on the Figma Community, and added a print PDF for workshops.

### The sliders: an assumption that failed
I had given the cards numeric sliders, assuming numbers would help designers compare values. They did not. Twenty-one of 30 said the numbers felt arbitrary. As one put it, what is the difference between a 5 and a 6 on Trust? I removed the sliders and let discussion do the work.

### The redesign: when harm comes up
I tested the redesign with 12 designers across two design briefs, thinking aloud. Those who saw harm cues early made more substantive changes to their concepts than those who saw them late (3.26 vs. 1.84 on average). That is why the toolkit asks about harm at the start of a concept and not at review.

## Impact
- A company building an AI product for recruiting and hiring adopted the [ACE Toolkit](http://bit.ly/ACEtoolkit) without being asked. Community usage is modest, so an unprompted pickup is the strongest signal I have that it works outside a study.
- The toolkit is free on the Figma Community and runs inside FigJam, where designers already work.
- Two first-authored DIS 2026 papers, one on how designers work with generative AI and one on the toolkit, and the groundwork for my dissertation.

## What’s next
One value in a short session gave me clarity and hid collisions between values. That gap is where the Value-Tension Map came from, and it is the question I am studying next.
