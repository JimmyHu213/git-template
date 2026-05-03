import { danger, warn, fail, message } from "danger";

const pr = danger.github.pr;

// --- PR Description ---
// Warn if the PR description is missing or too short.
const description = pr.body ?? "";
if (description.length < 30) {
  warn(
    "PR description is short. Please provide context about what this PR does and why."
  );
}

// --- Large PR ---
// Warn if the diff is large — suggest splitting into smaller PRs.
const BIG_PR_THRESHOLD = 500;
const linesChanged =
  (danger.github.pr.additions ?? 0) + (danger.github.pr.deletions ?? 0);
if (linesChanged > BIG_PR_THRESHOLD) {
  warn(
    `This PR changes ${linesChanged} lines. Consider splitting into smaller, focused PRs.`
  );
}

// --- Missing Tests ---
// Warn if source files changed but no test files were modified.
const sourceChanges = danger.git.modified_files.filter(
  (f) =>
    !f.includes("test") &&
    !f.includes("spec") &&
    !f.includes("__tests__") &&
    !f.startsWith(".") &&
    !f.endsWith(".md") &&
    !f.endsWith(".json") &&
    !f.endsWith(".yml") &&
    !f.endsWith(".yaml")
);
const testChanges = danger.git.modified_files.filter(
  (f) => f.includes("test") || f.includes("spec") || f.includes("__tests__")
);
if (sourceChanges.length > 0 && testChanges.length === 0) {
  warn(
    "Source files were changed but no test files were modified. Consider adding tests."
  );
}

// --- TODO / FIXME ---
// Info if new TODO or FIXME comments were added.
const createdFiles = danger.git.created_files;
const modifiedFiles = danger.git.modified_files;
const allChangedFiles = [...createdFiles, ...modifiedFiles];

for (const file of allChangedFiles) {
  const diff = await danger.git.diffForFile(file);
  if (diff && /^\+.*\b(TODO|FIXME)\b/m.test(diff.added)) {
    message(`\`${file}\` contains new TODO/FIXME comments.`);
  }
}

// --- console.log / debugger (configurable) ---
// Fail if console.log or debugger statements were added.
// To disable: comment out or remove this block.
for (const file of allChangedFiles) {
  if (file.endsWith(".ts") || file.endsWith(".js") || file.endsWith(".tsx") || file.endsWith(".jsx")) {
    const diff = await danger.git.diffForFile(file);
    if (diff && /^\+.*\bconsole\.log\b/m.test(diff.added)) {
      fail(
        `\`${file}\` contains a new \`console.log\` statement. Remove before merging.`
      );
    }
    if (diff && /^\+.*\bdebugger\b/m.test(diff.added)) {
      fail(
        `\`${file}\` contains a new \`debugger\` statement. Remove before merging.`
      );
    }
  }
}
