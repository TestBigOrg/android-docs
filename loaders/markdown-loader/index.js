import React from 'react';
import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';
import markdownItSub from 'markdown-it-sub';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItDeflist from 'markdown-it-deflist';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItDecorate from 'markdown-it-decorate';
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor';
import hljs from 'highlight.js';
import objectAssign from 'object-assign';
import * as constants from '../../constants';


const highlight = (str, lang) => {
  str = str.replace(new RegExp('{masVersion}', 'g'), constants.MAS_VERSION)
  str = str.replace(new RegExp('{mapSdkVersion}', 'g'), constants.MAP_SDK_VERSION)
  if (lang && hljs.getLanguage(lang)) {
    try {
      return '<pre class="hljs"><code>' +
             hljs.highlight(lang, str, true).value +
             '</code></pre>';
    } catch (__) {}
  }

  return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
}

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight
}).use(markdownItSub)
  .use(markdownItFootnote)
  .use(markdownItDeflist)
  .use(markdownItAbbr)
  .use(markdownItAttrs)
  .use(markdownItDecorate)
  .use(markdownItTocAndAnchor, {
    anchorLinkSymbol: '',
    tocClassName: "toc-subheaders"
  })

md.renderer.rules.text = function customRenderRules(tokens, idx, options, env, renderer) {
  tokens[idx].content.replace(new RegExp('{masVersion}', 'g'), constants.MAS_VERSION)
  tokens[idx].content.replace(new RegExp('{mapSdkVersion}', 'g'), constants.MAP_SDK_VERSION)
  return tokens[idx].content;
}

module.exports = function (content) {
  this.cacheable()
  var toc
  const meta = frontMatter(content)
  const body = md.render(meta.body, {
    tocCallback: function(tocMarkdown, tocArray, tocHtml) {
      toc = tocHtml
    }
  })
  const result = objectAssign({}, meta.attributes, {
    body,
    toc
  })
  this.value = result
  return `module.exports = ${JSON.stringify(result)}`
}
