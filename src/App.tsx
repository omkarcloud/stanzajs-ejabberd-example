import React, { useEffect, useState } from 'react'
import './App.css'
import { pubsubExample } from './xmpp/pub.sub/pub.sub.example'


function App() {
  // Spin of pubsub example 
  pubsubExample()
  return (
    <div className="App">
      <h1>Hello PubSub</h1>
      <h2>See console.log for the magic</h2>
    </div>
  )
}

export default App
