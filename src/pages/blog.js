import React from 'react'

import Layout from '../components/layout'
import Menu from '../components/menu'

const BlogPage = () => (
  <Layout>
    <Menu page='blog' />
    <h1>Руководство как растаможить авто в Украине</h1>
    <p>
        Руководство на основании личного опыта, факты, необходимые 
        документы, адреса, инстанции, все по шагам.
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.4, marginTop: '2rem' }}>
        Еще нет публикаций
    </div>
  </Layout>
)

export default BlogPage
