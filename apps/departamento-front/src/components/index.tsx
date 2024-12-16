'use client'
import Layout from '../components/Layout'
import { WavesIcon, SunIcon, PalmtreeIcon } from 'lucide-react'
import { getProducts, productsType } from '@/lib/api/products/get-products.api'
import { useEffect, useState } from 'react'
import ApartmentCard from './ApartmentCard'
import { motion } from 'framer-motion'

export const PageRent = () => { 
  const [products, setProducts] = useState<productsType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      const processedProducts = response?.data?.map(product => ({
        ...product,
      }));
      setProducts(processedProducts);
      setIsLoading(false);
    } catch (err) {
      console.error('Error al obtener casas en la playa:', err);
      setError('Error al cargar casas en la playa');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="absolute top-1/2 left-1/2 w-[200px] h-[200px] transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
            style={{ animation: 'spin 15s linear infinite' }}
          >
            <circle cx="50" cy="50" r="40" fill="yellow" opacity="0.6" />
            <circle cx="50" cy="50" r="25" fill="orange" opacity="0.4" />
            <circle cx="50" cy="50" r="10" fill="red" opacity="0.2" />
          </motion.svg>
        </div>
      </div>

      <section className="relative text-center mb-12 z-10">
        <motion.h1 
          className="text-5xl font-bold mb-4 text-blue-800 drop-shadow-lg" 
          initial={{ opacity: 0, y: -100, scale: 0.8 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Encuentra tu departamento en la playa ideal
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl mx-auto drop-shadow-lg" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          Disfruta de la máxima relajación en nuestras exclusivos departamentos frente al mar. Tu sueño hecho realidad está a un click.
        </motion.p>
      </section>

      <section className="relative mb-12 z-10">
        <motion.div 
          className="flex justify-center space-x-8" 
          initial={{ opacity: 0, y: 100 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="flex flex-col items-center" 
            whileHover={{ scale: 1.3, rotateY: 15 }} 
            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
          >
            <WavesIcon className="w-16 h-16 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold text-black/50">Frente al Mar</h3>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center" 
            whileHover={{ scale: 1.3, rotateY: 15 }} 
            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
          >
            <SunIcon className="w-16 h-16 text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold text-black/50">Sol Todo el Año</h3>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center" 
            whileHover={{ scale: 1.3, rotateY: 15 }} 
            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
          >
            <PalmtreeIcon className="w-16 h-16 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold text-black/50">Exclusivas Amenidades</h3>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-center text-blue-800 drop-shadow-lg p-5" 
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Departamentos Destacados
        </motion.h2>
        {isLoading ? (
          <div className="text-center text-xl">Cargando departamentos...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : products?.length === 0 ? (
          <div className="text-center text-xl">No hay departamentos disponibles</div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {products ? products.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.8, rotateX: 10 }} 
                animate={{ opacity: 1, scale: 1, rotateX: 0 }} 
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
              >
                <ApartmentCard 
                  id={product.id ?? 0}
                  title={product.nombre ?? ''}
                  location={product.direccion ?? ''}
                  images={product.images.map(image => image.imagen ?? '')}
                  capacity={product.huesped ?? 0}
                  rooms={product.rooms ?? 0} 
                  price={product.price ?? ''} 
                  purchased={product.purchased}
                />
              </motion.div>
            )) : null}
          </motion.div>
        )}
      </section>
    </Layout>
  )
}

export default PageRent
