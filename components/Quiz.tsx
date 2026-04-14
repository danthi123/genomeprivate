'use client';

import { useState, useCallback, useEffect, CSSProperties } from 'react';
import { QUESTIONS, Persona } from '@/lib/questions';
import { scoreAnswers, RESULTS } from '@/lib/scoring';
import { track } from '@/lib/rybbit';

type Phase = 'intro' | 'quiz' | 'result';

export default function Quiz() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const select = useCallback((qid: string, answerIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: answerIdx }));
  }, []);

  const advance = useCallback(() => {
    // Anonymous funnel step marker — no answer or persona data included.
    track('quiz_progress', { step: idx + 1 });
    setIdx((i) => (i < QUESTIONS.length - 1 ? i + 1 : i));
    if (idx >= QUESTIONS.length - 1) setPhase('result');
  }, [idx]);

  const back = useCallback(() => {
    setIdx((i) => (i > 0 ? i - 1 : i));
  }, []);

  const beginQuiz = useCallback(() => {
    track('quiz_start');
    setPhase('quiz');
  }, []);

  if (phase === 'intro') {
    return <Intro onBegin={beginQuiz} />;
  }

  if (phase === 'result') {
    const { persona, totals } = scoreAnswers(answers);
    return (
      <Result
        persona={persona}
        totals={totals}
        onRestart={() => {
          setAnswers({});
          setIdx(0);
          setPhase('intro');
        }}
      />
    );
  }

  const q = QUESTIONS[idx];
  const selected = answers[q.id];
  const canAdvance = selected !== undefined;
  const isLast = idx === QUESTIONS.length - 1;

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <div className="flex items-center justify-between mb-10 text-xs font-mono text-mute tracking-stamp uppercase">
        <span>File — GP/{String(idx + 1).padStart(2, '0')}</span>
        <span className="clip" aria-label={`Question ${idx + 1} of ${QUESTIONS.length}`}>
          {QUESTIONS.map((_, i) => (
            <span
              key={i}
              className="clip-tick"
              data-done={i < idx}
              data-current={i === idx}
            />
          ))}
        </span>
      </div>

      <div key={q.id} className="slide-in">
        <p className="font-mono text-xs tracking-stamp uppercase text-vermilion mb-4">
          {q.kicker}
        </p>
        <h2 className="font-display text-3xl md:text-5xl leading-[1.08] text-ink mb-10 max-w-2xl">
          {q.prompt}
        </h2>

        <fieldset className="space-y-0 border-t border-ink/15 mt-8">
          <legend className="sr-only">{q.prompt}</legend>
          {q.answers.map((a, i) => (
            <label
              key={i}
              className="dossier-option"
              data-selected={selected === i}
            >
              <input
                type="radio"
                name={q.id}
                className="sr-only"
                checked={selected === i}
                onChange={() => select(q.id, i)}
              />
              <span className="dossier-box" aria-hidden />
              <span className="font-mono text-sm md:text-base text-ink leading-relaxed">
                {a.label}
              </span>
            </label>
          ))}
        </fieldset>

        <div className="flex items-center justify-between mt-12">
          <button
            onClick={back}
            disabled={idx === 0}
            className="font-mono text-xs tracking-stamp uppercase text-mute hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Prior
          </button>
          <button onClick={advance} disabled={!canAdvance} className="btn-ink">
            {isLast ? 'File →' : 'Next →'}
          </button>
        </div>
      </div>
    </section>
  );
}

function Intro({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-28">
      <div
        className="flex items-start justify-between mb-16 enter"
        style={{ ['--enter-delay' as string]: '0s' } as CSSProperties}
      >
        <div className="font-mono text-xs tracking-stamp uppercase text-mute">
          <div>Dossier — Genome Private</div>
          <div className="mt-1">Classification pending</div>
        </div>
        <div className="stamp">Confidential</div>
      </div>

      <p
        className="font-mono text-xs tracking-stamp uppercase text-vermilion mb-6 enter"
        style={{ ['--enter-delay' as string]: '0.1s' } as CSSProperties}
      >
        Subject file / Six items
      </p>

      <h1
        className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-ink mb-10 enter"
        style={{ ['--enter-delay' as string]: '0.2s' } as CSSProperties}
      >
        How private
        <br />
        is <em className="italic">your</em> genome?
      </h1>

      <div
        className="font-mono text-[15px] md:text-base text-inkSoft max-w-xl leading-relaxed space-y-5 enter"
        style={{ ['--enter-delay' as string]: '0.35s' } as CSSProperties}
      >
        <p>
          In 2025, 23andMe declared bankruptcy and sold its customer database to TTAM/ChromeCo for{' '}
          <span
            className="redact"
            style={{ ['--redact-delay' as string]: '1.1s' } as CSSProperties}
          >
            $305 million
          </span>
          . The product being sold was the customers.
        </p>
        <p>
          This is a six-question intake on your own exposure. No email. No account. Nothing stored
          on a server. Answers live only in this browser tab until you close it.
        </p>
        <p className="text-mute text-sm">
          Thirty seconds. Compiled by{' '}
          <a
            href="https://privdna.com?utm_source=genomeprivate&utm_medium=quiz&utm_campaign=intro"
            className="underline decoration-vermilion underline-offset-4 hover:text-ink"
          >
            PrivDNA
          </a>
          .
        </p>
      </div>

      <div
        className="mt-14 enter"
        style={{ ['--enter-delay' as string]: '0.55s' } as CSSProperties}
      >
        <button onClick={onBegin} className="btn-ink">
          Open the file →
        </button>
      </div>

      <footer
        className="mt-28 pt-8 border-t border-ink/10 font-mono text-xs text-mute tracking-wider flex flex-wrap gap-x-6 gap-y-2 enter"
        style={{ ['--enter-delay' as string]: '0.75s' } as CSSProperties}
      >
        <span>Rev 2026-04</span>
        <span>No cookies</span>
        <span>
          <a
            href="https://github.com/rybbit-io/rybbit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Rybbit
          </a>{' '}
          analytics — cookieless, no PII
        </span>
        <span>Source on request</span>
      </footer>
    </section>
  );
}

function Result({
  persona,
  totals,
  onRestart,
}: {
  persona: Persona;
  totals: Record<Persona, number>;
  onRestart: () => void;
}) {
  const r = RESULTS[persona];

  // Fire completion marker once when the result screen renders. No persona
  // name in the event - outbound click to privdna.com is auto-tracked by
  // Rybbit and is sufficient for funnel analysis.
  useEffect(() => {
    track('quiz_complete');
  }, []);
  const shareText = encodeURIComponent(
    `I was classified "${r.stamp}" on the genome privacy dossier. What about you?`,
  );
  const shareUrl = 'https://genomeprivate.com';

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="flex items-start justify-between mb-12 enter">
        <div className="font-mono text-xs tracking-stamp uppercase text-mute">
          <div>File closed</div>
          <div className="mt-1">
            Genome Private / {new Date().toISOString().slice(0, 10)}
          </div>
        </div>
        <div className="stamp">{r.stamp}</div>
      </div>

      <p
        className="font-mono text-xs tracking-stamp uppercase text-vermilion mb-4 enter"
        style={{ ['--enter-delay' as string]: '0.1s' } as CSSProperties}
      >
        {r.band}
      </p>

      <h1
        className="font-display text-4xl md:text-6xl leading-[1.02] text-ink mb-10 max-w-2xl enter"
        style={{ ['--enter-delay' as string]: '0.2s' } as CSSProperties}
      >
        {r.headline}
      </h1>

      <div
        className="font-mono text-[15px] md:text-base text-inkSoft max-w-xl leading-relaxed mb-12 enter"
        style={{ ['--enter-delay' as string]: '0.35s' } as CSSProperties}
      >
        <p>{r.body}</p>
      </div>

      <div
        className="flex flex-col gap-4 items-start enter"
        style={{ ['--enter-delay' as string]: '0.5s' } as CSSProperties}
      >
        <a
          href={`https://privdna.com/?utm_source=genomeprivate&utm_medium=quiz&utm_campaign=result_${persona}`}
          className="btn-ink"
        >
          {r.cta} →
        </a>
        <p className="font-mono text-xs tracking-stamp uppercase text-mute">
          Your genome. Your hands. No copies. · Waitlist open at privdna.com
        </p>
      </div>

      <div
        className="mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center gap-6 enter"
        style={{ ['--enter-delay' as string]: '0.7s' } as CSSProperties}
      >
        <span className="font-mono text-xs tracking-stamp uppercase text-mute">
          Distribute the file
        </span>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-stamp uppercase text-ink hover:text-vermilion"
        >
          Post to X ↗
        </a>
        <button
          onClick={onRestart}
          className="font-mono text-xs tracking-stamp uppercase text-ink hover:text-vermilion"
        >
          Restart dossier
        </button>
      </div>

      <details
        className="mt-14 font-mono text-xs text-mute enter"
        style={{ ['--enter-delay' as string]: '0.9s' } as CSSProperties}
      >
        <summary className="cursor-pointer tracking-stamp uppercase hover:text-ink">
          Show scoring detail
        </summary>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3 text-[11px]">
          {(Object.keys(totals) as Persona[]).map((k) => (
            <div key={k} className="border border-ink/15 p-3">
              <div className="uppercase tracking-stamp text-mute">{k}</div>
              <div className="mt-1 font-display text-2xl text-ink">{totals[k]}</div>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
