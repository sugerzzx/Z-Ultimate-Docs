---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Z-Ultimate-Docs"
  text: "ZZX's knowledge library"
  tagline: <span class="tag">&lt;/c0de&gt;</span>
  image:
    src: /logo.png
    alt: ZZX
  actions:
    - theme: brand
      text: Docs
      link: /lib/
    - theme: alt
      text: GitHub
      link: https://github.com/sugerzzx

features:
  - icon: 📝
    title: Record
    details: Actrually, it's a record of my learning.🧐

  - icon: 👉
    title: Links
    details: Standing on the shoulders of Giants, though I haven't seen further yet.🤣

  - icon: 🚧
    title: Building
    details: Rome wasn't built in a day, and this site won't built in a yaer.😋
---

<style>
:root {
--vp-home-hero-name-color: transparent;
--vp-home-hero-name-background: -webkit-linear-gradient(120deg, #845EC2 30%, #2C73D2);

--vp-home-hero-image-background-image: linear-gradient(-60deg, #2C73D2 10%, #845EC2);
--vp-home-hero-image-filter: blur(60px);
}

.tag {
  padding: 1em 0em;
  font-size: 2em;
  background: radial-gradient(at var(--x, 10%) var(--y, 50%), #ffffffa4, #000);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  cursor: default;
}
</style>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const tag = document.querySelector('.tag');
  tag.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = tag.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    tag.style.setProperty('--x', `${x}%`);
    tag.style.setProperty('--y', `${y}%`);
  });
})
</script>
