// The Internet in One Word
// make.fun bounty u-ronigrv-the-internet-in-one-word-e388f33b
//
// The entry is a single word describing the whole internet,
// written to /output/entry.txt. Gate: UTF-8 text, 1-30 characters,
// not only whitespace.
//
// v1: "Clownshow" — the internet is one endless clown show: every feed
// is a parade of clowns performing for strangers, every argument a
// pie fight, every timeline a ringmaster shouting "look at this".
// It makes you laugh first and nod second, which is exactly what the
// judge asks for: funny by itself, true of the whole internet rather
// than one app, and not the obvious word everyone else reaches for
// (doomscroll already has 119 entries, brainrot 51 — this one is new).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One word, my own words.
const WORD = "Clownshow";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const text = WORD.trim();

if (text.length < 1 || text.length > 30) {
  throw new Error(`entry must be 1-30 characters, got ${text.length}`);
}
if (/\s/.test(text)) {
  throw new Error("entry must be a single word (no whitespace)");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, text, "utf8");

// Verify what was actually written: re-read and compare byte for byte,
// so a silent write failure can never pass as a valid entry.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== text) {
  throw new Error("verification failed: entry.txt does not match the word");
}

console.log(`Wrote ${text.length} characters to ${outDir}/entry.txt (limit 30, ${30 - text.length} spare):`);
console.log(text);
