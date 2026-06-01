'use client';

import { useState, useEffect, useCallback } from 'react';
import React from 'react';

/* ─────────────────────────────────────────────────────────────
   Screen sequence & timing
───────────────────────────────────────────────────────────── */
const SCREENS = ['age', 'consent', 'demographics', 'waiting', 'hitster'] as const;
type Screen = typeof SCREENS[number];

const DURATIONS: Record<Screen, number> = {
  age:          4000,
  consent:      5000,
  demographics: 4000,
  waiting:      3000,
  hitster:      7000,
};

const LANDSCAPE_SCREENS = new Set<Screen>(['hitster']);

/* ─────────────────────────────────────────────────────────────
   Portrait screens — white card on black bg
───────────────────────────────────────────────────────────── */

function AppCard({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) {
  const g = (n: number) => n * scale;
  return (
    <div style={{
      background: '#000', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: `${g(10)}px`,
    }}>
      <div style={{
        background: '#fff', borderRadius: `${g(20)}px`, width: '100%',
        padding: `${g(14)}px`, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: `${g(9)}px`,
        maxHeight: '100%', overflow: 'hidden',
      }}>
        <img
          src="/images/projects/noten-neuronen-logo.svg"
          alt="Noten und Neuronen"
          style={{ width: `${g(78)}px`, height: `${g(78)}px`, objectFit: 'contain', flexShrink: 0, borderRadius: `${g(10)}px` }}
        />
        {children}
      </div>
    </div>
  );
}

function AgeScreen({ k, scale = 1 }: { k: number; scale?: number }) {
  const g = (n: number) => `${n * scale}px`;
  return (
    <AppCard scale={scale}>
      <div key={k} style={{ width: '100%', animation: 'nun-anim-land 0.55s cubic-bezier(0.34,1.4,0.64,1) both' }}>
        <p style={{ margin: `0 0 ${g(3)}`, fontSize: g(10), fontWeight: 700, color: '#111' }}>
          Alter <span style={{ color: '#FE1EFA' }}>*</span>
        </p>
        <p style={{ margin: `0 0 ${g(5)}`, fontSize: g(8), color: '#888' }}>Ihr Alter in Jahren</p>
        <div style={{
          border: '2px solid #FE1EFA', borderRadius: g(6),
          padding: `${g(6)} ${g(8)}`, fontSize: g(9), color: '#bbb', marginBottom: g(10),
        }}>z. B. 27</div>
        <div style={{
          background: '#FE1EFA', borderRadius: g(8), padding: g(9),
          textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: g(10),
        }}>Weiter →</div>
      </div>
    </AppCard>
  );
}

function useScrollDist(k: number) {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [dist, setDist] = React.useState(0);
  useEffect(() => {
    // Small delay to let the DOM paint first
    const t = setTimeout(() => {
      if (outerRef.current && innerRef.current) {
        const excess = innerRef.current.scrollHeight - outerRef.current.clientHeight;
        setDist(Math.max(0, excess));
      }
    }, 50);
    return () => clearTimeout(t);
  }, [k]);
  return { outerRef, innerRef, dist };
}

function ConsentScreen({ k, scale = 1 }: { k: number; scale?: number }) {
  const g = (n: number) => `${n * scale}px`;
  const { outerRef, innerRef, dist } = useScrollDist(k);
  return (
    <div style={{ background: '#000', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: g(10) }}>
      <div style={{ background: '#fff', borderRadius: g(20), width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: g(14), gap: g(8) }}>
        {/* Fixed logo */}
        <img src="/images/projects/noten-neuronen-logo.svg" alt="NNN"
          style={{ width: g(60), height: g(60), objectFit: 'contain', flexShrink: 0, borderRadius: g(8), alignSelf: 'center' }} />
        {/* Scrolling content */}
        <div ref={outerRef} style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div ref={innerRef} key={k} style={{
            '--scroll-dist': `-${dist}px`,
            animation: dist > 0 ? `nun-auto-scroll-consent ${DURATIONS.consent / 1000}s ease-in-out both` : 'none',
          } as React.CSSProperties}>
            <p style={{ margin: `0 0 ${g(3)}`, fontSize: g(8.5), fontWeight: 700, color: '#111' }}>
              Liebe Zuschauerin, lieber Zuschauer,
            </p>
            <p style={{ margin: `0 0 ${g(5)}`, fontSize: g(7), color: '#444', lineHeight: 1.45 }}>
              Herzlich willkommen bei <strong>„Noten und Neuronen: Musik für die Gehirngesundheit"</strong>!
              Im heutigen Konzert werden Sie Musik und Wissenschaft live erleben. Über diese Smartphone-App können Sie an Spielen teilnehmen und unsere Forschung unterstützen.
            </p>
            <p style={{ margin: `0 0 ${g(4)}`, fontSize: g(7), color: '#444', lineHeight: 1.4 }}>
              Sie werden gebeten, Ihre Emotionen zu beurteilen, Gedächtnisaufgaben zu lösen und Fragen zu Ihrer Person zu beantworten. Jedes Spiel wird Ihnen vor Beginn genau erklärt.
            </p>
            <p style={{ margin: `0 0 ${g(5)}`, fontSize: g(7), color: '#444', lineHeight: 1.4 }}>
              <strong>Freiwilligkeit und Anonymität.</strong> Die Teilnahme ist anonym und freiwillig und kann jederzeit ohne Angabe von Gründen beendet werden.
            </p>
            <p style={{ margin: `0 0 ${g(6)}`, fontSize: g(7), color: '#444', lineHeight: 1.4 }}>
              <strong>Risiken und Nutzen.</strong> Die Teilnahme birgt keine Risiken, die über die des alltäglichen Lebens hinausgehen. Alle Verfahren wurden vom Ethikrat der Max-Planck-Gesellschaft genehmigt.
            </p>
            <p style={{ margin: `0 0 ${g(6)}`, fontSize: g(7), color: '#444' }}>
              Mehr Informationen finden Sie <span style={{ color: '#FE1EFA', textDecoration: 'underline' }}>hier</span>.
            </p>
            {/* PDF button */}
            <div style={{ background: '#FE1EFA', borderRadius: g(6), padding: `${g(7)} ${g(10)}`, textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: g(8.5), marginBottom: g(8) }}>
              PDF herunterladen
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: `0 0 ${g(8)}` }} />
            {/* Checkboxes */}
            {[
              'Ich habe die Informationen gelesen und verstanden.',
              'Ich weiß, dass meine Teilnahme freiwillig und anonym ist und dass ich die Teilnahme jederzeit ohne Angabe von Gründen beenden kann.',
              'Ich stimme der Teilnahme und der Speicherung meiner Daten gemäß der Datenschutzrichtlinie zu.',
              'Ich möchte an Tag 2 teilnehmen und bin bereit, meine E-Mail-Adresse anzugeben.',
            ].map(text => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: g(5), marginBottom: g(5) }}>
                <div style={{ width: g(11), height: g(11), border: '1.5px solid #ccc', borderRadius: g(2), flexShrink: 0, marginTop: g(1) }} />
                <p style={{ margin: 0, fontSize: g(7), color: '#444', lineHeight: 1.35 }}>{text}</p>
              </div>
            ))}
            {/* Contact */}
            <div style={{ margin: `${g(6)} 0`, padding: `${g(8)} ${g(10)}`, background: '#f8f8f8', borderRadius: g(6) }}>
              <p style={{ margin: `0 0 ${g(3)}`, fontSize: g(7.5), fontWeight: 700, color: '#111' }}>Verantwortliche Wissenschaftlerin</p>
              <p style={{ margin: 0, fontSize: g(7), color: '#555', lineHeight: 1.5 }}>
                Apl. Prof. Dr. Daniela Sammler<br />
                Max-Planck-Institut für empirische Ästhetik<br />
                Grüneburgweg 14, 60322 Frankfurt am Main<br />
                <span style={{ color: '#FE1EFA' }}>notenundneuronen.prj@ae.mpg.de</span>
              </p>
            </div>
            {/* Submit */}
            <div style={{ background: '#FE1EFA', borderRadius: g(8), padding: g(9), textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: g(9.5) }}>
              Weiter →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LIKERT_ITEMS = [
  'Musik verbindet mich mit anderen Menschen.',
  'Ich werde emotional, wenn ich bestimmte Musikstücke höre.',
  'Musik bringt mich oft zum Tanzen.',
  'Musik hilft mir, mich zu entspannen.',
  'Manchmal kann es sein, dass ich ganz in die Musik eintauche.',
  'Ich gebe ziemlich viel Geld für Musik aus.',
];

function Dropdown({ label, scale }: { label: string; scale: number }) {
  const g = (n: number) => `${n * scale}px`;
  return (
    <div style={{ marginBottom: g(7) }}>
      <p style={{ margin: `0 0 ${g(3)}`, fontSize: g(8), color: '#333' }}>{label}</p>
      <div style={{ border: '1px solid #ddd', borderRadius: g(6), padding: `${g(5)} ${g(8)}`, fontSize: g(8), color: '#aaa', display: 'flex', justifyContent: 'space-between' }}>
        Bitte wählen… <span>▾</span>
      </div>
    </div>
  );
}

function DemographicsScreen({ k, scale = 1 }: { k: number; scale?: number }) {
  const g = (n: number) => `${n * scale}px`;
  const { outerRef, innerRef, dist } = useScrollDist(k);
  return (
    <div style={{ background: '#000', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: g(10) }}>
      <div style={{ background: '#fff', borderRadius: g(20), width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: g(14), gap: g(6) }}>
        <img src="/images/projects/noten-neuronen-logo.svg" alt="NNN"
          style={{ width: g(55), height: g(55), objectFit: 'contain', flexShrink: 0, borderRadius: g(8), alignSelf: 'center' }} />
        <div ref={outerRef} style={{ flex: 1, overflow: 'hidden' }}>
          <div ref={innerRef} key={k} style={{
            '--scroll-dist': `-${dist}px`,
            animation: dist > 0 ? `nun-auto-scroll-consent ${DURATIONS.demographics / 1000}s ease-in-out both` : 'none',
          } as React.CSSProperties}>
            <p style={{ margin: `0 0 ${g(8)}`, fontSize: g(11), fontWeight: 800, color: '#111' }}>
              Demographische Angaben
            </p>
            {/* Geschlecht */}
            <p style={{ margin: `0 0 ${g(4)}`, fontSize: g(8), fontWeight: 700, color: '#333' }}>
              Geschlecht <span style={{ color: '#FE1EFA' }}>*</span>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: g(4), marginBottom: g(8) }}>
              {['männlich', 'weiblich', 'divers', 'keine Angabe'].map(opt => (
                <div key={opt} style={{ border: '1px solid #ddd', borderRadius: g(5), padding: `${g(4)} ${g(5)}`, fontSize: g(7.5), color: '#444', display: 'flex', alignItems: 'center', gap: g(4) }}>
                  <div style={{ width: g(8), height: g(8), borderRadius: '50%', border: '1px solid #ccc', flexShrink: 0 }} />
                  {opt}
                </div>
              ))}
            </div>
            <Dropdown label="Höchster Bildungsabschluss" scale={scale} />
            <Dropdown label="Musikalischer Hintergrund" scale={scale} />
            <Dropdown label="Wie viele Jahre haben Sie täglich ein Instrument geübt?" scale={scale} />
            {/* Likert */}
            <p style={{ margin: `0 0 ${g(3)}`, fontSize: g(8), fontWeight: 700, color: '#333' }}>
              Musik in meinem Leben <span style={{ color: '#FE1EFA' }}>*</span>
            </p>
            <p style={{ margin: `0 0 ${g(5)}`, fontSize: g(7), color: '#777' }}>
              Bitte bewerten Sie jede Aussage auf einer Skala von 1 bis 5.
            </p>
            {LIKERT_ITEMS.map(item => (
              <div key={item} style={{ marginBottom: g(8) }}>
                <p style={{ margin: `0 0 ${g(4)}`, fontSize: g(7.5), color: '#333', lineHeight: 1.35 }}>{item}</p>
                <div style={{ display: 'flex', gap: g(3) }}>
                  {[1,2,3,4,5].map(n => (
                    <div key={n} style={{ flex: 1, border: '1px solid #ddd', borderRadius: g(4), padding: `${g(4)} 0`, textAlign: 'center', fontSize: g(8), color: '#555' }}>{n}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: g(2) }}>
                  <span style={{ fontSize: g(6), color: '#aaa' }}>stimme überhaupt nicht zu</span>
                  <span style={{ fontSize: g(6), color: '#aaa' }}>stimme vollkommen zu</span>
                </div>
              </div>
            ))}
            {/* Klatschen / Mitsingen */}
            {['Ich bin in der Lage, im Takt zu einer Melodie zu klatschen.',
              'Ich bin in der Lage, die richtigen Töne zu treffen, wenn ich zu einer Aufnahme mitsinge.',
            ].map(q => (
              <div key={q} style={{ marginBottom: g(7) }}>
                <p style={{ margin: `0 0 ${g(4)}`, fontSize: g(7.5), color: '#333', lineHeight: 1.35 }}>{q}</p>
                <div style={{ display: 'flex', gap: g(4) }}>
                  {['Ja', 'Nein', 'Weiß nicht'].map(opt => (
                    <div key={opt} style={{ flex: 1, border: '1px solid #ddd', borderRadius: g(5), padding: `${g(4)} ${g(3)}`, fontSize: g(7.5), color: '#444', display: 'flex', alignItems: 'center', gap: g(3) }}>
                      <div style={{ width: g(7), height: g(7), borderRadius: '50%', border: '1px solid #ccc', flexShrink: 0 }} />
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Dropdown label="Ihr Sitzbereich" scale={scale} />
            {/* Sitzplatz */}
            <p style={{ margin: `0 0 ${g(3)}`, fontSize: g(8), color: '#333' }}>Sitzplatz</p>
            <div style={{ display: 'flex', gap: g(5), marginBottom: g(7) }}>
              {['Ihre Reihe — z. B. 12', 'Ihr Platz — z. B. 7'].map(ph => (
                <div key={ph} style={{ flex: 1, border: '1px solid #ddd', borderRadius: g(5), padding: `${g(5)} ${g(6)}`, fontSize: g(7), color: '#aaa' }}>{ph}</div>
              ))}
            </div>
            <Dropdown label="Ihre Postleitzahl" scale={scale} />
            {/* Submit */}
            <div style={{ background: '#FE1EFA', borderRadius: g(8), padding: g(9), textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: g(9.5), marginBottom: g(4) }}>
              Absenden
            </div>
            <div style={{ textAlign: 'center', fontSize: g(8), color: '#888', padding: g(4) }}>← Zurück</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaitingScreen({ k, scale = 1 }: { k: number; scale?: number }) {
  const g = (n: number) => `${n * scale}px`;
  return (
    <AppCard scale={scale}>
      <div key={k} style={{
        width: '100%', animation: 'nun-anim-fade-in 0.45s ease both',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: g(10), paddingTop: g(8),
      }}>
        <div style={{
          width: g(28), height: g(28), borderRadius: '50%',
          border: `${3 * scale}px solid #eee`, borderTopColor: '#FE1EFA',
          animation: 'nun-spin 0.8s linear infinite',
        }} />
        <p style={{ margin: 0, fontSize: g(9), color: '#888', textAlign: 'center', lineHeight: 1.5 }}>
          Bitte warten,<br />das Programm beginnt gleich.
        </p>
      </div>
    </AppCard>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hitster landscape screen
───────────────────────────────────────────────────────────── */

// Matches the real app: white bg, large square cards on a horizontal line
const HITSTER_SONGS = [
  { num: 2, year: 1787, title: 'Don Giovanni',      by: 'W. A. Mozart',       color: '#F4A261', ok: true  },
  { num: 1, year: 2026, title: 'Selbstkomponiert',  by: 'UKBonn Orchester',   color: '#E63946', ok: false },
];

function HitsterScreen({ k, scale = 1 }: { k: number; scale?: number }) {
  const g = (n: number) => `${n * scale}px`;
  const cardSize = 80 * scale;

  return (
    <div key={k} style={{
      height: '100%', background: '#fff', display: 'flex',
      flexDirection: 'column', overflow: 'hidden',
      animation: 'nun-slide-in 0.45s ease both',
    }}>
      {/* Header — matches real app: magenta logo pill + "Hitster" label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: g(10),
        padding: `${g(8)} ${g(12)}`, flexShrink: 0,
      }}>
        <img
          src="/images/projects/noten-neuronen-logo-einzeilig.svg"
          alt="NNN"
          style={{ height: g(20), objectFit: 'contain' }}
        />
        <span style={{ fontSize: g(12), fontWeight: 700, color: '#111', letterSpacing: '0.01em' }}>
          Hitster
        </span>
      </div>

      {/* Timeline area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: `0 ${g(8)}`, position: 'relative' }}>
        {/* ZEITSTRAHL label */}
        <p style={{ margin: `0 0 ${g(10)}`, textAlign: 'center', fontSize: g(8), fontWeight: 700, color: '#111', letterSpacing: '0.12em' }}>
          ZEITSTRAHL
        </p>

        {/* Timeline row — horizontal line with cards centered on it */}
        <div style={{ position: 'relative', height: `${cardSize}px` }}>
          {/* The horizontal line */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0,
            height: '1.5px', background: '#111', transform: 'translateY(-50%)',
          }} />

          {/* Cards */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: g(8), height: '100%' }}>
            {HITSTER_SONGS.map(s => (
              <div key={s.num} style={{
                width: `${cardSize}px`, height: `${cardSize}px`,
                background: s.color, borderRadius: g(10),
                padding: g(6), display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', flexShrink: 0,
                boxShadow: `0 2px 8px rgba(0,0,0,0.2)`,
                border: s.ok ? `2px solid #4ADE80` : 'none',
                animation: 'nun-anim-land 0.55s cubic-bezier(0.34,1.4,0.64,1) both',
              }}>
                {/* Top row: number + verdict */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: g(7), fontWeight: 900, color: 'rgba(255,255,255,0.8)' }}>
                    #{s.num}
                  </span>
                  {s.ok && (
                    <span style={{ fontSize: g(9), color: '#4ADE80', fontWeight: 900 }}>✓</span>
                  )}
                </div>
                {/* Year — large */}
                <div>
                  <p style={{ margin: 0, fontSize: g(18), fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                    {s.year}
                  </p>
                  <p style={{ margin: `${g(2)} 0 0`, fontSize: g(7), fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.2 }}>
                    {s.title}
                  </p>
                  <p style={{ margin: 0, fontSize: g(6.5), color: 'rgba(255,255,255,0.7)' }}>
                    {s.by}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VERGANGENHEIT / ZUKUNFT labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: g(10) }}>
          <span style={{ fontSize: g(7.5), color: '#555', display: 'flex', alignItems: 'center', gap: g(3) }}>
            ◄ VERGANGENHEIT
          </span>
          <span style={{ fontSize: g(7.5), color: '#555', display: 'flex', alignItems: 'center', gap: g(3) }}>
            ZUKUNFT ►
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Cycling state hook — separates dimension flip from content swap
───────────────────────────────────────────────────────────── */
function usePhoneCycle() {
  const [screen, setScreen] = useState<Screen>('age');
  const [animKey, setAnimKey] = useState(0);
  // landscapeMode drives the CSS dimension transition independently of screen content
  const [landscapeMode, setLandscapeMode] = useState(false);
  const [faded, setFaded] = useState(false);

  const advance = useCallback(() => {
    const nextIdx = (SCREENS.indexOf(screen) + 1) % SCREENS.length;
    const nextScreen = SCREENS[nextIdx];
    const nextIsLandscape = LANDSCAPE_SCREENS.has(nextScreen);
    const currIsLandscape = LANDSCAPE_SCREENS.has(screen);
    const willRotate = nextIsLandscape !== currIsLandscape;

    if (willRotate) {
      // 1. Fade out
      setFaded(true);
      setTimeout(() => {
        // 2. Flip dimensions (CSS transition takes 700ms)
        setLandscapeMode(nextIsLandscape);
        // 3. Swap content halfway through the dimension transition
        setTimeout(() => {
          setScreen(nextScreen);
          setAnimKey(k => k + 1);
          // 4. Fade back in
          setFaded(false);
        }, 400);
      }, 200);
    } else {
      setScreen(nextScreen);
      setAnimKey(k => k + 1);
    }
  }, [screen]);

  useEffect(() => {
    const t = setTimeout(advance, DURATIONS[screen]);
    return () => clearTimeout(t);
  }, [screen, advance]);

  return { screen, animKey, landscapeMode, faded };
}

/* ─────────────────────────────────────────────────────────────
   Phone shell (reused at different scales)
───────────────────────────────────────────────────────────── */
function PhoneShell({ scale = 1, showLabel = false }: { scale?: number; showLabel?: boolean }) {
  const { screen, animKey, landscapeMode, faded } = usePhoneCycle();
  const g = (n: number) => n * scale;

  // landscapeMode drives dimensions — updates before content swap so the CSS
  // transition runs: portrait (260×558) → landscape (524×244)
  const pw = landscapeMode ? g(524) : g(260);
  const ph = landscapeMode ? g(244) : g(558);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${g(14)}px` }}>
      {/* Phone frame */}
      <div style={{
        width: `${pw}px`, height: `${ph}px`,
        background: '#111',
        borderRadius: `${g(landscapeMode ? 28 : 40)}px`,
        border: `${g(8)}px solid #2a2a2a`,
        overflow: 'hidden', position: 'relative',
        transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1), height 0.7s cubic-bezier(0.4,0,0.2,1), border-radius 0.7s ease, opacity 0.2s ease',
        boxShadow: `0 ${g(24)}px ${g(64)}px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)`,
        opacity: faded ? 0 : 1,
      }}>
        {/* Notch (portrait only) */}
        {!landscapeMode && (
          <div style={{
            position: 'absolute', top: `${g(10)}px`, left: '50%',
            transform: 'translateX(-50%)',
            width: `${g(60)}px`, height: `${g(5)}px`,
            background: '#2a2a2a', borderRadius: `${g(3)}px`, zIndex: 10,
          }} />
        )}

        {/* Screen content */}
        <div style={{ position: 'absolute', inset: 0, paddingTop: landscapeMode ? 0 : `${g(22)}px` }}>
          {screen === 'age'          && <AgeScreen k={animKey} scale={scale} />}
          {screen === 'consent'      && <ConsentScreen k={animKey} scale={scale} />}
          {screen === 'demographics' && <DemographicsScreen k={animKey} scale={scale} />}
          {screen === 'waiting'      && <WaitingScreen k={animKey} scale={scale} />}
          {screen === 'hitster'      && <HitsterScreen k={animKey} scale={scale} />}
        </div>

        {/* Home indicator */}
        {!landscapeMode && (
          <div style={{
            position: 'absolute', bottom: `${g(8)}px`, left: '50%',
            transform: 'translateX(-50%)',
            width: `${g(60)}px`, height: `${g(4)}px`,
            background: '#444', borderRadius: `${g(2)}px`,
          }} />
        )}
      </div>

      {/* Step dots */}
      <div style={{ display: 'flex', gap: `${g(6)}px` }}>
        {SCREENS.map(s => (
          <div key={s} style={{
            height: `${g(6)}px`,
            width: s === screen ? `${g(20)}px` : `${g(6)}px`,
            borderRadius: `${g(3)}px`,
            background: s === screen ? '#FE1EFA' : 'rgba(255,255,255,0.2)',
            transition: 'all 0.35s ease',
          }} />
        ))}
      </div>

      {showLabel && (
        <p style={{ margin: 0, fontSize: `${g(11)}px`, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textAlign: 'center' }}>
          {screen === 'age'          && 'Onboarding — Alter eingeben'}
          {screen === 'consent'      && 'Einwilligung & Datenschutz'}
          {screen === 'demographics' && 'Demographische Angaben'}
          {screen === 'waiting'      && 'Wartescreen zwischen Phasen'}
          {screen === 'hitster'      && 'Hitster — Zeitstrahl (Querformat)'}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main export — inline + click-to-modal
───────────────────────────────────────────────────────────── */
export default function PhoneMockup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        title="Klicken für größere Ansicht"
        style={{ cursor: 'zoom-in', display: 'flex', justifyContent: 'center', padding: '2rem 0', position: 'relative' }}
      >
        <PhoneShell scale={1} showLabel={false} />
        <div style={{
          position: 'absolute', bottom: '40px', right: 'calc(50% - 145px)',
          background: 'rgba(0,0,0,0.55)', borderRadius: '6px',
          padding: '3px 8px', fontSize: '10px', color: 'rgba(255,255,255,0.55)',
          pointerEvents: 'none',
        }}>⤢ vergrößern</div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', animation: 'ci-fadein 0.18s ease both',
            padding: '20px',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ cursor: 'default' }}>
            <PhoneShell scale={1.6} showLabel={true} />
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Schließen"
            style={{
              position: 'fixed', top: '1.25rem', right: '1.25rem',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', cursor: 'pointer', width: '38px', height: '38px',
              borderRadius: '50%', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>
      )}
    </>
  );
}
