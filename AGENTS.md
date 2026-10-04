# Agent instructions

This repository is a shared workspace for early-stage projects. Each project lives in its own top-level folder until it is ready to move into a dedicated repository, at which point its folder is extracted with its git history intact. The rules below exist to keep that extraction clean.

## Scope

- Work only inside the project folder named in the task. Do not read from or change other project folders unless the task explicitly asks for it.
- If a task does not name a folder, ask which project it belongs to before making changes.
- Root-level files (`AGENTS.md`, `README.md`, `.gitignore`, `.claude/`) are shared workspace configuration. Change them only when the task is about the workspace itself.

## Project folders

- One project per top-level folder, named in kebab-case (for example, `bluesky-slurp-v2`).
- Never rename or move a top-level folder. Renames break history extraction later. If a project needs a new name, flag it instead of renaming it.
- Each folder is self-contained: its own `package.json`, lockfile, config, and dependencies. Do not add a root `package.json` or workspace configuration.
- Use npm for every project. Before working in a folder, run `npm ci` there, or `npm install` if it has no `package-lock.json` yet, and commit the lockfile. Do not use pnpm, Yarn, or Bun, even though the environment has them installed.
- Every project folder has its own `README.md` describing what it is, and may have its own `AGENTS.md` for project-specific instructions.

## Deploying to Netlify

- Any project folder with a `netlify.toml` deploys automatically through `.github/workflows/netlify.yml`. The Netlify site has the same name as the folder and lives in the `furioursus` team. The workflow creates it on the first deploy.
- A pull request that touches a project gets a preview at `https://pr-<number>--<folder>.netlify.app`, and the workflow comments the link on the pull request. A merge to `main` deploys that project to production.
- To deploy a web project, add a `netlify.toml` to its folder with the build command and publish directory, and run its build once locally to confirm the output folder. Projects that shouldn't deploy just leave the file out.
- Don't link these sites to the repository in the Netlify dashboard. The workflow already deploys them, and a linked site would build every change a second time.
- The workflow needs the `NETLIFY_AUTH_TOKEN` repository secret. Without it, projects are still installed and tested, and the deploy step is skipped with a warning.
- When a project moves to its own repository, keep its Netlify site and its URL, and set up deploys from the new repository.

## Starting a new project

1. Create the top-level folder.
2. Add a `README.md` with a one-paragraph description of the project.
3. Add an `AGENTS.md` if the project has stack choices or rules that future sessions need to know.
4. Make the first commit for that folder on its own.

## Commits

- One project per commit. A commit must never touch files in more than one project folder, or a project folder and root configuration together.
- Use Conventional Commits: `type(scope): subject`, with the project folder name as the scope (for example, `feat(bluesky-slurp-v2): add export button`). Use `workspace` as the scope for root-level changes.
- Subjects are lowercase, imperative, and have no trailing period.
- Leave attribution as Claude Code produces it. Do not add or strip `Co-Authored-By` trailers, session links, or "Generated with" footers by hand. Cloud sessions add them by default and local sessions suppress them through user settings, so their presence marks a commit or pull request as made remotely.

## Branches and pull requests

- Do not push directly to `main`. Work on a branch and open a pull request.
- Keep each pull request to a single project folder.
