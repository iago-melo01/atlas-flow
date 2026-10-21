---
name: git-commit
description: >-
  Create well-formatted git commits following conventional commit standards.
  Use when the user runs /commit, asks to commit changes, write a commit
  message, or create a conventional commit from staged changes.
disable-model-invocation: true
---

# Git Commit Skill

Create well-formatted git commits following conventional commit standards.

## Usage

```
/commit
```

## Behavior

1. Analyze staged changes with `git diff --staged`
2. Generate a conventional commit message
3. Create the commit with proper formatting

## Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

## Types

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding or modifying tests
- chore: Maintenance tasks

## Example Output

```
feat(auth): add password reset functionality

- Add forgot password form
- Implement email verification flow
- Add password reset endpoint
```

## Workflow

When `/commit` is invoked, run these steps in order.

### 1. Inspect repository state

Run in parallel:

```bash
git status
git diff --staged
git log -5 --oneline
```

- If nothing is staged, stop and tell the user to stage files first with `git add`.
- Do not stage files unless the user explicitly asks.
- Read recent commit messages to match repository tone and scope naming.

### 2. Draft the message
### IMPORTANT: Separate the changes in COMMITS (plural) if necessary. So if there are changes that change many different things on the project, MAKE SURE to create separate commmits, Not just one!
- Pick the correct `type` from the list above.
- Use a short, lowercase `scope` when the change area is clear (e.g. `auth`, `api`, `docker`).
- Write the subject in imperative mood, without a trailing period.
- Add a body with bullet points when the change spans multiple files or behaviors.
- Focus the message on **why** the change exists, not only what changed.
- Never commit files that likely contain secrets (`.env`, credentials, tokens). Warn the user instead.

### 3. Create the commits

Git safety rules:
### IMPORTANT: Separate the changes in COMMITS (plural) if necessary. So if there are changes that change many different things on the project, MAKE SURE to create separate commmits, Not just one!
- NEVER update git config
- NEVER run destructive git commands unless explicitly requested
- NEVER skip hooks unless explicitly requested
- NEVER amend unless the user explicitly requests it and amend preconditions are met
- NEVER push unless explicitly requested

Create the commit:

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

- <bullet if needed>
EOF
)"
```

On PowerShell, use an equivalent here-string or `-m` flags that preserve line breaks.

### 4. Verify

```bash
git status
```

Confirm the commit succeeded. If a pre-commit hook fails, fix the issue and create a **new** commit — do not amend unless allowed.
