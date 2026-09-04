import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { User } from "@/lib/types";
import { Shield, Moon, Sun, User as UserIcon, Github, Map } from "lucide-react";
import { Link } from "wouter";

interface AppHeaderProps {
  user?: User;
}

export default function AppHeader({ user }: AppHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme toggle only happens client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-medium ml-2">NegraRosa Security</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Link 
            href="/sitemap"
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Site Map & Security Hub"
            aria-label="Site Map"
          >
            <Map className="h-5 w-5" />
          </Link>

          <a 
            href="https://github.com/NegraRosa/negrarosa-security-framework"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </a>

          <button 
            className="p-2 rounded-full hover:bg-muted"
            onClick={toggleDarkMode}
            aria-label={mounted && theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <div className="flex items-center ml-2 sm:ml-4">
            <UserIcon className="h-5 w-5 text-muted-foreground mr-1.5" />
            <span className="text-sm font-medium">
              {user ? user.fullName || user.username : "Guest User"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
