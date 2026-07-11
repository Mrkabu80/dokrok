# DOK ROK — Static GitHub Pages Website

This repository is a complete static HTML website. No WordPress, build step, database or framework is required.

## Publish on GitHub Pages

1. Upload **all files and folders from this repository root** to the GitHub repository.
2. In **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Keep the `CNAME` file if `dokrok.com` points to GitHub Pages.
4. Do not upload the ZIP itself into the repository; extract it first.

## Language behaviour

- German is the primary version at `/`.
- On a normal HTTP/HTTPS visit, non-German browser languages are redirected to `/en/` unless the visitor has chosen a language manually.
- Local `file://` previews never redirect, so every page remains visible during review.

## Content structure

- German pages: `/`, `/ueber-uns/`, `/leistungen/`, `/forschung/`, `/blog/`, `/kontakt/`
- English pages: `/en/`, `/en/about/`, `/en/services/`, `/en/research/`, `/en/blog/`, `/en/contact/`
- Every article is inside the corresponding `blog` folder.
- Every article image is inside `assets/articles/<article-folder>/`.
- Legacy WordPress URLs are preserved through real HTML redirect pages with visible fallback content.

## Important

The contact form opens the visitor's email application. It does not transmit or store data on the website. Legal texts are based on the supplied WordPress backup and should be reviewed by qualified counsel before production use.
