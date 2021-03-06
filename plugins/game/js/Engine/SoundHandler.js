/*
    This file is part of Ironbane MMO.

    Ironbane MMO is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Ironbane MMO is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Ironbane MMO.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var SoundHandler = Class.extend({
  Init: function() {

    // Start SoundManager2
    soundManager.setup({
      url: 'http://'+ironbane_hostname+ironbane_root_directory+'plugins/game/flash/',
      flashVersion: 9,
      useFlashBlock: false,
      preferFlash : false,
      onready: function() {
      // Ready to use; soundManager.createSound() etc. can now be called.
        soundHandler.Preload();
      }
    });

    this.loadedMainMenuMusic = false;

    this.sounds = {};

  },
  Preload: function() {

    this.soundList = {

      "theme": {
        file: "music/ib_theme.mp3",
        volume: 0.5,
        // volume:0,
        loops: 999
      },

      "ib2": {
        file: "music/IRONBANE 2.mp3",
        volume: 1.0,
        // volume:0,
        loops: 999
      },

      "click": "ui/click.wav",


      "switch": "misc/switch.wav",
      "bag1": "misc/bag1.wav",
      "bag2": "misc/bag2.wav",
      "drop": "misc/drop.ogg",
      "drop1": "misc/drop1.wav",
      "drop2": "misc/drop2.wav",
      // "enterGame": "misc/enterGame.ogg",


      "equipSword1": "equip/equipSword1.wav",
      "equipSword2": "equip/equipSword2.wav",
      "equipSword3": "equip/equipSword3.wav",
      "equip1": "equip/equip1.wav",
      "equip2": "equip/equip2.wav",

      "splash1": "environment/splash1.wav",
      "splash2": "environment/splash2.wav",

      // "arrowHit1": "battle/arrowHit01.wav",
      // "arrowHit2": "battle/arrowHit02.wav",
      // "arrowHit3": "battle/arrowHit03.wav",
      "swing1": "battle/swing1.wav",
      "swing2": "battle/swing2.wav",
      "swing3": "battle/swing3.wav",
      "hit1": "battle/hit1.wav",
      "hit2": "battle/hit2.wav",
      "hit3": "battle/hit3.wav",
      "die1": "battle/die1.wav",
      "die2": "battle/die2.wav",
      "die3": "battle/die3.wav",
      "fireStaff": "battle/fireStaff.wav",
      "fireArrow": "battle/fireArrow.wav",

      "bubble1": "inventory/bubble1.wav",
      "bubble2": "inventory/bubble2.wav",
      "bubble3": "inventory/bubble3.wav",

      // "step1": "step/grass1.wav",
      // "step2": "step/grass2.wav",
      // "stepWater1": "step/water1.wav",
      // "stepWater2": "step/water2.wav",

      "jump" : "fighter/jump.wav",

//      "race": "battle/02_-_rage_racer.mp3",
//      "splash": "battle/splash.ogg",


      "placeholder": "placeholder"
    };
    for(var s in this.soundList) {
      if (typeof this.soundList[s] !== 'object') {
        this.soundList[s] = {file:this.soundList[s]};
      }

      if ( !ISDEF(this.soundList[s]['volume'])) {
        this.soundList[s]['volume'] = 0.3;
      }
    }

    for(var s in this.soundList) {
      (function(s){
      soundHandler.sounds[s] = soundManager.createSound({
        id: s,
        url: 'http://'+ironbane_hostname+ironbane_root_directory+'plugins/game/sound/' +
          soundHandler.soundList[s].file,
        autoLoad:true,
        onload: function(success) {
          if ( success ) soundHandler.OnLoad(s);
        }
      });
      })(s);
    }


  },
  FadeOut: function(sound, time) {

    this.PlayOnce(sound);

    var tween = new TWEEN.Tween( { volume: 100 } )
      .to( { volume: 0 }, time )
      // .easing( TWEEN.Easing.Elastic.InOut )
      .onUpdate( function () {
        soundHandler.SetVolume(sound, this.volume);
      } )
      .start();
  },
  SetVolume: function(sound, volume) {

    volume *= this.soundList[sound]['volume'];

    soundManager.setVolume(sound, volume);
  },
  FadeIn: function(sound, time) {

    this.PlayOnce(sound);

    var tween = new TWEEN.Tween( { volume: 0 } )
      .to( { volume: 100 }, time )
      // .easing( TWEEN.Easing.Elastic.InOut )
      .onUpdate( function () {
        soundHandler.SetVolume(sound, this.volume);
      } )
      .start();
  },
  OnLoad: function(sound) {
    if ( sound === "theme" ) {
      this.loadedMainMenuMusic = true;
    }
  },
  PlayOnce: function(sound, position) {

    if ( !hudHandler.allowSound ) return;

    if ( this.sounds[sound].playState !== 0 ) return;

    this.Play(sound, position);

  },
  Play: function(sound, position) {

    if ( !hudHandler.allowSound ) return;


    if ( !ISDEF(this.sounds[sound]) ) {
      ba('Sound \''+sound+'\' does not exist!');
      return;
    }

    var distance = 0;

    if ( position ) {
      distance = terrainHandler.GetReferenceLocation().subSelf(position).length();
      distance = Math.pow(distance, 1);
    }

    //bm("distance: "+distance);

    var volume = distance / 20;
    volume = 1-volume.clamp(0,1);
    volume = volume * 100;
    volume = volume.clamp(0,100);
    //bm("volume : "+volume );


    soundHandler.SetVolume(sound, volume);
    //soundManager.setPan(sound, 80);

    this.sounds[sound].play({
      loops: this.soundList[sound].loops
    });
  },
  StopAll: function() {
    soundManager.stopAll();
  }
});


var soundHandler = new SoundHandler();
