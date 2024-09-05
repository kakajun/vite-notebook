import { defineConfig } from 'vitepress'

// import { devDependencies } from '../../package.json'

import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader
} from 'vitepress-plugin-group-icons'

// 更多查看  https://github.com/Yiov/vitepress-doc

export default defineConfig({
  lang: 'zh-CN',
  title: 'My Blog',
  description: '我的博客',

  // #region fav
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  // #endregion fav

  base: '/', //网站部署到github的vitepress这个仓库里

  //cleanUrls:true, //开启纯净链接无html

  //启用深色模式
  appearance: 'dark',

  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: true,

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],

    // 开启图片懒加载
    image: {
      lazyLoading: true
    },

    // 组件插入h1标题下
    config: md => {
      ;(md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`
        return htmlResult
      }),
        md.use(groupIconMdPlugin) //代码组图标
    }
  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          md: localIconLoader(import.meta.url, '../public/svg/md.svg'), //markdown图标
          css: localIconLoader(import.meta.url, '../public/svg/css.svg'), //css图标
          js: 'logos:javascript' //js图标
        }
      })
    ]
  },

  lastUpdated: true, //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释

  //主题配置
  themeConfig: {
    //编辑本页
    editLink: {
      pattern: 'https://github.com/kakajun/vite-notebook/edit/main/docs/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },

    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      }
    },

    //导航栏
    nav: [
      { text: '首页', link: '/' },
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
      }
    ],

    //侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '函数式编程',
          collapsed: false,
          items: [
            {
              text: '盒子',
              link: '/guide/'
            },
            {
              text: 'www',
              link: '/guide/ab'
            }
          ]
        },
        {
          text: 'vue源码分析',
          collapsed: false,
          items: [
            {
              text: 'nextTick',
              link: '/guide/vue/'
            },
            {
              text: 'proxy',
              link: '/guide/vue/proxy'
            },
            {
              text: 'proxy-demo',
              link: '/guide/vue/proxy-demo'
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

    //本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    //社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/kakajun' }],

    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',

    //页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2023-${new Date().getFullYear()} 备案号：<a href="https://beian.miit.gov.cn/" target="_blank">京****号</a>`
    },

    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',

    //返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',

    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '当前页大纲'
    },

    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
