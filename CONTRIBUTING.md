### tl;dr
- Master branch is off limits for pushes, all code gets reviews by at least 2 members of the team.
- Workflow is branch and PR with branch naming as `<username>/<english-description>` example `timbrook/bug-fix-everything`.
- Track your work and make it public on the ZenHub board.

### Master branch
The master branch is protected by githubs review system. And tests are configured in the circle.yml

### Branch maintenance
Naming convention is `<username>/<english-description>`, this is to make it clear branch owners and what it's for. After a PR is merged, delete the branch.
