import { z } from 'zod';

// Definir el esquema para la respuesta del vendedor
export const sellerSchema = z.object({
  id: z.number(),
});

export default async function createSeller(form: { [key: string]: FormDataEntryValue }) {
    const numericForm = Object.fromEntries(
        Object.entries(form).map(([key, value]) => {
            const numericValue = isNaN(Number(value)) ? value : Number(value);
            return [key, numericValue];
        })
    );
    const response = await fetch('http://localhost:3000/seller', {
        method: 'POST',
        body: JSON.stringify(numericForm),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return {
            status: response.status,
        };
    }

    const data = await response.json();

    const parsedData = sellerSchema.parse(data);

    return {
        status: response.ok,
        data: parsedData,
    };
}
