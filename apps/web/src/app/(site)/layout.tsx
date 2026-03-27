import { Navbar } from '@/components/local/navbar'
import { Footer } from '@/components/local/footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  )
}
