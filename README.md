# elecdove-web

The node.js front-end.

Run production

```bash
npm run build --spa

pm2 serve -s build 3010

pm2 start ecosystem.config.js --env production
```



## Unit test

Windows:

```powershell
# Test with filter
npm test -- -t 'auth'
```

## Deploy



```bash
pm2 deploy ecosystem.config.js production --force
```



