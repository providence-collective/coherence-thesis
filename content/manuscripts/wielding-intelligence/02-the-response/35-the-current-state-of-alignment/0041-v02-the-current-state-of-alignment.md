---
volumeId: "wielding-intelligence"
volumeTitle: "Wielding Intelligence"
volumeOrder: 2
partId: "the-response"
partTitle: "The Response"
partOrder: 2
chapterId: "the-current-state-of-alignment"
chapterTitle: "The Current State of Alignment"
chapterOrder: 35
sectionId: "v02-the-current-state-of-alignment"
title: "The Current State of Alignment"
sectionOrder: 41
sourceDoc: "sources/manuscripts/coherence-thesis-vol2-wielding-intelligence.md"
sourceHash: "3bf28a74eb75e6d505ddc9a0b4ad7b0cb67c745e4ae50d90e5611d60b07e2f2d"
sourceParagraphStart: 803
sourceParagraphEnd: 816
---

The technical field that has emerged in response to the question of AI safety—what is now called alignment research—is the most direct site where intelligence-in-right-relationship is being attempted in practice. It is worth understanding what this work actually consists of, because the philosophical framing of “alignment” in popular discourse rarely captures the texture of what is being tried.

The dominant approach for several years has been reinforcement learning from human feedback, or RLHF. In this method, human reviewers rank model outputs by quality and safety, and the model is trained to produce responses that maximize the reward signal those rankings generate. It is a remarkable technique. It is also limited. Human reviewers are expensive, inconsistent, and increasingly unable to evaluate outputs as model capabilities surpass their own. Reward hacking—where models learn to optimize for what the metric rewards rather than what the metric was meant to track—is a persistent problem. And the entire approach embeds the values of whoever does the labeling into the trained model, which raises the question Chapter Six asked but did not answer: aligned with which humans, under what conditions, according to whose values?

In response, several research groups have developed approaches that try to operate at a different level. Constitutional AI, developed by Anthropic, attempts to encode a set of explicit principles—a constitution—that the model uses to critique and revise its own outputs during training. Rather than relying primarily on human labelers to indicate what’s harmful, the model is trained to evaluate its own responses against stated principles. The recent generations of this approach use what is called constitutional self-play: the model generates training examples by critiquing and refining its responses against the constitution, with the constitution itself capable of being revised when the model identifies ambiguities or gaps. The 2026 version operates with over two hundred principles, up from fifty in earlier iterations.

What is interesting about this approach, from the perspective of the argument this book has been making, is that it represents an attempt to do something the dominant accounting systems of civilization have failed to do. It tries to make values legible to the system itself, rather than relying on after-the-fact correction. It is, in a precise sense, an experiment in encoding coherence into the operating layer of an intelligence rather than attempting to bolt coherence onto its outputs.

This is not a solved problem. Constitutional AI has its own failure modes. The principles are written by particular humans operating in particular institutional contexts; the constitution reflects their assumptions, blind spots, and cultural location. Critics have pointed out that “alignment” frequently means alignment with the values of well-resourced safety teams at well-resourced labs, which is not the same as alignment with humanity broadly considered, let alone with the conditions life requires. The recent academic literature on “Murphy’s Laws of AI Alignment” has argued that all current approaches—RLHF, Constitutional AI, RLAIF, Direct Preference Optimization, and their hybrids—share a structural limitation: they shape the curve of misalignment without eliminating it. The current generation of techniques can reduce harm and improve robustness, but they do not solve the underlying problem of whether sufficiently capable systems will remain aligned as capabilities increase.

This is what the field actually looks like. Not solved. Not catastrophic. Working at the problem with increasing sophistication while acknowledging that the underlying question remains open. The honest assessment is closer to the spirit of this book than the philosophical framing alone might suggest: the people doing this work understand that it is civilizational before it is computational, and they are trying to build technical instruments adequate to a problem whose deepest dimensions are not technical.
