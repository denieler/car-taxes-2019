import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Form from '../components/form'

const IndexPage = () =>
  <Layout>
    <Menu pointing secondary>
      <Menu.Item name='home' active={true}>
        <Link to='/' style={{ color: 'rgba(0,0,0,.95)' }}>Главная</Link>
      </Menu.Item>

      <Menu.Item name='documents' active={false}>
        <Link to='/documents' style={{ color: 'rgba(0,0,0,.95)' }}>Документы</Link>
      </Menu.Item>
    </Menu>
    <h1>Онлайн калькулятор растаможки авто в Украине 2019</h1>
    <p>
      Для подсчета стоимости растаможки автомобиля в Украине 2019 укажите параметры авто.
    </p>
    <div style={{ margin: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Form style={{ width: '500px' }}/>    
    </div>
  </Layout>

export default IndexPage
