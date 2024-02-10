import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import OTPProvider from './store/OTPProvider.jsx'
import DataPassProvider from './store/DataPassProvider.jsx'

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <OTPProvider>
        <DataPassProvider>
          <App />
        </DataPassProvider>
      </OTPProvider>
    </BrowserRouter>
  )
