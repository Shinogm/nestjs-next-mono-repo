import { z } from 'zod';
export const productSchema = z.object({
  nombre: z.string().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  rooms: z.number(),
  huesped: z.number(),
  price: z.string(),
id: z.number().optional(),
});

export type productType = z.infer<typeof productSchema>;

export default async function createProducts(form: unknown) {
    console.log('form', form)
    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    console.log('response', response)

    if (!response.ok) {
        return {
            status: response.status,
        }
    }

    const data = await response.json()

    const parsedData = productSchema.parse(data)

    return {
        status: response.ok,
        data: parsedData,
    }
}
export async function createProductImage(id: number, image: File) {
    const formData = new FormData();
    formData.append("file", image);  // El campo 'file' debe coincidir con el nombre del campo de archivo en tu servidor

    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        return {
            status: response.status,
        };
    }

    const data = await response.json();

    return {
        status: response.ok,
        data: data,
    };
}
