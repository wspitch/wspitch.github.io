---
title: Voice and hand interaction in augmented reality
eyebrow: RESEARCHER, EMBRY-RIDDLE AERONAUTICAL UNIVERSITY
meta: First author, HFES 2022 and Frontiers in Virtual Reality 2023 · Lab experiments on HoloLens 2
lead: Headsets are moving into real work, where typing and managing windows matter. I ran 2 HoloLens 2 studies, one on dictation in noisy rooms and one on managing many windows with hand tracking. Both ended at the same problem: people could not tell what the system was doing.
hero: assets/projects/mr-ar/figure-ux.jpg
heroAlt: Chart of average user experience scores from the multi-window study, with efficiency scoring lowest
---

## At a glance
**Role.** First author on both studies.
**Question.** What should a headset team fix first for voice and hand input?
**Method.** A counterbalanced dictation experiment and a task-based multi-window usability study with think-aloud, 20 people each, with standardized scales for usability, workload, and simulator sickness.
**Why these methods.** A counterbalanced experiment isolates the effect of noise on dictation, and think-aloud usability testing explains why hand-tracked window management feels difficult.
**Observed.** Dictation errors stayed at 2 to 5% across 3 noise levels, yet people couldn’t tell whether the system was slow or had stopped listening. Only 10 of 20 scrolled successfully.
**Interpreted.** Both studies converged on invisible system state: people could not tell what the headset was doing.
**Decided.** Show when the system is listening, when it has finished, and when a grab has registered, before adding features.

### Published as
- [“The effects of background noise on user experience and performance of mixed reality voice dictation”](https://doi.org/10.1177/1071181322661376), Proceedings of the Human Factors and Ergonomics Society Annual Meeting, 2022.
- [“Exploring the user experience (UX) of a multi-window augmented reality environment”](https://doi.org/10.3389/frvir.2023.1194019), Frontiers in Virtual Reality, 2023.

## Why these two studies, and how I ran them
Typing in the air is slow and tiring, so voice looks like the obvious fix. But I could not find tests of HoloLens 2 dictation in noisy rooms, and managing several windows with only your hands was just as unexamined. I chose both because they sit under most office tasks, so a problem in either would limit headsets for real work.

**Dictation.** 20 people spoke standard phrases at 3 background noise levels (40, 55, and 70 dB) that matched real offices. I counterbalanced the order and allowed no corrections, so errors came from the system and not from people fixing mistakes.

**Multi-window work.** Another 20 people worked through 16 scenarios covering editing a document, communicating, browsing, and gaming. There was no time limit, they could walk around the lab, and they thought aloud.

## Findings, and what a product team could do about them
**Both studies pointed at the same problem: people could not tell what the system was doing.** Each finding below is one version of it.


### Dictation held up, but user patience didn’t
I expected noise to wreck accuracy, because an earlier HoloLens 1 study ([Derby et al., 2020](https://doi.org/10.1177/1071181320641509)) found that dictation accuracy dropped once background noise reached 60 dB. On the HoloLens 2, errors stayed at 2 to 5% across all 3 levels. What changed was speed (about 47 words per minute at the quietest level, 41 at the loudest) and how it felt. People couldn’t tell whether the system was slow or had stopped listening, and some stopped mid-phrase to wait. One called the pause before dictation began “annoying.”

*A team could* show when the system is ready and when it has finished, and offer homophone choices when a word comes out wrong.

### Mental models transferred from laptops
Scrolling was the least successful task: 10 of 20 succeeded, 9 partly, and 1 failed. People expected trackpad scrolling, and the headset expected touchscreen swipes.

*A team could* add a visible scroll bar and 2-finger scrolling, and teach it in the tutorial.

### Success had no signal
Aiming at small targets from a distance was hard, and nothing told people whether a grab or a selection had registered.

*A team could* add richer audio and visual feedback.

### High enthusiasm, low efficiency
Novelty and stimulation rated excellent, and efficiency rated “bad.” After 40 to 50 minutes, simulator sickness scores were in the concerning range (near 18) in both studies, even though participants didn’t complain out loud.

*A team could* add a gallery view for windows and session-length reminders.


![Table of the most problematic hand-tracking interactions: air tap, direct touch and scrolling](assets/projects/mr-ar/hand-tracking-table.jpg)

## Explore the numbers
Both charts use only figures reported above. Try the 40 dB and 70 dB buttons to compare dictation speed.

{{explore:mr-ar}}

## Impact
- Both studies were published, at HFES 2022 and in Frontiers in Virtual Reality in 2023. On the second, I handled the ethics approval, recruitment, data curation, and quantitative analysis, and co-led data collection and qualitative analysis.
- The multi-window data is open on the [Open Science Framework](https://osf.io/e3u4n), so other teams have numbers to compare against.

## What I ruled out
- **Letting people correct dictation errors.** I allowed no corrections, so errors came from the system and not from people fixing mistakes.
- **Time limits and fixed paths in the multi-window study.** I set no time limit, let people walk around the lab, and had them think aloud.

## What I’d do differently
Both studies converged on invisible system state. If I ran them again, I would design around feedback from the start. I would also test speech-like background noise and older participants, because mine were all college-aged (average about 22), on one device, in a lab.
