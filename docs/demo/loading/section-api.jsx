import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Button from '../../../components/button'
import Card from '../../../components/card'
import Loading from '../../../components/loading'
const prefix = 'loading-api'
const code = `import React from 'react'
import Button from '@hi-ui/hiui/es/button'
import Panel from '@hi-ui/hiui/es/panel'
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
    this.el = null
  }

  demoEvent1 () {
    Loading.open(null, { duration: 3000 })
  }
  demoEvent2 () {
    Loading.open(this.el, {
      content: '加载中',
      key: 666
    })
    setTimeout(() => {
      Loading.close(666)
    }, 3000)
  }
  render () {
    return <div>
      <Button type="primary" onClick={this.demoEvent1.bind(this)}>整页，3秒后关闭</Button>
      <Button type="primary" onClick={this.demoEvent2.bind(this)}>指定目标，3秒后关闭</Button>
      <div ref={(el) => {this.el = el}} style={{margin: 20}}>
        <Card
          title={
            <div>
              <i className="hi-icon icon-user" style={{marginRight: '5px'}}></i>
              我是标题
            </div>
          }
        >
          <p>Panel content</p>
        </Card>
      </div>
    </div>
  }
}`
const DemoApi = () => <DocViewer code={code} scope={{ Button, Card, Loading }} prefix={prefix} />
export default DemoApi
