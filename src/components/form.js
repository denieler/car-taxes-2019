import React  from 'react'
import { Input, Dropdown, Button, Form, Segment, Statistic } from 'semantic-ui-react'

import Image from './image'

const TYPES = [
  { value: 'passenger', text: 'легковой' },
  // { value: 'moto', text: 'мото' },
  // { value: 'truck', text: 'грузовой' },
  // { value: 'bus', text: 'автобус' },
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

const DISCOUNT = [
  { value: 0, text: 'Обычный' },
  { value: 1, text: '50% скидка, первые 2 месяца действия закона' },
  { value: 2, text: '25% скидка, в 3-ий месяц действия закона' },
]

const saveToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value)
}
const getFromLocalStorage = (key) => {
  const value = window.localStorage.getItem(key)
  if (value === null) {
    return null
  }

  const floatValue = Number.parseFloat(value)

  return Number.isNaN(floatValue) ? value : floatValue
}

export default class CalculationForm extends React.Component {
  state = {
    type: 'passenger',
    engineType: 'gasoline',
    engineVolume: 1500,
    year: 2019,
    price: 4500,
    discounted: 0,

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

    const type = getFromLocalStorage('type')
    const engineType = getFromLocalStorage('engineType')
    const engineVolume = getFromLocalStorage('engineVolume')
    const year = getFromLocalStorage('year')
    const price = getFromLocalStorage('price')
    const discounted = getFromLocalStorage('discounted')

    let loadedState = {}
    type && (loadedState = {...loadedState, type})
    engineType && (loadedState = {...loadedState, engineType})
    engineVolume && (loadedState = {...loadedState, engineVolume})
    year && (loadedState = {...loadedState, year})
    price && (loadedState = {...loadedState, price})
    discounted && (loadedState = {...loadedState, discounted})

    this.state = {
      ...this.state,
      ...loadedState
    }
  }
  
  calculate = () => {
    let {
      type,
      engineType,
      engineVolume,
      year,
      price,
      discounted
    } = this.state

    saveToLocalStorage('type', type)
    saveToLocalStorage('engineType', engineType)
    saveToLocalStorage('engineVolume', engineVolume)
    saveToLocalStorage('year', year)
    saveToLocalStorage('price', price)
    saveToLocalStorage('discounted', discounted)

    year = 2019 - year + 1
    if (year > 15) {
      year = 15
    }

    let engineRatio = 0
    if (engineType === 'gasoline' && engineVolume < 3000) {
      engineRatio = 50
    } else if (engineType === 'gasoline' && engineVolume >= 3000) {
      engineRatio = 100
    } else if (engineType === 'diesel' && engineVolume < 3500) {
      engineRatio = 75
    } else if (engineType === 'diesel' && engineVolume >= 3500) {
      engineRatio = 150
    }  

    if (discounted === 1) {
      engineRatio = engineRatio * 0.5
    } else if (discounted === 2) {
      engineRatio = engineRatio * 0.75
    }

    const sbor = engineType === 'electro'
      ? 109 // 109.129 EUR за 1 электро двигатель
      : engineRatio * year * engineVolume / 1000
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
    const discounted = this.useFormField('discounted')

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

          <Form.Field>
            <label>Понижающий коэффициент</label>
            <Dropdown {...discounted} fluid selection options={DISCOUNT} />
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
          <div>
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

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image />
            </div>
          </div>
        }
      </>
    )
  }
}
