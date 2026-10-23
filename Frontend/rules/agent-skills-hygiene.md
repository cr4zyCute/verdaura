# Rule: Agent Skills Hygiene & Git Exclusion

When installing or creating local agent skills in `.agents/skills`:
1. Always verify that `.agents/` is present in the project's `.gitignore` before or immediately after installing skills.
2. If `.agents/` is missing from `.gitignore`, proactively append `.agents/` to prevent tracking third-party skill source trees, large CSV datasets, and python virtual files.
3. Keep project git status clean, retaining only the `skills-lock.json` if skill version pinning is desired.
