// ============================================================
// Conjugation Engine — conjugates Spanish verbs across 6 tenses
// Handles -ar, -er, -ir regular verbs + 30+ common irregulars
// ============================================================
var Conjugation = (function () {
  'use strict';

  var PRONOUNS = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'];
  var PRONOUN_SHORT = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];

  var TENSE_NAMES = {
    present: 'Presente (Present)',
    preterite: 'Pretérito (Preterite)',
    imperfect: 'Imperfecto (Imperfect)',
    future: 'Futuro (Future)',
    conditional: 'Condicional (Conditional)',
    subjunctive: 'Subjuntivo Presente (Present Subjunctive)',
    imperfect_subjunctive: 'Subjuntivo Imperfecto (Imperfect Subjunctive)',
    imperative_affirmative: 'Imperativo Afirmativo (Affirmative Commands)',
    imperative_negative: 'Imperativo Negativo (Negative Commands)',
    present_perfect: 'Pretérito Perfecto (Present Perfect)',
    pluperfect: 'Pluscuamperfecto (Pluperfect)',
    future_perfect: 'Futuro Perfecto (Future Perfect)',
    conditional_perfect: 'Condicional Perfecto (Conditional Perfect)',
    gerund: 'Gerundio (Gerund/Present Participle)',
    past_participle: 'Participio Pasado (Past Participle)'
  };

  // Regular endings by verb type and tense
  var REGULAR_ENDINGS = {
    ar: {
      present:     ['o', 'as', 'a', 'amos', 'áis', 'an'],
      preterite:   ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
      imperfect:   ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
      future:      ['aré', 'arás', 'ará', 'aremos', 'aréis', 'arán'],
      conditional: ['aría', 'arías', 'aría', 'aríamos', 'aríais', 'arían'],
      subjunctive: ['e', 'es', 'e', 'emos', 'éis', 'en'],
      imperfect_subjunctive: ['ara', 'aras', 'ara', 'áramos', 'arais', 'aran']
    },
    er: {
      present:     ['o', 'es', 'e', 'emos', 'éis', 'en'],
      preterite:   ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
      imperfect:   ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
      future:      ['eré', 'erás', 'erá', 'eremos', 'eréis', 'erán'],
      conditional: ['ería', 'erías', 'ería', 'eríamos', 'eríais', 'erían'],
      subjunctive: ['a', 'as', 'a', 'amos', 'áis', 'an'],
      imperfect_subjunctive: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran']
    },
    ir: {
      present:     ['o', 'es', 'e', 'imos', 'ís', 'en'],
      preterite:   ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
      imperfect:   ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
      future:      ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán'],
      conditional: ['iría', 'irías', 'iría', 'iríamos', 'iríais', 'irían'],
      subjunctive: ['a', 'as', 'a', 'amos', 'áis', 'an'],
      imperfect_subjunctive: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran']
    }
  };

  // Imperative endings for regular verbs
  var IMPERATIVE_ENDINGS = {
    ar: {
      affirmative: ['—', 'a', 'e', 'emos', 'ad', 'en'],
      negative:    ['—', 'es', 'e', 'emos', 'éis', 'en']
    },
    er: {
      affirmative: ['—', 'e', 'a', 'amos', 'ed', 'an'],
      negative:    ['—', 'as', 'a', 'amos', 'áis', 'an']
    },
    ir: {
      affirmative: ['—', 'e', 'a', 'amos', 'id', 'an'],
      negative:    ['—', 'as', 'a', 'amos', 'áis', 'an']
    }
  };

  // Past participles (irregular ones)
  var IRREGULAR_PARTICIPLES = {
    abrir: 'abierto', cubrir: 'cubierto', decir: 'dicho',
    escribir: 'escrito', hacer: 'hecho', morir: 'muerto',
    poner: 'puesto', resolver: 'resuelto', romper: 'roto',
    satisfacer: 'satisfecho', ver: 'visto', volver: 'vuelto',
    freír: 'frito', imprimir: 'impreso', proveer: 'provisto',
    descubrir: 'descubierto', devolver: 'devuelto', envolver: 'envuelto',
    suponer: 'supuesto', componer: 'compuesto', disponer: 'dispuesto',
    proponer: 'propuesto', oponer: 'opuesto', imponer: 'impuesto',
    deshacer: 'deshecho', rehacer: 'rehecho', predecir: 'predicho',
    contradecir: 'contradicho', describir: 'descrito', inscribir: 'inscrito',
    suscribir: 'suscrito', prescribir: 'prescrito'
  };

  // Irregular gerunds
  var IRREGULAR_GERUNDS = {
    decir: 'diciendo', dormir: 'durmiendo', ir: 'yendo',
    leer: 'leyendo', morir: 'muriendo', oír: 'oyendo',
    pedir: 'pidiendo', poder: 'pudiendo', seguir: 'siguiendo',
    sentir: 'sintiendo', servir: 'sirviendo', traer: 'trayendo',
    venir: 'viniendo', caer: 'cayendo', creer: 'creyendo',
    construir: 'construyendo', destruir: 'destruyendo', huir: 'huyendo',
    incluir: 'incluyendo', reír: 'riendo', vestir: 'vistiendo',
    repetir: 'repitiendo', preferir: 'prefiriendo', mentir: 'mintiendo',
    corregir: 'corrigiendo', elegir: 'eligiendo', medir: 'midiendo',
    competir: 'compitiendo', conseguir: 'consiguiendo'
  };

  // Irregular verb conjugations (fully specified for each tense)
  var IRREGULARS = {
    ser: {
      present:     ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
      preterite:   ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      imperfect:   ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
      future:      ['seré', 'serás', 'será', 'seremos', 'seréis', 'serán'],
      conditional: ['sería', 'serías', 'sería', 'seríamos', 'seríais', 'serían'],
      subjunctive: ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
      imperfect_subjunctive: ['fuera', 'fueras', 'fuera', 'fuéramos', 'fuerais', 'fueran']
    },
    estar: {
      present:     ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
      preterite:   ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
      imperfect:   ['estaba', 'estabas', 'estaba', 'estábamos', 'estabais', 'estaban'],
      future:      ['estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán'],
      conditional: ['estaría', 'estarías', 'estaría', 'estaríamos', 'estaríais', 'estarían'],
      subjunctive: ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'],
      imperfect_subjunctive: ['estuviera', 'estuvieras', 'estuviera', 'estuviéramos', 'estuvierais', 'estuvieran']
    },
    ir: {
      present:     ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
      preterite:   ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      imperfect:   ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
      future:      ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán'],
      conditional: ['iría', 'irías', 'iría', 'iríamos', 'iríais', 'irían'],
      subjunctive: ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'],
      imperfect_subjunctive: ['fuera', 'fueras', 'fuera', 'fuéramos', 'fuerais', 'fueran']
    },
    tener: {
      present:     ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
      preterite:   ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'],
      imperfect:   ['tenía', 'tenías', 'tenía', 'teníamos', 'teníais', 'tenían'],
      future:      ['tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán'],
      conditional: ['tendría', 'tendrías', 'tendría', 'tendríamos', 'tendríais', 'tendrían'],
      subjunctive: ['tenga', 'tengas', 'tenga', 'tengamos', 'tengáis', 'tengan'],
      imperfect_subjunctive: ['tuviera', 'tuvieras', 'tuviera', 'tuviéramos', 'tuvierais', 'tuvieran']
    },
    hacer: {
      present:     ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
      preterite:   ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
      imperfect:   ['hacía', 'hacías', 'hacía', 'hacíamos', 'hacíais', 'hacían'],
      future:      ['haré', 'harás', 'hará', 'haremos', 'haréis', 'harán'],
      conditional: ['haría', 'harías', 'haría', 'haríamos', 'haríais', 'harían'],
      subjunctive: ['haga', 'hagas', 'haga', 'hagamos', 'hagáis', 'hagan'],
      imperfect_subjunctive: ['hiciera', 'hicieras', 'hiciera', 'hiciéramos', 'hicierais', 'hicieran']
    },
    poder: {
      present:     ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
      preterite:   ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
      imperfect:   ['podía', 'podías', 'podía', 'podíamos', 'podíais', 'podían'],
      future:      ['podré', 'podrás', 'podrá', 'podremos', 'podréis', 'podrán'],
      conditional: ['podría', 'podrías', 'podría', 'podríamos', 'podríais', 'podrían'],
      subjunctive: ['pueda', 'puedas', 'pueda', 'podamos', 'podáis', 'puedan'],
      imperfect_subjunctive: ['pudiera', 'pudieras', 'pudiera', 'pudiéramos', 'pudierais', 'pudieran']
    },
    querer: {
      present:     ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
      preterite:   ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'],
      imperfect:   ['quería', 'querías', 'quería', 'queríamos', 'queríais', 'querían'],
      future:      ['querré', 'querrás', 'querrá', 'querremos', 'querréis', 'querrán'],
      conditional: ['querría', 'querrías', 'querría', 'querríamos', 'querríais', 'querrían'],
      subjunctive: ['quiera', 'quieras', 'quiera', 'queramos', 'queráis', 'quieran'],
      imperfect_subjunctive: ['quisiera', 'quisieras', 'quisiera', 'quisiéramos', 'quisierais', 'quisieran']
    },
    saber: {
      present:     ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
      preterite:   ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'],
      imperfect:   ['sabía', 'sabías', 'sabía', 'sabíamos', 'sabíais', 'sabían'],
      future:      ['sabré', 'sabrás', 'sabrá', 'sabremos', 'sabréis', 'sabrán'],
      conditional: ['sabría', 'sabrías', 'sabría', 'sabríamos', 'sabríais', 'sabrían'],
      subjunctive: ['sepa', 'sepas', 'sepa', 'sepamos', 'sepáis', 'sepan'],
      imperfect_subjunctive: ['supiera', 'supieras', 'supiera', 'supiéramos', 'supierais', 'supieran']
    },
    decir: {
      present:     ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'],
      preterite:   ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
      imperfect:   ['decía', 'decías', 'decía', 'decíamos', 'decíais', 'decían'],
      future:      ['diré', 'dirás', 'dirá', 'diremos', 'diréis', 'dirán'],
      conditional: ['diría', 'dirías', 'diría', 'diríamos', 'diríais', 'dirían'],
      subjunctive: ['diga', 'digas', 'diga', 'digamos', 'digáis', 'digan'],
      imperfect_subjunctive: ['dijera', 'dijeras', 'dijera', 'dijéramos', 'dijerais', 'dijeran']
    },
    venir: {
      present:     ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
      preterite:   ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
      imperfect:   ['venía', 'venías', 'venía', 'veníamos', 'veníais', 'venían'],
      future:      ['vendré', 'vendrás', 'vendrá', 'vendremos', 'vendréis', 'vendrán'],
      conditional: ['vendría', 'vendrías', 'vendría', 'vendríamos', 'vendríais', 'vendrían'],
      subjunctive: ['venga', 'vengas', 'venga', 'vengamos', 'vengáis', 'vengan'],
      imperfect_subjunctive: ['viniera', 'vinieras', 'viniera', 'viniéramos', 'vinierais', 'vinieran']
    },
    poner: {
      present:     ['pongo', 'pones', 'pone', 'ponemos', 'ponéis', 'ponen'],
      preterite:   ['puse', 'pusiste', 'puso', 'pusimos', 'pusisteis', 'pusieron'],
      imperfect:   ['ponía', 'ponías', 'ponía', 'poníamos', 'poníais', 'ponían'],
      future:      ['pondré', 'pondrás', 'pondrá', 'pondremos', 'pondréis', 'pondrán'],
      conditional: ['pondría', 'pondrías', 'pondría', 'pondríamos', 'pondríais', 'pondrían'],
      subjunctive: ['ponga', 'pongas', 'ponga', 'pongamos', 'pongáis', 'pongan'],
      imperfect_subjunctive: ['pusiera', 'pusieras', 'pusiera', 'pusiéramos', 'pusierais', 'pusieran']
    },
    salir: {
      present:     ['salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
      preterite:   ['salí', 'saliste', 'salió', 'salimos', 'salisteis', 'salieron'],
      imperfect:   ['salía', 'salías', 'salía', 'salíamos', 'salíais', 'salían'],
      future:      ['saldré', 'saldrás', 'saldrá', 'saldremos', 'saldréis', 'saldrán'],
      conditional: ['saldría', 'saldrías', 'saldría', 'saldríamos', 'saldríais', 'saldrían'],
      subjunctive: ['salga', 'salgas', 'salga', 'salgamos', 'salgáis', 'salgan'],
      imperfect_subjunctive: ['saliera', 'salieras', 'saliera', 'saliéramos', 'salierais', 'salieran']
    },
    dar: {
      present:     ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
      preterite:   ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
      imperfect:   ['daba', 'dabas', 'daba', 'dábamos', 'dabais', 'daban'],
      future:      ['daré', 'darás', 'dará', 'daremos', 'daréis', 'darán'],
      conditional: ['daría', 'darías', 'daría', 'daríamos', 'daríais', 'darían'],
      subjunctive: ['dé', 'des', 'dé', 'demos', 'deis', 'den'],
      imperfect_subjunctive: ['diera', 'dieras', 'diera', 'diéramos', 'dierais', 'dieran']
    },
    ver: {
      present:     ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
      preterite:   ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
      imperfect:   ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
      future:      ['veré', 'verás', 'verá', 'veremos', 'veréis', 'verán'],
      conditional: ['vería', 'verías', 'vería', 'veríamos', 'veríais', 'verían'],
      subjunctive: ['vea', 'veas', 'vea', 'veamos', 'veáis', 'vean'],
      imperfect_subjunctive: ['viera', 'vieras', 'viera', 'viéramos', 'vierais', 'vieran']
    },
    haber: {
      present:     ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
      preterite:   ['hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron'],
      imperfect:   ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
      future:      ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
      conditional: ['habría', 'habrías', 'habría', 'habríamos', 'habríais', 'habrían'],
      subjunctive: ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
      imperfect_subjunctive: ['hubiera', 'hubieras', 'hubiera', 'hubiéramos', 'hubierais', 'hubieran']
    },
    conocer: {
      present:     ['conozco', 'conoces', 'conoce', 'conocemos', 'conocéis', 'conocen'],
      preterite:   ['conocí', 'conociste', 'conoció', 'conocimos', 'conocisteis', 'conocieron'],
      imperfect:   ['conocía', 'conocías', 'conocía', 'conocíamos', 'conocíais', 'conocían'],
      future:      ['conoceré', 'conocerás', 'conocerá', 'conoceremos', 'conoceréis', 'conocerán'],
      conditional: ['conocería', 'conocerías', 'conocería', 'conoceríamos', 'conoceríais', 'conocerían'],
      subjunctive: ['conozca', 'conozcas', 'conozca', 'conozcamos', 'conozcáis', 'conozcan'],
      imperfect_subjunctive: ['conociera', 'conocieras', 'conociera', 'conociéramos', 'conocierais', 'conocieran']
    },
    dormir: {
      present:     ['duermo', 'duermes', 'duerme', 'dormimos', 'dormís', 'duermen'],
      preterite:   ['dormí', 'dormiste', 'durmió', 'dormimos', 'dormisteis', 'durmieron'],
      imperfect:   ['dormía', 'dormías', 'dormía', 'dormíamos', 'dormíais', 'dormían'],
      future:      ['dormiré', 'dormirás', 'dormirá', 'dormiremos', 'dormiréis', 'dormirán'],
      conditional: ['dormiría', 'dormirías', 'dormiría', 'dormiríamos', 'dormiríais', 'dormirían'],
      subjunctive: ['duerma', 'duermas', 'duerma', 'durmamos', 'durmáis', 'duerman'],
      imperfect_subjunctive: ['durmiera', 'durmieras', 'durmiera', 'durmiéramos', 'durmierais', 'durmieran']
    },
    pedir: {
      present:     ['pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden'],
      preterite:   ['pedí', 'pediste', 'pidió', 'pedimos', 'pedisteis', 'pidieron'],
      imperfect:   ['pedía', 'pedías', 'pedía', 'pedíamos', 'pedíais', 'pedían'],
      future:      ['pediré', 'pedirás', 'pedirá', 'pediremos', 'pediréis', 'pedirán'],
      conditional: ['pediría', 'pedirías', 'pediría', 'pediríamos', 'pediríais', 'pedirían'],
      subjunctive: ['pida', 'pidas', 'pida', 'pidamos', 'pidáis', 'pidan'],
      imperfect_subjunctive: ['pidiera', 'pidieras', 'pidiera', 'pidiéramos', 'pidierais', 'pidieran']
    },
    jugar: {
      present:     ['juego', 'juegas', 'juega', 'jugamos', 'jugáis', 'juegan'],
      preterite:   ['jugué', 'jugaste', 'jugó', 'jugamos', 'jugasteis', 'jugaron'],
      imperfect:   ['jugaba', 'jugabas', 'jugaba', 'jugábamos', 'jugabais', 'jugaban'],
      future:      ['jugaré', 'jugarás', 'jugará', 'jugaremos', 'jugaréis', 'jugarán'],
      conditional: ['jugaría', 'jugarías', 'jugaría', 'jugaríamos', 'jugaríais', 'jugarían'],
      subjunctive: ['juegue', 'juegues', 'juegue', 'juguemos', 'juguéis', 'jueguen'],
      imperfect_subjunctive: ['jugara', 'jugaras', 'jugara', 'jugáramos', 'jugarais', 'jugaran']
    },
    pensar: {
      present:     ['pienso', 'piensas', 'piensa', 'pensamos', 'pensáis', 'piensan'],
      preterite:   ['pensé', 'pensaste', 'pensó', 'pensamos', 'pensasteis', 'pensaron'],
      imperfect:   ['pensaba', 'pensabas', 'pensaba', 'pensábamos', 'pensabais', 'pensaban'],
      future:      ['pensaré', 'pensarás', 'pensará', 'pensaremos', 'pensaréis', 'pensarán'],
      conditional: ['pensaría', 'pensarías', 'pensaría', 'pensaríamos', 'pensaríais', 'pensarían'],
      subjunctive: ['piense', 'pienses', 'piense', 'pensemos', 'penséis', 'piensen'],
      imperfect_subjunctive: ['pensara', 'pensaras', 'pensara', 'pensáramos', 'pensarais', 'pensaran']
    },
    empezar: {
      present:     ['empiezo', 'empiezas', 'empieza', 'empezamos', 'empezáis', 'empiezan'],
      preterite:   ['empecé', 'empezaste', 'empezó', 'empezamos', 'empezasteis', 'empezaron'],
      imperfect:   ['empezaba', 'empezabas', 'empezaba', 'empezábamos', 'empezabais', 'empezaban'],
      future:      ['empezaré', 'empezarás', 'empezará', 'empezaremos', 'empezaréis', 'empezarán'],
      conditional: ['empezaría', 'empezarías', 'empezaría', 'empezaríamos', 'empezaríais', 'empezarían'],
      subjunctive: ['empiece', 'empieces', 'empiece', 'empecemos', 'empecéis', 'empiecen'],
      imperfect_subjunctive: ['empezara', 'empezaras', 'empezara', 'empezáramos', 'empezarais', 'empezaran']
    },
    cerrar: {
      present:     ['cierro', 'cierras', 'cierra', 'cerramos', 'cerráis', 'cierran'],
      preterite:   ['cerré', 'cerraste', 'cerró', 'cerramos', 'cerrasteis', 'cerraron'],
      imperfect:   ['cerraba', 'cerrabas', 'cerraba', 'cerrábamos', 'cerrabais', 'cerraban'],
      future:      ['cerraré', 'cerrarás', 'cerrará', 'cerraremos', 'cerraréis', 'cerrarán'],
      conditional: ['cerraría', 'cerrarías', 'cerraría', 'cerraríamos', 'cerraríais', 'cerrarían'],
      subjunctive: ['cierre', 'cierres', 'cierre', 'cerremos', 'cerréis', 'cierren'],
      imperfect_subjunctive: ['cerrara', 'cerraras', 'cerrara', 'cerráramos', 'cerrarais', 'cerraran']
    },
    entender: {
      present:     ['entiendo', 'entiendes', 'entiende', 'entendemos', 'entendéis', 'entienden'],
      preterite:   ['entendí', 'entendiste', 'entendió', 'entendimos', 'entendisteis', 'entendieron'],
      imperfect:   ['entendía', 'entendías', 'entendía', 'entendíamos', 'entendíais', 'entendían'],
      future:      ['entenderé', 'entenderás', 'entenderá', 'entenderemos', 'entenderéis', 'entenderán'],
      conditional: ['entendería', 'entenderías', 'entendería', 'entenderíamos', 'entenderíais', 'entenderían'],
      subjunctive: ['entienda', 'entiendas', 'entienda', 'entendamos', 'entendáis', 'entiendan'],
      imperfect_subjunctive: ['entendiera', 'entendieras', 'entendiera', 'entendiéramos', 'entendierais', 'entendieran']
    },
    volver: {
      present:     ['vuelvo', 'vuelves', 'vuelve', 'volvemos', 'volvéis', 'vuelven'],
      preterite:   ['volví', 'volviste', 'volvió', 'volvimos', 'volvisteis', 'volvieron'],
      imperfect:   ['volvía', 'volvías', 'volvía', 'volvíamos', 'volvíais', 'volvían'],
      future:      ['volveré', 'volverás', 'volverá', 'volveremos', 'volveréis', 'volverán'],
      conditional: ['volvería', 'volverías', 'volvería', 'volveríamos', 'volveríais', 'volverían'],
      subjunctive: ['vuelva', 'vuelvas', 'vuelva', 'volvamos', 'volváis', 'vuelvan'],
      imperfect_subjunctive: ['volviera', 'volvieras', 'volviera', 'volviéramos', 'volvierais', 'volvieran']
    },
    sentir: {
      present:     ['siento', 'sientes', 'siente', 'sentimos', 'sentís', 'sienten'],
      preterite:   ['sentí', 'sentiste', 'sintió', 'sentimos', 'sentisteis', 'sintieron'],
      imperfect:   ['sentía', 'sentías', 'sentía', 'sentíamos', 'sentíais', 'sentían'],
      future:      ['sentiré', 'sentirás', 'sentirá', 'sentiremos', 'sentiréis', 'sentirán'],
      conditional: ['sentiría', 'sentirías', 'sentiría', 'sentiríamos', 'sentiríais', 'sentirían'],
      subjunctive: ['sienta', 'sientas', 'sienta', 'sintamos', 'sintáis', 'sientan'],
      imperfect_subjunctive: ['sintiera', 'sintieras', 'sintiera', 'sintiéramos', 'sintierais', 'sintieran']
    },
    seguir: {
      present:     ['sigo', 'sigues', 'sigue', 'seguimos', 'seguís', 'siguen'],
      preterite:   ['seguí', 'seguiste', 'siguió', 'seguimos', 'seguisteis', 'siguieron'],
      imperfect:   ['seguía', 'seguías', 'seguía', 'seguíamos', 'seguíais', 'seguían'],
      future:      ['seguiré', 'seguirás', 'seguirá', 'seguiremos', 'seguiréis', 'seguirán'],
      conditional: ['seguiría', 'seguirías', 'seguiría', 'seguiríamos', 'seguiríais', 'seguirían'],
      subjunctive: ['siga', 'sigas', 'siga', 'sigamos', 'sigáis', 'sigan'],
      imperfect_subjunctive: ['siguiera', 'siguieras', 'siguiera', 'siguiéramos', 'siguierais', 'siguieran']
    },
    traer: {
      present:     ['traigo', 'traes', 'trae', 'traemos', 'traéis', 'traen'],
      preterite:   ['traje', 'trajiste', 'trajo', 'trajimos', 'trajisteis', 'trajeron'],
      imperfect:   ['traía', 'traías', 'traía', 'traíamos', 'traíais', 'traían'],
      future:      ['traeré', 'traerás', 'traerá', 'traeremos', 'traeréis', 'traerán'],
      conditional: ['traería', 'traerías', 'traería', 'traeríamos', 'traeríais', 'traerían'],
      subjunctive: ['traiga', 'traigas', 'traiga', 'traigamos', 'traigáis', 'traigan'],
      imperfect_subjunctive: ['trajera', 'trajeras', 'trajera', 'trajéramos', 'trajerais', 'trajeran']
    },
    oír: {
      present:     ['oigo', 'oyes', 'oye', 'oímos', 'oís', 'oyen'],
      preterite:   ['oí', 'oíste', 'oyó', 'oímos', 'oísteis', 'oyeron'],
      imperfect:   ['oía', 'oías', 'oía', 'oíamos', 'oíais', 'oían'],
      future:      ['oiré', 'oirás', 'oirá', 'oiremos', 'oiréis', 'oirán'],
      conditional: ['oiría', 'oirías', 'oiría', 'oiríamos', 'oiríais', 'oirían'],
      subjunctive: ['oiga', 'oigas', 'oiga', 'oigamos', 'oigáis', 'oigan'],
      imperfect_subjunctive: ['oyera', 'oyeras', 'oyera', 'oyéramos', 'oyerais', 'oyeran']
    },
    caer: {
      present:     ['caigo', 'caes', 'cae', 'caemos', 'caéis', 'caen'],
      preterite:   ['caí', 'caíste', 'cayó', 'caímos', 'caísteis', 'cayeron'],
      imperfect:   ['caía', 'caías', 'caía', 'caíamos', 'caíais', 'caían'],
      future:      ['caeré', 'caerás', 'caerá', 'caeremos', 'caeréis', 'caerán'],
      conditional: ['caería', 'caerías', 'caería', 'caeríamos', 'caeríais', 'caerían'],
      subjunctive: ['caiga', 'caigas', 'caiga', 'caigamos', 'caigáis', 'caigan'],
      imperfect_subjunctive: ['cayera', 'cayeras', 'cayera', 'cayéramos', 'cayerais', 'cayeran']
    },

    // === Additional irregular verbs ===
    conducir: {
      present:     ['conduzco', 'conduces', 'conduce', 'conducimos', 'conducís', 'conducen'],
      preterite:   ['conduje', 'condujiste', 'condujo', 'condujimos', 'condujisteis', 'condujeron'],
      imperfect:   ['conducía', 'conducías', 'conducía', 'conducíamos', 'conducíais', 'conducían'],
      future:      ['conduciré', 'conducirás', 'conducirá', 'conduciremos', 'conduciréis', 'conducirán'],
      conditional: ['conduciría', 'conducirías', 'conduciría', 'conduciríamos', 'conduciríais', 'conducirían'],
      subjunctive: ['conduzca', 'conduzcas', 'conduzca', 'conduzcamos', 'conduzcáis', 'conduzcan'],
      imperfect_subjunctive: ['condujera', 'condujeras', 'condujera', 'condujéramos', 'condujerais', 'condujeran']
    },
    traducir: {
      present:     ['traduzco', 'traduces', 'traduce', 'traducimos', 'traducís', 'traducen'],
      preterite:   ['traduje', 'tradujiste', 'tradujo', 'tradujimos', 'tradujisteis', 'tradujeron'],
      imperfect:   ['traducía', 'traducías', 'traducía', 'traducíamos', 'traducíais', 'traducían'],
      future:      ['traduciré', 'traducirás', 'traducirá', 'traduciremos', 'traduciréis', 'traducirán'],
      conditional: ['traduciría', 'traducirías', 'traduciría', 'traduciríamos', 'traduciríais', 'traducirían'],
      subjunctive: ['traduzca', 'traduzcas', 'traduzca', 'traduzcamos', 'traduzcáis', 'traduzcan'],
      imperfect_subjunctive: ['tradujera', 'tradujeras', 'tradujera', 'tradujéramos', 'tradujerais', 'tradujeran']
    },
    producir: {
      present:     ['produzco', 'produces', 'produce', 'producimos', 'producís', 'producen'],
      preterite:   ['produje', 'produjiste', 'produjo', 'produjimos', 'produjisteis', 'produjeron'],
      imperfect:   ['producía', 'producías', 'producía', 'producíamos', 'producíais', 'producían'],
      future:      ['produciré', 'producirás', 'producirá', 'produciremos', 'produciréis', 'producirán'],
      conditional: ['produciría', 'producirías', 'produciría', 'produciríamos', 'produciríais', 'producirían'],
      subjunctive: ['produzca', 'produzcas', 'produzca', 'produzcamos', 'produzcáis', 'produzcan'],
      imperfect_subjunctive: ['produjera', 'produjeras', 'produjera', 'produjéramos', 'produjerais', 'produjeran']
    },
    construir: {
      present:     ['construyo', 'construyes', 'construye', 'construimos', 'construís', 'construyen'],
      preterite:   ['construí', 'construiste', 'construyó', 'construimos', 'construisteis', 'construyeron'],
      imperfect:   ['construía', 'construías', 'construía', 'construíamos', 'construíais', 'construían'],
      future:      ['construiré', 'construirás', 'construirá', 'construiremos', 'construiréis', 'construirán'],
      conditional: ['construiría', 'construirías', 'construiría', 'construiríamos', 'construiríais', 'construirían'],
      subjunctive: ['construya', 'construyas', 'construya', 'construyamos', 'construyáis', 'construyan'],
      imperfect_subjunctive: ['construyera', 'construyeras', 'construyera', 'construyéramos', 'construyerais', 'construyeran']
    },
    destruir: {
      present:     ['destruyo', 'destruyes', 'destruye', 'destruimos', 'destruís', 'destruyen'],
      preterite:   ['destruí', 'destruiste', 'destruyó', 'destruimos', 'destruisteis', 'destruyeron'],
      imperfect:   ['destruía', 'destruías', 'destruía', 'destruíamos', 'destruíais', 'destruían'],
      future:      ['destruiré', 'destruirás', 'destruirá', 'destruiremos', 'destruiréis', 'destruirán'],
      conditional: ['destruiría', 'destruirías', 'destruiría', 'destruiríamos', 'destruiríais', 'destruirían'],
      subjunctive: ['destruya', 'destruyas', 'destruya', 'destruyamos', 'destruyáis', 'destruyan'],
      imperfect_subjunctive: ['destruyera', 'destruyeras', 'destruyera', 'destruyéramos', 'destruyerais', 'destruyeran']
    },
    morir: {
      present:     ['muero', 'mueres', 'muere', 'morimos', 'morís', 'mueren'],
      preterite:   ['morí', 'moriste', 'murió', 'morimos', 'moristeis', 'murieron'],
      imperfect:   ['moría', 'morías', 'moría', 'moríamos', 'moríais', 'morían'],
      future:      ['moriré', 'morirás', 'morirá', 'moriremos', 'moriréis', 'morirán'],
      conditional: ['moriría', 'morirías', 'moriría', 'moriríamos', 'moriríais', 'morirían'],
      subjunctive: ['muera', 'mueras', 'muera', 'muramos', 'muráis', 'mueran'],
      imperfect_subjunctive: ['muriera', 'murieras', 'muriera', 'muriéramos', 'murierais', 'murieran']
    },
    elegir: {
      present:     ['elijo', 'eliges', 'elige', 'elegimos', 'elegís', 'eligen'],
      preterite:   ['elegí', 'elegiste', 'eligió', 'elegimos', 'elegisteis', 'eligieron'],
      imperfect:   ['elegía', 'elegías', 'elegía', 'elegíamos', 'elegíais', 'elegían'],
      future:      ['elegiré', 'elegirás', 'elegirá', 'elegiremos', 'elegiréis', 'elegirán'],
      conditional: ['elegiría', 'elegirías', 'elegiría', 'elegiríamos', 'elegiríais', 'elegirían'],
      subjunctive: ['elija', 'elijas', 'elija', 'elijamos', 'elijáis', 'elijan'],
      imperfect_subjunctive: ['eligiera', 'eligieras', 'eligiera', 'eligiéramos', 'eligierais', 'eligieran']
    },
    resolver: {
      present:     ['resuelvo', 'resuelves', 'resuelve', 'resolvemos', 'resolvéis', 'resuelven'],
      preterite:   ['resolví', 'resolviste', 'resolvió', 'resolvimos', 'resolvisteis', 'resolvieron'],
      imperfect:   ['resolvía', 'resolvías', 'resolvía', 'resolvíamos', 'resolvíais', 'resolvían'],
      future:      ['resolveré', 'resolverás', 'resolverá', 'resolveremos', 'resolveréis', 'resolverán'],
      conditional: ['resolvería', 'resolverías', 'resolvería', 'resolveríamos', 'resolveríais', 'resolverían'],
      subjunctive: ['resuelva', 'resuelvas', 'resuelva', 'resolvamos', 'resolváis', 'resuelvan'],
      imperfect_subjunctive: ['resolviera', 'resolvieras', 'resolviera', 'resolviéramos', 'resolvierais', 'resolvieran']
    },
    vestir: {
      present:     ['visto', 'vistes', 'viste', 'vestimos', 'vestís', 'visten'],
      preterite:   ['vestí', 'vestiste', 'vistió', 'vestimos', 'vestisteis', 'vistieron'],
      imperfect:   ['vestía', 'vestías', 'vestía', 'vestíamos', 'vestíais', 'vestían'],
      future:      ['vestiré', 'vestirás', 'vestirá', 'vestiremos', 'vestiréis', 'vestirán'],
      conditional: ['vestiría', 'vestirías', 'vestiría', 'vestiríamos', 'vestiríais', 'vestirían'],
      subjunctive: ['vista', 'vistas', 'vista', 'vistamos', 'vistáis', 'vistan'],
      imperfect_subjunctive: ['vistiera', 'vistieras', 'vistiera', 'vistiéramos', 'vistierais', 'vistieran']
    },
    servir: {
      present:     ['sirvo', 'sirves', 'sirve', 'servimos', 'servís', 'sirven'],
      preterite:   ['serví', 'serviste', 'sirvió', 'servimos', 'servisteis', 'sirvieron'],
      imperfect:   ['servía', 'servías', 'servía', 'servíamos', 'servíais', 'servían'],
      future:      ['serviré', 'servirás', 'servirá', 'serviremos', 'serviréis', 'servirán'],
      conditional: ['serviría', 'servirías', 'serviría', 'serviríamos', 'serviríais', 'servirían'],
      subjunctive: ['sirva', 'sirvas', 'sirva', 'sirvamos', 'sirváis', 'sirvan'],
      imperfect_subjunctive: ['sirviera', 'sirvieras', 'sirviera', 'sirviéramos', 'sirvierais', 'sirvieran']
    },
    valer: {
      present:     ['valgo', 'vales', 'vale', 'valemos', 'valéis', 'valen'],
      preterite:   ['valí', 'valiste', 'valió', 'valimos', 'valisteis', 'valieron'],
      imperfect:   ['valía', 'valías', 'valía', 'valíamos', 'valíais', 'valían'],
      future:      ['valdré', 'valdrás', 'valdrá', 'valdremos', 'valdréis', 'valdrán'],
      conditional: ['valdría', 'valdrías', 'valdría', 'valdríamos', 'valdríais', 'valdrían'],
      subjunctive: ['valga', 'valgas', 'valga', 'valgamos', 'valgáis', 'valgan'],
      imperfect_subjunctive: ['valiera', 'valieras', 'valiera', 'valiéramos', 'valierais', 'valieran']
    },
    caber: {
      present:     ['quepo', 'cabes', 'cabe', 'cabemos', 'cabéis', 'caben'],
      preterite:   ['cupe', 'cupiste', 'cupo', 'cupimos', 'cupisteis', 'cupieron'],
      imperfect:   ['cabía', 'cabías', 'cabía', 'cabíamos', 'cabíais', 'cabían'],
      future:      ['cabré', 'cabrás', 'cabrá', 'cabremos', 'cabréis', 'cabrán'],
      conditional: ['cabría', 'cabrías', 'cabría', 'cabríamos', 'cabríais', 'cabrían'],
      subjunctive: ['quepa', 'quepas', 'quepa', 'quepamos', 'quepáis', 'quepan'],
      imperfect_subjunctive: ['cupiera', 'cupieras', 'cupiera', 'cupiéramos', 'cupierais', 'cupieran']
    },
    leer: {
      present:     ['leo', 'lees', 'lee', 'leemos', 'leéis', 'leen'],
      preterite:   ['leí', 'leíste', 'leyó', 'leímos', 'leísteis', 'leyeron'],
      imperfect:   ['leía', 'leías', 'leía', 'leíamos', 'leíais', 'leían'],
      future:      ['leeré', 'leerás', 'leerá', 'leeremos', 'leeréis', 'leerán'],
      conditional: ['leería', 'leerías', 'leería', 'leeríamos', 'leeríais', 'leerían'],
      subjunctive: ['lea', 'leas', 'lea', 'leamos', 'leáis', 'lean'],
      imperfect_subjunctive: ['leyera', 'leyeras', 'leyera', 'leyéramos', 'leyerais', 'leyeran']
    },
    creer: {
      present:     ['creo', 'crees', 'cree', 'creemos', 'creéis', 'creen'],
      preterite:   ['creí', 'creíste', 'creyó', 'creímos', 'creísteis', 'creyeron'],
      imperfect:   ['creía', 'creías', 'creía', 'creíamos', 'creíais', 'creían'],
      future:      ['creeré', 'creerás', 'creerá', 'creeremos', 'creeréis', 'creerán'],
      conditional: ['creería', 'creerías', 'creería', 'creeríamos', 'creeríais', 'creerían'],
      subjunctive: ['crea', 'creas', 'crea', 'creamos', 'creáis', 'crean'],
      imperfect_subjunctive: ['creyera', 'creyeras', 'creyera', 'creyéramos', 'creyerais', 'creyeran']
    },
    reír: {
      present:     ['río', 'ríes', 'ríe', 'reímos', 'reís', 'ríen'],
      preterite:   ['reí', 'reíste', 'rio', 'reímos', 'reísteis', 'rieron'],
      imperfect:   ['reía', 'reías', 'reía', 'reíamos', 'reíais', 'reían'],
      future:      ['reiré', 'reirás', 'reirá', 'reiremos', 'reiréis', 'reirán'],
      conditional: ['reiría', 'reirías', 'reiría', 'reiríamos', 'reiríais', 'reirían'],
      subjunctive: ['ría', 'rías', 'ría', 'riamos', 'riáis', 'rían'],
      imperfect_subjunctive: ['riera', 'rieras', 'riera', 'riéramos', 'rierais', 'rieran']
    },
    romper: {
      present:     ['rompo', 'rompes', 'rompe', 'rompemos', 'rompéis', 'rompen'],
      preterite:   ['rompí', 'rompiste', 'rompió', 'rompimos', 'rompisteis', 'rompieron'],
      imperfect:   ['rompía', 'rompías', 'rompía', 'rompíamos', 'rompíais', 'rompían'],
      future:      ['romperé', 'romperás', 'romperá', 'romperemos', 'romperéis', 'romperán'],
      conditional: ['rompería', 'romperías', 'rompería', 'romperíamos', 'romperíais', 'romperían'],
      subjunctive: ['rompa', 'rompas', 'rompa', 'rompamos', 'rompáis', 'rompan'],
      imperfect_subjunctive: ['rompiera', 'rompieras', 'rompiera', 'rompiéramos', 'rompierais', 'rompieran']
    },
    satisfacer: {
      present:     ['satisfago', 'satisfaces', 'satisface', 'satisfacemos', 'satisfacéis', 'satisfacen'],
      preterite:   ['satisfice', 'satisficiste', 'satisfizo', 'satisficimos', 'satisficisteis', 'satisficieron'],
      imperfect:   ['satisfacía', 'satisfacías', 'satisfacía', 'satisfacíamos', 'satisfacíais', 'satisfacían'],
      future:      ['satisfaré', 'satisfarás', 'satisfará', 'satisfaremos', 'satisfaréis', 'satisfarán'],
      conditional: ['satisfaría', 'satisfarías', 'satisfaría', 'satisfaríamos', 'satisfaríais', 'satisfarían'],
      subjunctive: ['satisfaga', 'satisfagas', 'satisfaga', 'satisfagamos', 'satisfagáis', 'satisfagan'],
      imperfect_subjunctive: ['satisficiera', 'satisficieras', 'satisficiera', 'satisficiéramos', 'satisficierais', 'satisficieran']
    },
    huir: {
      present:     ['huyo', 'huyes', 'huye', 'huimos', 'huís', 'huyen'],
      preterite:   ['huí', 'huiste', 'huyó', 'huimos', 'huisteis', 'huyeron'],
      imperfect:   ['huía', 'huías', 'huía', 'huíamos', 'huíais', 'huían'],
      future:      ['huiré', 'huirás', 'huirá', 'huiremos', 'huiréis', 'huirán'],
      conditional: ['huiría', 'huirías', 'huiría', 'huiríamos', 'huiríais', 'huirían'],
      subjunctive: ['huya', 'huyas', 'huya', 'huyamos', 'huyáis', 'huyan'],
      imperfect_subjunctive: ['huyera', 'huyeras', 'huyera', 'huyéramos', 'huyerais', 'huyeran']
    },
    preferir: {
      present:     ['prefiero', 'prefieres', 'prefiere', 'preferimos', 'preferís', 'prefieren'],
      preterite:   ['preferí', 'preferiste', 'prefirió', 'preferimos', 'preferisteis', 'prefirieron'],
      imperfect:   ['prefería', 'preferías', 'prefería', 'preferíamos', 'preferíais', 'preferían'],
      future:      ['preferiré', 'preferirás', 'preferirá', 'preferiremos', 'preferiréis', 'preferirán'],
      conditional: ['preferiría', 'preferirías', 'preferiría', 'preferiríamos', 'preferiríais', 'preferirían'],
      subjunctive: ['prefiera', 'prefieras', 'prefiera', 'prefiramos', 'prefiráis', 'prefieran'],
      imperfect_subjunctive: ['prefiriera', 'prefirieras', 'prefiriera', 'prefiriéramos', 'prefirierais', 'prefirieran']
    },
    mentir: {
      present:     ['miento', 'mientes', 'miente', 'mentimos', 'mentís', 'mienten'],
      preterite:   ['mentí', 'mentiste', 'mintió', 'mentimos', 'mentisteis', 'mintieron'],
      imperfect:   ['mentía', 'mentías', 'mentía', 'mentíamos', 'mentíais', 'mentían'],
      future:      ['mentiré', 'mentirás', 'mentirá', 'mentiremos', 'mentiréis', 'mentirán'],
      conditional: ['mentiría', 'mentirías', 'mentiría', 'mentiríamos', 'mentiríais', 'mentirían'],
      subjunctive: ['mienta', 'mientas', 'mienta', 'mintamos', 'mintáis', 'mientan'],
      imperfect_subjunctive: ['mintiera', 'mintieras', 'mintiera', 'mintiéramos', 'mintierais', 'mintieran']
    },
    repetir: {
      present:     ['repito', 'repites', 'repite', 'repetimos', 'repetís', 'repiten'],
      preterite:   ['repetí', 'repetiste', 'repitió', 'repetimos', 'repetisteis', 'repitieron'],
      imperfect:   ['repetía', 'repetías', 'repetía', 'repetíamos', 'repetíais', 'repetían'],
      future:      ['repetiré', 'repetirás', 'repetirá', 'repetiremos', 'repetiréis', 'repetirán'],
      conditional: ['repetiría', 'repetirías', 'repetiría', 'repetiríamos', 'repetiríais', 'repetirían'],
      subjunctive: ['repita', 'repitas', 'repita', 'repitamos', 'repitáis', 'repitan'],
      imperfect_subjunctive: ['repitiera', 'repitieras', 'repitiera', 'repitiéramos', 'repitierais', 'repitieran']
    },
    medir: {
      present:     ['mido', 'mides', 'mide', 'medimos', 'medís', 'miden'],
      preterite:   ['medí', 'mediste', 'midió', 'medimos', 'medisteis', 'midieron'],
      imperfect:   ['medía', 'medías', 'medía', 'medíamos', 'medíais', 'medían'],
      future:      ['mediré', 'medirás', 'medirá', 'mediremos', 'mediréis', 'medirán'],
      conditional: ['mediría', 'medirías', 'mediría', 'mediríamos', 'mediríais', 'medirían'],
      subjunctive: ['mida', 'midas', 'mida', 'midamos', 'midáis', 'midan'],
      imperfect_subjunctive: ['midiera', 'midieras', 'midiera', 'midiéramos', 'midierais', 'midieran']
    },
    corregir: {
      present:     ['corrijo', 'corriges', 'corrige', 'corregimos', 'corregís', 'corrigen'],
      preterite:   ['corregí', 'corregiste', 'corrigió', 'corregimos', 'corregisteis', 'corrigieron'],
      imperfect:   ['corregía', 'corregías', 'corregía', 'corregíamos', 'corregíais', 'corregían'],
      future:      ['corregiré', 'corregirás', 'corregirá', 'corregiremos', 'corregiréis', 'corregirán'],
      conditional: ['corregiría', 'corregirías', 'corregiría', 'corregiríamos', 'corregiríais', 'corregirían'],
      subjunctive: ['corrija', 'corrijas', 'corrija', 'corrijamos', 'corrijáis', 'corrijan'],
      imperfect_subjunctive: ['corrigiera', 'corrigieras', 'corrigiera', 'corrigiéramos', 'corrigierais', 'corrigieran']
    },
    conseguir: {
      present:     ['consigo', 'consigues', 'consigue', 'conseguimos', 'conseguís', 'consiguen'],
      preterite:   ['conseguí', 'conseguiste', 'consiguió', 'conseguimos', 'conseguisteis', 'consiguieron'],
      imperfect:   ['conseguía', 'conseguías', 'conseguía', 'conseguíamos', 'conseguíais', 'conseguían'],
      future:      ['conseguiré', 'conseguirás', 'conseguirá', 'conseguiremos', 'conseguiréis', 'conseguirán'],
      conditional: ['conseguiría', 'conseguirías', 'conseguiría', 'conseguiríamos', 'conseguiríais', 'conseguirían'],
      subjunctive: ['consiga', 'consigas', 'consiga', 'consigamos', 'consigáis', 'consigan'],
      imperfect_subjunctive: ['consiguiera', 'consiguieras', 'consiguiera', 'consiguiéramos', 'consiguierais', 'consiguieran']
    },
    nacer: {
      present:     ['nazco', 'naces', 'nace', 'nacemos', 'nacéis', 'nacen'],
      preterite:   ['nací', 'naciste', 'nació', 'nacimos', 'nacisteis', 'nacieron'],
      imperfect:   ['nacía', 'nacías', 'nacía', 'nacíamos', 'nacíais', 'nacían'],
      future:      ['naceré', 'nacerás', 'nacerá', 'naceremos', 'naceréis', 'nacerán'],
      conditional: ['nacería', 'nacerías', 'nacería', 'naceríamos', 'naceríais', 'nacerían'],
      subjunctive: ['nazca', 'nazcas', 'nazca', 'nazcamos', 'nazcáis', 'nazcan'],
      imperfect_subjunctive: ['naciera', 'nacieras', 'naciera', 'naciéramos', 'nacierais', 'nacieran']
    },
    parecer: {
      present:     ['parezco', 'pareces', 'parece', 'parecemos', 'parecéis', 'parecen'],
      preterite:   ['parecí', 'pareciste', 'pareció', 'parecimos', 'parecisteis', 'parecieron'],
      imperfect:   ['parecía', 'parecías', 'parecía', 'parecíamos', 'parecíais', 'parecían'],
      future:      ['pareceré', 'parecerás', 'parecerá', 'pareceremos', 'pareceréis', 'parecerán'],
      conditional: ['parecería', 'parecerías', 'parecería', 'pareceríamos', 'pareceríais', 'parecerían'],
      subjunctive: ['parezca', 'parezcas', 'parezca', 'parezcamos', 'parezcáis', 'parezcan'],
      imperfect_subjunctive: ['pareciera', 'parecieras', 'pareciera', 'pareciéramos', 'parecierais', 'parecieran']
    }
  };

  // English-to-infinitive mapping for common verbs
  var ENGLISH_TO_INFINITIVE = {
    'be': 'ser', 'am': 'ser', 'is': 'ser', 'are': 'ser',
    'have': 'tener', 'has': 'tener',
    'go': 'ir', 'goes': 'ir', 'going': 'ir',
    'do': 'hacer', 'does': 'hacer', 'make': 'hacer',
    'want': 'querer', 'wants': 'querer',
    'eat': 'comer', 'eats': 'comer',
    'drink': 'beber', 'drinks': 'beber',
    'speak': 'hablar', 'speaks': 'hablar', 'talk': 'hablar',
    'read': 'leer', 'reads': 'leer',
    'write': 'escribir', 'writes': 'escribir',
    'study': 'estudiar', 'studies': 'estudiar',
    'learn': 'aprender', 'learns': 'aprender',
    'teach': 'enseñar', 'teaches': 'enseñar',
    'live': 'vivir', 'lives': 'vivir',
    'work': 'trabajar', 'works': 'trabajar',
    'sleep': 'dormir', 'sleeps': 'dormir',
    'come': 'venir', 'comes': 'venir',
    'know': 'saber', 'knows': 'saber',
    'give': 'dar', 'gives': 'dar',
    'see': 'ver', 'sees': 'ver',
    'say': 'decir', 'says': 'decir', 'tell': 'decir',
    'put': 'poner', 'puts': 'poner',
    'leave': 'salir', 'leaves': 'salir',
    'buy': 'comprar', 'buys': 'comprar',
    'play': 'jugar', 'plays': 'jugar',
    'sing': 'cantar', 'sings': 'cantar',
    'dance': 'bailar', 'dances': 'bailar',
    'run': 'correr', 'runs': 'correr',
    'walk': 'caminar', 'walks': 'caminar',
    'swim': 'nadar', 'swims': 'nadar',
    'cook': 'cocinar', 'cooks': 'cocinar',
    'open': 'abrir', 'opens': 'abrir',
    'close': 'cerrar', 'closes': 'cerrar',
    'think': 'pensar', 'thinks': 'pensar',
    'believe': 'creer', 'believes': 'creer',
    'understand': 'entender', 'understands': 'entender',
    'love': 'amar', 'loves': 'amar',
    'like': 'gustar', 'likes': 'gustar',
    'need': 'necesitar', 'needs': 'necesitar',
    'help': 'ayudar', 'helps': 'ayudar',
    'wait': 'esperar', 'waits': 'esperar',
    'pay': 'pagar', 'pays': 'pagar',
    'find': 'encontrar', 'finds': 'encontrar',
    'take': 'tomar', 'takes': 'tomar',
    'ask': 'preguntar', 'asks': 'preguntar',
    'answer': 'responder', 'answers': 'responder',
    'can': 'poder',
    'start': 'empezar', 'begin': 'empezar',
    'return': 'volver',
    'feel': 'sentir', 'feels': 'sentir',
    'follow': 'seguir', 'follows': 'seguir',
    'bring': 'traer', 'brings': 'traer',
    'hear': 'oír', 'hears': 'oír',
    'fall': 'caer', 'falls': 'caer'
  };

  /**
   * Resolve a verb input to a Spanish infinitive.
   * Accepts Spanish infinitive directly, or English word.
   */
  function resolveVerb(input) {
    var v = input.toLowerCase().trim();
    // Remove "to " prefix
    if (v.indexOf('to ') === 0) v = v.slice(3);
    // Check if it's already a known infinitive
    if (IRREGULARS[v]) return v;
    // Check regular patterns
    if (v.endsWith('ar') || v.endsWith('er') || v.endsWith('ir')) {
      return v; // assume it's a Spanish infinitive
    }
    // Try English mapping
    if (ENGLISH_TO_INFINITIVE[v]) return ENGLISH_TO_INFINITIVE[v];
    return v; // return as-is, will attempt regular conjugation
  }

  /**
   * Get the verb type: 'ar', 'er', or 'ir'.
   */
  function getVerbType(infinitive) {
    if (infinitive.endsWith('ar')) return 'ar';
    if (infinitive.endsWith('er')) return 'er';
    if (infinitive.endsWith('ir') || infinitive.endsWith('ír')) return 'ir';
    return null;
  }

  /**
   * Conjugate a verb in a given tense.
   * Returns: { verb, tense, conjugations: [{pronoun, form}], irregular }
   * or null if the verb can't be conjugated.
   */
  // Haber conjugations for compound tenses
  var HABER_FORMS = {
    present:     ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
    imperfect:   ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
    future:      ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
    conditional: ['habría', 'habrías', 'habría', 'habríamos', 'habríais', 'habrían'],
    subjunctive: ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan']
  };

  // Reflexive pronouns
  var REFLEXIVE_PRONOUNS = ['me', 'te', 'se', 'nos', 'os', 'se'];

  // Stem-changing verb patterns (e→ie, o→ue, e→i, u→ue)
  var STEM_CHANGE_PATTERNS = {
    'e_ie': {
      affected: [0, 1, 2, 5], // yo, tú, él, ellos
      tenses: ['present', 'subjunctive'],
      change: function(stem) { return stem.replace(/e(?!.*e)/, 'ie'); }
    },
    'o_ue': {
      affected: [0, 1, 2, 5],
      tenses: ['present', 'subjunctive'],
      change: function(stem) { return stem.replace(/o(?!.*o)/, 'ue'); }
    },
    'e_i': {
      affected: [0, 1, 2, 5],
      tenses: ['present', 'subjunctive', 'preterite'],
      change: function(stem) { return stem.replace(/e(?!.*e)/, 'i'); }
    },
    'u_ue': {
      affected: [0, 1, 2, 5],
      tenses: ['present', 'subjunctive'],
      change: function(stem) { return stem.replace(/u(?!.*u)/, 'ue'); }
    }
  };

  // Known stem-changing verbs and their pattern
  var STEM_CHANGERS = {
    pensar: 'e_ie', empezar: 'e_ie', cerrar: 'e_ie', entender: 'e_ie',
    perder: 'e_ie', querer: 'e_ie', sentir: 'e_ie', preferir: 'e_ie',
    mentir: 'e_ie', despertar: 'e_ie', calentar: 'e_ie', recomendar: 'e_ie',
    sugerir: 'e_ie', divertir: 'e_ie', convertir: 'e_ie', defender: 'e_ie',
    encender: 'e_ie', gobernar: 'e_ie', negar: 'e_ie', temblar: 'e_ie',
    volver: 'o_ue', dormir: 'o_ue', morir: 'o_ue', poder: 'o_ue',
    contar: 'o_ue', encontrar: 'o_ue', mostrar: 'o_ue', recordar: 'o_ue',
    almorzar: 'o_ue', costar: 'o_ue', devolver: 'o_ue', mover: 'o_ue',
    resolver: 'o_ue', soler: 'o_ue', soñar: 'o_ue', volar: 'o_ue',
    llover: 'o_ue', probar: 'o_ue', rogar: 'o_ue', torcer: 'o_ue',
    pedir: 'e_i', servir: 'e_i', vestir: 'e_i', repetir: 'e_i',
    seguir: 'e_i', elegir: 'e_i', medir: 'e_i', corregir: 'e_i',
    conseguir: 'e_i', competir: 'e_i', impedir: 'e_i', despedir: 'e_i',
    reír: 'e_i', freír: 'e_i', sonreír: 'e_i', rendir: 'e_i',
    jugar: 'u_ue'
  };

  /**
   * Get the past participle of a verb.
   * Returns the irregular participle if known, otherwise generates regular form.
   */
  function getParticiple(verbInput) {
    var infinitive = resolveVerb(verbInput);
    if (IRREGULAR_PARTICIPLES[infinitive]) {
      return { form: IRREGULAR_PARTICIPLES[infinitive], irregular: true, verb: infinitive };
    }
    var type = getVerbType(infinitive);
    if (!type) return null;
    var stem = infinitive.slice(0, infinitive.length - 2);
    var ending = (type === 'ar') ? 'ado' : 'ido';
    return { form: stem + ending, irregular: false, verb: infinitive };
  }

  /**
   * Get the gerund (present participle) of a verb.
   * Returns the irregular gerund if known, otherwise generates regular form.
   */
  function getGerund(verbInput) {
    var infinitive = resolveVerb(verbInput);
    if (IRREGULAR_GERUNDS[infinitive]) {
      return { form: IRREGULAR_GERUNDS[infinitive], irregular: true, verb: infinitive };
    }
    var type = getVerbType(infinitive);
    if (!type) return null;
    var stem = infinitive.slice(0, infinitive.length - 2);
    var ending = (type === 'ar') ? 'ando' : 'iendo';
    // Handle stems ending in vowel → -yendo (e.g., le-er → leyendo)
    if ((type === 'er' || type === 'ir') && /[aeiouáéíóú]$/.test(stem)) {
      ending = 'yendo';
    }
    return { form: stem + ending, irregular: false, verb: infinitive };
  }

  /**
   * Conjugate a compound tense (present_perfect, pluperfect, future_perfect, conditional_perfect).
   * Uses haber + past participle.
   */
  function conjugateCompound(verbInput, tense) {
    var infinitive = resolveVerb(verbInput);
    var participle = getParticiple(infinitive);
    if (!participle) return null;

    var haberTense;
    switch (tense) {
      case 'present_perfect': haberTense = 'present'; break;
      case 'pluperfect': haberTense = 'imperfect'; break;
      case 'future_perfect': haberTense = 'future'; break;
      case 'conditional_perfect': haberTense = 'conditional'; break;
      default: return null;
    }

    var haberForms = HABER_FORMS[haberTense];
    if (!haberForms) return null;

    var result = {
      verb: infinitive,
      tense: tense,
      tenseName: TENSE_NAMES[tense] || tense,
      conjugations: [],
      irregular: participle.irregular,
      compound: true,
      participle: participle.form
    };

    for (var i = 0; i < PRONOUNS.length; i++) {
      result.conjugations.push({
        pronoun: PRONOUNS[i],
        form: haberForms[i] + ' ' + participle.form
      });
    }

    return result;
  }

  /**
   * Conjugate an imperative form (affirmative or negative).
   */
  function conjugateImperative(verbInput, negative) {
    var infinitive = resolveVerb(verbInput);
    var type = getVerbType(infinitive);
    if (!type) return null;

    var tenseName = negative ? 'imperative_negative' : 'imperative_affirmative';
    var result = {
      verb: infinitive,
      tense: tenseName,
      tenseName: TENSE_NAMES[tenseName] || tenseName,
      conjugations: [],
      irregular: false
    };

    var stem = infinitive.slice(0, infinitive.length - 2);
    var forms;

    if (negative) {
      // Negative imperatives use subjunctive forms
      var subjResult = conjugate(infinitive, 'subjunctive');
      if (!subjResult) return null;
      forms = subjResult.conjugations.map(function(c) { return c.form; });
      // Add "no" before each form
      forms = forms.map(function(f, idx) {
        return idx === 0 ? '—' : 'no ' + f;
      });
      result.irregular = subjResult.irregular;
    } else {
      // Affirmative imperatives
      // Check for irregular affirmative tú forms
      var irregTu = {
        ser: 'sé', ir: 've', tener: 'ten', hacer: 'haz',
        poner: 'pon', salir: 'sal', venir: 'ven', decir: 'di',
        valer: 'val', haber: 'he'
      };

      if (IRREGULARS[infinitive] && IRREGULARS[infinitive].subjunctive) {
        var subj = IRREGULARS[infinitive].subjunctive;
        forms = [
          '—',
          irregTu[infinitive] || (IRREGULARS[infinitive].present ? IRREGULARS[infinitive].present[2] : stem + IMPERATIVE_ENDINGS[type].affirmative[1]),
          subj[2],  // usted
          subj[3],  // nosotros
          stem + IMPERATIVE_ENDINGS[type].affirmative[4], // vosotros
          subj[5]   // ustedes
        ];
        result.irregular = true;
      } else {
        var endings = IMPERATIVE_ENDINGS[type].affirmative;
        forms = endings.map(function(e) {
          if (e === '—') return '—';
          return stem + e;
        });
      }
    }

    for (var i = 0; i < PRONOUNS.length; i++) {
      result.conjugations.push({
        pronoun: PRONOUNS[i],
        form: forms[i]
      });
    }

    return result;
  }

  /**
   * Conjugate a reflexive verb in a given tense.
   * Handles pronoun placement for all tense types.
   */
  function conjugateReflexive(verbInput, tense) {
    var infinitive = resolveVerb(verbInput);
    // Strip -se suffix if present
    var baseVerb = infinitive;
    var isReflexive = false;
    if (infinitive.endsWith('se')) {
      baseVerb = infinitive.slice(0, -2);
      isReflexive = true;
    } else if (infinitive.endsWith('rse')) {
      baseVerb = infinitive.slice(0, -2);
      isReflexive = true;
    }
    if (!isReflexive) baseVerb = infinitive;

    var t = tense || 'present';

    // Get base conjugation
    var base;
    if (t === 'present_perfect' || t === 'pluperfect' || t === 'future_perfect' || t === 'conditional_perfect') {
      base = conjugateCompound(baseVerb, t);
    } else if (t === 'imperative_affirmative') {
      base = conjugateImperative(baseVerb, false);
    } else if (t === 'imperative_negative') {
      base = conjugateImperative(baseVerb, true);
    } else {
      base = conjugate(baseVerb, t);
    }

    if (!base) return null;

    var result = {
      verb: infinitive,
      tense: t,
      tenseName: TENSE_NAMES[t] || t,
      conjugations: [],
      irregular: base.irregular,
      reflexive: true
    };

    for (var i = 0; i < PRONOUNS.length; i++) {
      var form = base.conjugations[i].form;
      if (form === '—') {
        result.conjugations.push({ pronoun: PRONOUNS[i], form: '—' });
        continue;
      }

      var refPron = REFLEXIVE_PRONOUNS[i];

      if (t === 'imperative_affirmative') {
        // Affirmative imperatives: pronoun attached after verb
        result.conjugations.push({ pronoun: PRONOUNS[i], form: form + refPron });
      } else if (t === 'imperative_negative') {
        // Negative imperatives: pronoun before verb (after "no")
        result.conjugations.push({ pronoun: PRONOUNS[i], form: 'no ' + refPron + ' ' + form.replace('no ', '') });
      } else if (t === 'gerund' || t === 'past_participle') {
        result.conjugations.push({ pronoun: PRONOUNS[i], form: refPron + ' ' + form });
      } else {
        // All other tenses: pronoun before conjugated verb
        result.conjugations.push({ pronoun: PRONOUNS[i], form: refPron + ' ' + form });
      }
    }

    return result;
  }

  /**
   * Conjugate a verb in a given tense.
   * Returns: { verb, tense, conjugations: [{pronoun, form}], irregular }
   * or null if the verb can't be conjugated.
   * Supports all simple, compound, and imperative tenses.
   */
  function conjugate(verbInput, tense) {
    var infinitive = resolveVerb(verbInput);
    var t = tense || 'present';

    // Handle compound tenses
    if (t === 'present_perfect' || t === 'pluperfect' || t === 'future_perfect' || t === 'conditional_perfect') {
      return conjugateCompound(infinitive, t);
    }

    // Handle imperative
    if (t === 'imperative_affirmative') {
      return conjugateImperative(infinitive, false);
    }
    if (t === 'imperative_negative') {
      return conjugateImperative(infinitive, true);
    }

    // Handle gerund
    if (t === 'gerund') {
      var ger = getGerund(infinitive);
      if (!ger) return null;
      return {
        verb: infinitive, tense: t, tenseName: TENSE_NAMES[t] || t,
        conjugations: [{ pronoun: '—', form: ger.form }],
        irregular: ger.irregular
      };
    }

    // Handle past participle
    if (t === 'past_participle') {
      var part = getParticiple(infinitive);
      if (!part) return null;
      return {
        verb: infinitive, tense: t, tenseName: TENSE_NAMES[t] || t,
        conjugations: [
          { pronoun: 'masculino singular', form: part.form },
          { pronoun: 'femenino singular', form: part.form.replace(/o$/, 'a') },
          { pronoun: 'masculino plural', form: part.form + 's' },
          { pronoun: 'femenino plural', form: part.form.replace(/o$/, 'a') + 's' }
        ],
        irregular: part.irregular
      };
    }

    var result = {
      verb: infinitive,
      tense: t,
      tenseName: TENSE_NAMES[t] || t,
      conjugations: [],
      irregular: false
    };

    var forms;

    // Check irregular
    if (IRREGULARS[infinitive] && IRREGULARS[infinitive][t]) {
      forms = IRREGULARS[infinitive][t];
      result.irregular = true;
    } else {
      // Regular conjugation
      var type = getVerbType(infinitive);
      if (!type) return null;
      var stem = infinitive.slice(0, infinitive.length - 2);

      // Check for imperfect_subjunctive with regular endings
      if (t === 'imperfect_subjunctive') {
        var endings = REGULAR_ENDINGS[type][t];
        if (!endings) return null;
        forms = endings.map(function(ending) { return stem + ending; });
      } else if (t === 'future' || t === 'conditional') {
        var futCondEndings;
        if (t === 'future') {
          futCondEndings = ['é', 'ás', 'á', 'emos', 'éis', 'án'];
        } else {
          futCondEndings = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'];
        }
        forms = futCondEndings.map(function (ending) {
          return infinitive + ending;
        });
      } else {
        var endings = REGULAR_ENDINGS[type][t];
        if (!endings) return null;
        forms = endings.map(function (ending) {
          return stem + ending;
        });
      }
    }

    for (var i = 0; i < PRONOUNS.length; i++) {
      result.conjugations.push({
        pronoun: PRONOUNS[i],
        form: forms[i]
      });
    }

    return result;
  }

  /**
   * Conjugate a verb in all tenses. Returns object keyed by tense.
   */
  function conjugateAll(verbInput) {
    var tenses = [
      'present', 'preterite', 'imperfect', 'future', 'conditional',
      'subjunctive', 'imperfect_subjunctive',
      'imperative_affirmative', 'imperative_negative',
      'present_perfect', 'pluperfect', 'future_perfect', 'conditional_perfect',
      'gerund', 'past_participle'
    ];
    var results = {};
    for (var i = 0; i < tenses.length; i++) {
      results[tenses[i]] = conjugate(verbInput, tenses[i]);
    }
    return results;
  }

  /**
   * Format a conjugation result as an HTML table string.
   */
  function formatTable(result) {
    if (!result) return '<p>Sorry, I couldn\'t conjugate that verb.</p>';
    var html = '<div class="conjugation-table">';
    html += '<div class="conj-header"><strong>' + result.verb + '</strong> — ' + result.tenseName;
    if (result.irregular) html += ' <span class="irregular-badge">Irregular</span>';
    if (result.compound) html += ' <span class="compound-badge">Compound</span>';
    if (result.reflexive) html += ' <span class="reflexive-badge">Reflexive</span>';
    html += '</div>';
    html += '<table><thead><tr><th>Pronoun</th><th>Form</th></tr></thead><tbody>';
    for (var i = 0; i < result.conjugations.length; i++) {
      var c = result.conjugations[i];
      html += '<tr><td>' + c.pronoun + '</td><td class="spanish-text">' + c.form + '</td></tr>';
    }
    html += '</tbody></table></div>';
    return html;
  }

  /**
   * Format all conjugations as a comprehensive HTML display.
   */
  function formatAllTables(verbInput) {
    var all = conjugateAll(verbInput);
    if (!all) return '<p>Sorry, I couldn\'t conjugate that verb.</p>';
    var html = '<div class="conjugation-all">';
    html += '<h3 class="conj-verb-title">Full Conjugation: ' + resolveVerb(verbInput) + '</h3>';

    var groups = [
      { label: 'Indicative', tenses: ['present', 'preterite', 'imperfect', 'future', 'conditional'] },
      { label: 'Subjunctive', tenses: ['subjunctive', 'imperfect_subjunctive'] },
      { label: 'Imperative', tenses: ['imperative_affirmative', 'imperative_negative'] },
      { label: 'Compound Tenses', tenses: ['present_perfect', 'pluperfect', 'future_perfect', 'conditional_perfect'] },
      { label: 'Non-Finite Forms', tenses: ['gerund', 'past_participle'] }
    ];

    for (var g = 0; g < groups.length; g++) {
      html += '<div class="conj-group"><h4>' + groups[g].label + '</h4>';
      for (var t = 0; t < groups[g].tenses.length; t++) {
        var tense = groups[g].tenses[t];
        if (all[tense]) {
          html += formatTable(all[tense]);
        }
      }
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Get verb information: type, stem changes, irregular status, participle, gerund.
   */
  function getVerbInfo(verbInput) {
    var infinitive = resolveVerb(verbInput);
    var type = getVerbType(infinitive);
    var stemChange = STEM_CHANGERS[infinitive] || null;
    var isIrregular = !!IRREGULARS[infinitive];
    var participle = getParticiple(infinitive);
    var gerund = getGerund(infinitive);

    return {
      infinitive: infinitive,
      type: type,
      stemChange: stemChange,
      irregular: isIrregular,
      participle: participle ? participle.form : null,
      gerund: gerund ? gerund.form : null,
      irregularParticiple: participle ? participle.irregular : false,
      irregularGerund: gerund ? gerund.irregular : false
    };
  }

  /**
   * Check if a verb is known (irregular or looks like a valid infinitive).
   */
  function isKnownVerb(verbInput) {
    var v = resolveVerb(verbInput);
    if (IRREGULARS[v]) return true;
    if (getVerbType(v)) return true;
    return false;
  }

  /**
   * Get list of all known irregular verbs.
   */
  function getIrregularVerbs() {
    return Object.keys(IRREGULARS);
  }

  /**
   * Get all available tense names.
   */
  function getTenseNames() {
    return Object.assign({}, TENSE_NAMES);
  }

  /**
   * Get the list of available tense keys.
   */
  function getAvailableTenses() {
    return Object.keys(TENSE_NAMES);
  }

  /**
   * Search for verbs matching a pattern.
   */
  function searchVerbs(query) {
    var q = query.toLowerCase();
    var results = [];
    var irregKeys = Object.keys(IRREGULARS);
    for (var i = 0; i < irregKeys.length; i++) {
      if (irregKeys[i].indexOf(q) !== -1) {
        results.push(irregKeys[i]);
      }
    }
    // Also search ENGLISH_TO_INFINITIVE
    var engKeys = Object.keys(ENGLISH_TO_INFINITIVE);
    for (var j = 0; j < engKeys.length; j++) {
      if (engKeys[j].indexOf(q) !== -1) {
        var verb = ENGLISH_TO_INFINITIVE[engKeys[j]];
        if (results.indexOf(verb) === -1) {
          results.push(verb);
        }
      }
    }
    return results;
  }

  /**
   * Generate a practice drill for a verb in a specific tense.
   * Returns an array of fill-in-the-blank questions.
   */
  function generateDrill(verbInput, tense) {
    var result = conjugate(verbInput, tense);
    if (!result) return null;

    var questions = [];
    for (var i = 0; i < result.conjugations.length; i++) {
      var c = result.conjugations[i];
      if (c.form === '—') continue;
      questions.push({
        question: c.pronoun + ' _______ (' + result.verb + ' - ' + result.tenseName + ')',
        answer: c.form,
        pronoun: c.pronoun,
        verb: result.verb,
        tense: result.tense
      });
    }
    return questions;
  }

  /**
   * Compare conjugations of two verbs side by side.
   */
  function compareVerbs(verb1, verb2, tense) {
    var t = tense || 'present';
    var r1 = conjugate(verb1, t);
    var r2 = conjugate(verb2, t);
    if (!r1 || !r2) return null;

    var comparison = {
      tense: t,
      tenseName: TENSE_NAMES[t] || t,
      verb1: r1,
      verb2: r2,
      rows: []
    };

    for (var i = 0; i < PRONOUNS.length; i++) {
      comparison.rows.push({
        pronoun: PRONOUNS[i],
        form1: r1.conjugations[i].form,
        form2: r2.conjugations[i].form
      });
    }

    return comparison;
  }

  /**
   * Format a verb comparison as an HTML table.
   */
  function formatComparisonTable(comparison) {
    if (!comparison) return '<p>Could not compare those verbs.</p>';
    var html = '<div class="conjugation-table comparison-table">';
    html += '<div class="conj-header">Comparison: <strong>' + comparison.verb1.verb + '</strong> vs <strong>' + comparison.verb2.verb + '</strong> — ' + comparison.tenseName + '</div>';
    html += '<table><thead><tr><th>Pronoun</th><th>' + comparison.verb1.verb + '</th><th>' + comparison.verb2.verb + '</th></tr></thead><tbody>';
    for (var i = 0; i < comparison.rows.length; i++) {
      var r = comparison.rows[i];
      html += '<tr><td>' + r.pronoun + '</td>';
      html += '<td class="spanish-text">' + r.form1 + '</td>';
      html += '<td class="spanish-text">' + r.form2 + '</td></tr>';
    }
    html += '</tbody></table></div>';
    return html;
  }

  /**
   * Extended English-to-Spanish verb mapping.
   */
  var ENGLISH_TO_INFINITIVE_EXTENDED = {
    'drive': 'conducir', 'translate': 'traducir', 'produce': 'producir',
    'build': 'construir', 'destroy': 'destruir', 'die': 'morir',
    'choose': 'elegir', 'solve': 'resolver', 'dress': 'vestir',
    'serve': 'servir', 'be worth': 'valer', 'fit': 'caber',
    'read': 'leer', 'believe': 'creer', 'laugh': 'reír',
    'break': 'romper', 'satisfy': 'satisfacer', 'flee': 'huir',
    'prefer': 'preferir', 'lie': 'mentir', 'repeat': 'repetir',
    'measure': 'medir', 'correct': 'corregir', 'obtain': 'conseguir',
    'achieve': 'conseguir', 'be born': 'nacer', 'seem': 'parecer',
    'appear': 'parecer', 'count': 'contar', 'find': 'encontrar',
    'show': 'mostrar', 'remember': 'recordar', 'have lunch': 'almorzar',
    'cost': 'costar', 'return (object)': 'devolver', 'move': 'mover',
    'dream': 'soñar', 'fly': 'volar', 'prove': 'probar',
    'taste': 'probar', 'try': 'probar', 'beg': 'rogar',
    'twist': 'torcer', 'compete': 'competir', 'prevent': 'impedir',
    'fire': 'despedir', 'say goodbye': 'despedir', 'smile': 'sonreír',
    'fry': 'freír', 'surrender': 'rendir', 'yield': 'rendir',
    'wake up': 'despertar', 'heat': 'calentar', 'warm': 'calentar',
    'recommend': 'recomendar', 'suggest': 'sugerir', 'amuse': 'divertir',
    'entertain': 'divertir', 'convert': 'convertir', 'defend': 'defender',
    'light': 'encender', 'turn on': 'encender', 'govern': 'gobernar',
    'deny': 'negar', 'tremble': 'temblar', 'rain': 'llover',
    'pray': 'rogar', 'govern': 'gobernar',
    // Original mappings
    'be (permanent)': 'ser', 'be (temporary)': 'estar', 'go': 'ir',
    'have': 'tener', 'do': 'hacer', 'make': 'hacer', 'can': 'poder',
    'want': 'querer', 'know (fact)': 'saber', 'say': 'decir',
    'tell': 'decir', 'come': 'venir', 'put': 'poner', 'leave': 'salir',
    'give': 'dar', 'see': 'ver', 'know (person)': 'conocer',
    'sleep': 'dormir', 'ask for': 'pedir', 'play': 'jugar',
    'think': 'pensar', 'begin': 'empezar', 'start': 'empezar',
    'close': 'cerrar', 'understand': 'entender', 'return': 'volver',
    'feel': 'sentir', 'follow': 'seguir', 'bring': 'traer',
    'hear': 'oír', 'fall': 'caer', 'eat': 'comer', 'drink': 'beber',
    'write': 'escribir', 'speak': 'hablar', 'talk': 'hablar',
    'live': 'vivir', 'work': 'trabajar', 'study': 'estudiar',
    'learn': 'aprender', 'teach': 'enseñar', 'sing': 'cantar',
    'dance': 'bailar', 'run': 'correr', 'walk': 'caminar',
    'swim': 'nadar', 'open': 'abrir', 'buy': 'comprar',
    'sell': 'vender', 'wait': 'esperar', 'hope': 'esperar',
    'love': 'amar', 'like': 'gustar', 'need': 'necesitar',
    'help': 'ayudar', 'call': 'llamar', 'arrive': 'llegar',
    'travel': 'viajar', 'cook': 'cocinar', 'clean': 'limpiar',
    'wash': 'lavar', 'pay': 'pagar', 'send': 'enviar',
    'receive': 'recibir', 'take': 'tomar', 'look': 'mirar',
    'watch': 'mirar', 'listen': 'escuchar', 'answer': 'responder',
    'pass': 'pasar', 'spend (time)': 'pasar', 'change': 'cambiar',
    'use': 'usar', 'finish': 'terminar', 'end': 'terminar',
    'enter': 'entrar', 'exist': 'existir', 'explain': 'explicar',
    'win': 'ganar', 'lose': 'perder', 'miss': 'extrañar',
    'permit': 'permitir', 'allow': 'permitir', 'promise': 'prometer',
    'prepare': 'preparar', 'rest': 'descansar', 'visit': 'visitar',
    'stop': 'parar', 'continue': 'continuar', 'share': 'compartir',
    'discover': 'descubrir', 'cover': 'cubrir', 'offer': 'ofrecer',
    'suffer': 'sufrir', 'enjoy': 'disfrutar', 'improve': 'mejorar',
    'create': 'crear', 'develop': 'desarrollar', 'maintain': 'mantener',
    'support': 'apoyar', 'manage': 'manejar', 'handle': 'manejar',
    'include': 'incluir', 'attend': 'asistir', 'decide': 'decidir',
    'accept': 'aceptar', 'recognize': 'reconocer', 'consider': 'considerar',
    'suppose': 'suponer', 'require': 'requerir', 'depend': 'depender',
    'belong': 'pertenecer', 'remain': 'permanecer', 'grow': 'crecer',
    'establish': 'establecer', 'reach': 'alcanzar'
  };

  // Merge extended mappings into ENGLISH_TO_INFINITIVE
  var extKeys = Object.keys(ENGLISH_TO_INFINITIVE_EXTENDED);
  for (var ek = 0; ek < extKeys.length; ek++) {
    ENGLISH_TO_INFINITIVE[extKeys[ek]] = ENGLISH_TO_INFINITIVE_EXTENDED[extKeys[ek]];
  }

  return {
    conjugate: conjugate,
    conjugateAll: conjugateAll,
    conjugateCompound: conjugateCompound,
    conjugateImperative: conjugateImperative,
    conjugateReflexive: conjugateReflexive,
    formatTable: formatTable,
    formatAllTables: formatAllTables,
    formatComparisonTable: formatComparisonTable,
    resolveVerb: resolveVerb,
    isKnownVerb: isKnownVerb,
    getIrregularVerbs: getIrregularVerbs,
    getParticiple: getParticiple,
    getGerund: getGerund,
    getVerbInfo: getVerbInfo,
    getTenseNames: getTenseNames,
    getAvailableTenses: getAvailableTenses,
    searchVerbs: searchVerbs,
    generateDrill: generateDrill,
    compareVerbs: compareVerbs,
    PRONOUNS: PRONOUNS,
    TENSE_NAMES: TENSE_NAMES
  };
})();
