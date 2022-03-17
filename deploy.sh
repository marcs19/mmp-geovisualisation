set -e

npm run build

cd dist

# if you use custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git remote add origin https://github.com/marcs19/mmp-geovisualisation.git
git push -u -f origin master

cd -