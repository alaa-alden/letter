/* import {
  distance,
  randomIndex,
  randomIntFromRange,
  IntervalTimer
} from './function' */
const Process = () => {
  // defind variable
  /*
  let
    chars = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ا', 'إ', 'آ', 'ؤ', 'ئ', 'ء'],
    IY = [25, 15, 15, 15, 5, 5, 8, 15, 20, 8, 10, 12, 15, 10, 10, 20, 20, 8, 10, 20, 12, 18, 17, 5, 10, 15, 8, 8, 15, 15, 20, 8, 10, 10],
    DX = [0, 3, 2, 2, -1, -1, -1, 3, 3, 5, 5, 2, 2, 2, 2, 0, 0, -2, -2, 3, 3, 3, 3, 2, 3, 0, 3, 0, 0, 0, 0, 2, 0, 0],
    letters, Counterletters = 0,
    CounterError = 0,
    CounterLeft = 0,
    speed = 2,
    devspeed = 0.5,
    MaxNumberLetter = 100,
    step,
    win = true,
    colorLive = '#0999e8',
    colorDead = '#F01A30',
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
    cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
  // end defind variable
  */
  const canvas = this.refs.canvas
  const canvasDraw = canvas.getContext('2d')

  function test() {
    for (let i = 0; i < 25; i++) {
      // draw circle
      canvasDraw.beginPath()
      canvasDraw.arc(50, 50, 20, 0, Math.PI * 2, false)
      canvasDraw.fillStyle = 'black'
      canvasDraw.fill()
      canvasDraw.closePath()
      // draw letter inside circle
      canvasDraw.font = '20px arial'
      canvasDraw.textAlign = 'center'
      canvasDraw.fillStyle = 'white'
      canvasDraw.fillText('ض', 50, 50)
    }
  }
  test()
  /*
  // defind class Letter
  class Letter {
    constructor(time, show, velocity, x, y, radius, colorCircle, letter, xLetter, yLetter, colorLetter) {
      this.time = time
      this.show = show
      this.x = x
      this.y = y
      this.velocity = velocity
      this.radius = radius
      this.colorCircle = colorCircle
      this.mass = 1
      this.letter = letter
      this.xLetter = xLetter
      this.yLetter = yLetter
      this.colorLetter = colorLetter
      this.update = this.update.bind(this)
      this.draw = this.draw.bind(this)

    }
    update(Radius) {
      // for change size when change screen's size
      if (this.time)
        this.radius = Radius + (this.time * Radius / 120) // big letter when caught it
      else this.radius = Radius
      // check if letter arrive top or down screen
      if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height)
        this.velocity.y = -this.velocity.y
      // change coordinate for circle center
      this.x += this.velocity.x
      this.y += this.velocity.y
      // change coordinate for letter
      this.xLetter += this.velocity.x
      this.yLetter += this.velocity.y
      // redraw letter
      this.draw()

    }
    draw() {
      // draw circle
      canvasDraw.beginPath()
      canvasDraw.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      canvasDraw.fillStyle = this.colorCircle
      canvasDraw.fill()
      canvasDraw.closePath()
      // draw letter inside circle
      canvasDraw.font = `${(canvas.height + canvas.width) / 45}px arial`
      canvasDraw.textAlign = 'center'
      canvasDraw.fillStyle = this.colorLetter
      canvasDraw.fillText(this.letter, this.xLetter, this.yLetter)
    }
  }
  let go = false
  // function initialization the game
  function init() {
    // initialization letters as array
    letters = []
    // call animaltion letter
    processGame()
    window.onblur = function () {
      // stop create letter
      createLetter.pause()
      // stop redraw gaem space
      cancelAnimationFrame(step)
      go = true;
    }
  }
  window.onfocus = () => {
    if (go) {
      requestAnimationFrame(processGame)
      createLetter.resume()
      go = false
    }
  }
  // Animation Loop , this animation letter by update fun of letters
  function processGame() {
    // clear canvas for new draw,when update coordinate letters or not show some letters
    canvasDraw.clearRect(0, 0, canvas.width, canvas.height)
    if (Counterletters == MaxNumberLetter) { //win
      // stop create letter
      createLetter.pause()
      win = true
      // check if create all letters and all letters caught
      letters.forEach((letter) => {
        if (letter.show && letter.colorCircle == colorLive || letter.time < 25) win = false
      })
      if (win) {
        canvasDraw.font = `${(canvas.height + canvas.width) / 30}px arial`
        canvasDraw.textAlign = 'center'
        canvasDraw.fillStyle = 'black'
        canvasDraw.fillText('you have won in our Game', canvas.width / 2, canvas.height / 2)
        // stop create letter
        createLetter.pause()
        // stop redraw game space
        cancelAnimationFrame(step)
        return 0
      }
    }
    // check if five letters arrive to canvas's left wihtout catching them
    if (CounterLeft >= 5) {
      // write lose phrase
      canvasDraw.font = `${(canvas.height + canvas.width) / 30}px arial`
      canvasDraw.textAlign = 'center'
      canvasDraw.fillStyle = 'black'
      canvasDraw.fillText('good luck in the future', canvas.width / 2, canvas.height / 2)
      // stop create letter
      createLetter.pause()
      // stop redraw gaem space
      cancelAnimationFrame(step)
    }
    //else coutinue with Game
    else {
      // update radius letters for change size screen ,.....
      let radius = (canvas.height + canvas.width) / 60
      // press in letters
      letters.forEach(letter => {
        //update or  catch one of letters , start it big then not show
        if (letter.show) {
          // check if letter arrive to scanner left
          if (letter.show // letter is live and it without caught
            &&
            letter.colorCircle == colorLive // not catch
            &&
            letter.x - letter.radius < 0 //arrive left
          ) {
            CounterLeft++ // increase counter
            letter.show = false //hide the letter
          }
          // process when letter dead
          if (letter.colorCircle == colorDead) {
            letter.time++ //change time to death
          }

          if (letter.time == 25) // it's time to death
            letter.show = false
          else // except update the letter -it's maybe live or about to die- ,and  press radius for chang size
            letter.update(radius)
        }
      })
    }
    // call function is responsible for call processGame 60 times per second
    step = requestAnimationFrame(processGame)
  }
  let createLetterPerSecond = 1
  // create letter each 1 second
  var createLetter = new IntervalTimer(() => {
    let EndLetter = Counterletters //for not check whole letters if they are same y-coordinate , only new letters and they have same x-coordinate
    for (let i = 0; i < createLetterPerSecond; i++) {
      // creater properties for new letter
      let velocity = {
          x: -speed,
          y: (Math.random() - 0.5) * 3
        } // specify speed letter in game space
        ,
        radius = (canvas.height + canvas.width) / 60,
        x = randomIntFromRange(canvas.width + 10, canvas.width + 100),
        y = randomIntFromRange(radius, canvas.height - radius),
        indexChar = randomIndex(chars),
        yI = IY[indexChar],
        xD = DX[indexChar],
        time = 0,
        show = true
      // check if any letter of array and new letter are same place for y-coordinate //fix j
      for (let j = EndLetter; j < letters.length; j++) {
        if (distance(x, y, letters[j].x, letters[j].y) - radius * 2 < 0) {
          y = randomIntFromRange(radius, canvas.height - radius),
            j = -1 // for back to start loop when update
        }
      }
      letters.push(new Letter(time, show, velocity, x, y, radius, colorLive, chars[indexChar], x - xD, y + yI, 'white'))
      // increase counter letters
      Counterletters++
    }
  }, 1000)
  //  call initialization function
  init()


  // check if key is same  any letter in screen
  addEventListener('keydown', function (event) {
    let check = false
    for (let i in letters) {
      if (event.key == letters[i].letter && letters[i].show) {
        letters[i].colorCircle = colorDead // dead letter when catch
        check = true
      }
    }
    // if the compressed key is not inside screen
    if (!check) CounterError++

  }) */
}
export default Process
