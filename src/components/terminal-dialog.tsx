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

const PROMPT = "student@stellenbosch ~ %";

/** File system simulation */
const fileSystem: Record<string, string[]> = {
  "~": ["Documents", "Downloads", "Projects", "courses.txt", ".zshrc"],
  "~/Documents": ["notes", "assignments", "thesis-draft.tex"],
  "~/Documents/notes": [
    "COS212-notes.md",
    "COS226-notes.md",
    "COS344-notes.md",
  ],
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
    "  timetable     — Show class schedule",
    "  cafes         — Nearby coffee spots ☕",
  ],
};

const catFiles: Record<string, string[]> = {
  "courses.txt": [
    "📚 Stellenbosch CS Courses 2026",
    "─────────────────────────────────",
    "COS 132  — Imperative Programming",
    "COS 212  — Data Structures & Algorithms",
    "COS 214  — Software Modelling",
    "COS 226  — Concurrent Systems",
    "COS 284  — Computer Organisation",
    "COS 314  — Machine Learning",
    "COS 326  — Database Systems",
    "COS 344  — Computer Graphics",
    "COS 711  — Artificial Intelligence",
    "COS 730  — Information Security",
  ],
  ".zshrc": [
    "# ~/.zshrc",
    'export PATH="$HOME/bin:$PATH"',
    'alias sucs="cd ~/Projects"',
    'alias build="make -j$(nproc)"',
    'alias submit="echo Submitting assignment..."',
    'echo "Welcome back, Matie! 🎓"',
  ],
  "README.md": [
    "# My CS Projects",
    "",
    "A collection of projects from Stellenbosch University",
    "Computer Science department.",
    "",
    "## Structure",
    "- web-app/     — Full-stack web application",
    "- ml-project/  — Machine learning experiments",
    "- compiler-lab/— Compiler construction labs",
  ],
  "COS212-notes.md": [
    "# COS 212 — Data Structures & Algorithms",
    "",
    "## Key Topics",
    "- Binary search trees",
    "- AVL & Red-Black trees",
    "- Hash tables & collision resolution",
    "- Graph algorithms (BFS, DFS, Dijkstra)",
    "- Dynamic programming",
    "",
    "Exam: June 2026 📝",
  ],
};

const links = [
  "🔗 Useful Stellenbosch CS Links",
  "──────────────────────────────────",
  "SUNLearn     → https://learn.sun.ac.za",
  "CS Dept      → https://cs.sun.ac.za",
  "Library      → https://library.sun.ac.za",
  "My SU        → https://my.sun.ac.za",
  "GitHub SU    → https://github.com/stellenbosch-university",
  "Timetable    → https://timetable.sun.ac.za",
];

const timetable = [
  "📅 Monday — Week Schedule",
  "──────────────────────────",
  "08:00  COS 212  — IT Building A308",
  "10:00  COS 226  — Narga Auditorium",
  "13:00  COS 284  — IT Building A204",
  "15:00  Tutorial  — Lab 3, IT Building",
  "",
  "📅 Tuesday",
  "──────────────────────────",
  "09:00  COS 214  — IT Building A308",
  "11:00  COS 344  — Engineering C203",
  "14:00  Practical — Lab 1, IT Building",
];

const cafes = [
  "☕ Coffee spots near IT Building",
  "──────────────────────────────────",
  "🏠 Deluxe Coffeeworks — Andringa St",
  "🏠 Häzz Café — Victoria St",
  "🏠 De Akker — Dorp St (also meals)",
  "🏠 Meraki — Bird St",
  "🏠 Craft Coffee — Church St",
  "",
  "Pro tip: Deluxe has the fastest WiFi 🚀",
];

const neofetch = [
  "       ████████████           student@stellenbosch",
  "     ██░░░░░░░░░░░░██         ─────────────────────",
  "   ██░░░░░░░░░░░░░░░░██       OS: macOS Sequoia 15.3",
  "  ██░░░░░░░░░░░░░░░░░░██      Host: MacBook Pro (M4)",
  " ██░░░░░░████░░░░░░░░░░██     Kernel: Darwin 24.3.0",
  " ██░░░░██    ██░░░░░░░░██     Shell: zsh 5.9",
  " ██░░░░██    ██░░░░░░░░██     Terminal: SU-CS-Term",
  " ██░░░░░░████░░░░░░░░░░██     IDE: VS Code",
  "  ██░░░░░░░░░░░░░░░░░░██      Languages: Python, C++, JS",
  "   ██░░░░░░░░░░░░░░░░██       University: Stellenbosch 🎓",
  "     ██░░░░░░░░░░░░██         Dept: Computer Science",
  "       ████████████           GPA: █████████░ 90%",
];

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
      setLines((prev) => [
        ...prev,
        { type: "input", text: `${PROMPT} ${trimmed}` },
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
            const formatted = dir
              .map((f) => (f.includes(".") ? f : `\x1b[34m${f}/\x1b[0m`))
              .join("  ");
            // We'll show them in a simplified view
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
          await typeOutput(neofetch, "info");
          break;

        case "links":
          await typeOutput(links, "info");
          break;

        case "timetable":
          await typeOutput(timetable, "info");
          break;

        case "cafes":
        case "coffee":
          await typeOutput(cafes, "info");
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
          await typeOutput(
            [
              `Simulated ${cmd}: this terminal is for navigation only 😄`,
              `But at SU CS, you'll use these daily in the IT Building labs!`,
            ],
            "info",
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
    [cwd, typeOutput, onOpenChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      handleCommand(input);
      setInput("");
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
            <span className="shrink-0 text-blue-400">{PROMPT}</span>
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
