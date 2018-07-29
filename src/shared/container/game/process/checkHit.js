const colorDead = '#F01A30'
const checkHit = (Circles) => {
    // if(Circles[0])
    // console.log(Circles[0].letter)
    // check if key is same  any letter in screen
  window.addEventListener('keydown', function (event) {
        // let check = false
    for (let i = 0; i < Circles.length; i++) {
      if (event.key === Circles[i].letter && !Circles[i].LastMoments) {
                // letters[i].colorCircle = colorDead // dead letter when catch
                // check = true
                // Circles.splice(i,1)
        Circles[i].LastMoments = 1, Circles[i].Color = colorDead
      }
    }
  }
    )
  return Circles
}

export default checkHit
        // if the compressed key is not inside screen
        // if (!check) CounterError++
