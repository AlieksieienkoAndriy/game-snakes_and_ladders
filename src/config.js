const textStyle = {
  fontFamily : 'JosefinSans',
  fontSize   : 52,
  fontStyle  : 'bold',
  fill       : '#fff',
  align      : 'center',  
};

export default {
  startSettings: {
    menu: {
      board: {
        texture: 'menu',
        offsetY: 420,
      },

      playText: {
        y      : -50,
        offsetY: 300,
        text   : 'Play',

        style: {
          ...textStyle,
          fillHover: '#009933',
        },
      },

      rulesText: {
        y      : 50,
        offsetY: 300,
        text   : 'Rules',

        style: {
          ...textStyle,
          fillHover: '#009933',
        },
      },
    },

    rules: {
      topText: {
        offsetX: -300,
        offsetY: -300,
        text   : 'REACH THE END OF THE BOARD\nLAUNCHING THE DICE.',
        
        style: {
          ...textStyle,
          fill       : '#000F55', 
          lineSpacing: 10,         
        },
      }, 
      middleText: {
        offsetX: -300,
        offsetY: -50,

        text: 'LADDER: YOU GO UP!',

        style: {
          ...textStyle,
          fill       : '#000F55',                   
        },
      }, 
      bottomText: {
        offsetX: -300,
        offsetY: 250,

        text: 'SNAKE: YOU GO DOWN!',

        style: {
          ...textStyle,
          fill: '#000F55',             
        },
      },
      
      finish: {
        x: -450,
        texture: 'finish',
        scale: 0.75,
      },
      ladder: {
        x: -450,
        texture: 'ladder',
        scale: 0.75,
      },
      snake: {
        x: -450,
        texture: 'snake',
        scale: 0.75,
      },

      exitButton: {
        offset: 75,
        texture: 'exit_button',
      },
    },
  },

  gameSettings: {
    board: {
      offsetX: 75,
      texture: 'board',    
    },

    dice: {
      texture: 'dice',
      scale  : 2,
    },

    exitButton: {
      x      : 75,
      y      : 75,
      texture: 'exit_button',
    },

    firstButton: {
      offsetY: -100,
      texture: 'button_red',

      textParams: {
        text   : 'First player\nROLL',

        style: {
          ...textStyle,
          fontSize : 34,        
          fill     : '#ff2d2d',        
          
          stroke         : '#000',
          strokeThickness: 2,
        },
      },
    },

    secondButton: {
      offsetY: 100,
      texture: 'button_blue',

      textParams: {
        text   : 'Second player\nROLL',

        style: {
          ...textStyle,
          fontSize   : 34,        
          fill       : '#2f57ef',  
          
          stroke         : '#fff',
          strokeThickness: 2,        
        },
      },
    },

    spaces: {
      col: 10,
      row: 10,

      width : 120,
      height: 120,

      startPos: {
        x: 820,
        y: 1200,
      },

      moving: {
        9 : 32,
        15: 36,
        20: 40,
        22: 1,
        33: 14,
        34: 53,
        43: 75,
        51: 30,
        61: 42,
        79: 98,
        88: 67,
        94: 73,
      },      
    },

    firstPlayer: {
      name: 'firstPlayer',

      token: {
        offset : -25,
        texture: 'token_red',
        scale  : 0.9,
      },
    },

    secondPlayer: {
      name: 'secondPlayer',

      token: {
        offset : 25,
        texture: 'token_blue',
        scale  : 0.9,
      },
    },

    finalWindow: {
      wonText: {
        offsetY: 40,
        text   : 'Congratulations on the win,',

        style: {
          ...textStyle,
          fontSize: 60,           
          
          stroke         : '#000',
          strokeThickness: 3,
        },
      },

      button: {
        offsetY: 180,
        texture: 'button_green',

        textParams: {
          text   : 'PLAY AGAIN',

          style: {
            ...textStyle,
            fontSize: 42,          
            
            stroke         : '#000',
            strokeThickness: 2,
          },
        },        
      }
    },
  },
}