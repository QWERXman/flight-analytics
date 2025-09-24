#!/usr/bin/env node
/*
  Parse <path ...> SVG elements and convert them into objects of the form:
  { path: string, title: string, code: string }

  Usage:
    # From a file
    node scripts/parse-svg-paths.js input.svg

    # Or via stdin
    cat input.svg | node scripts/parse-svg-paths.js
*/

const fs = require('fs');

function readAllStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => (data += chunk));
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

function getAttribute(tag, name) {
  const doubleQuoted = new RegExp(name + '\\s*=\\s*"([^"]*)"', 'i');
  const singleQuoted = new RegExp(name + "\\s*=\\s*'([^']*)'", 'i');
  let m = tag.match(doubleQuoted);
  if (m) return m[1];
  m = tag.match(singleQuoted);
  if (m) return m[1];
  return undefined;
}

function parsePaths(input) {
  if (!input) return [];
  // Capture opening <path ...> tags (self-closing or with separate close tag)
  const pathOpenTagRegex = /<path\b[^>]*?>/gi;
  const results = [];
  let match;
  while ((match = pathOpenTagRegex.exec(input)) !== null) {
    const tag = match[0];
    const d = getAttribute(tag, 'd');
    const title = getAttribute(tag, 'data-title');
    const code = getAttribute(tag, 'data-code');
    if (d || title || code) {
      results.push({ path: d || '', title: title || '', code: code || '' });
    }
  }
  return results;
}

async function main() {
  const fileArg = process.argv[2];
  let input = '';
  if (fileArg) {
    input = fs.readFileSync(fileArg, 'utf8');
  } else if (!process.stdin.isTTY) {
    input = await readAllStdin();
  } else {
    console.error('Provide an input file or pipe data via stdin.');
    process.exit(1);
  }

  const objects = parsePaths(input);
  const outputPath = 'output.json';
  fs.writeFileSync(outputPath, JSON.stringify(objects, null, 2) + '\n', 'utf8');
  process.stdout.write(`Wrote ${objects.length} item(s) to ${outputPath}\n`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


