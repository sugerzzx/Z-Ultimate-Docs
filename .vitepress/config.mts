import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
const iconPath = '/logo.png';

export default defineConfig({
  title: "Z-Ultimate-Docs",
  description: "ZZX's knowledge library",
  head: [
    ['link', { rel: 'icon', href: iconPath }],
    ['meta', { name: 'author', content: 'ZZX' }],
    ['meta', { name: 'keywords', content: 'VitePress, Vue, JavaScript' }]
  ],
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: iconPath,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/lib/index.md' },
      { text: 'Examples', link: '/example/markdown-examples' }
    ],

    sidebar: {
      '/example/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/example/markdown-examples.md' },
            { text: 'Runtime API Examples', link: '/example/api-examples' }
          ]
        }
      ],
      '/lib/AndroidDev': [
        {
          text: 'AndroidDev',
          items: [
            { text: 'ADB', link: '/lib/AndroidDev/ADB.md' },
            { text: 'Android', link: '/lib/AndroidDev/Android.md' },
            { text: 'Animation', link: '/lib/AndroidDev/Animation.md' },
            { text: 'Layout', link: '/lib/AndroidDev/Layout.md' },
            { text: 'WebViewInAndroid', link: '/lib/AndroidDev/WebViewInAndroid.md' },
          ]
        }
      ],
      '/lib/Lang/': [
        {
          text: 'Language&Script',
          items: [
            { text: 'Batch', link: '/lib/Lang/Batch/basic.md' },
            {
              text: 'Java',
              items: [
                { text: 'JavaBasic', link: '/lib/Lang/Java/Basics/BasicKnowledge.md' },
                { text: 'Learning the Java Language', link: '/lib/Lang/Java/Basics/Learning the Java Language.md' }
              ]
            },
            {
              text: 'Javascript',
              items: [
                { text: 'AboutJS', link: '/lib/Lang/Javascript/AboutJS.md' },
                { text: 'EventLoop', link: '/lib/Lang/Javascript/EventLoop.md' },
                { text: 'Object&Class', link: '/lib/Lang/Javascript/Object&Class.md' },
              ]
            }
          ]
        }
      ],
      '/lib/WebFrontEnd/': [
        {
          text: 'WebFrontEnd',
          items: [
            {
              text: 'Framework', items: [
                {
                  text: 'React', items: [
                    { text: 'ReactNative', link: '/lib/WebFrontEnd/Framework/React/ReactNative.md' },
                  ]
                }
              ]
            },
            { text: 'Stencil', link: '/lib/WebFrontEnd/StencilJS.md' },
            { text: 'WebMediaTech', link: '/lib/WebFrontEnd/WebMediaTech.md' }
          ]
        }
      ],
      '/lib/Server/': [
        {
          text: 'Server',
          items: [
            {
              text: 'Node', items: [
                { text: 'Bcrypt', link: '/lib/Server/node/Bcrypt.md' },
                { text: 'KoaJS', link: '/lib/Server/node/KoaJS.md' },
                { text: 'Sequelize', link: '/lib/Server/node/Sequelize.md' }
              ]
            },
            { text: 'Lighttpd', link: '/lib/Server/Lighttpd.md' },
            { text: 'Nginx', link: '/lib/Server/Nginx.md' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sugerzzx' }
    ]
  }
});
