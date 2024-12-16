import { z } from 'zod';

const imageSchema = z.object({
  id: z.number().optional(),
  imagen: z.string().optional(),
});

const imageArraySchema = z.array(imageSchema);


export type imageArraySchema = z.infer<typeof imageArraySchema>;
export type imageSchema = z.infer<typeof imageSchema>;

export const productSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional().nullable(),
  rooms: z.number(),
  huesped: z.number(),
  price: z.string(),
  images: imageArraySchema,
  purchased: z.boolean(),
});

export const productsSchema = z.array(productSchema);
export type productType = z.infer<typeof productSchema>;
export type productsType = z.infer<typeof productsSchema>;

export async function getProducts() {
  const response = await fetch('http://localhost:3000/products', {
    method: 'GET',
  })
  
  if (!response.ok) {
    return {
      status: response.status,
    }
  }
  
  const data = await response.json()
  console.log(data);
  
  const parsedData = productsSchema.parse(data)
  
  return {
    status: response.status,
    data: parsedData,
  }
}