import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import { store, persistor } from '../store'
import Navbar from '../components/Navbar'
import Game from '../containers/Game'
import ActCellKb from '../containers/ActCellKb'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
        />
        <Navbar />
        <Game />
        <ActCellKb />
      </PersistGate>
    </Provider>
  )
}

export default App
