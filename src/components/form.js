import React  from 'react'
import Image from './image'

export default class Form extends React.Component {
  state = {
    type: 'passenger',
    engineType: 'gasoline',
    engineVolume: 1500,
    year: 2019,
    price: 4500
  }

  constructor () {
    super()

    this.handleCalculateClick = this.handleCalculateClick.bind(this)
  }
  
  handleCalculateClick = () => {
    console.log(
      'Calculation:',
      this.state
    )
  }

  useFormField (propName) {
    return {
      value: this.state[propName],
      onChange: e => {
        const parsedFloat = Number.parseFloat(e.target.value)
        this.setState({
          [propName]: Number.isNaN(parsedFloat) ? e.target.value : parsedFloat
        })
      }
    }
  } 

  render () {
    const type = this.useFormField('type')
    const engineType = this.useFormField('engineType')
    const engineVolume = this.useFormField('engineVolume')
    const year = this.useFormField('year')
    const price = this.useFormField('price')

    return (
      <>
        <div>
          <label>Тип транспорта:</label>
          <select {...type}>
          <option value='passenger'>легковой</option>
          <option value='moto'>мото</option>
          <option value='truck'>грузовой</option>
          <option value='bus'>автобус</option>
          </select>
        </div>

        <div>
          <label>Двигатель:</label>
          <select {...engineType}>
          <option value='gasoline'>бензин</option>
          <option value='diesel'>дизель</option>
          <option value='electro'>электро</option>
          </select>
        </div>

        <div>
          <label>Объем двигателя:</label>
          <input placeholder='1500' type='number' {...engineVolume}/>
          <span>см<sup>3</sup></span>
        </div>

        <div>
          <label>Год выпуска авто:</label>
          <select {...year}>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
            <option>2016</option>
            <option>2015</option>
            <option>2014</option>
            <option>2013</option>
            <option>2012</option>
            <option>2011</option>
            <option>2010</option>
            <option>2009</option>
            <option>2008</option>
            <option>2007</option>
            <option>2006</option>
            <option>2005</option>
            <option>2004</option>
            <option>2003</option>
            <option>2002</option>
            <option>2001</option>
            <option>2000</option>
            <option>1999</option>
            <option>1998</option>
            <option>1997</option>
          </select>
        </div>

        <div>
          <label>Стоимость за рубежем:</label>
          <input placeholder='4500' type='number' {...price}/>
          <span>EUR</span>
        </div>

        <button onClick={this.handleCalculateClick}>Рассчитать</button>

        <Image />
      </>
    )
  }
}
