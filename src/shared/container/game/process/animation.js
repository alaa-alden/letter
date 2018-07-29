  const animation = (Circles, Stage, currentRadius) => {
      for (let i = 0; i < Circles.length; i++) {
          // update radius for circles
          Circles[i].radius = (Stage.height() + Stage.width()) / 60
          Circles[i].fontSize = (Stage.height() + Stage.width()) / 45
          // kill for it arrive last moment
          if (Circles[i].LastMoments === 50)
              Circles.splice(i, 1)
          else {
              if (Circles[i].LastMoments !== 0) {
                  Circles[i].LastMoments++
                Circles[i].radius = currentRadius + (Circles[i].LastMoments/5)
              }
              // kill for it arrive last board
              if (Circles[i].CX - Circles[i].radius <= 0)
                  Circles.splice(i, 1)
              // code for check if chatch
              // Circles[i].show=0
              else {
                  // check if y equal boarder play gound game
                  if (!Circles[i].LastMoments &&(Circles[i].CY + Circles[i].radius >= Stage.height() || Circles[i].CY - Circles[i].radius <= 0))
                      Circles[i].SpeedY = -Circles[i].SpeedY
                  // for Circles
                  // console.log(`${i}: ${Circles[i].CY}`)
                  Circles[i].CX -= Circles[i].SpeedX
                  Circles[i].CY += Circles[i].SpeedY

                  // for letters
                  Circles[i].LX -= Circles[i].SpeedX
                  Circles[i].LY += Circles[i].SpeedY

              }
          }
      }
      return Circles
  }
  export default animation
