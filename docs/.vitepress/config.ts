import type { LocaleSpecificConfig } from 'vitepress'
import { defineConfig, type DefaultTheme } from 'vitepress'
export const META_URL = 'https://github.com/kakajun'
export const META_TITLE = 'NoteBook'
export const META_DESCRIPTION = '记录我的笔记'

export const config: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: META_DESCRIPTION,
  head: [
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }]
  ],
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/router/edit/main/packages/docs/:path',
      text: '对本页提出修改建议'
    },

    outlineTitle: '本页内容',

    nav: nav(),

    sidebar: {
      '/guide/': [
        {
          text: '基础',
          collapsed: false,
          items: [
            {
              text: '入门',
              link: '/guide/'
            },
            {
              text: 'www',
              link: '/guide/ab'
            }
          ]
        }
      ],
      '/css/': [
        {
          text: '基础',
          collapsed: false,
          items: [
            {
              text: '入门',
              link: '/css/'
            },
            {
              text: 'qqq',
              link: '/css/ab'
            }
          ]
        }
      ],
      '/philosophy/': [
        {
          text: '哲学',
          collapsed: false,
          items: [
            {
              text: '认知觉醒',
              link: '/philosophy/index'
            }
          ]
        }
      ]
    },
    algolia: {
      appId: 'BTNTW3I1XP',
      apiKey: '771d10c8c5cc48f7922f15048b4d931c',
      indexName: 'next_router_vuejs'
    }
  }
}
function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '前端知识',
      link: '/guide/',
      activeMatch: '^/guide/'
    },
    {
      text: 'CSS 相关',
      link: '/css/',
      activeMatch: '^/css/'
    },
    {
      text: '方法论',
      link: '/philosophy/',
      activeMatch: '^/philosophy/'
    },
    {
      text: 'plugin 相关',
      link: '/plugin/',
      activeMatch: '^/plugin/'
    },
    {
      text: '相关链接',
      items: [
        {
          text: '我的掘金',
          link: 'https://juejin.cn/user/1618120936275127/posts'
        },
        {
          text: '我的github',
          link: 'https://github.com/kakajun'
        }
      ]
    }
  ]
}
export default defineConfig({
  ...config
})
