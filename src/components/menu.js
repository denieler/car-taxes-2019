import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'gatsby'

const MenuComponent = ({ page }) => 
  <Menu pointing secondary>
    <Menu.Item name='home' active={page === 'home'}>
        <Link to='/' style={{ color: 'rgba(0,0,0,.95)' }}>Главная</Link>
    </Menu.Item>

    <Menu.Item name='documents' active={page === 'documents'}>
        <Link to='/documents' style={{ color: 'rgba(0,0,0,.95)' }}>Документы</Link>
    </Menu.Item>

    <Menu.Item name='blog' active={page === 'blog'}>
        <Link to='/blog' style={{ color: 'rgba(0,0,0,.95)' }}>Как растаможить</Link>
    </Menu.Item>
  </Menu>

export default MenuComponent