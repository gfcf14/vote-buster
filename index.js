// import { onMobile } from './greendream';

var windowWidth = $(window).width();
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;

var buttonWidth = 278;
var buttonHeight = 44;

var fileRoot = './votebuster/';

var backgrounds = new Array();
var buttons = new Array();
var candidates = new Array();
var labels = new Array();
var objects = new Array();
var states = new Array();
var votes = new Array();

var tracks = new Array();
var tracknames = new Array('arizona', 'california', 'florida', 'georgia', 'hailtothechief', 'illinois', 'indiana', 'intro', 'michigan', 'missouri', 'newjersey', 'newyork', 'northcarolina', 'ohio', 'pennsylvania', 'texas', 'virginia', 'washington');
var tracksenum = {'AR': 0, 'CA': 1, 'FL': 2, 'GA': 3, 'HTC': 4, 'IL': 5, 'IN': 6, 'I': 7, 'MI': 8, 'MO': 9, 'NJ': 10, 'NY': 11, 'NC': 12, 'OH': 13, 'PA': 14, 'TX': 15, 'VA': 16, 'WA': 17};
var fx = new Array();
var fxenum = {'bassdrum': 0, 'buzz': 1, 'corkpop': 2, 'fallfast': 3, 'flop': 4, 'gong': 5, 'longdrumroll': 6, 'lose': 7, 'nextlevel': 8, 'pause': 9, 'punch1': 10, 'wilhelm': 11, 'win': 12, 'zipin': 13};
var auxiliarbassdrum;
var auxiliarpunch1;
var auxiliarpunch2;

var soundenabled = true;
var gamestatus = 'main'; //main for Main Menu, inst for Instructions, ab for About, sel for Select, lvl for Level Start, game for In Game, res for Level Results, end for Ending
var gamepaused = false;
var color = '#008000';
var incanvas = true;

var obamalevel = 1;
var romneylevel = 1;

var candidate = 'none';
var levelnumber = 1;
var gametimer;
var levelduration = 120;
var timeellapsed = 0;
var levelfinished = false;
var levelverdict;

var levelvotes = new Array();
var votenumber = 0;
var votespeed = 0;
var voteWidth = 150;
var voteHeight = 100;
var trackindex = 0;

var obamavotes = 0;
var romneyvotes = 0;

var obamashotvotes = 0;
var romneyshotvotes = 0;

var obamavotes2nd = 0;
var romneyvotes2nd = 0;
var multiplier = 1;

var obamalevels = new Array('AR;Arizona Altercation;After 1952, this state has been showing more liking to Republican candidates, often voting for winners.;Electoral votes: 11',
                            'IN;Indiana Impact;It has been considered a Republican stronghold for presidential races, but CPVI rates it R+5, lower than most red states.;Electoral votes: 11',
                            'VA;Virginia Vanquishment;A would-be swing state, Virginia has always been in a flux in respect of party strength, with both red an blue fighting house and senate seats.;Electoral votes: 13',
                            'NC;North Carolina Clash;With thirteen seats in the house and two in the senate, this majorly republican state proves to be somewhat of a headache.;Electoral votes: 15',
                            'GA;Georgia Gamble;Careful! With the start of the 21st century several Democrats have turned Red in favor to Rebulicans.;Electoral Votes: 16',
                            'OH;Ohio Onslaught;Seven time streak of republican presidency here, though it\'s been leaning more to the blue side. Said to bring victory to the candidate it votes for.;Electoral votes: 18',
                            'FL;Florida Fray;Although there\'s a majority of Democrats, since 1956 it has always voted Republican, except in 1964, 1976, 1996, and 2008.;Electoral votes: 29',
                            'MO;Missouri Match;Dangerous state that has the longest winning streak in votes for president since 1904 except for elections of 1956 and 2008.;Electoral votes: 10',
                            'TX;Texas Tango;Since 1980 most of the state has supported republican candidates. Won by the reds in 2000, 2004, and 2008.;Electoral votes: 38',
                            'HTC;Washington DC - Final War;Given electoral votes since 1964, with which has only voted democrat, but lost 7 out of 11 times.;Electoral votes: 3');

var romneylevels = new Array('WA;Washington Wrangle;The state has voted democratic since 1988, mostly because the far larger western population is blue.;Electoral votes: 12',
                             'NJ;New Jersey Jousting;An ex republican state, New Jersey has recently become Democrat in votes.;Electoral votes: 14',
                             'MI;Michigan Meele;Although a 50-50 state, Michigan has supported Democrats in the last five elections.;Electoral votes: 16',
                             'PA;Pennsylvania Pageant;Like New Jersey this state usually supported the reds, but has backed up the blues since 1992.;Electoral votes: 20',
                             'IL;Illinois Incident;An usually swing state in which the democrats have been slowly getting accepted more.;Electoral votes: 20',
                             'OH;Ohio Onslaught;Seven time streak of republican presidency here, though it\'s been leaning more to the blue side. Said to bring victory to the candidate it votes for.;Electoral votes: 18',
                             'FL;Florida Fray;Although there\'s a majority of Democrats, since 1956 it has always voted Republican, except in 1964, 1976, 1996, and 2008.;Electoral votes: 29',
                             'NY;New York Yap;Big victory here considering the state has generally supported democratic candidates.;Electoral votes: 29',
                             'CA;California Crusade;Considered the epitome of the blue, elected reds until 1958.;Electoral votes: 55',
                             'HTC;Washington DC - Final War;Given electoral votes since 1964, with which has only voted democrat, but lost 7 out of 11 times.;Electoral votes: 3');

var levelconditions = new Array('10-55-n',
                                '10-70-n',
                                '10-80-n',
                                '20-80-d',
                                '0-100-n',
                                '10-20-n',
                                '00-10-d',
                                '0-100-t',
                                '00-05-q',
                                '00-00-s');

var finalwords = new Array('And now, presenting the 2012 US Elections winner,',
                           'the future president of the United States,',
                           'with an indisputable majority of votes...',
                           '...',
                           '...',
                           'Please hold, we\'re having technical difficulties...',
                           '...',
                           '...',
                           'It appears that due to tampering with the votes by an anonymous agile person known as the VoteBuster...',
                           'All of the votes for the Democrat and Republican parties were compromised, and will be nullified for the election...',
                           'So we have no choice but to declare as President the next candidate with the most votes, the candidate of the Libertarian Party, Gary Johnson!!');
var finaltextindex = 0;
var finaltextcounter = 0;
var finaltextholder = '';
var garysource = 0;


class Vote {
  constructor(voteid, candidate, shot, inscreen, free, decided, top, left, dx, dy, speed) {
    this.voteid = voteid;
    this.candidate = candidate;
    this.shot = shot;
    this.inscreen = inscreen;
    this.free = free;
    this.decided = decided;
    this.top = top;
    this.left = left;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;

    //for when the vote changes
    this.changeSound = new Audio;
    this.changeSound.src = fx[fxenum.zipin].src;

    //for when the opponent vote falls
    this.fallSound = new Audio;
    this.fallSound.src = fx[fxenum.fallfast].src;

    //for when the player's vote falls
    this.buzzSound = new Audio;
    this.buzzSound.src = fx[fxenum.buzz].src;

    //for when the player's vote passes the flag
    this.votePlayer = new Audio;
    this.votePlayer.src = fx[fxenum.flop].src;

    //for when the opponent's vote passes the flag
    this.voteOpponent = new Audio;
    this.voteOpponent.src = fx[fxenum.gong].src;

    $('#gamescreen').append("<div id='v" + this.voteid + "div' style='position: absolute; top: " + this.top + "px; left: " + this.left + "px;'><img id='v" + this.voteid + "img' src='" + fileRoot + "votes/" + this.candidate + "vote.png'></div>");
  }

  move() {
    $('#v' + this.voteid + 'div').css({left: '+=' + (this.dx * this.speed) + 'px', top: '+=' + (this.dy * this.speed) + 'px'});
    this.left = parseInt($('#v' + this.voteid + 'div').css('left'));
    this.top = parseInt($('#v' + this.voteid + 'div').css('top'));
  }

  bounce() {
    this.dy *= -1;
  }

  reset() {
    this.candidate = (Math.random() >= 0.5) ? 'obama' : 'romney';
    this.top = (Math.floor(Math.random() * 401));
    this.left =(0 - ((Math.floor(Math.random() * 4) + 1) * voteWidth));
    this.dy = (Math.floor(Math.random() * 3)) - 1;

    this.decided = false;
    this.free = false;
    this.shot = false;
    this.inscreen = false;

    $('#v' + this.voteid + 'div').css({left: this.left + 'px', top: this.top + 'px'});
    $('#v' + this.voteid + 'img').attr('src', fileRoot + '/votes/' + this.candidate + 'vote.png');
  }

  change() {
    this.decided = true;

    var newcandidate = (Math.random() >= 0.5) ? 'obama' : 'romney';
    if (this.candidate != newcandidate) {
      if (soundenabled) this.changeSound.play();
      this.candidate = newcandidate;
      $('#v' + this.voteid + 'img').attr('src', fileRoot + '/votes/' + this.candidate + 'vote.png');
    }
  }

  count() {
    this.free = true;
    $('#v' + this.voteid + 'img').attr('src', fileRoot + '/votes/happy' + this.candidate + 'vote.png');
    if (candidate == this.candidate) {
      if (soundenabled) this.votePlayer.play();
      incrementCount(this.candidate);
    }
    else {
      if (soundenabled) this.voteOpponent.play();
      incrementCount(this.candidate);
    }
  }

  shoot() {
    if (!this.shot && this.inscreen && !this.free) {
      this.shot = true;
      this.dy = 1;
      $('#v' + this.voteid + 'img').attr('src', fileRoot + '/votes/sad' + this.candidate + 'vote.png');
      if (this.candidate == candidate) {
        if (soundenabled) this.buzzSound.play();
      }
      else {
        if (soundenabled) this.fallSound.play();
      }
      incrementShotVote(this.candidate);
    }
  }

  fall() {
    $('#v' + this.voteid + 'div').css({top: '+=' + (this.dy * this.speed) + 'px'});
    this.top = parseInt($('#v' + this.voteid + 'div').css('top'));
  }
}

$ (function() {
  $('#votebustercontainer').css({background: 'url(/old-media/gamesbackground2.png)', backgroundSize: '100vw 100vh'});

  canvasWidth = $('#canvas').width();
  canvasHeight = $('#canvas').height();
  canvasTop = $('#canvas').position() ? $('#canvas').position().top : 0;
  canvasLeft = $('#canvas').position() ? $('#canvas').position().left : 0;

  for (var i = 1; i <= 5; i++) $('#final' + i).css({left: canvasLeft + 'px'});

  $('body').css({opacity: 1});
  $('body').on('keyup', function(e) {
    if (gamestatus == 'game') {
      if (!levelfinished) {
        if (e.which == 32) { //spacebar
          togglePause();
        }
      }
    }
  });

  $('body').on('mousedown', function(e) {
    startShot(e);
  });

  $('body').on('mouseup', function(e) {
    stopShot(e);
  });

  $('#canvas').mouseenter(function() {
    incanvas = true;
  });

  $('#canvas').mouseleave(function() {
    incanvas = false;
  });

  preloadMedia();
});

function togglePause() {
  if (!gamepaused) {
    if (soundenabled) {
      tracks[trackindex].pause();
      fx[fxenum.pause].play();
    }

    $('#pauselabel').css({opacity: 1, visibility: 'visible'});
    gamepaused = true;
  }
  else {
    if (soundenabled) tracks[trackindex].play();

    $('#pauselabel').css({opacity: 0, visibility: 'hidden'});
    gamepaused = false;
  }
}

function startShot(e) {
  if (e.which == 1 && (e.pageX >= canvasLeft && e.pageX <= (canvasWidth + canvasLeft)) && (e.pageY >= canvasTop && e.pageY <= (canvasHeight + canvasTop))) {
    //console.log('Mouse is at (' + e.pageX + ', ' + e.pageY + ')');
    if (gamestatus == 'game' && incanvas && !gamepaused && !levelfinished) {
      $('body').css('cursor', 'url(' + fileRoot + 'objects/snipershot.png) 50 50, auto');
      if (soundenabled) fx[fxenum.corkpop].play();
    }

    if (!gamepaused && !levelfinished) {
      $.each(levelvotes, function() {
        if (((e.pageX - canvasLeft) > this.left && (e.pageX - canvasLeft) < (this.left + voteWidth)) && ((e.pageY - canvasTop) > this.top && (e.pageY - canvasTop) < (this.top + voteHeight))) this.shoot();
      });
    }
  }
}

function stopShot(e) {
  if (gamestatus == 'game' && incanvas && !levelfinished) {
    $('body').css('cursor', 'url(' + fileRoot + 'objects/snipersight.png) 50 50, auto');
  }
}

function incrementCount(c) {
  if (c == 'obama') {
    obamavotes++;
    $('#statsobamavotes').html(obamavotes);
  }
  else {
    romneyvotes++;
    $('#statsromneyvotes').html(romneyvotes);
  }
}

function incrementShotVote(c) {
  if (c == 'obama') obamashotvotes++;
  else romneyshotvotes++;
}

function preloadMedia() {
  //THIS LINE IS NECESSARY TO CENTER THE LOG AND LOAD STATUS AND BAR ON THE MIDDLE CENTER OF THE CANVAS!!!
  $('#loadscreen').css({top: ((canvasHeight / 2) - ($('#loadscreen').height() / 2)) + 'px', left: (canvasLeft + (canvasWidth / 2) - ($('#loadscreen').width() / 2)) + 'px'});

  $('#loadscreen').css('opacity', 1);
  $('#statusloadbottom').css('opacity', 1);
  $('#statusloadtop').css('opacity', 1);

  for (var i = 0; i < tracknames.length; i++) {
    tracks[i] = new Audio;
    var song = (tracknames[i] == 'hailtothechief' || tracknames[i] == 'intro') ? '': 'song'
    tracks[i].oncanplaythrough = function(){};
    tracks[i].src = fileRoot + 'sound/tracks/' + tracknames[i] + song + '.mp3';
  }

  var fxnames = new Array('bassdrum', 'buzz', 'corkpop', 'fallfast', 'flop', 'gong', 'longdrumroll', 'lose', 'nextlevel', 'pause', 'punch1', 'wilhelm', 'win', 'zipin');
  for (var i = 0; i < fxnames.length; i++) {
    fx[i] = new Audio;
    fx[i].oncanplaythrough = function(){};
    fx[i].src = fileRoot + 'sound/fx/' + fxnames[i] + '.wav';
  }

  auxiliarbassdrum = new Audio;
  auxiliarbassdrum.oncanplaythrough = function(){};
  auxiliarbassdrum.src = fileRoot + 'sound/fx/bassdrum.wav';

  preloadBackgrounds();
}

function preloadBackgrounds() {
  $('#loadtext').html('Loading backgrounds...');
  var width = $('#statusloadtop').width();
  var backgroundimgs = new Array('aboutbg', 'curtains', 'finalbg', 'instructionsbg', 'nxtlvlbg', 'peopledoubt', 'peoplenormal', 'peoplesurprised', 'usflag');
  var imglimit = 0;

  for (var i = 0; i < backgroundimgs.length; i++) {
    backgrounds[i] = new Image();
    backgrounds[i].onload = function() {
      width += 5;
      $('#statusloadtop').css({width: width + 'px'});
      imglimit++;
      if (imglimit == backgroundimgs.length) preloadButtons();
    };
    backgrounds[i].onerror = function() {
      console.log('error while trying to load ' + backgrounds[i].src);
    };
    backgrounds[i].src = fileRoot + 'backgrounds/' + backgroundimgs[i] + '.png';
  }
}

function preloadButtons() {
  $('#loadtext').html('Loading buttons...');
  var width = $('#statusloadtop').width();
  var buttonimgs = new Array('about', 'back', 'continue', 'instructions', 'nextlevel', 'noaudio', 'sounddisabled', 'soundenabled', 'startgame');
  var imglimit = 0;

  for (var i = 0; i < buttonimgs.length; i++) {
    buttons[i] = new Image();
    buttons[i].onload = function() {
      width += 5;
      $('#statusloadtop').css({width: width + 'px'});
      imglimit++;
      if (imglimit == buttonimgs.length) preloadCandidates();
    };
    buttons[i].onerror = function() {
      console.log('error while trying to load ' + buttons[i].src);
    }
    buttons[i].src = fileRoot + 'buttons/' + buttonimgs[i] + '.png';
  }
}

function preloadCandidates() {
  $('#loadtext').html('Loading candidates...');
  var width = $('#statusloadtop').width();
  var candidateimgs = new Array('garyappeasingleft', 'garyappeasingright', 'garyjohnson', 'obamaangry', 'obamaattack', 'obamaexcited', 'obamaface', 'obamalose', 'obamaselect', 'obamasurprised', 'obamawin', 'romneyangry', 'romneyattack', 'romneyexcited', 'romneyface', 'romneylose', 'romneyselect', 'romneysurprised', 'romneywin');
  var imglimit = 0;

  for (var i = 0; i < candidateimgs.length; i++) {
    candidates[i] = new Image();
    candidates[i].onload = function() {
      width += 5;
      $('#statusloadtop').css({width: width + 'px'});
      imglimit++;
      if (imglimit == candidateimgs.length) preloadLabels();
    };
    candidates[i].onerror = function() {
      console.log('error while trying to load ' + candidates[i].src);
    }
    candidates[i].src = fileRoot + 'candidates/' + candidateimgs[i] + '.png';
  }
}

function preloadLabels() {
  $('#loadtext').html('Loading labels...');
  var width = $('#statusloadtop').width();
  var labelimgs = new Array('final1', 'final2', 'final3', 'final4', 'final5', 'lose', 'pause', 'timeup', 'votebusterlogo', 'win');
  var imglimit = 0;

  for (var i = 0; i < labelimgs.length; i++) {
    labels[i] = new Image();
    labels[i].onload = function() {
      width += 4;
      $('#statusloadtop').css({width: width + 'px'});
      imglimit++;
      if (imglimit == labelimgs.length) preloadObjects();
    };
    labels[i].onerror = function() {
      console.log('error while trying to load ' + labels[i].src);
    }
    labels[i].src = fileRoot + 'labels/' + labelimgs[i] + '.png';
  }
}

function preloadObjects() {
  $('#loadtext').html('Loading objects...');
  var width = $('#statusloadtop').width();
  var objectimgs = new Array('fight1', 'fight2', 'fight3', 'midline', 'podium', 'pointernone', 'pointerobama', 'pointerromney', 'snipershot', 'snipersight');
  var imglimit = 0;

  for (var i = 0; i < objectimgs.length; i++) {
    objects[i] = new Image();
    objects[i].onload = function() {
      width += 5;
      $('#statusloadtop').css({width: width + 'px'});
      imglimit++;
      if (imglimit == objectimgs.length) preloadStates();
    };
    objects[i].onerror = function() {
      console.log('error while trying to load ' + objects[i].src);
    }
    objects[i].src = fileRoot + 'objects/' + objectimgs[i] + '.png';
  }
}

function preloadStates() {
  $('#loadtext').html('Loading states...');
  var width = $('#statusloadtop').width();
  var stateimgs = new Array('arizona', 'california', 'florida', 'georgia', 'washingtondc', 'illinois', 'indiana', 'intro', 'michigan', 'missouri', 'newjersey', 'newyork', 'northcarolina', 'ohio', 'pennsylvania', 'texas', 'virginia', 'washington');
  var imglimit = 0;

  for (var i = 0; i < stateimgs.length; i++) {
    if (stateimgs[i] != 'intro') {
      states[i] = new Image();
      states[i].onload = function() {
        width += 5;
        $('#statusloadtop').css({width: width + 'px'});
        imglimit++;
        if (imglimit == stateimgs.length) preloadVotes();
      };
      states[i].onerror = function() {
        console.log('error while trying to load ' + states[i].src);
      }
      states[i].src = fileRoot + 'states/' + stateimgs[i] + '.png';
    }
    else imglimit++;
  }
}

function preloadVotes() {
  $('#loadtext').html('Loading votes...');
  var width = $('#statusloadtop').width();
  var voteimgs = new Array('happyobamavote', 'happyromneyvote', 'obamavote', 'romneyvote', 'sadobamavote', 'sadromneyvote');
  var imglimit = 0;

  for (var i = 0; i < voteimgs.length; i++) {
    votes[i] = new Image();
    votes[i].onload = function() {
      width += 5;
      $('#statusloadtop').css({width: width + 'px'});
      imglimit++;
      if (imglimit == voteimgs.length) {
        $('#statusloadbottom').hide();
        $('#statusloadtop').hide();
        $('#loadtext').html('All Loaded!');

        setTimeout(hideLoadScreen, 500);
      }
    };
    votes[i].onerror = function() {
      console.log('error while trying to load ' + votes[i].src);
    }
    votes[i].src = fileRoot + 'votes/' + voteimgs[i] + '.png';
  }
}

function hideLoadScreen() {
  // if (onMobile) {
  //   soundenabled = false;
  //   $('#soundbtn').attr('src', fileRoot + 'buttons/sounddisabled.png');
  // }
  /* else */ $('#pausebtn').css({visibility: 'hidden'});
  
  $('#loadscreen').css({transition: 'opacity 1s'});
  $('#loadscreen').css({opacity: 0});
  $('#loadscreen').one('transitionend', function() {
    $('#mainmenubuttons').css({top: ($('#canvas').height() - $('#mainmenubuttons').height() - 10) + 'px'});
    $('#about').css({left: canvasLeft + 'px'});
    $('#instructions').css({left: canvasLeft + 'px'});

    $('#statetitle').css({width: (canvasWidth * 0.6) + 'px'});
    $('#statepicanddesc').css({width: (canvasWidth * 0.5) + 'px'});

    $('#gameflag').attr('src', fileRoot + '/backgrounds/usflag.png');
    $('#statsobamaface').attr('src', fileRoot + '/candidates/obamaface.png');
    $('#statsromneyface').attr('src', fileRoot + '/candidates/romneyface.png');

    $('#curtains').css({opacity: 1, visibility: 'visible'});
    $('body').css('cursor', 'url(' + fileRoot + 'objects/pointer' + candidate + '.png), auto');
    $('#mainmenuscreen').css({opacity: 1, visibility: 'visible'});

    $('#backbtn').css({top: (canvasTop + canvasHeight - (buttonHeight * 2)) + 'px', left: (canvasLeft + (buttonWidth / 4)) + 'px'});
    $('#nxtbtn').css({top: (canvasTop + canvasHeight - (buttonHeight * 2)) + 'px', left: (canvasLeft + ((canvasWidth / 2) - (buttonWidth / 2))) + 'px'});
    $('#contbtn').css({top: (canvasTop + canvasHeight - (buttonHeight * 2)) + 'px', left: (canvasLeft + canvasWidth - (buttonWidth * 1.25)) + 'px'});

    if (soundenabled) tracks[tracksenum.I].play();
  });
}

function toggleSound() {
  if (!tracks[tracksenum.I].paused) tracks[tracksenum.I].pause();

  var soundstatus = (soundenabled) ? 'disabled' : 'enabled';
  $('#soundbtn').attr('src', fileRoot + 'buttons/sound' + soundstatus + '.png');
  soundenabled = !soundenabled;

  if (soundenabled) fx[fxenum.corkpop].play();
}

function startGame() {
  if (!tracks[tracksenum.I].paused) {
    tracks[tracksenum.I].pause();
    tracks[tracksenum.I].currentTime = 0;
  }
  if (soundenabled) fx[fxenum.corkpop].play();

  gamestatus = 'sel';
  $('#mainmenuscreen').css({opacity: 0, visibility: 'hidden'});
  $('#selectscreen').css({opacity: 1, visibility: 'visible'});
  $('#backbtn').css({opacity: 1, visibility: 'visible'});
  $('#contbtn').css({opacity: 1, visibility: 'visible'});
}

function showInst() {
  if (!tracks[tracksenum.I].paused) {
    tracks[tracksenum.I].pause();
    tracks[tracksenum.I].currentTime = 0;
  }
  if (soundenabled) fx[fxenum.corkpop].play();

  gamestatus = 'inst';
  $('#mainmenuscreen').css({opacity: 0, visibility: 'hidden'});
  $('#instructions').css({opacity: 1, visibility: 'visible'});
  $('#backbtn').css({opacity: 1, visibility: 'visible'});
}

function showAb() {
  if (!tracks[tracksenum.I].paused) {
    tracks[tracksenum.I].pause();
    tracks[tracksenum.I].currentTime = 0;
  }
  if (soundenabled) fx[fxenum.corkpop].play();

  gamestatus = 'ab';
  $('#mainmenuscreen').css({opacity: 0, visibility: 'hidden'});
  $('#about').css({opacity: 1, visibility: 'visible'});
  $('#backbtn').css({opacity: 1, visibility: 'visible'});
}

function back() {
  if (soundenabled) fx[fxenum.corkpop].play();

  $('#backbtn').css({opacity: 0, visibility: 'hidden'});

  if (gamestatus == 'inst') {
    $('#instructions').css({opacity: 0, visibility: 'hidden'});
    $('#mainmenuscreen').css({opacity: 1, visibility: 'visible'});
    gamestatus = 'main';
  }
  else if (gamestatus == 'ab') {
    $('#about').css({opacity: 0, visibility: 'hidden'});
    $('#mainmenuscreen').css({opacity: 1, visibility: 'visible'});
    gamestatus = 'main';
  }
  else if (gamestatus == 'sel') {
    $('#selectscreen').css({opacity: 0, visibility: 'hidden'});
    $('#mainmenuscreen').css({opacity: 1, visibility: 'visible'});
    $('#contbtn').css({opacity: 0, visibility: 'hidden'});
    gamestatus = 'main';
  }
  else if (gamestatus == 'lvl') {
    var cand = (candidate == 'obama') ? 'o' : 'r';
    $('#sel' + cand).css({'border-color': 'rgba(0, 128, 0, 0)'});
    candidate = 'none';
    $('body').css('cursor', 'url(' + fileRoot + 'objects/pointer' + candidate + '.png), auto');
    $('#candidate').html('');

    $('#nextlevelscreen').css({opacity: 0, visibility: 'hidden'});
    $('#mainmenuscreen').css({opacity: 1, visibility: 'visible'});
    $('#nxtbtn').css({opacity: 0, visibility: 'hidden'});
    gamestatus = 'main';
  }
  else if (gamestatus == 'end') {
    $('#final5').css({opacity: 0, visibility: 'hidden'});
    finaltextindex = 0;
    finaltextcounter = 0;
    finaltextholder = '';
    garysource = 0;

    $('#selo').css({'border-color': 'rgba(0, 128, 0, 0)'});
    obamalevel = 1;
    $('#selr').css({'border-color': 'rgba(0, 128, 0, 0)'});
    romneylevel = 1;
    $('#candidate').html('');

    if (!tracks[tracksenum.HTC].paused) tracks[tracksenum.HTC].pause();
    $('#finalscreen').css({opacity: 0, visibility: 'hidden'});
    $('#mainmenuscreen').css({opacity: 1, visibility: 'visible'});
    $('#curtains').css({opacity: 1, visibility: 'visible'});
    if (soundenabled) tracks[tracksenum.I].play();
  }
}

function cont() {
  if (soundenabled) fx[fxenum.corkpop].play();

  if (gamestatus == 'sel') {
    if (candidate != 'none') {
      $('#selectscreen').css({opacity: 0, visibility: 'hidden'});
      setNextLevelScreen();
    }
  }
  else if (gamestatus == 'game') {
    $('#contbtn').css({opacity: 0, visibility: 'hidden'});
    $('#contbtn').css({top: (canvasTop + canvasHeight - (buttonHeight * 2)) + 'px', left: (canvasLeft + canvasWidth - (buttonWidth * 1.25)) + 'px'});

    $('#timeuplabel').css({opacity: 0, visibility: 'hidden'});
    $('#gamescreen').css({opacity: 0, visibility: 'hidden'});
    $('#curtains').css({opacity: 1, visibility: 'visible'});
    $('#resultsscreen').css({opacity: 1, visibility: 'visible'});

    gamestatus = 'res';
    showResults();
  }
  else if (gamestatus == 'res') {
    if (!fx[fxenum.win].paused) {
      fx[fxenum.win].pause();
      fx[fxenum.win].currentTime = 0;
    }
    if (!fx[fxenum.lose].paused) {
      fx[fxenum.lose].pause();
      fx[fxenum.win].currentTime = 0;
    }

    if (levelverdict == 'win') {
      if (candidate == 'obama') {
        if (obamalevel == 10) {
          gamestatus = 'end';
          setFinalScreen();
        }
        else {
          obamalevel++;
          resetResultsElements();
          $('#resultsscreen').css({opacity: 0, visibility: 'hidden'});
          setNextLevelScreen();
        }
      }
      else {
        if (romneylevel == 10) {
          gamestatus = 'end';
          setFinalScreen();
        }
        else {
          romneylevel++;
          resetResultsElements();
          $('#resultsscreen').css({opacity: 0, visibility: 'hidden'});
          setNextLevelScreen();
        }
      }
    }
    else {
      resetResultsElements();
      $('#resultsscreen').css({opacity: 0, visibility: 'hidden'});
      setNextLevelScreen();
    }

    /*if ((candidate == 'obama' && obamalevel != 10) || (candidate == 'romney' && romneylevel != 10)) {
      resetResultsElements();
      $('#resultsscreen').css({opacity: 0, visibility: 'hidden'});
      setNextLevelScreen();
    }*/
  }
  else if (gamestatus == 'end') {
    finaltextindex++;
    if (finaltextindex == 8) {
      $('#wethepeople').attr('src', fileRoot + 'backgrounds/peoplesurprised.png');
      $('#barackobama').attr('src', fileRoot + 'candidates/obamasurprised.png');
      $('#mittromney').attr('src', fileRoot + 'candidates/romneysurprised.png');
    }
    else if (finaltextindex == 9) {
      $('#barackobama').attr('src', fileRoot + 'candidates/obamalose.png');
      $('#mittromney').attr('src', fileRoot + 'candidates/romneylose.png');
    }
    else if (finaltextindex == 11) {
      $('#wethepeople').attr('src', fileRoot + 'backgrounds/peopledoubt.png');
    }
    finaltextcounter = 0;
    $('#contbtn').css({opacity: 0, visibility: 'hidden'});
  }
}

function resetResultsElements() {
  $('#obama1h').css({opacity: 0});
  $('#romney1h').css({opacity: 0});
  $('#obama2h').css({opacity: 0});
  $('#romney2h').css({opacity: 0});
  $('#obamasv').css({opacity: 0});
  $('#romneysv').css({opacity: 0});
  $('#obamat').css({opacity: 0});
  $('#romneyt').css({opacity: 0});
  $('#pred2h').css({opacity: 0});
  $('#levelverdict').css({opacity: 0});
  $('#obamaverdict').css({opacity: 0});
  $('#romneyverdict').css({opacity: 0});
}

function setNextLevelScreen() {
  $('#nextlevelscreen').css({opacity: 1, visibility: 'visible'});
  $('#contbtn').css({opacity: 0, visibility: 'hidden'});

  setNextLevel();

  if (soundenabled) fx[fxenum.nextlevel].play();
  $('#backbtn').css({opacity: 1, visibility: 'visible'});
  $('#nxtbtn').css({opacity: 1, visibility: 'visible'});

  gamestatus = 'lvl';
}

function showResults() {
  $('#levelnumber').html(levelnumber);

  $('#obama1h').html(obamavotes);
  $('#romney1h').html(romneyvotes);

  $('#obama2h').html(obamavotes2nd);
  $('#romney2h').html(romneyvotes2nd);

  $('#obamasv').html(obamashotvotes);
  $('#romneysv').html(romneyshotvotes);

  var obamatotal = obamavotes + obamavotes2nd;
  var romneytotal = romneyvotes + romneyvotes2nd;

  if (multiplier == 99) {
    if (candidate == 'obama') romneytotal += obamashotvotes;
    else obamatotal += romneyshotvotes;
  }
  else {
    if (candidate == 'obama') obamatotal -= (obamashotvotes * multiplier);
    else romneytotal -= (romneyshotvotes * multiplier);
  }

  $('#obamat').html(obamatotal);
  $('#romneyt').html(romneytotal);

  $('#votepred').html($('#2vyou').html() + '<br>' + $('#2vopp').html() + '<br>' + $('#2vspe').html());

  var levelwinner = (obamatotal == romneytotal) ? 'lose' : ((obamatotal > romneytotal) ? 'obama' : 'romney');

  if (levelwinner == 'lose' || levelwinner != candidate) levelverdict = 'lose';
  else {
    if (levelwinner == candidate) levelverdict = 'win';
  }

  $('#levelverdict').attr('src', fileRoot + 'labels/' + levelverdict + '.png');
  var opponent = (candidate = 'obama') ? 'romney' : 'obama';
  var opver = (levelverdict == 'lose') ? 'win' : 'lose';
  $('#' + candidate + 'verdict').attr('src', fileRoot + 'candidates/' + candidate + levelverdict + '.png');
  $('#' + opponent + 'verdict').attr('src', fileRoot + 'candidates/' + opponent + opver + '.png');

  var resultcounter = 0;
  gametimer = setInterval(function(){
    resultcounter++;
    switch (resultcounter) {
      case 1:
        $('#obama1h').css({opacity: 1});
        $('#romney1h').css({opacity: 1});
        if (soundenabled) fx[fxenum.bassdrum].play();
      break;
      case 2:
        $('#obama2h').css({opacity: 1});
        $('#romney2h').css({opacity: 1});
        if (soundenabled) auxiliarbassdrum.play();
      break;
      case 3:
        $('#obamasv').css({opacity: 1});
        $('#romneysv').css({opacity: 1});
        if (soundenabled) fx[fxenum.bassdrum].play();
      break;
      case 4:
        $('#obamat').css({opacity: 1});
        $('#romneyt').css({opacity: 1});
        $('#pred2h').css({opacity: 1});
        if (soundenabled) auxiliarbassdrum.play();
      break;
      case 5:
        $('#levelverdict').css({opacity: 1});
        $('#obamaverdict').css({opacity: 1});
        $('#romneyverdict').css({opacity: 1});
        if (soundenabled) fx[fxenum[levelverdict]].play();

        $('#contbtn').css({opacity: 1, visibility: 'visible'});
        clearInterval(gametimer);
      break;
    }
  }, 1000);
}

function highlight(cand) {
  var other = (cand == 'o') ? 'r' : 'o';
  var message = (cand == 'o') ? 'President Barack Obama, Democrat (Blue)' : 'Governor Mitt Romney, Republican (Red)';
  candidate = (cand == 'o') ? 'obama' : 'romney';
  color = (cand == 'o') ? '#000080' : '#800000';

  $('#sel' + cand).css({'border-color': 'rgba(0, 128, 0, 1)'});
  $('#sel' + other).css({'border-color': 'rgba(0, 128, 0, 0)'});

  $('#candidate').html(message);
}

function setNextLevel() {
  $('body').css('cursor', 'url(' + fileRoot + 'objects/pointer' + candidate + '.png), auto');
  $('#statetitle').css({background: 'linear-gradient(to bottom, ' + color + ' 0%, #000000 75%)'});
  $('#statebox').css({background: color});

  var levelindex = (candidate == 'obama') ? obamalevel - 1 : romneylevel - 1;
  levelnumber = (candidate == 'obama') ? obamalevel : romneylevel;
  var leveltext = (candidate == 'obama') ? obamalevels[levelindex].split(";") : romneylevels[levelindex].split(";");

  var stateenum = leveltext[0];
  var title = leveltext[1];
  var desc = leveltext[2];
  var elvotes = leveltext[3];

  $('#statetitle').html("LEVEL " + levelnumber + ": " + title);
  trackindex = tracksenum[stateenum];
  tracks[trackindex].currentTime = 0;
  $('#stateimage').attr('src', states[trackindex].src);
  $('#lvldesc').html(desc);
  $('#lvlvotes').html(elvotes);

  var votetext = levelconditions[levelindex].split("-");

  var votemultiplier = votetext[2];

  $('#2vyou').html('Your party will get ' + votetext[0]);
  $('#2vopp').html('Opponent party will get ' + votetext[1]);

  if (candidate == 'obama'){
    obamavotes2nd = Number(votetext[0]);
    romneyvotes2nd = Number(votetext[1]);
  }
  else {
    obamavotes2nd = Number(votetext[1]);
    romneyvotes2nd = Number(votetext[0]);
  }

  var multipliermsg = '';
  if (votemultiplier == 'n') {
    multiplier = 1;
    multipliermsg = '';
  }
  else if (votemultiplier == 'd') {
    multiplier = 2;
    multipliermsg = 'Own shot votes will be doubled!';
  }
  else if (votemultiplier == 't') {
    multiplier = 3;
    multipliermsg = 'Own shot votes will be tripled!';
  }
  else if (votemultiplier == 'q') {
    multiplier = 4;
    multipliermsg = 'Own shot votes will be quadrupled!';
  }
  else if (votemultiplier == 's') {
    multiplier = 99;
    multipliermsg = '';
    $('#2vopp').html('Opponent party will get as many as own shot votes!');
  }
  $('#2vspe').html(multipliermsg);
}

function setLevelVotes() {
  if (soundenabled) {
    fx[fxenum.nextlevel].pause();
    fx[fxenum.nextlevel].currentTime = 0;
    fx[fxenum.corkpop].play();
  }

  //if (gamestatus == 'lvl')
  gamestatus = 'game';
  $('#curtains').css({opacity: 0, visibility: 'hidden'});
  $('#nextlevelscreen').css({opacity: 0, visibility: 'hidden'});
  $('#nxtbtn').css({opacity: 0, visibility: 'hidden'});
  $('#backbtn').css({opacity: 0, visibility: 'hidden'});
  $('body').css('cursor', 'url(' + fileRoot + 'objects/snipersight.png) 50 50, auto');

  $('#middlegamebar').css({opacity: 0, visibility: 'hidden'});
  if (levelnumber == 6 || levelnumber == 7 || levelnumber == 10) $('#middlegamebar').css({opacity: 1, visibility: 'visible'});
  $('#statslvl').html(levelnumber);

  $('#gamescreen').css({opacity: 1, visibility: 'visible'});

  if (levelnumber >= 1 && levelnumber <= 3) {
    votenumber = 10;
    votespeed = 3;
  }
  else if (levelnumber >= 4 && levelnumber <= 6) {
    votenumber = 15;
    votespeed = 4;
  }
  else if (levelnumber >= 7 && levelnumber <= 9) {
    votenumber = 20;
    votespeed = 5;
  }
  else if (levelnumber == 10) {
    votenumber = 25;
    votespeed = 5;
  }

  $('#statstime').html('2:00');
  $('#statsobamavotes').html('0');
  $('#statsromneyvotes').html('0');
  timeellapsed = 0;
  obamavotes = 0;
  romneyvotes = 0;
  obamashotvotes = 0;
  romneyshotvotes = 0;
  levelfinished = false;
  gamepaused = false;
  for (var i =0; i < levelvotes.length; i++) $('#v' + i + 'div').remove();
  levelvotes = [];

  for (var i = 0; i < votenumber; i++) {
    var randomcandidate = Math.random() >= 0.5;
    var votecandidate = (randomcandidate) ? 'obama' : 'romney';

    var levelvote = new Vote(i, votecandidate, false, false, false, false, (Math.floor(Math.random() * 401)), (0 - ((Math.floor(Math.random() * 4) + 1) * voteWidth)), 1, (Math.floor(Math.random() * 3) - 1), votespeed);
    levelvotes.push(levelvote);
  }

  $('#contbtn').css({top: (canvasTop + canvasHeight - ($('#contbtn').height() * 0.5) - 50) + 'px', left: (canvasLeft + canvasWidth - $('#contbtn').width() - ((100 - $('#contbtn').height()) / 2)) + 'px'});
  startLevel();
}

function startLevel() {
  if (soundenabled) {
    tracks[trackindex].addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    tracks[trackindex].play();
  }

  var milliseconds = 0;
  gametimer = setInterval(function(){
    if (!gamepaused) {
      //vote movement by means of loop
      $.each(levelvotes, function() {
        //if the vote moves inside the screen (even a tiny bit of it), then set its inscreen attribute to true
        if ((this.left + voteWidth) > 0 && !this.inscreen) this.inscreen = true;

        //if the vote moves outside the screen, then set its inscreen attribute to false
        if (this.top > (canvasTop + canvasHeight) && this.inscreen) this.inscreen = false;

        //if the vote has a vertical displacement (dy), it is checked so that it bounces off the top and bottom (or top of the status bar)
        if (this.dy != 0 && !this.shot && ((this.top < 0 && this.dy < 0) || (this.top > 400 && this.dy > 0))) this.bounce();

        //on purple levels, the vote could change face
        if ((levelnumber == 6 || levelnumber == 7 || levelnumber == 10) && this.left > 490 && !this.decided) this.change();

        //if the vote passes the screen (or falls down it), it should be reset back to the right
        if (this.left > canvasWidth || (this.top > (canvasTop + canvasHeight))) this.reset();

        //for when the votes pass the flag
        if (this.left > 800 && !this.free) this.count();

        //regardless of vote status, it should always move, or fall, depending on if it was shot or not
        if (!this.shot) this.move();
        else this.fall();
      });

      milliseconds++;
      if (milliseconds % 50 == 0) {
        timeellapsed++;

        var timeleft = levelduration - timeellapsed;
        $('#statstime').html(Math.floor(timeleft / 60) + ":" + ((timeleft % 60 >= 10) ? (timeleft % 60) : '0' + (timeleft % 60)));

        if (timeleft == 0) {
          levelfinished = true;

          if (soundenabled) {
            tracks[trackindex].pause();
            fx[fxenum.pause].play();
          }
          $('#timeuplabel').css({opacity: 1, visibility: 'visible'});
          $('#contbtn').css({opacity: 1, visibility: 'visible'});
          $('body').css('cursor', 'url(' + fileRoot + 'objects/pointer' + candidate + '.png), auto');

          clearInterval(gametimer);
        }
      }
    }
  }, 20);
}

function setFinalScreen() {
  candidate = 'none';
  $('body').css('cursor', 'url(' + fileRoot + 'objects/pointer' + candidate + '.png), auto');

  auxiliarpunch1 = new Audio;
  auxiliarpunch1.oncanplaythrough = function(){};
  auxiliarpunch1.src = fileRoot + 'sound/fx/punch1.wav';

  auxiliarpunch2 = new Audio;
  auxiliarpunch2.oncanplaythrough = function(){};
  auxiliarpunch2.src = fileRoot + 'sound/fx/punch1.wav';

  $('#contbtn').css({opacity: 0, visibility: 'hidden'});
  $('#contbtn').css({top: (canvasTop + canvasHeight - ($('#contbtn').height() * 0.5) - 50) + 'px', left: (canvasLeft + canvasWidth - $('#contbtn').width() - ((100 - $('#contbtn').height()) / 2)) + 'px'});
  $('#resultsscreen').css({opacity: 0, visibility: 'hidden'});
  $('#curtains').css({opacity: 0, visibility: 'hidden'});

  $('#barackobama').css({top: (canvasHeight - 399) + 'px', left: ((canvasWidth - 502) / 2) + 'px'});
  $('#mittromney').css({top: (canvasHeight - 399) + 'px', left: (canvasWidth - ((canvasWidth - 502) / 2) - 200) + 'px'});
  $('#garyjohnson').css({top: (canvasTop + canvasHeight - 200) + 'px', left: ((canvasWidth / 2) - 100) + 'px'});

  $('#finalscreen').css({opacity: 1, visibility: 'visible'});

  gametimer = setInterval(function() {
    $('#finalholder').css({top: '-=5px'});
    if ($('#finalholder').position().top == 0) {
      if (soundenabled) fx[fxenum.longdrumroll].play();
      clearInterval(gametimer);

      gametimer = setInterval(function() {
        if (finaltextindex < finalwords.length) {
          if (finaltextholder.length != finalwords[finaltextindex].length) {
            finaltextcounter++;
            finaltextholder = finalwords[finaltextindex].substring(0, finaltextcounter);
            $('#finalbar').html(finaltextholder);
          }
          else $('#contbtn').css({opacity: 1, visibility: 'visible'});
        }
        else {
          $('#finalbar').html('');
          clearInterval(gametimer);

          tracks[tracksenum.HTC].currentTime = 0;
          if (soundenabled) {
            tracks[tracksenum.HTC].addEventListener('ended', function() {
              this.currentTime = 0;
              this.play();
            }, false);
            tracks[tracksenum.HTC].play();
          }

          gametimer = setInterval(function() {
            if ($('#garyjohnson').position().top != $('#barackobama').position().top) $('#garyjohnson').css({top: '-=1px'});
            else {
              clearInterval(gametimer);

              gametimer = setTimeout( function() {
                $('#barackobama').attr('src', fileRoot + 'candidates/obamaangry.png');
                $('#mittromney').attr('src', fileRoot + 'candidates/romneyangry.png');

                gametimer = setTimeout( function() {
                  $('#barackobama').attr('src', fileRoot + 'candidates/obamaattack.png');
                  $('#mittromney').attr('src', fileRoot + 'candidates/romneyattack.png');

                  var appeasecounter = 0;
                  gametimer = setInterval( function() {
                    appeasecounter++;
                    if (appeasecounter != 100) {
                      if (appeasecounter % 20 == 0) {
                        if (garysource == 0) {
                          garysource = 1;
                          $('#garyjohnson').attr('src', fileRoot + 'candidates/garyappeasingleft.png');
                        }
                        else if (garysource == 1) {
                          garysource = 2;
                          $('#garyjohnson').attr('src', fileRoot + 'candidates/garyappeasingright.png');
                        }
                        else if (garysource == 2) {
                          garysource = 1;
                          $('#garyjohnson').attr('src', fileRoot + 'candidates/garyappeasingleft.png');
                        }
                      }
                      $('#barackobama').css({left: '+=1px'});
                      $('#mittromney').css({left: '-=1px'});
                    }
                    else {
                      clearInterval(gametimer);

                      if (soundenabled) fx[fxenum.wilhelm].play();
                      var fightnumber = 1;
                      $('#barackobama').css({opacity: 0});
                      $('#mittromney').css({opacity: 0});
                      $('#garyjohnson').attr('src', fileRoot + 'objects/fight' + fightnumber + '.png');
                      $('#garyjohnson').css({top: '100px', left: ((canvasWidth - 300) / 2) + 'px'});

                      var punchtimer = 0;
                      var punchaudio = 0;
                      gametimer = setInterval(function() {
                        if (punchtimer != 250) {
                          punchtimer++;
                          if (punchtimer % 20 == 0) {
                            fightnumber++;
                            $('#garyjohnson').attr('src', fileRoot + 'objects/fight' + ((fightnumber % 3) + 1) + '.png');

                            var wouldpunch = Math.floor(Math.random() * 4);
                            if (wouldpunch != 0) {
                              if (punchaudio % 3 == 0) {
                                if (soundenabled) fx[fxenum.punch1].play();
                              }
                              else if (punchaudio % 3 == 1) {
                                if (soundenabled) auxiliarpunch1.play();
                              }
                              else if (punchaudio % 3 == 2) {
                                if (soundenabled) auxiliarpunch2.play();
                              }
                              punchaudio++;
                            }
                          }
                        }
                        else {
                          clearInterval(gametimer);

                          var finalcounter = 0;
                          gametimer = setInterval(function() {
                            finalcounter++;
                            switch(finalcounter) {
                              case 1:
                                $('#final1').css({opacity: 1, visibility: 'visible'});
                              break;
                              case 2:
                                $('#final1').css({opacity: 0, visibility: 'hidden'});
                                $('#final2').css({opacity: 1, visibility: 'visible'});
                              break;
                              case 3:
                                $('#final2').css({opacity: 0, visibility: 'hidden'});
                                $('#final3').css({opacity: 1, visibility: 'visible'});
                              break;
                              case 4:
                                $('#final3').css({opacity: 0, visibility: 'hidden'});
                                $('#final4').css({opacity: 1, visibility: 'visible'});
                              break;
                              case 5:
                                $('#final4').css({opacity: 0, visibility: 'hidden'});
                                $('#final5').css({opacity: 1, visibility: 'visible'});
                                $('#backbtn').css({opacity: 1, visibility: 'visible'});
                              break;
                            }
                          }, 3000);
                        }
                      }, 20);
                    }
                  }, 20);
                }, 2000);
              }, 2000);
            }
          }, 20);
        }
      }, 20);
    }
  }, 20);
}
