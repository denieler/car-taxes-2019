import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <Menu pointing secondary>
      <Menu.Item name='home' active={false}>
        <Link to='/' style={{ color: 'rgba(0,0,0,.95)' }}>Главная</Link>
      </Menu.Item>

      <Menu.Item name='documents' active={true}>
        <Link to='/documents' style={{ color: 'rgba(0,0,0,.95)' }}>Документы</Link>
      </Menu.Item>
    </Menu>
    <h1>Документы по растаможке авто в Украине 2019</h1>
    <p>
      Здесь собраны все наиболее важные документы по растаможке авто, которые касаются 
      стоимости ввоза и оплаты налогов и сборов в 2019 году. Все документы исключительно 
      официальные документы, законы, которые обязательны к исполнению или в процессе принятия.
    </p>
    <div style={{ margin: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <a style={{ margin: '1rem' }} href='http://w1.c1.rada.gov.ua/pls/zweb2/webproc4_1?pf3511=64235'>
        Законопроект 8487, Проект Закону про внесення змін до Податкового кодексу України 
        щодо оподаткування акцизним податком легкових транспортних засобів
      </a>
      <a style={{ margin: '1rem' }} href='http://w1.c1.rada.gov.ua/pls/zweb2/webproc4_1?pf3511=64236'>
        Законопроект 8488, Проект Закону про внесення змін до Митного кодексу України 
        та деяких законодавчих актів України щодо ввезення транспортних засобів на 
        митну територію України
      </a>
    </div>
  </Layout>
)

export default SecondPage
