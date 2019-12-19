import React, { Component } from 'react';
import './App.css';
import { load, play, increaseHealth, increaseSpeed, makeSmall, moreCannons, increaseAttackSpeed, increaseHealing } from './main';

import bgMusic from './sounds/bgMusic.mp3'
import healingSound from './sounds/healingSound.mp3'
import hitSound from './sounds/hitSound.mp3'
import hitSound2 from './sounds/hitSound2.mp3'
import hitSound3 from './sounds/hitSound3.mp3'
import pew from './sounds/pew.mp3'

class App extends Component {
  componentDidMount() {
    load();
  }

  render() {
    return (
      <div className="container">
        <canvas id="box"/>
        <div className="menu center">
          <img src={'http://timer00.github.io/Asteroids/imagens/logoFull.png'} alt="" className="logo"/>
          <div onClick={play} className="play">Play</div>
        </div>

        <div className="upgrades ship">
          <div className="img">
            <h3>Ship Upgrades</h3>
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
            <h3>Healing Upgrades</h3>
            <img src={'http://timer00.github.io/Asteroids/imagens/health container.png'}  alt=""/>
          </div>
          <div className="upgrade">
            <div className="price" onClick={increaseHealing}><h4>500$</h4></div>
            <div className="icon"><img src={'http://timer00.github.io/Asteroids/imagens/heart.png'} alt=""/></div>
            <div className="description"><p>+10 Healing</p></div>
          </div>
        </div>

        <div className="center gameOver" onClick={play}>
          <h1>Game Over</h1>
          <h4></h4>
        </div>

        <div className="stats">
          <div className="elementBox">
            <div className="upBox" id="secondsBox">0.0 s</div>
            <div className="downBox" id="secondsName">Seconds</div>
          </div>
          <div className="elementBox">
            <div className="upBox" id="healthBox">hp</div>
            <div className="downBox" id="healthName">Health</div>
          </div>
          <div className="elementBox">
            <div className="upBox" id="moneyBox">$$</div>
            <div className="downBox" id="moneyName"> Money</div>
          </div>
        </div>

        <audio id="pew">
          <source src={pew} type="audio/mp3"/>
        </audio>
        <audio id="bgMusic" loop>
          <source src={bgMusic} type="audio/mp3"/>
        </audio>
        <audio id="hitSound">
          <source src={hitSound} type="audio/mp3"/>
        </audio>
        <audio id="hitSound2">
          <source src={hitSound2} type="audio/mp3"/>
        </audio>
        <audio id="hitSound3">
          <source src={hitSound3} type="audio/mp3"/>
        </audio>
        <audio id="healingSound">
          <source src={healingSound} type="audio/mp3"/>
        </audio>
      </div>
    );
  }
}

export default App;
