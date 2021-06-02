import React, { NODE_TYPE } from './react.js'
const app = document.getElementById('app')
React.render(<div className="container" items={[1,2,3,5]}>
    <div className="header">test react</div>
    <div className="content">
      <span>body</span>
    </div>
  </div>, app)