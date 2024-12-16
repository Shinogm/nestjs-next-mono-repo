import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { Home, Users, Maximize2, X, ChevronLeft, ChevronRight, DollarSign} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createUser } from "@/lib/api/create-user.api";
import createSeller from "@/lib/api/seller/create-seller.api";

interface ApartmentCardProps {
  id: number
  title: string
  images: string[]
  rooms: number
  price: string
  location: string
  capacity: number
  purchased: boolean
}

export default function ApartmentCard({ 
  id,
  title, 
  images, 
  rooms, 
  price, 
  location,
  capacity,
  purchased
}: ApartmentCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form visibility
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const handlePrevImage = () => {
    setDirection('prev');
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setDirection('next');
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const openImageViewer = () => {
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Aquí utilizamos los valores del estado formData directamente
    const form = new FormData();
    form.append('nombre', formData.nombre);
    form.append('apellido', formData.apellido);
    form.append('email', formData.email);
    form.append('password', formData.password);

    console.log([...form.entries()]); 
  
    const formObj = Object.fromEntries(form.entries());

    const response = await createUser(formObj);
    
    if (!response) {
      alert('Hubo un error al crear el usuario');
    }
  
    // Datos para la reserva
    const reservaData = {
      departamento_id: id, 
      user_id: response?.data?.id, 
      amount: price,  
      quantity: 1  
    };
  
    // Crear FormData para la reserva
    const formDataForReserva = new FormData();
    formDataForReserva.append('departamento_id', reservaData.departamento_id.toString());
    formDataForReserva.append('user_id', reservaData.user_id?.toString() || '');
    formDataForReserva.append('amount', reservaData.amount);
    formDataForReserva.append('quantity', reservaData.quantity.toString());

    const formObj2 = Object.fromEntries(formDataForReserva.entries());

    console.log('formDataForReserva', formDataForReserva);
  
    // Enviar la reserva
    const reservaResponse = await createSeller(formObj2);
  
    if (reservaResponse.data?.id) {
     window.location.reload();
      closeForm();
    } else {
      alert('Hubo un error al realizar la reserva');
    }
  };
  
  
  


  useEffect(() => {
    if (!isImageViewerOpen && images.length > 1) {
      const intervalId = setInterval(() => {
        setDirection('next');
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isImageViewerOpen, images]);

  const imageVariants = {
    initial: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? '100%' : '-100%',
      opacity: 1
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.5
      }
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? '-100%' : '100%',
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.5
      }
    })
  };

  const modalVariants = {
    hidden: { opacity: 1, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    exit: { 
      opacity: 1, 
      scale: 0.9,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
  <div className={`relative overflow-hidden ${purchased ? "opacity-70" : ""}`}>
    <AnimatePresence initial={false} custom={direction}>
      <motion.div initial="hidden" animate="visible">
        <Image
          src={`data:image/jpeg;base64,${images[currentImageIndex]}`}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      </motion.div>
    </AnimatePresence>

    {purchased ? (
      <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
        Reservado
      </div>
    ) : (
      <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
        Destacado
      </div>
    )}

    <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center">
      <Button
        onClick={handlePrevImage}
        className="bg-gray/70 hover:bg-white/70 text-gray-800 p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </Button>
      <Button
        onClick={handleNextImage}
        className="bg-gray/50 hover:bg-white/70 text-gray-800 p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
        </svg>
      </Button>
    </div>

    <Button
      onClick={openImageViewer}
      className="absolute top-2 left-2 bg-white/50 hover:bg-white/70 p-2 rounded-full"
      title="Abrir imagen"
    >
      <Maximize2 className="w-4 h-4 text-gray-800" />
    </Button>
  </div>
  <div className="p-4">
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4">{location}</p>
    <div className="flex justify-between text-sm text-gray-600 mb-4">
      <div className="flex items-center">
        <Home className="w-4 h-4 mr-1 text-blue-500" />
        <span>{rooms} habitaciones</span>
      </div>
      <div className="flex items-center">
        <Users className="w-4 h-4 mr-1 text-blue-500" />
        <span>Hasta {capacity} huéspedes</span>
      </div>
      <div className="flex items-center">
        <DollarSign className="w-4 h-4 mr-1 text-blue-500" />
        <span>{price}</span>
      </div>
    </div>
    {/* Botón Reservar */}
    <Button
      onClick={openForm}
      disabled={purchased} // Deshabilita el botón si está reservado
      className={`w-full ${
        purchased
          ? "bg-gray-400 cursor-not-allowed" // Clases cuando está deshabilitado
          : "bg-blue-600 hover:bg-blue-700"
      } text-white transition-colors duration-300`}
    >
      {purchased ? "Reservado" : "Reservar"}
    </Button>
  </div>
</div>


      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={modalVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Formulario de Reserva</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input 
                    id="nombre" 
                    name="nombre" 
                    type="text" 
                    value={formData.nombre}
                    onChange={handleInputChange} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input 
                    id="apellido" 
                    name="apellido" 
                    type="text" 
                    value={formData.apellido}
                    onChange={handleInputChange} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <Button onClick={closeForm} className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white">Cancelar</Button>
                  <Button type="submit" className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white">Reservar</Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Image Viewer Modal */}
      <AnimatePresence>
        {isImageViewerOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={modalVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <div className="relative max-w-[90vw] max-h-[90vh] w-full h-[70vh]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={`data:image/jpeg;base64,${images[currentImageIndex]}`}
                    alt={`${title} - Imagen ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button 
                  onClick={closeImageViewer} 
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  title="Cerrar"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <Button 
                onClick={handlePrevImage} 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white/70 p-2 rounded-full"
                title="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button 
                onClick={handleNextImage} 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white/70 p-2 rounded-full"
                title="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
