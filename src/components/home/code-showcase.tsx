"use client";

import { ContentContainer } from "@/components/content-container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const codeSnippets = [
  [
    "def fibonacci(n):",
    "  if n <= 1:",
    "    return n",
    "  return fib(n-1)",
    "    + fib(n-2)",
    "",
    "# O(2^n) → O(n)",
    "memo = {}",
    "def fib(n, memo):",
    "  if n in memo:",
    "    return memo[n]",
    "  memo[n] = fib(n-1)",
    "    + fib(n-2)",
    "  return memo[n]",
  ],
  [
    "class Node<T> {",
    "  value: T;",
    "  left?: Node<T>;",
    "  right?: Node<T>;",
    "",
    "  insert(val: T) {",
    "    if (val < this.value)",
    "      this.left?.insert(val);",
    "    else",
    "      this.right?.insert(val);",
    "  }",
    "}",
    "",
    "// Binary Search Tree",
    "// O(log n) average",
  ],
  [
    "SELECT name, gpa",
    "FROM students",
    "WHERE department",
    "  = 'Computer Science'",
    "ORDER BY gpa DESC",
    "LIMIT 10;",
    "",
    "-- Indexed query",
    "-- O(log n) lookup",
    "-- B-tree traversal",
    "",
    "CREATE INDEX idx",
    "ON students(gpa);",
  ],
  [
    "fn quicksort<T: Ord>(",
    "  arr: &mut [T]",
    ") {",
    "  if arr.len() <= 1 {",
    "    return;",
    "  }",
    "  let p = partition(arr);",
    "  quicksort(&mut arr[..p]);",
    "  quicksort(&mut arr[p+1..]);",
    "}",
    "",
    "// Average: O(n log n)",
    "// Space: O(log n)",
  ],
  [
    "import torch",
    "import torch.nn as nn",
    "",
    "class Net(nn.Module):",
    "  def __init__(self):",
    "    super().__init__()",
    "    self.fc1 =",
    "      nn.Linear(784, 128)",
    "    self.fc2 =",
    "      nn.Linear(128, 10)",
    "",
    "  def forward(self, x):",
    "    x = F.relu(self.fc1(x))",
    "    return self.fc2(x)",
  ],
  [
    "10101100 11011001",
    "01001110 11100010",
    "11110000 10100101",
    "",
    "PUSH EAX",
    "MOV ECX, [EBP+8]",
    "CALL 0x004010A0",
    "CMP EAX, 0",
    "JNE .loop",
    "POP EBX",
    "RET",
    "",
    "; x86 assembly",
    "; stack frame",
  ],
  [
    "graph TD",
    "  A[Start] --> B{AI?}",
    "  B -->|Yes| C[Train]",
    "  B -->|No| D[Build]",
    "  C --> E[Deploy]",
    "  D --> E",
    "",
    "∀x ∈ S: f(x) > 0",
    "∃y: g(y) = min(S)",
    "P(A|B) = P(B|A)·P(A)",
    "          / P(B)",
    "",
    "λf.(λx.f(x x))",
    "    (λx.f(x x))",
  ],
  [
    "async function fetch() {",
    "  const res = await",
    "    api.get('/data');",
    "  const parsed =",
    "    JSON.parse(res);",
    "  return parsed",
    "    .filter(valid)",
    "    .map(transform);",
    "}",
    "",
    "// Promise<T[]>",
    "// async/await",
    "// functional pipe",
  ],
];

function CodeColumn({
  snippets,
  speed,
  opacity,
  reverse,
}: {
  snippets: string[];
  speed: number;
  opacity: number;
  reverse?: boolean;
}) {
  // Duplicate content for seamless looping
  const doubled = [...snippets, "", ...snippets, ""];

  return (
    <div className="h-full select-none overflow-hidden" style={{ opacity }}>
      <div
        className="flex flex-col gap-0.5 whitespace-nowrap font-mono text-[10px] leading-5 text-su-gold/90 sm:text-xs sm:leading-6"
        style={{
          animation: `code-scroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((line, i) => (
          <span key={`${i}-${line}`} className="block">
            {line || "\u00A0"}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CodeShowcaseSection({ className }: { className?: string }) {
  const t = useTranslations("HomeShowcase");

  const columns = useMemo(
    () => [
      { snippets: codeSnippets[0], speed: 30, opacity: 0.12, reverse: false },
      { snippets: codeSnippets[1], speed: 24, opacity: 0.18, reverse: true },
      { snippets: codeSnippets[2], speed: 35, opacity: 0.1, reverse: false },
      { snippets: codeSnippets[3], speed: 27, opacity: 0.16, reverse: true },
      { snippets: codeSnippets[4], speed: 32, opacity: 0.14, reverse: false },
      { snippets: codeSnippets[5], speed: 22, opacity: 0.08, reverse: true },
      { snippets: codeSnippets[6], speed: 28, opacity: 0.12, reverse: false },
      { snippets: codeSnippets[7], speed: 34, opacity: 0.1, reverse: true },
    ],
    [],
  );

  return (
    <section
      className={cn("relative overflow-hidden py-32 sm:py-40", className)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-su-dark/40 to-background" />

      {/* Code rain columns */}
      <div
        className="pointer-events-none absolute inset-0 flex justify-around px-4"
        aria-hidden="true"
      >
        {columns.map((col, i) => (
          <CodeColumn key={`col-${i}`} {...col} />
        ))}
      </div>

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-background)_70%)]" />

      {/* Content */}
      <ContentContainer className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-su-gold/20 bg-su-gold/5 px-4 py-2 text-sm font-medium text-su-gold"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-su-gold" />
            {"<code />"}
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {t("title")}
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/50 sm:text-xl">
            {t("subtitle")}
          </p>
          <Link href="/research">
            <Button
              variant="white"
              size="lg"
              slideReveal
              className="cursor-pointer"
            >
              {t("exploreResearch")}
            </Button>
          </Link>
        </motion.div>
      </ContentContainer>
    </section>
  );
}
