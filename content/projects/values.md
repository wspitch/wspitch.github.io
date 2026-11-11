---
title: Designing AI around values and harms
eyebrow: PHD RESEARCH, UNIVERSITY OF WASHINGTON
meta: First author, 2 DIS 2026 papers · Interviews, think-aloud studies, toolkit design
lead: Designers increasingly use generative AI to imagine new AI products, so one AI helps shape another. I studied how that changes the way designers reason about values and harms, then built the free AI Concept Envisioning (ACE) Toolkit from what I found. A company building AI for hiring adopted it without being asked.
hero: assets/projects/values/cover.jpg
heroAlt: A grid of blue and green Value-Harm Cards from the toolkit
---

## At a glance
**Role.** First author and lead researcher, advised by Mark Zachry, with co-authors on each paper.
**Question.** What would help designers weigh values and harms at the start of an AI concept, when changing course is still cheap?
**Method.** Think-aloud sessions and interviews with 18 designers, a survey of 30, think-aloud sessions and interviews with 12, and research through design for the toolkit.
**Why these methods.** Think-aloud sessions capture reasoning as it happens, interviews probe it afterward, a survey tested adoption beyond the lab, and research through design let the toolkit change with each round of evidence.
**Observed.** 16 of 18 designers couldn’t translate a value into features, and 13 of 18 accepted AI suggestions because they sounded technical.
**Interpreted.** Designers already hold judgment that tools should help them surface, and an AI’s fluency can stand in for their own.
**Decided.** Build the ACE Toolkit around harm at the start of a concept, inside FigJam, without sliders.

## The question
The first ideas for a product tend to stick. They set what it is for, who it serves, and what it could hurt, and later work mostly refines those choices. Designers usually make these calls with little structured support, because most guidance arrives late or assumes AI expertise they may not have. I wanted to study that earliest moment, then build something for it.

### Published at DIS 2026
- [“How Designers Envision Value-Oriented AI Concepts with Generative AI”](https://doi.org/10.1145/3800645.3813053) reports how designers reason.
- [“AI Concept Envisioning Toolkit for Reflective Juxtaposition of Values and Harms”](https://doi.org/10.1145/3800645.3813054) reports the toolkit.

![Pitch presenting at the DIS conference](assets/projects/values/dis-talk.jpg#small)

## Part 1: how designers reason
18 designers, each with at least 2 years of experience and prior use of generative AI, spent 20 minutes ideating an AI-powered design tool with the AI tools they already used. Each began from one value they chose. I then interviewed every one of them for 45 minutes. 4 of us coded all 18 transcripts and reconciled every disagreement. Only 4 of the 18 had designed AI products professionally.

I scoped the session narrowly on purpose, with one value and a short time, so I could isolate what happened to a single value. The tradeoff is that it hid how designers handle several values at once, and the paper says so.

### Designers sensed a problem before they could articulate it
16 of 18 couldn’t translate a value into product features. They could still tell when something was off. One said, *“I couldn’t articulate exactly why, but I knew it wasn’t right.”* That intuition was more specific than any value statement I collected, and it suggests designers already hold judgment that tools should help them surface.

### The AI’s fluency was persuasive
13 of 18 accepted suggestions because they sounded technical and matched the value. One designer said they ended up *“essentially letting one AI define the possibilities for another AI I was trying to design.”*

Most people chose efficiency, the value generative AI serves most fluently, and their sketches converged on similar workflow automation. The designers who stopped to question a suggestion found more problems.

## Part 2: the toolkit, revised twice
Those 2 findings set the brief for the toolkit: help designers use their own judgment, and slow down the moment an AI’s answer sounds right. The [AI Concept Envisioning (ACE) Toolkit](http://bit.ly/ACEtoolkit) has 3 parts: an AI Capability Library, 24 Value-Harm Cards, and a Value-Tension Map. It starts from what should not happen and asks designers to set values and harms side by side.

![Blank and filled examples of the Value-Tension Map](assets/projects/values/tension-map.jpg)

| Round | Who | What I learned | What I changed |
|---|---|---|---|
| Version 1, standalone website | 30 designers | Rated very useful (6.47 of 7), likelihood to adopt lagged (5.57), and 26 of 30 hesitated to leave their tools | Rebuilt inside FigJam, published on the Figma Community, added a print PDF |
| Sliders on the cards | Same 30 | 21 of 30 said the numbers felt arbitrary | Removed the sliders and let discussion do the work |
| Redesign, 2 design briefs | 12 designers | Harm cues early led to more substantive changes than late (3.26 vs. 1.84 on average) | Ask about harm at the start of a concept, not at review |

**A tool people like can still go unopened.** The ratings alone would have told me to leave the website as it was. The hesitation told me where designers already worked.

I had assumed numbers would help designers compare values, and that assumption failed. As one designer put it, what is the difference between a 5 and a 6 on Trust? I used generative AI to help refine the 2 design briefs for the redesign test.

## Impact
- A company building an AI product for recruiting and hiring adopted the [ACE Toolkit](http://bit.ly/ACEtoolkit) without being asked. Community usage is modest, so an unprompted pickup is the strongest signal I have that it works outside a study.
- The toolkit is free on the Figma Community and runs inside FigJam, where designers already work.
- 2 first-authored DIS 2026 papers, one on how designers work with generative AI and one on the toolkit, and the groundwork for my dissertation.

## What I ruled out
- Studying several values at once. One value in a short session isolated what happened to that value and hid how designers handle several together.
- Numeric sliders on the cards. 21 of 30 designers said the numbers felt arbitrary, so I removed them.
- Keeping the toolkit as a standalone website. 26 of 30 hesitated about leaving the tools they already worked in, so I rebuilt it inside FigJam.

## What’s next
One value in a short session gave me clarity and hid collisions between values. That gap is where the Value-Tension Map came from, and it is the question I am studying next.
