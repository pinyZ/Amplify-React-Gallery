import React from 'react'
import ReactDOM from 'react-dom/client'
import {Amplify} from 'aws-amplify';
import aws_exports from './aws-exports.ts';
import './index.css'
import App from './App.tsx'


Amplify.configure(aws_exports);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
