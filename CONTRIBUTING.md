# Contributing

Thank you for contributing! This document covers the workflow, conventions, and setup for this repository.

## Getting Started

1. Fork and clone the repository
2. Run `npm install` to set up dev dependencies (commitlint)
3. Create a branch from `main`

## Git Workflow

### Branch Naming

Use descriptive branch names:
- `feat/add-user-auth`
- `fix/login-redirect-loop`
- `chore/update-dependencies`
- `docs/api-reference`

### Commit Messages

This project enforces [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must follow this format:

```
type(optional-scope): description

[optional body]
```

**Types:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`, `build`, `perf`, `style`

**Examples:**
```
feat: add user authentication
fix(api): handle null response from payment provider
docs: update contributing guide
chore: bump dependencies
```

PR titles must also follow this format.

### Pull Requests

1. Fill out the PR template completely
2. Keep PRs small and focused — one concern per PR
3. Ensure all CI checks pass before requesting review
4. Address findings from automated reviewers (CodeRabbit, Copilot)

## Code Review

This repository uses two automated code review tools:

### CodeRabbit (AI Review)
- Automatically reviews all non-draft PRs
- Configured in `.coderabbit.yaml`
- Interact with `@coderabbitai` in PR comments

### GitHub Copilot Code Review (AI Review)
- Focuses on logic errors, security, and performance
- **Setup required:** Enable in repo settings > Rules > Rulesets > Add "Copilot code review" as a required check
- Instructions in `.github/copilot-instructions.md`

## CI Checks

| Workflow | Purpose |
|----------|---------|
| PR Checks | Conventional commit enforcement (PR titles + commit messages) |
| Security | CodeQL SAST + dependency review + gitleaks secret scanning |
| Stale | Auto-labels and closes inactive issues/PRs |
| Lint | MegaLinter auto-detect linting |

## Setup Checklist (for repo maintainers)

After creating a repo from this template:

- [ ] Replace `LICENSE` if not using MIT
- [ ] Fill in `CLAUDE.md` project context sections (5 and 9)
- [ ] Update `.github/CODEOWNERS` with actual team paths
- [ ] Enable Copilot Code Review: Settings > Rules > Rulesets
- [ ] Install [CodeRabbit](https://coderabbit.ai) GitHub App on the repo
- [ ] Enable secret scanning: Settings > Code security > Secret scanning
- [ ] Enable private vulnerability reporting: Settings > Code security
- [ ] Configure branch rulesets: require reviews, require status checks, block force push
- [ ] Run `npm install` to set up CI dependencies
- [ ] Update `SECURITY.md` with contact email and supported versions
