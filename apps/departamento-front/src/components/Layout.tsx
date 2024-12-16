import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        <div className="absolute inset-0 bg-palm-trees opacity-5 z-0"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

