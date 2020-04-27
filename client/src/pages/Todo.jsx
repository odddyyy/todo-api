import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


export default function Todo() {
    const history = useHistory()
    const user = useSelector(state => state.user)
    if (!user.loggedIn) history.push('/')
    return (
        <div>
            INI TODO PAGE
        </div>
    )
}
