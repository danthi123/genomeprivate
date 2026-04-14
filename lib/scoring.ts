import { Persona, Weights, QUESTIONS } from './questions';

export type PersonaResult = {
  persona: Persona;
  band: string;
  headline: string;
  body: string;
  cta: string;
  stamp: string;
};

const ORDER: Persona[] = ['exposed', 'tech', 'hawk', 'parent', 'optimizer'];

export function scoreAnswers(answers: Record<string, number>): {
  persona: Persona;
  totals: Record<Persona, number>;
} {
  const totals: Record<Persona, number> = {
    hawk: 0, optimizer: 0, parent: 0, tech: 0, exposed: 0,
  };
  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx === undefined) continue;
    const w: Weights = q.answers[idx]?.weights ?? {};
    for (const k of Object.keys(w) as Persona[]) {
      totals[k] += w[k] ?? 0;
    }
  }
  let winner: Persona = ORDER[0];
  let best = -Infinity;
  for (const p of ORDER) {
    if (totals[p] > best) { best = totals[p]; winner = p; }
  }
  return { persona: winner, totals };
}

export const RESULTS: Record<Persona, PersonaResult> = {
  hawk: {
    persona: 'hawk',
    band: 'Classification \u2014 Privacy Hawk',
    stamp: 'Low exposure',
    headline: 'Your genome is still yours.',
    body:
      'You treat genetic data the way a cryptographer treats a private key. You have avoided the consumer-genomics trap, and if a relative has not uploaded, the familial inference surface stays narrow. The open question is not whether to protect your genome \u2014 you already do \u2014 but what you do if you ever decide to have it sequenced, and whether you pick a lab whose business model cannot flip on you under bankruptcy pressure.',
    cta: 'Read how PrivDNA is structured to stay aligned with you',
  },
  tech: {
    persona: 'tech',
    band: 'Classification \u2014 Tech Executive',
    stamp: 'Contained exposure',
    headline: 'You already applied data hygiene. Good.',
    body:
      'The account is deleted, the destruction request is filed, and you understand that the bankruptcy buyer inherited the database regardless. What you cannot undo is the raw file if it ever left the original silo. The calculus now is the same one you apply at work: treat the genome like a long-lived credential \u2014 where it lives, who holds custody, and whether the vendor is physically incapable of betraying you, not just contractually unwilling.',
    cta: 'See the threat model and custody chain PrivDNA publishes',
  },
  parent: {
    persona: 'parent',
    band: 'Classification \u2014 Informed Parent',
    stamp: 'Familial exposure',
    headline: 'The decision is not only about you.',
    body:
      'A genome reveals siblings, parents, and \u2014 most importantly \u2014 children. When you pick a sequencing provider, you are making a custody choice on behalf of people who cannot yet consent. Carrier screening and pediatric-relevant variants are real reasons to sequence. They are also reasons to refuse any vendor whose revenue model depends on keeping your family\u2019s data on hand.',
    cta: 'See the family-package pricing and the destruction protocol',
  },
  optimizer: {
    persona: 'optimizer',
    band: 'Classification \u2014 Health Optimizer',
    stamp: 'Moderate exposure',
    headline: 'You invested in the upside. Now close the downside.',
    body:
      'You have spent real money on longevity work \u2014 panels, concierge medicine, continuous monitoring. The one asset you have not locked down is the single most identifying and most permanent of the bunch. A $3,500 whole-genome sequence you actually control is a smaller line item than most of your existing health stack, and it is the only one that still matters when the vendor is gone.',
    cta: 'See how PrivDNA fits alongside your existing longevity stack',
  },
  exposed: {
    persona: 'exposed',
    band: 'Classification \u2014 Exposed',
    stamp: 'High exposure',
    headline: 'Your DNA is a corporate asset someone else owns.',
    body:
      'At least one copy of your genome, or enough of it to identify you, lives in a database you do not control. When 23andMe sold to TTAM/ChromeCo for $305M, the product being sold was the customers. If you are in one of those databases, your genome has already been relocated at least once without your signature \u2014 and future sales are legal, expected, and irreversible. You cannot undo uploads. You can choose not to add more.',
    cta: 'PrivDNA was built for people who scored here. See how it works.',
  },
};
