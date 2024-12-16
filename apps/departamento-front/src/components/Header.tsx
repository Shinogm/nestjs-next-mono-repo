import Link from 'next/link'
import { TreePalmIcon as PalmTree, Sun } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PalmTree className="h-8 w-8" />
          <Sun className="h-8 w-8 text-yellow-300" />
          <h1 className="text-2xl font-bold">Beach House</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-blue-200 transition-colors">Home</Link></li>
            <li><Link href="/create-house" className="hover:text-blue-200 transition-colors">Create</Link></li>
            <li><Link href="" className="hover:text-blue-200 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

