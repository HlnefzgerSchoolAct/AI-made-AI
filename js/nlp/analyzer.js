// ============================================================
// Spanish Sentence Analyzer — POS tagging, grammar checking
// ============================================================
var Analyzer = (function () {
  'use strict';

  // ── Part-of-Speech Lexicon ─────────────────────────────────
  // Basic Spanish POS dictionary for common words
  var posLexicon = {
    // Articles
    'el': 'ART', 'la': 'ART', 'los': 'ART', 'las': 'ART',
    'un': 'ART', 'una': 'ART', 'unos': 'ART', 'unas': 'ART',
    'lo': 'ART',

    // Pronouns
    'yo': 'PRON', 'tú': 'PRON', 'él': 'PRON', 'ella': 'PRON',
    'nosotros': 'PRON', 'nosotras': 'PRON', 'vosotros': 'PRON',
    'vosotras': 'PRON', 'ellos': 'PRON', 'ellas': 'PRON',
    'usted': 'PRON', 'ustedes': 'PRON',
    'me': 'PRON', 'te': 'PRON', 'se': 'PRON', 'nos': 'PRON',
    'os': 'PRON', 'le': 'PRON', 'les': 'PRON',
    'mí': 'PRON', 'ti': 'PRON', 'sí': 'PRON',
    'esto': 'PRON', 'eso': 'PRON', 'aquello': 'PRON',
    'este': 'DET', 'esta': 'DET', 'estos': 'DET', 'estas': 'DET',
    'ese': 'DET', 'esa': 'DET', 'esos': 'DET', 'esas': 'DET',
    'aquel': 'DET', 'aquella': 'DET', 'aquellos': 'DET', 'aquellas': 'DET',

    // Possessives
    'mi': 'DET', 'mis': 'DET', 'tu': 'DET', 'tus': 'DET',
    'su': 'DET', 'sus': 'DET', 'nuestro': 'DET', 'nuestra': 'DET',
    'nuestros': 'DET', 'nuestras': 'DET', 'vuestro': 'DET', 'vuestra': 'DET',

    // Prepositions
    'a': 'PREP', 'ante': 'PREP', 'bajo': 'PREP', 'con': 'PREP',
    'contra': 'PREP', 'de': 'PREP', 'del': 'PREP', 'desde': 'PREP',
    'en': 'PREP', 'entre': 'PREP', 'hacia': 'PREP', 'hasta': 'PREP',
    'para': 'PREP', 'por': 'PREP', 'según': 'PREP', 'sin': 'PREP',
    'sobre': 'PREP', 'tras': 'PREP', 'al': 'PREP',

    // Conjunctions
    'y': 'CONJ', 'e': 'CONJ', 'o': 'CONJ', 'u': 'CONJ',
    'pero': 'CONJ', 'sino': 'CONJ', 'ni': 'CONJ',
    'que': 'CONJ', 'porque': 'CONJ', 'aunque': 'CONJ',
    'cuando': 'CONJ', 'si': 'CONJ', 'como': 'CONJ',
    'mientras': 'CONJ',

    // Common adverbs
    'no': 'ADV', 'sí': 'ADV', 'muy': 'ADV', 'mucho': 'ADV',
    'poco': 'ADV', 'bien': 'ADV', 'mal': 'ADV', 'más': 'ADV',
    'menos': 'ADV', 'ya': 'ADV', 'también': 'ADV', 'tampoco': 'ADV',
    'nunca': 'ADV', 'jamás': 'ADV', 'siempre': 'ADV', 'ahora': 'ADV',
    'hoy': 'ADV', 'ayer': 'ADV', 'mañana': 'ADV', 'aquí': 'ADV',
    'allí': 'ADV', 'allá': 'ADV', 'así': 'ADV', 'casi': 'ADV',
    'nada': 'ADV', 'nadie': 'PRON', 'algo': 'PRON', 'alguien': 'PRON',
    'bastante': 'ADV', 'demasiado': 'ADV', 'todavía': 'ADV',
    'aún': 'ADV', 'después': 'ADV', 'antes': 'ADV', 'luego': 'ADV',
    'pronto': 'ADV', 'tarde': 'ADV', 'temprano': 'ADV',
    'lejos': 'ADV', 'cerca': 'ADV', 'dentro': 'ADV', 'fuera': 'ADV',
    'arriba': 'ADV', 'abajo': 'ADV', 'donde': 'ADV',
    'solo': 'ADV', 'apenas': 'ADV', 'quizás': 'ADV',

    // Common verbs (infinitives)
    'ser': 'VERB', 'estar': 'VERB', 'haber': 'VERB', 'tener': 'VERB',
    'hacer': 'VERB', 'ir': 'VERB', 'poder': 'VERB', 'querer': 'VERB',
    'decir': 'VERB', 'saber': 'VERB', 'dar': 'VERB', 'ver': 'VERB',
    'venir': 'VERB', 'poner': 'VERB', 'salir': 'VERB',

    // Common conjugated forms of ser
    'soy': 'VERB', 'eres': 'VERB', 'es': 'VERB', 'somos': 'VERB',
    'sois': 'VERB', 'son': 'VERB', 'era': 'VERB', 'fue': 'VERB',
    'sido': 'VERB', 'siendo': 'VERB',

    // Common conjugated forms of estar
    'estoy': 'VERB', 'estás': 'VERB', 'está': 'VERB', 'estamos': 'VERB',
    'estáis': 'VERB', 'están': 'VERB', 'estaba': 'VERB', 'estuvo': 'VERB',
    'estado': 'VERB', 'estando': 'VERB',

    // Common conjugated forms of haber
    'he': 'VERB', 'has': 'VERB', 'ha': 'VERB', 'hay': 'VERB',
    'hemos': 'VERB', 'habéis': 'VERB', 'han': 'VERB',
    'había': 'VERB', 'hubo': 'VERB',

    // Common conjugated forms of tener
    'tengo': 'VERB', 'tienes': 'VERB', 'tiene': 'VERB', 'tenemos': 'VERB',
    'tenéis': 'VERB', 'tienen': 'VERB', 'tenía': 'VERB', 'tuvo': 'VERB',
    'tenido': 'VERB', 'teniendo': 'VERB',

    // Common conjugated forms of ir
    'voy': 'VERB', 'vas': 'VERB', 'va': 'VERB', 'vamos': 'VERB',
    'vais': 'VERB', 'van': 'VERB', 'iba': 'VERB', 'fui': 'VERB',
    'ido': 'VERB', 'yendo': 'VERB',

    // Common conjugated forms of hacer
    'hago': 'VERB', 'haces': 'VERB', 'hace': 'VERB', 'hacemos': 'VERB',
    'hacéis': 'VERB', 'hacen': 'VERB', 'hacía': 'VERB', 'hizo': 'VERB',
    'hecho': 'VERB', 'haciendo': 'VERB',

    // Common conjugated forms of poder
    'puedo': 'VERB', 'puedes': 'VERB', 'puede': 'VERB', 'podemos': 'VERB',
    'podéis': 'VERB', 'pueden': 'VERB', 'podía': 'VERB', 'pudo': 'VERB',
    'pudiendo': 'VERB',

    // Common conjugated forms of querer
    'quiero': 'VERB', 'quieres': 'VERB', 'quiere': 'VERB', 'queremos': 'VERB',
    'queréis': 'VERB', 'quieren': 'VERB', 'quería': 'VERB', 'quiso': 'VERB',
    'querido': 'VERB', 'queriendo': 'VERB',

    // Common conjugated forms of decir
    'digo': 'VERB', 'dices': 'VERB', 'dice': 'VERB', 'decimos': 'VERB',
    'decís': 'VERB', 'dicen': 'VERB', 'decía': 'VERB', 'dijo': 'VERB',
    'dicho': 'VERB', 'diciendo': 'VERB',

    // Common conjugated forms of saber
    'sé': 'VERB', 'sabes': 'VERB', 'sabe': 'VERB', 'sabemos': 'VERB',
    'sabéis': 'VERB', 'saben': 'VERB', 'sabía': 'VERB', 'supo': 'VERB',
    'sabido': 'VERB', 'sabiendo': 'VERB',

    // Other common verb forms
    'como': 'VERB', 'comes': 'VERB', 'come': 'VERB', 'comemos': 'VERB',
    'comen': 'VERB',
    'hablo': 'VERB', 'hablas': 'VERB', 'habla': 'VERB', 'hablamos': 'VERB',
    'hablan': 'VERB',
    'vivo': 'VERB', 'vives': 'VERB', 'vive': 'VERB', 'vivimos': 'VERB',
    'viven': 'VERB',
    'trabajo': 'VERB', 'trabajas': 'VERB', 'trabaja': 'VERB',
    'escribo': 'VERB', 'escribes': 'VERB', 'escribe': 'VERB',
    'leo': 'VERB', 'lees': 'VERB', 'lee': 'VERB',
    'gusta': 'VERB', 'gustan': 'VERB', 'gusto': 'VERB',
    'necesito': 'VERB', 'necesitas': 'VERB', 'necesita': 'VERB',
    'creo': 'VERB', 'crees': 'VERB', 'cree': 'VERB',
    'llamo': 'VERB', 'llamas': 'VERB', 'llama': 'VERB',
    'llamamos': 'VERB', 'llaman': 'VERB',

    // Common nouns (masculine)
    'hombre': 'NOUN', 'libro': 'NOUN', 'día': 'NOUN', 'tiempo': 'NOUN',
    'año': 'NOUN', 'mundo': 'NOUN', 'país': 'NOUN', 'momento': 'NOUN',
    'lugar': 'NOUN', 'caso': 'NOUN', 'lado': 'NOUN', 'problema': 'NOUN',
    'punto': 'NOUN', 'pueblo': 'NOUN', 'grupo': 'NOUN', 'trabajo': 'NOUN',
    'hijo': 'NOUN', 'nombre': 'NOUN', 'ejemplo': 'NOUN', 'cuerpo': 'NOUN',
    'amigo': 'NOUN', 'padre': 'NOUN', 'hermano': 'NOUN', 'perro': 'NOUN',
    'gato': 'NOUN', 'coche': 'NOUN', 'dinero': 'NOUN', 'café': 'NOUN',
    'agua': 'NOUN', 'pan': 'NOUN', 'vino': 'NOUN',

    // Common nouns (feminine)
    'mujer': 'NOUN', 'casa': 'NOUN', 'vida': 'NOUN', 'parte': 'NOUN',
    'vez': 'NOUN', 'forma': 'NOUN', 'cosa': 'NOUN', 'noche': 'NOUN',
    'ciudad': 'NOUN', 'familia': 'NOUN', 'persona': 'NOUN', 'hora': 'NOUN',
    'madre': 'NOUN', 'mano': 'NOUN', 'tierra': 'NOUN', 'guerra': 'NOUN',
    'historia': 'NOUN', 'escuela': 'NOUN', 'puerta': 'NOUN', 'mesa': 'NOUN',
    'ventana': 'NOUN', 'calle': 'NOUN', 'comida': 'NOUN', 'niña': 'NOUN',
    'hermana': 'NOUN', 'amiga': 'NOUN', 'hija': 'NOUN', 'iglesia': 'NOUN',

    // Common adjectives
    'bueno': 'ADJ', 'buena': 'ADJ', 'buenos': 'ADJ', 'buenas': 'ADJ',
    'malo': 'ADJ', 'mala': 'ADJ', 'malos': 'ADJ', 'malas': 'ADJ',
    'grande': 'ADJ', 'grandes': 'ADJ', 'pequeño': 'ADJ', 'pequeña': 'ADJ',
    'nuevo': 'ADJ', 'nueva': 'ADJ', 'viejo': 'ADJ', 'vieja': 'ADJ',
    'largo': 'ADJ', 'larga': 'ADJ', 'corto': 'ADJ', 'corta': 'ADJ',
    'alto': 'ADJ', 'alta': 'ADJ', 'bajo': 'ADJ', 'baja': 'ADJ',
    'bonito': 'ADJ', 'bonita': 'ADJ', 'feo': 'ADJ', 'fea': 'ADJ',
    'blanco': 'ADJ', 'blanca': 'ADJ', 'negro': 'ADJ', 'negra': 'ADJ',
    'rojo': 'ADJ', 'roja': 'ADJ', 'azul': 'ADJ', 'verde': 'ADJ',
    'importante': 'ADJ', 'necesario': 'ADJ', 'necesaria': 'ADJ',
    'posible': 'ADJ', 'imposible': 'ADJ', 'difícil': 'ADJ', 'fácil': 'ADJ',
    'feliz': 'ADJ', 'triste': 'ADJ', 'contento': 'ADJ', 'contenta': 'ADJ',
    'enfermo': 'ADJ', 'enferma': 'ADJ', 'cansado': 'ADJ', 'cansada': 'ADJ',
    'joven': 'ADJ', 'rico': 'ADJ', 'rica': 'ADJ', 'pobre': 'ADJ',
    'mejor': 'ADJ', 'peor': 'ADJ', 'mayor': 'ADJ', 'menor': 'ADJ',
    'primero': 'ADJ', 'primera': 'ADJ', 'último': 'ADJ', 'última': 'ADJ',
    'mismo': 'ADJ', 'misma': 'ADJ', 'otro': 'ADJ', 'otra': 'ADJ',
    'todo': 'ADJ', 'toda': 'ADJ', 'todos': 'ADJ', 'todas': 'ADJ',
    'cada': 'ADJ', 'mucho': 'ADJ', 'mucha': 'ADJ', 'poco': 'ADJ', 'poca': 'ADJ',

    // Numbers
    'uno': 'NUM', 'dos': 'NUM', 'tres': 'NUM', 'cuatro': 'NUM',
    'cinco': 'NUM', 'seis': 'NUM', 'siete': 'NUM', 'ocho': 'NUM',
    'nueve': 'NUM', 'diez': 'NUM', 'cien': 'NUM', 'mil': 'NUM',

    // Question words
    'qué': 'INTER', 'quién': 'INTER', 'quiénes': 'INTER',
    'dónde': 'INTER', 'cuándo': 'INTER', 'cómo': 'INTER',
    'cuánto': 'INTER', 'cuánta': 'INTER', 'cuántos': 'INTER',
    'cuál': 'INTER', 'cuáles': 'INTER'
  };

  // ── Gender Dictionary ──────────────────────────────────────
  // Maps nouns to their gender (m/f) for agreement checking
  var genderDict = {
    // Masculine nouns
    'hombre': 'm', 'libro': 'm', 'día': 'm', 'tiempo': 'm', 'año': 'm',
    'mundo': 'm', 'país': 'm', 'momento': 'm', 'lugar': 'm', 'caso': 'm',
    'problema': 'm', 'punto': 'm', 'pueblo': 'm', 'grupo': 'm', 'trabajo': 'm',
    'hijo': 'm', 'nombre': 'm', 'ejemplo': 'm', 'cuerpo': 'm', 'amigo': 'm',
    'padre': 'm', 'hermano': 'm', 'perro': 'm', 'gato': 'm', 'coche': 'm',
    'dinero': 'm', 'café': 'm', 'pan': 'm', 'vino': 'm', 'sol': 'm',
    'mar': 'm', 'río': 'm', 'cielo': 'm', 'aire': 'm', 'fuego': 'm',
    'programa': 'm', 'sistema': 'm', 'tema': 'm', 'mapa': 'm', 'clima': 'm',
    'idioma': 'm', 'poema': 'm', 'drama': 'm', 'sofá': 'm',
    'agua': 'f', // feminine but uses el (el agua)

    // Feminine nouns
    'mujer': 'f', 'casa': 'f', 'vida': 'f', 'parte': 'f', 'vez': 'f',
    'forma': 'f', 'cosa': 'f', 'noche': 'f', 'ciudad': 'f', 'familia': 'f',
    'persona': 'f', 'hora': 'f', 'madre': 'f', 'mano': 'f', 'tierra': 'f',
    'guerra': 'f', 'historia': 'f', 'escuela': 'f', 'puerta': 'f', 'mesa': 'f',
    'ventana': 'f', 'calle': 'f', 'comida': 'f', 'niña': 'f', 'hermana': 'f',
    'amiga': 'f', 'hija': 'f', 'iglesia': 'f', 'foto': 'f', 'moto': 'f',
    'radio': 'f', 'luz': 'f', 'flor': 'f', 'carne': 'f', 'leche': 'f',
    'llave': 'f', 'clase': 'f', 'nube': 'f', 'sangre': 'f', 'sal': 'f'
  };

  // ── Ser vs Estar Rules ─────────────────────────────────────
  // Adjectives that are typically used with ser (permanent)
  var serAdjectives = [
    'alto', 'alta', 'bajo', 'baja', 'grande', 'pequeño', 'pequeña',
    'inteligente', 'tonto', 'tonta', 'guapo', 'guapa', 'feo', 'fea',
    'rico', 'rica', 'pobre', 'joven', 'viejo', 'vieja',
    'bueno', 'buena', 'malo', 'mala', 'importante', 'necesario', 'necesaria',
    'posible', 'imposible', 'difícil', 'fácil', 'interesante', 'aburrido', 'aburrida',
    'español', 'española', 'mexicano', 'mexicana', 'americano', 'americana',
    'alemán', 'alemana', 'francés', 'francesa', 'inglés', 'inglesa',
    'rubio', 'rubia', 'moreno', 'morena', 'delgado', 'delgada', 'gordo', 'gorda'
  ];

  // Adjectives typically used with estar (temporary states/conditions)
  var estarAdjectives = [
    'cansado', 'cansada', 'enfermo', 'enferma', 'contento', 'contenta',
    'triste', 'feliz', 'nervioso', 'nerviosa', 'preocupado', 'preocupada',
    'ocupado', 'ocupada', 'aburrido', 'aburrida', 'listo', 'lista',
    'muerto', 'muerta', 'vivo', 'viva', 'roto', 'rota',
    'abierto', 'abierta', 'cerrado', 'cerrada', 'encendido', 'encendida',
    'apagado', 'apagada', 'lleno', 'llena', 'vacío', 'vacía',
    'mojado', 'mojada', 'seco', 'seca', 'limpio', 'limpia',
    'sucio', 'sucia', 'sentado', 'sentada', 'acostado', 'acostada',
    'embarazada', 'enojado', 'enojada', 'sorprendido', 'sorprendida',
    'enamorado', 'enamorada', 'equivocado', 'equivocada',
    'disponible', 'seguro', 'segura', 'perdido', 'perdida'
  ];

  // ── Grammar Rules for Error Detection ──────────────────────
  var errorPatterns = [
    // Gender agreement errors: el + feminine noun
    {
      id: 'gender_article_el',
      pattern: /\bel\s+(mujer|casa|vida|noche|ciudad|familia|persona|hora|madre|tierra|guerra|historia|escuela|puerta|mesa|ventana|calle|comida|niña|hermana|amiga|hija|iglesia|foto|moto|luz|flor|carne|leche|llave|clase|nube|sal)\b/i,
      message: 'Gender agreement error: use "la" instead of "el" with feminine nouns.',
      fix: function (match) { return 'la ' + match[1]; },
      severity: 'error'
    },
    // Gender agreement errors: la + masculine noun
    {
      id: 'gender_article_la',
      pattern: /\bla\s+(hombre|libro|día|tiempo|año|mundo|país|momento|lugar|caso|problema|punto|pueblo|grupo|trabajo|hijo|nombre|ejemplo|cuerpo|amigo|padre|hermano|perro|gato|coche|dinero|café|pan|vino|sol|mar|río|cielo|programa|sistema|tema|mapa|clima|idioma|poema|drama|sofá)\b/i,
      message: 'Gender agreement error: use "el" instead of "la" with masculine nouns.',
      fix: function (match) { return 'el ' + match[1]; },
      severity: 'error'
    },
    // "Más mejor" / "Más peor" (double comparative)
    {
      id: 'double_comparative',
      pattern: /\bmás\s+(mejor|peor|mayor|menor)\b/i,
      message: 'Double comparative: do not use "más" with irregular comparatives (mejor, peor, mayor, menor).',
      fix: function (match) { return match[1]; },
      severity: 'error'
    },
    // "Yo soy" with estar adjectives
    {
      id: 'ser_instead_of_estar',
      pattern: /\b(soy|eres|es|somos|sois|son)\s+(cansado|cansada|enfermo|enferma|contento|contenta|triste|nervioso|nerviosa|preocupado|preocupada|ocupado|ocupada|enojado|enojada|enamorado|enamorada)\b/i,
      message: 'Ser vs Estar: This adjective describes a temporary state — use "estar" instead of "ser".',
      fix: function (match) {
        var estarMap = { 'soy': 'estoy', 'eres': 'estás', 'es': 'está', 'somos': 'estamos', 'sois': 'estáis', 'son': 'están' };
        return (estarMap[match[1].toLowerCase()] || match[1]) + ' ' + match[2];
      },
      severity: 'warning'
    },
    // "Estar" with permanent characteristics
    {
      id: 'estar_instead_of_ser',
      pattern: /\b(estoy|estás|está|estamos|estáis|están)\s+(inteligente|tonto|tonta|alto|alta|bajo|baja|guapo|guapa|feo|fea|español|española|mexicano|mexicana)\b/i,
      message: 'Ser vs Estar: This adjective describes a permanent characteristic — use "ser" instead of "estar".',
      fix: function (match) {
        var serMap = { 'estoy': 'soy', 'estás': 'eres', 'está': 'es', 'estamos': 'somos', 'estáis': 'sois', 'están': 'son' };
        return (serMap[match[1].toLowerCase()] || match[1]) + ' ' + match[2];
      },
      severity: 'warning'
    },
    // Missing personal "a" with common "see/know/visit + person" patterns
    {
      id: 'missing_personal_a',
      pattern: /\b(veo|conozco|visito|llamo|busco|quiero|necesito|encuentro)\s+(mi|tu|su|el|la|un|una)\s*(madre|padre|hermano|hermana|amigo|amiga|hijo|hija|profesor|profesora|doctor|doctora|jefe|jefa)\b/i,
      message: 'Missing personal "a": When a person is the direct object, add "a" before them.',
      fix: function (match) { return match[1] + ' a ' + match[2] + ' ' + match[3]; },
      severity: 'warning'
    },
    // "Me gusta" with plural noun without "n"
    {
      id: 'gustar_agreement',
      pattern: /\bme\s+gusta\s+(los|las|mis|tus|sus|unos|unas)\s+\w+/i,
      message: 'Gustar agreement: Use "gustan" (plural) when what is liked is plural.',
      fix: function (match) { return match[0].replace(/gusta\b/, 'gustan'); },
      severity: 'error'
    },
    // "Me gustan" with singular
    {
      id: 'gustar_singular',
      pattern: /\bme\s+gustan\s+(el|la|mi|tu|su|un|una)\s+\w+(?!\w*s\b)/i,
      message: 'Gustar agreement: Use "gusta" (singular) when what is liked is singular.',
      fix: function (match) { return match[0].replace(/gustan\b/, 'gusta'); },
      severity: 'warning'
    },
    // Si + present subjunctive (common mistake)
    {
      id: 'si_subjunctive',
      pattern: /\bsi\s+(tenga|tengas|hable|hables|coma|comas|viva|vivas|sea|seas|esté|estés|haya|hayas|pueda|puedas|quiera|quieras|sepa|sepas|vaya|vayas)\b/i,
      message: 'Si + subjunctive: Do not use the present subjunctive after "si". Use indicative (Type 1) or imperfect subjunctive (Type 2).',
      fix: null,
      severity: 'error'
    },
    // Double negative without "no" (English pattern applied to Spanish)
    {
      id: 'missing_no_double_neg',
      pattern: /^(?!.*\bno\b).*(nadie|nada|nunca|jamás|tampoco|ninguno|ninguna|ningún)\s+\w+/i,
      message: 'Spanish double negative: When nada/nadie/nunca comes after the verb, you need "no" before the verb. Example: "No viene nadie."',
      fix: null,
      severity: 'info'
    },
    // "Muy mucho" error
    {
      id: 'muy_mucho',
      pattern: /\bmuy\s+mucho\b/i,
      message: '"Muy mucho" is incorrect. Use "mucho" with verbs and "muy" with adjectives/adverbs.',
      fix: function (match) { return 'mucho'; },
      severity: 'error'
    },
    // Accent on question words in questions
    {
      id: 'question_accent',
      pattern: /[¿?].*\b(que|quien|donde|cuando|como|cuanto|cual)\b.*[¿?]/i,
      message: 'Question words need accent marks in questions: qué, quién, dónde, cuándo, cómo, cuánto, cuál.',
      fix: null,
      severity: 'info'
    }
  ];

  // ── Core Functions ─────────────────────────────────────────

  /**
   * Tag each token with its part of speech.
   * Returns array of {token, pos, index}.
   */
  function tagPOS(text) {
    var tokens = text.toLowerCase().replace(/[¿¡.,!?;:()"""'']/g, '').split(/\s+/);
    var tagged = [];

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var pos = posLexicon[token] || _guessPos(token);
      tagged.push({
        token: token,
        pos: pos,
        index: i
      });
    }

    return tagged;
  }

  /**
   * Analyze a Spanish sentence for structure.
   * Returns {tokens, subject, verb, object, type}.
   */
  function analyzeSentence(text) {
    var tagged = tagPOS(text);
    var subject = null;
    var verb = null;
    var object = null;
    var type = _detectSentenceType(text);

    // Find main verb
    for (var i = 0; i < tagged.length; i++) {
      if (tagged[i].pos === 'VERB' && !verb) {
        verb = tagged[i];
      }
    }

    // Find subject (pronoun or noun before verb)
    if (verb) {
      for (var j = 0; j < verb.index; j++) {
        if (tagged[j].pos === 'PRON' || tagged[j].pos === 'NOUN') {
          subject = tagged[j];
          break;
        }
      }
      // Find object (noun/pronoun after verb)
      for (var k = verb.index + 1; k < tagged.length; k++) {
        if (tagged[k].pos === 'NOUN' || tagged[k].pos === 'PRON') {
          object = tagged[k];
          break;
        }
      }
    }

    return {
      tokens: tagged,
      subject: subject,
      verb: verb,
      object: object,
      type: type,
      text: text
    };
  }

  /**
   * Check a Spanish text for grammar errors.
   * Returns array of {id, message, match, fix, severity, position}.
   */
  function checkGrammar(text) {
    var errors = [];

    for (var i = 0; i < errorPatterns.length; i++) {
      var rule = errorPatterns[i];
      var match = text.match(rule.pattern);
      if (match) {
        var error = {
          id: rule.id,
          message: rule.message,
          matched: match[0],
          severity: rule.severity,
          position: match.index
        };
        if (rule.fix) {
          error.suggestion = rule.fix(match);
        }
        errors.push(error);
      }
    }

    return errors;
  }

  /**
   * Format grammar check results as HTML.
   */
  function formatGrammarCheck(text, errors) {
    if (errors.length === 0) {
      return '<div class="grammar-check-result">' +
        '<div class="check-pass">✅ <strong>Looks good!</strong> No grammar errors detected in:</div>' +
        '<div class="spanish-text">"' + _escapeHtml(text) + '"</div>' +
        '</div>';
    }

    var html = '<div class="grammar-check-result">';
    html += '<div class="check-header">📝 Grammar Check: <span class="spanish-text">"' + _escapeHtml(text) + '"</span></div>';
    html += '<div class="check-errors">';

    for (var i = 0; i < errors.length; i++) {
      var e = errors[i];
      var icon = e.severity === 'error' ? '❌' : e.severity === 'warning' ? '⚠️' : 'ℹ️';
      html += '<div class="check-error check-' + e.severity + '">';
      html += '<span class="error-icon">' + icon + '</span> ';
      html += '<strong>' + e.message + '</strong>';
      html += '<br>Found: <span class="error-match">"' + _escapeHtml(e.matched) + '"</span>';
      if (e.suggestion) {
        html += '<br>Suggestion: <span class="error-fix">"' + _escapeHtml(e.suggestion) + '"</span>';
      }
      html += '</div>';
    }

    html += '</div></div>';
    return html;
  }

  /**
   * Detect the language of input text (Spanish or English).
   * Returns {language: 'spanish'|'english'|'unknown', confidence: 0-1}.
   */
  function detectLanguage(text) {
    var spanishIndicators = 0;
    var englishIndicators = 0;
    var lower = text.toLowerCase();

    // Spanish-specific characters
    if (/[ñáéíóúü¿¡]/.test(lower)) spanishIndicators += 3;

    // Common Spanish words
    var spanishWords = ['el', 'la', 'los', 'las', 'un', 'una', 'es', 'está', 'son', 'hay',
      'que', 'de', 'en', 'por', 'para', 'con', 'sin', 'pero', 'como', 'más',
      'yo', 'tú', 'él', 'ella', 'nosotros', 'tengo', 'tiene', 'quiero',
      'hola', 'gracias', 'por favor', 'bueno', 'bien', 'muy', 'también',
      'cómo', 'dónde', 'cuándo', 'qué', 'quién', 'porque', 'aunque'];

    var englishWords = ['the', 'is', 'are', 'was', 'were', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can',
      'and', 'but', 'or', 'not', 'this', 'that', 'these', 'those',
      'my', 'your', 'his', 'her', 'our', 'their', 'what', 'where',
      'when', 'how', 'why', 'who', 'which', 'hello', 'please', 'thank'];

    var words = lower.split(/\s+/);
    for (var i = 0; i < words.length; i++) {
      var w = words[i].replace(/[.,!?;:]/g, '');
      if (spanishWords.indexOf(w) !== -1) spanishIndicators++;
      if (englishWords.indexOf(w) !== -1) englishIndicators++;
    }

    // Verb ending patterns
    if (/\b\w+(ando|iendo|ción|mente)\b/.test(lower)) spanishIndicators += 2;
    if (/\b\w+(ing|tion|ment|ness)\b/.test(lower)) englishIndicators += 2;

    var total = spanishIndicators + englishIndicators;
    if (total === 0) return { language: 'unknown', confidence: 0 };

    if (spanishIndicators > englishIndicators) {
      return { language: 'spanish', confidence: spanishIndicators / (total || 1) };
    } else if (englishIndicators > spanishIndicators) {
      return { language: 'english', confidence: englishIndicators / (total || 1) };
    }
    return { language: 'unknown', confidence: 0.5 };
  }

  /**
   * Get the gender of a Spanish noun.
   * Returns 'm', 'f', or null if unknown.
   */
  function getGender(noun) {
    var lower = noun.toLowerCase();
    if (genderDict[lower]) return genderDict[lower];

    // Heuristic rules
    if (/[oa]$/.test(lower)) {
      // Most -o words are masculine, most -a words are feminine
      if (lower.endsWith('a')) {
        // Exceptions: -ma words of Greek origin
        if (/ma$/.test(lower) && ['problema', 'sistema', 'tema', 'programa', 'clima', 'idioma', 'poema', 'drama'].indexOf(lower) !== -1) {
          return 'm';
        }
        return 'f';
      }
      return 'm';
    }
    // Words ending in -ción, -sión, -dad, -tad, -tud are feminine
    if (/(?:ción|sión|dad|tad|tud|umbre)$/.test(lower)) return 'f';
    // Words ending in -or, -aje are usually masculine
    if (/(?:or|aje)$/.test(lower)) return 'm';

    return null;
  }

  /**
   * Check if an adjective agrees with a noun in gender and number.
   */
  function checkAgreement(noun, adjective) {
    var nounGender = getGender(noun);
    if (!nounGender) return { valid: true, message: 'Cannot determine gender.' };

    var adjLower = adjective.toLowerCase();
    var nounLower = noun.toLowerCase();

    // Check number agreement
    var nounPlural = nounLower.endsWith('s') || nounLower.endsWith('es');
    var adjPlural = adjLower.endsWith('s') || adjLower.endsWith('es');

    if (nounPlural !== adjPlural) {
      return {
        valid: false,
        message: 'Number disagreement: "' + noun + '" is ' + (nounPlural ? 'plural' : 'singular') +
          ' but "' + adjective + '" is ' + (adjPlural ? 'plural' : 'singular') + '.'
      };
    }

    // Check gender agreement for -o/-a adjectives
    if (adjLower.endsWith('o') && nounGender === 'f') {
      return {
        valid: false,
        message: 'Gender disagreement: "' + noun + '" is feminine but "' + adjective + '" is masculine. Use "' + adjLower.slice(0, -1) + 'a".'
      };
    }
    if (adjLower.endsWith('a') && nounGender === 'm' && !adjLower.endsWith('ista')) {
      // Check if there's a masculine form
      var masc = adjLower.slice(0, -1) + 'o';
      return {
        valid: false,
        message: 'Gender disagreement: "' + noun + '" is masculine but "' + adjective + '" is feminine. Use "' + masc + '".'
      };
    }

    return { valid: true, message: 'Agreement is correct.' };
  }

  /**
   * Get a full analysis of a Spanish text.
   * Returns {sentence, pos, grammar, language}.
   */
  function fullAnalysis(text) {
    return {
      sentence: analyzeSentence(text),
      grammar: checkGrammar(text),
      language: detectLanguage(text)
    };
  }

  /**
   * Format a full analysis as HTML.
   */
  function formatAnalysis(analysis) {
    var html = '<div class="analysis-result">';

    // Language detection
    html += '<div class="analysis-section">';
    html += '<strong>Language:</strong> ' + analysis.language.language +
      ' (confidence: ' + Math.round(analysis.language.confidence * 100) + '%)';
    html += '</div>';

    // Sentence structure
    var s = analysis.sentence;
    html += '<div class="analysis-section">';
    html += '<strong>Sentence type:</strong> ' + (s.type || 'statement');
    if (s.subject) html += ' | <strong>Subject:</strong> ' + s.subject.token + ' (' + s.subject.pos + ')';
    if (s.verb) html += ' | <strong>Verb:</strong> ' + s.verb.token;
    if (s.object) html += ' | <strong>Object:</strong> ' + s.object.token;
    html += '</div>';

    // POS tags
    html += '<div class="analysis-section"><strong>POS Tags:</strong> ';
    for (var i = 0; i < s.tokens.length; i++) {
      html += '<span class="pos-tag pos-' + s.tokens[i].pos.toLowerCase() + '">' +
        s.tokens[i].token + '<sub>' + s.tokens[i].pos + '</sub></span> ';
    }
    html += '</div>';

    // Grammar errors
    if (analysis.grammar.length > 0) {
      html += formatGrammarCheck(s.text, analysis.grammar);
    } else {
      html += '<div class="analysis-section">✅ No grammar issues detected.</div>';
    }

    html += '</div>';
    return html;
  }

  // ── Private Helpers ────────────────────────────────────────

  function _guessPos(token) {
    // Guess POS based on endings
    if (/^(el|la|los|las|un|una|unos|unas)$/.test(token)) return 'ART';
    if (/[oa]s?$/.test(token) && token.length > 3) {
      // Could be adj or noun — guess based on common patterns
      if (/(ment|ción|sión|dad|tud|aje)e?s?$/.test(token)) return 'NOUN';
      if (/(oso|osa|ivo|iva|ble|nte)s?$/.test(token)) return 'ADJ';
    }
    if (/(ar|er|ir)$/.test(token)) return 'VERB'; // infinitive
    if (/(ando|iendo)$/.test(token)) return 'VERB'; // gerund
    if (/(ado|ido)$/.test(token)) return 'VERB'; // participle (could be adj)
    if (/mente$/.test(token)) return 'ADV';
    if (/(o|a|os|as|e|es)$/.test(token)) return 'NOUN'; // fallback
    return 'UNKNOWN';
  }

  function _detectSentenceType(text) {
    var trimmed = text.trim();
    if (/^[¿]/.test(trimmed) || /[?]$/.test(trimmed)) return 'question';
    if (/^[¡]/.test(trimmed) || /[!]$/.test(trimmed)) return 'exclamation';
    // Check for imperative patterns (command)
    if (/^(no\s+)?(habla|come|vive|escribe|lee|di|haz|ve|pon|sal|sé|ten|ven)\b/i.test(trimmed)) {
      return 'command';
    }
    return 'statement';
  }

  function _escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    tagPOS: tagPOS,
    analyzeSentence: analyzeSentence,
    checkGrammar: checkGrammar,
    formatGrammarCheck: formatGrammarCheck,
    detectLanguage: detectLanguage,
    getGender: getGender,
    checkAgreement: checkAgreement,
    fullAnalysis: fullAnalysis,
    formatAnalysis: formatAnalysis
  };
})();
