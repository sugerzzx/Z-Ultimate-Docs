import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Layout from '../../components/Layout.vue';
import './custom.css';
import Link from '../../components/Link.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('Link', Link);
  }
} satisfies Theme;
