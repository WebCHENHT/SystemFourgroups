export const htmlEncodeByRegExp = function (str?: any) {
  let s = ''
  if (str.length === 0) {
    return ''
  }
  s = str.replace(/&/g, '&amp;')
  s = s.replace(/</g, '&lt;')
  s = s.replace(/>/g, '&gt;')
  s = s.replace(/ /g, '&nbsp;')
  s = s.replace(/\n/g, '<br>')

  return s
}
//<style>\n  html,body{\n   font-size: 50px;\n  }\n  #test1{\n   width: 400px;\n   height: 400px;\n   font-size: 20px;\n  }\n  #test2{\n   width: 4em;\n   height: 4em;\n   \n  }\n </style>\n <div id=\"test1\">\n  <div id=\"test2\"></div>\n </div>\n\ntest2的width等于多少个px?
