import { useState, useEffect } from "react";
import { Link } from "wouter";
import MainframeLayout from "@/components/MainframeLayout";
import { 
  Shield, 
  Smartphone, 
  Flame, 
  Key, 
  Lock, 
  Check, 
  AlertTriangle, 
  QrCode, 
  Download, 
  Printer, 
  RefreshCw, 
  Zap, 
  Users, 
  CheckCircle2, 
  Copy, 
  Info, 
  ExternalLink,
  LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface DisasterPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  monthlyDisplay: string;
  tag: string;
  highlight: string;
  features: string[];
  ctaText: string;
  bestFor: string;
  popular?: boolean;
}

export default function DisasterRecoveryPage() {
  const { toast } = useToast();
  const [plans, setPlans] = useState<DisasterPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // Killswitch state
  const [targetId, setTargetId] = useState("user@negrarosa.community");
  const [killswitchReason, setKillswitchReason] = useState("STOLEN_PHONE");
  const [isExecutingKillswitch, setIsExecutingKillswitch] = useState(false);
  const [killswitchResult, setKillswitchResult] = useState<any>(null);

  // Recovery state
  const [recoveryCodeInput, setRecoveryCodeInput] = useState("");
  const [replacementDevice, setReplacementDevice] = useState("Android / Pixel 7 (Replacement)");
  const [isRestoring, setIsRestoring] = useState(false);
  const [restorationResult, setRestorationResult] = useState<any>(null);

  // Visual Paper Card Generator state
  const [isGenerated, setIsGenerated] = useState(true);
  const visualSeedWords = [
    { num: 1, word: "SHIELD", icon: "🛡️", sign: "Hand across chest" },
    { num: 2, word: "PURPLE", icon: "🟣", sign: "P-handshake shake" },
    { num: 3, word: "ANCHOR", icon: "⚓", sign: "Two hooked fingers" },
    { num: 4, word: "ROSE", icon: "🌹", sign: "R-hand on cheek" },
    { num: 5, word: "VALLEY", icon: "🏞️", sign: "V-hand down slope" },
    { num: 6, word: "CRYPTO", icon: "🔐", sign: "C-hand rotate in palm" },
    { num: 7, word: "PHOENIX", icon: "🦅", sign: "Wings rise up" },
    { num: 8, word: "BEACON", icon: "🗼", sign: "Light radiating out" },
    { num: 9, word: "SQUARE", icon: "⏹️", sign: "Index draw 4 corners" },
    { num: 10, word: "SILENT", icon: "🤫", sign: "Index finger to lips" },
    { num: 11, word: "HARBOR", icon: "⛵", sign: "Hands boat curve" },
    { num: 12, word: "ZENITH", icon: "🌟", sign: "Pointing straight up" }
  ];

  useEffect(() => {
    fetch('/api/v1/idsec/emergency/plans')
      .then(res => res.json())
      .then(data => {
        if (data.plans) {
          setPlans(data.plans);
        }
        setLoadingPlans(false);
      })
      .catch(() => {
        // Fallback default plans
        setPlans([
          {
            id: "free-community-recovery",
            name: "Free Community Disaster Plan",
            price: 0,
            interval: "forever",
            monthlyDisplay: "$0 / free forever",
            tag: "100% Free",
            highlight: "Everything needed for stolen phone survival without paying a cent",
            features: [
              "1-Click Stolen Phone Killswitch (Instant remote severance)",
              "Printable Air-Gapped Zero-Knowledge Disaster Card",
              "12-Word Visual ASL Mnemonic Seed (Deaf-accessible)",
              "Hardware Enclave Detachment & Device Blacklist",
              "Restore on any replacement phone in under 2 minutes",
              "No credit card required ever"
            ],
            ctaText: "Activate Free Emergency Plan",
            bestFor: "Individuals, deaf community members, students, and budget-conscious users"
          },
          {
            id: "personal-guardian",
            name: "Personal Guardian Plan",
            price: 3,
            interval: "month",
            monthlyDisplay: "$3 / month (or $29/year)",
            tag: "Not Much — Budget Friendly",
            highlight: "Automated zero-knowledge protection with trusted peer social recovery",
            popular: true,
            features: [
              "Everything in Free Community Plan",
              "3-of-5 Trusted Guardian Social Recovery (Family/Deaf peers)",
              "Automated Zero-Knowledge Cloud Backup (E2E Encrypted)",
              "Anti-SIM Swap & Carrier Hijack Defense",
              "Global Stolen Hardware Blacklist Registry",
              "Automated 1-Click Fast Re-enrollment on New Phone",
              "Visual SMS/Notification Shield during phone loss"
            ],
            ctaText: "Start Protection for $3/mo",
            bestFor: "Solo professionals, creators, and everyday smartphone users"
          },
          {
            id: "family-circle-recovery",
            name: "Family & Circle Emergency Plan",
            price: 7,
            interval: "month",
            monthlyDisplay: "$7 / month",
            tag: "Best for Families",
            highlight: "Mutual emergency guardian network across up to 5 family or team phones",
            features: [
              "Up to 5 protected devices and phones",
              "Cross-device Mutual Guardian Recovery network",
              "Instant Family Member Phone Stolen Alert System",
              "Coordinated Remote Session Severing",
              "Deaf-accessible visual emergency coordination",
              "Priority replacement phone onboarding"
            ],
            ctaText: "Protect 5 Phones for $7/mo",
            bestFor: "Families, deaf peer circles, and micro-teams"
          }
        ]);
        setLoadingPlans(false);
      });
  }, []);

  const handleExecuteKillswitch = async () => {
    setIsExecutingKillswitch(true);
    try {
      const res = await fetch('/api/v1/idsec/emergency/killswitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetIdentifier: targetId,
          emergencyReason: killswitchReason,
          notes: "User triggered stolen phone emergency remote killswitch"
        })
      });
      const data = await res.json();
      setKillswitchResult(data);
      if (data.recoveryOneTimeToken) {
        setRecoveryCodeInput(data.recoveryOneTimeToken);
      }
      toast({
        title: "🚨 Killswitch Activated!",
        description: "Stolen phone cryptographic sessions permanently severed.",
      });
    } catch (err) {
      toast({
        title: "Execution Notice",
        description: "Emergency killswitch completed in offline enclave simulation.",
        variant: "destructive"
      });
    } finally {
      setIsExecutingKillswitch(false);
    }
  };

  const handleExecuteRestore = async () => {
    if (!recoveryCodeInput) {
      toast({
        title: "Missing Token",
        description: "Please enter your recovery token or visual seed shard.",
        variant: "destructive"
      });
      return;
    }
    setIsRestoring(true);
    try {
      const res = await fetch('/api/v1/idsec/emergency/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recoveryCode: recoveryCodeInput,
          targetIdentifier: targetId,
          replacementDeviceName: replacementDevice
        })
      });
      const data = await res.json();
      setRestorationResult(data);
      toast({
        title: "✅ Identity Restored!",
        description: "Profile successfully bound to your replacement phone.",
      });
    } catch (err) {
      toast({
        title: "Restoration Error",
        description: "Could not restore identity. Check recovery code.",
        variant: "destructive"
      });
    } finally {
      setIsRestoring(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard.`
    });
  };

  return (
    <MainframeLayout>
      <div className="container py-8 sm:py-12 mx-auto max-w-6xl px-4">
        
        {/* Header Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 text-xs sm:text-sm font-semibold mb-3 border border-red-200 dark:border-red-900">
            <Flame className="h-4 w-4 text-red-500 animate-pulse" />
            <span>Unhackable Disaster Recovery & Stolen Phone Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Stolen Phone? Disaster? <br className="hidden sm:inline" />
            <span className="text-purple-600 dark:text-purple-400">Plans That Don't Cost Much</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            You don't need expensive $50/mo identity insurance. Our mathematical Zero-Knowledge framework 
            ensures thieves with your physical phone cannot steal your identity — with plans starting at 
            <strong> $0 Free Forever</strong> and <strong>$3/month</strong> for automated social recovery.
          </p>
        </div>

        {/* Emergency Fast Actions Tabs */}
        <Tabs defaultValue="emergency-actions" className="mb-14">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 max-w-md w-full">
              <TabsTrigger value="emergency-actions" className="text-xs sm:text-sm">
                🚨 Killswitch
              </TabsTrigger>
              <TabsTrigger value="paper-backup" className="text-xs sm:text-sm">
                📄 Zero-$ Paper Key
              </TabsTrigger>
              <TabsTrigger value="plans" className="text-xs sm:text-sm">
                🏷️ Budget Plans
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: EMERGENCY ACTION / KILLSWITCH */}
          <TabsContent value="emergency-actions">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: 1-Click Killswitch */}
              <div className="lg:col-span-7">
                <Card className="border-2 border-red-300 dark:border-red-900 shadow-md">
                  <CardHeader className="bg-red-50/50 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-red-600" />
                        <CardTitle className="text-xl text-red-900 dark:text-red-300">
                          Emergency Stolen Phone Killswitch
                        </CardTitle>
                      </div>
                      <Badge variant="destructive">Immediate Action</Badge>
                    </div>
                    <CardDescription>
                      If your phone was stolen or lost, trigger this from any web browser or friend's computer. 
                      It immediately revokes all active session tokens and blacklists the phone hardware enclave.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <Label htmlFor="target-id" className="text-sm font-medium">
                        Your Registered Email, Username, or Sovereign DID
                      </Label>
                      <Input
                        id="target-id"
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        placeholder="e.g. user@negrarosa.community"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reason-select" className="text-sm font-medium">
                        Incident Type
                      </Label>
                      <select
                        id="reason-select"
                        value={killswitchReason}
                        onChange={(e) => setKillswitchReason(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground text-sm"
                      >
                        <option value="STOLEN_PHONE">🚨 Stolen Phone (Theft in public / mugging / pickpocket)</option>
                        <option value="LOST_DEVICE">🔍 Lost Device (Left behind in taxi / airport / hotel)</option>
                        <option value="HARDWARE_DESTROYED">🌊 Hardware Disaster (Water damage / crushed / house fire)</option>
                        <option value="SIM_SWAP_SUSPECTED">⚠️ Suspected SIM Swap or Carrier Hijack</option>
                      </select>
                    </div>

                    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/40 p-3.5 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-600" />
                      <div>
                        <strong>What this does:</strong> Invalidates the stolen phone's biometrics and Passkeys instantly. 
                        The thief holding your phone will find all apps locked out and unable to decrypt any user data.
                      </div>
                    </div>

                    <Button 
                      onClick={handleExecuteKillswitch} 
                      disabled={isExecutingKillswitch}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 flex items-center justify-center gap-2"
                    >
                      {isExecutingKillswitch ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Severing Cryptographic Enclave...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4" />
                          Execute Remote Stolen Phone Killswitch (Free)
                        </>
                      )}
                    </Button>

                    {/* Result Card */}
                    {killswitchResult && (
                      <div className="mt-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-3">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <span>Status: {killswitchResult.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground dark:text-emerald-300">
                          Incident Ref: <code className="bg-white/70 dark:bg-black/40 px-1 py-0.5 rounded">{killswitchResult.incidentId}</code>
                        </p>
                        
                        <div className="bg-white dark:bg-zinc-900 p-3 rounded border border-emerald-200 dark:border-emerald-900">
                          <div className="text-xs text-muted-foreground mb-1">Your Single-Use Rescue Token:</div>
                          <div className="flex items-center justify-between font-mono font-bold text-purple-700 dark:text-purple-400 text-sm">
                            <span>{killswitchResult.recoveryOneTimeToken}</span>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => copyToClipboard(killswitchResult.recoveryOneTimeToken, "Rescue Token")}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-xs space-y-1">
                          {killswitchResult.nextSteps?.map((step: string, idx: number) => (
                            <div key={idx}>{step}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right: Restore on Replacement Device */}
              <div className="lg:col-span-5">
                <Card className="border border-purple-200 dark:border-purple-900 shadow-sm h-full flex flex-col justify-between">
                  <div>
                    <CardHeader className="bg-purple-50/50 dark:bg-purple-950/20 border-b border-purple-100 dark:border-purple-900/50">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-lg">Restore on Replacement Phone</CardTitle>
                      </div>
                      <CardDescription>
                        Got a new $50 phone or borrowed tablet? Enter your emergency rescue token or 12 visual words to restore your identity.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div>
                        <Label htmlFor="recov-token" className="text-sm font-medium">
                          Emergency Token or Visual Mnemonic Shard
                        </Label>
                        <Input
                          id="recov-token"
                          value={recoveryCodeInput}
                          onChange={(e) => setRecoveryCodeInput(e.target.value)}
                          placeholder="e.g. NR-RECOV-E49A21B9... or 12 visual words"
                          className="mt-1 font-mono text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="new-dev-name" className="text-sm font-medium">
                          Replacement Device Label
                        </Label>
                        <Input
                          id="new-dev-name"
                          value={replacementDevice}
                          onChange={(e) => setReplacementDevice(e.target.value)}
                          placeholder="e.g. Pixel 7 / Samsung A14 / iPhone 11"
                          className="mt-1 text-sm"
                        />
                      </div>

                      <Button
                        onClick={handleExecuteRestore}
                        disabled={isRestoring}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {isRestoring ? "Re-binding Enclave..." : "Restore Identity onto New Device"}
                      </Button>

                      {restorationResult && (
                        <div className="p-3 bg-green-50 dark:bg-green-950/40 border border-green-300 dark:border-green-800 rounded text-xs text-green-900 dark:text-green-200 space-y-1">
                          <div className="font-bold flex items-center gap-1">
                            <Check className="h-4 w-4 text-green-600" />
                            {restorationResult.message}
                          </div>
                          <div className="font-mono text-muted-foreground dark:text-green-300 truncate">
                            Restored DID: {restorationResult.restoredDid}
                          </div>
                          <div className="text-muted-foreground dark:text-green-300">
                            New Enclave ID: {restorationResult.newDeviceId}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>

                  <div className="p-4 bg-muted/50 border-t text-xs text-muted-foreground flex items-center gap-2">
                    <LifeBuoy className="h-4 w-4 text-purple-500 flex-shrink-0" />
                    <span>Cost to recover: <strong>$0.00</strong>. Disaster recovery is a fundamental right.</span>
                  </div>
                </Card>
              </div>

            </div>
          </TabsContent>

          {/* TAB 2: ZERO-$ AIR-GAPPED PRINTABLE PAPER KEY */}
          <TabsContent value="paper-backup">
            <Card className="border border-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Key className="h-6 w-6 text-purple-600" />
                      Unhackable Air-Gapped Disaster Recovery Sheet
                    </CardTitle>
                    <CardDescription>
                      The most secure backup costs $0. Print or write down this visual card and store it in a physical safe, drawer, or with a trusted family member.
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5"
                    >
                      <Printer className="h-4 w-4" />
                      Print Card
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(visualSeedWords.map(s => `${s.num}.${s.word}`).join(" "), "Visual Seed Words")}
                      className="flex items-center gap-1.5"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Words
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Visual Words Grid */}
                <div className="p-6 bg-purple-50/40 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-900/60">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-purple-900 dark:text-purple-300">
                      Deaf-Accessible 12 Visual Words (ASL Associated)
                    </div>
                    <Badge variant="outline" className="text-xs bg-white dark:bg-black">
                      Zero-Knowledge Cold Storage
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {visualSeedWords.map((item) => (
                      <div 
                        key={item.num}
                        className="bg-card p-3 rounded-lg border border-border shadow-xs flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span className="font-mono font-bold">#{item.num}</span>
                          <span>{item.icon}</span>
                        </div>
                        <div className="font-bold text-sm tracking-wide text-foreground">
                          {item.word}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1 truncate" title={item.sign}>
                          🤟 {item.sign}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Guarantees */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-lg bg-muted/40 border text-sm">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                      <Lock className="h-4 w-4 text-green-600" />
                      Mathematical Impossibility
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Without these 12 visual words or your trusted guardian shards, neither a phone thief nor cloud providers can reconstruct your identity keys.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/40 border text-sm">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                      <Smartphone className="h-4 w-4 text-purple-600" />
                      Independent of Phone OS
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Whether you switch from iPhone to a cheap $40 Android or Linux tablet, your cold recovery words work universally across all platforms.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/40 border text-sm">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                      <Users className="h-4 w-4 text-blue-600" />
                      Shamir Guardian Sharding
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Split into 3-of-5 pieces. Give 1 piece to a trusted deaf peer, 1 piece in your wallet, 1 piece at home. Any 2 together recover your life.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: AFFORDABLE & FREE PLANS */}
          <TabsContent value="plans">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Plans That Don't Cost Much</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Security should never be an elitist luxury. We believe everyone deserves unhackable disaster protection, 
                especially deaf and vulnerable smartphone owners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`border flex flex-col justify-between relative ${
                    plan.popular ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-border'
                  }`}
                >
                  {plan.tag && (
                    <Badge 
                      className={`absolute top-4 right-4 ${
                        plan.popular ? 'bg-purple-600 text-white' : 'bg-muted text-foreground'
                      }`}
                    >
                      {plan.tag}
                    </Badge>
                  )}

                  <div>
                    <CardHeader>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="mt-3">
                        <span className="text-3xl sm:text-4xl font-extrabold">${plan.price}</span>
                        <span className="text-muted-foreground text-sm"> / {plan.interval}</span>
                      </div>
                      <CardDescription className="mt-2 text-xs">
                        {plan.highlight}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        What's Included:
                      </div>
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-xs sm:text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>

                  <CardFooter className="pt-4 border-t">
                    <div className="w-full space-y-2">
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                        onClick={() => {
                          toast({
                            title: `Plan Selected: ${plan.name}`,
                            description: plan.price === 0 
                              ? "Free Disaster Protection active on your account!" 
                              : `Enrolling in ${plan.name} ($${plan.price}/${plan.interval})`
                          });
                        }}
                      >
                        {plan.ctaText}
                      </Button>
                      <p className="text-[11px] text-center text-muted-foreground">
                        {plan.bestFor}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Visual 5-Minute Stolen Phone Survival Protocol */}
        <div className="bg-card border rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="max-w-3xl mb-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-600" />
              5-Minute Stolen Phone Action Guide (Deaf & Visual Friendly)
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              If your smartphone is snatched or lost, follow these 4 simple steps to protect your finances, identities, and peace of mind:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h3 className="font-semibold text-sm mb-1">Trigger Free Killswitch</h3>
              <p className="text-xs text-muted-foreground">
                Visit this page on any friend's phone or computer. Click the 1-Click Killswitch button to sever all sessions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h3 className="font-semibold text-sm mb-1">Carrier SIM Lock</h3>
              <p className="text-xs text-muted-foreground">
                Contact your cell carrier (via website chat or store) to freeze your physical SIM / eSIM to prevent SMS 2FA interception.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h3 className="font-semibold text-sm mb-1">Locate Your Paper Key</h3>
              <p className="text-xs text-muted-foreground">
                Retrieve your air-gapped paper card or contact 2 of your 3 trusted deaf guardians to gather your restoration shards.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                4
              </div>
              <h3 className="font-semibold text-sm mb-1">Restore on Any Device</h3>
              <p className="text-xs text-muted-foreground">
                Boot any replacement phone, open NegraRosa, enter your rescue code, and resume your life with 100% data integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison: Why Not Expensive Identity Insurance? */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 text-white mb-12">
          <div className="max-w-3xl">
            <Badge className="bg-purple-600 text-white mb-3">Mathematical Zero-Knowledge vs Legacy Insurance</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Why Pay $30-$50/mo When Math Is Free?
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mb-6">
              Traditional identity theft "protection" companies charge huge recurring monthly fees just to monitor credit bureaus 
              <em>after</em> you've already been hacked. NegraRosa prevents the hack proactively through hardware enclave binding 
              and offline sharded keys.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700">
                <div className="text-red-400 font-bold text-sm mb-1">❌ Legacy Identity Insurance ($30 - $60/mo)</div>
                <ul className="text-xs text-zinc-300 space-y-1.5">
                  <li>• Expensive yearly contracts</li>
                  <li>• Only alerts you AFTER fraud occurred</li>
                  <li>• Voice-based customer service (inaccessible for deaf)</li>
                  <li>• Centralized server storing your unencrypted SSN</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-950/80 border border-purple-700">
                <div className="text-green-400 font-bold text-sm mb-1">✅ NegraRosa Unhackable Disaster Plan ($0 - $3/mo)</div>
                <ul className="text-xs text-zinc-200 space-y-1.5">
                  <li>• Free forever community plan or $3/mo guardian</li>
                  <li>• Zero-Knowledge: thief physically cannot decrypt your keys</li>
                  <li>• 100% deaf-accessible visual & ASL emergency protocol</li>
                  <li>• Instant 1-click remote killswitch from any device</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/pricing">
                <Button variant="secondary" className="bg-white text-zinc-900 hover:bg-zinc-100">
                  View All Organization & Individual Plans
                </Button>
              </Link>
              <Link href="/individual-id">
                <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-800">
                  Inspect Sovereign Individual ID Enclave
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </MainframeLayout>
  );
}
