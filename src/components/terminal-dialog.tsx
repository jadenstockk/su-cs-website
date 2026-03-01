"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface TerminalLine {
  type: "input" | "output" | "error" | "info";
  text: string;
}

interface TerminalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const buildPrompt = (cwd: string) => `student@stellenbosch ${cwd} %`;

/** File system simulation */
const fileSystem: Record<string, string[]> = {
  "~": ["Documents", "Downloads", "Projects", "modules.txt", ".zshrc"],
  "~/Documents": ["notes", "assignments", "thesis-draft.tex"],
  "~/Documents/notes": ["CS214-notes.md", "CS314-notes.md", "CS344-notes.md"],
  "~/Documents/assignments": ["assignment1.py", "assignment2.cpp", "Makefile"],
  "~/Downloads": ["lecture-slides.pdf", "exam-timetable.pdf"],
  "~/Projects": ["web-app", "ml-project", "compiler-lab", "README.md"],
  "~/Projects/web-app": ["index.html", "styles.css", "app.js", "package.json"],
  "~/Projects/ml-project": ["model.py", "data.csv", "requirements.txt"],
  "~/Projects/compiler-lab": ["lexer.c", "parser.c", "Makefile"],
};

const commandHelp: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help          — Show this help message",
    "  ls            — List directory contents",
    "  cd <dir>      — Change directory",
    "  pwd           — Print working directory",
    "  cat <file>    — Display file contents",
    "  echo <text>   — Print text",
    "  clear         — Clear the terminal",
    "  whoami        — Display current user",
    "  date          — Show current date/time",
    "  uname -a      — System information",
    "  man <cmd>     — Manual pages",
    "  neofetch      — System info display",
    "  links         — Useful SU CS links",
    "  modules       — List CS modules",
    "  staff         — Academic staff list",
    "  research      — Research groups",
    "  contact       — Department contact info",
    "  history       — Show command history",
    "",
    "Tips: Tab to autocomplete, ↑/↓ for history, Ctrl+L to clear",
  ],
};

const catFiles: Record<string, string[]> = {
  "modules.txt": [
    "📚 Stellenbosch CS Modules",
    "─────────────────────────────────",
    "",
    "First Year:",
    "  CS 114  — Introductory Computer Science 1",
    "  CS 144  — Introductory Computer Science 2",
    "",
    "Second Year:",
    "  CS 214  — Data Structures and Algorithms",
    "  CS 244  — Computer Architecture",
    "",
    "Third Year:",
    "  CS 313  — Computer Networks",
    "  CS 314  — Concurrency",
    "  CS 315  — Machine Learning",
    "  CS 343  — Databases and Web Centric Programming",
    "  CS 344  — Program Design (Software Engineering)",
    "  CS 345  — Computability and Automata Theory",
  ],
  ".zshrc": [
    "# ~/.zshrc — Stellenbosch CS",
    'export PATH="$HOME/bin:$PATH"',
    'alias sucs="cd ~/Projects"',
    'alias build="make -j$(nproc)"',
    'alias submit="echo Submitting assignment..."',
    'alias sunlearn="open https://learn.sun.ac.za"',
    'echo "Welcome back, Matie! 🎓"',
  ],
  "README.md": [
    "# My CS Projects",
    "",
    "A collection of projects from Stellenbosch University",
    "Computer Science Division — Dept of Mathematical Sciences.",
    "",
    "## Structure",
    "- web-app/      — Full-stack web application",
    "- ml-project/   — Machine learning experiments",
    "- compiler-lab/ — Compiler construction labs",
  ],
  "CS214-notes.md": [
    "# CS 214 — Data Structures and Algorithms",
    "",
    "## Key Topics",
    "- Binary search trees",
    "- AVL & Red-Black trees",
    "- Hash tables & collision resolution",
    "- Graph algorithms (BFS, DFS, Dijkstra)",
    "- Dynamic programming",
    "",
  ],
  "CS314-notes.md": [
    "# CS 314 — Concurrency",
    "",
    "## Key Topics",
    "- Threads & processes",
    "- Mutual exclusion & semaphores",
    "- Deadlock detection & prevention",
    "- Message passing & monitors",
    "- Concurrent data structures",
    "",
    "Lecturer: Prof Cornelia Inggs",
  ],
  "CS344-notes.md": [
    "# CS 344 — Program Design (Software Engineering)",
    "",
    "## Key Topics",
    "- Design patterns (GoF)",
    "- UML modelling",
    "- Software architecture",
    "- Testing & code quality",
    "- Agile methodologies",
    "",
    "Semester 2 module",
  ],
};

const links = [
  "🔗 Useful Stellenbosch CS Links",
  "──────────────────────────────────",
  "CS Department  → https://cs.sun.ac.za",
  "SUNLearn       → https://learn.sun.ac.za",
  "SU Main Site   → https://www.su.ac.za",
  "SU Library     → https://su.ac.za/library",
  "Apply to SU    → https://www.su.ac.za/apply",
  "Faculty of Sci → https://www.su.ac.za/en/faculties/science",
  "MSc ML & AI    → https://mlai.sun.ac.za",
  "Maties Portal  → https://www.maties.com",
];

const modules = [
  "📚 CS Module Overview",
  "══════════════════════════════════════════════════════",
  "",
  " Year  Code     Module Name                    Sem",
  "─────────────────────────────────────────────────────",
  "  1    CS 114   Introductory Computer Science 1  S1",
  "  1    CS 144   Introductory Computer Science 2  S2",
  "  2    CS 214   Data Structures and Algorithms    S1",
  "  2    CS 244   Computer Architecture             S2",
  "  3    CS 313   Computer Networks                 S1",
  "  3    CS 314   Concurrency                       S1",
  "  3    CS 315   Machine Learning                  S1",
  "  3    CS 343   Databases & Web Programming       S2",
  "  3    CS 344   Program Design (Software Eng)     S2",
  "  3    CS 345   Computability & Automata Theory   S2",
  "",
  "─── Postgraduate ────────────────────────────────────",
  "  PG   CS 712   Advanced Algorithms               S1",
  "  PG   CS 714   Concurrent Programming I          S1",
  "  PG   CS 716   Vulnerability Discovery            S1",
  "  PG   CS 742   Machine Learning A                S1",
  "  PG   CS 791   Artificial Intelligence           S1",
  "  PG   CS 795   Functional Programming            S1",
  "  PG   CS 741   Machine Learning B                S2",
  "  PG   CS 745   Software Construction — Compilers S2",
  "  PG   CS 796   Software Testing and Analysis     S2",
];

const staffList = [
  "👥 Academic Staff — CS Division",
  "══════════════════════════════════════════════════════",
  "",
  " Prof Brink van der Merwe    Head of Division",
  "   ↳ Tree automata, Learning grammars from data",
  "",
  " Prof Andries Engelbrecht",
  "   ↳ Swarm intelligence, Neural networks, ML",
  "",
  " Prof Bernd Fischer",
  "   ↳ Software eng, Formal methods, Program analysis",
  "",
  " Prof William (Bill) Tucker",
  "   ↳ Computer networks, HCI, Social impact",
  "",
  " Prof Lynette van Zijl",
  "   ↳ Automata implementation, Assistive technologies",
  "",
  " Assoc Prof Steve Kroon",
  "   ↳ AI/ML, Statistical learning theory",
  "",
  " Sr Lecturer Marcel Dunaiski",
  "   ↳ Data Science, Informetrics, Scientometrics",
  "",
  " Sr Lecturer Cornelia Inggs",
  "   ↳ Formal methods, Model checking, Concurrency",
  "",
  " Lecturer Trienko Grobler",
  "   ↳ ML, Remote sensing, Radio interferometry",
  "",
  " Lecturer Gavin Rens",
  "   ↳ Cognitive Robotics, Probabilistic planning, RL",
  "",
  " Lecturer Mkhuseli Ngxande",
  "   ↳ ML, Computer vision, Bioinformatics",
  "",
  " Jr Lecturer Willem Bester",
  "   ↳ Software eng, Formal methods, Automata theory",
];

const researchGroups = [
  "🔬 Research Groups",
  "══════════════════════════════════════════════════════",
  "",
  " 1. Theory and Applications of Automata and Grammars",
  "    NFA, cellular automata, music generation,",
  "    grammar correction, pattern layout optimization",
  "",
  " 2. Software Engineering and Verification (SEV)",
  "    OS kernels, protocols, computer-aided verification,",
  "    systematic testing, defensive programming",
  "",
  " 3. Machine Learning and Artificial Intelligence",
  "    Decision-making, planning, search algorithms,",
  "    earth observation, radio interferometry",
  "",
  " 4. Telkom-Siemens Centre of Excellence",
  "    ATM/broadband networks, broadband technologies",
  "    and applications, telecommunications research",
];

const contactInfo = [
  "📞 Department Contact Info",
  "══════════════════════════════════════════════════════",
  "",
  " Head of Division:  Prof Brink van der Merwe",
  " Telephone:         +27 21 808 4232",
  " Fax:               +27 86 603 7130",
  "",
  " Admin:       secretary@cs.sun.ac.za",
  " Undergrad:   undergrad@cs.sun.ac.za",
  " Postgrad:    postgrad@cs.sun.ac.za",
  " Head:        head@cs.sun.ac.za",
  "",
  " Physical:    Computer Science, Stellenbosch University",
  "              Decanting Facility, Hammanshand Road",
  "              7600 Stellenbosch, South Africa",
  "",
  " Postal:      Private Bag X1, 7602 Matieland",
  "              South Africa",
  "",
  " Website:     https://cs.sun.ac.za",
];

function buildNeofetch(): string[] {
  const ua = navigator.userAgent;

  // OS detection
  let os = "Unknown OS";
  if (/Mac OS X/.test(ua)) {
    const match = ua.match(/Mac OS X (\d[\d_]+)/);
    const version = match ? match[1].replace(/_/g, ".") : "";
    const major = parseInt(version.split(".")[0]);
    const names: Record<number, string> = {
      15: "Sequoia",
      14: "Sonoma",
      13: "Ventura",
      12: "Monterey",
      11: "Big Sur",
    };
    os = `macOS ${names[major] ?? ""} ${version}`.trim();
  } else if (/Windows NT/.test(ua)) {
    const match = ua.match(/Windows NT ([\d.]+)/);
    const ntMap: Record<string, string> = {
      "10.0": "Windows 10/11",
      "6.3": "Windows 8.1",
      "6.2": "Windows 8",
      "6.1": "Windows 7",
    };
    os = ntMap[match?.[1] ?? ""] ?? `Windows NT ${match?.[1] ?? ""}`;
  } else if (/Android/.test(ua)) {
    const match = ua.match(/Android ([\d.]+)/);
    os = `Android ${match?.[1] ?? ""}`;
  } else if (/iPhone|iPad/.test(ua)) {
    const match = ua.match(/OS ([\d_]+)/);
    os = `iOS ${match?.[1]?.replace(/_/g, ".") ?? ""}`;
  } else if (/Linux/.test(ua)) {
    os = "Linux";
  }

  // Browser detection
  let browser = "Unknown";
  if (/Firefox\/([\d.]+)/.test(ua)) {
    browser = `Firefox ${ua.match(/Firefox\/([\d.]+)/)?.[1] ?? ""}`;
  } else if (/Edg\/([\d.]+)/.test(ua)) {
    browser = `Edge ${ua.match(/Edg\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  } else if (/OPR\/([\d.]+)/.test(ua)) {
    browser = `Opera ${ua.match(/OPR\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  } else if (/Chrome\/([\d.]+)/.test(ua)) {
    browser = `Chrome ${ua.match(/Chrome\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  } else if (/Safari\/([\d.]+)/.test(ua)) {
    browser = `Safari ${ua.match(/Version\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  }

  // Resolution & display
  const res = `${window.screen.width}x${window.screen.height}`;
  const dpr = window.devicePixelRatio ? `@${window.devicePixelRatio}x` : "";

  // Hardware
  const cores = navigator.hardwareConcurrency
    ? `${navigator.hardwareConcurrency} logical cores`
    : "Unknown";
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    ? `${(navigator as Navigator & { deviceMemory?: number }).deviceMemory} GB`
    : "Unknown";

  // Locale
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const lang = navigator.language;

  return [
    "       ████████████           student@stellenbosch",
    "     ██░░░░░░░░░░░░██         ─────────────────────",
    `   ██░░░░░░░░░░░░░░░░██       OS: ${os}`,
    `  ██░░░░░░░░░░░░░░░░░░██      Browser: ${browser}`,
    ` ██░░░░░░████░░░░░░░░░░██     Resolution: ${res} ${dpr}`.trimEnd(),
    ` ██░░░░██    ██░░░░░░░░██     CPU Cores: ${cores}`,
    ` ██░░░░██    ██░░░░░░░░██     Memory: ${mem}`,
    ` ██░░░░░░████░░░░░░░░░░██     Timezone: ${tz}`,
    `  ██░░░░░░░░░░░░░░░░░░██      Language: ${lang}`,
    `   ██░░░░░░░░░░░░░░░░██       Terminal: SU-CS-Term v2.0`,
    `     ██░░░░░░░░░░░░██         University: Stellenbosch 🎓`,
    `       ████████████           Division: Computer Science`,
    `                              Dept: Mathematical Sciences`,
    `                              Est: Early 1970s (50+ years)`,
  ];
}

/**
 * Animated macOS-style terminal dialog with simulated CS student commands.
 */
export function TerminalDialog({ open, onOpenChange }: TerminalDialogProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "info",
      text: 'Welcome to SU CS Terminal! Type "help" for commands.',
    },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset on close
      setLines([
        {
          type: "info",
          text: 'Welcome to SU CS Terminal! Type "help" for commands.',
        },
      ]);
      setInput("");
      setCwd("~");
      setHistory([]);
      setHistoryIdx(-1);
    }
  }, [open]);

  /** Simulate typing effect for output lines */
  const typeOutput = useCallback(
    async (outputLines: string[], type: TerminalLine["type"] = "output") => {
      setIsTyping(true);
      for (const line of outputLines) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setLines((prev) => [...prev, { type, text: line }]);
            resolve();
          }, 30);
        });
      }
      setIsTyping(false);
    },
    [],
  );

  const handleCommand = useCallback(
    async (rawCmd: string) => {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;

      // Record in history
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);

      // Echo command
      const prompt = buildPrompt(cwd);
      setLines((prev) => [
        ...prev,
        { type: "input", text: `${prompt} ${trimmed}` },
      ]);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0];
      const args = parts.slice(1).join(" ");

      switch (cmd) {
        case "help":
          await typeOutput(commandHelp.help);
          break;

        case "clear":
          setLines([]);
          break;

        case "ls": {
          const dir = fileSystem[cwd];
          if (dir) {
            const dirItems = dir.map((f) => (f.includes(".") ? f : `📁 ${f}`));
            await typeOutput(dirItems);
          } else {
            await typeOutput([`ls: cannot access '${cwd}'`], "error");
          }
          break;
        }

        case "cd": {
          if (!args || args === "~") {
            setCwd("~");
            break;
          }
          if (args === "..") {
            const parentParts = cwd.split("/");
            if (parentParts.length > 1) {
              parentParts.pop();
              setCwd(parentParts.join("/") || "~");
            }
            break;
          }
          const target = cwd === "~" ? `~/${args}` : `${cwd}/${args}`;
          if (fileSystem[target]) {
            setCwd(target);
          } else {
            await typeOutput([`cd: no such directory: ${args}`], "error");
          }
          break;
        }

        case "pwd":
          await typeOutput([`/Users/student${cwd.replace("~", "")}`]);
          break;

        case "cat": {
          if (!args) {
            await typeOutput(["cat: missing file operand"], "error");
            break;
          }
          const content = catFiles[args];
          if (content) {
            await typeOutput(content);
          } else {
            await typeOutput(
              [`cat: ${args}: No such file or directory`],
              "error",
            );
          }
          break;
        }

        case "echo":
          await typeOutput([args || ""]);
          break;

        case "whoami":
          await typeOutput(["student"]);
          break;

        case "date":
          await typeOutput([
            new Date().toLocaleString("en-ZA", {
              dateStyle: "full",
              timeStyle: "medium",
            }),
          ]);
          break;

        case "uname":
          await typeOutput([
            "Darwin stellenbosch-mbp 24.3.0 Darwin Kernel Version 24.3.0 arm64",
          ]);
          break;

        case "neofetch":
          await typeOutput(buildNeofetch(), "info");
          break;

        case "links":
          await typeOutput(links, "info");
          break;

        case "modules":
          await typeOutput(modules, "info");
          break;

        case "staff":
          await typeOutput(staffList, "info");
          break;

        case "research":
          await typeOutput(researchGroups, "info");
          break;

        case "contact":
          await typeOutput(contactInfo, "info");
          break;

        case "man": {
          if (!args) {
            await typeOutput(["What manual page do you want?"], "error");
            break;
          }
          await typeOutput([
            `${args.toUpperCase()}(1)`,
            "",
            `NAME`,
            `       ${args} — a standard Unix utility`,
            "",
            `DESCRIPTION`,
            `       This is a simulated manual page.`,
            `       For real docs, visit: https://man7.org/linux/man-pages/`,
            "",
            `SEE ALSO`,
            `       Type "help" for available commands in this terminal.`,
          ]);
          break;
        }

        case "gcc":
        case "g++":
        case "python":
        case "python3":
        case "node":
        case "java":
        case "javac":
          await typeOutput(
            [
              `Simulated ${cmd}: this terminal is for exploration only 😄`,
              `At SU CS, you'll use these daily in the labs!`,
            ],
            "info",
          );
          break;

        case "sudo":
          await typeOutput(
            ["Nice try — you don't have root access here 🔒"],
            "error",
          );
          break;

        case "rm":
          await typeOutput(
            ["Protected: file deletion is disabled in this terminal."],
            "error",
          );
          break;

        case "make":
          await typeOutput(
            [
              "make: Entering directory '/Users/student/Projects'",
              "gcc -Wall -O2 -o main main.c",
              "✅ Build successful!",
            ],
            "info",
          );
          break;

        case "history":
          if (history.length === 0) {
            await typeOutput(["No commands in history yet."], "info");
          } else {
            await typeOutput(
              history.map((h, i) => `  ${String(i + 1).padStart(4)}  ${h}`),
            );
          }
          break;

        case "exit":
          onOpenChange(false);
          break;

        default:
          await typeOutput(
            [`command not found: ${cmd}. Type "help" for available commands.`],
            "error",
          );
      }
    },
    [cwd, history, typeOutput, onOpenChange],
  );

  /** All available command names for tab completion */
  const allCommands = [
    "help",
    "ls",
    "cd",
    "pwd",
    "cat",
    "echo",
    "clear",
    "whoami",
    "date",
    "uname",
    "neofetch",
    "links",
    "modules",
    "staff",
    "research",
    "contact",
    "man",
    "make",
    "exit",
    "history",
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      handleCommand(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!input.trim()) return;
      const parts = input.split(/\s+/);
      if (parts.length === 1) {
        // Complete command name
        const matches = allCommands.filter((c) => c.startsWith(parts[0]));
        if (matches.length === 1) {
          setInput(matches[0] + " ");
        } else if (matches.length > 1) {
          setLines((prev) => [
            ...prev,
            { type: "info", text: matches.join("  ") },
          ]);
        }
      } else if (parts[0] === "cd" || parts[0] === "cat") {
        // Complete file/directory names
        const partial = parts[parts.length - 1];
        const dir = fileSystem[cwd];
        if (dir) {
          const matches = dir.filter((f) => f.startsWith(partial));
          if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            setInput(parts.join(" "));
          } else if (matches.length > 1) {
            setLines((prev) => [
              ...prev,
              { type: "info", text: matches.join("  ") },
            ]);
          }
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx =
          historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1;
        if (newIdx >= history.length) {
          setHistoryIdx(-1);
          setInput("");
        } else {
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-xl border-0 bg-transparent p-0 shadow-2xl shadow-black/60 sm:max-w-2xl"
      >
        <DialogTitle className="sr-only">Terminal</DialogTitle>

        {/* macOS title bar */}
        <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
            aria-label="Close"
          />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-auto mr-auto text-xs font-medium text-white/50">
            student@stellenbosch — zsh — 80×24
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="h-100 cursor-text overflow-y-auto bg-[#1a1a2e]/95 px-4 py-3 font-mono text-sm leading-relaxed backdrop-blur-xl"
        >
          {lines.map((line, i) => (
            <div
              key={`${i}-${line.text.slice(0, 20)}`}
              className={cn(
                "whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-1 duration-150",
                line.type === "input" && "text-green-400",
                line.type === "output" && "text-gray-300",
                line.type === "error" && "text-red-400",
                line.type === "info" && "text-cyan-300",
              )}
            >
              {line.text}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-2 text-green-400">
            <span className="shrink-0 text-blue-400">{buildPrompt(cwd)}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 bg-transparent text-green-400 caret-green-400 outline-none placeholder:text-white/20"
              placeholder={isTyping ? "" : "type a command..."}
              autoComplete="off"
              spellCheck={false}
            />
            {/* Blinking cursor when not focused */}
            <span className="inline-block h-4 w-0.5 animate-pulse bg-green-400" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
