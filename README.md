# Snyk Vulnerable Demo

Intentionally vulnerable sample repository for testing [Snyk](https://snyk.io).

> ⚠️ **DO NOT USE IN PRODUCTION / DO NOT INSTALL DEPENDENCIES LOCALLY**
> Manifests only — no `npm install` / `pip install` was run.

## What's inside

- `package.json` — old vulnerable npm packages:
  `lodash@4.17.15`, `minimist@1.2.0`, `axios@0.21.1`, `express@4.16.0`,
  `jquery@3.4.0`, `handlebars@4.0.11`, `yargs-parser@5.0.0`,
  `jsonwebtoken@8.3.0`, `node-fetch@2.6.0`
- `requirements.txt` — old vulnerable pip packages:
  `Django==2.0.1`, `Flask==0.12`, `requests==2.18.0`, `urllib3==1.23`,
  `Jinja2==2.10`, `PyYAML==3.12`, `lxml==4.2.0`, `Pillow==6.1.0`
- `Dockerfile` — vulnerable base `node:10.16.0-alpine`
- `app.js` / `app.py` — tiny demo code triggering the above libs

## Test with Snyk

```bash
snyk test
snyk code test
snyk container test --file=Dockerfile
```

Connect this repo to Snyk (GitHub integration) to see Open Source, Code, and Container issues.
