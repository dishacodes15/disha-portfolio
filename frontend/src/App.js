import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import avatarImg from "./assets/avatar.jpg";
import "./App.css";

/* ------------------------------------------------------------------
   DISHA MADHUSUDANA — Player One
   Retro 2000s gameresque portfolio · Bengaluru · CS student
------------------------------------------------------------------ */

const PROJECTS = [
    {
        lvl: "LVL·01",
        badge: "CASE·A",
        readTime: "6 min read",
        year: "2025",
        title: (<>Karnataka Air Quality <em>Compliance</em> Dashboard</>),
        summary: "Turns raw government sensor data into a live legal-compliance map across 22 stations.",
        desc:
            "Pulled years of messy CPCB exports, checked every daily reading against India's official NAAQS pollution limits, and modeled how wind and winter temperature inversions drive seasonal spikes — all explorable on an interactive map with station-vs-station comparisons.",
        tags: ["Python", "Data Viz", "Leaflet.js", "Pandas"],
        img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&auto=format&fit=crop&q=80",
        reveal: "Every daily reading benchmarked against NAAQS — the map is basically a legal audit that happens to be beautiful.",
        links: [{ label: "▶ view source", href: "https://github.com/dishacodes15/NAAQS-karnataka-compliance-analysis" }],
    },
    {
        lvl: "LVL·02",
        badge: "CASE·B",
        readTime: "8 min read",
        year: "2025",
        title: (<>ONCORA — Privacy-Preserving <em>Neuro-Oncology</em></>),
        summary: "A dual-agent clinical AI system trained across hospitals — without any patient data ever leaving their walls.",
        desc:
            "A ResNet-18 model classifies brain MRI scans with Grad-CAM explainability, a BioBERT agent flags dangerous drug interactions in prescriptions, and Flower-based federated learning keeps every hospital's data local — sharing only model weights, never raw records.",
        tags: ["PyTorch", "Federated Learning", "FastAPI", "BioBERT"],
        img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&auto=format&fit=crop&q=80",
        reveal: "Flower orchestrates rounds across sites; only weights travel. Grad-CAM makes every prediction defensible in a hospital review.",
        links: [{ label: "▶ view source", href: "https://github.com/dishacodes15/oncora" }],
    },
    {
        lvl: "LVL·03",
        badge: "CASE·C",
        readTime: "4 min read",
        year: "2025",
        title: (<>ELI5 — Explain Like <em>I&apos;m 5</em></>),
        summary: "A Chrome extension that explains confusing text on any page in plain English, right where you're reading.",
        desc:
            "Highlight text, right-click, and a tooltip explains it inline using the Gemini API — no tabs, no copy-pasting. Built with real security discipline: header-based API keys, textContent rendering to block XSS, and explicit prompt-injection defenses.",
        tags: ["Chrome Extension", "Gemini API", "JavaScript"],
        img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&auto=format&fit=crop&q=80",
        reveal: "textContent everywhere (no innerHTML), prompts are wrapped so injected instructions get treated as data, keys never touch the DOM.",
        links: [{ label: "▶ view source", href: "https://github.com/dishacodes15/ELI5" }],
    },
    {
        lvl: "LVL·04",
        badge: "CASE·D",
        readTime: "7 min read",
        year: "2024",
        title: (<>PRAGATHI — Banking <em>Transaction</em> Analyzer</>),
        summary: "A full-stack Java app for tracking bank transactions with live analytics — via both a UI and a REST API.",
        desc:
            "Three-tier architecture: a JSP frontend, a Servlet-based REST API with full CRUD across 10+ endpoints, and a JDBC data layer using PreparedStatements to stay injection-safe. Dockerized, with an H2 database that sets itself up on first run.",
        tags: ["Java", "Servlets", "JDBC", "Docker"],
        img: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1200&auto=format&fit=crop&q=80",
        reveal: "First-run bootstrap: container spins up H2, seeds schema, opens both the JSP UI and the REST surface without any manual setup.",
        links: [
            { label: "▶ live demo", href: "https://fintrack-qo3w.onrender.com/transaction-analyzer" },
            { label: "▶ view source", href: "https://github.com/dishacodes15/jdbc-transaction-tracker" },
        ],
    },
    {
        lvl: "LVL·05",
        badge: "CASE·E",
        readTime: "5 min read",
        year: "2024",
        title: (<>GLITCHES — Personal <em>Blog</em> Platform</>),
        summary: "A blog with a JWT-secured admin dashboard for creating, editing, and deleting posts.",
        desc:
            "Built with Express and EJS templates on top of MongoDB, with bcrypt-hashed passwords behind JWT authentication — a full publish-and-manage flow, not just a static blog.",
        tags: ["Node.js", "Express", "MongoDB", "JWT"],
        img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
        reveal: "bcrypt on the way in, JWT on the way out — the auth is small, boring, and correct. Which is the point.",
        links: [{ label: "▶ view source", href: "https://github.com/dishacodes15/blog-site" }],
    },
];

const SIDE_QUESTS = [
    {
        tag: "SIDE·QUEST",
        title: "Konami-code easter egg",
        html: (
            <>
                A weekend build to learn keyboard event listeners and CSS animation
                timing properly. Try it for a surprise, fair warning for epilepsy
                though!! <code>↑ ↑ ↓ ↓ ← → ← → B A</code>
            </>
        ),
    },
    {
        tag: "SIDE·QUEST",
        title: "CLI habit tracker",
        html: (
            <>
                A Python CLI that logs your daily habits to a local file and
                guilt-trips you in ASCII art if you break your streak.
            </>
        ),
    },
];

const SKILL_GROUPS = [
    {
        cat: "languages",
        items: ["Java", "Python", "JavaScript", "TypeScript", "C++", "HTML", "CSS"],
    },
    {
        cat: "backend & frameworks",
        items: ["Java Servlets", "Node.js", "Express.js", "React.js", "FastAPI", "Flower (Federated Learning)", "Maven", "Gradle"],
    },
    {
        cat: "databases",
        items: ["PostgreSQL", "MySQL", "Oracle", "H2 (RDBMS)", "MongoDB (NoSQL)"],
    },
    {
        cat: "AI / ML & data analytics",
        items: ["PyTorch", "BioBERT", "Federated Learning (FedProx)", "Pandas", "NumPy", "Matplotlib", "SQL"],
    },
    {
        cat: "cloud & devops",
        items: ["AWS", "GCP", "Docker", "Git", "GitHub", "Jenkins", "Ansible", "CI/CD"],
    },
    {
        cat: "other",
        items: ["Agile", "Unit Testing", "Selenium", "Defect Tracking", "API Integration", "Responsive Design", "Debugging"],
    },
];

const CHAPTERS = [
    {
        num: "CH·01",
        title: (<>Systems that reward you for staying <em>curious</em>.</>),
        body:
            "\u201CI like systems that reward you for staying curious a little longer than everyone else.\u201D I grew up around consoles and video games before I ever wrote a line of code, and that early curiosity about how systems work has shaped how I approach problems since. As a computer science student in Bengaluru, I'm drawn to projects that pair technical depth with real-world relevance — government data, healthcare, or everyday tools people actually use.",
    },
    {
        num: "CH·02",
        title: (<>I value <em>iteration</em> over waiting for the perfect idea.</>),
        body:
            "I'd rather ship something small and imperfect that teaches me something than sit on a polished concept indefinitely. Every project on this page is a version, not a verdict — still in beta, patch notes coming soon.",
    },
];

const NAV_LINKS = [
    { label: "home", href: "#home" },
    { label: "work", href: "#work" },
    { label: "inventory", href: "#inventory" },
    { label: "about", href: "#about" },
    { label: "contact", href: "#contact" },
];

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
];

const MARQUEE_ITEMS = [
    "player one",
    "still loading the character build",
    "speedrunning computer science",
    "bengaluru → the internet",
    "coffee.exe · status: on",
    "press START to play",
];

/* -------------------- BOOT LOADER -------------------- */
function Boot({ onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 1500);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <div className="boot" data-testid="boot-loader">
            <div className="boot-crt">
                <div className="boot-line l1">DISHA.OS v1.24 — BOOT</div>
                <div className="boot-line l2">&gt; loading /disk/portfolio ...</div>
                <div className="boot-line l3">&gt; player one detected — controller: ok</div>
                <div className="boot-line l4 boot-cursor">&gt; press START to play</div>
            </div>
        </div>
    );
}

/* -------------------- TOP BAR + THEME TOGGLE -------------------- */
function TopBar({ theme, setTheme }) {
    return (
        <>
            <div className="top-bar" data-testid="top-bar">
                <span className="dot" />
                <span>disha.exe</span>
                <span className="top-bar-sub" style={{ opacity: 0.55, marginLeft: 8 }}>
                    // now playing: system design + DSA
                </span>

            </div>
            <button
                className="gb-toggle"
                data-testid="theme-toggle"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="toggle theme"
            >
                <span className="gb-knob" />
            </button>
        </>
    );
}

/* -------------------- NAV -------------------- */
function Nav({ active, onNavigate }) {
    return (
        <nav className="site-nav" data-testid="site-nav" aria-label="primary">
            {NAV_LINKS.map((l) => {
                const id = l.href.slice(1);
                return (
                    <a
                        key={l.href}
                        href={l.href}
                        className={active === id ? "active" : undefined}
                        onClick={(e) => onNavigate(e, l.href)}
                        data-testid={`nav-link-${id}`}
                    >
                        {l.label}
                    </a>
                );
            })}
        </nav>
    );
}

/* -------------------- HERO -------------------- */
function Hero() {
    const reduce = useReducedMotion();
    const { scrollY } = useScroll();
    const gbY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -120]);
    const gbRot = useTransform(scrollY, [0, 600], [-5, reduce ? -5 : -14]);

    return (
        <section className="hero grid-bg" id="home" data-testid="hero-section">
            <div className="hero-eyebrow" data-testid="hero-eyebrow">
                PLAYER ONE
            </div>

            <h1 className="hero-title" data-testid="hero-title">
                <span className="line-mask">
                    <span className="line-inner">disha</span>
                </span>
                <span className="line-mask">
                    <span className="line-inner">madhusudana</span>
                </span>
            </h1>

            <motion.div
                className="hero-sig"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.9 }}
                data-testid="hero-signature"
            >
                <p className="hero-sig-quote">
                    still loading the character build — currently speedrunning
                    computer science.
                </p>
                <p className="hero-sig-meta">
                    Based in <strong>Bengaluru</strong>. CS student, builder,
                    pushing both code and my luck.
                </p>
            </motion.div>

            <motion.div
                className="pixel-gb"
                data-testid="hero-gameboy"
                style={{ y: gbY, rotate: gbRot }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.5, ease: [0.2, 0.7, 0.15, 1] }}
            >
                <div className="pixel-gb-screen">
                    ★ DISHA.GB
                    <br />
                    HP ▮▮▮▮▮
                    <br />
                    MP ▮▮▮▮▯
                    <br />
                    XP 24/99
                </div>
                <div className="pixel-gb-btns">
                    <div className="gb-dpad" />
                    <div className="gb-ab">
                        <span />
                        <span />
                    </div>
                </div>
            </motion.div>

            <div className="hero-meta" data-testid="hero-meta">
                <div>
                    <span className="k">now·playing/</span>{" "}
                    <strong>system design + DSA</strong>
                </div>
                <div>
                    <span className="k">lines·debugged·@·2am/</span>{" "}
                    <strong>∞</strong>
                </div>
                <div>
                    <span className="k">coffee.exe/</span>{" "}
                    <strong>status: ON</strong>
                </div>
            </div>

            <div className="scroll-hint">
                scroll — press{" "}
                <strong style={{ color: "hsl(var(--pink))" }}>▼</strong>
                <span className="arrow" />
            </div>
        </section>
    );
}

/* -------------------- MARQUEE -------------------- */
function Marquee() {
    const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    return (
        <div className="marquee" data-testid="marquee">
            <div className="marquee-track">
                {items.map((t, i) => (
                    <span
                        key={i}
                        style={{ display: "inline-flex", alignItems: "center", gap: 30 }}
                    >
                        {t}
                        <span className="marquee-star">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* -------------------- SECTION HEADER -------------------- */
function SectionHead({ label, children, testId }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.15, 1] }}
            data-testid={testId}
        >
            <div className="section-label">{label}</div>
            <h2 className="section-heading">{children}</h2>
        </motion.div>
    );
}

/* -------------------- PROJECTS -------------------- */
function Projects() {
    return (
        <section className="section" id="work" data-testid="projects-section">
            <SectionHead label="/// case studies · hover to unfold" testId="projects-head">
                Five things I <em>actually shipped</em> — treat these like journal
                entries, not portfolio grids.
            </SectionHead>

            <div className="projects-grid">
                {PROJECTS.map((p, i) => (
                    <motion.article
                        key={i}
                        className="p-card"
                        data-testid={`project-card-${i}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                            duration: 0.7,
                            delay: i * 0.08,
                            ease: [0.2, 0.7, 0.15, 1],
                        }}
                    >
                        <div className="p-tape" aria-hidden />
                        <div className="p-frame">
                            <span className="p-badge">{p.badge}</span>
                            <img src={p.img} alt="" loading="lazy" />
                        </div>
                        <div className="p-meta">
                            <span className="lvl">
                                {p.lvl} · {p.year}
                            </span>
                            <span>{p.readTime}</span>
                        </div>
                        <h3 className="p-title">{p.title}</h3>
                        <p className="p-desc" style={{ fontStyle: "italic", marginBottom: 10, color: "hsl(var(--ink))" }}>
                            {p.summary}
                        </p>
                        <p className="p-desc">{p.desc}</p>
                        <div className="p-tags">
                            {p.tags.map((t) => (
                                <span key={t}>{t}</span>
                            ))}
                        </div>
                        <div className="p-links">
                            {p.links.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid={`project-${i}-link`}
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>
                        <div className="p-reveal">
                            <div className="p-reveal-inner">
                                “{p.reveal}”
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* SIDE QUESTS */}
            <motion.div
                className="section-label"
                style={{ marginTop: 100, marginBottom: 0 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
                data-testid="side-quests-label"
            >
                /// side quests · weekend runs
            </motion.div>
            <div className="quests" data-testid="side-quests">
                {SIDE_QUESTS.map((q, i) => (
                    <motion.div
                        key={i}
                        className="quest"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        data-testid={`side-quest-${i}`}
                    >
                        <span className="quest-tag">{q.tag}</span>
                        <h4 className="quest-title">{q.title}</h4>
                        <p className="quest-desc">{q.html}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* -------------------- INVENTORY (skills) -------------------- */
function Inventory() {
    return (
        <section className="section" id="inventory" data-testid="inventory-section">
            <SectionHead label="/// inventory · equipment" testId="inventory-head">
                My current <em>inventory</em> — the tools I reach for without
                thinking.
            </SectionHead>

            <div className="inventory-groups">
                {SKILL_GROUPS.map((g, i) => (
                    <motion.div
                        key={g.cat}
                        className="skill-group"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.45, delay: i * 0.06 }}
                        data-testid={`skill-group-${i}`}
                    >
                        <div className="skill-group-cat">{g.cat}</div>
                        <div className="skill-group-items">
                            {g.items.map((item) => (
                                <span className="skill-chip" key={item}>{item}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* -------------------- MANIFESTO / ABOUT -------------------- */
function Manifesto() {
    return (
        <section className="section" id="about" data-testid="about-section">
            <SectionHead label="/// about · character sheet" testId="about-head">
                A short <em>readme</em> about how I think.
            </SectionHead>

            <div className="manifesto-wrap">
                <motion.aside
                    className="manifesto-side"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    data-testid="about-side"
                >
                    <div className="avatar-frame">
                        <img src={avatarImg} alt="Disha Madhusudana" />
                    </div>
                    <div>
                        <strong style={{ color: "hsl(var(--ink))" }}>
                            disha madhusudana
                        </strong>
                        <br />
                        cs student · bengaluru
                        <br />
                        <br />
                        still in beta<br />
                        patch notes coming soon
                    </div>
                </motion.aside>

                <div>
                    {CHAPTERS.map((c, i) => (
                        <motion.div
                            key={i}
                            className="chapter"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.7, 0.15, 1] }}
                            data-testid={`chapter-${i}`}
                        >
                            <div className="chapter-num">{c.num}</div>
                            <div className="chapter-body">
                                <h3>{c.title}</h3>
                                <p>{c.body}</p>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        className="stats"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7 }}
                        data-testid="stats"
                    >
                        <div className="stat">
                            <div className="k">based·in</div>
                            <div className="v">Bengaluru</div>
                        </div>
                        <div className="stat">
                            <div className="k">now·playing</div>
                            <div className="v">
                                sys·<em>design</em>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="k">favourite·stack</div>
                            <div className="v">
                                py + <em>curiosity</em>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="k">status</div>
                            <div className="v">
                                <em>still</em>·in·beta
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer" id="contact" data-testid="footer-section">
            <div className="footer-grid">
                <motion.h2
                    className="footer-cta"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7 }}
                    data-testid="footer-cta"
                >
                    <em>insert coin</em> — say hi at
                    <br />
                    <a href="mailto:disham0023@gmail.com" data-testid="footer-mail">
                        disham0023@gmail.com
                    </a>
                </motion.h2>

                <motion.div
                    className="footer-links"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    data-testid="footer-links"
                >
                    <a
                        href="https://github.com/dishacodes15"
                        target="_blank"
                        rel="noreferrer"
                    >
                        github / dishacodes15
                    </a>
                    <a
                        href="https://www.linkedin.com/in/disha-madhusudana/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        linkedin / disha-madhusudana
                    </a>
                    <a href="mailto:disham0023@gmail.com">
                        mail · disham0023@gmail.com
                    </a>
                </motion.div>
            </div>

            <div className="footer-bottom" data-testid="footer-bottom">
                <div>
                    © {year} disha madhusudana · handcrafted in Bengaluru · v1.24
                </div>
                <div>
                    press START to play again <span className="caret">▮</span>
                </div>
            </div>
        </footer>
    );
}

/* -------------------- APP -------------------- */
function App() {
    const [booted, setBooted] = useState(false);
    const [theme, setTheme] = useState("light");
    const [activeSection, setActiveSection] = useState("home");
    const [konami, setKonami] = useState(false);
    const lenisRef = useRef(null);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.6,
        });
        lenisRef.current = lenis;
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        const id = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(id);
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        document.body.classList.toggle("no-scroll", !booted);
    }, [booted]);

    useEffect(() => {
        const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleNavigate = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        if (lenisRef.current) lenisRef.current.scrollTo(target);
        else target.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        let progress = 0;
        let clearTimer;
        function onKeyDown(e) {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            const expected = KONAMI_CODE[progress];
            if (key === expected) {
                progress += 1;
                if (progress === KONAMI_CODE.length) {
                    progress = 0;
                    setKonami(true);
                    clearTimeout(clearTimer);
                    clearTimer = setTimeout(() => setKonami(false), 4500);
                }
            } else {
                progress = key === KONAMI_CODE[0] ? 1 : 0;
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            clearTimeout(clearTimer);
        };
    }, []);

    return (
        <div className={`App grain${konami ? " konami-active" : ""}`} data-testid="app-root">
            {!booted && <Boot onDone={() => setBooted(true)} />}
            <TopBar theme={theme} setTheme={setTheme} />
            <Nav active={activeSection} onNavigate={handleNavigate} />
            <Hero />
            <Marquee />
            <Projects />
            <Inventory />
            <Manifesto />
            <Footer />
            <AnimatePresence>
                {konami && (
                    <motion.div
                        className="konami-banner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        data-testid="konami-banner"
                    >
                        <div className="konami-banner-title">KONAMI CODE ACCEPTED</div>
                        <div className="konami-banner-sub">✦ infinite lives unlocked ✦</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
