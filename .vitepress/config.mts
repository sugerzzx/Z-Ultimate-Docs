import { type DefaultTheme, defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config

export default defineConfig({
  title: "Z-Ultimate-Docs",
  description: "ZZX's knowledge library",
  head: [
    ['link', { rel: 'icon', href: '/Z-Ultimate-Docs/logo.png' }],
    ['meta', { name: 'author', content: 'ZZX' }],
    ['meta', { name: 'keywords', content: 'VitePress, Vue, JavaScript' }]
  ],
  ignoreDeadLinks: true,
  base: '/Z-Ultimate-Docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    outline: [2, 3],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/lib/index.md' }
    ],

    sidebar: {
      '/lib/AndroidDev/': { base: '/lib/AndroidDev/', items: siderbarAndroidDev() },
      '/lib/Lang/': { base: '/lib/Lang/', items: sidebarLang() },
      '/lib/WebFrontEnd/': { base: '/lib/WebFrontEnd/', items: sidebarWebFrontEnd() },
      '/lib/Server/': { base: '/lib/Server/', items: sidebarServer() },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sugerzzx' }
    ]
  }
});

function siderbarAndroidDev(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'AndroidDev',
      items: [
        { text: 'ADB', link: 'ADB.md' },
        { text: 'Android', link: 'Android.md' },
        { text: 'Animation', link: 'Animation.md' },
        { text: 'Layout', link: 'Layout.md' },
        { text: 'WebViewInAndroid', link: 'WebViewInAndroid.md' },
      ]
    }
  ];
}

function sidebarLang(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Language&Script',
      items: [
        { text: 'Batch', link: 'Batch/basic.md' },
        {
          text: 'Java',
          base: '/lib/Lang/Java/',
          items: [
            { text: 'JavaBasic', link: 'Basics/BasicKnowledge.md' },
            { text: 'Learning the Java Language', link: 'Basics/Learning the Java Language.md' }
          ]
        },
        {
          text: 'Javascript',
          base: '/lib/Lang/Javascript/',
          items: [
            { text: 'AboutJS', link: 'AboutJS.md' },
            { text: 'EventLoop', link: 'EventLoop.md' },
            { text: 'Object&Class', link: 'Object&Class.md' },
          ]
        }
      ]
    }
  ];
}

function sidebarWebFrontEnd(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'WebFrontEnd',
      items: [
        {
          text: 'Framework',
          base: '/lib/WebFrontEnd/Framework/',
          items: [
            { text: 'ReactNative', link: 'ReactNative.md' },
          ]
        },
        { text: 'SSR', link: 'SSR.md' },
        { text: 'Stencil', link: 'StencilJS.md' },
        { text: 'WebMediaTech', link: 'WebMediaTech.md' }
      ]
    }
  ];
}

function sidebarServer(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Server',
      items: [
        {
          text: 'Node', items: [
            { text: 'Bcrypt', link: 'node/Bcrypt.md' },
            { text: 'KoaJS', link: 'node/KoaJS.md' },
            { text: 'Sequelize', link: 'node/Sequelize.md' }
          ]
        },
        { text: 'Lighttpd', link: 'Lighttpd.md' },
        { text: 'Nginx', link: 'Nginx.md' }
      ]
    }
  ];
}