import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Form from '../components/form'

const IndexPage = () =>
  <Layout>
    <h1>Онлайн калькулятор растаможки</h1>
    <p>
      Для подсчета стоимости растаможки автомобиля в Украине 2019 укажите параметры авто.
    </p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Form />    
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>

export default IndexPage
