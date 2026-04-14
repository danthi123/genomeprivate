import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Genome Private',
  description:
    'How GenomePrivate handles your data. Cookieless analytics, no PII, quiz answers stay in your browser.',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <Link
        href="/"
        className="font-mono text-xs tracking-stamp uppercase text-mute hover:text-vermilion underline decoration-vermilion underline-offset-4 mb-12 inline-block"
      >
        ← Back to the file
      </Link>

      <header className="mb-16">
        <p className="font-mono text-xs tracking-stamp uppercase text-vermilion mb-3">
          Privacy Policy
        </p>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.02] text-ink mb-4">
          What we collect, and what we don&apos;t.
        </h1>
        <p className="font-mono text-xs tracking-stamp uppercase text-mute">
          Last updated: April 14, 2026
        </p>
      </header>

      <div className="space-y-10 font-mono text-[15px] text-inkSoft leading-relaxed">
        <section>
          <h2 className="font-display text-2xl text-ink mb-3">Who we are</h2>
          <p>
            GenomePrivate operates the public quiz at{' '}
            <span className="text-ink">genomeprivate.com</span>. It is a marketing
            asset for{' '}
            <a
              href="https://privdna.com"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              PrivDNA
            </a>
            , a privacy-sovereign whole genome sequencing service. This privacy
            policy describes what the quiz site collects, what it doesn&apos;t,
            and what rights you have.
          </p>
          <p className="mt-3">
            PrivDNA is the data controller for both sites. This policy applies only to{' '}
            <span className="text-ink">genomeprivate.com</span>. PrivDNA&apos;s own service —
            which handles your genome and your email if you join the waitlist — is
            covered by its{' '}
            <a
              href="https://privdna.com/privacy"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              privacy policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">What we collect</h2>

          <h3 className="text-ink font-semibold mt-5 mb-2">Your quiz answers</h3>
          <p>
            Nothing. The six answers live only in the browser tab you&apos;re
            reading this in, as React state. They are never sent to a server, never
            written to a cookie, never written to localStorage. They disappear when
            you close the tab.
          </p>

          <h3 className="text-ink font-semibold mt-5 mb-2">Anonymous analytics</h3>
          <p>
            We use{' '}
            <a
              href="https://github.com/rybbit-io/rybbit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              Rybbit
            </a>
            , a self-hosted, open-source, cookieless analytics platform. It
            records:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Page views</li>
            <li>Referrer and UTM parameters (where you came from)</li>
            <li>Browser, device type, operating system, and screen size</li>
            <li>Language preference</li>
            <li>City-level geographic location (derived transiently from your IP)</li>
            <li>Session duration and engagement metrics</li>
            <li>
              Custom funnel events —{' '}
              <code className="text-ink text-sm">quiz_start</code>,{' '}
              <code className="text-ink text-sm">quiz_progress</code> (with a step
              number 1–6),{' '}
              <code className="text-ink text-sm">quiz_complete</code>,{' '}
              <code className="text-ink text-sm">quiz_cta_click</code>.{' '}
              <span className="text-ink">
                No quiz answers, persona outcomes, or any other user-identifying
                data are included in these events.
              </span>
            </li>
          </ul>
          <p className="mt-3">
            Rybbit does not use cookies, does not fingerprint browsers, and does
            not assign persistent identifiers. Every visitor is anonymous by
            default — there is no way to link analytics data back to a specific
            individual. IP addresses are used transiently for geolocation and are
            not stored.
          </p>

          <h3 className="text-ink font-semibold mt-5 mb-2">Cloudflare</h3>
          <p>
            Our site is served through Cloudflare, which processes requests at the
            network edge. Cloudflare may temporarily log IP addresses and request
            metadata for security and performance purposes (DDoS protection, bot
            detection) under their own{' '}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              privacy policy
            </a>
            . We do not have access to individual IP addresses in Cloudflare logs.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">What we do not collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>No cookies (zero — not even analytics cookies)</li>
            <li>No email addresses</li>
            <li>No account system (there&apos;s nothing to sign up for)</li>
            <li>No advertising or tracking pixels</li>
            <li>No browser fingerprinting</li>
            <li>No third-party scripts beyond our self-hosted Rybbit tracker</li>
            <li>No IP address storage</li>
            <li>No cross-site tracking</li>
            <li>No quiz answer telemetry</li>
            <li>No persona-outcome telemetry</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">How we use the data we do collect</h2>
          <p>The anonymous analytics above are used for one purpose only:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Understand aggregate behavior — how many people complete the quiz,
              where traffic comes from, how the site performs — so we can improve
              the content
            </li>
          </ul>
          <p className="mt-3">
            We do not sell, rent, license, or share analytics data with any third
            party. We do not use it for advertising. We do not build profiles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">Data sharing</h2>
          <p>
            We do not share analytics data with anyone. Rybbit is self-hosted on
            infrastructure we control; no third-party data processor sees your
            activity. The only external service in the request path is Cloudflare,
            whose role and privacy policy are described above.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">Retention and deletion</h2>
          <p>
            Because Rybbit records no personal data and no persistent identifiers,
            there is nothing tied to you to retain or delete. Aggregate pageview
            and event counts are retained indefinitely for trend analysis. If you
            would like us to exclude your traffic going forward, we recommend
            enabling the{' '}
            <a
              href="https://globalprivacycontrol.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              Global Privacy Control
            </a>{' '}
            signal in your browser, which Rybbit honors.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">Security</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>All data in transit is encrypted via TLS 1.3 (enforced by Cloudflare)</li>
            <li>HSTS with 12-month max-age, includeSubDomains enabled</li>
            <li>No exposed ports — the site is reachable only via Cloudflare Tunnel</li>
            <li>
              The site source is{' '}
              <a
                href="https://github.com/danthi123/genomeprivate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
              >
                open source (MIT)
              </a>{' '}
              — you can audit exactly how your data is handled
            </li>
          </ul>
          <p className="mt-3">
            Security vulnerability reports: see our{' '}
            <a
              href="/.well-known/security.txt"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              security.txt
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">Your rights</h2>
          <p>Regardless of where you are located, you have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <span className="text-ink">Know</span> — what data we process about
              you (answer: none that identifies you personally)
            </li>
            <li>
              <span className="text-ink">Object</span> — opt out of analytics entirely
              via your browser&apos;s Global Privacy Control signal, a tracker-blocking
              extension, or private browsing mode
            </li>
            <li>
              <span className="text-ink">Lodge a complaint</span> — with your local
              data protection authority if you believe your rights have been violated
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights or ask a question, email{' '}
            <a
              href="mailto:contact@genomeprivate.com"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              contact@genomeprivate.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">For European visitors (GDPR)</h2>
          <p>
            If you are in the European Economic Area or United Kingdom, the General
            Data Protection Regulation applies.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <span className="text-ink">Legal basis:</span> analytics are processed
              under the{' '}
              <span className="text-ink">legitimate interests</span> basis (Article
              6(1)(f) GDPR) — specifically, the site operator&apos;s interest in
              understanding aggregate traffic to improve the site — balanced
              against the minimal privacy impact of fully anonymous, cookieless
              measurement.
            </li>
            <li>
              <span className="text-ink">Data controller:</span> PrivDNA, New York,
              NY, United States.{' '}
              <a
                href="mailto:contact@genomeprivate.com"
                className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
              >
                contact@genomeprivate.com
              </a>
              .
            </li>
            <li>
              <span className="text-ink">International transfers:</span> analytics
              data is processed on infrastructure located in the United States. The
              Rybbit instance is self-hosted; there is no third-party data
              processor outside the US.
            </li>
            <li>
              <span className="text-ink">Automated decision-making:</span> we do
              not use your data for automated decision-making or profiling. Quiz
              persona classification happens entirely in your browser and is not
              shared with us.
            </li>
            <li>
              <span className="text-ink">Supervisory authority:</span> you have the
              right to lodge a complaint with your local data protection authority.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">For California residents (CCPA / CPRA)</h2>
          <p>If you are a California resident, the CCPA (as amended by the CPRA) applies.</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <span className="text-ink">Categories of personal information collected:</span>{' '}
              none. The analytics data we receive does not meet the CCPA definition
              of personal information because it cannot reasonably be linked to any
              specific individual.
            </li>
            <li>
              <span className="text-ink">Sale or sharing of data:</span> we do{' '}
              <span className="text-ink">not</span> sell or share any data as
              defined under the CCPA/CPRA.
            </li>
            <li>
              <span className="text-ink">Right to opt out:</span> not applicable —
              we do not sell or share personal information. If you still wish to
              signal opt-out, we honor the{' '}
              <a
                href="https://globalprivacycontrol.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
              >
                Global Privacy Control
              </a>{' '}
              browser signal.
            </li>
            <li>
              <span className="text-ink">Non-discrimination:</span> we will not
              discriminate against you for exercising any of your CCPA rights.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">Children</h2>
          <p>
            The site is not directed to individuals under the age of 18. We do not
            knowingly collect personal data from children. Given that the site
            collects no personal data from anyone, this restriction is
            precautionary rather than operationally distinct.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">Changes to this policy</h2>
          <p>
            If we make material changes, we will update the &quot;Last updated&quot;
            date at the top of this page and commit the change to the{' '}
            <a
              href="https://github.com/danthi123/genomeprivate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              open-source repository
            </a>{' '}
            where the page source lives. You can see the full revision history
            there.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">Contact</h2>
          <p>
            For privacy-related questions or requests, email{' '}
            <a
              href="mailto:contact@genomeprivate.com"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              contact@genomeprivate.com
            </a>
            . Security disclosure: see our{' '}
            <a
              href="/.well-known/security.txt"
              className="text-ink underline decoration-vermilion underline-offset-4 hover:text-vermilion"
            >
              security.txt
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-20 pt-8 border-t border-ink/10">
        <p className="font-mono text-xs text-mute tracking-stamp uppercase">
          Your genome. Your hands. No copies.
        </p>
      </div>
    </main>
  );
}
