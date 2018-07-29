const responsive = (Stage) => {
  const container = document.querySelector('#Game')
  console.log(container.clientWidth)
  console.log(container.offsetHeight)

  // now we need to fit stage into parent
  const containerWidth = container.offsetWidth
  const containerHeight = container.offsetHeight
  // to do this we need to scale the stage
  const scaleWidth = containerWidth / 400
  const scaleHeight = containerHeight / 400


  Stage.width(containerWidth)
  Stage.height(containerHeight)
  Stage.scale({
    x: scaleWidth,
    y: scaleHeight
  })
  Stage.draw()
  console.log(`change size to : ${Stage.height()}`)
  return Stage
}


export default responsive
