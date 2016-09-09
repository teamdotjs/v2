### tl;dr
- Master branch is off limits for pushes, all code gets reviews by at least 2 members of the team.
- Workflow is branch and PR with branch naming as `<username>/<english-description>` example `timbrook/bug-fix-everything`.
- Track your work and make it public on the ZenHub board.

### Master branch
The master branch is protected by [lgtm.co](https://lgtm.co). It requires 2 maintainers to comment "LGTM" on a PR into master for it to get merged. As progress on the project ramps up, more checks will get put in place through [circleci.com](https://circleci.com/).

### Branch maintenance
Naming convention is `<username>/<english-description>`, this is to make it clear branch owners and what it's for. After a PR is merged, delete the branch.
