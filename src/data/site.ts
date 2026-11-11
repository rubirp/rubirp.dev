import { t } from "i18next";
import { localizePath } from "astro-i18next";
import type { CollectionEntry } from "astro:content";

/*
  Datos estructurales de la web: etapas profesionales y su relación con los proyectos.
  Los textos viven en public/locales/<idioma>/translation.json; aquí solo hay claves,
  fechas y enlaces.
*/

export const EMAIL = "rubi_almansa@hotmail.com";

export const SOCIAL = [
    { label: "GitHub", url: "https://github.com/rubirp" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/rubirp" },
    { label: "Twitter", url: "https://twitter.com/irubi_rp" },
];

type YearMonth = [year: number, month: number];

export interface JobProject {
    /** Índice del proyecto dentro de la etapa en translation.json (cv.projects…<n>). */
    n: number;
    /** Slug de la ficha en src/content/projects. Sin slug, el proyecto solo aparece en el CV. */
    slug?: string;
    /** Enlace externo que se muestra en el CV. */
    url?: string;
}

export interface Job {
    id: string;
    /** Clave base en translation.json. */
    key: string;
    from: YearMonth;
    /** null = etapa actual. */
    to: YearMonth | null;
    projects: JobProject[];
}

/* De la más reciente a la más antigua. */
export const jobs: Job[] = [
    {
        id: "linko",
        key: "cv.projects.pro.linko",
        from: [2024, 11],
        to: null,
        projects: [
            { n: 0 },
            { n: 1 },
            { n: 2, slug: "pachinko-linko" },
            { n: 3, slug: "linko5" },
        ],
    },
    {
        id: "magic-media",
        key: "cv.projects.pro.magic-media",
        from: [2023, 12],
        to: [2024, 9],
        projects: [{ n: 0, slug: "pogo-slots", url: "https://www.pogo.com/games/pogo-slots" }],
    },
    {
        id: "monti-games",
        key: "cv.projects.pro.monti-games",
        from: [2021, 5],
        to: [2023, 8],
        projects: [
            { n: 0, slug: "risk-pogo-domination", url: "https://www.pogo.com/games/risk-pogo-domination" },
            { n: 1, slug: "yahtzee-wild", url: "https://www.pogo.com/games/yahtzee-wild" },
            { n: 2, slug: "scrabble", url: "https://www.pogo.com/games/scrabble" },
        ],
    },
    {
        id: "per",
        key: "cv.projects.per",
        from: [2018, 1],
        to: [2023, 5],
        projects: [
            { n: 0, slug: "touch-the-coin", url: "https://frasquitogames.itch.io/touch-the-coin" },
            { n: 1, slug: "pet-balls", url: "https://frasquitogames.itch.io/pet-balls" },
            { n: 2, url: "https://frasquitogames.com" },
        ],
    },
];

/* ---------- Escala del libro de experiencia ---------- */

const ORIGIN_YEAR = 2018;
const monthIndex = ([year, month]: YearMonth) => (year - ORIGIN_YEAR) * 12 + (month - 1);

/** Escala temporal: de enero de 2018 al final del año en curso. */
export function timeline() {
    const today = new Date();
    const years = today.getFullYear() - ORIGIN_YEAR + 1;
    const labels: { year: number; offset: number }[] = [];
    for (let offset = 0; offset < years; offset += 2) {
        labels.push({ year: ORIGIN_YEAR + offset, offset });
    }
    return {
        years,
        span: years * 12,
        labels,
        /** Meses de inicio y fin (fin exclusivo) contados desde el origen. */
        range(job: Job) {
            const end: YearMonth = job.to ?? [today.getFullYear(), today.getMonth() + 1];
            return { start: monthIndex(job.from), end: monthIndex(end) + 1 };
        },
    };
}

const formatMonth = ([year, month]: YearMonth) => String(month).padStart(2, '0') + '/' + year;

/** Fechas de una etapa como texto: { from: '11/2024', to: '09/2024' | null }. */
export function formatPeriod(job: Job) {
    return { from: formatMonth(job.from), to: job.to ? formatMonth(job.to) : null };
}

/** Etapa completa en una línea, por ejemplo '12/2023 – 09/2024' o '11/2024 – hoy'. */
export function periodText(job: Job) {
    const period = formatPeriod(job);
    return period.from + ' – ' + (period.to ?? t('cv.now'));
}

/* ---------- Proyectos ---------- */

const COMPANY_TAGS = ["tags.pogo", "tags.linko", "tags.games-global"];
const KIND_TAGS = ["tags.slots", "tags.multiplayer", "tags.amstrad"];

function findJob(slug: string) {
    for (const job of jobs) {
        const project = job.projects.find((item) => item.slug === slug);
        if (project) return { job, project };
    }
    return null;
}

export type ProjectEntry = CollectionEntry<"projects">;

/** Reúne, ya traducido, todo lo que las listas y la ficha muestran de un proyecto. */
export function projectInfo(entry: ProjectEntry) {
    const data = entry.data;
    const found = findJob(entry.slug);
    const tags = data.tags ?? [];
    const base = found ? `${found.job.key}.${found.project.n}` : null;

    return {
        slug: entry.slug,
        category: data.category,
        url: localizePath("/projects/" + entry.slug),
        img: data.thumbnail,
        title: t(data.title),
        tagline: t(data.subtitle),
        role: base ? t(`${base}.subtitle`) : t(data.subtitle),
        did: base ? t(`${base}.description`) : t(data.excerpt),
        studio: t(`studios.${found ? found.job.id : "per"}`),
        when: found ? periodText(found.job) : "",
        tech: tags.filter((tag) => !COMPANY_TAGS.includes(tag) && !KIND_TAGS.includes(tag)).map((tag) => t(tag)),
        kind: tags.filter((tag) => KIND_TAGS.includes(tag)).map((tag) => t(tag)),
        links: (data.links ?? []).filter((link) => link.url),
    };
}

export type ProjectInfo = ReturnType<typeof projectInfo>;

export const byPriority = (a: ProjectEntry, b: ProjectEntry) => (a.data.priority ?? 0) - (b.data.priority ?? 0);

/** En producción se ocultan los borradores. */
export const isPublished = ({ data }: ProjectEntry) => (import.meta.env.PROD ? data.draft !== true : true);
