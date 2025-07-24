import { defineCollection, z } from "astro:content";

const productos = defineCollection({
  schema: z.object({
    title: z.string(),
    precio: z.string(),
    marca: z.string(),
    modelo: z.string(),
    imagen: z.string(),
    galeria: z.array(z.string()).optional(),
  }),
});

export const collections = {productos};