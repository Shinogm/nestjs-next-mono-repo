import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().optional(), 
  apellido: z.string().optional(), 
  email: z.string().email().optional(),
  password: z.string().optional(), 
  is_seller: z.enum(["CLIENT", "SELLER"]), 
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
export type Users = z.infer<typeof usersSchema>;

export async function getUsers() {
    const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
    })

    if (!response.ok) {
        return {
            status: response.status,
        }
    }

    // Parse the JSON data
    const data = await response.json()

    const parsedData = usersSchema.parse(data)

    return {
        status: response.status,
        data: parsedData,
    }
}

export async function getUser(id: number) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET',
    })

    if (!response.ok) {
        return {
            status: response.status,
        }
    }
    
    const data = await response.json()

    const parsedData = userSchema.parse(data)

    return {
        status: response.ok,
        data: parsedData,
    }
}