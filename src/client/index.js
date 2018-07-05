import React from 'react'
import { hydrate as render } from 'react-dom'
import ClientApp from './clientapp'

render(<ClientApp />,
    document.getElementById('app')
)
