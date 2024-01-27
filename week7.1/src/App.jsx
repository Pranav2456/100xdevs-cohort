import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, {Suspense} from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const Landing = React.lazy(() => import('./components/Landiing'))

function App() {
 return (
  <>
  <BrowserRouter>
  <Appbar/>
  <Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path ="/dashboard" element = {<Dashboard/>} />
    <Route path ="/" element = {<Landing/>} />
  </Routes>
  </Suspense>
  </BrowserRouter>

  </>
 )
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <>
  <button onClick = {() => {
    navigate("/");
  }}>
    Landing Page
  </button>
  <button onClick = {() => {
    navigate("/dashboard");
  }}> Dashboard</button>
  </>
)
}



export default App
