# PREIshare setup log

**Learner:** Thor Anderson
**Date:** 2026-08-19
**OS:** macOS
**Team repo (upstream):** https://github.com/EdTechForLearning/PREIShare-org-repo
**Orientation notes used:** `docs/onboarding/team-orientation-notes.md`

## 1. Accounts and fork

| Check | Result | Notes |
| --- | --- | --- |
| GitHub sign-in works | PASS | Account username: thortek |
| Can view team repo https://github.com/EdTechForLearning/PREIShare-org-repo | PASS | |
| Fork created in my account | PASS | My fork URL: https://github.com/thortek/PREIShare-org-repo |

## 2. Git install and identity

```text
# git version 2.50.1 (Apple Git-155)

# Thor Anderson
# ta.anderson@gmail.com

```

Identity configured: PASS

## 3. Clone (of MY fork)

- Parent directory used: `/Users/thoranderson/EdTechForLearning/PAUL_Testing`
- Clone command used: `git clone https://github.com/thortek/Forked-PREIShare-org-repo.git`
- Cloned my fork (not the team repo): PASS
- Clone completed without error: PASS
- Local project path: `/Users/thoranderson/EdTechForLearning/PAUL_Testing/Forked-PREIShare-org-repo`

## 4. Remotes (run inside the repo)

- `git remote add upstream https://github.com/EdTechForLearning/PREIShare-org-repo.git` run: PASS

### git remote -v

```text
# paste output — expect four lines:
origin  https://github.com/thortek/Forked-PREIShare-org-repo.git (fetch)
origin  https://github.com/thortek/Forked-PREIShare-org-repo.git (push)
upstream        https://github.com/EdTechForLearning/PREIShare-org-repo.git (fetch)
upstream        https://github.com/EdTechForLearning/PREIShare-org-repo.git (push)
```

origin points at MY fork: PASS
upstream points at the team repo: PASS

## 5. Post-clone verification

### git status

```text
On branch main
Your branch is up to date with 'origin/main'.
```

### Default branch

```text
main
```

Default branch name: `main`
Working tree clean after clone: PASS

## 6. Auth notes (no secrets)

- Clone method: SSH
- Auth method used (if prompted): SSH key
- Auth succeeded: PASS
- **Do not paste tokens or private keys here**

## 7. Issues and fixes

| Issue | What I tried | Outcome |
| --- | --- | --- |
| <none or describe> | | |

## 8. Ready for next step

I have a fork I own, a local clone of it with origin and upstream set, and a setup log another teammate could audit: YES