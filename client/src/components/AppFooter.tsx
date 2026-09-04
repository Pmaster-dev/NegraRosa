import { Link } from "wouter";
import { Github, ExternalLink } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="bg-card shadow-inner mt-12 border-t border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} NegraRosa Security Framework
            </p>
            <span className="text-muted-foreground/40">|</span>
            <a 
              href="https://github.com/NegraRosa/negrarosa-security-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
            <Link href="/security-examples" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Security & SDKs
            </Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              sitemap.xml
            </a>
            <a href="/.well-known/security.txt" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              security.txt
            </a>
            <Link href="/accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
