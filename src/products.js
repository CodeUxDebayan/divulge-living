/**
 * DIVULGE LIVING — Products Catalog Page
 * Three signature export segments (Jute Bags, Tote Bags & OEM, Luxury Jute Items)
 * plus curated Artisan Handicrafts & Classic Crochet Bags.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const RESPECT_REDUCED_MOTION = false;
const reduceMotion = RESPECT_REDUCED_MOTION && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let lenis = null;
let showMusicPrompt = () => {};
let hideMusicPrompt = () => {};
let closeIndexPanel = () => {};
let openWhatsAppWithText = () => {};
const sound = createSound();

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.info(
            '%c Divulge Living · Products %c Handcrafted in Howrah & Hooghly · Engineered by Debayan Mukherjee ',
            'background:#1D1510;color:#C9A46A;font-weight:600;padding:4px 8px;border-radius:2px 0 0 2px;',
            'background:#EDE4D3;color:#1D1510;padding:4px 8px;border-radius:0 2px 2px 0;'
        );
    } catch {}

    initEmailObfuscation();
    initIndexPanel();
    initMusicPrompt();
    initSoundToggle();
    initSegmentFiltering();
    initScrollTop();
    initWhatsAppModal();
    initYear();

    if (reduceMotion) {
        initStaticPage();
        showMusicPrompt();
        return;
    }
    document.fonts.ready.then(initMotionPage);
});

function initMotionPage() {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    initProgress();
    initNavThemes();

    gsap.from('.products-hero__crumbs, .products-hero__eyebrow, .products-hero__title, .products-hero__meta', {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'expo.out',
        clearProps: 'transform,opacity',
    });

    gsap.from('.segment-card', {
        y: 28,
        opacity: 0,
        stagger: 0.07,
        duration: 0.85,
        ease: 'expo.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.segment-cards', start: 'top 90%' },
    });

    const footer = $('.colophon');
    if (footer) {
        gsap.from('.colophon__logo-mark, .colophon__cols > div', {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: footer, start: 'top 88%' },
        });
    }

    if (finePointer) {
        initCursor();
        initMagnetic();
    }

    $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const target = id === '#top' ? 0 : $(id);
            if (target === null) return;
            e.preventDefault();
            closeIndexPanel();
            lenis.scrollTo(target, { duration: 1.2 });
        });
    });

    showMusicPrompt();
    ScrollTrigger.refresh();
}

function initStaticPage() {
    const rope = $('#braidRope');
    if (!rope) return;
    const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        rope.style.clipPath = `inset(0 ${100 - (max > 0 ? (window.scrollY / max) * 100 : 0)}% 0 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initProgress() {
    const rope = $('#braidRope');
    if (!rope) return;
    ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
            rope.style.clipPath = `inset(0 ${(100 - self.progress * 100).toFixed(2)}% 0 0)`;
        },
    });
}

function initNavThemes() {
    const nav = $('#nav');
    if (!nav) return;

    $$('[data-theme]').forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 48px',
            end: 'bottom 48px',
            onToggle: (self) => {
                if (self.isActive) {
                    nav.classList.toggle('nav--on-dark', section.dataset.theme !== 'light');
                }
            },
        });
    });
}

function initSegmentFiltering() {
    const tabs = $$('[data-filter]');
    const chooserCards = $$('[data-select-filter]');
    const blocks = $$('.segment-block');
    const cards = $$('.card--catalog');
    const statusEl = $('#catalogStatus');
    const navName = $('#navName');
    const navNum = $('#navNum');

    const LABELS = {
        all: ['All', 'Products Catalog'],
        'jute-bags': ['01', 'Jute Bags'],
        'tote-bags': ['02', 'Tote Bags & OEM'],
        'luxury-jute': ['03', 'Luxury Jute Items'],
        handicrafts: ['04', 'Handicrafts'],
        bags: ['Bags', 'Crochet Classic'],
    };

    const applyFilter = (filter, shouldScroll = false) => {
        const normalized = LABELS[filter] ? filter : 'all';

        tabs.forEach((btn) => {
            const active = btn.dataset.filter === normalized;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-selected', String(active));
        });

        chooserCards.forEach((card) => {
            card.classList.toggle('is-active', card.dataset.selectFilter === normalized);
        });

        let visibleCount = 0;

        blocks.forEach((block) => {
            const blockSegment = block.dataset.segment || '';
            const blockCards = $$('.card--catalog', block);
            let blockHasVisible = false;

            blockCards.forEach((card) => {
                const segMatch = normalized === 'all' || normalized === blockSegment;
                const classMatch = card.dataset.classification === normalized;
                const match = segMatch || classMatch;
                card.classList.toggle('is-hidden', !match);
                if (match) {
                    visibleCount++;
                    blockHasVisible = true;
                }
            });

            block.classList.toggle('is-hidden', !blockHasVisible);
        });

        if (statusEl) {
            statusEl.textContent = `Showing ${visibleCount} of ${cards.length} creations`;
        }

        if (navNum && navName) {
            const [numTxt, labelTxt] = LABELS[normalized];
            navNum.textContent = numTxt;
            navName.textContent = labelTxt;
        }

        if (!reduceMotion) {
            const visibleCards = cards.filter((c) => !c.classList.contains('is-hidden'));
            if (visibleCards.length) {
                gsap.fromTo(
                    visibleCards,
                    { y: 18, opacity: 0.35 },
                    { y: 0, opacity: 1, duration: 0.45, stagger: 0.03, ease: 'power2.out', overwrite: 'auto' }
                );
            }
            ScrollTrigger.refresh();
        }

        if (shouldScroll) {
            const toolbar = $('#catalogToolbar');
            if (toolbar) {
                if (lenis) lenis.scrollTo(toolbar, { offset: -64, duration: 0.9 });
                else toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    tabs.forEach((btn) => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter, false));
    });

    chooserCards.forEach((card) => {
        card.addEventListener('click', () => {
            const target = card.dataset.selectFilter || 'all';
            const isAlready = card.classList.contains('is-active');
            applyFilter(isAlready ? 'all' : target, true);
        });
    });

    const params = new URLSearchParams(window.location.search);
    const initialSegment = params.get('segment');
    if (initialSegment && LABELS[initialSegment]) {
        applyFilter(initialSegment, true);
    } else {
        applyFilter('all', false);
    }
}

/* Shared Index Sidebar Menu */
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
            gsap.fromTo(
                panel,
                { transformOrigin: origin, scaleX, scaleY, borderRadius: '999px', opacity: 0.2 },
                { scaleX: 1, scaleY: 1, borderRadius: '14px', opacity: 1, duration: 0.56, ease: 'expo.out' }
            );
            gsap.fromTo(
                '.index-panel__list li, .index-panel__foot',
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
}

/* Sound & Music Prompt */
function createSound() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    let ctx = null;
    let enabled = false;
    let bgAudio = null;

    const ensure = () => {
        if (!ctx && Ctx) {
            try { ctx = new Ctx(); } catch {}
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

    if (enableBtn) enableBtn.addEventListener('click', () => { sound.setEnabled(true); hideMusicPrompt(); });
    if (dismissBtn) dismissBtn.addEventListener('click', () => { sound.setEnabled(false); hideMusicPrompt(); });
}

function initSoundToggle() {
    const btn = $('#soundToggle');
    if (!btn || !sound.available) return;
    btn.addEventListener('click', () => {
        const willEnable = btn.getAttribute('aria-pressed') !== 'true';
        sound.setEnabled(willEnable);
        hideMusicPrompt();
    });
}

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
        const link = e.target.closest('a, button, input, select, textarea, label');
        ring.classList.toggle('is-link', Boolean(link));
        label.textContent = '';
    });
}

function initMagnetic() {
    $$('.nav__btn, .nav__mark').forEach((el) => {
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

function initScrollTop() {
    const btn = $('#scrollTopBtn');
    if (!btn) return;
    const update = () => {
        const y = window.scrollY || (lenis ? lenis.scroll : 0);
        btn.classList.toggle('is-visible', y > 400);
    };
    window.addEventListener('scroll', update, { passive: true });
    if (lenis) lenis.on('scroll', update);
    btn.addEventListener('click', () => {
        if (lenis) lenis.scrollTo(0, { duration: 1.1 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initYear() {
    const yr = $('#copyrightYear');
    if (yr) yr.textContent = new Date().getFullYear();
}

function decodeEmail(b64) {
    if (!b64) return '';
    try { return atob(b64); } catch { return ''; }
}

function initEmailObfuscation() {
    $$('[data-obf-email]').forEach((el) => {
        const email = decodeEmail(el.dataset.obfEmail);
        if (!email) return;
        el.setAttribute('href', `mailto:${email}`);
        if (!el.dataset.preserveText) el.textContent = email;
    });
}

function initWhatsAppModal() {
    const modal = $('#waModal');
    const trigger = $('#waToggleBtn');
    const closeBtn = $('#waModalClose');
    const backdrop = $('#waModalBackdrop');
    const footerTrigger = $('#footerWaTrigger');
    const exportTrigger = $('#catalogWaTrigger');
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

    trigger.addEventListener('click', () => (modal.hasAttribute('hidden') ? openModal() : closeModal()));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (footerTrigger) footerTrigger.addEventListener('click', () => openModal());
    if (exportTrigger) {
        exportTrigger.addEventListener('click', () => {
            openModal('Hello Divulge Living, I am browsing your Products Catalog and would like an export / wholesale quote.');
        });
    }
    if (indexTrigger) {
        indexTrigger.addEventListener('click', () => {
            const indexToggle = $('#indexToggle');
            if (indexToggle && indexToggle.getAttribute('aria-expanded') === 'true') indexToggle.click();
            openModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
    });
    if (msgInput) msgInput.addEventListener('input', updateIndividualLinks);

    if (pingBtn) {
        pingBtn.addEventListener('click', () => {
            const userMsg = msgInput && msgInput.value.trim()
                ? msgInput.value.trim()
                : 'Hello Divulge Living, I would like to enquire about your products catalog.';
            const encoded = encodeURIComponent(userMsg);

            try {
                fetch(WEBHOOK_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ timestamp: new Date().toISOString(), action: 'whatsapp_ping_both', message: userMsg }),
                }).catch(() => {});
            } catch {}

            window.open(`https://wa.me/918584922331?text=${encoded}`, '_blank');
            setTimeout(() => {
                try { window.open(`https://wa.me/919123956594?text=${encoded}`, '_blank'); } catch {}
            }, 350);

            if (pingStatus) {
                pingStatus.innerHTML = `✓ Studio chat launched. <a href="https://wa.me/919123956594?text=${encoded}" target="_blank" rel="noopener noreferrer" style="color: #25D366; text-decoration: underline; font-weight: 600;">Also open Kanika Bose (+91 91239 56594)</a>`;
            }
        });
    }
}
