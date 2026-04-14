export type Persona = 'hawk' | 'optimizer' | 'parent' | 'tech' | 'exposed';

export type Weights = Partial<Record<Persona, number>>;

export type Answer = {
  label: string;
  weights: Weights;
};

export type Question = {
  id: string;
  kicker: string;
  prompt: string;
  answers: Answer[];
};

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    kicker: 'Item 01 — Prior disclosure',
    prompt:
      'Have you ever sent a saliva sample to 23andMe, AncestryDNA, MyHeritage, or a similar consumer service?',
    answers: [
      { label: 'Yes, and the account is still active.', weights: { exposed: 3, optimizer: 1 } },
      { label: 'Yes, but I have since deleted the account.', weights: { tech: 2, hawk: 2 } },
      { label: 'No. Never.', weights: { hawk: 3 } },
    ],
  },
  {
    id: 'q2',
    kicker: 'Item 02 — Secondary distribution',
    prompt:
      'Have you uploaded your raw DNA file to GEDmatch, FamilyTreeDNA, or any other third-party matching service?',
    answers: [
      { label: 'Yes.', weights: { exposed: 3 } },
      { label: 'No.', weights: { hawk: 2 } },
      { label: 'I don\u2019t remember.', weights: { exposed: 1, optimizer: 1 } },
    ],
  },
  {
    id: 'q3',
    kicker: 'Item 03 — Familial overlap',
    prompt:
      'Has a close biological relative (parent, sibling, child) used a consumer DNA service?',
    answers: [
      { label: 'Yes, one or more.', weights: { exposed: 1, parent: 1 } },
      { label: 'Not that I know of.', weights: { hawk: 1 } },
      { label: 'No.', weights: { hawk: 2 } },
    ],
  },
  {
    id: 'q4',
    kicker: 'Item 04 — Response to the 2025 sale',
    prompt:
      'When 23andMe declared bankruptcy in 2025 and sold its customer database to TTAM/ChromeCo for $305M, what did you do?',
    answers: [
      { label: 'Deleted my account and requested data destruction.', weights: { tech: 3, hawk: 2 } },
      { label: 'I was a customer but took no action.', weights: { exposed: 3, optimizer: 1 } },
      { label: 'I wasn\u2019t a customer, so it didn\u2019t affect me.', weights: { hawk: 1 } },
      { label: 'I didn\u2019t know that happened.', weights: { optimizer: 1, parent: 1 } },
    ],
  },
  {
    id: 'q5',
    kicker: 'Item 05 — Downstream control',
    prompt:
      'If a future buyer of a bankrupt genomics company wanted to use your DNA for drug-target discovery, AI training, or law-enforcement matching — could you stop them?',
    answers: [
      { label: 'Yes. I control where my genome lives.', weights: { hawk: 3, tech: 2 } },
      { label: 'I\u2019m not sure.', weights: { optimizer: 2, parent: 2 } },
      { label: 'No. It\u2019s out of my hands now.', weights: { exposed: 3 } },
    ],
  },
  {
    id: 'q6',
    kicker: 'Item 06 — Intent',
    prompt: 'What brought you to this dossier today?',
    answers: [
      { label: 'Planning a family, pregnancy, or IVF.', weights: { parent: 3 } },
      { label: 'Personal health and longevity optimization.', weights: { optimizer: 3 } },
      { label: 'Curiosity after the 23andMe fallout.', weights: { exposed: 2, hawk: 1 } },
      { label: 'I work in tech or security and care about data hygiene.', weights: { tech: 3, hawk: 1 } },
    ],
  },
];
