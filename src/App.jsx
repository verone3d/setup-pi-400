import { useState, useCallback } from 'react'
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Terminal,
  Wifi,
  Github,
  GitBranch,
  Bot,
  Globe,
  Trophy,
  Shield,
  AlertCircle,
  Info,
  Lightbulb,
  Sparkles,
  Cpu,
  Menu,
  X,
  ExternalLink,
  Rocket,
  HardDrive,
  Key,
  FlaskConical,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER METADATA
// ─────────────────────────────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, title: 'Flash the SD Card',    icon: HardDrive,   steps: 5 },
  { id: 2, title: 'First Boot & WiFi',    icon: Wifi,        steps: 4 },
  { id: 3, title: 'SSH Remote Access',    icon: Shield,      steps: 4 },
  { id: 4, title: 'Create GitHub Account',icon: Github,      steps: 4 },
  { id: 5, title: 'Configure Git on Pi',  icon: GitBranch,   steps: 5 },
  { id: 6, title: 'Install Claude Code',  icon: Bot,         steps: 4 },
  { id: 7, title: 'Build a Flask App',    icon: FlaskConical,steps: 5 },
]

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
        </div>
        <span className="text-xs text-gray-500 font-mono">{lang || 'terminal'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="bg-gray-950 text-green-300 p-4 overflow-x-auto font-mono text-sm leading-7 whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Callout({ type = 'info', title, children }) {
  const variants = {
    info:    { wrap: 'bg-blue-950/60 border-blue-500/60',    text: 'text-blue-200',    icon: <Info size={18} className="text-blue-400 shrink-0 mt-0.5" /> },
    warning: { wrap: 'bg-yellow-950/60 border-yellow-500/60',text: 'text-yellow-200',  icon: <AlertCircle size={18} className="text-yellow-400 shrink-0 mt-0.5" /> },
    success: { wrap: 'bg-green-950/60 border-green-500/60',  text: 'text-green-200',   icon: <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" /> },
    tip:     { wrap: 'bg-purple-950/60 border-purple-500/60',text: 'text-purple-200',  icon: <Lightbulb size={18} className="text-purple-400 shrink-0 mt-0.5" /> },
  }
  const v = variants[type]
  return (
    <div className={`flex gap-3 p-4 rounded-lg border my-4 ${v.wrap} ${v.text}`}>
      {v.icon}
      <div className="min-w-0">
        {title && <p className="font-semibold mb-1 text-sm">{title}</p>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function OSCard({ name, badge, description, pros, recommended }) {
  return (
    <div className={`p-4 rounded-xl border-2 transition-all ${
      recommended
        ? 'border-green-500 bg-green-950/25 shadow-lg shadow-green-900/20'
        : 'border-gray-700 bg-gray-900/60'
    }`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-white text-sm">{name}</h4>
        {badge && (
          <span className="shrink-0 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-300 text-sm mb-3 leading-relaxed">{description}</p>
      {pros && (
        <ul className="space-y-1.5">
          {pros.map((p, i) => (
            <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
              <span className={recommended ? 'text-green-400' : 'text-gray-600'}>▸</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function CollapsibleSection({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-700 rounded-xl my-4 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
            Advanced
          </span>
          <span className="text-gray-300 font-medium text-sm">{title}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-700 bg-gray-900/40">
          {children}
        </div>
      )}
    </div>
  )
}

function StepNumber({ n }) {
  return (
    <div className="shrink-0 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400 font-bold text-xs font-mono">
      {n}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-lg font-semibold text-white mt-8 mb-3 flex items-center gap-2">
      <span className="w-1 h-5 bg-green-500 rounded-full inline-block" />
      {children}
    </h3>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 1 — Flash the SD Card
// ─────────────────────────────────────────────────────────────────────────────
function Chapter1() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-6">
        An <strong className="text-white">operating system (OS)</strong> is the software that runs
        your computer — it manages hardware, files, and the apps you use. Your Pi 400 needs one
        flashed onto an SD card before it can do anything. Think of it like putting a soul into
        the machine.
      </p>

      <SectionTitle>Choose Your OS</SectionTitle>
      <p className="text-gray-400 text-sm mb-4">
        Three solid options exist. Here's how they stack up:
      </p>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <OSCard
          name="Raspberry Pi OS (64-bit)"
          badge="RECOMMENDED"
          recommended
          description="The official OS built for Raspberry Pi. Full desktop environment, massive community, everything just works."
          pros={[
            'Best hardware support for Pi 400',
            'Huge community — answers everywhere',
            'Pre-loaded with useful tools',
            'Based on Debian (industry standard)',
          ]}
        />
        <OSCard
          name="Ubuntu Desktop for Pi"
          description="Familiar if you use Ubuntu on your PC. Slightly heavier on resources but well-supported."
          pros={[
            'Familiar Ubuntu experience',
            'Good snap package support',
            'Regular LTS release cycle',
          ]}
        />
        <OSCard
          name="Raspberry Pi OS Lite"
          description="No desktop — command line only. Great for servers, but not recommended for your first Pi experience."
          pros={[
            'Minimal resource usage',
            'Good for headless servers',
            'Not ideal for beginners',
          ]}
        />
      </div>

      <Callout type="success" title="The winner: Raspberry Pi OS 64-bit (Bookworm)">
        That's what we'll use for every step in this guide. It's the right choice for learning,
        experimenting, and running a web server.
      </Callout>

      <SectionTitle>Flash It with Raspberry Pi Imager</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Download Raspberry Pi Imager</p>
            <p className="text-gray-400 text-sm">
              Go to{' '}
              <span className="text-green-400 font-mono">raspberrypi.com/software</span> and
              download the Imager for your laptop's OS (Windows, macOS, or Linux).
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Insert your SD card</p>
            <p className="text-gray-400 text-sm">
              Use a <strong className="text-white">32 GB or larger</strong> SD card rated{' '}
              <strong className="text-white">Class 10 or A1/A2</strong>. Slower cards mean a
              slower Pi — don't skimp here.
            </p>
            <Callout type="warning" title="Back up first">
              Flashing <strong>erases everything</strong> on the SD card. Make sure there's
              nothing important on it.
            </Callout>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Open Imager and configure it</p>
            <p className="text-gray-400 text-sm mb-2">Make three selections in order:</p>
            <ul className="space-y-2 text-sm">
              {[
                ['Choose Device', 'Raspberry Pi 400'],
                ['Choose OS', 'Raspberry Pi OS (64-bit) — the first option under "Raspberry Pi OS (other)" or the highlighted default'],
                ['Choose Storage', 'Your SD card — double-check it\'s the right drive!'],
              ].map(([label, value]) => (
                <li key={label} className="flex gap-3">
                  <span className="shrink-0 text-green-400 font-mono text-xs bg-green-950/40 border border-green-800/60 px-2 py-0.5 rounded">
                    {label}
                  </span>
                  <span className="text-gray-300">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">
              Click the gear icon <span className="font-mono">⚙️</span> — this is the important part
            </p>
            <p className="text-gray-400 text-sm mb-3">
              The OS Customisation screen lets you pre-configure your Pi so it boots ready to use.
              Fill in all of these:
            </p>
            <div className="grid gap-2 text-sm">
              {[
                { field: 'Hostname', value: 'pi400  (or whatever you like)', },
                { field: 'Username', value: 'Your chosen username (e.g. pi)', },
                { field: 'Password', value: 'A strong password — write it down!', },
                { field: 'WiFi SSID', value: 'Your home network name', },
                { field: 'WiFi Password', value: 'Your home WiFi password', },
                { field: 'Enable SSH', value: 'Check this box ✓', },
              ].map(({ field, value }) => (
                <div key={field} className="flex gap-3 bg-gray-900 px-3 py-2 rounded-lg border border-gray-800">
                  <span className="shrink-0 text-gray-400 w-28 text-xs mt-0.5">{field}</span>
                  <span className="text-gray-200">{value}</span>
                </div>
              ))}
            </div>
            <Callout type="tip" title="Do this step — it saves you 30 minutes later">
              Setting WiFi and SSH in the Imager now means your Pi boots ready to connect.
              You won't need a keyboard or monitor after the first boot.
            </Callout>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Click Write</p>
            <p className="text-gray-400 text-sm">
              Imager will download the OS, flash it to the SD card, and verify the write.
              This takes 5–15 minutes depending on your internet speed. When it's done,
              safely eject the card.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 2 — First Boot & WiFi
// ─────────────────────────────────────────────────────────────────────────────
function Chapter2() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-6">
        Your SD card is ready. Time to breathe life into the Pi 400. This chapter gets you booted,
        connected to WiFi, and shows you how to find the IP address you'll need going forward.
      </p>

      <SectionTitle>Connect Everything & Boot</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Connect peripherals</p>
            <div className="grid gap-2 text-sm">
              {[
                ['SD Card', 'Insert into the slot on the bottom-left of the Pi 400'],
                ['Mouse', 'USB mouse into any USB port (keyboard is built in)'],
                ['Monitor', 'HDMI cable into either micro-HDMI port on the Pi 400'],
                ['Power', 'USB-C power supply — plug in last'],
              ].map(([item, desc]) => (
                <div key={item} className="flex gap-3 bg-gray-900/60 px-3 py-2 rounded-lg border border-gray-800">
                  <span className="shrink-0 text-green-400 font-mono text-xs w-20 mt-0.5">{item}</span>
                  <span className="text-gray-300">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Walk through the first-boot wizard</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Raspberry Pi OS will guide you through setting your country, language, timezone, and
              confirming your password. Follow the prompts — it takes about 2 minutes. The Pi will
              reboot once at the end. That's normal.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Connect to WiFi (if not pre-configured)</p>
            <p className="text-gray-400 text-sm mb-2">
              If you set WiFi in the Imager (Chapter 1, Step 4), you're already connected —
              skip this. If not:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-400 ml-2">
              <li>Click the WiFi icon in the top-right of the taskbar</li>
              <li>Select your network name from the list</li>
              <li>Enter your WiFi password and click OK</li>
              <li>The icon will show connected status in a few seconds</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Verify connection & find your IP address</p>
            <p className="text-gray-400 text-sm mb-3">
              Open the Terminal (look for it in the taskbar or the applications menu). Run these
              two commands:
            </p>
            <CodeBlock
              lang="bash — verify internet"
              code={`ping -c 4 google.com`}
            />
            <p className="text-gray-400 text-sm mb-2">
              You should see 4 lines of ping replies. If you do, you're online.
            </p>
            <CodeBlock
              lang="bash — find your IP"
              code={`hostname -I`}
            />
            <p className="text-gray-400 text-sm">
              This prints your Pi's IP address — something like{' '}
              <code className="text-green-400 bg-gray-900 px-1.5 py-0.5 rounded font-mono text-xs">
                192.168.1.42
              </code>
              . Write it down or screenshot it.
            </p>
            <Callout type="warning" title="Write down your IP address">
              You'll need it in Chapter 3 to connect via SSH. Home router IPs
              usually stay the same, but they can change — consider setting a static IP in your
              router settings if you want it to always be the same.
            </Callout>
          </div>
        </div>
      </div>

      <SectionTitle>Reach Your Pi by Name</SectionTitle>
      <p className="text-gray-400 text-sm leading-relaxed">
        Raspberry Pi OS enables <strong className="text-white">mDNS</strong> by default, which
        means other devices on your network can find your Pi by name — no IP address needed.
      </p>
      <Callout type="info" title="Your Pi's address on the local network">
        From any other device on the same WiFi, you can open a browser and type{' '}
        <code className="font-mono text-blue-300">http://pi400.local</code> (replace{' '}
        <code className="font-mono text-blue-300">pi400</code> with whatever hostname you chose).
        This works on macOS, Linux, and Windows 10/11.
      </Callout>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 3 — SSH Remote Access
// ─────────────────────────────────────────────────────────────────────────────
function Chapter3() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        <strong className="text-white">SSH</strong> (Secure Shell) lets you control your Pi from
        your laptop's terminal — no monitor or keyboard attached to the Pi required. Once you're
        SSH'd in, you can do everything in this guide remotely.
      </p>

      <SectionTitle>SSH from macOS or Linux</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Open your laptop's Terminal</p>
            <p className="text-gray-400 text-sm">
              macOS: press <kbd className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-xs border border-gray-600">⌘ Space</kbd> → type <strong>Terminal</strong> → Enter.
              Linux: <kbd className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-xs border border-gray-600">Ctrl+Alt+T</kbd> usually works.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Connect to your Pi</p>
            <CodeBlock
              lang="bash — connect by IP"
              code={`ssh yourusername@192.168.x.x`}
            />
            <p className="text-gray-400 text-sm mb-2">
              Or use the hostname (easier to remember):
            </p>
            <CodeBlock
              lang="bash — connect by hostname"
              code={`ssh yourusername@pi400.local`}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Accept the host key fingerprint</p>
            <p className="text-gray-400 text-sm mb-2">
              The first time you connect, SSH shows a warning and asks if you want to continue.
              Type <code className="text-green-400 font-mono bg-gray-900 px-1.5 py-0.5 rounded text-xs">yes</code> and hit Enter.
              This saves the Pi's identity so you won't be asked again.
            </p>
            <CodeBlock
              lang="terminal — expected prompt"
              code={`The authenticity of host 'pi400.local' can't be established.
ED25519 key fingerprint is SHA256:abc123...
Are you sure you want to continue connecting (yes/no)? yes`}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Enter your password</p>
            <p className="text-gray-400 text-sm">
              Type the password you set in the Imager (or during first boot). You won't see
              characters as you type — that's normal. Press Enter when done.
            </p>
            <Callout type="success" title="You're in!">
              Your prompt will change to something like{' '}
              <code className="font-mono text-green-300">yourusername@pi400:~$</code>. You're now
              controlling your Pi from your laptop. Everything from here can be done via SSH!
            </Callout>
          </div>
        </div>
      </div>

      <SectionTitle>SSH from Windows</SectionTitle>
      <p className="text-gray-400 text-sm mb-3">
        Windows 10 and 11 ship with SSH built in — no extra software needed.
      </p>
      <div className="space-y-4">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Open PowerShell or Command Prompt</p>
            <p className="text-gray-400 text-sm">
              Press <kbd className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-xs border border-gray-600">Win+R</kbd>, type <strong>powershell</strong>, press Enter.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Run the same SSH command</p>
            <CodeBlock
              lang="powershell"
              code={`ssh yourusername@pi400.local`}
            />
            <p className="text-gray-400 text-sm mt-2">
              If that doesn't work, try the IP address directly:{' '}
              <code className="text-green-400 font-mono text-xs bg-gray-900 px-1.5 py-0.5 rounded">
                ssh yourusername@192.168.x.x
              </code>
            </p>
            <Callout type="info" title="Alternative: PuTTY">
              If you prefer a GUI, download{' '}
              <strong className="text-white">PuTTY</strong> from{' '}
              <span className="text-blue-400 font-mono">putty.org</span>. Enter your Pi's IP/hostname,
              port 22, and click Open.
            </Callout>
          </div>
        </div>
      </div>

      <CollapsibleSection title="Set up SSH keys — no password needed">
        <p className="text-gray-400 text-sm mb-3 mt-2">
          SSH keys are more secure than passwords and more convenient — you never type a password
          again. Here's how to set them up from your laptop:
        </p>
        <p className="text-gray-300 text-sm font-medium mb-1">Step 1: Generate a key pair on your laptop</p>
        <CodeBlock
          lang="bash — run on your LAPTOP"
          code={`ssh-keygen -t ed25519 -C "your@email.com"
# Press Enter to accept defaults, or set a passphrase for extra security`}
        />
        <p className="text-gray-300 text-sm font-medium mb-1 mt-3">
          Step 2: Copy the public key to your Pi
        </p>
        <CodeBlock
          lang="bash — run on your LAPTOP"
          code={`ssh-copy-id yourusername@pi400.local`}
        />
        <CodeBlock
          lang="bash — Windows alternative (PowerShell)"
          code={`type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh yourusername@pi400.local "cat >> ~/.ssh/authorized_keys"`}
        />
        <Callout type="success">
          Now when you run <code className="font-mono text-green-300">ssh yourusername@pi400.local</code>,
          you'll connect instantly — no password prompt.
        </Callout>
      </CollapsibleSection>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 4 — Create a GitHub Account & First Repo
// ─────────────────────────────────────────────────────────────────────────────
function Chapter4() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-6">
        GitHub is where developers store code, share projects, and collaborate. You'll use it to
        back up your Pi projects and show off your work. Creating an account takes 5 minutes.
      </p>

      <SectionTitle>Create Your Account</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">
              Go to <span className="text-green-400 font-mono">github.com</span> → click Sign Up
            </p>
            <p className="text-gray-400 text-sm">
              Enter your email address and follow the signup flow. You'll choose a username,
              set a password, and verify your email.
            </p>
            <Callout type="tip" title="Choose your username wisely">
              Your GitHub username becomes part of your developer identity —{' '}
              <code className="font-mono text-purple-300">github.com/yourusername</code> is a URL
              you'll share with employers, collaborators, and the world. Pick something
              professional and recognizable. You can change it later, but it's a hassle.
            </Callout>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Verify your email</p>
            <p className="text-gray-400 text-sm">
              GitHub will send a verification email. Click the link inside it. This unlocks
              your ability to create repositories and push code.
            </p>
          </div>
        </div>
      </div>

      <SectionTitle>Create Your First Repository</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Create a new repository</p>
            <ol className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">1.</span>
                Click the <strong className="text-white">+</strong> button in the top-right corner → <strong className="text-white">New repository</strong>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">2.</span>
                Name it: <code className="text-green-400 font-mono bg-gray-900 px-1.5 py-0.5 rounded text-xs">my-pi-projects</code>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">3.</span>
                Set visibility to <strong className="text-white">Public</strong> (or Private — your choice)
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">4.</span>
                Check <strong className="text-white">"Add a README file"</strong>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">5.</span>
                Click <strong className="text-white">Create repository</strong>
              </li>
            </ol>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Copy the clone URL</p>
            <p className="text-gray-400 text-sm mb-2">
              On your new repo page, click the green <strong className="text-white">Code</strong> button.
              You'll see two options:
            </p>
            <div className="grid gap-2 text-sm">
              <div className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
                <span className="text-blue-400 font-mono text-xs">HTTPS</span>
                <p className="text-gray-300 mt-1">
                  <code className="font-mono text-xs text-green-300">
                    https://github.com/yourusername/my-pi-projects.git
                  </code>
                </p>
                <p className="text-gray-500 text-xs mt-1">Easier to start with — uses a token for auth</p>
              </div>
            </div>
            <Callout type="info">
              Use HTTPS for now — it's simpler. Chapter 5 will walk you through generating the
              Personal Access Token that GitHub uses as your password.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 5 — Configure Git on the Pi
// ─────────────────────────────────────────────────────────────────────────────
function Chapter5() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-6">
        Git is the version control system that powers GitHub. Every professional developer uses
        it. In this chapter, you'll configure Git on your Pi and push your first commit to GitHub.
      </p>

      <SectionTitle>Verify Git is Installed</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">
              SSH into your Pi (or use the Pi's terminal directly)
            </p>
            <CodeBlock
              lang="bash — check git version"
              code={`git --version
# Expected output: git version 2.39.x or similar`}
            />
            <p className="text-gray-400 text-sm">
              Git comes pre-installed on Raspberry Pi OS. If for some reason it's missing:
            </p>
            <CodeBlock
              lang="bash — install git if needed"
              code={`sudo apt update && sudo apt install -y git`}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Tell Git who you are</p>
            <p className="text-gray-400 text-sm mb-2">
              These details get attached to every commit you make:
            </p>
            <CodeBlock
              lang="bash"
              code={`git config --global user.name "Your Name"
git config --global user.email "your@email.com"`}
            />
          </div>
        </div>
      </div>

      <SectionTitle>Set Up GitHub Authentication</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Generate a Personal Access Token (PAT)</p>
            <p className="text-gray-400 text-sm mb-3">
              GitHub no longer accepts your account password for Git operations. You'll use a
              Personal Access Token instead — think of it as a secure app-specific password.
            </p>
            <ol className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">1.</span>
                On GitHub, click your profile photo → <strong className="text-white">Settings</strong>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">2.</span>
                Scroll to <strong className="text-white">Developer settings</strong> (bottom of left sidebar)
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">3.</span>
                Click <strong className="text-white">Personal access tokens</strong> → <strong className="text-white">Tokens (classic)</strong>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">4.</span>
                Click <strong className="text-white">Generate new token (classic)</strong>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">5.</span>
                Give it a name (e.g., "Pi 400"), set an expiration, and check the <strong className="text-white">repo</strong> scope
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">6.</span>
                Click <strong className="text-white">Generate token</strong> — copy it immediately, you won't see it again!
              </li>
            </ol>
            <Callout type="warning" title="Save your token now">
              GitHub only shows the token once. Paste it into a secure note or password manager
              right away. When Git asks for your password, you'll paste this token.
            </Callout>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Clone your repository to the Pi</p>
            <CodeBlock
              lang="bash"
              code={`git clone https://github.com/yourusername/my-pi-projects.git
cd my-pi-projects`}
            />
            <p className="text-gray-400 text-sm">
              When prompted for your password, <strong className="text-white">paste your Personal Access Token</strong> instead.
            </p>
            <Callout type="tip" title="Make Git remember your credentials">
              Run this so you don't have to paste the token every time:
              <CodeBlock
                lang="bash"
                code={`git config --global credential.helper store`}
              />
              After your next push, the token is saved automatically.
            </Callout>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Make your first commit from the Pi</p>
            <CodeBlock
              lang="bash"
              code={`echo "# My Pi Projects" >> README.md
git add .
git commit -m "first commit from Pi 400"
git push origin main`}
            />
            <Callout type="success" title="Check GitHub!">
              Open your repository page on GitHub — you should see your new commit at the top of
              the commit history. Your Pi is now synced with the cloud.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 6 — Install Claude Code
// ─────────────────────────────────────────────────────────────────────────────
function Chapter6() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        <strong className="text-white">Claude Code</strong> is an AI coding assistant that lives
        in your terminal. It reads your files, understands your project, and helps you write,
        debug, refactor, and understand code — all through a conversation. In Chapter 7, you'll
        use it to build a real web app in minutes.
      </p>

      <SectionTitle>Check Prerequisites</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Check your Node.js version</p>
            <p className="text-gray-400 text-sm mb-2">
              Claude Code requires <strong className="text-white">Node.js 18 or newer</strong>.
            </p>
            <CodeBlock
              lang="bash"
              code={`node --version
# You need v18.x.x or higher`}
            />
            <p className="text-gray-400 text-sm mb-2">
              If Node isn't installed, or the version is too old, install Node.js 20:
            </p>
            <CodeBlock
              lang="bash — install Node.js 20"
              code={`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Should now show v20.x.x`}
            />
          </div>
        </div>
      </div>

      <SectionTitle>Install Claude Code</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Install via npm</p>
            <CodeBlock
              lang="bash"
              code={`npm install -g @anthropic-ai/claude-code`}
            />
            <p className="text-gray-400 text-sm">
              The <code className="font-mono text-green-400 text-xs bg-gray-900 px-1 py-0.5 rounded">-g</code> flag
              installs Claude Code globally so you can run it from any folder.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Get your Anthropic API key</p>
            <ol className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">1.</span>
                Go to <span className="text-green-400 font-mono">console.anthropic.com</span> and sign up or log in
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">2.</span>
                Click <strong className="text-white">API Keys</strong> in the left sidebar
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">3.</span>
                Click <strong className="text-white">Create Key</strong> — give it a name like "Pi 400"
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 shrink-0">4.</span>
                Copy the key — it starts with <code className="font-mono text-green-300 text-xs bg-gray-900 px-1 py-0.5 rounded">sk-ant-</code>
              </li>
            </ol>
            <Callout type="warning" title="Keep your API key secret">
              Never commit your API key to GitHub or share it publicly. It's like a password that
              grants access to your Anthropic account.
            </Callout>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Add your API key to the environment</p>
            <CodeBlock
              lang="bash — set for current session"
              code={`export ANTHROPIC_API_KEY="sk-ant-your-key-here"`}
            />
            <p className="text-gray-400 text-sm mb-2">
              To make it permanent so it loads every time you open a terminal:
            </p>
            <CodeBlock
              lang="bash — make it permanent"
              code={`echo 'export ANTHROPIC_API_KEY="sk-ant-your-key-here"' >> ~/.bashrc
source ~/.bashrc`}
            />
            <p className="text-gray-400 text-sm mb-3">Verify everything works:</p>
            <CodeBlock
              lang="bash"
              code={`claude --version`}
            />
            <Callout type="tip" title="How to use Claude Code">
              Navigate into any project folder and type <code className="font-mono text-purple-300">claude</code>.
              Claude Code reads your project structure and you can chat with it to write code,
              fix bugs, or explain what existing code does. Try it in Chapter 7!
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 7 — Build a Flask Web App with Claude Code
// ─────────────────────────────────────────────────────────────────────────────
function Chapter7() {
  const flaskPrompt = `Create a simple Flask web application with the following:
- A homepage at / that shows a welcome message and the Pi's hostname and current time
- A /status page that shows system info: CPU usage, memory usage, disk usage, uptime
- Bootstrap 5 for styling (CDN)
- A navbar with links between pages
- The app should run on host 0.0.0.0 port 5000 so it's accessible on the local network
- Include a requirements.txt with flask and psutil
- Include a README with setup instructions`

  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-6">
        This is it — the payoff. You're going to use Claude Code to build a real Flask web
        application that runs on your Pi and is accessible to any device on your home network.
        You'll do it in minutes, not hours.
      </p>

      <SectionTitle>Set Up Your Project</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Navigate to your project folder</p>
            <CodeBlock
              lang="bash"
              code={`cd ~/my-pi-projects`}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Launch Claude Code</p>
            <CodeBlock
              lang="bash"
              code={`claude`}
            />
            <p className="text-gray-400 text-sm">
              Claude Code starts up, reads your project directory, and waits for your prompt.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Paste this prompt exactly</p>
            <p className="text-gray-400 text-sm mb-3">
              Copy the prompt below and paste it into the Claude Code chat. Hit Enter and watch
              it build your app:
            </p>
            <div className="my-4 rounded-lg overflow-hidden border border-green-700/60 shadow-lg shadow-green-900/10">
              <div className="flex items-center justify-between bg-green-950/50 px-4 py-2 border-b border-green-800/50">
                <span className="text-xs text-green-400 font-mono font-semibold uppercase tracking-wider">
                  Prompt to paste into Claude Code
                </span>
                <CopyButton text={flaskPrompt} />
              </div>
              <pre className="bg-gray-950 text-green-200 p-4 overflow-x-auto font-mono text-sm leading-7 whitespace-pre-wrap">
                {flaskPrompt}
              </pre>
            </div>
            <p className="text-gray-400 text-sm">
              Claude Code will generate <code className="font-mono text-green-400 text-xs bg-gray-900 px-1 py-0.5 rounded">app.py</code>,{' '}
              <code className="font-mono text-green-400 text-xs bg-gray-900 px-1 py-0.5 rounded">requirements.txt</code>,
              and HTML templates automatically.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Install dependencies and run the app</p>
            <p className="text-gray-400 text-sm mb-2">
              Exit Claude Code (<kbd className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-xs border border-gray-600">Ctrl+C</kbd>)
              or open a new terminal session, then:
            </p>
            <CodeBlock
              lang="bash"
              code={`pip install -r requirements.txt
python app.py`}
            />
            <p className="text-gray-400 text-sm mb-2">
              You should see output like:
            </p>
            <CodeBlock
              lang="terminal — expected output"
              code={` * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.x.x:5000`}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Open it in your browser</p>
            <p className="text-gray-400 text-sm mb-3">
              From any device on your home network, open a browser and go to:
            </p>
            <div className="grid gap-2 sm:grid-cols-2 text-sm">
              {[
                ['By hostname', 'http://pi400.local:5000'],
                ['By IP address', 'http://192.168.x.x:5000'],
              ].map(([label, url]) => (
                <div key={label} className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
                  <p className="text-gray-500 text-xs mb-1">{label}</p>
                  <code className="text-green-400 font-mono text-sm">{url}</code>
                </div>
              ))}
            </div>
            <Callout type="success" title="You did it!">
              You're running a real web server on your Raspberry Pi, accessible to any device on
              your home network. You built it with an AI assistant in under 10 minutes. That's
              genuinely impressive for day one.
            </Callout>
          </div>
        </div>
      </div>

      <SectionTitle>Save Your Work to GitHub</SectionTitle>
      <p className="text-gray-400 text-sm mb-3">
        Commit the Flask app so it's backed up and version-controlled:
      </p>
      <CodeBlock
        lang="bash"
        code={`git add .
git commit -m "Add Flask web app built with Claude Code"
git push origin main`}
      />
      <Callout type="success" title="Your app is on GitHub">
        Check your repository — the Flask app code is now backed up in the cloud and ready to
        share, deploy, or build on.
      </Callout>

      <CollapsibleSection title="Run the app automatically on boot (systemd service)">
        <p className="text-gray-400 text-sm mb-3 mt-2">
          Want your Pi to serve the web app automatically every time it boots?
          Create a systemd service:
        </p>
        <CodeBlock
          lang="bash — create the service file"
          code={`sudo nano /etc/systemd/system/flaskapp.service`}
        />
        <p className="text-gray-400 text-sm mb-2">Paste this content (adjust paths as needed):</p>
        <CodeBlock
          lang="systemd service file"
          code={`[Unit]
Description=Flask Pi Status App
After=network.target

[Service]
User=pi
WorkingDirectory=/home/pi/my-pi-projects
ExecStart=/usr/bin/python3 app.py
Restart=always

[Install]
WantedBy=multi-user.target`}
        />
        <CodeBlock
          lang="bash — enable and start"
          code={`sudo systemctl enable flaskapp
sudo systemctl start flaskapp
sudo systemctl status flaskapp`}
        />
        <Callout type="success">
          Your Flask app now starts automatically every time the Pi boots.
        </Callout>
      </CollapsibleSection>
    </div>
  )
}

// Small helper used inside Chapter7 to avoid duplication
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 transition-colors"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      <span>{copied ? 'Copied!' : 'Copy prompt'}</span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPLETION SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function CompletionScreen({ onRestart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/60 flex items-center justify-center animate-pulse">
          <Trophy size={44} className="text-green-400" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Sparkles size={20} className="text-yellow-400" />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-white mb-3">Mission Complete.</h2>
      <p className="text-green-400 font-mono text-lg mb-8">All systems operational.</p>

      <div className="max-w-lg text-gray-300 leading-relaxed mb-8 space-y-3">
        <p>
          You went from an unopened box to a Raspberry Pi running a live, AI-built web server
          accessible on your home network — and you pushed it all to GitHub.
        </p>
        <p>
          That's not beginner stuff. That's what developers do. You're doing it on a $70 computer
          you built yourself.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 w-full max-w-md mb-10 text-sm">
        {[
          ['Flashed Raspberry Pi OS', 'Chapter 1'],
          ['Booted & connected to WiFi', 'Chapter 2'],
          ['SSH remote access working', 'Chapter 3'],
          ['GitHub account + repo created', 'Chapter 4'],
          ['Git configured on Pi', 'Chapter 5'],
          ['Claude Code installed', 'Chapter 6'],
          ['Flask web app built & deployed', 'Chapter 7'],
        ].map(([task, chapter]) => (
          <div
            key={task}
            className="flex items-center gap-2 bg-gray-900/60 border border-green-900/60 rounded-lg px-3 py-2 text-left"
          >
            <CheckCircle2 size={15} className="text-green-400 shrink-0" />
            <div>
              <p className="text-gray-200">{task}</p>
              <p className="text-gray-600 text-xs">{chapter}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-5 max-w-md w-full mb-8">
        <p className="text-gray-400 text-sm font-medium mb-3 text-left">What to try next:</p>
        <ul className="space-y-2 text-sm text-gray-400 text-left">
          {[
            'Add more routes to your Flask app — a /logs page, a /weather page',
            'Try Claude Code with a Python script that does something useful to you',
            'Set up port forwarding on your router to expose your app to the internet',
            'Learn Docker and containerize your Flask app',
            'Build a home automation dashboard with Flask + GPIO',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <ChevronRight size={14} className="text-green-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
      >
        Start over from Chapter 1
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({ current, completed, onSelect, onClose, isMobile }) {
  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-green-400" />
          <span className="text-green-400 font-mono font-bold text-sm tracking-wider">
            PI 400 LAUNCH PAD
          </span>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="px-3 py-3">
        <div className="flex items-center gap-2 px-2 mb-1">
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(completed.size / CHAPTERS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-mono shrink-0">
            {completed.size}/{CHAPTERS.length}
          </span>
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {CHAPTERS.map((ch) => {
          const isActive = current === ch.id
          const isDone = completed.has(ch.id)
          const Icon = ch.icon
          return (
            <li key={ch.id}>
              <button
                onClick={() => { onSelect(ch.id); if (isMobile) onClose?.() }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-green-500/15 border border-green-500/30 text-white'
                    : 'hover:bg-gray-800/60 text-gray-400 border border-transparent hover:text-gray-200'
                }`}
              >
                <div className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center ${
                  isDone
                    ? 'bg-green-500/20 text-green-400'
                    : isActive
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {isDone
                    ? <CheckCircle2 size={14} />
                    : <Icon size={14} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-gray-600">{String(ch.id).padStart(2, '0')}</span>
                    <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : ''}`}>
                      {ch.title}
                    </span>
                  </div>
                </div>
                {isDone && (
                  <span className="shrink-0 text-green-500">
                    <Check size={13} />
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="px-4 py-3 border-t border-gray-800">
        <p className="text-xs text-gray-600 text-center">
          Pi 400 Launch Pad · 7 Chapters
        </p>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER CONTENT MAP
// ─────────────────────────────────────────────────────────────────────────────
const CHAPTER_COMPONENTS = {
  1: Chapter1,
  2: Chapter2,
  3: Chapter3,
  4: Chapter4,
  5: Chapter5,
  6: Chapter6,
  7: Chapter7,
}

const CHAPTER_SUBTITLES = {
  1: 'Choose an OS and write it to your SD card',
  2: 'Boot up, connect to WiFi, and find your IP',
  3: 'Control your Pi remotely from your laptop',
  4: 'Create your GitHub account and first repository',
  5: 'Link Git on the Pi to your GitHub account',
  6: 'Set up Claude Code, your AI coding assistant',
  7: 'Build and serve a real Flask app on your network',
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [current, setCurrent] = useState(1)
  const [completed, setCompleted] = useState(new Set())
  const [showCompletion, setShowCompletion] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const markComplete = useCallback(() => {
    const next = new Set(completed)
    next.add(current)
    setCompleted(next)
    if (next.size === CHAPTERS.length) {
      setShowCompletion(true)
    } else if (current < CHAPTERS.length) {
      setCurrent(current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [current, completed])

  const goTo = useCallback((id) => {
    setCurrent(id)
    setShowCompletion(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleRestart = useCallback(() => {
    setCompleted(new Set())
    setCurrent(1)
    setShowCompletion(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const isComplete = completed.has(current)
  const ChapterContent = CHAPTER_COMPONENTS[current]
  const chapterMeta = CHAPTERS[current - 1]
  const ChapterIcon = chapterMeta.icon

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans flex">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-gray-900 border-r border-gray-800 fixed left-0 top-0 bottom-0 z-30">
        <Sidebar
          current={current}
          completed={completed}
          onSelect={goTo}
        />
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-72 bg-gray-900 border-r border-gray-800 flex flex-col z-10">
            <Sidebar
              current={current}
              completed={completed}
              onSelect={goTo}
              onClose={() => setSidebarOpen(false)}
              isMobile
            />
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center gap-4">
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <Terminal size={16} className="text-green-400" />
            <span className="text-green-400 font-mono font-bold text-xs tracking-wider">
              PI 400 LAUNCH PAD
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span className="font-mono text-green-500">
              {String(current).padStart(2, '0')}
            </span>
            <ChevronRight size={14} />
            <span>{chapterMeta.title}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {/* Overall progress pills */}
            <div className="hidden sm:flex items-center gap-1">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => goTo(ch.id)}
                  title={ch.title}
                  className={`w-2 h-2 rounded-full transition-all ${
                    completed.has(ch.id)
                      ? 'bg-green-500'
                      : ch.id === current
                      ? 'bg-green-500/50 ring-1 ring-green-500'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-mono ml-1">
              {completed.size}/{CHAPTERS.length}
            </span>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-3xl w-full mx-auto">
          {showCompletion ? (
            <CompletionScreen onRestart={handleRestart} />
          ) : (
            <>
              {/* Chapter header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                    Chapter {current} of {CHAPTERS.length}
                  </span>
                  {isComplete && (
                    <span className="flex items-center gap-1 text-xs text-green-500 bg-green-950/50 border border-green-800/50 px-2 py-0.5 rounded-full">
                      <Check size={10} /> Complete
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-3 mb-2">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mt-1">
                    <ChapterIcon size={20} className="text-green-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {chapterMeta.title}
                    </h1>
                    <p className="text-gray-400 mt-0.5">{CHAPTER_SUBTITLES[current]}</p>
                  </div>
                </div>

                {/* Step progress bar */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isComplete ? 'bg-green-500 w-full' : 'bg-green-500/40 w-1/2'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-mono shrink-0">
                    {isComplete ? 'Done' : `${chapterMeta.steps} steps`}
                  </span>
                </div>
              </div>

              {/* Chapter content */}
              <div className="prose-content">
                <ChapterContent />
              </div>

              {/* Bottom actions */}
              <div className="mt-12 pt-6 border-t border-gray-800 flex items-center gap-3 flex-wrap">
                {current > 1 && (
                  <button
                    onClick={() => goTo(current - 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all text-sm"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                )}
                <div className="flex-1" />
                {!isComplete ? (
                  <button
                    onClick={markComplete}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-all shadow-lg shadow-green-900/30 hover:shadow-green-900/50"
                  >
                    <CheckCircle2 size={16} />
                    Mark Complete
                  </button>
                ) : (
                  current < CHAPTERS.length ? (
                    <button
                      onClick={() => goTo(current + 1)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-all shadow-lg shadow-green-900/30"
                    >
                      Next Chapter
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowCompletion(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-all"
                    >
                      <Trophy size={16} />
                      View Completion
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </main>

        <footer className="border-t border-gray-800/60 py-4 px-6 text-center">
          <p className="text-xs text-gray-700 font-mono">
            Pi 400 Launch Pad · Built for humans, run on a $70 computer
          </p>
        </footer>
      </div>
    </div>
  )
}
