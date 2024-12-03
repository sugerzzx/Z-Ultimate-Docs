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
      { text: 'Docs', link: '/md/index.md' }
    ],

    sidebar: {
      '/md/AndroidDev/': { base: '/md/AndroidDev/', items: siderbarAndroidDev() },
      '/md/Lang/': { base: '/md/Lang/', items: sidebarLang() },
      '/md/WebFrontEnd/': { base: '/md/WebFrontEnd/', items: sidebarWebFrontEnd() },
      '/md/Server/': { base: '/md/Server/', items: sidebarServer() },
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
          base: '/md/Lang/Java/',
          items: [
            { text: 'JavaBasic', link: 'Basics/BasicKnowledge.md' },
            { text: 'Learning the Java Language', link: 'Basics/Learning the Java Language.md' }
          ]
        },
        {
          text: 'JavaScript',
          base: '/md/Lang/JavaScript/',
          items: [
            { text: 'AboutJS', link: 'AboutJS.md' },
            { text: 'CheckDataType', link: 'CheckDataType.md' },
            { text: 'Currying&PartialApplication', link: 'Currying&PartialApplication.md' },
            { text: 'EventLoop', link: 'EventLoop.md' },
            { text: 'FPVSOOP', link: 'FPVSOOP.md' },
            { text: 'Object&Class', link: 'Object&Class.md' },
          ]
        },
        {
          text: 'TypeScript',
          base: '/md/Lang/TypeScript/',
          items: [
            { text: 'TypeScript', link: 'TypeScript.md' },
            { text: 'TSConfig', link: 'TSConfig.md' }
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
          text: 'CSS',
          base: '/md/WebFrontEnd/CSSKnowledge/',
          items: [
            { text: 'TailwindCSS', link: 'TailwindCSS.md' }
          ]
        },
        {
          text: 'Engineering',
          base: '/md/WebFrontEnd/Engineering/',
          items: [
            { text: 'PackageManager', link: 'PackageManager.md' },
          ]
        },
        {
          text: 'Framework',
          base: '/md/WebFrontEnd/Framework/React/',
          items: [
            { text: 'ReactNative', link: 'ReactNative.md' },
          ]
        },
        { text: 'Patch', link: 'Patch.md' },
        { text: 'SSE', link: 'SSE.md' },
        { text: 'SSR', link: 'SSR.md' },
        { text: 'Stencil', link: 'StencilJS.md' },
        { text: 'WebMediaTech', link: 'WebMediaTech.md' },
        { text: 'Patterns', link: 'Patterns.md' }
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