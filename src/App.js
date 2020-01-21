import React, { Component } from 'react';
import Koji from '@withkoji/vcc';
import './App.css';
import { load, play, increaseHealth, increaseSpeed, makeSmall, moreCannons, increaseAttackSpeed, increaseHealing } from './main';

class App extends Component {
    constructor() {
    super();
    this.state = {
      muted: false,
      playScreen: true
    };
  }
componentDidMount() {
  load();
}

play = () => {
  play();
  this.setState({playScreen: false});
}

soundTrigger = () => {
    this.setState({muted: !this.state.muted});
    Array.prototype.slice.call(document.querySelectorAll('audio')).forEach(audio=> {
        if (this.state.muted){
            audio.muted = false;
        } else {
            audio.muted = true;
        }
    });
}


  render() {
    return (
      <div className="container">
        <canvas id="box"/>
        <div className="menu center">
          <img src={'http://timer00.github.io/Asteroids/imagens/logoFull.png'} alt="" className="logo"/>
          <div className="instructions">
            WASD, Arrow keys or Touch to MOVE <br/>
            Left click, space or Touch to SHOOT
          </div>
          <div onClick={this.play} className="play">{Koji.config.strings.playButton}</div>
        </div>

        <div className="upgrades ship">
          <div className="img">
            <h3>{Koji.config.strings.shipUpgrades}</h3>
            <img src={'http://timer00.github.io/Asteroids/imagens/ship.png'} alt=""/>
          </div>
          <div className="upgrade">
            <div className="price" onClick={increaseHealth}><h4>150$</h4></div>
            <div className="icon"><img src={'http://timer00.github.io/Asteroids/imagens/heart.png'} alt=""/></div>
            <div className="description"><p>+20 HP</p></div>
          </div>
          <div className="upgrade">
            <div className="price" onClick={increaseSpeed}><h4>150$</h4></div>
            <div className="icon"><img src={'http://timer00.github.io/Asteroids/imagens/speed.png'} alt=""/></div>
            <div className="description"><p>+1 Speed</p></div>
          </div>
          <div className="upgrade">
            <div className="price" onClick={makeSmall}><h4>500$</h4></div>
            <div className="icon"><img src={'http://timer00.github.io/Asteroids/imagens/shrink.png'} alt=""/></div>
            <div className="description"><p>-10 size</p></div>
          </div>
          <div className="upgrade">
            <div className="price" onClick={moreCannons}><h4>550$</h4></div>
            <div className="icon"><img src={'http://timer00.github.io/Asteroids/imagens/canon.png'} alt=""/></div>
            <div className="description"><p>+1 Canon</p></div>
          </div>
          <div className="upgrade">
            <div className="price" onClick={increaseAttackSpeed}><h4>250$</h4></div>
            <div className="icon"><img src={'http://timer00.github.io/Asteroids/imagens/canon.png'} alt=""/></div>
            <div className="description"><p>+1 Attack <br/> Speed</p></div>
          </div>
        </div>
        <div className="upgrades healing">
          <div className="img">
            <h3>{Koji.config.strings.healingUpgrades}</h3>
            <img src={'http://timer00.github.io/Asteroids/imagens/health container.png'}  alt=""/>
          </div>
          <div className="upgrade">
            <div className="price" onClick={increaseHealing}><h4>500$</h4></div>
            <div className="icon"><img src={'http://timer00.github.io/Asteroids/imagens/heart.png'} alt=""/></div>
            <div className="description"><p>+10 Healing</p></div>
          </div>
        </div>

        <div className="center gameOver" onClick={play}>
          <h1>{Koji.config.strings.gameOver}</h1>
          <h4></h4>
        </div>

        <div className="stats">
          <div className="elementBox">
            <div className="upBox" id="secondsBox">0.0 s</div>
            <div className="downBox" id="secondsName">{Koji.config.strings.seconds}</div>
          </div>
          <div className="elementBox">
            <div className="upBox" id="healthBox">hp</div>
            <div className="downBox" id="healthName">{Koji.config.strings.health}</div>
          </div>
          <div className="elementBox">
            <div className="upBox" id="moneyBox">$$</div>
            <div className="downBox" id="moneyName">{Koji.config.strings.money}</div>
          </div>
        </div>

        <div className="sound" onClick={this.soundTrigger}>
            {
                this.state.muted ? 
                <img src={'http://timer00.github.io/Asteroids/imagens/soundOff.png'} alt=""/> 
                : 
                <img src={'http://timer00.github.io/Asteroids/imagens/soundOn.png'} alt=""/>
            }
        </div>

        <audio id="pew">
          <source src={'http://timer00.github.io/Asteroids/sounds/pew.mp3'} type="audio/mp3"/>
        </audio>
        <audio id="bgMusic" loop>
          <source src={'http://timer00.github.io/Asteroids/sounds/bgMusic.mp3'} type="audio/mp3"/>
        </audio>
        <audio id="hitSound">
          <source src={'http://timer00.github.io/Asteroids/sounds/hitSound.mp3'} type="audio/mp3"/>
        </audio>
        <audio id="hitSound2">
          <source src={'http://timer00.github.io/Asteroids/sounds/hitSound2.mp3'} type="audio/mp3"/>
        </audio>
        <audio id="hitSound3">
          <source src={'http://timer00.github.io/Asteroids/sounds/hitSound3.mp3'} type="audio/mp3"/>
        </audio>
        <audio id="healingSound">
          <source src={'http://timer00.github.io/Asteroids/sounds/healingSound.mp3'} type="audio/mp3"/>
        </audio>
      </div>
    );
  }
}

export default App;
