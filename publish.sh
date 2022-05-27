#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'init'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git remote add origin https://github.com/thinkingme/thinkingme.github.io.git
git branch -M master
git push -u https://github.com/thinkingme/thinkingme.github.io.git

cd -