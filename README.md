# project-birthing-pod

A shared workspace for early-stage projects. Each project lives in its own top-level folder until it is ready for a dedicated repository.

## Spinning a project out

When a project outgrows this workspace, extract its folder into a new repository with its history intact:

```sh
brew install git-filter-repo
git clone https://github.com/furioursus/project-birthing-pod <project>-extract
cd <project>-extract
git filter-repo --subdirectory-filter <project>
git remote add origin <new-repo-url>
git push -u origin main
```

Then remove the folder from this workspace, or replace it with a `README.md` that links to the new repository.

Rules for agents working in this repository are in [`AGENTS.md`](AGENTS.md).
