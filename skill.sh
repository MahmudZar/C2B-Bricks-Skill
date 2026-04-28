#!/usr/bin/env bash

declare -A SKILLS=(
  [c2b-bricks-skill]="skills/c2b-bricks-skill/SKILL.md"
)

if [[ $# -eq 0 ]]; then
  echo "Usage: source ./skill.sh <skill-name>"
  echo "Available skills: ${!SKILLS[@]}"
else
  echo "${SKILLS[$1]}"
fi
