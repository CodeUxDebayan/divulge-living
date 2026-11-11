/**
 * DIVULGE LIVING — The Golden Strand
 * A reel told by scroll: GSAP timelines over Lenis smooth scrolling.
 * Everything animated is transform, opacity or clip-path, so it stays light on every device.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/**
 * Lead Capture (Google Sheets via Apps Script) & Export Brochure Configuration.
 * Populate `appsScriptUrl` and `brochureUrl` once the Web App URL and PDF file are added.
 */
const LEAD_CAPTURE_CONFIG = {
    appsScriptUrl: '', // e.g. 'https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec'
    brochureUrl: '',   // e.g. '/divulge-living-brochure.pdf'
    brochureFilename: 'Divulge-Living-Export-Brochure.pdf',
    fallbackEmail: 'info@divulge-living.com',
};

// Review mode: motion always plays. Before launch set RESPECT_REDUCED_MOTION = true
// (and the matching flag in index.html) so visitors who ask for less motion get the static page.
const RESPECT_REDUCED_MOTION = false;
const reduceMotion = RESPECT_REDUCED_MOTION && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const isNarrow = () => window.innerWidth <= 720;

let lenis = null;
let filmPausedByVisitor = false;
let showMusicPrompt = () => {};
let hideMusicPrompt = () => {};
let openWhatsAppWithText = () => {};
const sound = createSound();

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.info(
            '%c Divulge Living %c Crafted with Golden Jute · Engineered by Debayan Mukherjee (https://www.linkedin.com/in/dev-web3000/) ',
            'background:#1D1510;color:#C9A46A;font-weight:600;padding:4px 8px;border-radius:2px 0 0 2px;',
            'background:#EDE4D3;color:#1D1510;padding:4px 8px;border-radius:0 2px 2px 0;'
        );
    } catch {}

    const bio = createBioConsole();
    initEmailObfuscation();
    initIndexPanel();
    initFilmToggle();
    initMusicPrompt();
    initSoundToggle();
    initCatalogInteractions();
    initEnquiryForm();
    initScrollTop();
    initWhatsAppModal();
    initYear();

    if (reduceMotion) {
        document.documentElement.classList.remove('motion');
        document.fonts.ready.then(() => {
            initStatic(bio);
            showMusicPrompt();
        });
        return;
    }
    document.fonts.ready.then(() => initMotion(bio));
});

/* ═══════════════════════════════════════════════════════════════
   MOTION
   ═══════════════════════════════════════════════════════════════ */
function initMotion(bio) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    initAnchors();
    initNav();
    initProgress();
    initTimecode();

    const entrance = prologue();
    initPluck();
    strand();
    nest();
    film();
    hands();
    soilReturn(bio);
    ledger();
    exchange();
    founders();
    colophon();
    headings();

    if (finePointer) {
        initCursor();
        initMagnetic();
    }

    const params = new URLSearchParams(window.location.search);
    const hasDeepTarget = Boolean(params.get('product') || window.location.hash === '#inquiryForm' || window.location.hash === '#deck' || window.location.hash === '#export' || window.location.hash === '#founders' || window.location.hash === '#exchange' || window.location.hash === '#hands');

    if (hasDeepTarget) {
        const intro = $('#intro');
        if (intro) intro.remove();
        entrance.progress(1);
        ScrollTrigger.refresh();
        showMusicPrompt();
        const targetSel = params.get('product') ? '#inquiryForm' : window.location.hash;
        const targetEl = targetSel ? $(targetSel) : null;
        if (targetEl) {
            requestAnimationFrame(() => {
                lenis.scrollTo(targetEl, { immediate: false, duration: 1.1 });
            });
        }
    } else {
        playIntro(() => entrance.play());
    }
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
}

/* Intro: the opening titles ──────────────────────────────────── */
function playIntro(onReveal) {
    const intro = $('#intro');
    const tc = $('#introTc');
    const count = $('#introCount');
    const progress = { v: 0 };
    const word = SplitText.create('.intro__word', { type: 'chars' });

    lenis.stop();
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'expo.out' },
        onComplete: () => {
            intro.remove();
            lenis.start();
            ScrollTrigger.refresh();
            showMusicPrompt();
        },
    })
        .from('.intro__slate span', { opacity: 0, y: 10, stagger: 0.1, duration: 0.8 }, 0)
        .to(progress, {
            v: 100, duration: 3.4, ease: 'power1.inOut',
            onUpdate: () => {
                count.textContent = String(Math.round(progress.v)).padStart(3, '0');
                tc.textContent = toTimecode((progress.v / 100) * 4);
            },
        }, 0)
        .fromTo('#introThread', { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.4, ease: 'power2.inOut' }, 0.15)
        .fromTo('.intro__bn', { opacity: 0, scale: 1.18, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.3 }, 0.35)
        .to('.intro__bn', { opacity: 0, scale: 0.94, filter: 'blur(10px)', duration: 0.6, ease: 'power2.in' }, 1.8)
        .to('.intro__thread', { opacity: 0.18, duration: 0.8, ease: 'power2.out' }, 1.9)
        .from(word.chars, { yPercent: 45, opacity: 0, stagger: 0.05, duration: 1.2 }, 2.05)
        .from('.intro__sub', { opacity: 0, y: 14, duration: 0.9 }, 2.6)
        .to('.intro__stage', { opacity: 0, duration: 0.5, ease: 'power2.in' }, 3.7)
        .to('.intro__half--top', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' }, 4.0)
        .to('.intro__half--bottom', { yPercent: 100, duration: 1.2, ease: 'expo.inOut' }, 4.0)
        .add(onReveal, 4.3);

    Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
        .then(() => tl.play());

    const skip = () => tl.timeScale(5);
    intro.addEventListener('click', skip);
    window.addEventListener('keydown', skip, { once: true });
}

/* Prologue: the title stays put; the arch opens into a cinemascope strip ─ */
function prologue() {
    const media = $('#heroMedia');
    const img = $('img', media);
    const lines = $$('.hero__line').flatMap((line) => SplitText.create(line, { type: 'lines', mask: 'lines' }).lines);

    const geo = isNarrow()
        ? {
            closed: 'inset(92% 5% 4% 5% round 240px 240px 0px 0px)',
            arch: 'inset(60% 5% 4% 5% round 240px 240px 12px 12px)',
            full: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
        }
        : {
            closed: 'inset(85% 5% 10% 55% round 360px 360px 0px 0px)',
            arch: 'inset(14% 5% 10% 55% round 360px 360px 12px 12px)',
            full: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
        };

    gsap.set(media, { clipPath: geo.arch });
    gsap.set(img, { scale: 1.15 });
    gsap.set(['.hero__title', '.hero__meta', '.hero__slogan-lockup'], { opacity: 1, yPercent: 0 });

    // Animate child elements for entrance so parent ScrollTrigger controls never inherit opacity: 0
    const entrance = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .from('.hero__meta span', { y: 14, opacity: 0, duration: 1, stagger: 0.08, clearProps: 'transform,opacity' }, 0.1)
        .from(lines, { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.2)
        .from(['.hero__slogan-kicker', '.hero__slogan', '.hero__cta-row'], { y: 20, opacity: 0, duration: 1, stagger: 0.08, clearProps: 'transform,opacity' }, 0.45)
        .fromTo(media, { clipPath: geo.closed }, { clipPath: geo.arch, duration: 1.8, ease: 'expo.inOut' }, 0.1)
        .from(img, { scale: 1.35, duration: 2.2 }, 0.1)
        .from('.hero__watermark img', { opacity: 0, scale: 0.95, duration: 1.8, ease: 'power2.out', clearProps: 'transform,opacity' }, 0.3)
        .from('.hero__strand', { opacity: 0, duration: 1.4, clearProps: 'opacity' }, 1)
        .from('.hero__hint, .hero__cue', { opacity: 0, duration: 1, clearProps: 'opacity' }, 1.4);

    const sloganLockup = $('.hero__slogan-lockup');
    gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '+=120%',
            pin: '.hero__pin',
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                if (sloganLockup) {
                    sloganLockup.style.pointerEvents = self.progress > 0.28 ? 'none' : 'auto';
                }
            },
        },
    })
        .fromTo(['.hero__title', '.hero__meta', '.hero__slogan-lockup'],
            { yPercent: 0, opacity: 1 },
            { yPercent: -35, opacity: 0, ease: 'power2.in', duration: 0.45 }, 0)
        .fromTo('.hero__watermark',
            { yPercent: 0, opacity: 0.22 },
            { opacity: 0, yPercent: -20, duration: 0.35, ease: 'power1.in' }, 0)
        .fromTo(media, { clipPath: geo.arch }, { clipPath: geo.full, ease: 'power2.inOut', duration: 0.8 }, 0.08)
        .fromTo(img, { scale: 1.15 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo('.hero__cue, .hero__hint', { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0)
        .fromTo('.hero__shade', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.3)
        .fromTo('#heroReveal', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.45)
        .to({}, { duration: 0.2 });

    return entrance;
}

/* The golden strand: catch it with the cursor, let go, it rings ─ */
function initPluck() {
    const svg = $('#heroStrand');
    const path = $('path', svg);
    const hint = $('.hero__hint');
    const pull = { x: 0, y: 0 };
    let w = 0, h = 0, base = 0, held = false, active = true;

    const measure = () => {
        const r = svg.getBoundingClientRect();
        w = r.width; h = r.height; base = h * (isNarrow() ? 0.5 : 0.76);
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    };
    // Quadratic curve whose midpoint sits exactly on the pull
    const draw = () => {
        if (!active) return;
        path.setAttribute('d', `M0 ${base} Q ${w / 2 + pull.x * 2} ${base + pull.y * 2} ${w} ${base}`);
    };
    const release = () => {
        held = false;
        sound.pluck(Math.min(1, Math.abs(pull.y) / 120));
        gsap.to(pull, { x: 0, y: 0, duration: 2, ease: 'elastic.out(1.1, 0.16)', overwrite: true });
        if (hint) gsap.to(hint, { opacity: 0, duration: 0.6 });
    };

    measure();
    window.addEventListener('resize', measure);
    gsap.ticker.add(draw);
    ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', onToggle: (s) => { active = s.isActive || window.scrollY < 10; } });

    const stage = $('.hero__pin');
    stage.addEventListener('pointermove', (e) => {
        const r = svg.getBoundingClientRect();
        const x = e.clientX - r.left - w / 2;
        const dy = e.clientY - r.top - base;
        if (!held && Math.abs(dy - pull.y) < 22) held = true;
        if (!held) return;
        if (Math.abs(dy) > 120) { release(); return; }
        gsap.to(pull, { x: x * 0.5, y: dy, duration: 0.25, ease: 'power3.out', overwrite: true });
    });
    stage.addEventListener('pointerleave', () => held && release());
    stage.addEventListener('pointerup', () => held && release());
}

/* I · The Strand ─────────────────────────────────────────────── */
function strand() {
    const track = $('#strandTrack');
    const dayEl = $('#strandDay');
    const railFill = $('#railFill');
    const railSteps = $$('.strand__rail li');
    const distance = () => track.scrollWidth - window.innerWidth;

    const sideways = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
            trigger: '#strand', start: 'top top', end: () => `+=${distance()}`,
            pin: '.strand__pin', scrub: 1, invalidateOnRefresh: true,
            onUpdate: (self) => {
                dayEl.textContent = `Day ${Math.round(self.progress * 180)}`;
                railFill.style.transform = `scaleX(${self.progress})`;
                const step = Math.round(self.progress * (railSteps.length - 1));
                railSteps.forEach((li, i) => {
                    li.classList.toggle('is-active', i === step);
                    li.classList.toggle('is-past', i < step);
                });
            },
        },
    });

    const getThreadLead = () => {
        const tw = Math.max(1, track.scrollWidth);
        const pct = Math.min(46, Math.max(26, Math.ceil(((window.innerWidth * 0.9) / tw) * 100)));
        return `0% ${pct}%`;
    };

    gsap.fromTo('#strandThread', { drawSVG: getThreadLead }, {
        drawSVG: '0% 100%', ease: 'none',
        scrollTrigger: { trigger: '#strand', start: 'top top', end: () => `+=${distance()}`, scrub: 0.6, invalidateOnRefresh: true },
    });
    gsap.fromTo('.panel__leaf path', { drawSVG: '0%' }, {
        drawSVG: '100%', duration: 2.4, ease: 'power2.inOut',
        scrollTrigger: { trigger: '#strand', start: 'top 30%' },
    });

    $$('.panel').forEach((panel) => {
        // Each stage comes into focus at the centre and recedes as it leaves
        gsap.fromTo(panel, { opacity: 0.35, scale: 0.94 }, {
            opacity: 1, scale: 1, ease: 'none',
            scrollTrigger: { trigger: panel, containerAnimation: sideways, start: 'left 85%', end: 'center 55%', scrub: true },
        });
        gsap.from($$('.panel__num, h3, .panel__text p, .panel > p, dl', panel), {
            y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out',
            scrollTrigger: { trigger: panel, containerAnimation: sideways, start: 'left 70%', toggleActions: 'play none none reverse' },
        });

        const img = $('.panel__figure img', panel);
        if (img) {
            gsap.set(img, { scale: 1.18 });
            gsap.fromTo(img, { xPercent: -6 }, {
                xPercent: 6, ease: 'none',
                scrollTrigger: { trigger: panel, containerAnimation: sideways, start: 'left right', end: 'right left', scrub: true },
            });
        }
        const glyph = $('.panel__bn', panel);
        if (glyph) {
            gsap.fromTo(glyph, { xPercent: 20 }, {
                xPercent: -20, ease: 'none',
                scrollTrigger: { trigger: panel, containerAnimation: sideways, start: 'left right', end: 'right left', scrub: true },
            });
        }
    });

    $$('[data-count]').forEach((dd) => {
        const unit = dd.querySelector('small').outerHTML;
        const counter = { v: 0 };
        gsap.to(counter, {
            v: Number(dd.dataset.count), duration: 1.6, ease: 'power3.out',
            onUpdate: () => { dd.innerHTML = Math.round(counter.v) + unit; },
            scrollTrigger: { trigger: dd.closest('.panel'), containerAnimation: sideways, start: 'left 70%' },
        });
    });
}

/* II · The Nest ──────────────────────────────────────────────── */
function nest() {
    const mascot = $('.nest__mascot-img');
    const caption = $('.nest__caption');

    const build = (tl) => {
        if (mascot) {
            tl.fromTo(mascot,
                { opacity: 0, y: 40, scale: 0.94 },
                { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' },
                0
            );
        }
        if (caption) {
            tl.fromTo(caption,
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
                0.15
            );
        }
        tl
            .fromTo('.poem__head', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 }, 0.2)
            .fromTo('.poem__row', { opacity: 0.14, y: 14 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 }, 0.28)
            .from('.poem cite', { opacity: 0, duration: 0.25 }, 1.1)
            .to({}, { duration: 0.25 });

        return tl;
    };

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1025px)', () => build(gsap.timeline({
        scrollTrigger: { trigger: '#nest', start: 'top top', end: '+=135%', pin: '.nest__pin', scrub: 1 },
    })));
    mm.add('(max-width: 1024px)', () => build(gsap.timeline({
        scrollTrigger: { trigger: '.nest__pin', start: 'top 75%', end: 'bottom 70%', scrub: 1 },
    })));

    gsap.from('.laws li', {
        y: 50, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.laws', start: 'top 80%' },
    });
}

/* Interlude: a centred frame opens symmetrically onto the workshop ─ */
function film() {
    const frame = $('#filmFrame');
    const video = $('#filmVideo');

    const mm = gsap.matchMedia();
    mm.add('(min-width: 861px)', () => {
        const c = { t: 16, r: 24, b: 16, l: 24, rad: 6 };
        gsap.set(frame, { clipPath: `inset(${c.t}% ${c.r}% ${c.b}% ${c.l}% round ${c.rad}px)` });
        gsap.timeline({
            scrollTrigger: { trigger: '#film', start: 'top top', end: '+=110%', pin: '.film__pin', scrub: 1 },
        })
            .to(c, { t: 0, r: 0, b: 0, l: 0, rad: 0, ease: 'power2.inOut', onUpdate: () => {
                frame.style.clipPath = `inset(${c.t}% ${c.r}% ${c.b}% ${c.l}% round ${c.rad}px)`;
            } }, 0)
            .from('.film__overlay .mono, .film__overlay h2 > *', { yPercent: 40, opacity: 0, stagger: 0.12, ease: 'power3.out' }, 0.3);
    });

    mm.add('(max-width: 860px)', () => {
        gsap.set(frame, { clearProps: 'clipPath' });
        gsap.from('.film__overlay', {
            y: 30, opacity: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: '#film', start: 'top 75%' },
        });
    });

    ScrollTrigger.create({
        trigger: '#film', start: 'top 80%', end: 'bottom top',
        onToggle: (self) => {
            if (self.isActive && !filmPausedByVisitor) video.play().catch(() => {});
            else video.pause();
        },
    });
}

/* III · The Hands ────────────────────────────────────────────── */
function hands() {
    const countEl = $('#handsCount');
    if (countEl) {
        const counter = { v: 0 };
        gsap.to(counter, {
            v: 63, duration: 2.2, ease: 'power3.out',
            onUpdate: () => { countEl.textContent = Math.round(counter.v); },
            scrollTrigger: { trigger: '.hands__intro', start: 'top 75%' },
        });
    }
    gsap.from('.hands__lead', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.hands__intro', start: 'top 70%' } });

    gsap.fromTo('.hands__portrait-crop img', { yPercent: -12 }, {
        yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: '.hands__portrait', start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.from('.hands__portrait-crop', {
        clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut',
        scrollTrigger: { trigger: '.hands__portrait', start: 'top 80%' },
    });

    const quote = SplitText.create('.hands__quote blockquote', { type: 'words' });
    gsap.fromTo(quote.words, { opacity: 0.14 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: '.hands__quote', start: 'top 80%', end: 'bottom 45%', scrub: true },
    });

    gsap.from('.impact-banner', {
        y: 40, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: '#impact', start: 'top 80%' },
    });

    const cards = $$('.card');
    gsap.from(cards, {
        y: 40, opacity: 0, stagger: 0.08, duration: 0.85, ease: 'expo.out',
        scrollTrigger: { trigger: '#deck', start: 'top 82%' },
    });

    const exportSuite = $('#export');
    if (exportSuite) {
        gsap.from(exportSuite, {
            y: 36, opacity: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: exportSuite, start: 'top 88%' },
        });
    }
}

/* IV · The Return: scrolling is the passing of days ─────────── */
function soilReturn(bio) {
    const slider = $('#bioSlider');
    let lastDay = -1;

    const st = ScrollTrigger.create({
        trigger: '#return', start: 'top top', end: '+=220%',
        pin: '.return__pin', scrub: true,
        onUpdate: (self) => {
            const day = Math.round(self.progress * 45);
            if (day !== lastDay) { lastDay = day; bio.set(day); }
        },
    });

    slider.addEventListener('input', () => {
        const y = st.start + (Number(slider.value) / 45) * (st.end - st.start);
        lenis.scrollTo(y, { duration: 0.6 });
    });

    gsap.from('.specimen', { y: 60, opacity: 0, stagger: 0.12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '#return', start: 'top 60%' } });
}

function ledger() {
    gsap.from('.ledger .bar', {
        scaleX: 0, duration: 1.2, ease: 'expo.out', stagger: 0.06,
        scrollTrigger: { trigger: '.ledger__table', start: 'top 75%' },
    });
    gsap.from('.ledger__total', { opacity: 0, y: 20, duration: 1, stagger: 0.15, scrollTrigger: { trigger: '.ledger__table tfoot', start: 'top 90%' } });
}

/* V · The Exchange ───────────────────────────────────────────── */
function exchange() {
    $$('.record__item').forEach((item, i) => {
        gsap.fromTo(item, { y: 40 + (i % 3) * 20 }, {
            y: -25 - (i % 3) * 15, ease: 'none',
            scrollTrigger: { trigger: '#record', start: 'top bottom', end: 'bottom top', scrub: true },
        });
    });
    gsap.from('.patron-spotlight', {
        y: 40, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: '#patron-highlight', start: 'top 80%' },
    });
    gsap.from('.creds div, .field, .enquiry__send', {
        y: 24, opacity: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: '.exchange__split', start: 'top 80%' },
    });
}

function founders() {
    gsap.from('.founder-card', {
        y: 40, opacity: 0, stagger: 0.18, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.founders__grid', start: 'top 80%' },
    });
    gsap.from('.founders__amata-callout', {
        y: 30, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.founders__amata-callout', start: 'top 85%' },
    });
}

function colophon() {
    const split = SplitText.create('#colophonWord', { type: 'chars' });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.colophon',
            start: 'top 86%',
            toggleActions: 'play none none reverse',
        },
    });

    tl.from('.colophon__logo-mark', {
        scale: 0.85, y: 24, opacity: 0, duration: 0.8, ease: 'expo.out',
    }, 0)
    .from('.colophon__cols > div', {
        y: 36, opacity: 0, stagger: 0.12, duration: 1, ease: 'expo.out',
    }, 0.08)
    .from(split.chars, {
        yPercent: 55, opacity: 0, stagger: 0.045, duration: 1.25, ease: 'expo.out',
    }, 0.15)
    .from('.colophon__legal', {
        y: 16, opacity: 0, duration: 0.8, ease: 'power2.out',
    }, 0.45);

    gsap.fromTo('#colophonWord',
        { yPercent: 18 },
        {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.colophon', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
        }
    );
}

/* Chapter titles: letters settle into place — no masks, so no clipped descenders */
function headings() {
    $$('[data-reveal]').forEach((h) => {
        const split = SplitText.create(h, { type: 'words,chars' });
        gsap.from(split.chars, {
            yPercent: 60, opacity: 0, rotate: 6, transformOrigin: '0% 100%',
            stagger: 0.03, duration: 1.1, ease: 'expo.out',
            scrollTrigger: { trigger: h, start: 'top 85%' },
        });
    });
}

/* Graded backdrop: the page colour crossfades between scenes ─ */
function initBackdrop() {
    $$('[data-bg]').forEach((section) => {
        ScrollTrigger.create({
            trigger: section, start: 'top 55%', end: 'bottom 55%',
            onToggle: (self) => {
                if (self.isActive) gsap.to(document.body, { backgroundColor: section.dataset.bg, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
            },
        });
    });
}

/* Navigation: rolling chapter counter & light/dark adaptation (persistent header) ─ */
function initNav() {
    const nav = $('#nav');
    const num = $('#navNum');
    const name = $('#navName');
    const scene = $('#frameScene');

    const setChapter = (section) => {
        if (num.textContent === section.dataset.chapter) return;
        gsap.timeline()
            .to([num, name], { yPercent: -60, opacity: 0, duration: 0.25, ease: 'power2.in' })
            .add(() => {
                num.textContent = section.dataset.chapter;
                name.textContent = section.dataset.name;
                scene.textContent = `Sc. ${section.dataset.chapter}`;
            })
            .fromTo([num, name], { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'expo.out' });
    };

    $$('[data-chapter]').forEach((section) => {
        ScrollTrigger.create({
            trigger: section, start: 'top 50%', end: 'bottom 50%',
            onToggle: (self) => self.isActive && setChapter(section),
        });
        if (section.id === 'prologue') return; // the prologue decides by its own progress
        ScrollTrigger.create({
            trigger: section, start: 'top 40px', end: 'bottom 40px',
            onToggle: (self) => { if (self.isActive) nav.classList.toggle('nav--on-dark', section.dataset.theme !== 'light'); },
        });
    });

    ScrollTrigger.create({
        trigger: '.hero', start: 'top top', end: 'bottom top',
        onToggle: (self) => { if (self.isActive) nav.classList.remove('nav--on-dark'); },
    });
}

function initProgress() {
    const rope = $('#braidRope');
    ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (self) => { rope.style.clipPath = `inset(0 ${(100 - self.progress * 100).toFixed(2)}% 0 0)`; },
    });
}

/* Timecode: scroll position read as a running reel */
const RUNTIME = 180;
function toTimecode(seconds) {
    const f = Math.floor((seconds % 1) * 25);
    const sec = Math.floor(seconds);
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(Math.floor(sec / 3600))}:${pad(Math.floor(sec / 60) % 60)}:${pad(sec % 60)}:${pad(f)}`;
}
function initTimecode() {
    const tc = $('#timecode');
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => { tc.textContent = toTimecode(self.progress * RUNTIME); } });
}

function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const target = id === '#top' ? 0 : $(id);
            if (target === null) return;
            e.preventDefault();
            closeIndexPanel();
            lenis.scrollTo(target, { duration: 1.6 });
        });
    });
}

/* Cursor: a soft ring that follows; it names the action where one exists ─ */
function initCursor() {
    const ring = document.createElement('div');
    ring.className = 'cursor';
    ring.setAttribute('aria-hidden', 'true');
    ring.innerHTML = '<span class="cursor__label"></span>';
    document.body.append(ring);
    const label = $('.cursor__label', ring);

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    document.addEventListener('pointerleave', () => ring.classList.add('is-hidden'));
    document.addEventListener('pointerenter', () => ring.classList.remove('is-hidden'));

    document.addEventListener('pointerover', (e) => {
        const labelled = e.target.closest('[data-cursor]');
        const link = e.target.closest('a, button, input, select, textarea, label');
        ring.classList.toggle('is-label', Boolean(labelled) && !link);
        ring.classList.toggle('is-link', Boolean(link));
        label.textContent = labelled && !link ? labelled.dataset.cursor : '';
    });
}

/* Magnetic controls: buttons lean toward the pointer ─────────── */
function initMagnetic() {
    $$('.nav__btn, .nav__mark, .enquiry__send, .film__toggle').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.3);
            yTo((e.clientY - r.top - r.height / 2) * 0.4);
        });
        el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
}

/* ═══════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
let closeIndexPanel = () => {};

function initIndexPanel() {
    const btn = $('#indexToggle');
    const panel = $('#indexPanel');
    const backdrop = $('#indexBackdrop');
    const closeBtn = $('#indexCloseBtn');
    const animate = !reduceMotion;

    if (!btn || !panel) return;

    const getOriginFromMenuBtn = () => {
        const br = btn.getBoundingClientRect();
        const pr = panel.getBoundingClientRect();
        const ox = Math.round(br.left + br.width / 2 - pr.left);
        const oy = Math.round(br.top + br.height / 2 - pr.top);
        const scaleX = Math.max(0.14, Math.min(0.45, br.width / Math.max(1, pr.width)));
        const scaleY = Math.max(0.05, Math.min(0.2, br.height / Math.max(1, pr.height)));
        return { origin: `${ox}px ${oy}px`, scaleX, scaleY };
    };

    function open() {
        gsap.killTweensOf([panel, backdrop, '.index-panel__list li', '.index-panel__foot']);
        panel.hidden = false;
        if (backdrop) backdrop.hidden = false;
        gsap.set(panel, { clearProps: 'transform,borderRadius,opacity' });
        document.body.classList.add('index-open');
        btn.setAttribute('aria-expanded', 'true');
        lenis && lenis.stop();

        if (animate) {
            const { origin, scaleX, scaleY } = getOriginFromMenuBtn();
            if (backdrop) gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            gsap.fromTo(panel,
                { transformOrigin: origin, scaleX, scaleY, borderRadius: '999px', opacity: 0.2 },
                { scaleX: 1, scaleY: 1, borderRadius: '14px', opacity: 1, duration: 0.56, ease: 'expo.out' }
            );
            gsap.fromTo('.index-panel__list li, .index-panel__foot',
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.03, duration: 0.42, ease: 'expo.out', delay: 0.14, clearProps: 'transform,opacity' }
            );
        }

        const firstFocus = closeBtn || $('a', panel);
        if (firstFocus) firstFocus.focus({ preventScroll: true });
    }

    function close(restoreFocus = false) {
        if (panel.hidden) return;
        gsap.killTweensOf([panel, backdrop, '.index-panel__list li', '.index-panel__foot']);
        document.body.classList.remove('index-open');
        btn.setAttribute('aria-expanded', 'false');
        lenis && lenis.start();

        if (animate) {
            const { origin, scaleX, scaleY } = getOriginFromMenuBtn();
            if (backdrop) gsap.to(backdrop, { opacity: 0, duration: 0.32, ease: 'power2.in' });
            gsap.to(panel, {
                transformOrigin: origin,
                scaleX,
                scaleY,
                borderRadius: '999px',
                opacity: 0,
                duration: 0.4,
                ease: 'expo.inOut',
                onComplete: () => {
                    panel.hidden = true;
                    if (backdrop) backdrop.hidden = true;
                    gsap.set(panel, { clearProps: 'all' });
                    ScrollTrigger.update();
                },
            });
        } else {
            panel.hidden = true;
            if (backdrop) backdrop.hidden = true;
        }
        if (restoreFocus) btn.focus({ preventScroll: true });
    }

    closeIndexPanel = () => close(false);
    btn.addEventListener('click', () => (panel.hidden ? open() : close(false)));
    if (closeBtn) closeBtn.addEventListener('click', () => close(true));
    if (backdrop) backdrop.addEventListener('click', () => close(false));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !panel.hidden) close(true);
    });
    if (!animate) $$('a', panel).forEach((a) => a.addEventListener('click', () => close(false)));
}

/* Soil console: day → stage text, meters and the --p that drives the SVG ─ */
function createBioConsole() {
    const root = $('#bioConsole');
    const slider = $('#bioSlider');
    const el = (id) => document.getElementById(id);
    const TOTAL = 45;

    const stages = [
        { until: 9,  jute: ['Fresh burial', 'A finished jute weave rests on moist loam. The fibre network is intact.'],
                     plastic: ['Petrochemical lock', 'Polymer chains offer soil microbes nothing to digest. The surface stays sealed.'] },
        { until: 24, jute: ['Fungal colonisation', 'Fungi thread their hyphae through the cellulose. The weave darkens, softens and slumps into the earth.'],
                     plastic: ['Inert persistence', 'Additives leach into the soil water. The bag itself stays whole.'] },
        { until: 44, jute: ['Cellulose breakdown', 'Bacteria digest the strands. Around three-quarters is now carbon-rich organic matter.'],
                     plastic: ['Fragmentation', 'Sunlight and abrasion crack it into microplastics under 5 mm — smaller, no less persistent.'] },
        { until: 45, jute: ['Soil humus', 'Complete return. Dark, crumbly humus now feeds the next seedling.'],
                     plastic: ['A 500-year debt', 'Still 0% biodegraded. The fragments travel on into rivers and food chains for centuries.'] },
    ];

    // Logistic decay: slow while fungi colonise, fastest mid-way, tapering into humus
    const logistic = (d) => 1 / (1 + Math.exp(-(d - 20) / 5));
    const pct = (d) => Math.round(((logistic(d) - logistic(0)) / (logistic(TOTAL) - logistic(0))) * 100);

    function set(day) {
        day = Math.max(0, Math.min(TOTAL, Math.round(day)));
        const s = stages.find((st) => day <= st.until);
        const j = pct(day);
        root.style.setProperty('--p', (day / TOTAL).toFixed(3));
        el('dayReadout').textContent = day;
        slider.value = day;
        slider.setAttribute('aria-valuetext', `Day ${day} of ${TOTAL}: jute ${j}% biodegraded, plastic 0%`);
        el('jutePhase').textContent = s.jute[0];
        el('juteStatus').textContent = s.jute[1];
        el('juteMeter').style.width = `${j}%`;
        el('jutePercent').textContent = `${j}%`;
        el('plasticPhase').textContent = s.plastic[0];
        el('plasticStatus').textContent = s.plastic[1];
    }

    set(0);
    return { set };
}

/* Film: the frame and the button both play/pause ─────────────── */
function initFilmToggle() {
    const video = $('#filmVideo');
    const btn = $('#filmToggle');
    const frame = $('#filmFrame');
    const render = () => {
        btn.textContent = video.paused ? 'Play film' : 'Pause film';
        btn.setAttribute('aria-pressed', String(video.paused));
        frame.dataset.cursor = video.paused ? 'Play' : 'Pause';
    };
    const toggle = () => {
        if (video.paused) { filmPausedByVisitor = false; video.play().catch(() => {}); }
        else { filmPausedByVisitor = true; video.pause(); }
    };
    btn.addEventListener('click', toggle);
    frame.addEventListener('click', toggle);
    video.addEventListener('play', render);
    video.addEventListener('pause', render);
    render();
}

/* Sound: ambient soundtrack and the note of the plucked strand ───── */
function createSound() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    let ctx = null;
    let enabled = false;
    let bgAudio = null;
    let pluckAudio = new Audio('pluck.mp3');

    const ensure = () => { 
        if (!ctx && Ctx) {
            try { ctx = new Ctx(); } catch (e) {}
        }
        if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {}); 
        if (!bgAudio) {
            bgAudio = new Audio('bg-audio.mp3');
            bgAudio.loop = true;
            bgAudio.volume = 0.55;
        }
        return ctx; 
    };

    return {
        available: true,
        isEnabled() { return enabled; },
        setEnabled(on) {
            enabled = on;
            ensure();
            const btn = $('#soundToggle');
            const text = $('#soundBtnText');
            if (on) {
                if (btn) btn.setAttribute('aria-pressed', 'true');
                if (text) text.textContent = 'Mute';
                if (bgAudio) {
                    const p = bgAudio.play();
                    if (p !== undefined) {
                        p.catch(() => {
                            if (btn) btn.setAttribute('aria-pressed', 'false');
                            if (text) text.textContent = 'Sound';
                            enabled = false;
                        });
                    }
                }
            } else {
                if (btn) btn.setAttribute('aria-pressed', 'false');
                if (text) text.textContent = 'Sound';
                if (bgAudio) bgAudio.pause();
                if (ctx && ctx.state === 'running') ctx.suspend().catch(() => {});
            }
        },
        pluck(amount) {
            if (!pluckAudio || amount < 0.05) return;
            const clone = pluckAudio.cloneNode();
            clone.volume = Math.min(1, amount * 1.2);
            clone.play().catch(() => {});
        }
    };
}

function initMusicPrompt() {
    const prompt = $('#musicPrompt');
    const enableBtn = $('#musicEnableBtn');
    const dismissBtn = $('#musicDismissBtn');
    if (!prompt) return;

    let resolved = false;

    showMusicPrompt = () => {
        if (resolved || sound.isEnabled()) return;
        prompt.hidden = false;
    };

    hideMusicPrompt = () => {
        resolved = true;
        prompt.hidden = true;
    };

    if (enableBtn) {
        enableBtn.addEventListener('click', () => {
            sound.setEnabled(true);
            hideMusicPrompt();
        });
    }

    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            sound.setEnabled(false);
            hideMusicPrompt();
        });
    }
}

function initSoundToggle() {
    const btn = $('#soundToggle');
    if (!btn || !sound.available) { if (btn) btn.hidden = true; return; }

    btn.addEventListener('click', () => {
        const willEnable = btn.getAttribute('aria-pressed') !== 'true';
        sound.setEnabled(willEnable);
        hideMusicPrompt();
    });
}

function initCatalogInteractions() {
    const filterButtons = $$('.deck__filter');
    const cards = $$('.card');

    if (filterButtons.length && cards.length) {
        filterButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter || 'all';
                filterButtons.forEach((b) => {
                    const active = b === btn;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-selected', String(active));
                });

                const shown = [];
                cards.forEach((card) => {
                    const matches = filter === 'all' || card.dataset.category === filter;
                    card.classList.toggle('is-hidden', !matches);
                    if (matches) shown.push(card);
                });

                if (!reduceMotion && shown.length) {
                    gsap.fromTo(shown, { y: 18, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out', overwrite: 'auto' });
                }
                ScrollTrigger.refresh();
            });
        });
    }

    const enquiryButtons = $$('[data-enquire-product]');
    const form = $('#inquiryForm');
    const unlockPanel = $('#brochureUnlockPanel');
    const msgBox = $('#inqMessage');
    const engagementSelect = $('#inqType');
    const nameInput = $('#inqName');

    const prefillProductQuote = (product) => {
        if (!form || !product) return;

        if (unlockPanel && !unlockPanel.hidden) {
            unlockPanel.hidden = true;
            form.hidden = false;
        }

        if (engagementSelect) {
            if (/rug|mat|décor|decor|mandala|medallion|carpet/i.test(product)) {
                engagementSelect.value = 'Home Décor & Braided Mandala Rugs';
            } else if (/two-tone|custom|indigo|series|tote bag|oem|drawstring|mishka|do re me|sakuya/i.test(product)) {
                engagementSelect.value = 'Custom OEM / Private Label Jute Bags';
            } else if (/luxury|briefcase|suite|weekender|backpack|laptop|corporate/i.test(product)) {
                engagementSelect.value = 'Corporate & Event Eco-Gifting';
            } else {
                engagementSelect.value = 'Wholesale / Bulk Export Quote & Brochure';
            }
        }

        if (msgBox) {
            msgBox.value = `Requesting wholesale pricing, MOQ & sample dispatch details for: ${product}.\nEstimated quantity: `;
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const requestedProduct = urlParams.get('product');
    if (requestedProduct && form) {
        prefillProductQuote(requestedProduct);
    }

    enquiryButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const product = btn.dataset.enquireProduct;
            if (!form) return;

            prefillProductQuote(product);

            if (lenis) lenis.scrollTo('#inquiryForm', { duration: 1.4 });
            else form.scrollIntoView({ behavior: 'smooth', block: 'start' });

            setTimeout(() => {
                if (nameInput && !nameInput.value.trim()) nameInput.focus({ preventScroll: true });
                else if (msgBox) msgBox.focus({ preventScroll: true });
            }, 600);
        });
    });
}

function initScrollTop() {
    const btn = $('#scrollTopBtn');
    if (!btn) return;
    const update = () => {
        const y = window.scrollY || (lenis ? lenis.scroll : 0);
        btn.classList.toggle('is-visible', y > 450);
    };
    window.addEventListener('scroll', update, { passive: true });
    if (lenis) lenis.on('scroll', update);
    btn.addEventListener('click', () => {
        if (lenis) lenis.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initYear() {
    const yr = $('#copyrightYear');
    if (yr) yr.textContent = new Date().getFullYear();
}

function decodeEmail(b64) {
    if (!b64) return '';
    try {
        return atob(b64);
    } catch {
        return '';
    }
}

/* Obfuscation: reconstruct email on DOM ready to protect from scrapers & spambots */
function initEmailObfuscation() {
    $$('[data-obf-email]').forEach((el) => {
        const email = decodeEmail(el.dataset.obfEmail);
        if (!email) return;
        el.setAttribute('href', `mailto:${email}`);
        if (!el.dataset.preserveText) {
            el.textContent = email;
        }
    });

    const form = $('#inquiryForm');
    const target = $('#dossierEmailTarget');
    if (form && target) {
        const email = decodeEmail(form.dataset.recipientB64);
        if (email) target.textContent = email;
    }
}

/* Enquiry: Google Sheet Apps Script lead capture + Brochure download ─ */
function initEnquiryForm() {
    const form = $('#inquiryForm');
    if (!form) return;

    const unlockPanel = $('#brochureUnlockPanel');
    const unlockMsg = $('#brochureUnlockMsg');
    const unlockActions = $('#brochureUnlockActions');
    const resetBtn = $('#brochureResetBtn');
    const submitBtn = $('.enquiry__send', form);
    const submitLabel = $('.enquiry__label', form);
    const dossierNote = $('#dossierNote');
    const recipient = decodeEmail(form.dataset.recipientB64) || LEAD_CAPTURE_CONFIG.fallbackEmail;

    const createActionLink = (label, href, extraClass = '', downloadName = '') => {
        const a = document.createElement('a');
        a.className = `brochure-unlock__cta ${extraClass}`.trim();
        a.href = href;
        a.textContent = label;
        if (downloadName) {
            a.setAttribute('download', downloadName);
        } else if (!href.startsWith('mailto:')) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }
        return a;
    };

    const triggerDownload = (url, filename) => {
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', filename || 'Divulge-Living-Brochure.pdf');
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const d = new FormData(form);
        const payload = {
            action: 'lead_inquiry',
            timestamp: new Date().toISOString(),
            name: String(d.get('name') || '').trim(),
            company: String(d.get('institution') || '').trim(),
            email: String(d.get('email') || '').trim(),
            phone: String(d.get('phone') || '').trim(),
            country: String(d.get('country') || '').trim(),
            engagement: String(d.get('engagement') || '').trim(),
            message: String(d.get('message') || '').trim(),
            sourceUrl: window.location.href,
            brochureRequested: true,
        };

        if (submitBtn) submitBtn.disabled = true;
        if (submitLabel) submitLabel.textContent = 'Submitting Inquiry…';

        try {
            localStorage.setItem('divulge_last_inquiry', JSON.stringify(payload));
        } catch {}

        let recordedInSheet = false;
        if (LEAD_CAPTURE_CONFIG.appsScriptUrl) {
            try {
                await fetch(LEAD_CAPTURE_CONFIG.appsScriptUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload),
                });
                recordedInSheet = true;
            } catch {}
        }

        const subject = `Export / Wholesale Inquiry — ${payload.company || payload.name}`;
        const mailBody = [
            `Name: ${payload.name}`,
            `Company / Brand: ${payload.company}`,
            `Email: ${payload.email}`,
            `Phone / WhatsApp: ${payload.phone || '—'}`,
            `Country / Port: ${payload.country || '—'}`,
            `Inquiry Type: ${payload.engagement}`,
            '',
            payload.message || '',
        ].join('\n');
        const mailtoHref = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        const waSummary = `Hello Divulge Living, I just submitted an inquiry.\nName: ${payload.name}\nCompany: ${payload.company}\nCountry: ${payload.country || '—'}\nInterest: ${payload.engagement}\n${payload.message ? `Brief: ${payload.message}` : ''}`;

        if (unlockActions) {
            unlockActions.replaceChildren();
            if (LEAD_CAPTURE_CONFIG.brochureUrl) {
                unlockActions.appendChild(
                    createActionLink('Download Brochure (PDF) ↓', LEAD_CAPTURE_CONFIG.brochureUrl, '', LEAD_CAPTURE_CONFIG.brochureFilename)
                );
                unlockActions.appendChild(
                    createActionLink(`Email Copy to ${recipient}`, mailtoHref, 'brochure-unlock__cta--ghost')
                );
                triggerDownload(LEAD_CAPTURE_CONFIG.brochureUrl, LEAD_CAPTURE_CONFIG.brochureFilename);
            } else {
                unlockActions.appendChild(
                    createActionLink(`Email Brief to ${recipient}`, mailtoHref)
                );
                const waBtn = document.createElement('button');
                waBtn.type = 'button';
                waBtn.className = 'brochure-unlock__cta brochure-unlock__cta--ghost';
                waBtn.textContent = 'Send via WhatsApp & Request Brochure →';
                waBtn.addEventListener('click', () => openWhatsAppWithText(waSummary));
                unlockActions.appendChild(waBtn);
            }
        }

        if (unlockMsg) {
            if (LEAD_CAPTURE_CONFIG.brochureUrl && recordedInSheet) {
                unlockMsg.textContent = `Thank you, ${payload.name}. Your inquiry has been recorded in our export log and your brochure PDF download should start automatically.`;
            } else if (LEAD_CAPTURE_CONFIG.brochureUrl) {
                unlockMsg.textContent = `Thank you, ${payload.name}. Your brochure PDF download has been unlocked below, and you can also dispatch a direct copy to ${recipient}.`;
            } else if (recordedInSheet) {
                unlockMsg.textContent = `Thank you, ${payload.name}. Your inquiry is logged in our Google Sheet. Send a copy via email or WhatsApp below for immediate catalog dispatch.`;
            } else {
                unlockMsg.textContent = `Thank you, ${payload.name}. Lead capture & brochure download are staged and ready — send your pre-filled brief directly via ${recipient} or WhatsApp below.`;
            }
        }

        if (unlockPanel) {
            form.hidden = true;
            unlockPanel.hidden = false;
            ScrollTrigger.refresh();
        } else if (dossierNote) {
            dossierNote.textContent = `Ready — email ${recipient} directly if your mail client did not open.`;
            window.location.href = mailtoHref;
        }

        if (submitBtn) submitBtn.disabled = false;
        if (submitLabel) submitLabel.textContent = 'Submit Inquiry & Unlock Brochure';
    });

    if (resetBtn && unlockPanel) {
        resetBtn.addEventListener('click', () => {
            unlockPanel.hidden = true;
            form.hidden = false;
            form.reset();
            ScrollTrigger.refresh();
        });
    }
}

/* WhatsApp Dual Modal & Webhook Ping ──────────────────────────── */
function initWhatsAppModal() {
    const modal = $('#waModal');
    const trigger = $('#waToggleBtn');
    const closeBtn = $('#waModalClose');
    const backdrop = $('#waModalBackdrop');
    const footerTrigger = $('#footerWaTrigger');
    const exportTrigger = $('#exportWaTrigger');
    const contactDeskTrigger = $('#contactDeskWaTrigger');
    const indexTrigger = $('#indexWhatsAppTrigger');
    const pingBtn = $('#waPingBothBtn');
    const msgInput = $('#waMsgInput');
    const pingStatus = $('#waPingStatus');
    const studioLink = $('#waStudioLink');
    const kanikaLink = $('#waKanikaLink');
    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz0q_RtAstHof_ho-TrxwaKdKkzSsQV9C0FP36H9W_KrF6aSPpeoB-QoyczGuPyEmKv/exec';

    if (!modal || !trigger) return;

    const updateIndividualLinks = () => {
        const text = encodeURIComponent(msgInput && msgInput.value.trim() ? msgInput.value.trim() : 'Hello Divulge Living, I would like to connect.');
        if (studioLink) studioLink.href = `https://wa.me/918584922331?text=${text}`;
        if (kanikaLink) kanikaLink.href = `https://wa.me/919123956594?text=${text}`;
    };

    const openModal = (prefill = '') => {
        if (prefill && msgInput) {
            msgInput.value = prefill;
            updateIndividualLinks();
        }
        modal.removeAttribute('hidden');
        trigger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        if (msgInput) msgInput.focus();
    };

    openWhatsAppWithText = (text) => openModal(text);

    const closeModal = () => {
        modal.setAttribute('hidden', '');
        trigger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    trigger.addEventListener('click', () => {
        if (modal.hasAttribute('hidden')) openModal();
        else closeModal();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (footerTrigger) footerTrigger.addEventListener('click', () => openModal());
    if (exportTrigger) {
        exportTrigger.addEventListener('click', () => {
            openModal('Hello Divulge Living, I would like an export / wholesale quote and brochure for your handcrafted jute collection.');
        });
    }
    if (contactDeskTrigger) contactDeskTrigger.addEventListener('click', () => openModal());
    if (indexTrigger) {
        indexTrigger.addEventListener('click', () => {
            const indexToggle = $('#indexToggle');
            if (indexToggle && indexToggle.getAttribute('aria-expanded') === 'true') {
                indexToggle.click();
            }
            openModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
    });

    if (msgInput) msgInput.addEventListener('input', updateIndividualLinks);

    if (pingBtn) {
        pingBtn.addEventListener('click', () => {
            const userMsg = msgInput && msgInput.value.trim() ? msgInput.value.trim() : 'Hello Divulge Living, I would like to enquire about your handcrafted crochet bags and custom orders.';
            const encoded = encodeURIComponent(userMsg);

            // Log ping to Google Sheet webhook
            try {
                fetch(WEBHOOK_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        timestamp: new Date().toISOString(),
                        action: 'whatsapp_ping_both',
                        message: userMsg
                    })
                }).catch(() => {});
            } catch (_) {}

            // Open Studio WhatsApp directly
            window.open(`https://wa.me/918584922331?text=${encoded}`, '_blank');

            // Trigger Kanika WhatsApp or provide immediate 1-click fallback
            setTimeout(() => {
                try {
                    window.open(`https://wa.me/919123956594?text=${encoded}`, '_blank');
                } catch (_) {}
            }, 350);

            if (pingStatus) {
                pingStatus.innerHTML = `✓ Studio chat launched. <a href="https://wa.me/919123956594?text=${encoded}" target="_blank" rel="noopener noreferrer" style="color: #25D366; text-decoration: underline; font-weight: 600;">Also open Kanika Bose (+91 91239 56594)</a>`;
            }
        });
    }
}

/* ═══════════════════════════════════════════════════════════════
   STATIC — when reduced motion is respected
   ═══════════════════════════════════════════════════════════════ */
function initStatic(bio) {
    const rope = $('#braidRope');
    const nav = $('#nav');
    const video = $('#filmVideo');

    const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        rope.style.clipPath = `inset(0 ${100 - (max > 0 ? (window.scrollY / max) * 100 : 0)}% 0 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const s = entry.target;
            $('#navNum').textContent = s.dataset.chapter;
            $('#navName').textContent = s.dataset.name;
            nav.classList.toggle('nav--on-dark', s.dataset.theme !== 'light');
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    $$('[data-chapter]').forEach((s) => io.observe(s));

    new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !filmPausedByVisitor) video.play().catch(() => {});
        else video.pause();
    }, { threshold: 0.4 }).observe(video);

    $('#bioSlider').addEventListener('input', (e) => bio.set(Number(e.target.value)));
}
