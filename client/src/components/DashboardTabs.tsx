import { AuthTab } from "@/lib/types";
import { ShieldCheck, TrendingUp, AlertTriangle, Fingerprint, Shield, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardTabsProps {
  activeTab: AuthTab;
  onChange: (tab: AuthTab) => void;
}

interface EnhancedTabItem {
  id: AuthTab;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function DashboardTabs({ activeTab, onChange }: DashboardTabsProps) {
  const tabs: EnhancedTabItem[] = [
    { id: AuthTab.AUTHENTICATION, label: "DeafAuth™ & ID.me Verification", icon: ShieldCheck, badge: "NIST IAL2" },
    { id: AuthTab.IDENTITY, label: "W3C DID Vault", icon: Fingerprint, badge: "ZKP" },
    { id: AuthTab.REPUTATION, label: "Reputation & Trust", icon: TrendingUp },
    { id: AuthTab.RISK, label: "Intelligent Risk", icon: AlertTriangle },
    { id: AuthTab.FRAUD, label: "Fraud Shield", icon: Shield },
    { id: AuthTab.ENO, label: "E&O Protection", icon: UserCheck },
  ];

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-xl border border-purple-200/40 dark:border-purple-800/40 backdrop-blur-md transition-all duration-300">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Fingerprint className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground flex items-center gap-2">
              Sovereign Identity & Biometric Security Engine
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Live Zero-Trust
              </span>
            </span>
            <p className="text-xs text-muted-foreground">
              Integrated with DeafAuth™ Visual Gestures, ID.me™ NIST SP 800-63-3 IAL2, and W3C DIDs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5 bg-background/80 px-2.5 py-1 rounded-md border shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Ed25519 Active
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-background/80 px-2.5 py-1 rounded-md border shadow-2xs">
            WCAG 2.2 AAA
          </span>
        </div>
      </div>
      
      <div className="relative bg-muted/40 p-1.5 rounded-xl border border-border/80 shadow-inner">
        <div className="overflow-x-auto scrollbar-hide py-0.5">
          <nav className="flex space-x-1 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChange(tab.id)}
                  className={`
                    relative flex items-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap outline-hidden select-none
                    ${isActive 
                      ? "text-purple-950 dark:text-purple-100 shadow-xs" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-fluid-pill"
                      className="absolute inset-0 bg-background rounded-lg border border-purple-500/20 shadow-xs"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${isActive ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300" : "bg-muted text-muted-foreground"}`}>
                        {tab.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

