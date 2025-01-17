import { Link } from "react-router-dom"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./DarkTheme";


const Header = () => {
    const {theme, setTheme} = useTheme();
    const isDark = theme==="dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="flex container mx-auto h-16 items-center justify-between">
            <Link to="/">
                <img src={isDark? '/darkn.jpg': '/light.jpeg'} alt="log" className="h-16 rounded-full" />
            </Link>

            <div className="flex gap-4">
                {/* Search */}
                {/* <CitySearch/> */}
                {/* theme toggle */}
                <div onClick={()=>setTheme(isDark? "light": "dark")} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark? "rotate-180": "rotate-0"}`}>
                    {isDark? (<Sun className="h-6 w-6 rotate-0 transition-all text-yellow-500"/>):
                        (<Moon className="h-6 w-6 rotate-0 transition-all text-blue-500"/>)}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header