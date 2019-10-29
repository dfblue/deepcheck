import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, { useState, useEffect } from 'react'
import browser from 'webextension-polyfill'

const ClientId = (props) => {
  const [id, setId] = useState('')

  useEffect(() => {
    const getId = async () => {
      const { id } = await browser.management.getSelf()
      setId(id)
    }
    getId()
  })

  return (
    <>
      Client ID: {id}
    </>
  )
}

export default ClientId
