---
volumeId: "architecting-providence"
volumeTitle: "Architecting Providence"
volumeOrder: 4
partId: "the-technological-architecture-in-detail"
partTitle: "The Technological Architecture in Detail"
partOrder: 4
chapterId: "the-current-state-of-the-technical-art"
chapterTitle: "The Current State of the Technical Art"
chapterOrder: 2
sectionId: "v04-the-current-state-of-the-technical-art"
title: "The Current State of the Technical Art"
sectionOrder: 3
sourceDoc: "sources/manuscripts/coherence-thesis-vol4-architecting-providence.md"
sourceHash: "295458a6e7380446984ce12ab6aeb18c3c9d59e6ad92c37b36f4249c6572fb74"
sourceParagraphStart: 783
sourceParagraphEnd: 794
---

Three major technical approaches to sovereign digital identity are currently at varying stages of development. Each has genuine relevance to Providence's identity layer requirements, and none fully satisfies those requirements in its current form.

Federated identity — the approach exemplified by protocols like OpenID Connect and systems like ActivityPub — allows identity to be established at one node of a network and recognized across other nodes. The federated approach preserves some sovereignty: participants control the node at which their identity is established, and the identity can persist across other services without being re-established at each. But the sovereignty is incomplete: the node at which identity is established can still revoke or alter the identity, and the federated standards do not prevent individual nodes from behaving in ways inconsistent with the constitutional principles as a condition of recognizing federated identity.

Self-sovereign identity — the approach built on decentralized identifier standards and verifiable credential frameworks — extends sovereignty further. In principle, participants hold their own cryptographic keys and can maintain their identity without dependence on any single node or institution. In practice, the user experience requirements of fully self-sovereign identity are demanding enough that widespread adoption has been limited, and the systems that have achieved adoption have typically introduced intermediaries that compromise the sovereignty the approach was designed to preserve.

Zero-knowledge cryptography — the approach that allows participants to prove claims about themselves without revealing the underlying data — addresses specific privacy requirements that federated and self-sovereign identity approaches do not fully satisfy. A participant who can prove that they are a member of a particular community, or that they have completed a particular developmental stage, without revealing their full identity profile to every system that requests verification, has a significantly more protected relationship to the identity infrastructure than a participant whose identity is stored and transmitted in recoverable form.

Providence's identity layer will likely incorporate elements of all three approaches, weighted toward those that offer the strongest sovereignty guarantees while remaining practically adoptable by participants who are not themselves technical specialists. The minimum viable identity architecture — the version that can be built and deployed while the fuller technical solutions continue to develop — must be honest about what it can and cannot guarantee, and the gap between what it guarantees and what the constitutional principles require must be visible and actively managed rather than obscured by reassuring language about eventual capability.
