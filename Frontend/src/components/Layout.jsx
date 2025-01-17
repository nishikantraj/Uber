import Header from "./Header"


// eslint-disable-next-line react/prop-types
export const Layout = ({children}) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
          <Header/>
        <main className="min-h-screen container mx-auto px-4 py-8">
            {children}
        </main>

        <footer className="border-t backdrop-blur py-10 supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto text-center container px-4 text-gray-400">
                <p>Made with 💕 by NS</p>
            </div>
        </footer>
    </div>
  )
}