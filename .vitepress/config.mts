import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
const iconPath = '/assets/z.png';

export default defineConfig({
  title: "Z-Knowledge",
  description: "ZZX's knowledge library",
  head: [
    ['link', { rel: 'icon', href: iconPath }],
    ['meta', { name: 'author', content: 'ZZX' }],
    ['meta', { name: 'keywords', content: 'VitePress, Vue, JavaScript' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: iconPath,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/Lang/Javascript.md' },
      { text: 'Examples', link: '/example/markdown-examples' }
    ],

    sidebar: {
      '/example/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ],
      '/docs/': [
        {
          text: 'AndroidDev',
          items: [
            { text: 'JAVA', link: '/docs/AndroidDev/JAVA/BasicKnowledge.md' },
            { text: 'ADB', link: '/docs/AndroidDev/ADB.md' },
            { text: 'Android', link: '/docs/AndroidDev/Android.md' },
            { text: 'Animation', link: '/docs/AndroidDev/Animation.md' },
            { text: 'Layout', link: '/docs/AndroidDev/Layout.md' },
            { text: 'WebViewInAndroid', link: '/docs/AndroidDev/WebViewInAndroid.md' },
          ]
        },
        {
          text: 'Language&Script',
          items: [
            { text: 'Batch', link: '/docs/Lang/Batch/basic.md' },
            { text: 'Javascript', link: '/docs/Lang/Javascript.md' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sugerzzx' }
    ]
  }
});
