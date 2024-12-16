import { z } from 'zod';

export const userSchema = z.object({
  nombre: z.string().optional(),
  apellido: z.string().optional(),
  email: z.string().email().optional(), 
  password: z.string().optional(), 
  is_seller: z.enum(["CLIENT", "SELLER"]),
  id: z.number(),
});

export type userType = z.infer<typeof userSchema>

export async function createUser(formObj: { [key: string]: FormDataEntryValue }) {
    console.log(formObj);

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObj),  // Convertir el objeto a JSON
    });

    if (!response.ok) {
        return {
            status: response.status,
        };
    }

    const data = await response.json();
    const parsedData = userSchema.parse(data);

    return {
        status: response.ok,
        data: parsedData,
    };
}

