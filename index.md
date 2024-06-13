---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Z-Ultimate-Docs"
  text: "ZZX's knowledge library"
  tagline: Always collect
  image:
    src: /logo.png
    alt: ZZX
  actions:
    - theme: brand
      text: Markdown Examples
      link: /example/markdown-examples
    - theme: alt
      text: API Examples
      link: /example/api-examples
    - theme: alt
      text: GitHub
      link: https://github.com/sugerzzx

features:
  - icon: 🚧
    title: 施工中
    details: wait for it

  - icon: 👉
    title: Links
    details: Contains many links to official docs

  - icon:
      src: /logo/gpt.svg
    title: AI Supported
    details: AI translated or generated, modified by human
---

<style>
:root {
--vp-home-hero-name-color: transparent;
--vp-home-hero-name-background: -webkit-linear-gradient(120deg, #845EC2 30%, #2C73D2);

--vp-home-hero-image-background-image: linear-gradient(-60deg, #2C73D2 10%, #845EC2);
--vp-home-hero-image-filter: blur(60px);
}
</style>
