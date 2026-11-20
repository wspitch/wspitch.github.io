# Pitch Sinlapanuntakul — portfolio

This portfolio is being prepared in the local `portfolio-redesign` branch of the `wspitch.github.io` repository. **It has not been pushed or published.** Edit the local clone, preview it, and review the resulting changes before publishing.

## Where to edit

- `content.js`: homepage name and introduction, Research Experience placeholders, About heading and paragraphs.
- `projects.js`: card titles, descriptions, image paths, route, order, and grouping. All seven portfolio cases are in `selected`; `sandbox` (the data key for the etc cards) holds them.
- `content/projects/<id>.md`: long-form project writing, metadata, and media placeholders. Each project has an HTML shell at the matching route. Markdown `##` and `###` headings become sections and subtitles; `- ` starts a list; inline `**bold**`, `*italic*`, and `[link](URL)` are supported. `## At a glance` entries formatted as `**Role.** value` render as a label/value stack. Draft comments remain in the Markdown but are hidden on the page.
- `assets/`: add project photos, diagrams, or videos here. Use `![Alt description](assets/photo.jpg)` for an image or `[Video: Walkthrough](assets/demo.mp4)` for a video. To use a cover, set the project file’s `hero:` to `assets/cover.jpg` and optionally add `heroAlt: A concise description of the image.` For a project card image, change that entry’s `image` in `projects.js`.
- `about.html`: About photo-strip file paths and alt text. The strip repeats the same photos to scroll continuously; update both sets of `src` values when adding them.
- `site.js`, `styles.css`, and `project-page.js`: shared navigation/footer, page layout and typography, and Markdown rendering. Change these only when adjusting shared behavior or visual design.

## Current project files

Selected Projects: `abacus.md`, `values.md`, `fortune-toolkit.md`, `fortune-materials.md`, `mr-ar.md`, `anatomyx.md`, and `botnoi.md`.
Etc pages: `design-jam.md` and `teaching.md`.

The previous project pages have been removed from this branch; the sitemap lists all seven Selected Projects and both etc subpages.

## Remaining content items before publishing

- Project cover and body-image placeholders remain until you provide approved images. The NDA project placeholder descriptions are kept as supplied.
- The About photo strip has three photos (`assets/about/01.jpg` to `03.jpg`). To add more, follow the comment inside `about.html`.
- The footer RESUME link points to `assets/Pitch-Sinlapanuntakul-Resume.pdf`. Replace that file to update it.
- Confirm the names, dates, roles, research claims, publication details, and text for public use, especially the two pages marked under NDA.

## Preview locally

From the repository root, run `python3 -m http.server 8000`, then open `http://localhost:8000`. Use a local web server rather than opening `index.html` directly, so the browser can fetch project Markdown files. Press Control-C in Terminal to stop the server.

## Upload and publish with GitHub online (when ready)

The ZIP is a bundle of site files; GitHub does not publish a ZIP directly. Extract it first, then upload the extracted files and folders into the **root** of the `wspitch/wspitch.github.io` repository (so `index.html`, `.nojekyll`, and `sitemap.xml` are at the top level). Commit the upload in GitHub. In the repository’s **Settings → Pages**, select deployment from the `main` branch and `/ (root)` if that is the branch you uploaded to. GitHub Pages then serves the site at `https://wspitch.github.io/`.

The site includes page titles and descriptions, canonical URLs, Open Graph/Twitter metadata, structured data, `robots.txt`, `sitemap.xml`, favicon files, and a social preview. After it is live, confirm the pages load, then submit `https://wspitch.github.io/sitemap.xml` in Google Search Console. These files make the site crawlable and describe it to search engines; indexing, rankings, and traffic depend on Google’s crawling and relevance systems and are not guaranteed.

The repository root includes page titles and descriptions, canonical URLs, Open Graph/Twitter metadata, structured data, `robots.txt`, `sitemap.xml`, a PNG favicon, SVG icon, web manifest, and social preview image.
