// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Snakinya-明烛天南',
  tagline: '苍山负雪，明烛天南',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://www.snakin.top',
  baseUrl: '/',

  organizationName: 'Snakinya',
  projectName: 'snakinya-blog',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Snakinya/snakinya-blog/tree/main/docusaurus/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Snakinya',
        logo: {
          alt: 'Snakinya Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '博客',
          },
          {to: '/about', label: '关于', position: 'right'},
          {to: '/friends', label: '友链', position: 'right'},
          {
            href: 'https://github.com/Snakinya',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            items: [
              {label: 'GitHub', href: 'https://github.com/Snakinya'},
              {label: '学术主页', href: 'https://profile.snakin.top'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Snakinya. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
