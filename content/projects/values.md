---
title: Designing AI around values and harms
eyebrow: PHD RESEARCH, UNIVERSITY OF WASHINGTON
meta: First author, two DIS 2026 papers · Interviews, think-aloud studies, toolkit design
lead: Designers now use generative AI to dream up AI products, so one AI helps shape another. I studied what that does to how designers think about values and harms, then built a free toolkit from what I found. A company building AI for hiring adopted it on its own.
hero: assets/projects/values/cover.jpg
heroAlt: A grid of blue and green Value-Harm Cards from the toolkit
---

## At a glance
**Role.** First author and lead researcher, advised by Mark Zachry, with co-authors on each paper.
**Timeline.** Part of my PhD research.
**Methods.** Think-aloud sessions and interviews with 18 designers, a survey of 30, think-aloud sessions and interviews with 12, and a research-through-design process for the toolkit.
**The decision.** What would help designers weigh values and harms at the start of an AI concept, when changing course is still cheap.

![Pitch presenting at the DIS conference](assets/projects/values/dis-talk.jpg)

## The question
The first ideas for a product tend to stick. They decide what it’s for, who it serves, and what it could hurt. Designers usually make those calls with little structured help, since most guidelines show up later or assume AI expertise they don’t have. I wanted to look at that earliest moment, and then build something for it.

The two papers are [“How Designers Envision Value-Oriented AI Concepts with Generative AI”](https://doi.org/10.1145/3800645.3813053) and [“AI Concept Envisioning Toolkit for Reflective Juxtaposition of Values and Harms”](https://doi.org/10.1145/3800645.3813054), both at DIS 2026.

## Watching designers work
Eighteen designers, each with at least two years of experience and prior use of generative AI, spent 20 minutes ideating an AI-powered design tool with the AI tools they already used. Each started from one value they chose. I then interviewed every one of them for 45 minutes. Four of us coded all 18 transcripts and reconciled every disagreement. Only 4 of the 18 had designed AI products professionally.

I kept the session narrow on purpose, with one value and a short time, so I could watch what happened to a single value. That choice also hid how designers handle several values at once, and the paper says so.

## What surprised me

### Designers couldn’t name a value, but they could feel a wrong suggestion
Sixteen of 18 couldn’t turn a value into features. Even so, they could tell when something was off. One said, *“I couldn’t articulate exactly why, but I knew it wasn’t right.”* That unease was more specific than any value statement I collected.

### The AI was convincing
Thirteen of 18 accepted suggestions because they sounded technical and matched the value. One designer said they ended up *“essentially letting one AI define the possibilities for another AI I was trying to design.”*

Most people chose efficiency, which is the value generative AI serves most fluently, and their sketches converged on similar workflow automation. The designers who stopped to question a suggestion found more problems.

## Building the toolkit, and getting it wrong twice
The [toolkit](https://bit.ly/ACEtoolkit) has three parts: an AI Capability Library, 24 Value-Harm Cards, and a Value-Tension Map. It starts from what shouldn’t happen and asks designers to set values and harms side by side.

![Blank and filled examples of the Value-Tension Map](assets/projects/values/tension-map.jpg)

**The first version was a standalone website.** I tested it with 30 designers. They rated it very useful (6.47 out of 7), but their likelihood to adopt it lagged (5.57), and 26 of 30 hesitated about leaving the tools they already worked in. They liked it and might still never open it. So I rebuilt it inside FigJam and published it on the Figma Community, with a print PDF for workshops.

**I’d also given the cards numeric sliders**, assuming numbers would help designers compare values. They didn’t. Twenty-one of 30 said the numbers felt arbitrary. As one put it, what’s the difference between a 5 and a 6 on Trust? I removed the sliders and let discussion do the work.

I tested the redesign with 12 designers across two design briefs, thinking aloud. Those who saw harm cues early made more substantive changes to their concepts than those who saw them late (3.26 vs. 1.84 on average). That is why the toolkit asks about harm at the start of a concept and not at review.

## Impact
- A company building an AI product for recruiting and hiring adopted the toolkit without being asked. Community usage is modest, so an unprompted pickup is the strongest sign to me that it works outside a study.
- The toolkit is free on the Figma Community and runs inside FigJam, where designers already work.
- Two first-authored DIS 2026 papers, one on how designers work with generative AI and one on the toolkit, and the groundwork for my dissertation.

## What’s next
One value in a short session gave me clarity and hid collisions between values. That gap is where the Value-Tension Map came from, and it’s the question I’m studying next.
