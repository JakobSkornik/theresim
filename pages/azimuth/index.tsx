class Azimuth {
    constructor() {
      /* Constants */
      this.TEXTSIZE = 32
      this.PADDING = 30
  
      /* Vars */
      this.leftBox = [
        this.PADDING,
        windowWidth / 2 - this.PADDING,
        windowHeight / 8 + this.PADDING,
        windowHeight - this.PADDING,
      ]
      this.rightBox = [
        windowWidth / 2 + this.PADDING,
        windowWidth - this.PADDING,
        windowHeight / 8 + this.PADDING,
        windowHeight - this.PADDING,
      ]
      this.scaleX = (this.rightBox[1] - this.rightBox[0]) / windowWidth
      this.scaleY = (this.rightBox[3] - this.rightBox[2]) / windowHeight
  
      let dx = this.leftBox[1] - this.leftBox[0]
      let dy = this.leftBox[3] - this.leftBox[2]
      this.radius = dx < dy ? dx - this.PADDING : dy - this.PADDING
      this.azX = (this.leftBox[0] + this.leftBox[1]) / 2
      this.azY = (this.leftBox[2] + this.leftBox[3]) / 2
    }
  
    draw = () => {
      this.drawUI()
  
      if (rightHand.length) {
        this.drawAzimuthLine()
        drawHand(rightHand, ORANGE(), this.rightBox)
      }
    }
  
    resize = () => {
      this.leftBox = [
        this.PADDING,
        windowWidth / 2 - this.PADDING,
        windowHeight / 8 + this.PADDING,
        windowHeight - this.PADDING,
      ]
      this.rightBox = [
        windowWidth / 2,
        windowWidth - this.PADDING,
        windowHeight / 8 + this.PADDING,
        windowHeight - this.PADDING,
      ]
      this.scaleX = (this.rightBox[1] - this.rightBox[0]) / windowWidth
      this.scaleY = (this.rightBox[3] - this.rightBox[2]) / windowHeight
      this.radius = this.leftBox[1] - this.leftBox[0] - this.PADDING
      this.azX = (this.leftBox[0] + this.leftBox[1]) / 2
      this.azY = (this.leftBox[2] + this.leftBox[3]) / 2
    }
  
    drawUI = () => {
      // Left box
      view.fill(BLACK(5))
      view.stroke(BLACK(30))
      view.strokeWeight(1)
      view.rect(
        this.leftBox[0],
        this.leftBox[2],
        this.leftBox[1] - this.leftBox[0],
        this.leftBox[3] - this.leftBox[2],
        20,
      )
  
      // Azimuth anchor
      view.fill(BLACK())
      view.stroke(BLACK())
      view.strokeWeight(10)
      view.circle(this.azX, this.azY, 0)
  
      // Compass
      view.fill(BLACK(5))
      view.stroke(BLACK(20))
      view.strokeWeight(15)
      view.circle(this.azX, this.azY, this.radius)
      view.line(this.azX, this.azY, this.azX, this.azY - this.radius / 2)
  
      // Right box
      view.fill(BLACK(5))
      view.stroke(BLACK(30))
      view.strokeWeight(1)
      view.rect(
        this.rightBox[0],
        this.rightBox[2],
        this.rightBox[1] - this.rightBox[0],
        this.rightBox[3] - this.rightBox[2],
        20,
      )
    }
  
    drawAzimuthLine = () => {
      const palmIdx = 0
      const midIdx = 9
  
      const palmX =
        rightHand[palmIdx].x * view.width * this.scaleX + this.rightBox[0]
      const palmY =
        rightHand[palmIdx].y * view.height * this.scaleY + this.rightBox[2]
      const midX =
        rightHand[midIdx].x * view.width * this.scaleX + this.rightBox[0]
      const midY =
        rightHand[midIdx].y * view.height * this.scaleY + this.rightBox[2]
  
      // Normalized and translated azimuth
      let dx = midX - palmX
      let dy = midY - palmY
      let dist = Math.sqrt(dx * dx + dy * dy)
      let ux = dx / dist
      let uy = dy / dist
      let dx2 = this.azX - palmX
      let dy2 = this.azY - palmY
      let x2 = palmX + ux * this.radius / 2 + dx2
      let y2 = palmY + uy * this.radius / 2 + dy2
      view.fill(GREEN())
      view.stroke(GREEN())
      view.strokeWeight(8)
      view.line(this.azX, this.azY, x2, y2)
    }
  
    drawCompass = () => {}
  }
  