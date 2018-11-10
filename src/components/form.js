import React  from 'react'
import { Input, Dropdown, Button, Form, Segment, Statistic } from 'semantic-ui-react'

import Image from './image'

const TYPES = [
  { value: 'passenger', text: 'легковой' },
  { value: 'moto', text: 'мото' },
  { value: 'truck', text: 'грузовой' },
  { value: 'bus', text: 'автобус' },
]

const ENGINE_TYPES = [
  { value: 'gasoline', text: 'бензин' },
  { value: 'diesel', text: 'дизель' },
  { value: 'electro', text: 'электро' },
]

const YEARS = new Array(23).fill(0).map((_, index) => ({
  value: 2019 - index,
  text: 2019 - index
}))

export default class CalculationForm extends React.Component {
  state = {
    type: 'passenger',
    engineType: 'gasoline',
    engineVolume: 1500,
    year: 2019,
    price: 4500,

    isLoading: false,
    shouldShowAnswer: false,
    result: {
      nds: 0,
      sbor: 0,
      poshlina: 0
    }
  }

  constructor () {
    super()

    this.handleCalculateClick = this.handleCalculateClick.bind(this)
  }
  
  calculate = () => {
    let {
      type,
      engineType,
      engineVolume,
      year,
      price
    } = this.state

    year = 2019 - year + 1
    if (year > 15) {
      year = 15
    }

    let engineRatio = 0
    switch (engineType) {
      case 'gasoline':
        engineRatio = 50
        break
      case 'diesel':
        engineRatio = 75
        break
    }

    const sbor = engineRatio * year * engineVolume / 1000
    let poshlina = price * 0.1 // 10% пошлина
    if (year === 1 && engineVolume >= 3000) {
      poshlina = price * 0.05
    }
    if (type === 'bus' && engineType === 'diesel' && engineVolume >= 5000) {
      poshlina = price * 0.2
    }

    const nds = (price + sbor + poshlina) * 0.2 // 20% НДС
    const result = {
      nds,
      sbor,
      poshlina
    }

    this.setState({ result })
  }

  handleCalculateClick = () => {
    this.setState({ isLoading: true, shouldShowAnswer: false })
    setTimeout(_ => {
      this.calculate()
      this.setState({ isLoading: false, shouldShowAnswer: true })

      document.body.scrollTo(0, 400)
    }, 1000)
  }

  useFormField (propName) {
    return {
      value: this.state[propName],
      onChange: (e, data = null) => {
        const newValue = e.target.value || data.value
        const parsedFloat = Number.parseFloat(newValue)
        this.setState({
          [propName]: Number.isNaN(parsedFloat) ? newValue : parsedFloat
        })
      }
    }
  } 

  render () {
    const { style } = this.props
    const { isLoading, shouldShowAnswer, result } = this.state

    const type = this.useFormField('type')
    const engineType = this.useFormField('engineType')
    const engineVolume = this.useFormField('engineVolume')
    const year = this.useFormField('year')
    const price = this.useFormField('price')

    return (
      <>
        <Form style={style}>
          <Form.Field>
            <label>Тип транспорта</label>
            <Dropdown {...type} fluid selection options={TYPES} />
          </Form.Field>

          <Form.Field>
            <label>Двигатель</label>
            <Dropdown {...engineType} fluid selection options={ENGINE_TYPES} />
          </Form.Field>

          <Form.Field>
            <label>Объем двигателя</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder='1500' type='number' {...engineVolume}/>
              <span style={{ marginLeft: '1rem' }}>см<sup>3</sup></span>
            </div>
          </Form.Field>

          <Form.Field>
            <label>Год выпуска авто</label>
            <Dropdown {...year} fluid selection options={YEARS} />
          </Form.Field>

          <Form.Field>
            <label>Стоимость за рубежем</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder='4500' type='number' {...price}/>
              <span style={{ marginLeft: '1rem' }}>EUR</span>
            </div>
          </Form.Field>

          <Button
            onClick={this.handleCalculateClick}
            content={'Рассчитать'}
            icon='right arrow'
            labelPosition='right'
            loading={isLoading}/>
        </Form>
      
        {
          shouldShowAnswer &&
          <Segment piled padded='very'>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              <Statistic>
                <Statistic.Value>{result.nds} €</Statistic.Value>
                <Statistic.Label>НДС</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>{result.sbor} €</Statistic.Value>
                <Statistic.Label>Акцизный сбор</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>{result.poshlina} €</Statistic.Value>
                <Statistic.Label>Ввозная пошлина</Statistic.Label>
              </Statistic>
            </div>

            <div style={{ textAlign: 'center', margin: '2rem', fontWeight: 'bold', fontSize: '1.3rem' }}>ИТОГО</div>

            <Statistic style={{ display: 'flex', justifyContent: 'center' }}>
                <Statistic.Value>{price.value + result.nds + result.sbor + result.poshlina} €</Statistic.Value>
                <Statistic.Label>Цена авто в Украине</Statistic.Label>
              </Statistic>
          </Segment>
        }

        <Image />
      </>
    )
  }
}
