let webAudioPeakMeter = (function () {
  'use strict'
  let options = {
    borderSize: 2,
    fontSize: 10,
    backgroundColor: '#25354a',
    tickColor: '#90A4AE',
    gradient: [
      '#90A4AE 1%', // #ACAE00
      '#90A4AE 16%',
      '#90A4AE 45%',
      '#90A4AE 100%'],
    dbTickSize: 6,
    maskTransition: '0.06s',
    barFallDelay: 40,
    maxDBValue: 0,
    minDBValue: -40,
    dbScale: 0,
    peakDataLeft: -24,
    peakDataRight: -24,
    peakL: 0.0,
    peakR: 0.0
  }
  let requestAnimationId
  let tickWidth
  let elementWidth
  let elementHeight
  let meterHeight
  let meterWidth
  let meterTop
  let vertical = false
  let channelCount = 2
  let channelMasks = []
  let channelPeaks = []
  let channelPeakLabels = []
  let maskSizes = []
  let textLabels = []
  let meterNode

  let getBaseLog = function (x, y) {
    return Math.log(y) / Math.log(x)
  }

  let dbFromFloat = function (floatVal) {
    return getBaseLog(10, floatVal) * 20
  }

  let setOptions = function (userOptions) {
    for (let k in userOptions) {
      if (userOptions.hasOwnProperty(k)) {
        options[k] = userOptions[k]
      }
    }
    tickWidth = options.fontSize * 2.0
    meterTop = options.fontSize * 1.5 + options.borderSize
  }

  let createMeterNode = function (sourceNode, audioCtx) {
    let c = channelCount
    meterNode = audioCtx.createScriptProcessor(256, c, c)
    sourceNode.connect(meterNode)
    meterNode.connect(audioCtx.destination)
    return meterNode
  }

  let createContainerDiv = function (parent) {
    let meterElement = document.createElement('div')
    meterElement.style.position = 'relative'
    meterElement.style.width = elementWidth + 'px'
    meterElement.style.height = elementHeight + 'px'
    meterElement.style.backgroundColor = options.backgroundColor
    parent.appendChild(meterElement)
    return meterElement
  }

  let createMeter = function (domElement, meterNode, optionsOverrides) {
    setOptions(options)
    elementWidth = domElement.clientWidth
    elementHeight = domElement.clientHeight
    let meterElement = createContainerDiv(domElement)
    if (elementWidth > elementHeight) {
      vertical = false
    }
    meterHeight = elementHeight - meterTop - options.borderSize
    meterWidth = elementWidth - tickWidth - options.borderSize
    createTicks(meterElement)
    createRainbow(meterElement, meterWidth, meterHeight, meterTop, tickWidth)
    // channelCount = meterNode.channelCount
    let channelWidth = meterWidth / channelCount
    if (!vertical) {
      channelWidth = meterHeight / channelCount
    }
    let channelLeft = tickWidth
    if (!vertical) {
      channelLeft = meterTop
    }
    for (let i = 0; i < channelCount; i++) {
      createChannelMask(meterElement, options.borderSize, meterTop, channelLeft, false)
      channelMasks[i] = createChannelMask(meterElement, channelWidth, meterTop, channelLeft, options.maskTransition)
      channelPeaks[i] = 0.0
      channelPeakLabels[i] = createPeakLabel(meterElement, channelWidth, channelLeft)
      channelLeft += channelWidth
      maskSizes[i] = 0
      textLabels[i] = '-∞'
    }
    options.dbScale = options.maxDBValue - options.minDBValue
    // meterNode.onaudioprocess = updateMeter
    meterElement.addEventListener('click', function () {
      for (let i = 0; i < channelCount; i++) {
        channelPeaks[i] = 0.0
        textLabels[i] = '-∞'
      }
    }, false)
    // paintMeter()
  }
  let createTicks = function (parent) {
    let numTicks = Math.floor(options.minDBValue * -1 / options.dbTickSize)
    let dbTickLabel = 0
    if (vertical) {
      let dbTickTop = options.fontSize + options.borderSizenp
      for (let j = 0; j < numTicks; j++) {
        let dbTick = document.createElement('div')
        parent.appendChild(dbTick)
        dbTick.style.width = tickWidth + 'px'
        dbTick.style.textAlign = 'right'
        dbTick.style.color = options.tickColor
        dbTick.style.fontSize = options.fontSize + 'px'
        dbTick.style.position = 'absolute'
        dbTick.style.top = dbTickTop + 'px'
        dbTick.textContent = dbTickLabel + ''
        dbTickLabel -= options.dbTickSize
        dbTickTop += meterHeight / numTicks
      }
    } else {
      tickWidth = meterWidth / numTicks
      let dbTickRight = options.fontSize * 2
      for (let i = 0; i < numTicks; i++) {
        let dbTick = document.createElement('div')
        parent.appendChild(dbTick)
        dbTick.style.width = tickWidth + 'px'
        dbTick.style.textAlign = 'right'
        dbTick.style.color = options.tickColor
        dbTick.style.fontSize = options.fontSize + 'px'
        dbTick.style.position = 'absolute'
        dbTick.style.right = dbTickRight + 'px'
        dbTick.textContent = dbTickLabel + ''
        dbTickLabel -= options.dbTickSize
        dbTickRight += tickWidth
      }
    }
  }

  let createRainbow = function (parent, width, height, top, left) {
    let rainbow = document.createElement('div')
    parent.appendChild(rainbow)
    rainbow.style.width = width + 'px'
    rainbow.style.height = height + 'px'
    rainbow.style.position = 'absolute'
    rainbow.style.top = top + 'px'
    let gradientStyle
    if (vertical) {
      rainbow.style.left = left + 'px'
      gradientStyle = 'linear-gradient(to bottom, ' + options.gradient.join(', ') + ')'
    } else {
      rainbow.style.left = options.borderSize + 'px'
      gradientStyle = 'linear-gradient(to left, ' + options.gradient.join(', ') + ')'
    }
    rainbow.style.backgroundImage = gradientStyle
    return rainbow
  }

  let createPeakLabel = function (parent, width, left) {
    let label = document.createElement('div')
    parent.appendChild(label)
    label.style.textAlign = 'center'
    label.style.color = options.tickColor
    label.style.fontSize = options.fontSize + 'px'
    label.style.position = 'absolute'
    label.textContent = '-∞'
    if (vertical) {
      label.style.width = width + 'px'
      label.style.top = options.borderSize + 'px'
      label.style.left = left + 'px'
    } else {
      label.style.width = options.fontSize * 2 + 'px'
      label.style.right = options.borderSize + 'px'
      label.style.top = (width * 0.25) + left + 'px'
    }
    return label
  }

  let createChannelMask = function (parent, width, top, left, transition) {
    let channelMask = document.createElement('div')
    parent.appendChild(channelMask)
    channelMask.style.position = 'absolute'
    if (vertical) {
      channelMask.style.width = width + 'px'
      channelMask.style.height = meterHeight + 'px'
      channelMask.style.top = top + 'px'
      channelMask.style.left = left + 'px'
    } else {
      channelMask.style.width = meterWidth + 'px'
      channelMask.style.height = width + 'px'
      channelMask.style.top = left + 'px'
      channelMask.style.right = options.fontSize * 2 + 'px'
    }
    channelMask.style.backgroundColor = options.backgroundColor
    // if (transition) {
    //   if (vertical) {
    //     channelMask.style.transition = 'height ' + options.maskTransition
    //   } else {
    //     channelMask.style.transition = 'width ' + options.maskTransition
    //   }
    // }
    return channelMask
  }
  let maskSizeL = function (floatVal) {
    if (options.peakDataLeft < floatVal) {
      options.peakDataLeft = floatVal
    } else {
      options.peakDataLeft = ((floatVal + (options.barFallDelay * options.peakDataLeft)) / ((options.barFallDelay + 1)))
    }
    return options.peakDataLeft
    // let meterDimension = vertical ? meterHeight : meterWidth
    // if (floatVal === 0.0) {
    //   return meterDimension
    // } else {
    //   let returnVal = Math.floor(dbFromFloat(floatVal) * meterDimension / options.dbRange / (options.barFallDelay + 1))
    //   if (returnVal > meterDimension) {
    //     return meterDimension
    //   } else {
    //     return returnVal
    //   }
    // }
  }
  let maskSizeR = function (floatVal) {
    if (options.peakDataRight < floatVal) {
      options.peakDataRight = floatVal
    } else {
      options.peakDataRight = ((floatVal + (options.barFallDelay * options.peakDataRight)) / ((options.barFallDelay + 1)))
    }
    return options.peakDataRight
  }
  let readpeakL = function () {
    return options.peakL
  }
  let readpeakR = function () {
    return options.peakR
  }
  let updateMeter = function (audioProcessingEvent) {
    let inputBuffer = audioProcessingEvent.inputBuffer

    let i
    let channelData = []
    let channelMaxes = []
    for (i = 0; i < channelCount; i++) {
      channelData[i] = inputBuffer.getChannelData(i)
      channelMaxes[i] = 0.0
    }
    let left, right
    for (let sample = 0; sample < inputBuffer.length / 4; sample++) {
      for (i = 0; i < channelCount; i++) {
        if (Math.abs(channelData[i][sample]) > channelMaxes[i]) {
          channelMaxes[i] = Math.abs(channelData[i][sample])
        }
      }
      left = channelMaxes[0]
      right = channelMaxes[1]
      options.peakL = left
      options.peakR = right
      // if (left > options.peakL) {
      //   options.peakL = left
      // }
      // if (right > options.peakR) {
      //   options.peakR = right
      // }
    }
    for (i = 0; i < channelCount; i++) {
      if (channelMaxes[i] > channelPeaks[i]) {
        channelPeaks[i] = channelMaxes[i]
        textLabels[i] = dbFromFloat(channelPeaks[i]).toFixed(1)
      }
    }
  }
  let paintMeter = function () {
    let peak1L = Math.floor(dbFromFloat(readpeakL()))
    let peak1R = Math.floor(dbFromFloat(readpeakR()))
    maskSizes[0] = meterWidth - 1 - ((maskSizeL(peak1L) - options.minDBValue) / options.dbScale) * (meterWidth)
    if (maskSizes[0] >= meterWidth) {
      maskSizes[0] = meterWidth
    }
    maskSizes[1] = meterWidth - 1 - ((maskSizeR(peak1R) - options.minDBValue) / options.dbScale) * (meterWidth)
    if (maskSizes[1] >= meterWidth) {
      maskSizes[1] = meterWidth
    }
    for (let i = 0; i < channelCount; i++) {
      if (vertical) {
        channelMasks[i].style.height = maskSizes[i] + 'px'
      } else {
        channelMasks[i].style.width = (maskSizes[i]) + 'px'
      }
      channelPeakLabels[i].textContent = textLabels[i]
    }
    requestAnimationId = window.requestAnimationFrame(paintMeter)
  }
  let Stop = function () {
    window.cancelAnimationFrame(requestAnimationId)
    meterNode.onaudioprocess = null
  }
  let Start = function () {
    meterNode.onaudioprocess = updateMeter
    requestAnimationId = window.requestAnimationFrame(paintMeter)
  }
  return {
    createMeterNode: createMeterNode,
    createMeter: createMeter,
    Stop: Stop,
    Start: Start
  }
})()

module.exports = webAudioPeakMeter
