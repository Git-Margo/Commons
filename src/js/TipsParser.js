/**
 * Created by lukasz on 2014-10-28.
 */

/**
 * CL:
 1 Jednoręczne
 2 Dwuręczne
 3 Półtoraręczne
 5 Pomocnicze
 4 Dystansowe
 6 Różdżki
 7 Laski
 8 Zbroje
 9 Hełmy
 10 Buty
 11 Rękawice
 12 Pierścienie
 13 Naszyjniki
 14 Tarcze
 15 Neutralne
 16 Konsumpcyjne
 17 Złoto
 18 Klucze
 19 Questowe
 20 Odnawialne
 21 Strzały
 22 Talizmany
 23 Książki
 24 Torby
 25 Błogosławieństwa
 26 Ulepszenia


 1 Jednoręczne
 2 Dwuręczne
 3 Półtoraręczne
 4 Dystansowe
 5 Pomocnicze
 6 Różdżki
 7 Laski
 8 Zbroje
 9 Hełmy
 10 Buty
 11 Rękawice
 12 Pierścienie
 13 Naszyjniki
 14 Tarcze
 15 Neutralne
 16 Konsumpcyjne
 17 Złoto
 18 Klucze
 19 Questowe
 20 Odnawialne
 21 Strzały
 22 Talizmany
 23 Książki
 24 Torby
 25 Błogosławieństwa
 26 Ulepszenia
 */


function createTipSectionsObject() {
  let sectionData = {};
  let optionsData = {};

  let _section = {
    create: null,
    createArrayFromSections: null,
    addOptions: null,
    forceSetData: null,
    checkCssClassOptions: null,
    addWrapperFrommCssClassOptions: null,
    getMaxSegmentIndex: null
  };

  function checkSegmentExist(index) {
    return sectionData[index] ? true : false;
  }

  function createSegmentIfNotExist(index) {
    if (!sectionData[index]) {
      sectionData[index] = {}
    }
  }

  function createOptionIfNotExist(index) {
    if (!optionsData[index]) {
      optionsData[index] = {}
    }
  }

  function elementIsArray(element) {
    return Array.isArray(element);
  }

  function getSectionDataByIndex(index) {
    return sectionData[index];
  }

  _section.getSectionDataByIndex = getSectionDataByIndex;

  _section.getMaxSegmentIndex = function () {
    let maxIndex = 0;

    for (let index in sectionData) {
      let parseIndex = parseInt(index);
      if (parseIndex > maxIndex) {
        maxIndex = parseIndex;
      }
    }

    return maxIndex;
  }

  _section.forceSetData = function (index, data) {
    createSegmentIfNotExist(index);

    sectionData[index] = data;
  }

  _section.addOptions = function (index, data) {
    createOptionIfNotExist(index);

    if (data.cssClass) {

      if (!optionsData[index].cssClass) {
        optionsData[index].cssClass = [];
      }

      optionsData[index].cssClass = optionsData[index].cssClass.concat(data.cssClass);

    }

  }

  _section.checkCssClassOptions = function (index) {

    if (!optionsData[index]) {
      return false;
    }

    return optionsData[index].cssClass ? true : false
  }

  _section.addWrapperFrommCssClassOptions = function (index, data) {
    if (!optionsData[index]) {
      return data;
    }

    let cssClass = optionsData[index].cssClass

    let exist = cssClass && cssClass.length > 0;

    if (!exist) {
      return data;
    }

    return `<div class="${cssClass.join(' ')}">${data}</div>`
  }

  _section.create = function (indexOrData, keyName, val, options) {

    if (indexOrData == null) {
      return;
    }

    let index = null;

    if (!elementIsArray(indexOrData) && typeof indexOrData === "object") {
      index     = indexOrData.sectionIndex;
      keyName   = indexOrData.actualStatName;
      val       = indexOrData.statText;
      options   = indexOrData.options;

    } else {
      index = indexOrData;
    }

    createSegmentIfNotExist(index);

    // console.log(keyName)

    if (!options) {
      options = {};
    }

    if (sectionData[index][keyName]) {
      console.log(`error, keyName ${keyName} exist!`);
      return
    }


    let cssClass = `tip-item-stat-${keyName}`;
    let cssStyle = '';
    let htmlTag = 'div';

    if (options.cssClass && options.cssClass.length > 0) {
      cssClass += " " + options.cssClass;
    }

    let e = options.cssStyle;

    if (options.cssStyle && !elementIsArray(e) && typeof e === "object") {
      let isObject = !elementIsArray(e) && typeof e === "object";

      if (isObject) {
        cssStyle = JSON.stringify(options.cssStyle);
      }
    }

    if (options.htmlTag && options.htmlTag.length > 0) {
      htmlTag = options.htmlTag;
    }

    let cssClassStr = '';

    if (cssClass != '') {
      cssClassStr = ' class="' + cssClass + '"';
    }

    let cssStyleStr = '';

    if (cssStyle != '') {
      cssStyleStr = ' style="' + cssStyle + '"';
    }

    val = `<${htmlTag} ${cssClassStr} ${cssStyleStr}>${val}</${htmlTag}>`;

    sectionData[index][keyName] = val
  }

  _section.createArrayFromSections = (lengthArray, configSections) => {
    // let s	 		= ['','','','','','','','','','','',''];

    let s = Array(lengthArray).fill('');


    for (let indexOfSection = 0; indexOfSection < s.length; indexOfSection++) {

      let oneStr = createOneStrSectionByIndex(indexOfSection, configSections);

      if (oneStr) {
        s[indexOfSection] = oneStr;
      }
    }

    return s;
  }

  function createOneStrSectionByIndex(indexOfSection, configSections) {
    if (!checkSegmentExist(indexOfSection)) {
      return null;
    }

    let _oneSection = getSectionDataByIndex(indexOfSection);


    let oneSection = JSON.parse(JSON.stringify(_oneSection));
    let configData = configSections[indexOfSection];
    let oneStr = '';

    for (let j = 0; j < configData.length; j++) {

      let nameOfConfigStat = configData[j];

      if (isset(oneSection[nameOfConfigStat])) {
        oneStr += oneSection[nameOfConfigStat];
        delete oneSection[nameOfConfigStat];
      }

      if (Object.keys(sectionData[indexOfSection]).length == 0) {
        break;
      }

    }

    for (let k in oneSection) {
      oneStr += oneSection[k];
    }

    return oneStr;
  }

  _section.createOneStrSectionByIndex = createOneStrSectionByIndex

  return _section
}


// function parseOpisStat(data, stats) {
//   data = data.replace(/#DATE#|#YEAR#/g, function (m) {
//     switch (m) {
//       case '#DATE#':
//         if (!isset(stats.created)) return ut_date(unix_time());
//         return ut_date(stats.created);
//       case '#YEAR#':
//         return getYear(stats, 0, 0)
//     }
//   });
//
//
//   data = data.replace(/#YEAR,([-0-9]+),(D|M)#/g, function (m0, m1, m2) {
//     switch (m2) {
//       case "D"  :
//         return getYear(stats, parseInt(m1), 0);
//       case "M"  :
//         return getYear(stats, 0, parseInt(m1));
//       default :
//         console.error(`undefined m2: ${m2}`);
//         return getYear(stats, 0, 0)
//     }
//   });
//
//   return data;
// }

// function getYear(stats, modifyDays, modifyMonths) {
//   if (!isset(stats.created)) {
//     var tmp_date = new Date();
//
//     if (modifyDays) tmp_date.setDate(tmp_date.getDate() + modifyDays);
//     if (modifyMonths) tmp_date.setMonth(tmp_date.getMonth() + modifyMonths);
//
//     return tmp_date.getFullYear();
//   }
//
//   let time = stats.created;
//
//   if (modifyDays || modifyMonths) {
//     var d = new Date(stats.created * 1000);
//
//     if (modifyDays) d.setDate(d.getDate() + modifyDays);
//     if (modifyMonths) d.setMonth(d.getMonth() + modifyMonths);
//
//     time = d.getTime() / 1000;
//   }
//
//   let t = ut_date(time);
//
//   let tArray = t.split(".");
//
//   if (tArray && isset(tArray[2])) {
//     return tArray[2]
//   } else {
//     return t.substr(-4);
//   }
// }

if (!window['_t2']) {
  _t2 = function (m, j, k) {
    var h = isset(k) ? k : "default";
    if (isset(__translations[h]) && isset(__translations[h][m])) {
      var g = __translations[h][m];
      if (isset(j)) {
        for (var l in j) {
          g = g.replace(new RegExp(l, 'g'), '<span class="damage">' + j[l] + '</span>');
        }
      }
      return g;
    }
    return "[T:" + h + "]" + m
  }
}

if (!window['calculateDiffFull']) {
  window.calculateDiffFull = function (s1, s2, color = true) {
    const diff = (s1 - s2) * 1000;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    let dayHidden = d < 1;
    let hourHidden = dayHidden && h < 1;
    let secHidden = d > 0;

    let classes = '';
    if (color) {
      classes = 'green';
      if (hourHidden && m > 4) classes = 'orange';
      if (hourHidden && m <= 4) classes = 'red';
    }

    return `
			<span class="${classes}">
				${!dayHidden ? _t('time_days_short %val%', {'%val%': d}, 'time_diff') : ''}
				${!hourHidden ? _t('time_h_short %val%', {'%val%': h}, 'time_diff') : ''}
				${_t('time_min_short %val%', {'%val%': m}, 'time_diff')}
				${!secHidden ? _t('time_sec_short %val%', {'%val%': s}, 'time_diff') : ''}
			</span>
		`;
  };
}

if (!window['convertTimeToSec']) {
  window.convertTimeToSec = (time) => { // time is 2d / 1h / 65m / 20s etc
    var unit = time.replace(/[0-9]/g, ''); //remove digits
    var value = time.replace(/\D/g, ''); //remove all except digits
    var seconds;
    switch (unit) {
      case 'd':
        seconds = value * 60 * 60 * 24;
        break;
      case 'h':
        seconds = value * 60 * 60;
        break;
      case 'm':
        seconds = value * 60;
        break;
      case 's':
        seconds = value;
        break;
    }
    return seconds;
  };
}

if (!window['convertSecToTime']) {
  window.convertSecToTime = (seconds) => {
    var days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * (24 * 60 * 60);
    var hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    var minutes = Math.floor(seconds / (60));
    seconds -= minutes * (60);
    return {
      "d": days,
      "h": hours,
      "m": minutes,
      "s": seconds
    };
  };
}

if (!window['createTransVal']) {
  window.createTransVal = (val, unit = '', prefix = '', suffix = '', key = '%val%') => ({[key]: `${prefix}${val}${unit}${suffix}`});
}

if (!window['formNumberToNumbersGroup']) {
  window.formNumberToNumbersGroup = function (number) {
    var array = ((number.toString()).split('')).reverse();
    var newArray = [];
    if (number.toString().indexOf('.') > -1) return number;
    for (var i = 0; i < array.length; i++) {
      var bool1 = i % 3 == 0;
      var bool2 = i != 0;
      if (bool1 && bool2) newArray.push(" ");
      newArray.push(array[i]);
    }
    newArray.reverse();
    return newArray.join('');
  };
}

// window.isEquipCl = (cl) => {
//   return cl >= 1 && cl <= 14;
// }

// window.isRanges = (val) => {
//   return val.includes(':') && val.split(':').length > 1;
// }

// window.getRanges = (val) => {
//   const newVal = val.replace(/[\(\)]/g, '');
//   const t = newVal.split(':');
//   return _t('start') + ' ' + formNumberToNumbersGroup(t[0]) + ' ' + _t('stop') + ' ' + formNumberToNumbersGroup(t[1]);
// }

// window.getValOrRanges = (val) => {
//   return isRanges(val) ? getRanges(val) : formNumberToNumbersGroup(val);
// }

// window.getRanges2 = (val) => {
//   if (val.includes(',')) {
//     const t = val.split(',');
//     return `${formNumberToNumbersGroup(t[0])} - ${formNumberToNumbersGroup(t[1])}`;
//   } else {
//     return formNumberToNumbersGroup(val);
//   }
//
// }


window.MargoTipsParser = {
  createEq: function () {
    this.eq = {
      wx: [37, 0, 37, 74, 0, 37, 74, 37, 0, 0],
      wy: [0, 36, 36, 36, 72, 72, 72, 108, 108, 0],
      classes: [
        '',
        _t('cl_onehanded', null, 'eq_cl'),
        _t('cl_twohanded', null, 'eq_cl'),
        _t('cl_bastard', null, 'eq_cl'),
        _t('cl_distance', null, 'eq_cl'),
        _t('cl_helpers', null, 'eq_cl'),
        _t('cl_wands', null, 'eq_cl'),
        _t('cl_staffs', null, 'eq_cl'),
        _t('cl_armor', null, 'eq_cl'),
        _t('cl_helmets', null, 'eq_cl'),
        _t('cl_boots', null, 'eq_cl'),
        _t('cl_gloves', null, 'eq_cl'),
        _t('cl_rings', null, 'eq_cl'),
        _t('cl_neclaces', null, 'eq_cl'),
        _t('cl_shield', null, 'eq_cl'),
        _t('cl_neutral', null, 'eq_cl'),
        _t('cl_usable', null, 'eq_cl'),
        _t('cl_gold', null, 'eq_cl'),
        _t('cl_keys', null, 'eq_cl'),
        _t('cl_quests', null, 'eq_cl'),
        _t('cl_renewable', null, 'eq_cl'),
        _t('cl_arrows', null, 'eq_cl'),
        _t('cl_talisman', null, 'eq_cl'),
        _t('cl_books', null, 'eq_cl'),
        _t('cl_bags', null, 'eq_cl'),
        _t('cl_bless', null, 'eq_cl'),
        _t('cl_improve', null, 'eq_cl'),
        _t('recipe', null, 'recipes'),
        _t('cl_coinage', null, 'eq_cl'),
        _t('cl_arrows', null, 'eq_cl'),
        _t('cl_outfits', null, 'eq_cl'), // 30
        _t('cl_pets', null, 'eq_cl'), // 31
        _t('cl_teleports', null, 'eq_cl'), // 32
      ],
      prof: {
        'w': _t('prof_warrior', null, 'eq_prof'),
        'p': _t('prof_paladyn', null, 'eq_prof'),
        'm': _t('prof_mag', null, 'eq_prof'),
        'h': _t('prof_hunter', null, 'eq_prof'),
        'b': _t('prof_bladedancer', null, 'eq_prof'),
        't': _t('prof_tracker', null, 'eq_prof')
      },
      profs: [
        'w', 'p', 'm', 'h', 'b', 't'
      ],
      weapon: {
        'sw': _t('w_meele', null, 'eq_w'),
        '1h': _t('w_onehanded', null, 'eq_w'),
        '2h': _t('w_twohanded', null, 'eq_w'),
        'bs': _t('w_bastard', null, 'eq_w'),
        'dis': _t('w_distance', null, 'eq_w'),
        'fire': _t('w_fire', null, 'eq_w'),
        'light': _t('w_light', null, 'eq_w'),
        'frost': _t('w_frost', null, 'eq_w'),
        'sh': _t('w_shield', null, 'eq_w'),
        'h': _t('w_helper', null, 'eq_w'),
        'poison': _t('w_poison')
      }
    }
  },
  configHeadSections: {
    0: [],
    1: [],
    2: [],
    3: []
  },
  configSections: {
    0: ['lowreq'],
    1: ["rarity", "dmg", "ac", "act", "expire_duration", "expires", "leczy", "npc_expbon", "pdmg", "resfire", "resfrost", "reslight"],
    2: ['fire', 'frost', 'light', 'pet', 'poison', 'summonparty'],
    3: [
      'abdest', 'absorb', 'absorbm', 'acdmg',
      // 'action|auction', 'action|clandeposit', 'action|deposit', 'action|fatigue', 'action|fightperheal', 'action|flee', 'action|mail', 'action|nloc', 'action|shop',
      'action',
      'adest', 'afterheal', 'afterheal2', 'bag', 'battlestats', 'blok', 'bonus_reselect', 'contra',
      'creditsbon', 'crit', 'critmval', 'critval', 'da', 'di', 'ds', 'dz', 'energybon',
      'endest', 'enfatig', 'enhancement_add', 'enhancement_add_point', 'evade', 'expire_date',
      'force_binding', 'freeskills', 'fullheal', 'gold', 'goldpack', 'heal', 'honorbon', 'hp',
      'hpbon', 'leczy', 'lowcrit', 'lowcritallval', 'lowevade', 'lowheal2turns',
      'manabon', 'manadest', 'manafatig', 'npc_lootbon', 'outfit', 'outfit_selector', 'perheal',
      'pierce', 'pierceb', 'quest_expbon', 'recipe', 'resdmg',
      'resmanaendest', 'respred', 'revive', 'rkeydesc', 'runes', 'sa', 'slow',
      'socket_component', 'socket_enhancer', 'stamina', 'target_rarity', 'timelimit', 'timelimit_upgmax',
      'timelimit_upgs', 'wound'
    ],
    4: [
      'add_battleset', 'add_enhancement_refund', 'add_tab_deposit', 'amount', 'bonus', 'bonus_not_selected', 'btype',
      'cansplit', 'capacity', 'cursed', 'enhancement_refund', 'expadd', 'expaddlvl', 'lvlupgcost', 'lvlupgs',
      'reset_custom_teleport', 'ttl', 'upglvl', 'upgtimelimit', 'wanted_change'
    ],
    5: ['socket_content', 'socket_fleeting_legbon', 'socket_injection_legbon', 'legbon', 'legbon_test', 'townlimit'],
    6: ['furniture', 'nodesc', 'loot'],
    7: ['teleport', 'custom_teleport', 'opis', 'pumpkin_weight'],
    8: [
      'permbound', 'soulbound', 'artisanbon', 'binds', 'artisan_worthless', 'canpreview', 'enhancement_upgrade_lvl',
      'recovered', 'noauction', 'nodepo', 'nodepoclan', 'notakeoff', 'outexchange', 'personal', 'unbind', 'unbind_credits', 'undoupg'
    ],
    9: [
      'target_class', 'reqp', 'maxuselvl', 'maxstatslvl', 'target_min_lvl', 'target_max_lvl', 'lvl', 'lvlnext',
      'item_value',],
    10: [],
    11: ['cmp-header']
  },
  // createCmpSegment: function (section1, cmp, headPart, headIcons, profIcon, i, configSections) {
  // createCmpSegment: function (section1, cmp, headPart, profIcon, i, configSections) {
  createCmpSegment: function (section1, cmp, headPart, i, configSections) {
    var section2 = createTipSectionsObject();

    // this.turboSwich(section2, headPart, headIcons, profIcon, i, false, cmp);
    // this.turboSwich(section2, headPart, profIcon, i, false, cmp);
    this.turboSwich(section2, headPart, i, false, cmp);

    for (let i = 0; i < 12; i++) {
      let sectionData = section2.getSectionDataByIndex(i);
      let cmpSectionClass = 'red';

      if (sectionData == null) {
        continue;
      }

      let sectionStr = section2.createOneStrSectionByIndex(i, configSections);

      section1.create(11, i, sectionStr, {cssClass: cmpSectionClass});
    }

    let sectionData11 = section1.getSectionDataByIndex(11);

    if (sectionData11) {
      let cmpStatName = 'cmp-header';
      let cmpTextClass = 'big red';
      let cmpText = _t('cmp_empty');

      section1.create(11, cmpStatName, cmpText, {cssClass: cmpTextClass});
    }
  },
  getTip: function (i, cmp) {

    // var headIcons = '';
    var profIcon = '';

    var headPart = createTipSectionsObject();
    var section1 = createTipSectionsObject();

    if (typeof (g) == 'undefined') var g = {};

    if (isset(i.name)) {


      let actualHeadStatName = 'item-name';
      let actualHeadStatText = parseItemBB(i.name);

      headPart.create(1, actualHeadStatName, actualHeadStatText, {cssClass: actualHeadStatName});
    }

    if (isset(i.cl)) {

      let actualHeadStatName = 'item-type';
      let actualHeadStatText = _t('itype %type% %value%', {
        '%type%': _t('type'),
        '%value%': this.getEq().classes[i.cl]
      });

      headPart.create(2, actualHeadStatName, actualHeadStatText, {cssClass: actualHeadStatName});
    }

    if (isset(i.getBuildsWithThisItem) && i.getBuildsWithThisItem() != null) {
      const builds = i.getBuildsWithThisItem();

      let actualHeadStatName = 'item-builds';
      let actualHeadStatText = _t('one_battle_set', null, 'builds') + ': ' + builds.join(', ');

      headPart.create(3, actualHeadStatName, actualHeadStatText, {cssClass: actualHeadStatName});
    }

    let valueStatExist = i.pr && (!(isset(i.cl) && i.cl == 25) || (i.loc == 'n' || i.loc == 't' && (isset(i.cl) && i.cl == 25))) && (!(isset(i.cl) && i.cl == 17) || !(isset(i.prc) && i.prc == 'zl'));

    // var array = this.turboSwich(section1, headPart, profIcon, i, cmp);
    this.turboSwich(section1, headPart, i, cmp);
    let valueStatText = null;

    // headIcons = array[0];
    // profIcon = array[0];
    if (cmp) {

      // this.createCmpSegment(section1, cmp, headPart, profIcon, i, this.configSections)
      this.createCmpSegment(section1, cmp, headPart, i, this.configSections)
    }

    if (valueStatExist) {

      valueStatText = _t('item_value %val%', {'%val%': '<span class="val">' + round(i.pr, (i.pr < 10000 ? 10 : 2))}) + '</span>' + getCurrencyIcon(i.prc)

      section1.create(9, 'item_value', valueStatText, {cssClass: "value-item"});
    } else {

    }

    let sFromSection1 = section1.createArrayFromSections(12, this.configSections);


    let hFromHeadPart = headPart.createArrayFromSections(4, this.configHeadSections);


    let html = '';

    for (let i = 1; i < hFromHeadPart.length; i++) {
      let oneData = hFromHeadPart[i];

      if (headPart.checkCssClassOptions(i)) {
        oneData = headPart.addWrapperFrommCssClassOptions(i, oneData);
      }

      html += oneData
    }

    let headIcons2 = headPart.addWrapperFrommCssClassOptions(i, hFromHeadPart[0]);

    html += '<div class="head-icons">' + headIcons2 + '</div>';

    html = '<div class="item-head">' + html + '</div>';


    for (var j in sFromSection1) {
      j = parseInt(j);
      if (sFromSection1[j]) {
        html += '<div class="item-tip-section s-' + j + ((j == 1 || j == 2) && (sFromSection1[j + 1] || sFromSection1[3]) ? ' no-border' : '') + '">';
        html += sFromSection1[j];
        html += '</div>'
      }
    }
    return html;
  },

  getItemCleanClone: function ($i) {
    var clone = $i.clone();
    var attrs = clone[0].attributes;
    clone.css({'top': 0, 'left': 0});
    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].name != 'class') {
        clone.removeAttr(attrs[i].name);
        i--;
      }
    }
    return clone;
  },

  getCanvas: function () {
    var $canvas = $('<canvas>').addClass('canvas-icon');
    $canvas[0].width = 32;
    $canvas[0].height = 48;
    return $canvas;
  },

  prepareDataToCreateSection: function (sectionIndex, actualStatName, statText, options) {
    return {
      sectionIndex: sectionIndex,
      actualStatName: actualStatName,
      statText: statText,
      options: options ? options : {}
    };
  },
/*
  parseLeczy : function (sectionIndex, actualStatName, actualStatVal, eqStatClass, cmpStr) {
    let statText      = null;
    // let sectionIndex  = null;

    if (actualStatVal > 0) {
      statText  = _t2('bonus_leczy %val%', {'%val%': formNumberToNumbersGroup(actualStatVal)}) + cmpStr;
      sectionIndex   = 1;
    } else {
      sectionIndex   = 3;

      if (actualStatVal.split(':').length > 1) {
        var newVal    = actualStatVal.replace(/[\(\)]/g, '');
        var t         = newVal.split(':');

        newVal        = _t('start') + ' ' + formNumberToNumbersGroup(t[0]) + ' ' + _t('stop') + ' ' + formNumberToNumbersGroup(t[1]);
        statText      = _t2('bonus_truje2 %val%', {'%val%': newVal}) + cmpStr;
      } else {
        statText      = _t2('bonus_truje %val%', {'%val%': formNumberToNumbersGroup(Math.abs(actualStatVal))}) + cmpStr;
      }
    }

    return this.prepareDataToCreateSection(sectionIndex, actualStatName, statText, {cssClass: eqStatClass});
  },

  parseLegbonTest: function (sectionIndex, actualStatName, actualStatVal, eqStatClass) {
    let statText = '';
    var b = actualStatVal.split(',');
    switch (b[0]) {
      case 'verycrit' :
      case 'holytouch' :
      case 'curse' :
      case 'pushback' :
      case 'lastheal' :
      case 'critred' :
      case 'resgain' :
      case 'dmgred' :
      case 'cleanse' :
      case 'glare' :
      case 'facade':
      case 'anguish':
      case 'retaliation':
      case 'puncture':
      case 'frenzy':
        statText += 'TEST: ' + _t('legbon_' + b[0], {'%val%': b[1]});
        break;
      default :
        statText += _t2('legbon_undefined %val%', {'%val%': b[0]});
        break;
    }

    // return {
    //   statText: statText,
    //   options: {cssClass: eqStatClass}
    // };

    return this.prepareDataToCreateSection(sectionIndex, actualStatName, statText, {cssClass: eqStatClass});

  },

  parseLegbon: function (sectionIndex, actualStatName, actualStatVal, eqStatClass) {
    let statText = '';

    var b = actualStatVal.split(',');
    var val = null;
    switch (b[0]) {
      case 'verycrit' :
        if (val == null) val = 17;
      case 'holytouch' :
        if (val == null) val = 7;
      case 'curse' :
        if (val == null) val = 9;
      case 'pushback' :
        if (val == null) val = 8;
      case 'lastheal' :
        if (val == null) val = 18;
      case 'critred' :
        if (val == null) val = 25;
      case 'resgain' :
        if (val == null) val = 16;
      case 'dmgred' :
        if (val == null) val = 16;
      case 'cleanse' :
        if (val == null) val = 12;
      case 'glare' :
        if (val == null) val = 9;
      case 'facade':
        if (val == null) val = 13;
      case 'anguish':
        if (val == null) val = 8;
      case 'retaliation':
        if (val == null) val = 16;
      case 'puncture':
        if (val == null) val = 12;
      case 'frenzy':
        if (val == null) val = 2;

        statText += _t('legbon_' + b[0], {'%val%': val});
        break;
      default :
        statText += _t2('legbon_undefined %val%', {'%val%': b[0]});
        break; //'Nieznany bonus: '+b[0]
    }

    // return {
    //   statText: statText,
    //   options: {cssClass: eqStatClass}
    // };

    return this.prepareDataToCreateSection(sectionIndex, actualStatName, statText, {cssClass: eqStatClass});
  },

  parseExpireDuration: function (sectionIndex, actualStatName, actualStatVal) {
    var seconds = convertTimeToSec(actualStatVal);
    var timeObj = convertSecToTime(seconds);
    var t = '';
    for (var x in timeObj) {
      if (timeObj[x] === 0) continue;
      switch (x) {
        case 'd':
          t += _t2('time_days %val%', {'%val%': timeObj[x]}, 'time_diff') + ' ';
          break;
        case 'h':
          t += _t2('time_h %val%', {'%val%': timeObj[x]}, 'time_diff') + ' ';
          break;
        case 'm':
          t += _t2('time_min %val%', {'%val%': timeObj[x]}, 'time_diff') + ' ';
          break;
        case 's':
          t += _t2('time_sec %val%', {'%val%': timeObj[x]}, 'time_diff');
          break;
      }
    }

    let statText = _t2('expire_duration %time%', {'%time%': t});

    // return {
    //   statText: statText,
    //   options: {cssClass: "item-expired"}
    // };

    return this.prepareDataToCreateSection(sectionIndex, actualStatName, statText, {cssClass: "item-expired"});
  },

  parseActionStat: function (sectionIndex, actualStatName, actualStatVal) {
    var c = actualStatVal.split(',');
    let statText = '';
    switch (c[0]) {
      case 'flee':
      case 'mail':
      case 'auction':

        statText = _t(c[0] + '_item_description') + '<br />';
        break;
      case 'nloc':
        if (c[1] == '*') {
          statText = _t('nloc_heros_item_description');
        } else {
          statText = `${_t('nloc_monster_item_description')}: ${c[1]}`;
        }
        break;
      case 'fatigue':
        var f_val = parseInt(c[1]);
        if (f_val > 0) {
          statText = _t2('fatigue_positive %val%', {'%val%': Math.abs(f_val)}, 'newOrder');
        } else {
          statText = _t2('fatigue_negative %val%', {'%val%': Math.abs(f_val)}, 'newOrder');
        }
        break;
      case 'fightperheal':
        if (c.length == 2) {

          statText = _t2('fightperheal %amount%', {'%amount%': c[1] + this.addUnit('%')}, 'newOrder');
        } else if (c.length == 3) {

          statText = _t2('fightperheal %from% %to%', {
            '%from%': c[1] + this.addUnit('%'),
            '%to%': c[2] + this.addUnit('%')
          }, 'newOrder');
        }
        break;
      case 'deposit':
        statText = _t('call_depo');
        break;
      case 'clandeposit':
        statText = _t('call_clandepo');
        break;
      case 'shop':
        statText = _t('call_shop');
        break;
    }

    // return {
    //   statText: statText
    // };

    return this.prepareDataToCreateSection(sectionIndex, actualStatName, statText);

    // section.create(3, this.createCombineStatName(actualStatName, c[0]), statText);

  },

  parseBonusStat: function (sectionIndex, actualStatName, actualStatVal) {

    const [statName, ...statValues] = actualStatVal.split(',');

    const
      prefix = '(+',
      suffix = ')';

    let unit = '';
    let trans;

    switch (statName) {
      case 'critmval':
        unit = '%';
        trans = _t(`bonus_of-${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
        break;
      case 'sa':
        trans = _t('no_percent_bonus_sa %val%', createTransVal((statValues[0] / 100), unit, prefix, suffix));
        break;
      case 'ac':
        trans = _t(`item_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix));
        break;
      case 'act':
      case 'resfire':
      case 'reslight':
      case 'resfrost':
        unit = '%';
        trans = _t(`item_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
        break;
      case 'crit':
      case 'critval':
      case 'resdmg':
        unit = '%';
        trans = _t(`bonus_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
        break;
      case 'slow':
        trans = _t(`bonus_${statName} %val%`, createTransVal((statValues[0] / 100), unit, prefix, suffix));
        break;
      case 'enfatig':
      case 'manafatig':
        trans = _t(`bonus_${statName}`, {
          ...createTransVal(statValues[0], '%', prefix, suffix, '%val1%'),
          ...createTransVal(statValues[1], unit, prefix, suffix, '%val2%')
        });
        break;
      default:
        trans = _t(`bonus_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix));
    }

    let statText = _t('enh_bonus %val%', {'%val%': trans})

    // return {
    //   statText: statText,
    //   options: {cssClass: 'green-stat'}
    // };

    return this.prepareDataToCreateSection(sectionIndex, actualStatName, statText, {cssClass: 'green-stat'});

    // section.create(4, actualStatName, statText, {cssClass: 'green-stat'});
  },
*/

  // turboSwich: function (section, headPart, headIcons, profIcon, i, cmp, missStats) {
  // turboSwich: function (section, headPart, profIcon, i, cmp, missStats) {
  turboSwich: function (section, headPart, i, cmp, missStats) {
    // let isTalisman = false;
    // let expired = false;
    // var cursedFlag, st;
    // var iconStat = {
    //   binds: false,
    //   soulbound: false,
    //   permbound: false,
    //   artisan_worthless: false,
    //   noauction: false,
    //   nodepo: false,
    //   nodepoclan: false,
    //   enhancement_upgrade_lvl: false,
    // };
    let st;
    const allStats = this.getStats(i.stat);

    // if (isset(i.cl) && i.cl === 22) isTalisman = true;

    if (missStats) st = missStats;
    else {
      st = i.stat.split(';');
      // cursedFlag = st.indexOf('cursed') >= 0;

    }
    for (var k in st) {
      if (!missStats && typeof (st[k]) != 'string') continue;//IE8 FIX
      var a;

      if (missStats) a = [k, missStats[k]];
      else a = st[k].split('=');

      let actualStatName  = a[0];
      let actualStatVal   = a[1];

      var cmpStr          = this.cmpVal(actualStatName, cmp, actualStatVal);
      let eqStatClass     = this.getClassOfStatOnlyInEqItem(cmp, actualStatName)

      let dataToParseStat = {
        actualStatName  : actualStatName,
        actualStatVal   : actualStatVal,
        eqStatClass     : eqStatClass,
        cmpStr          : cmpStr,
        cmp             : cmp,
        itemData        : i,
        allStats,
        missStats
      }

      switch (actualStatName) {
        case 'animation':
          break;
        // case 'name':
        //
        //   section.create(0, this.createCombineStatName("name", 1), parseItemBB(actualStatVal), {htmlTag: "b"});
        //   section.create(0, this.createCombineStatName("name", 2), parseItemBB(i.name), {htmlTag: "i"});
        //
        //   break;
        case 'rarity':
          if (missStats) break;
          // var type = cursedFlag ? _t('type_cursed') + ' ' + (_t('tip_' + actualStatVal)).toLowerCase() : _t('tip_' + actualStatVal);

          headPart.addOptions(1, {cssClass: [actualStatVal]});

          // let rarityCl = 'item-rarity ' + actualStatVal;

          // section.create(1, actualStatName, type, {cssClass: rarityCl});
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'enhancement_upgrade_lvl' :
          // iconStat.enhancement_upgrade_lvl = actualStatVal;
          if (missStats) break;
          let clToAdd = `cl-icon icon-star-${actualStatVal}`;

          headPart.create(0, actualStatName, '', {cssClass: clToAdd});
          break;
        case 'bonus' :
          if (missStats) break;
          section.create(this.statsParser.parseStat(dataToParseStat));

          /*
          const [ statName, ...statValues ] = actualStatVal.split(',');
          const
            prefix = '(+',
            suffix = ')';
          let unit = '';
          let trans;
          switch (statName) {
            case 'critmval':
              unit = '%';
              trans = _t(`bonus_of-${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
              break;
            case 'sa':
              trans = _t('no_percent_bonus_sa %val%', createTransVal((statValues[0]/100), unit, prefix, suffix));
              break;
            case 'ac':
              trans = _t(`item_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix));
              break;
            case 'act':
            case 'resfire':
            case 'reslight':
            case 'resfrost':
              unit = '%';
              trans = _t(`item_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
              break;
            case 'crit':
            case 'critval':
            case 'resdmg':
              unit = '%';
              trans = _t(`bonus_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
              break;
            case 'slow':
              trans = _t(`bonus_${statName} %val%`, createTransVal((statValues[0]/100), unit, prefix, suffix));
              break;
            case 'enfatig':
            case 'manafatig':
              trans = _t(`bonus_${statName}`, {
                ...createTransVal(statValues[0], '%', prefix, suffix, '%val1%'),
                ...createTransVal(statValues[1], unit, prefix, suffix, '%val2%')
              });
              break;
            default:
              trans = _t(`bonus_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix));
          }

          statText = _t('enh_bonus %val%', { '%val%': trans })


          section.create(4, actualStatName, statText, {cssClass: 'green-stat'});
          */
          break;
        case 'bonus_not_selected':
          // statText = _t('bonus_not_selected');
          //
          // section.create(4, actualStatName, statText, {cssClass: 'red-stat'});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'cursed' :

          if ((cmp || missStats)) break;

          // statText = _t('item_' + actualStatName);
          //
          // section.create(4, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        // case 'upg' :
        //   if (missStats) break;
        //   var tmpS = this.getStats(i.stat);
        //
        //   let actualHeadStatName = 'upg';
        //   let actualHeadStatText = '* ' + _t('type_modification %val%', {'%val%': actualStatVal}) + ' *';
        //
        //   headPart.create(3, actualHeadStatName, actualHeadStatText, {cssClass: actualStatName});
        //
        //   if (isset(tmpS.upgby)) {
        //
        //     statText = _t('type_modification_upgb %val% %name%', {'%val%': actualStatVal, '%name%': tmpS.upgby});
        //
        //
        //     section.create(7, actualStatName, statText, {cssClass: "yellow-stat"});
        //
        //   }
        //   break;

        // case 'improve':
        // 	var tmp = actualStatVal.split(',');
        // 	var mpx = 1;
        // 	switch (tmp[0]) {
        // 		case 'armor':
        // 		case 'jewels':
        // 			mpx = 1.3;
        // 			break;
        // 		case 'armorb':
        // 		case 'weapon':
        // 			mpx = 1;
        // 			break;
        // 	}
        // 	let impT = _t('improves %items%', {'%items%': _t('improve_' + tmp[0])}) + '<br />';
        // 	impT += _t2('types_list %upg_normal% %upg_uni% %upg_hero%', {
        // 			'%upg_normal%': Math.round(mpx * tmp[1]) + this.addUnit('%'),
        // 			'%upg_uni%': Math.round(mpx * tmp[1] * 0.7) + this.addUnit('%'),
        // 			'%upg_hero%': Math.round(mpx * tmp[1] * 0.4) + this.addUnit('%')
        // 		}, 'newOrder') + '<br />';
        //
        // 	impT += _t2('improve_item_bound_info');
        //
        //
        //
        // 	section.create(3, actualStatName, impT);
        //
        // 	break;
        // case 'upgby':
        //   break;
        case 'lowreq' :
          if (!actualStatVal || cmp || missStats) break;


          // statText = '* ' + _t2('type_lower_req %val%', {'%val%': actualStatVal}) + ' *';
          // section.create(0, actualStatName, statText, {cssClass: 'upgraded', htmlTag: 'b'});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;

        case 'ac' :

          // statText = _t2('item_ac %val%', {'%val%': formNumberToNumbersGroup(actualStatVal)}) + cmpStr;
          // section.create(1, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'act' :
        case 'resfire' :
        case 'reslight' :
        case 'resfrost' :

          // statText = _t2('item_' + actualStatName + ' %val%', {'%val%': mp(actualStatVal) + this.addUnit('%')}, 'newOrder') + this.addUnitAndDeleteTag(cmpStr, '%');
          // section.create(1, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'dmg'  :
          // var b = actualStatVal.split(',');
          // var cmpStr1 = this.cmpVal(actualStatName, cmp, b[0], false, [0, ',']);
          // var cmpStr2 = this.cmpVal(actualStatName, cmp, b[1], false, [1, ',']);
          // const defaultTranslation = 'item_dmg %val%';
          // const translation = i.cl !== 4 ? defaultTranslation : 'item_distance_dmg %val%';
          //
          // statText = _t2(translation, {'%val%': getRanges2(actualStatVal)}) + cmpStr1 + cmpStr2;
          // section.create(1, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'pdmg' :
        // case 'perdmg' :
        // case 'zr'   :
        // case 'sila'  :
        //
        //   statText = _t2('item_' + actualStatName + ' %val%', {'%val%': actualStatVal}) + cmpStr;
        //   section.create(1, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'lowcritallval' :
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal + this.addUnit('%')}, 'newOrder') + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'lowheal2turns' :
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal}, 'newOrder') + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        // case 'resacdmg' :
        //   statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal}, 'newOrder') + cmpStr;
        //
        //   section.create(3, actualStatName, statText, {cssClass: eqStatClass});
        //
        //   break;
        case 'resmanaendest' :
          // var v = Math.max(1, Math.round(actualStatVal * 0.444));
          // var cmpStr2 = this.cmpVal(actualStatName, cmp, actualStatVal, 0.444, false, {roundOnFinal: true});
          //
          // statText = _t2('bonus_resmanaendest %val%', {'%val%': actualStatVal + cmpStr, '%val2%': v + cmpStr2});
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        // case 'int'  :
        //
        //   statText = _t2('item_int %val%');
        //   section.create(1, actualStatName, statText);
        //
        //   break; //'Atak magiczny<br>'

        // /*************** SKILLS */
        // case 'str' :
        // case 'of-str' :
        // case 'agi'  :
        // case 'firebon'  :
        // case 'lightbon'  :
        // case 'frostbon'  :
        //
        //   statText = _t2('skill_' + actualStatName + ' %val%', {'%val%': actualStatVal}) + cmpStr;
        //   section.create(2, actualStatName, statText, {cssClass: eqStatClass});
        //
        //   break;
        // case 'critslow' :
        // case 'critsa' :
        // case 'lastcrit' :
        // case 'decevade' :
        // case 'redslow' :
        // case 'woundred' :
        // case 'healpower' :
        // case 'engback' :
        // case 'sa-clothes'  :
        // case 'red-sa'  :
        // case 'footshoot'  :
        // case 'critwound'  :
        // case 'swing' :
        // case 'distract' :
        // case 'injure' :
        // case 'reusearrows' :
        // case 'pcontra' :
        // case 'fastarrow' :
        // case 'bandage' :
        // case 'set' :
        // case 'fireshield' :
        // case 'frostshield' :
        // case 'lightshield' :
        // case 'longfireshield' :
        // case 'longfrostshield' :
        // case 'longlightshield' :
        // case 'soullink' :
        // case 'poisonbon' :
        // case 'of-thirdatt' :
        // case 'woundchance' :
        // case 'wounddmgbon' :
        // case 'arrowrain' :
        // case 'insult' :
        // //case 'frostpunch'  :
        // case 'redstun' :
        //   statText = _t2('skill_' + actualStatName + ' %val%', {'%val%': actualStatVal}) + cmpStr;
        //
        //   section.create(3, actualStatName, statText, {cssClass: eqStatClass});
        //   break;
        // case 'frostpunch'  :
        // case 'lightmindmg' :
        // case 'actdmg'  :
        // case 'hpsa'  :
        // case 'mresdmg' :
        //
        //   statText = _t2('skill_' + actualStatName + ' %val%', {'%val%': actualStatVal}) + cmpStr;
        //   section.create(2, actualStatName, statText, {cssClass: eqStatClass});
        //   // section.create(this.statsParser.parseStat(dataToParseStat));
        //   break;
        // case 'rage' :
        //   var bool = parseInt(actualStatVal) > 1;
        //
        //   statText = _t2('skills_rage %val% %turn%', {
        //     '%val%': actualStatVal + cmpStr,
        //     '%turn%': (bool ? _t2('turns') : _t2('turn'))
        //   });
        //
        //   section.create(3, actualStatName, statText, {cssClass: eqStatClass});
        //
        //   break;
        case 'doubleshoot' :
          break;
        // case 'disturb' :
        //   var v = parseInt(actualStatVal) * 2;
        //   var cmpStr2 = this.cmpVal(actualStatName, cmp, actualStatVal, 2);
        //
        //   statText = _t2('skills_disturb %val%', {'%val%': actualStatVal + cmpStr, '%val2%': v + cmpStr2});
        //
        //   section.create(3, actualStatName, statText, {cssClass: eqStatClass});
        //
        //   break;
        // case 'shout' :
        //   statText = _t2('skills_shout %val%', {'%val%': actualStatVal > 1 ? _t2('enemies %amount%', {'%amount%': actualStatVal + cmpStr}) : _t2('oneenemy')});
        //
        //   section.create(3, actualStatName, statText, {cssClass: eqStatClass});
        //
        //   break;
        case 'reqw' :

          break;
        // case 'rskl' :
        //   if (isset(i.tmpSkills) && isset(i.tmpSkills.names)) {
        //     b = actualStatVal.split('-');
        //     let clClass = '';
        //
        //     if (isset(i.tmpSkills.names[b[0]])) {
        //       clClass = 'att' + ((b[1] > i.tmpSkills.names[b[0]].l) ? ' noreq' : '')
        //
        //       statText = _t2('skills_req_skill') + '<br>&nbsp;&nbsp;&nbsp;' + (isset(i.tmpSkills.names[b[0]]) ? i.tmpSkills.names[b[0]].n : '???') + ' (' + b[1] + ')';
        //
        //     } else {
        //       clClass = 'att noreq';
        //
        //       statText = 'error'
        //     }
        //
        //     section.create(9, actualStatName, statText, {cssClass: clClass, htmlTag: 'b'});
        //   }
        //   break;

        case 'hp'   :
          // statText = _t2('bonus_hp %val%', {'%val%': mp(actualStatVal)}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        // case 'sa1'  :
        case 'sa'   :
          // var v = actualStatVal / 100;
          // cmpStr = this.cmpVal(actualStatName, cmp, actualStatVal, 0.01);
          //
          // statText = _t2('no_percent_bonus_sa %val%', {'%val%': mp(v)}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'creditsbon' :
        /*
          statText = null;
          if (actualStatVal && actualStatVal > 1) {

            // statText = _t2('bonus_creditsbon %val%', {'%val%': actualStatVal}) + cmpStr;
            // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

            section.create(
              3,
              actualStatName,
              _t2('bonus_creditsbon %val%', {'%val%': actualStatVal}) + cmpStr,
              {cssClass: eqStatClass}
            );

          } else {

            // statText = _t2('bonus_creditsbon');
            // section.create(3, actualStatName, statText);

            section.create(
              3,
              actualStatName,
              _t2('bonus_creditsbon')
            );
          }
*/
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'leczy' :
          // if (actualStatVal > 0) {
          //
          //   statText = _t2('bonus_leczy %val%', {'%val%': formNumberToNumbersGroup(actualStatVal)}) + cmpStr;
          //   section.create(1, actualStatName, statText, {cssClass: eqStatClass});
          //
          // } else {
          //   if (actualStatVal.split(':').length > 1) {
          //     var newVal = actualStatVal.replace(/[\(\)]/g, '');
          //     var t = newVal.split(':');
          //     newVal = _t('start') + ' ' + formNumberToNumbersGroup(t[0]) + ' ' + _t('stop') + ' ' + formNumberToNumbersGroup(t[1]);
          //     statText = _t2('bonus_truje2 %val%', {'%val%': newVal}) + cmpStr;
          //   } else {
          //
          //     statText = _t2('bonus_truje %val%', {'%val%': formNumberToNumbersGroup(Math.abs(actualStatVal))}) + cmpStr;
          //   }
          //
          //   section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          //
          // }

          // let leczyStatData = this.statsParser.leczy(null, actualStatName, actualStatVal, eqStatClass, cmpStr);

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'perheal' :
          /*
          if (actualStatVal > 0) {

            statText = _t2('bonus_perheal %val%', {'%val%': actualStatVal + this.addUnit('%')}, 'newOrder') + cmpStr;
          } else {

            statText = _t2('bonus_perheal_minus %val%', {'%val%': Math.abs(actualStatVal) + this.addUnit('%')}) + cmpStr;
          }

          section.create(3, actualStatName, statText, {cssClass: eqStatClass});
*/
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'fullheal' :
          // var v = round(actualStatVal, 2);
          // statText = _t2('bonus_fullheal %val%', {'%val%': v}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'stamina' :
          // statText = _t2('stamina %val%', {'%val%': actualStatVal}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'crit' :
        case 'critval' :
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': (actualStatVal.startsWith('-') ? '' : '+') + actualStatVal + this.addUnit('%')}, 'newOrder') + this.addUnitAndDeleteTag(cmpStr, '%');
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'pierceb' :

          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal + this.addUnit('%')}, 'newOrder') + this.addUnitAndDeleteTag(cmpStr, '%');
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'contra' :
        //case 'lowcrit' :
        case 'respred' :
        case 'pierce' :
        case 'resdmg' :

          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal + this.addUnit('%')}, 'newOrder') + cmpStr;
          //
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        //case 'of-crit' :
        //case 'of-critval' :
        //case 'critmval_f' :
        //case 'critmval_c' :
        //case 'critmval_l' :
        //case 'parry' :
        //case 'resdmg' :
        //case 'stun' :
        //case 'freeze' :
        //case 'hpcost' :
        //case 'cover' :
        //case 'allslow' :
        //case 'lowdmg' :
        //case 'sunreduction' :
        //case 'arrowblock' :
        //case 'absorbd' :
        //	s[3] += eqStat + _t2('bonus_' +  actualStatName + ' %val%', {'%val%': actualStatVal}) + cmpStr + '</span><br>';
        //	break;
        case 'lowcrit' :
        case 'heal' :
        case 'adest' :
        case 'absorb' :
        case 'absorbm' :
        //case 'hpbon' :
        case 'acdmg' :
        //case 'en-regen' :
        //case 'manastr' :
        //case 'manarestore' :
        //case 'manatransfer' :
        //case 'firearrow':
        //case 'firepunch':
        //case 'firebolt' :
        //case 'firewall' :
        //case 'thunder' :
        //case 'storm' :
        case 'lowevade' :
        //case 'healall' :
        //case 'heal1' :
        //case 'blizzard' :
        case 'abdest' :
        case 'endest' :
        case 'manadest' :
        case 'honorbon':

          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': formNumberToNumbersGroup(actualStatVal)}) + cmpStr;
          //
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'enhancement_add':
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal + this.addUnit('%')}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'enhancement_add_point':
          // statText = _t2('bonus_' + actualStatName);
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'add_enhancement_refund':
        case 'reset_custom_teleport':
        case 'add_tab_deposit':

          // statText = _t2('bonus_' + actualStatName);
          //
          //
          // section.create(4, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'add_battleset':

          // statText = _t2(actualStatName);
          //
          // section.create(4, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'enhancement_refund' :
          // statText = _t2('bonus_' + actualStatName);
          //
          //
          // if (actualStatVal > 1) {
          //
          //   statText += '<br>' + _t2('bonus_' + actualStatName + '_amount', {'%val%': actualStatVal});
          //
          // }
          //
          // section.create(4, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'manafatig':
        case 'enfatig':
          // const p = actualStatVal.split(',');
          // var cmpStr_1 = this.cmpVal(actualStatName, cmp, p[0], false, [0, ',']);
          // var cmpStr_2 = this.cmpVal(actualStatName, cmp, p[1], false, [1, ',']);
          //
          // statText = _t2('bonus_' + actualStatName, {
          //   '%val1%': mp(p[0]) + cmpStr_1 + this.addUnit('%'),
          //   '%val2%': p[1] + cmpStr_2
          // });
          //
          // section.create(3, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'quest_expbon':

          // if (actualStatVal > 0) {
          //   statText = _t2('bonus_' + actualStatName + ' higher %val%', {'%val%': actualStatVal + this.addUnit('%')}) + cmpStr;
          // } else {
          //   statText = _t2('bonus_' + actualStatName + ' lower %val%', {'%val%': actualStatVal + this.addUnit('%')}) + cmpStr;
          // }
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'hpbon' :
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal}, 'newOrder') + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat))
          break;

        case 'expadd':
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal});
          //
          // section.create(4, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;

        case 'expaddlvl':
          // var b = actualStatVal.split(',');
          // let lvl = b[0];
          // if (typeof Engine != 'undefined' && getHeroLevel() < b[0]) {
          //   lvl = getHeroLevel()
          // }
          //
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': b[1], '%val2%': lvl});
          //
          // section.create(4, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;

        case 'lvlnext':
          if (cmp || missStats) break;

          // statText = _t('match_bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal});
          //
          // section.create(9, actualStatName, statText, {cssClass: "lvl-next"});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'lvlupgcost':
        case 'lvlupgs':
          if (cmp || missStats) break;

          // statText = _t2('match_bonus_' + actualStatName + ' %val%', {'%val%': actualStatVal});
          //
          //
          // section.create(4, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'upglvl':
//           statText = _t2('match_bonus_' + actualStatName + ' %val%', {'%val%': _t(actualStatVal)});
//
//           section.create(4, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;

        case 'fire' :
          // var b = actualStatVal.split(',');
          // var cmpStr1 = this.cmpVal(actualStatName, cmp, b[0], false, [0, ',']);
          //
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': getRanges2(actualStatVal)}, 'newOrder') + cmpStr1;
          // section.create(2, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'light' :
          // var b = actualStatVal.split(',');
          // var cmpStr1 = this.cmpVal(actualStatName, cmp, b[0], false, [0, ',']);
          // var cmpStr2 = this.cmpVal(actualStatName, cmp, b[1], false, [1, ',']);
          //
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': getRanges2(actualStatVal)}, 'newOrder') + cmpStr1 + cmpStr2;
          // section.create(2, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'critmval' :

          // statText = _t2('bonus_of-' + actualStatName + ' %val%', {'%val%': (actualStatVal.startsWith('-') ? '' : '+') + actualStatVal + this.addUnit('%')}, 'newOrder') + this.addUnitAndDeleteTag(cmpStr, '%');
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'blok' :

          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': mp(actualStatVal)}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'evade' :
        case 'manabon' :
        //case 'managain' :
        //case 'aura-ac' :
        //case 'aura-resall' :
        case 'ds'   :
        case 'dz'   :
        case 'di'   :
        case 'da'   :
        case 'runes' :
        case 'goldpack' :
        case 'energybon' :

          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': mp(actualStatVal)}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'target_rarity' :
          // let itemTypeTrans = _t(`type_${actualStatVal}`);
          // statText = _t2(`bonus_${actualStatName} %val%`, {'%val%': itemTypeTrans});
          //
          // section.create(3, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'bonus_reselect' :

          // statText = _t(`bonus_${actualStatName}`);
          //
          // section.create(3, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'force_binding' :
        case 'socket_component' :
        case 'socket_enhancer' :

          // statText = _t(`${actualStatName}`);
          //
          // section.create(3, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'gold' :
          // if (actualStatVal.split(':').length > 1) {
          //   var newVal = actualStatVal.replace(/[\(\)]/g, '');
          //   var t = newVal.split(':');
          //   newVal = _t('start') + ' ' + formNumberToNumbersGroup(t[0]) + ' ' + _t('stop') + ' ' + formNumberToNumbersGroup(t[1]);
          // } else newVal = '+' + formNumberToNumbersGroup(actualStatVal);
          //
          // statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': newVal}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'revive':
          // if (actualStatVal.split(':').length > 1) {
          //   var newVal = actualStatVal.replace(/[\(\)]/g, '');
          //   var t = newVal.split(':');
          //   newVal = _t('start') + ' ' + t[0] + ' ' + _t('stop') + ' ' + t[1];
          //
          //   statText = _t2('revive2 %amount%', {'%amount%': actualStatVal}, 'newOrder') + cmpStr;
          // } else {
          //
          //   statText = _t2('revive %amount%', {'%amount%': actualStatVal}, 'newOrder') + cmpStr;
          // }
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'frost' :

          // b = actualStatVal.split(',');
          // var v = (b[0] / 100);
          // var cmpStr1 = this.cmpVal(actualStatName, cmp, b[1], false, [1, ',']);
          // var cmpStr2 = this.cmpVal(actualStatName, cmp, b[0], 0.01, [0, ',']);
          //
          //
          // statText = _t2('bonus_frost %val% %slow%', {
          //   '%val%': formNumberToNumbersGroup(b[1]) + cmpStr1,
          //   '%slow%': v + cmpStr2
          // }, 'newOrder');
          // section.create(2, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'poison' :

          // b = actualStatVal.split(',');
          // var v = b[0] / 100;
          // var cmpStr1 = this.cmpVal(actualStatName, cmp, b[1], false, [1, ',']);
          // var cmpStr2 = this.cmpVal(actualStatName, cmp, b[0], 0.01, [0, ',']);
          //
          // statText = _t2('bonus_poison %val% %slow%', {
          //   '%val%': formNumberToNumbersGroup(b[1]) + cmpStr1,
          //   '%slow%': v + cmpStr2
          // }, 'newOrder');
          // section.create(2, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'slow' :
          // var v = actualStatVal / 100;
          // cmpStr = this.cmpVal(actualStatName, cmp, actualStatVal, 0.01);
          // statText = _t2('bonus_slow %val%', {'%val%': v}) + cmpStr;
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'wound' :

          // b = actualStatVal.split(',');
          // var cmpStr1 = this.cmpVal(actualStatName, cmp, b[0], false, [0, ',']);
          // var cmpStr2 = this.cmpVal(actualStatName, cmp, b[1], false, [1, ',']);
          //
          // statText = _t2('bonus_wound %val% %dmg%', {
          //   '%val%': b[0] + cmpStr1 + this.addUnit('%'),
          //   '%dmg%': formNumberToNumbersGroup(b[1]) + cmpStr2
          // }, 'newOrder');
          //
          // // s[3] += statText;
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;

        // case 'mana' :
        //   if (actualStatVal > 0) {
        //     statText = _t2('bonus_mana1 %val%', {'%val%': actualStatVal});
        //   } else {
        //     statText = _t2('bonus_mana2 %val%', {'%val%': Math.abs(actualStatVal)});
        //   }
        //
        //   statText += cmpStr;
        //
        //   section.create(3, actualStatName, statText, {cssClass: eqStatClass});
        //
        //   break;

        case 'bag'  :
          // var posfix = _l() == 'pl' ? ($.inArray(actualStatVal % 10, [2, 3, 4]) < 0 || actualStatVal >= 6 && actualStatVal <= 19 ? 'ów' : 'y') : (actualStatVal > 1 ? 's' : '');
          //
          // statText = _t2('bonus_bag %val%', {'%val%': actualStatVal}, 'newOrder') + posfix;
          //
          // section.create(3, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;

        case 'rkeydesc' :

          // statText = _t('bonus_rkeydesc', {'%val%': actualStatVal});
          //
          // section.create(3, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'btype'  :
          // const btypes = actualStatVal.split(',')
          // const typeTranslations = [];
          // for (const type of btypes) {
          //   typeTranslations.push(this.getEq().classes[type].toLowerCase());
          // }
          //
          // statText = _t('bonus_btype %val%', {'%val%': typeTranslations.join(', ')});
          //
          // section.create(4, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'afterheal' :
        case 'afterheal2' :
          // debugger;
          // var b = actualStatVal.split(',');
          // var cmpVal1 = this.cmpVal(actualStatName, cmp, b[0], false, [0, ',']);
          // var cmpVal2 = this.cmpVal(actualStatName, cmp, b[1], false, [1, ',']);
          // var firstVal = '<span class="damage">' + b[0] + this.addUnit('%') + '</span>';
          //
          // statText = firstVal + cmpVal1 + _t2('bonus_afterheal2 %val%', {'%val%': formNumberToNumbersGroup(b[1]) + cmpVal2}, 'newOrder');
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'action':
          // let actionStatData = this.parseActionStat(actualStatName, actualStatVal, section);
          // let actionStatData = this.statsParser.parseStat(dataToParseStat);
          section.create(this.statsParser.parseStat(dataToParseStat));
          /*
          var c = actualStatVal.split(',');
					statText = '';
					switch (c[0]) {
						case 'flee':
						case 'mail':
						case 'auction':

							statText = _t(c[0] + '_item_description') + '<br />';
							break;
						case 'nloc':
							if (c[1] == '*') {
								statText =  _t('nloc_heros_item_description');
							} else {
								statText =  `${_t('nloc_monster_item_description')}: ${c[1]}`;
							}
							break;
						case 'fatigue':
							var f_val = parseInt(c[1]);
							if (f_val > 0) {
								statText =  _t2('fatigue_positive %val%', {'%val%': Math.abs(f_val)}, 'newOrder' );
							} else {
								statText =  _t2('fatigue_negative %val%', {'%val%': Math.abs(f_val)}, 'newOrder');
							}
							break;
						case 'fightperheal':
							if (c.length == 2) {

								statText =  _t2('fightperheal %amount%', {'%amount%': c[1] + this.addUnit('%')}, 'newOrder');
							}
							else if (c.length == 3) {

								statText =  _t2('fightperheal %from% %to%', {'%from%': c[1] + this.addUnit('%'), '%to%': c[2] + this.addUnit('%')}, 'newOrder');
							}
							break;
						case 'deposit':
							statText =  _t('call_depo');
							break;
						case 'clandeposit':
							statText =  _t('call_clandepo');
							break;
						case 'shop':
							statText =  _t('call_shop');
							break;
					}

					section.create(3, this.createCombineStatName(actualStatName, c[0]), statText);
          */
          break;
        case 'outfit_selector':
          // statText = _t('outfit_selector');
          //
          // section.create(3, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'outfit' :
          // var b = actualStatVal.split(','), tm = '';
          // var changeOn = '';
          // let perm = false;
          // if (b[0] < 1) {
          //   perm = true;
          // } else if (b[0] < 99) tm = _t('amount_min %amount%', {'%amount%': b[0]}, 'newOrder'); //" minut"
          // else if (b[0] < 300) tm = _t('amount_hrs2 %amount%', {'%amount%': round(b[0] / 60)}, 'newOrder'); //" godziny"
          // else tm = _t('amount_hrs %amount%', {'%amount%': round(b[0] / 60)}, 'newOrder'); //" godzin"
          // if (isset(b[2])) changeOn = _t('in') + b[2]; // pl: 'w' / en: 'to'
          //
          // if (perm) {
          //   statText = _t('outfit_change_perm') + changeOn;
          // } else {
          //   statText = _t('outfit_change_for %time%', {'%time%': tm}) + changeOn;
          // }
          //
          // section.create(3, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'battlestats':
          // statText = '';
          // if (typeof Engine != "undefined" && typeof Engine.getStatsForTips != "undefined") {
          //   statText = _t('battlestats', {'%val%': Engine.getStatsForTips(actualStatVal).join('<br/>')});
          // } else if (isset(MargoSkillsParser)) {
          //   statText = _t('battlestats', {'%val%': MargoSkillsParser.getStatsForTips(actualStatVal).join('<br/>')});
          // }
          //
          // section.create(3, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'freeskills':
          // statText = _t2('freeskills', {'%val%': actualStatVal});
          //
          // section.create(3, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'timelimit':
          // statText = ''
          // var b = actualStatVal.split(',');
          //
          // if (b[0] < 1) statText = _t2('timelimit_can be used %val% sec', {'%val%': b[0]});
          // else if (b[0] == 1) statText = _t2('timelimit_can be used %val% minutes2', {'%val%': 1}, 'newOrder');
          // else if (b[0] < 5) statText = _t2('timelimit_can be used %val% minutes2', {'%val%': b[0]}, 'newOrder');
          // else statText = _t2('timelimit_can be used %val% minutes2', {'%val%': b[0]}, 'newOrder');
          //
          // if (isset(b[1])) {
          //   var isCounter = b[1] - unix_time() >= 0;
          //   if (!isCounter) statText += '<br>' + _t('timelimit_readyToUse_now');
          //   else statText += '<br>' + _t2('timelimit_readyToUse_in', {'%val%': calculateDiffFull(b[1], unix_time(), false)});
          // }
          //
          // section.create(3, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'expires' :
          if (cmp || missStats) break;
          // if (actualStatVal - unix_time() < 0) {
          //   expired = true;
          //   statText = _t2('item_expired');
          //   section.create(1, actualStatName, statText, {cssClass: "item-expired expires", htmlTag: "b"});
          // } else {
          //   statText = _t2('valid_expires %date%', {'%val%': calculateDiffFull(actualStatVal, unix_time())});
          //   section.create(1, actualStatName, statText, {cssClass: "item-expired"});
          // }

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'expire_date' :
          if (cmp || missStats) break;

          // statText = _t2('expire_date %date%', {'%date%': actualStatVal});
          //
          // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'expire_duration' :
          if (cmp || missStats) break;
          /*
                    var seconds = convertTimeToSec(actualStatVal);
                    var timeObj = convertSecToTime(seconds);
                    var t = '';
                    for (var x in timeObj) {
                        if(timeObj[x] === 0) continue;
                        switch (x) {
                            case 'd':
                                t += _t2('time_days %val%', { '%val%': timeObj[x] }, 'time_diff') + ' ';
                                break;
                            case 'h':
                                t += _t2('time_h %val%', { '%val%': timeObj[x] }, 'time_diff') + ' ';
                                break;
                            case 'm':
                                t += _t2('time_min %val%', { '%val%': timeObj[x] }, 'time_diff') + ' ';
                                break;
                            case 's':
                                t += _t2('time_sec %val%', { '%val%': timeObj[x] }, 'time_diff');
                                break;
                        }
                    }

					statText = _t2('expire_duration %time%', { '%time%': t });
          section.create(1, actualStatName, statText, {cssClass : "item-expired"});
                    */
          // let expireDurationData = this.statsParser.parseStat(dataToParseStat);
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'ttl' :
          // if (i.cl == 25 && (i.loc == 't' || i.loc == 'n' || i.loc == 'o' || i.loc == 'r' || i.loc == 'd' || i.loc == 'c' || (i.loc == 'g' && (i.st == 0 || i.st == 9)) || (i.loc == 's' && i.st == 0))) {
          //
          //   statText = _t2('ttl1 %date%', {'%val%': actualStatVal}, 'newOrder');
          // } else {
          //
          //   statText = _t2('ttl2 %date%', {'%val%': actualStatVal}, 'newOrder');
          // }
          //
          // statText += cmpStr;
          //
          // section.create(4, actualStatName, statText, {cssClass: eqStatClass});

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'amount':
          // var stats = this.getStats(i.stat);
          // var am = parseInt(stats.amount);
          // var split = true;
          // if (am <= 1) split = false;
          // if (isset(stats.quest)) split = false;
          // var val = getValOrRanges(actualStatVal);
          // var valAndTag = `<span class="amount-text">${val}</span>`;
          // if (i.st != 10) {
          //   if (cmp || missStats) break;
          //   if (cursedFlag) {
          //     statText = _t2('cursed_amount %val%', {'%val%': valAndTag}) + cmpStr
          //   } else {
          //     statText = _t2('amount %val% %split%', {'%val%': valAndTag + cmpStr, '%split%': ''});
          //   }
          //
          //   statText += '</span><br>';
          //
          //   section.create(4, actualStatName, statText, {cssClass: eqStatClass});
          //
          //
          // }
          // break;
          if (cmp || missStats) break;
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'cansplit' :
          // if (i.st == 0 || i.st == 9) {
          //
          //   statText = (parseInt(actualStatVal) ? _t('split_possible') : _t('split_impossible'));
          //
          //   section.create(4, actualStatName, statText);
          // }
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        // case 'nosplit' :
        //
        //   statText = _t('split_impossible');
        //
        //   section.create(4, actualStatName, statText);
        //   break;
        case 'maxuselvl':
          // statText = _t('maxuselvl') + actualStatVal;
          //
          // section.create(9, actualStatName, statText, {cssClass: 'maxuselvl-required'});
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'maxstatslvl':
          // statText = _t('maxstatslvl') + actualStatVal;
          //
          // section.create(9, actualStatName, statText, {cssClass: 'maxstatslvl-required'});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'capacity' :
          if (cmp || missStats) break;
          // if (i.st != 10) {
          //
          //   statText = _t2('capacity %val%', {'%val%': formNumberToNumbersGroup(actualStatVal)});
          //
          //   section.create(4, actualStatName, statText);
          // }

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'noauction':
          if (cmp || missStats) break;
          // var stop = false;
          // for (var k in st) {
          //   if (st[k] == "permbound") stop = true;
          // }
          // if (stop) break;
          //
          // iconStat.noauction = true;
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'nodepo' :
          if (cmp || missStats) break;
          // if (i.cl == 25 && (i.loc == 'g' && (i.st != 0 && i.st != 9))) break;
          //
          // iconStat.nodepo = true;
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'nodepoclan' :
          if (cmp || missStats) break;
          // var stop = false;
          // for (var k in st) {
          //   if (st[k] == "permbound") stop = true;
          // }
          // if (stop) break;
          //
          // iconStat.nodepoclan = true;
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'artisan_worthless' :
          if (missStats) break;
          // iconStat.artisan_worthless = true;
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'artisanbon' :
          if (missStats) break;

          // statText = _t2(`${actualStatName} %val%`, {'%val%': actualStatVal + this.addUnit('%')});
          //
          // section.create(8, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'target_min_lvl' :
        case 'target_max_lvl' :
          if (missStats) break;

          // statText = _t2(`${actualStatName} %val%`, {'%val%': actualStatVal});
          //
          // section.create(9, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'socket_fleeting_legbon' :
        case 'socket_injection_legbon' :
        case 'socket_content' :
        case 'legbon' :
          //s[5] += '<div>';
          // statText = '<div>';
          /*
          statText = '';

          var b = actualStatVal.split(',');
          var val = null;
          switch (b[0]) {
            case 'verycrit' : if (val == null) val = 17;
            case 'holytouch' : if (val == null) val = 7;
            case 'curse' : if (val == null) val = 9;
            case 'pushback' : if (val == null) val = 8;
            case 'lastheal' : if (val == null) val = 18;
            case 'critred' : if (val == null) val = 25;
            case 'resgain' : if (val == null) val = 16;
            case 'dmgred' : if (val == null) val = 16;
            case 'cleanse' : if (val == null) val = 12;
            case 'glare' : if (val == null) val = 9;
            case 'facade': if (val == null) val = 13;
            case 'anguish': if (val == null) val = 8;
            case 'retaliation': if (val == null) val = 16;
            case 'puncture': if (val == null) val = 12;
            case 'frenzy': if (val == null) val = 2;

              statText += _t('legbon_' + b[0], {'%val%': val});
              break;
            default :
              statText += _t2('legbon_undefined %val%', {'%val%': b[0]});
              break; //'Nieznany bonus: '+b[0]
          }

          section.create(5, actualStatName, statText, {cssClass: eqStatClass});
          */

          // let legbonStatData = this.statsParser.parseStat(dataToParseStat);
          // section.create(5, actualStatName, legbonStatData.statText, legbonStatData.options);
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'legbon_test' :
          /*
          statText = '';
          var b = actualStatVal.split(',');
          switch (b[0]) {
            case 'verycrit' :
            case 'holytouch' :
            case 'curse' :
            case 'pushback' :
            case 'lastheal' :
            case 'critred' :
            case 'resgain' :
            case 'dmgred' :
            case 'cleanse' :
            case 'glare' :
            case 'facade':
            case 'anguish':
            case 'retaliation':
            case 'puncture':
            case 'frenzy':
              statText += 'TEST: ' +  _t('legbon_' + b[0], {'%val%': b[1]});
              break;
            default :
              statText += _t2('legbon_undefined %val%', {'%val%': b[0]});
              break;
          }

          section.create(5, actualStatName, statText, {cssClass: eqStatClass});
          */

          // let legbonTestData = this.statsParser.parseStat(dataToParseStat)
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'teleport':
          // let [tp_id, tp_x, tp_y, tp_map] = actualStatVal.split(',');
          //
          // statText = `${_t('teleport')}:<br>${tp_map} (${tp_x},${tp_y}).`;
          //
          // section.create(7, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'custom_teleport':
          // if (a.length == 1) {
          //
          //   statText = _t('dbl_click_to_set');
          //
          //   section.create(7, actualStatName, statText);
          // } else {
          //   let [tp_id, tp_x, tp_y, tp_map] = actualStatVal.split(',');
          //
          //   statText = `${_t('teleport')}:<br>${tp_map} (${tp_x},${tp_y}).`;
          //
          //   section.create(7, actualStatName, statText);
          // }

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'townlimit' :

          // statText = _t('townlimit');
          //
          // section.create(5, actualStatName, statText, {cssClass: "idesc", htmlTag: "i"});

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'furniture' :

          // statText = _t('furniture', null, 'itemtip');
          //
          // section.create(6, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'nodesc'    :
          // statText = _t('nodesc');
          //
          // section.create(6, actualStatName, statText, {cssClass: "idesc", htmlTag: "i"});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'created':
          break;
        case 'recipe':
          // statText = _t('recipe_dbl_click');
          //
          // section.create(3, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'pumpkin_weight':
          // const weight = `${actualStatVal / 1000}kg`;
          // statText = `${_t('pumpkin_weight')} ${weight}`;
          //
          // section.create(7, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'opis':
          // var stats = this.getStats(i.stat);
          if (cmp || missStats) break;
          // actualStatVal = parseOpisStat(actualStatVal, stats);
          //
          // statText = parseItemBB(actualStatVal);
          //
          // section.create(7, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'loot':
          if (cmp || missStats) break;
          // var b = actualStatVal.split(','), gr = '';
          // if (b[2] == 2) gr = _t('with_player');
          // if (b[2] > 2) gr = _t('with_company');
          //
          // statText = htmlspecialchars(_t('loot_with %day% %npc% %grpinf% %name%', {
          //   '%day%': ut_date(b[3]),
          //   '%npc%': b[4],
          //   '%grpinf%': gr,
          //   '%name%': b[0]
          // }))
          //
          // section.create(6, actualStatName, statText, {cssClass: "looter", htmlTag: "i"});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;

        case 'timelimit_upgmax' :

          // statText = _t2('Corecttimelimit_upgmax', {'%val%': actualStatVal});
          //
          // section.create(3, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'upgtimelimit' :
          // statText = _t2('Corectupgtimelimit');
          //
          // section.create(4, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'timelimit_upgs' :
          // statText = _t2('Corecttimelimit_upgs', {'%val%': actualStatVal});
          //
          // section.create(3, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'soulbound' :
          if (cmp || missStats) break;
          // var stop = false;
          // for (var k in st) {
          //   if (st[k] == "permbound") stop = true;
          // }
          // if (stop) break;
          // iconStat.soulbound = true;
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'permbound' :
          if (cmp || missStats) break;
          // iconStat.permbound = true;
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'canpreview' :
          // statText = _t('canpreviewitem');
          //
          // section.create(8, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'recovered' :
          if (cmp || missStats) break;

          // statText = _t('recovered');
          //
          // section.create(8, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'binds' :
          if (cmp || missStats) break;
          // iconStat.binds = true;

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'unbind' :
          // statText = _t('unbind');
          //
          // section.create(8, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'unbind_credits' :
          // statText = _t('unbind_credits');
          //
          // section.create(8, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'undoupg' :
          // statText = _t('undoupg');
          //
          // section.create(8, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'notakeoff' :
          // statText = _t('notakeoff');
          //
          // section.create(8, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'npc_expbon':
          /*
          if (actualStatVal > 0) {

            statText = _t2('npx_expbon higher %amount%', {'%amount%': Math.abs(actualStatVal) + this.addUnit('%')}, 'newOrder')
            section.create(1, actualStatName, statText);

          } else if (actualStatVal < 0) {

            statText = _t2('npx_expbon lower %amount%', {'%amount%': Math.abs(actualStatVal) + this.addUnit('%')}, 'newOrder');
            section.create(1, actualStatName, statText);

          }
*/
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'wanted_change':
          // if (actualStatVal >= 0) {
          //   statText = _t2(`${actualStatName} higher %val%`, {'%val%': Math.abs(actualStatVal)});
          // } else {
          //   statText = _t2(`${actualStatName} lower %val%`, {'%val%': Math.abs(actualStatVal)});
          // }
          //
          // section.create(4, actualStatName, statText);
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'npc_lootbon':
          // statText = _t2('npx_lootbon higher %amount%', {'%amount%': actualStatVal}, 'newOrder');
          //
          // section.create(3, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'lvl' :
          /*
          const itemLevel = actualStatVal;
          var cl = '';
          if (typeof Engine != 'undefined') {
            let heroLevel = getHeroLevel();
            cl = itemLevel > heroLevel ? 'noreq' : '';
          }
          const txt = _t('lvl %lvl%', {'%lvl%': itemLevel});
          const str = '<span class="' + cl + '">' + txt + '</span>';

          statText = str;
          section.create(9, actualStatName, statText, {cssClass: "level-required"});
          */
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'reqp' :
          /*
          var disabled = true;
          var l = actualStatVal.length;
          let profIcon = '';
          for (var j = 0; j < l; j++) {
            var prof = actualStatVal[j];
            profIcon += getAllProfName(prof);
            if (j + 1 != l) profIcon += ', ';
            if (typeof (Engine) != 'undefined') {
              if (Engine.hero.d.prof === prof) disabled = false;
            } else {
              disabled = false;
            }
          }
          var cl = disabled ? 'disabled' : '';

          statText = '<span class="' + cl + '">' + _t('reqp') + ' ' + profIcon + '</span>'
          profIcon = statText;

          section.create(9, actualStatName, statText, {cssClass: "prof-icons-holder"});
          */
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'target_class' :
          // const text = this.parseTargetClass(actualStatVal);
          //
          // statText = `${_t('req_item')}: ${text}`;
          //
          // section.create(9, actualStatName, statText, {cssClass: "target-class"});
          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        // case 'reqgold' :
        // case 'reqs' :
        // case 'reqz' :
        // case 'reqi' :
        //   let regiCl = "att" + (typeof (Engine) != 'undefined' && (actualStatVal > Engine.hero.d.gold) ? ' noreq' : '')
        //
        //   statText = _t2(actualStatName + ' %val%', {'%val%': actualStatVal});
        //   section.create(9, actualStatName, statText, {cssClass: regiCl, htmlTag: 'b'});
        //
        //   break;
        case 'pet':

          // var tmplist = actualStatVal.split(',');
          //
          // statText = '';
          // for (var j = 2; j < tmplist.length; j++) {
          //   if (tmplist[j] == 'elite' || tmplist[j] == 'quest' || tmplist[j] == 'legendary' || tmplist[j] == 'heroic') continue;
          //   var alist = tmplist[j].split('|');
          //   if (alist.length) {
          //
          //     statText = _t2('pet_tasks') + '<br>';
          //     for (var k = 0; k < alist.length; k++) {
          //       statText += '- ' + alist[k].replace(/#.*/, '') + '<br>';
          //     }
          //
          //     section.create(2, actualStatName, statText, {cssClass: "pet-tasks"});
          //   }
          //   break;
          // }
          // if (actualStatVal.match(/,quest/)) {
          //
          //   statText = _t2('pet_logout_hide');
          //   section.create(2, this.createCombineStatName('pet', 2), statText, {cssClass: "pet-tasks"});
          //
          // }

          section.create(this.statsParser.parseStat(dataToParseStat));
          break;
        case 'outexchange':
        case 'personal':

          // statText = _t2(actualStatName);
          //
          // section.create(8, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'summonparty' :

          // statText = _t2('summonparty');
          // section.create(2, actualStatName, statText);

          section.create(this.statsParser.parseStat(dataToParseStat));

          break;
        case 'book' :
        case 'price':
        case 'resp':
        case 'key' :
        case 'mkey' :
        case 'rkey' :
        case 'rlvl' :
        case 'motel' :
        case 'emo' :
        case 'quest' :
        case 'play':
        case 'szablon' :
        case 'null':
        case 'progress' :
        case 'lootbox':
        case 'lootbox2':
          break;
        default:
          if (actualStatName != '') {

            // statText = _t('unknown_stat %val%', {'%val%': actualStatName});

            section.create(3, actualStatName, _t('unknown_stat %val%', {'%val%': actualStatName}));

            console.log(_t('unknown_stat %val%', {'%val%': actualStatName}));
          }
          break; //'Nieznany stat: '+actualStatName+'<br>'
      }
      this.deleteMissStat(cmp, actualStatName, actualStatVal);
    }

    // headIcons = this.checkIconStats(section, iconStat, headIcons, i, expired)

    // return [profIcon];
  },


  checkCorrectContent: function (i, s, sFromSection1) {

    let correct = true;

    for (let iii = 0; iii < 12; iii++) {


      if (s[iii] != sFromSection1[iii]) {
        if (window.message) {
          window.message(`TIP BUG ${iii} ${i.name}`)
        }
        console.error('NOT EQUAL RESULT!', iii, i.name)
        console.log(i.stat)
        console.warn(s[iii]);
        console.warn(sFromSection1[iii]);
        correct = false;
      }
    }

    return correct;
  },
/*
  checkIconStats: function (section, iconStat, headIcons, i, expired) {
    const exceptions = ['enhancement_upgrade_lvl', 'soulbound', 'permbound', 'binds', 'artisan_worthless']
    for (const stat in iconStat) {
      if (iconStat[stat]) {
        if (exceptions.includes(stat)) {
          // const icons = this.statExceptions(section, stat, expired, iconStat, s, i);
          const icons = this.statExceptions(section, stat, expired, iconStat, i);
          if (icons) {
            headIcons += icons;
          }
        } else {
          //s[8] +=_t(stat) + '<br>';
          // let statText =_t(stat) + '<br>';
          let statText = _t(stat);


          // s[8] += statText;
          section.create(8, stat, statText);

          if (typeof _t(stat) === 'undefined') console.log(stat);
        }
      }
      // if (stat === 'enhancement_upgrade_lvl') _class = `star-${iconStat[stat]}`;

      // if (iconStat[stat]) headIcons += `<div class="cl-icon icon-${_class}"></div>`;
    }
    return headIcons;
  },

  statExceptions: function (section, stat, expired, iconStat, i) {
    // const beforeBoundS8 = s[8];

    let statText = null;

    switch (stat) {
      case 'enhancement_upgrade_lvl':
        return `<div class="cl-icon icon-star-${iconStat[stat]}"></div>`;
      case 'permbound':
        if (i.loc == 'n') {
          statText = _t('permbound')
        } else {
          if (i.cl == 22 && !(isset(expired) && expired)) {

            statText = _t('permbound1');
          } else {

            statText = _t('permbound_item');
          }
        }

        section.create(8, stat, statText);
        break;
      case 'soulbound':
        if (i.cl == 22 && !(isset(expired) && expired)) {

          statText = _t('soulbound1');
        } else {

          statText = _t('soulbound2');
        }

        section.create(8, stat, statText);
        break;
      case 'binds':
        if (i.cl == 22) {

          statText = !(isset(expired) && expired) ? _t('binds1') : '';
        } else {

          statText = _t('binds2');
        }

        section.create(8, stat, statText);
        break;
      case 'artisan_worthless':
        if (typeof Engine === "undefined" || getHeroLevel() >= 20) {

          statText = _t(stat);

          section.create(8, stat, statText);
        }
        break;
      default:
        console.log(`No exception for stat: ${stat}.`);
    }

    return null;
  },
*/
  getStats: function (s) {
    s = s.split(';');
    var obj = {};
    for (var i = 0; i < s.length; i++) {
      var pair = s[i].split('=');
      obj[pair[0]] = isset(pair[1]) ? pair[1] : null;
    }
    return obj;
  },

  getEq: function () {
    if (typeof (this.eq) == "undefined") this.createEq();
    return this.eq;
  },

  deleteMissStat: function (cmp, actualStatName, actualStatVal) {
    var k = actualStatName;
    if (!cmp || !cmp[k]) return;
    if (k != 'legbon') delete cmp[k];
    else {
      var tab1 = actualStatVal.split(',');
      var tab2 = cmp[k].split(',');
      if (tab1[0] == tab2[0]) delete cmp[k];
    }
  },

  createCombineStatName: function (statName, statName2) {
    return statName + "|" + statName2;
  },

  cmpVal: function (key, cmp, val, modify, parse, options = {}) {
    const opts = {
      roundOnFinal: false,
      ...options
    }
    if (!cmp || !cmp[key]) return '';
    var overItemStatVal = val;
    var diff;
    var bool = 0;

    if (!cmp[key]) return this.createSpan(1, overItemStatVal);
    var equipItemStatVal = this.getEquipItemStatVal(parse, cmp, key);
    var numeric = this.isNumeric(overItemStatVal, equipItemStatVal);

    if (numeric) {
      diff = Math.abs(overItemStatVal - equipItemStatVal);
      diff = modify ? diff * modify : diff;
      diff = Math.round(diff * 1000) / 1000;
      if (opts.roundOnFinal) diff = Math.round(diff);
      if (diff == 0) return '';
      diff = diff > 0 ? formNumberToNumbersGroup(diff) : diff;
      bool = parseFloat(overItemStatVal) >= parseFloat(equipItemStatVal) ? 1 : 0;
    }
    return this.createSpan(bool, diff);
  },

  createSpan: function (bool, diff) {
    var t = [
      ['red', '-'],
      ['green', '+']
    ];
    var strStart = ' <span class ="';
    var strEnd = ')</span>';
    return strStart + t[bool][0] + '">(' + t[bool][1] + diff + strEnd;
  },

  getEquipItemStatVal: function (parse, cmp, key) {
    if (!parse) return cmp[key];
    var sep = parse[1];
    var v0 = parse[0];
    return cmp[key].split(sep)[v0];
  },

  isNumeric: function (v1, v2) {
    return $.isNumeric(v1) & $.isNumeric(v2);
  },

  addUnitAndDeleteTag: function (data, unit) {
    if (data == '') return '';
    var replace = ')</';
    return data.replace(replace, unit + replace);
  },

  addUnit: function (unit) {
    return unit;
  },

  // statOnlyInEqItem: function (cmp, key) {  // cmp function if stat is only in eq Item
  // 	if (!cmp) return '<span>';
  // 	if (!cmp[key]) return '<span class="green">';
  // 	return '<span>';
  // },

  getClassOfStatOnlyInEqItem: function (cmp, key) {
    if (!cmp) {
      return '';
    }

    if (!cmp[key]) {
      return 'green';
    }

    return '';
  },

  parseTargetClass: function (rawValue) {
    const otherTranslations = {
      EQUIPPABLE: _t('all_equippable'),
      WEAPONS: _t('all_weapons'),
      HANDHELD: _t('all_handheld'),
    };

    let text;

    if (otherTranslations[rawValue]) {
      text = otherTranslations[rawValue];
    } else {
      const cls = rawValue.split(",");
      const translated = cls
        .map(c => {
          const idx = parseInt(c.trim(), 10);
          return this.eq.classes[idx] || null;
        })
        .filter(Boolean);

      if (translated.length === 0) return "";

      text = translated.join(", ");
    }
    return text;
  },
  checkStatExist: function (allStats, statName) {
    return isset(allStats[statName]);
  },
  getRanges2: function (val) {
    if (val.includes(',')) {
      const t = val.split(',');
      return `${formNumberToNumbersGroup(t[0])} - ${formNumberToNumbersGroup(t[1])}`;
    } else {
      return formNumberToNumbersGroup(val);
    }

  },

  getYear: function (stats, modifyDays, modifyMonths) {
    if (!isset(stats.created)) {
      var tmp_date = new Date();

      if (modifyDays) tmp_date.setDate(tmp_date.getDate() + modifyDays);
      if (modifyMonths) tmp_date.setMonth(tmp_date.getMonth() + modifyMonths);

      return tmp_date.getFullYear();
    }

    let time = stats.created;

    if (modifyDays || modifyMonths) {
      var d = new Date(stats.created * 1000);

      if (modifyDays) d.setDate(d.getDate() + modifyDays);
      if (modifyMonths) d.setMonth(d.getMonth() + modifyMonths);

      time = d.getTime() / 1000;
    }

    let t = ut_date(time);

    let tArray = t.split(".");

    if (tArray && isset(tArray[2])) {
      return tArray[2]
    } else {
      return t.substr(-4);
    }
  },

  parseOpisStat: function (data, stats) {
    data = data.replace(/#DATE#|#YEAR#/g, function (m) {
      switch (m) {
        case '#DATE#':
          if (!isset(stats.created)) return ut_date(unix_time());
          return ut_date(stats.created);
        case '#YEAR#':
          return MargoTipsParser.getYear(stats, 0, 0)
      }
    });


    data = data.replace(/#YEAR,([-0-9]+),(D|M)#/g, function (m0, m1, m2) {
      switch (m2) {
        case "D"  :
          return MargoTipsParser.getYear(stats, parseInt(m1), 0);
        case "M"  :
          return MargoTipsParser.getYear(stats, 0, parseInt(m1));
        default :
          console.error(`undefined m2: ${m2}`);
          return MargoTipsParser.getYear(stats, 0, 0)
      }
    });

    return data;
  },

  isRanges: function (val) {
    return val.includes(':') && val.split(':').length > 1;
  },

  getRanges: function (val) {
    const newVal = val.replace(/[\(\)]/g, '');
    const t = newVal.split(':');
    return _t('start') + ' ' + formNumberToNumbersGroup(t[0]) + ' ' + _t('stop') + ' ' + formNumberToNumbersGroup(t[1]);
  },

  getValOrRanges: function (val) {
    return MargoTipsParser.isRanges(val) ? MargoTipsParser.getRanges(val) : formNumberToNumbersGroup(val);
  },

  isInterface: function () {
    return typeof Engine != "undefined" || typeof g != "undefined";
  },

  getStatsForTipsFromInterface: function (actualStatVal, joinTag) {
    let val = '';

    let niInterface = typeof Engine != "undefined";
    let siInterface = typeof g != "undefined";

    if (!niInterface && !siInterface) {
      return '';
    }

    if (niInterface) {
      if (!Engine.getStatsForTips) {
        console.error('Engine.getStatsForTips not exist!')
        return '';
      } else {
        val = Engine.getStatsForTips(actualStatVal);
        if (!val) {
          console.error('incorect result')
          return '';
        }

        return val.join(joinTag);
      }
    }

    if (siInterface) {
      if (!isset(g.skills)) {
        if (!skills) {
          console.error('skills not exist!');
          return '';
        }
        g.skills = new skills();
      }

      if (!g.skills.parseStatsToItemTip) {
        console.error('g.skills.parseStatsToItemTip not exist!');
        return ''
      }

      val = g.skills.parseStatsToItemTip(actualStatVal)

      if (!val) {
        console.error('incorect result')
        return '';
      }

      // return val.join(joinTag);
      return val;
    }

  }
};


window.MargoTipsParser.statsParser =  {
  parseStat: function (data) {

    const actualStatName  = data.actualStatName;
    const actualStatVal   = data.actualStatVal;
    const eqStatClass     = data.eqStatClass;
    const cmpStr          = data.cmpStr          // to remove in future!
    const cmp             = data.cmp
    const itemData        = data.itemData;
    const allStats        = data.allStats;
    const missStats       = data.missStats;
    const oneStatData     = MargoTipsParser.statsData[actualStatName];

    if (!oneStatData) {
      console.error('stat not found!', actualStatName);
      return  MargoTipsParser.prepareDataToCreateSection(2, actualStatName, `UNDEFINED DATA stat: ${actualStatName}`);
    }

    const sectionIndex = oneStatData.sectionIndex;

    let options = {}

    if (oneStatData.eqStatClass || oneStatData.cmpStatStr) {

      options.cssClass = eqStatClass;
    }

    if (oneStatData.cssClass) {

      if (!options.cssClass) {
        options.cssClass = '';
      }
      options.cssClass += ' ' + oneStatData.cssClass;
    }

    if (oneStatData.htmlTag) {
      options.htmlTag = oneStatData.htmlTag;
    }

    if (oneStatData.dataFunc) {

      let resultDataFunc = oneStatData.dataFunc(sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats);

      // console.log('NEW DATAFUNC', data.actualStatName, resultDataFunc.statText);

      return resultDataFunc;
    } else {
      let tName     = null;
      let values    = null;
      let statText  = null;
      let tCategory = null;
      let cmpData   = null;

      if (oneStatData.cmpStatStr) {
        cmpData = this.parseCmpStatStr(oneStatData.cmpStatStr, actualStatName, actualStatVal, cmp)
        // let {cmpStr1, cmpStr2} = this.parseCmpStatStr(oneStatData.cmpStatStr, actualStatName, actualStatVal, cmp)

        // if (cmpStr1 !== null && cmpStr1 !== '') {
        //   statText += cmpStr1
        // }
        //
        // if (cmpStr2 !== null && cmpStr2 !== '') {
        //   statText += cmpStr2;
        // }
      }

      if (oneStatData.values) {
        let cmpDataValues = cmpData && cmpData.values ? cmpData.values : null;
        values = this.parseValues(oneStatData.values, actualStatVal, cmpDataValues);
      }

      if (oneStatData.tCategory) {
        tCategory = oneStatData.tCategory;
      }

      if (oneStatData.tName) {
        tName = oneStatData.tName;
      }

      if (oneStatData.tNameActualStatName) {
        let tNameActualStatName   = oneStatData.tNameActualStatName
        let prefix                = tNameActualStatName.prefix ? tNameActualStatName.prefix : '';
        let suffix                = tNameActualStatName.suffix ? tNameActualStatName.suffix : '';

        tName                     = prefix + actualStatName + suffix;
      }

      if (values) {
        if (tCategory) {
          statText = _t(tName, values, tCategory);
        } else {
          statText = _t(tName, values);
        }
      } else {
        if (tCategory) {
          statText = _t(tName, null, tCategory);
        } else {
          statText = _t(tName);
        }
      }

      if (oneStatData.cmpStatStr && !cmpData.values) {
        let {cmpStr1, cmpStr2} = cmpData;

        if (cmpStr1 !== null && cmpStr1 !== '') {
          statText += cmpStr1
        }

        if (cmpStr2 !== null && cmpStr2 !== '') {
          statText += cmpStr2;
        }
      }

       // console.log('NEW', data.actualStatName, statText);

      if (statText === undefined) {
        console.error('not registered stat translation', actualStatName);
      }

      return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
    }


  },
  parseCmpStatStr: function (cmpStatStrData, actualStatName, actualStatVal, cmp) {
    let cmpStr1 = null;
    let cmpStr2 = null;

    if (cmpStatStrData.values) {
      let values              = cmpStatStrData.values;
      // let actualStatValArray  = actualStatVal.split(',');
      let valuesResult        = {values:{}}

      for (let valueName in values) {
        let data    = values[valueName];
        let modify  = isset(data.modify) ? data.modify : false;
        let result  = null;
        let options = isset(data.options) ? data.options : false;

        if (data.splitActualStatVal) {
          let actualStatValArray  = actualStatVal.split(',');
          let index               = data.splitActualStatVal.index;
          result                  = MargoTipsParser.cmpVal(actualStatName, cmp, actualStatValArray[index], modify, [index, ','], options);
        } else {
          result                  = MargoTipsParser.cmpVal(actualStatName, cmp, actualStatVal, modify, false, options);
        }

        // let result  = MargoTipsParser.cmpVal(actualStatName, cmp, actualStatValArray[index], modify, [index, ',']);

        if (data.unit) {
          result = MargoTipsParser.addUnitAndDeleteTag(result, data.unit);
        }

        valuesResult.values[valueName] = result;
      }

      return valuesResult;
    }

    if (cmpStatStrData.range) {
      let actualStatValArray  = actualStatVal.split(',');

      cmpStr1                 = MargoTipsParser.cmpVal(actualStatName, cmp, actualStatValArray[0], false, [0, ',']);
      cmpStr2                 = MargoTipsParser.cmpVal(actualStatName, cmp, actualStatValArray[1], false, [1, ',']);
    } else {
      let modify              = isset(cmpStatStrData.modify) ? cmpStatStrData.modify : false;
      cmpStr1                 = MargoTipsParser.cmpVal(actualStatName, cmp, actualStatVal, modify);
    }

    if (cmpStatStrData.unit) {
      cmpStr1 = MargoTipsParser.addUnitAndDeleteTag(cmpStr1, cmpStatStrData.unit);

      if (cmpStr2) {
        cmpStr2 = MargoTipsParser.addUnitAndDeleteTag(cmpStr2, cmpStatStrData.unit);
      }
    }

    return {
      cmpStr1: cmpStr1,
      cmpStr2: cmpStr2
    }

  },
  parseValues : function (data, actualStatVal, cmpDataValues) {
    let o = {};
    for (let valueName in data) {
      let options         = data[valueName];
      let value           = null;
      let _actualStatVal  = null;

      if (options.splitActualStatVal) {
        let index         = options.splitActualStatVal.index;
        let valueArray    = actualStatVal.split(',');

        value             = valueArray[index];
      } else {
        value             = actualStatVal
      }

      if (options.modify) {
        value = options.modify(value);
      }

      let unit = options.unit ? options.unit : '';

      if (options.tNameActualStatVal) {
          let tNameActualStatVal    = options.tNameActualStatVal
          let prefix                = tNameActualStatVal.prefix ? tNameActualStatVal.prefix : '';
          let suffix                = tNameActualStatVal.suffix ? tNameActualStatVal.suffix : '';

          let tName                 = prefix + value + suffix;

         _actualStatVal             = _t(tName);
      }

      if (options.range) {
        _actualStatVal = MargoTipsParser.getRanges2(value);
      }

      if (isset(options.round)) {
        _actualStatVal = round(value, options.round);
      }

      if (options.addSignMinusOrPlus) {
        _actualStatVal = mp(value);
      }

      if (options.numbersGroups) {
        _actualStatVal = formNumberToNumbersGroup(value);
      }

      if (_actualStatVal == null) {
        _actualStatVal = value;
      }

      // let _actualStatVal = options.numbersGroups ? formNumberToNumbersGroup(actualStatVal) : actualStatVal;

      if (options.damage) {
        o[valueName] = '<span class="damage">' + _actualStatVal + unit + '</span>'
      } else {
        o[valueName] = _actualStatVal + unit;
      }

      if (cmpDataValues) {
        o[valueName] += cmpDataValues[valueName];
      }

    }

    return o;
  },
  loot: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    var b = actualStatVal.split(','), gr = '';
    if (b[2] == 2) gr = _t('with_player');
    if (b[2] > 2) gr = _t('with_company');

    let statText = htmlspecialchars(_t('loot_with %day% %npc% %grpinf% %name%', {
      '%day%': ut_date(b[3]),
      '%npc%': b[4],
      '%grpinf%': gr,
      '%name%': b[0]
    }))

    // section.create(6, actualStatName, statText, {cssClass: "looter", htmlTag: "i"});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  rarity: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {

    let cursed          = isset(allStats.cursed);
    let statText        = cursed ? _t('type_cursed') + ' ' + (_t('tip_' + actualStatVal)).toLowerCase() : _t('tip_' + actualStatVal);

    options.cssClass    = 'item-rarity ' + actualStatVal;

    // section.create(1, actualStatName, type, {cssClass: rarityCl});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  enhancement_refund: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {

    let statText = _t2('bonus_' + actualStatName);


    if (actualStatVal > 1) {
      statText += '<br>' + _t2('bonus_' + actualStatName + '_amount', {'%val%': actualStatVal});
    }

    // section.create(4, actualStatName, statText);
    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  quest_expbon: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = null;

    if (actualStatVal > 0) {
      statText = _t2('bonus_' + actualStatName + ' higher %val%', {'%val%': actualStatVal + MargoTipsParser.addUnit('%')}) + cmpStr;
    } else {
      statText = _t2('bonus_' + actualStatName + ' lower %val%', {'%val%': actualStatVal + MargoTipsParser.addUnit('%')}) + cmpStr;
    }

    // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  expaddlvl: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let b   = actualStatVal.split(',');
    let lvl = b[0];

    // if (typeof Engine != 'undefined' && getHeroLevel() < b[0]) {
    if (MargoTipsParser.isInterface() && getHeroLevel() < b[0]) {
      lvl = getHeroLevel()
    }

    let statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': b[1], '%val2%': lvl});

    // section.create(4, actualStatName, statText, {cssClass: eqStatClass});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  gold: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {

    if (actualStatVal.split(':').length > 1) {
      var newVal = actualStatVal.replace(/[\(\)]/g, '');
      var t = newVal.split(':');
      newVal = _t('start') + ' ' + formNumberToNumbersGroup(t[0]) + ' ' + _t('stop') + ' ' + formNumberToNumbersGroup(t[1]);
    } else newVal = '+' + formNumberToNumbersGroup(actualStatVal);

    let statText = _t2('bonus_' + actualStatName + ' %val%', {'%val%': newVal}) + cmpStr;

    // section.create(3, actualStatName, statText, {cssClass: eqStatClass});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  bag: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    var posfix = _l() == 'pl' ? ($.inArray(actualStatVal % 10, [2, 3, 4]) < 0 || actualStatVal >= 6 && actualStatVal <= 19 ? 'ów' : 'y') : (actualStatVal > 1 ? 's' : '');

    let statText = _t2('bonus_bag %val%', {'%val%': actualStatVal}, 'newOrder') + posfix;

    // section.create(3, actualStatName, statText);

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  btype: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    const btypes              = actualStatVal.split(',')
    const typeTranslations    = [];

    for (const type of btypes) {
      typeTranslations.push(MargoTipsParser.getEq().classes[type].toLowerCase());
    }

    let statText = _t('bonus_btype %val%', {'%val%': typeTranslations.join(', ')});

    // section.create(4, actualStatName, statText);

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  outfit: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let b         = actualStatVal.split(','), tm = '';
    let changeOn  = '';
    let perm      = false;
    let statText  = null;

    if (b[0] < 1) {
      perm = true;
    } else if (b[0] < 99) tm = _t('amount_min %amount%', {'%amount%': b[0]}, 'newOrder'); //" minut"
    else if (b[0] < 300) tm = _t('amount_hrs2 %amount%', {'%amount%': round(b[0] / 60)}, 'newOrder'); //" godziny"
    else tm = _t('amount_hrs %amount%', {'%amount%': round(b[0] / 60)}, 'newOrder'); //" godzin"

    if (isset(b[2])) changeOn = _t('in') + b[2]; // pl: 'w' / en: 'to'

    if (perm) {
      statText = _t('outfit_change_perm') + changeOn;
    } else {
      statText = _t('outfit_change_for %time%', {'%time%': tm}) + changeOn;
    }

    // section.create(3, actualStatName, statText);
    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  battlestats: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {

    let statText = null;

    // if (typeof Engine != "undefined" && typeof Engine.getStatsForTips != "undefined") {
    if (MargoTipsParser.isInterface()) {
      // statText = _t('battlestats', {'%val%': Engine.getStatsForTips(actualStatVal).join('<br/>')});

      let val = MargoTipsParser.getStatsForTipsFromInterface(actualStatVal, '<br>');

      statText = _t('battlestats', {'%val%': val});
    } else if (isset(MargoSkillsParser)) {
      statText = _t('battlestats', {'%val%': MargoSkillsParser.getStatsForTips(actualStatVal).join('<br/>')});
    }

    // section.create(3, actualStatName, statText);
    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  timelimit: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = null;

    let b = actualStatVal.split(',');

    if (b[0] < 1) statText = _t2('timelimit_can be used %val% sec', {'%val%': b[0]});
    else if (b[0] == 1) statText = _t2('timelimit_can be used %val% minutes2', {'%val%': 1}, 'newOrder');
    else if (b[0] < 5) statText = _t2('timelimit_can be used %val% minutes2', {'%val%': b[0]}, 'newOrder');
    else statText = _t2('timelimit_can be used %val% minutes2', {'%val%': b[0]}, 'newOrder');

    if (isset(b[1])) {
      var isCounter = b[1] - unix_time() >= 0;
      if (!isCounter) statText += '<br>' + _t('timelimit_readyToUse_now');
      else statText += '<br>' + _t2('timelimit_readyToUse_in', {'%val%': calculateDiffFull(b[1], unix_time(), false)});
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  expires: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = null;

    if (actualStatVal - unix_time() < 0) {
      // expired = true;
      statText = _t2('item_expired');
      // section.create(1, actualStatName, statText, {cssClass: "item-expired expires", htmlTag: "b"});
      options.cssClass = "item-expired expires";
      options.htmlTag = "b";
    } else {
      statText = _t2('valid_expires %date%', {'%val%': calculateDiffFull(actualStatVal, unix_time())});
      // section.create(1, actualStatName, statText, {cssClass: "item-expired"});
      options.cssClass = "item-expired";
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  ttl: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = null;

    if (itemData.cl == 25 && (itemData.loc == 't' || itemData.loc == 'n' || itemData.loc == 'o' || itemData.loc == 'r' || itemData.loc == 'd' || itemData.loc == 'c' || (itemData.loc == 'g' && (itemData.st == 0 || itemData.st == 9)) || (itemData.loc == 's' && itemData.st == 0))) {

      statText = _t2('ttl1 %date%', {'%val%': actualStatVal}, 'newOrder');
    } else {

      statText = _t2('ttl2 %date%', {'%val%': actualStatVal}, 'newOrder');
    }

    statText += cmpStr;

    // section.create(4, actualStatName, statText, {cssClass: eqStatClass});
    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  amount: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    // debugger;

    var val         = MargoTipsParser.getValOrRanges(actualStatVal);
    var valAndTag   = `<span class="amount-text">${val}</span>`;
    let statText    = null;
    let cursed      = isset(allStats.cursed);

    if (itemData.st != 10) {
      if (cursed) {
        statText = _t2('cursed_amount %val%', {'%val%': valAndTag}) + cmpStr
      } else {
        statText = _t2('amount %val% %split%', {'%val%': valAndTag + cmpStr, '%split%': ''});
      }

      statText += '</span><br>';

      // section.create(4, actualStatName, statText, {cssClass: eqStatClass});

      return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
    }

    return null;
  },
  cansplit: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    if (itemData.st == 0 || itemData.st == 9) {

      let statText = (parseInt(actualStatVal) ? _t('split_possible') : _t('split_impossible'));

      // section.create(4, actualStatName, statText);

      return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
    }

    return null;
  },
  capacity: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    if (itemData.st != 10) {

      let statText = _t2('capacity %val%', {'%val%': formNumberToNumbersGroup(actualStatVal)});

      // section.create(4, actualStatName, statText);
      return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
    }

    return null;
  },
  opis: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let stats       = MargoTipsParser.getStats(itemData.stat);
    actualStatVal   = MargoTipsParser.parseOpisStat(actualStatVal, stats);

    let statText  = parseItemBB(actualStatVal);

    // section.create(7, actualStatName, statText);

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  npc_expbon: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = null;

    if (actualStatVal > 0) {

      statText = _t2('npx_expbon higher %amount%', {'%amount%': Math.abs(actualStatVal) + MargoTipsParser.addUnit('%')}, 'newOrder')
      // section.create(1, actualStatName, statText);

    } else if (actualStatVal < 0) {

      statText = _t2('npx_expbon lower %amount%', {'%amount%': Math.abs(actualStatVal) + MargoTipsParser.addUnit('%')}, 'newOrder');
      // section.create(1, actualStatName, statText);

    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  lvl: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    const itemLevel = actualStatVal;
    var cl = '';

    // if (typeof Engine != 'undefined') {
    if (MargoTipsParser.isInterface()) {
      let heroLevel = getHeroLevel();
      cl = itemLevel > heroLevel ? 'noreq' : '';
    }

    const txt = _t('lvl %lvl%', {'%lvl%': itemLevel});
    const statText = '<span class="' + cl + '">' + txt + '</span>';

    // statText = str;
    // section.create(9, actualStatName, statText, {cssClass: "level-required"});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  reqp: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    var disabled = true;

    var l = actualStatVal.length;

    let profIcon = '';

    for (var j = 0; j < l; j++) {
      var prof = actualStatVal[j];
      profIcon += getAllProfName(prof);

      if (j + 1 != l) profIcon += ', ';

      // if (typeof (Engine) != 'undefined') {
      if (MargoTipsParser.isInterface()) {
        // if (Engine.hero.d.prof === prof) disabled = false;
        if (getHeroProf() === prof) disabled = false;
      } else {
        disabled = false;
      }
    }

    var cl = disabled ? 'disabled' : '';

    let statText = '<span class="' + cl + '">' + _t('reqp') + ' ' + profIcon + '</span>'
    // profIcon = statText;

    // section.create(9, actualStatName, statText, {cssClass: "prof-icons-holder"});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  target_class: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    // debugger;
    const text = MargoTipsParser.parseTargetClass(actualStatVal);

    let statText = `${_t('req_item')}: ${text}`;

    // section.create(9, actualStatName, statText, {cssClass: "target-class"});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  pet: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let tmplist   = actualStatVal.split(',');
    let statText  = '';

    for (let j = 2; j < tmplist.length; j++) {

      let oneSplitVal = tmplist[j];

      if (oneSplitVal == 'elite' || oneSplitVal == 'quest' || oneSplitVal == 'legendary' || oneSplitVal == 'heroic') {
        continue;
      }

      let actionList = oneSplitVal.split('|');

      if (actionList.length) {

        statText += _t2('pet_tasks') + '<br>';

        for (let k = 0; k < actionList.length; k++) {
          statText += '- ' + actionList[k].replace(/#.*/, '') + '<br>';
        }

        // section.create(2, actualStatName, statText, {cssClass: "pet-tasks"});
      }
      break;
    }

    if (actualStatVal.match(/,quest/)) {

      statText += _t2('pet_logout_hide');
      // section.create(2, this.createCombineStatName(actualStatName, 2), statText, {cssClass: "pet-tasks"});

    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  nodepoclan: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    if (isset(allStats.permbound)) {
      return null;
    }

    let statText = _t(actualStatName);

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  nodepo: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    if (itemData.cl == 25 && (itemData.loc == 'g' && (itemData.st != 0 && itemData.st != 9))) {
      return null;
    }

    let statText = _t(actualStatName);

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  noauction: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    if (isset(allStats.permbound)) {
      return null;
    }

    let statText = _t(actualStatName);

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  artisan_worthless: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    // if (typeof Engine === "undefined" || getHeroLevel() >= 20) {
    if (!MargoTipsParser.isInterface() || getHeroLevel() >= 20) {

      let statText = _t(actualStatName);

      // section.create(8, stat, statText);
      return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
    }

    return null;
  },
  soulbound: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = null;

    if (isset(allStats.permbound)) {
      return null;
    } else {

      if (itemData.cl == 22) {

        if (isset(allStats.expires) && allStats.expires - unix_time() < 0) {

          statText = _t('soulbound2');
        } else {
          statText = _t('soulbound1');
        }

      } else {

        statText = _t('soulbound2');
      }

    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  permbound: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = null;

    if (itemData.loc == 'n') {
      statText = _t('permbound')
    } else {
      let expired = actualStatVal - unix_time() < 0

      if (itemData.cl == 22) {

        if (isset(allStats.expires) && allStats.expires - unix_time() < 0) {
          statText = _t('permbound_item');
        } else {
          statText = _t('permbound1');
        }
      } else {

        statText = _t('permbound_item');
      }
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  binds: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = null;

    if (itemData.cl == 22) {

      if (isset(allStats.expires) && allStats.expires - unix_time() < 0) {
        // statText = '';
        return null;
      } else {
        statText = _t('binds1');
      }

      // let expired = actualStatVal - unix_time() < 0

      // statText = !(isset(expired) && expired) ? _t('binds1') : '';
    } else {

      statText = _t('binds2');
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  leczy: function (sectionIndex, actualStatName, actualStatVal, options, cmpStr) {
    let statText      = null;

    if (actualStatVal > 0) {
      statText  = _t2('bonus_leczy %val%', {'%val%': formNumberToNumbersGroup(actualStatVal)}) + cmpStr;
      sectionIndex   = 1;
    } else {
      sectionIndex   = 3;

      if (actualStatVal.split(':').length > 1) {
        var newVal    = actualStatVal.replace(/[\(\)]/g, '');
        var t         = newVal.split(':');

        newVal        = _t('start') + ' ' + formNumberToNumbersGroup(t[0]) + ' ' + _t('stop') + ' ' + formNumberToNumbersGroup(t[1]);
        statText      = _t2('bonus_truje2 %val%', {'%val%': newVal}) + cmpStr;
      } else {
        statText      = _t2('bonus_truje %val%', {'%val%': formNumberToNumbersGroup(Math.abs(actualStatVal))}) + cmpStr;
      }
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  legbon_test : function (sectionIndex, actualStatName, actualStatVal, options) {
    let statText = '';
    var b = actualStatVal.split(',');
    switch (b[0]) {
      case 'verycrit' :
      case 'holytouch' :
      case 'curse' :
      case 'pushback' :
      case 'lastheal' :
      case 'critred' :
      case 'resgain' :
      case 'dmgred' :
      case 'cleanse' :
      case 'glare' :
      case 'facade':
      case 'anguish':
      case 'retaliation':
      case 'puncture':
      case 'frenzy':
        statText += 'TEST: ' + _t('legbon_' + b[0], {'%val%': b[1]});
        break;
      default :
        statText += _t2('legbon_undefined %val%', {'%val%': b[0]});
        break;
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  legbon : function (sectionIndex, actualStatName, actualStatVal, options) {
    let statText = '';

    var b = actualStatVal.split(',');
    var val = null;
    switch (b[0]) {
      case 'verycrit' :
        if (val == null) val = 17;
      case 'holytouch' :
        if (val == null) val = 7;
      case 'curse' :
        if (val == null) val = 9;
      case 'pushback' :
        if (val == null) val = 8;
      case 'lastheal' :
        if (val == null) val = 18;
      case 'critred' :
        if (val == null) val = 25;
      case 'resgain' :
        if (val == null) val = 16;
      case 'dmgred' :
        if (val == null) val = 16;
      case 'cleanse' :
        if (val == null) val = 12;
      case 'glare' :
        if (val == null) val = 9;
      case 'facade':
        if (val == null) val = 13;
      case 'anguish':
        if (val == null) val = 8;
      case 'retaliation':
        if (val == null) val = 16;
      case 'puncture':
        if (val == null) val = 12;
      case 'frenzy':
        if (val == null) val = 2;

        statText += _t('legbon_' + b[0], {'%val%': val});
        break;
      default :
        statText += _t2('legbon_undefined %val%', {'%val%': b[0]});
        break; //'Nieznany bonus: '+b[0]
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  socket_content : function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData, allStats, missStats) {
    let statText = `<div class="text-yellow">${_t(actualStatName, null, 'newOrder')}</div>`;
    const hasFleeting = missStats ? isset(missStats.socket_fleeting_legbon) : isset(allStats.socket_fleeting_legbon);
    const isEmpty = !Number(actualStatVal);

    if (hasFleeting) {
      statText += _t('socket_fleeting', null, 'newOrder');
    } else if (isEmpty) {
      statText += _t('socket_empty', null, 'newOrder');
    }
    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  expire_duration : function (sectionIndex, actualStatName, actualStatVal, options) {
    var seconds = convertTimeToSec(actualStatVal);
    var timeObj = convertSecToTime(seconds);
    var t = '';
    for (var x in timeObj) {
      if (timeObj[x] === 0) continue;
      switch (x) {
        case 'd':
          t += _t2('time_days %val%', {'%val%': timeObj[x]}, 'time_diff') + ' ';
          break;
        case 'h':
          t += _t2('time_h %val%', {'%val%': timeObj[x]}, 'time_diff') + ' ';
          break;
        case 'm':
          t += _t2('time_min %val%', {'%val%': timeObj[x]}, 'time_diff') + ' ';
          break;
        case 's':
          t += _t2('time_sec %val%', {'%val%': timeObj[x]}, 'time_diff');
          break;
      }
    }

    let statText = _t2('expire_duration %time%', {'%time%': t});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  action : function (sectionIndex, actualStatName, actualStatVal, options) {
    var c = actualStatVal.split(',');
    let statText = '';
    switch (c[0]) {
      case 'flee':
      case 'mail':
      case 'auction':

        statText = _t(c[0] + '_item_description') + '<br />';
        break;
      case 'nloc':
        if (c[1] == '*') {
          statText = _t('nloc_heros_item_description');
        } else {
          statText = `${_t('nloc_monster_item_description')}: ${c[1]}`;
        }
        break;
      case 'fatigue':
        var f_val = parseInt(c[1]);
        if (f_val > 0) {
          statText = _t2('fatigue_positive %val%', {'%val%': Math.abs(f_val)}, 'newOrder');
        } else {
          statText = _t2('fatigue_negative %val%', {'%val%': Math.abs(f_val)}, 'newOrder');
        }
        break;
      case 'fightperheal':
        if (c.length == 2) {

          statText = _t2('fightperheal %amount%', {'%amount%': c[1] + MargoTipsParser.addUnit('%')}, 'newOrder');
        } else if (c.length == 3) {

          statText = _t2('fightperheal %from% %to%', {
            '%from%': c[1] + MargoTipsParser.addUnit('%'),
            '%to%': c[2] + MargoTipsParser.addUnit('%')
          }, 'newOrder');
        }
        break;
      case 'deposit':
        statText = _t('call_depo');
        break;
      case 'clandeposit':
        statText = _t('call_clandepo');
        break;
      case 'shop':
        statText = _t('call_shop');
        break;
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText);
  },
  bonus : function (sectionIndex, actualStatName, actualStatVal, options) {

    const [statName, ...statValues] = actualStatVal.split(',');

    const
      prefix = '(+',
      suffix = ')';

    let unit = '';
    let trans;

    switch (statName) {
      case 'critmval':
        unit = '%';
        trans = _t(`bonus_of-${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
        break;
      case 'sa':
        trans = _t('no_percent_bonus_sa %val%', createTransVal((statValues[0] / 100), unit, prefix, suffix));
        break;
      case 'ac':
        trans = _t(`item_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix));
        break;
      case 'act':
      case 'resfire':
      case 'reslight':
      case 'resfrost':
        unit = '%';
        trans = _t(`item_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
        break;
      case 'crit':
      case 'critval':
      case 'resdmg':
        unit = '%';
        trans = _t(`bonus_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix), 'newOrder');
        break;
      case 'slow':
        trans = _t(`bonus_${statName} %val%`, createTransVal((statValues[0] / 100), unit, prefix, suffix));
        break;
      case 'enfatig':
      case 'manafatig':
        trans = _t(`bonus_${statName}`, {
          ...createTransVal(statValues[0], '%', prefix, suffix, '%val1%'),
          ...createTransVal(statValues[1], unit, prefix, suffix, '%val2%')
        });
        break;
      default:
        trans = _t(`bonus_${statName} %val%`, createTransVal(statValues[0], unit, prefix, suffix));
    }

    let statText = _t('enh_bonus %val%', {'%val%': trans});

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  lowreq : function (sectionIndex, actualStatName, actualStatVal, options) {
    let statText = '* ' + _t2('type_lower_req %val%', {'%val%': actualStatVal}) + ' *';

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  dmg : function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData) {
    const b       = actualStatVal.split(',');
    const cmpStr1 = MargoTipsParser.cmpVal(actualStatName, cmp, b[0], false, [0, ',']);
    const cmpStr2 = MargoTipsParser.cmpVal(actualStatName, cmp, b[1], false, [1, ',']);

    const defaultTranslation    = 'item_dmg %val%';
    const translation           = itemData.cl !== 4 ? defaultTranslation : 'item_distance_dmg %val%';

    const statText              = _t2(translation, {'%val%': MargoTipsParser.getRanges2(actualStatVal)}) + cmpStr1 + cmpStr2;

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  // resmanaendest : function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData) {
  //   var v         = Math.max(1, Math.round(actualStatVal * 0.444));
  //   var cmpStr2   = MargoTipsParser.cmpVal(actualStatName, cmp, actualStatVal, 0.444, false, {roundOnFinal: true});
  //
  //   let statText  = _t2('bonus_resmanaendest %val%', {'%val%': actualStatVal + cmpStr, '%val2%': v + cmpStr2});
  //
  //   return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  // },
  // sa : function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData) {
  //   let v   = actualStatVal / 100;
  //   cmpStr  = MargoTipsParser.cmpVal(actualStatName, cmp, actualStatVal, 0.01);
  //
  //   let statText = _t2('no_percent_bonus_sa %val%', {'%val%': mp(v)}) + cmpStr;
  //
  //   return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  // },
  perheal : function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData) {
    let statText = null;

    if (actualStatVal > 0) {

      statText = _t2('bonus_perheal %val%', {'%val%': actualStatVal + MargoTipsParser.addUnit('%')}, 'newOrder');
    } else {

      statText = _t2('bonus_perheal_minus %val%', {'%val%': Math.abs(actualStatVal) + MargoTipsParser.addUnit('%')});
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  custom_teleport : function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData) {

    let statText = null;

    if (actualStatVal == null) {

      statText = _t('dbl_click_to_set');

      // section.create(7, actualStatName, statText);
    } else {
      let [tp_id, tp_x, tp_y, tp_map] = actualStatVal.split(',');

      statText = `${_t('teleport')}:<br>${tp_map} (${tp_x},${tp_y}).`;

      // section.create(7, actualStatName, statText);
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  },
  wanted_change : function (sectionIndex, actualStatName, actualStatVal, options, cmpStr, cmp, itemData) {
    let statText = null;

    if (actualStatVal >= 0) {
      statText = _t2(`${actualStatName} higher %val%`, {'%val%': Math.abs(actualStatVal)});
    } else {
      statText = _t2(`${actualStatName} lower %val%`, {'%val%': Math.abs(actualStatVal)});
    }

    return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  }
  // cursed: function (sectionIndex, actualStatName, actualStatVal, options) {
  //
  //   let statText = _t('item_' + actualStatName);
  //
  //   return MargoTipsParser.prepareDataToCreateSection(sectionIndex, actualStatName, statText, options);
  // },
  // bonus_not_selected : function (sectionIndex, actualStatName, actualStatVal, options) {
  //   let statText = _t('bonus_not_selected');
  // }
}

window.MargoTipsParser.statsData = {
  loot                    : {sectionIndex: 6,    dataFunc: MargoTipsParser.statsParser.loot,                   cssClass: "looter", htmlTag: "i"},
  rarity                  : {sectionIndex: 1,    dataFunc: MargoTipsParser.statsParser.rarity},
  enhancement_refund      : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.enhancement_refund},
  quest_expbon            : {sectionIndex: 3,    dataFunc: MargoTipsParser.statsParser.quest_expbon,           eqStatClass: true},
  expaddlvl               : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.expaddlvl},
  gold                    : {sectionIndex: 3,    dataFunc: MargoTipsParser.statsParser.gold,                   eqStatClass: true},
  bag                     : {sectionIndex: 3,    dataFunc: MargoTipsParser.statsParser.bag},
  btype                   : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.btype},
  outfit                  : {sectionIndex: 3,    dataFunc: MargoTipsParser.statsParser.outfit},
  battlestats             : {sectionIndex: 3,    dataFunc: MargoTipsParser.statsParser.battlestats},
  timelimit               : {sectionIndex: 3,    dataFunc: MargoTipsParser.statsParser.timelimit},
  expires                 : {sectionIndex: 1,    dataFunc: MargoTipsParser.statsParser.expires},
  ttl                     : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.ttl,                   eqStatClass: true},
  amount                  : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.amount,                eqStatClass: true},
  cansplit                : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.cansplit},
  capacity                : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.capacity},
  opis                    : {sectionIndex: 7,    dataFunc: MargoTipsParser.statsParser.opis},
  npc_expbon              : {sectionIndex: 1,    dataFunc: MargoTipsParser.statsParser.npc_expbon},
  lvl                     : {sectionIndex: 9,    dataFunc: MargoTipsParser.statsParser.lvl,                   cssClass: "level-required"},
  reqp                    : {sectionIndex: 9,    dataFunc: MargoTipsParser.statsParser.reqp,                  cssClass: "prof-icons-holder"},
  target_class            : {sectionIndex: 9,    dataFunc: MargoTipsParser.statsParser.target_class,          cssClass: "target-class"},
  pet                     : {sectionIndex: 2,    dataFunc: MargoTipsParser.statsParser.pet,                   cssClass: "pet-tasks"},
  nodepoclan              : {sectionIndex: 8,    dataFunc: MargoTipsParser.statsParser.nodepoclan},
  nodepo                  : {sectionIndex: 8,    dataFunc: MargoTipsParser.statsParser.nodepo},
  noauction               : {sectionIndex: 8,    dataFunc: MargoTipsParser.statsParser.noauction},
  artisan_worthless       : {sectionIndex: 8,    dataFunc: MargoTipsParser.statsParser.artisan_worthless},
  soulbound               : {sectionIndex: 8,    dataFunc: MargoTipsParser.statsParser.soulbound},
  binds                   : {sectionIndex: 8,    dataFunc: MargoTipsParser.statsParser.binds},
  permbound               : {sectionIndex: 8,    dataFunc: MargoTipsParser.statsParser.permbound},
  leczy                   : {sectionIndex: null, dataFunc: MargoTipsParser.statsParser.leczy,                                                                                                                                         eqStatClass: true},
  legbon_test             : {sectionIndex: 5,    dataFunc: MargoTipsParser.statsParser.legbon_test, cssClass: 'text-light-green',                                                                                                     eqStatClass: true},
  legbon                  : {sectionIndex: 5,    dataFunc: MargoTipsParser.statsParser.legbon, cssClass: 'text-light-green',                                                                                                          eqStatClass: true},
  socket_fleeting_legbon  : {sectionIndex: 5,    dataFunc: MargoTipsParser.statsParser.legbon, cssClass: 'text-light-green',                                                                                                          eqStatClass: true},
  socket_injection_legbon : {sectionIndex: 5,    dataFunc: MargoTipsParser.statsParser.legbon, cssClass: 'text-light-green',                                                                                                          eqStatClass: true},
  socket_content          : {sectionIndex: 5,    dataFunc: MargoTipsParser.statsParser.socket_content,                                                                                                                                eqStatClass: true},
  expire_duration         : {sectionIndex: 1,    dataFunc: MargoTipsParser.statsParser.expire_duration,                                                                                                                               cssClass: "item-expired"},
  action                  : {sectionIndex: 3,    dataFunc: MargoTipsParser.statsParser.action},
  bonus                   : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.bonus,                                                                                                                                         cssClass: 'green-stat'},
  lowreq                  : {sectionIndex: 0,    dataFunc: MargoTipsParser.statsParser.lowreq,                                                                                                                                        cssClass: 'upgraded', htmlTag: 'b'},
  dmg                     : {sectionIndex: 1,    dataFunc: MargoTipsParser.statsParser.dmg,                                                                                                                                           eqStatClass: true},

  perheal                 : {sectionIndex: 3,    dataFunc: MargoTipsParser.statsParser.perheal},
  custom_teleport         : {sectionIndex: 7,    dataFunc: MargoTipsParser.statsParser.custom_teleport},
  wanted_change           : {sectionIndex: 4,    dataFunc: MargoTipsParser.statsParser.wanted_change},




  ac                      : {sectionIndex: 1,    tName : 'item_ac %val%',                                                             values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},

  enhancement_add_point   : {sectionIndex: 3,    tNameActualStatName : {prefix: 'bonus_'}},
  add_enhancement_refund  : {sectionIndex: 4,    tNameActualStatName : {prefix: 'bonus_'}},
  reset_custom_teleport   : {sectionIndex: 4,    tNameActualStatName : {prefix: 'bonus_'}},
  add_tab_deposit         : {sectionIndex: 4,    tNameActualStatName : {prefix: 'bonus_'}},
  add_battleset           : {sectionIndex: 4,    tNameActualStatName : {}},
  maxuselvl               : {sectionIndex: 9,    tNameActualStatName : {}, tCategory : "newOrder",                                    values : {'%val%': {}},                                                                          cssClass: "maxuselvl-required"},
  maxstatslvl             : {sectionIndex: 9,    tNameActualStatName : {}, tCategory : "newOrder",                                    values : {'%val%': {}},                                                                          cssClass: "maxstatslvl-required"},
  pumpkin_weight          : {sectionIndex: 7,    tNameActualStatName : {}, tCategory : "newOrder",                                    values : {'%val%': {modify: (x) => x/1000}},                                                     cssClass: "maxstatslvl-required"},



  nodesc                  : {sectionIndex: 6,    tNameActualStatName : {},                                                                                                                                                            cssClass: "idesc", htmlTag: "i"},
  furniture               : {sectionIndex: 6,    tNameActualStatName : {}, tCategory : "itemtip"},
  townlimit               : {sectionIndex: 5,    tNameActualStatName : {},                                                                                                                                                            cssClass: "idesc text-light-green", htmlTag: "i"},
  bonus_not_selected      : {sectionIndex: 4,    tNameActualStatName : {},                                                                                                                                                            cssClass: 'red-stat'},

  recovered               : {sectionIndex: 8,    tNameActualStatName : {}},
  unbind                  : {sectionIndex: 8,    tNameActualStatName : {}},
  unbind_credits          : {sectionIndex: 8,    tNameActualStatName : {}},
  undoupg                 : {sectionIndex: 8,    tNameActualStatName : {}},
  notakeoff               : {sectionIndex: 8,    tNameActualStatName : {}},
  outfit_selector         : {sectionIndex: 3,    tNameActualStatName : {}},
  force_binding           : {sectionIndex: 3,    tNameActualStatName : {}},
  socket_component        : {sectionIndex: 3,    tNameActualStatName : {}},
  socket_enhancer         : {sectionIndex: 3,    tNameActualStatName : {}},
  cursed                  : {sectionIndex: 4,    tNameActualStatName : {prefix: 'item_'}},
  bonus_reselect          : {sectionIndex: 3,    tNameActualStatName : {prefix: 'bonus_'}},
  outexchange             : {sectionIndex: 8,    tNameActualStatName : {}},
  personal                : {sectionIndex: 8,    tNameActualStatName : {}},
  summonparty             : {sectionIndex: 2,    tName : 'summonparty'},
  recipe                  : {sectionIndex: 3,    tName : 'recipe_dbl_click'},
  upgtimelimit            : {sectionIndex: 4,    tName : 'Corectupgtimelimit'},
  canpreview              : {sectionIndex: 8,    tName : 'canpreviewitem'},

  target_min_lvl          : {sectionIndex: 9,    tNameActualStatName : {suffix:' %val%'},                                             values : {'%val%': {damage:true}}},
  target_max_lvl          : {sectionIndex: 9,    tNameActualStatName : {suffix:' %val%'},                                             values : {'%val%': {damage:true}}},
  freeskills              : {sectionIndex: 3,    tNameActualStatName : {},                                                            values : {'%val%': {damage:true}}},
  rkeydesc                : {sectionIndex: 3,    tName : 'bonus_rkeydesc',                                                            values : {'%val%': {}}},
  timelimit_upgs          : {sectionIndex: 3,    tName : 'Corecttimelimit_upgs',                                                      values : {'%val%': {damage:true}}},
  timelimit_upgmax        : {sectionIndex: 3,    tName : 'Corecttimelimit_upgmax',                                                    values : {'%val%': {damage:true}}},
  expadd                  : {sectionIndex: 4,    tNameActualStatName : {prefix:'bonus_',        suffix:' %val%'},                     values : {'%val%': {damage:true}}},
  lvlnext                 : {sectionIndex: 9,    tNameActualStatName : {prefix:'match_bonus_',  suffix:' %val%'},                     values : {'%val%': {}},                                                                         cssClass: "lvl-next"},

  expire_date             : {sectionIndex: 3,    tNameActualStatName : {                        suffix:' %date%'},                    values : {'%date%': {damage:true}}},
  lvlupgcost              : {sectionIndex: 4,    tNameActualStatName : {prefix:'match_bonus_',  suffix:' %val%'},                     values : {'%val%': {damage:true}}},
  lvlupgs                 : {sectionIndex: 4,    tNameActualStatName : {prefix:'match_bonus_',  suffix:' %val%'},                     values : {'%val%': {damage:true}}},

  artisanbon              : {sectionIndex: 8,    tNameActualStatName : {suffix:' %val%'},                                             values : {'%val%': {damage:true, unit: '%'}}},
  npc_lootbon             : {sectionIndex: 3,    tName : 'npx_lootbon higher %amount%', tCategory : "newOrder",                       values : {'%amount%': {damage:true}}},

  evade                   : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  manabon                 : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  ds                      : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  dz                      : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  di                      : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  da                      : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  runes                   : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  goldpack                : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  energybon               : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},

  creditsbon              : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true}},                                                               cmpStatStr: {}},


  blok                    : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},
  hp                      : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, addSignMinusOrPlus : true}},                                    cmpStatStr: {}},

  hpbon                   : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'}, tCategory : "newOrder",    values : {'%val%': {damage:true}},                                                               cmpStatStr: {}},
  lowheal2turns           : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'}, tCategory : "newOrder",    values : {'%val%': {damage:true}},                                                               cmpStatStr: {}},
  fullheal                : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, round:2}},                                                      cmpStatStr: {}},


  contra                  : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'}, tCategory : "newOrder",    values : {'%val%': {damage:true, unit: '%'}},                                                    cmpStatStr: {}},
  respred                 : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'}, tCategory : "newOrder",    values : {'%val%': {damage:true, unit: '%'}},                                                    cmpStatStr: {}},
  pierce                  : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'}, tCategory : "newOrder",    values : {'%val%': {damage:true, unit: '%'}},                                                    cmpStatStr: {}},
  resdmg                  : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'}, tCategory : "newOrder",    values : {'%val%': {damage:true, unit: '%'}},                                                    cmpStatStr: {}},


  sa                      : {sectionIndex: 3,    tNameActualStatName : {prefix:'no_percent_bonus_', suffix:' %val%'},                 values : {'%val%': {damage:true, addSignMinusOrPlus: true, modify: (x) => x/100}},               cmpStatStr: {modify:0.01}},

  enhancement_add         : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, unit: '%'}},                                                    cmpStatStr: {}},

  stamina                 : {sectionIndex: 3,    tNameActualStatName : {suffix:' %val%'},                                             values : {'%val%': {damage:true}},                                                               cmpStatStr: {}},
  revive                  : {sectionIndex: 3,    tNameActualStatName : {suffix:' %amount%'},  tCategory : "newOrder",                 values : {'%amount%': {damage:true}},                                                            cmpStatStr: {}},

  slow                    : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true, modify: (x) => x/100}},                    cmpStatStr: {modify:0.01}},
  honorbon                : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  manadest                : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  endest                  : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  abdest                  : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  lowevade                : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  acdmg                   : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  absorbm                 : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  absorb                  : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  adest                   : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  heal                    : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  lowcrit                 : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},                            values : {'%val%': {damage:true, numbersGroups: true}},                                          cmpStatStr: {}},
  lowcritallval           : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},    tCategory : "newOrder", values : {'%val%': {damage:true, unit: "%"}},                                                    cmpStatStr: {}},

  crit                    : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},    tCategory : "newOrder", values : {'%val%': {damage:true, addSignMinusOrPlus:true, unit: "%"}},                           cmpStatStr: {unit: "%"}},
  critval                 : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_', suffix:' %val%'},    tCategory : "newOrder", values : {'%val%': {damage:true, addSignMinusOrPlus:true, unit: "%"}},                           cmpStatStr: {unit: "%"}},
  critmval                : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_of-',suffix:' %val%'},  tCategory : "newOrder", values : {'%val%': {damage:true, addSignMinusOrPlus:true, unit: "%"}},                           cmpStatStr: {unit: "%"}},

  act                     : {sectionIndex: 1,    tNameActualStatName : {prefix:'item_', suffix:' %val%'}, tCategory : "newOrder",     values : {'%val%': {damage:true,  addSignMinusOrPlus : true, unit: "%"}},                        cmpStatStr: {unit: "%"}},
  resfire                 : {sectionIndex: 1,    tNameActualStatName : {prefix:'item_', suffix:' %val%'}, tCategory : "newOrder",     values : {'%val%': {damage:true,  addSignMinusOrPlus : true, unit: "%"}},                        cmpStatStr: {unit: "%"}},
  reslight                : {sectionIndex: 1,    tNameActualStatName : {prefix:'item_', suffix:' %val%'}, tCategory : "newOrder",     values : {'%val%': {damage:true,  addSignMinusOrPlus : true, unit: "%"}},                        cmpStatStr: {unit: "%"}},
  resfrost                : {sectionIndex: 1,    tNameActualStatName : {prefix:'item_', suffix:' %val%'}, tCategory : "newOrder",     values : {'%val%': {damage:true,  addSignMinusOrPlus : true, unit: "%"}},                        cmpStatStr: {unit: "%"}},
  pdmg                    : {sectionIndex: 1,    tNameActualStatName : {prefix:'item_', suffix:' %val%'},                             values : {'%val%': {damage:true}},                                                               cmpStatStr: {}},
  pierceb                 : {sectionIndex: 1,    tNameActualStatName : {prefix:'bonus_',suffix:' %val%'}, tCategory : "newOrder",     values : {'%val%': {damage:true,  addSignMinusOrPlus : true, unit: "%"}},                        cmpStatStr: {unit: "%"}},

  fire                    : {sectionIndex: 2,    tNameActualStatName : {prefix:'bonus_',suffix:' %val%'}, tCategory : "newOrder",     values : {'%val%': {damage:true, splitVal: {}}},                                                 cmpStatStr: {}},
  light                   : {sectionIndex: 2,    tNameActualStatName : {prefix:'bonus_',suffix:' %val%'}, tCategory : "newOrder",     values : {'%val%': {damage:true, range: {}}},                                                    cmpStatStr: {range:{}}},

  upglvl                  : {sectionIndex: 4,    tNameActualStatName : {prefix:'match_bonus_',suffix:' %val%'},                       values : {'%val%': {damage:true,  tNameActualStatVal: {}}}},
  target_rarity           : {sectionIndex: 3,    tNameActualStatName : {prefix:'bonus_',suffix:' %val%'},                             values : {'%val%': {damage:true,  tNameActualStatVal: {prefix:'type_'}}}},

  // more values

  teleport                : {
    sectionIndex: 7, tNameActualStatName: {}, tCategory : "newOrder",
    values: {
      '%val1%': {splitActualStatVal: {index: 1}},
      '%val2%': {splitActualStatVal: {index: 2}},
      '%val3%': {splitActualStatVal: {index: 3}},
    }
  },

  enfatig                 : {sectionIndex: 3, tNameActualStatName: {prefix: 'bonus_'},
                                                                                                                                      values: {
                                                                                                                                        '%val1%': {damage: true, splitActualStatVal: {index: 0}, addSignMinusOrPlus: true, unit: '%'},
                                                                                                                                        '%val2%': {damage: true, splitActualStatVal: {index: 1}}
                                                                                                                                      },
                                                                                                                                      cmpStatStr: {
                                                                                                                                        values: {
                                                                                                                                          '%val1%': {splitActualStatVal: {index: 0}, unit: "%"},
                                                                                                                                          '%val2%': {splitActualStatVal: {index: 1}},
                                                                                                                                        }
                                                                                                                                      }
  },
  manafatig               : {sectionIndex: 3, tNameActualStatName: {prefix: 'bonus_'},
                                                                                                                                      values: {
                                                                                                                                        '%val1%': {damage: true, splitActualStatVal: {index: 0}, addSignMinusOrPlus: true, unit: '%'},
                                                                                                                                        '%val2%': {damage: true, splitActualStatVal: {index: 1}}
                                                                                                                                      },
                                                                                                                                      cmpStatStr: {
                                                                                                                                        values: {
                                                                                                                                          '%val1%': {splitActualStatVal: {index: 0}, unit: "%"},
                                                                                                                                          '%val2%': {splitActualStatVal: {index: 1}},
                                                                                                                                        }
                                                                                                                                      }
  },
  frost                   : {sectionIndex: 2, tNameActualStatName : {prefix:'bonus_', suffix: " %val% %slow%"}, tCategory : "newOrder",
                                                                                                                                      values : {
                                                                                                                                        '%slow%': {damage:true, splitActualStatVal: {index: 0}, modify:(x) => x / 100},
                                                                                                                                        '%val%' : {damage:true, splitActualStatVal: {index: 1}, numbersGroups:true},
                                                                                                                                      },
                                                                                                                                      cmpStatStr: {
                                                                                                                                        values: {
                                                                                                                                          '%slow%': {splitActualStatVal: {index: 0}, modify: 0.01},
                                                                                                                                          '%val%' : {splitActualStatVal: {index: 1}},
                                                                                                                                        }
                                                                                                                                      }
  },
  poison                  : {sectionIndex: 2, tNameActualStatName : {prefix:'bonus_', suffix: " %val% %slow%"}, tCategory : "newOrder",
                                                                                                                                      values : {
                                                                                                                                        '%slow%': {damage:true, splitActualStatVal: {index: 0}, modify:(x) => x / 100},
                                                                                                                                        '%val%' : {damage:true, splitActualStatVal: {index: 1}, numbersGroups:true},
                                                                                                                                      },
                                                                                                                                      cmpStatStr: {
                                                                                                                                        values: {
                                                                                                                                          '%slow%': {splitActualStatVal: {index: 0}, modify: 0.01},
                                                                                                                                          '%val%' : {splitActualStatVal: {index: 1}},
                                                                                                                                        }
                                                                                                                                      }
  },
  wound                   : {sectionIndex: 3, tNameActualStatName : {prefix:'bonus_', suffix: " %val% %dmg%"}, tCategory : "newOrder",
                                                                                                                                      values : {
                                                                                                                                        '%val%' : {damage:true, splitActualStatVal: {index: 0}, unit: "%"},
                                                                                                                                        '%dmg%' : {damage:true, splitActualStatVal: {index: 1}, numbersGroups:true},
                                                                                                                                      },
                                                                                                                                      cmpStatStr: {
                                                                                                                                        values: {
                                                                                                                                          '%val%': {splitActualStatVal: {index: 0}, unit: "%"},
                                                                                                                                          '%dmg%' : {splitActualStatVal: {index: 1}},
                                                                                                                                        }
                                                                                                                                      }
  },
  resmanaendest           : {sectionIndex: 3, tNameActualStatName : {prefix:'bonus_', suffix: " %val%"},
                                                                                                                                      values : {
                                                                                                                                        '%val%'   : {damage:true},
                                                                                                                                        '%val2%'  : {damage:true, modify: (x) => Math.max(1, Math.round(x * 0.444))}
                                                                                                                                      },
                                                                                                                                      cmpStatStr: {
                                                                                                                                        values: {
                                                                                                                                          '%val%': {},
                                                                                                                                          '%val2%' : {modify:0.444, options:{roundOnFinal: true}},
                                                                                                                                        }
                                                                                                                                      }
  },
  afterheal               : {sectionIndex: 3, tNameActualStatName : {prefix:'bonus_new_'}, tCategory : "newOrder",
    values : {
      '%val1%'   : {damage:true, splitActualStatVal: {index: 0}, unit: '%'},
      '%val2%'   : {damage:true, splitActualStatVal: {index: 1}, numbersGroups: true}
    },
    cmpStatStr: {
      values: {
        '%val1%'  : {splitActualStatVal: {index: 0}, unit: '%'},
        '%val2%'  : {splitActualStatVal: {index: 1}},
      }
    }
  },
  afterheal2               : {sectionIndex: 3, tNameActualStatName : {prefix:'bonus_new_'}, tCategory : "newOrder",
    values : {
      '%val1%'   : {damage:true, splitActualStatVal: {index: 0}, unit: '%'},
      '%val2%'   : {damage:true, splitActualStatVal: {index: 1}, numbersGroups: true}
    },
    cmpStatStr: {
      values: {
        '%val1%'  : {splitActualStatVal: {index: 0}, unit: '%'},
        '%val2%'  : {splitActualStatVal: {index: 1}},
      }
    }
  },
}

