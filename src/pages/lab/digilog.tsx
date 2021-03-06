import { Header } from '@components/header'
import { Face } from '@components/lab'
import { LabTemplate } from '@templates/lab'
import React from 'react'
import styled from 'styled-components'

const ANGLE_OFFSET = 90
const TOTAL_MINUTES = 60

interface DigilogProps {}

interface DigilogState {
  isDigital: boolean
  time: number[]
  hours: number
  minutes: number
}

const DigilogBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 2em;
`

export default class Digilog extends React.Component<DigilogProps, DigilogState> {
  private timer = 0

  state = {
    isDigital: true,
    time: [0, 0, 0, 0, 0, 0],
    hours: 0,
    minutes: 0
  }

  componentDidMount() {
    this.tick()
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick = (): void => {
    const date = new Date()
    if (this.state.isDigital) {
      let time: number[] = []
      const digits = [date.getHours(), date.getMinutes(), date.getSeconds()]
      digits.forEach((i) => {
        time = time.concat(
          i
            .toString()
            .padStart(2, '0')
            .split('')
            .map((i) => +i)
        )
      })
      this.setState({ time })
    } else {
      const h = date.getHours()
      const m = date.getMinutes()
      const hours = 0.5 * (TOTAL_MINUTES * h + m) - ANGLE_OFFSET
      const minutes = 6 * m - ANGLE_OFFSET
      this.setState({ hours, minutes })
    }
  }

  switchMode = (): void => {
    const isDigital = !this.state.isDigital
    this.setState({ isDigital })
  }

  render() {
    return (
      <LabTemplate>
        <Header headerText="Digilog" logoSize={25} />
        <DigilogBox onClick={this.switchMode.bind(this)}>
          {this.state.time.map((digit, key) => (
            <Face
              isDigital={this.state.isDigital}
              val={digit}
              hours={this.state.hours}
              minutes={this.state.minutes}
              key={key}
            />
          ))}
        </DigilogBox>
      </LabTemplate>
    )
  }
}
