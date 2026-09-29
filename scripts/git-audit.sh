#!/usr/bin/env bash
# Audit every git repo under a root: branches, remotes, commit counts, contributors.
# Usage: scripts/git-audit.sh [root=~/Projects] [author-regex=ObeeJ|Ajayi|obanijesu]
ROOT="${1:-$HOME/Projects}"
ME="${2:-ObeeJ|Ajayi|obanijesu|ajayioba|ajayiobanijesu}"
for gd in $(find "$ROOT" -maxdepth 3 -name .git \( -type d -o -type f \) -not -path '*/node_modules/*' 2>/dev/null | sort); do
  r=$(dirname "$gd")
  cd "$r" || continue
  total=$(git rev-list --count HEAD 2>/dev/null || echo 0)
  [ "$total" = 0 ] && { echo "## ${r#$ROOT/} | no commits"; continue; }
  mine=$(git log --format='%an <%ae>' 2>/dev/null | grep -Eic "$ME")
  cur=$(git branch --show-current)
  nb=$(git branch | wc -l); nr=$(git branch -r 2>/dev/null | grep -vc HEAD)
  remote=$(git remote get-url origin 2>/dev/null || echo none)
  ncon=$(git shortlog -sne HEAD | wc -l)
  echo "## ${r#$ROOT/} | remote=$remote | on=$cur | local_br=$nb remote_br=$nr | commits=$total mine=$mine | contributors=$ncon"
  git shortlog -sne HEAD 2>/dev/null | head -6 | sed 's/^/     /'
done
