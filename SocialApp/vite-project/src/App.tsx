import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRoutes'
import { Toast } from '@heroui/react'

function App() {

  return (
    <>
      <Toast.Provider placement="top" />
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
