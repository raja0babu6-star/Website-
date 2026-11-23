# Moonshot-inspired static website

An independent front-end recreation inspired by the public MakeMoonshot landing page. It is not affiliated with Moonshot and does not use their private source code.

## Live site

After the first successful GitHub Actions deployment, the site should be available at:

https://raja0babu6-star.github.io/Website-/

## Deployment

The repository includes `.github/workflows/pages.yml`. It deploys the contents of the repository to GitHub Pages whenever changes are pushed to `main`, and can also be started manually from **Actions → Deploy website to GitHub Pages → Run workflow**. The workflow attempts to enable Pages automatically.

If GitHub blocks the first deployment, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source, then re-run the workflow.

## Demo limitations

This is a static front-end. The file picker selects a video/audio file locally and displays its name; it does not upload, process, or export it. Real AI editing, user accounts, cloud storage, and payment functionality need a secure backend and provider APIs.
