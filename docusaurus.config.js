// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

// 分类内按 front matter 的 date 倒序排序（新→旧）
const ts = (v) => (v ? new Date(v).getTime() : 0);
function sortByDate(items, dates) {
  return items.map((it) =>
    it.type === 'category'
      ? {...it, items: sortByDate([...it.items].sort((a, b) =>
          (b.type === 'doc' ? dates[b.id] : 0) - (a.type === 'doc' ? dates[a.id] : 0)), dates)}
      : it,
  );
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Snakinya',
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
          editUrl: 'https://github.com/Snakinya/snakinya-blog/tree/main/',
          showLastUpdateTime: true,
          sidebarItemsGenerator: async (args) => {
            const items = await args.defaultSidebarItemsGenerator(args);
            const dates = {};
            for (const d of args.docs) dates[d.id] = ts(d.frontMatter?.date);
            return sortByDate(items, dates);
          },
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
        style: 'light',
        copyright: `© ${new Date().getFullYear()} Snakinya · 苍山负雪，明烛天南`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
