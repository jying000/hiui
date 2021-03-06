const docs = {}
const files = require.context(`../../../docs/zh-CN/docs`, false, /.mdx$/)
files.keys().forEach((key) => {
  const _key = key.split('/')[1].split('.')[0]
  docs[_key] = files(key).default
})
export default {
  components: {
    'community-recommended': {
      'code-editor': docs['code-editor']
    }
  },
  documents: {
    'quick-start': docs['quick-start'],
    'upgrade-from-2x': docs['upgrade-from-2x'],
    theme: docs.theme,
    palette: docs.palette,
    i18n: docs.i18n,
    changelog: docs.changelog,
    'hi-request': docs['hi-request']
    // 'code-editor': docs['code-editor']
  }
}
