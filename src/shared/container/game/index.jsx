import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Stage, Layer, Circle, Text } from 'react-konva'
import Konva from 'konva'
import { connect } from 'react-redux'
import style from './style.scss'
// import responsive from './process/responsive';
import animation from './process/animation'
import checkHit from './process/checkHit'
import IntervalTimer from './process/IntervalTimer'
import { randomIndex } from './process/function'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Circles: [],
      killLetters: 0,
      stop: false
    }
    this.WIDTH = 1000
    this.HEIGHT = 1000
    this.SCALE = 1
    this.Stage = React.createRef()
    this.Layer = React.createRef()
  }
  componentDidMount() {
    // for cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this.mounted = true
    // document.getElementById('Game').style.height = document.getElementById('container').style.height.toString() + 'px'
    // console.log('ddfsdfd', document.getElementById('container').clientHeight)
    // console.log(this.Stage.getStage())
    // CONST AND VARIABLE ...................
    const StageConfig = this.Stage.current.getStage()
    const layer = this.Layer.current
    // console.log(layer)
    this.TimeCreateLetter = 1000 * (3 / this.props.level)
    let key = 0
    let currentLetter
    let currentCircleY
    let currentCircleX
    let currentSpeedX
    let currentSpeedY
    let currentRadius = (StageConfig.height() + StageConfig.width()) / 60
    let MaxSpeedX = this.props.level
    let MaxSpeedY = 2
    const chars = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ا', 'إ', 'آ', 'ؤ', 'ئ', 'ء']
    const ALY = [20, 22, 20, 20, 25, 25, 23, 20, 20,
      25, 25, 25, 22, 25, 25, 19, 19, 25, 23, 20, 25, 20, 20, 30,
      25, 20, 25, 30, 20, 20, 20, 25, 25, 22]
    const SLX = [5, 17, 17, 17, 15, 15, 10, 12, 12,
      10, 10, 20, 20, 25, 25, 15, 15, 10, 10, 20, 15, 15, 15, 10,
      15, 10, 15, 15, 5, 5, 5, 15, 15, 10]
    // currentLetter,
    let FontSizeLetter = (StageConfig.height() + StageConfig.width()) / 45
    const colorLive = '#0999e8'
    let opportunities = 5
    // END DEFIND VAR AND CONST

    // for responsive ..................

    // const width = this.WIDTH
    // const height = this.HEIGHT
    const container = document.getElementById('containerGame')
    this.WIDTH = container.clientWidth
    this.HEIGHT = container.clientHeight
    // this.SCALE = Math.min(
    //     this.WIDTH / width,
    //     this.HEIGHT / height
    // );
    // now you may want to make it visible even on small screens
    // we can just scale it
    window.addEventListener('resize', () => {
      const width = this.WIDTH
      const height = this.HEIGHT
      this.WIDTH = container.clientWidth
      this.HEIGHT = container.clientHeight
      this.SCALE = Math.min(
        this.WIDTH / width,
        this.HEIGHT / height
      )
      console.log(this.SCALE)
    })
    let arr = new Array, yy = 1, xx = 0
    for (let i = 0; i < chars.length; i++ , xx += 100) {
      if (i % 8 == 0) yy += 70, xx = 0
      arr.push({
        // for letter
        letter: chars[i],
        LX: 100 + xx - SLX[i],
        LY: 50 + yy - ALY[i],
        fontSize: FontSizeLetter,
        // for circle
        CX: 100 + xx,
        CY: 50 + yy,
        SpeedX: 0,
        SpeedY: 0,
        radius: currentRadius,
        Color: colorLive,
        // id for object
        key: i,
        LastMoments: 0
      })
    }
    this.setState({
      Circles: arr
    })
    setTimeout(() => {
      console.log(this.state.Circles)
    }, 1000);
    // end responsive #######
    // code for create new letter every second..........................
    // this.timerID = new IntervalTimer(() => {
    //   // code runing every TimerCreateLetter
    //   currentLetter = randomIndex(chars.length)
    //   currentCircleX = StageConfig.width() + 50
    //   currentCircleY = (Math.random() * (StageConfig.height() - 100)) + 50
    //   currentSpeedX = MaxSpeedX
    //   currentSpeedY = (MaxSpeedY * Math.random()) + 0.5
    //   // set in state
    //   if (this.mounted)
    //     this.setState({
    //       Circles: [...this.state.Circles, {
    //         // for letter
    //         letter: chars[currentLetter],
    //         LX: currentCircleX - SLX[currentLetter],
    //         LY: currentCircleY - ALY[currentLetter],
    //         fontSize: FontSizeLetter,
    //         // for circle
    //         CX: currentCircleX,
    //         CY: currentCircleY,
    //         SpeedX: currentSpeedX,
    //         SpeedY: currentSpeedY,
    //         radius: currentRadius,
    //         Color: colorLive,
    //         // id for object
    //         key,
    //         LastMoments: 0
    //       }]
    //     })
    //   // increase key
    //   key += 1
    //   // console.log(this.state.Circles)
    // }, this.TimeCreateLetter)
    // // code animation ............................
    // const anim = new Konva.Animation((frame) => {
    //   // update coordinate for letter
    //   let Circles = this.state.Circles
    //   // kill letter when hit it on keyboard
    //   Circles = checkHit(Circles)
    //   // set new letter in
    //   // //for check kill any letter
    //   for (let i = 0; i < Circles.length; i++)
    //     if (!Circles[i].LastMoments && (Circles[i].CX - Circles[i].radius <= 0)) {
    //       this.setState({ killLetters: this.state.killLetters + 1 })
    //       if (opportunities === this.state.killLetters)
    //         this.setState({ stop: true })
    //     }
    //   //
    //   if (this.mounted)
    //     this.setState({
    //       Circles: animation(Circles, StageConfig, (StageConfig.height() + StageConfig.width()) / 60)
    //     })
    //   // end code animation
    // }, layer)

    // anim.start()

    // // BLUR AND FOCUS ....................................
    // window.onblur = () => {
    //   // stop create letter
    //   this.timerID.pause()
    //   this.hardLevel.pause()
    //   // stop redraw game space
    //   anim.stop()
    // }
    // window.onfocus = () => {
    //   this.timerID.resume()
    //   this.hardLevel.resume()
    //   anim.start()
    // }
    // if (this.state.stop) {
    //   anim.stop()
    //   this.hardLevel.pause()
    //   this.timerID.pause()
    // }
    // this.hardLevel = new IntervalTimer(() => {
    //   this.TimeCreateLetter /= 2
    //   if (this.TimeCreateLetter < 500) this.TimeCreateLetter = 1000 * (3 / this.props.level)
    //   this.timerID.changeInterval(this.TimeCreateLetter)
    // }, 100000 / this.props.level)
  }
  componentWillUnmount() {
    // for stop create letter
    // this.timerID.pause()
    //  cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this.mounted = false
  }
  render() {
    // code for show in page , it isn't need this class
    if (this.state.stop) return (
      <div>
        <h1>Game Over</h1>
        <Link to='/'> back to Home </Link>
      </div>
    )
    else return (
      <div id="Game" className={style.Game} >
        <div id="containerGame" className={style.container} >
          <Stage ref={this.Stage} width={this.WIDTH} height={this.HEIGHT} scale={this.SCALE} className="Stage" >
            <Layer ref={this.Layer}>
              {
                this.state.Circles.map(circle =>
                  <Circle
                    x={circle.CX}
                    y={circle.CY}
                    radius={circle.radius}
                    fill={circle.Color}
                    // name={circle.key.toString()}
                    key={circle.key}
                    ref={circle.key}
                  />
                )}
              {this.state.Circles.map(circle =>
                <Text
                  x={circle.LX}
                  y={circle.LY}
                  text={circle.letter}
                  fill="white"
                  fontSize={circle.fontSize}
                  fontStyle="bold"
                  key={circle.key}
                  ref={circle.key}
                  // name={circle.key.toString()}
                  align="center"
                />

              )
              }
            </Layer>
          </Stage>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  level: state.reducerGame.level
})
// const mapDispatchToProps=dispatch=>{

// }
export default connect(
  mapStateToProps
  // ,mapDispatchToProps
)(Game)
/*
let arr=new Array,yy=1,xx=0
    for(let i=0;i<chars.length;i++,xx+=100){
      if(i%8==0)yy+=70,xx=0
    arr.push({
        // for letter
        letter: chars[i],
        LX: 100+xx - SLX[i],
        LY: 50+yy -ALY[i],
        fontSize: FontSizeLetter,
        // for circle
        CX: 100+xx,
        CY: 50+yy,
        SpeedX: 0,
        SpeedY: 0,
        radius: currentRadius,
        Color: colorLive,
        // id for object
        key:i,
        LastMoments: 0
      })
  }
  this.setState({
    Circles:arr
  })
  setTimeout(() => {
    console.log(this.state.Circles)
  }, 1000);

 */
