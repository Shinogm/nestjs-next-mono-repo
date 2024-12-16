'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, FormProvider } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import createProducts, { createProductImage } from '@/lib/api/products/create-products.api'
import { useRouter } from 'next/navigation'
import { SkipBack } from 'lucide-react'

type FormDataType = {
  nombre: string
  telefono: string
  direccion: string
  rooms: number
  huesped: number
  price: number
  images?: FileList | null
}

export const BeachApartmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formMethods = useForm<FormDataType>({
    defaultValues: {
      nombre: "",
      telefono: "",
      direccion: "",
      rooms: 1,
      huesped: 1,
      price: 0,
    },
  })

  const { handleSubmit, reset, register, formState: { errors } } = formMethods
  const router = useRouter()
  async function onSubmit(values: FormDataType) {
    setIsSubmitting(true)
    try {
      const payload = {
        nombre: values.nombre,
        telefono: values.telefono,
        direccion: values.direccion,
        rooms: values.rooms,
        huesped: values.huesped,
        price: values.price,
      }

      console.log('payload', payload)
      console.log('values', values)
  
      const productResponse = await createProducts(payload); // Envía como JSON
      console.log('productResponse', productResponse)
  
      // Manejar imágenes (si es necesario subirlas)
      if (values.images) {
        const productId = productResponse?.data?.id;
        const uploadImagePromises = Array.from(values.images).map((image) =>
          createProductImage(productId ?? 0, image)
        );
        await Promise.all(uploadImagePromises);
      }
  
      reset();
      console.log("Producto e imágenes subidos con éxito!");
    } catch (error) {
      console.error("Error en la creación del producto", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-lg"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-center mb-6 text-blue-800"
      >
        <SkipBack  onClick = {() => router.back()}/>
        Nuevo Departamento en la Playa
      </motion.h2>
      
      {/* Provee el contexto a todo el formulario */}
      <FormProvider {...formMethods}>
        <FormItem>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Casa del Sol" {...register("nombre", { required: "El nombre es obligatorio", minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" } })} />
              </FormControl>
              <FormMessage>{errors.nombre?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...register("telefono", { required: "El teléfono es obligatorio", pattern: { value: /^\d{10}$/, message: "El teléfono debe tener 10 dígitos" } })} />
              </FormControl>
              <FormMessage>{errors.telefono?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Textarea placeholder="Calle de la Playa 123" {...register("direccion", { required: "La dirección es obligatoria", minLength: { value: 5, message: "La dirección debe tener al menos 5 caracteres" } })} />
              </FormControl>
              <FormMessage>{errors.direccion?.message}</FormMessage>
            </FormItem>

            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Habitaciones</FormLabel>
                <FormControl>
                  <Input type="number" {...register("rooms", { required: "Este campo es obligatorio", min: { value: 1, message: "Debe haber al menos 1 habitación" }, max: { value: 10, message: "No puede haber más de 10 habitaciones" } })} />
                </FormControl>
                <FormMessage>{errors.rooms?.message}</FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel>Huéspedes</FormLabel>
                <FormControl>
                  <Input type="number" {...register("huesped", { required: "Este campo es obligatorio", min: { value: 1, message: "Debe haber al menos 1 huésped" }, max: { value: 20, message: "No puede haber más de 20 huéspedes" } })} />
                </FormControl>
                <FormMessage>{errors.huesped?.message}</FormMessage>
              </FormItem>
            </div>

            <FormItem>
              <FormLabel>Precio por noche</FormLabel>
              <FormControl>
                <Input type="number" {...register("price", { required: "El precio es obligatorio", min: { value: 0, message: "El precio no puede ser negativo" } })} />
              </FormControl>
              <FormMessage>{errors.price?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Imágenes</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  {...register("images")}
                />
              </FormControl>
              <FormDescription>Sube múltiples imágenes del departamento</FormDescription>
            </FormItem>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Crear Departamento'}
              </Button>
            </motion.div>
          </form>
        </FormItem>
      </FormProvider>
    </motion.div>
  )
}
