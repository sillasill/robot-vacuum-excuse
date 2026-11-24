// make.fun — "The Robot Vacuum's Best Excuse"
// Writes one excuse from a robot vacuum to $OUTPUT_PATH
// (default /output/entry.txt).
// Deterministic: the text is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "My sensors found the crumb, my bumper found the cat, and the cat has now claimed the crumb. I have updated the map accordingly.";

// The gate requires 1-140 characters.
if (TEXT.length < 1 || TEXT.length > 140) {
  throw new Error(`TEXT must be 1-140 characters, got ${TEXT.length}`);
}

// The brief requires a one-line excuse: no newline may sneak in.
if (TEXT.includes("\n")) {
  throw new Error("TEXT must be a single line, no newline allowed");
}

// The gate also refuses text that is only white space, and control
// characters would break the one-line reading.
if (TEXT.trim().length === 0) {
  throw new Error("TEXT must not be only white space");
}
if (/[\u0000-\u001f\u007f]/.test(TEXT)) {
  throw new Error("TEXT must not contain control characters");
}

const out = process.env.OUTPUT_PATH ?? process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, TEXT, "utf8");
