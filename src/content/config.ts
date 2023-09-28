import { z, defineCollection } from "astro:content";

//src: https://docs.astro.build/es/guides/content-collections/
/*
defineCollection({
  schema: z.object({
    isDraft: z.boolean(),
    title: z.string(),
    sortOrder: z.number(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    author: z.string().default('Anonymous'),
    language: z.enum(['en', 'es']),
    tags: z.array(z.string()),
    // Una propiedad opcional del frontmatter. ¡Muy común!
    footnote: z.string().optional(),
    // En el frontmatter, las fechas escritas sin comillas se interpretan como objetos Date
    publishDate: z.date(),
    // También puedes transformar un string de fecha (por ejemplo, "2022-07-08") a un objeto Date
    // publishDate: z.string().transform((str) => new Date(str)),
    // Avanzado: Valida que el string también sea un correo electrónico
    authorContact: z.string().email(),
    // Avanzado: Valida que el string también sea una URL
    canonicalURL: z.string().url(),
  })
})
*/

const projectsSchema = z.object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string(),
    subtitle: z.string(),
    excerpt: z.string(),
    category: z.string(),
    thumbnail: z.string(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    main_media: z.object({type: z.string(), url: z.string(), origin: z.string(), alt: z.string()}).optional(),
    media: z.array(z.object({type: z.string(), url: z.string(), origin: z.string(), alt: z.string()})).optional(),
    links: z.array(z.object({url: z.string(), value: z.string()})).optional(),
    priority: z.number().optional(),
});

const projectCollection = defineCollection({ type: 'content', schema: projectsSchema });


export const collections = {
    'projects': projectCollection
}
