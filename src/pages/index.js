import React from 'react'

import Layout from '../components/layout'
import Form from '../components/form'

const IndexPage = () =>
  <Layout>
    <h1>Онлайн калькулятор растаможки</h1>
    <p>
      Для подсчета стоимости растаможки автомобиля в Украине 2019 укажите параметры авто.
    </p>
    <div style={{ margin: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Form style={{ width: '500px' }}/>    
    </div>
  </Layout>

export default IndexPage
