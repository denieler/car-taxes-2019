import React from 'react'
import { Link } from 'gatsby'
import ImageLogo from './imageLogo'

const Header = () => (
  <div
    style={{
      background: '#F3CD59',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Link
        to='/'
        style={{
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        tabIndex={-1}
      >
        <svg viewBox='0 0 80 80' fill='white' height='100px'>
          <circle r='40' cx='40' cy='40' />
        </svg>
        <ImageLogo />
      </Link>
    </div>
  </div>
)

export default Header
