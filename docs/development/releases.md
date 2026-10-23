# Release automation

The [Release workflow](../../.github/workflows/release.yml) runs every Monday at
08:25 UTC and can be started manually from GitHub Actions. It only releases the
default branch. Releases use the commit selected when the workflow starts.

## Release process

1. The shared planning action checks changes since the previous release and
   calculates a version from Conventional Commits. Breaking changes increment
   the major version, features increment the minor version, and other changes
   increment the patch version. Tags retain the repository's `1.2.3` format.
2. If there are changes, the workflow runs the shared lint, Node.js tests, and
   bundle checks. Keep the committed `dist/index.js` current by running `make ci`
   and committing the regenerated bundle with source or dependency changes.
3. After all checks succeed, the publishing action drafts release notes, generates
   an AI summary, and publishes the release at the validated commit. The summary
   appears above the full changelog in the GitHub release; no `CHANGELOG.md` is
   maintained in the repository.

AI generates the summary, not the version. Its source material includes the
drafted changelog and evidence from referenced commits and pull requests.
The workflow uses the provider model and retry defaults in the pinned
[`release/create` action](https://github.com/hoverkraft-tech/ci-github-publish/tree/1.0.3/actions/release/create).

The [prepare-release workflow](../../.github/workflows/prepare-release.yml)
maintains Conventional Commit labels when pull requests are opened, updated, or
renamed. With no release changes, the release workflow skips CI and publishing;
the independent scheduled main CI still runs.

## Manual releases and recovery

In GitHub Actions, open **Release**, select **Run workflow**, and choose the
default branch. Leave **force** disabled unless a release is needed without new
changes. Force bypasses change detection only; CI and AI summarization remain
required. Runs on other branches or tags are skipped.

Releases on the same branch are serialized, and a new run does not cancel an
active release. If CI fails, fix the failure before starting another run.

A missing AI credential or a persistent provider failure prevents publication.
If summarization fails after a draft was created, the draft remains unpublished.
Correct the credential or provider issue and rerun the failed job; the publishing
action can refresh the draft for the planned tag before publishing it.
