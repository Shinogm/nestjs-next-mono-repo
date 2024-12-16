import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Departamentos en el Mar</h3>
            <p className="text-sm">Your perfect beach vacation starts here</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">123 Seaside Avenue, Beach City, BC 12345</p>
            <p className="text-sm">Phone: (555) 123-4567</p>
            <p className="text-sm">Email: leslievalenzuela@gmail.com</p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Facebook />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

