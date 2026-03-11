// ============================================================
// CEFR Learning Paths — structured curriculum A1 → B2
// ============================================================
var LearningPaths = (function () {
  'use strict';

  var STORAGE_KEY = 'profesor_learning_paths';

  // ── Progress Data ──────────────────────────────────────────
  var progress = {};  // { levelId_lessonId: { completed: bool, score: number, timestamp } }

  // ── Level Definitions ──────────────────────────────────────
  var levels = [
    {
      id: 'A1',
      name: 'A1 — Beginner',
      description: 'Basic survival Spanish: greetings, introductions, numbers, shopping, ordering food.',
      color: '#4CAF50',
      icon: '🌱',
      lessons: [
        {
          id: 'A1_01',
          title: '¡Hola! — Greetings & Introductions',
          description: 'Learn how to greet people, introduce yourself, and say goodbye.',
          objectives: ['Say hello and goodbye', 'Introduce yourself (name, age, origin)', 'Use formal and informal greetings'],
          vocabulary: ['hola', 'adiós', 'buenos días', 'buenas tardes', 'buenas noches', 'me llamo', 'soy de', 'tengo ... años', 'mucho gusto', 'encantado', '¿cómo estás?', '¿cómo se llama?', 'hasta luego', 'hasta mañana', 'nos vemos'],
          grammarPoint: 'Subject pronouns (yo, tú, él, ella, usted) and the verb "ser" in present tense.',
          practicePrompt: 'Introduce yourself in Spanish: say your name, where you are from, and how old you are.',
          requiredScore: 70
        },
        {
          id: 'A1_02',
          title: 'Los Números — Numbers 0-100',
          description: 'Master counting in Spanish from 0 to 100.',
          objectives: ['Count from 0 to 30', 'Count by tens to 100', 'Use numbers for age, phone, and prices'],
          vocabulary: ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa', 'cien'],
          grammarPoint: 'Numbers 16-19 are written as one word (dieciséis, diecisiete, etc.). Numbers 21-29 can be one word (veintiuno).',
          practicePrompt: 'Practice: What is your phone number in Spanish? How much does something cost?',
          requiredScore: 70
        },
        {
          id: 'A1_03',
          title: 'Los Colores y la Ropa — Colors & Clothing',
          description: 'Learn color words and basic clothing vocabulary.',
          objectives: ['Name 12+ colors', 'Describe clothing items', 'Use adjective agreement with colors'],
          vocabulary: ['rojo', 'azul', 'verde', 'amarillo', 'negro', 'blanco', 'naranja', 'morado', 'rosa', 'marrón', 'gris', 'camisa', 'pantalones', 'zapatos', 'vestido', 'falda', 'chaqueta', 'sombrero', 'calcetines', 'abrigo'],
          grammarPoint: 'Adjective agreement: Colors must agree in gender and number with the noun (camisa roja, zapatos negros).',
          practicePrompt: 'Describe what you are wearing today in Spanish, including the colors.',
          requiredScore: 70
        },
        {
          id: 'A1_04',
          title: 'La Familia — Family Members',
          description: 'Learn vocabulary for family relationships.',
          objectives: ['Name immediate family members', 'Describe your family', 'Use possessive adjectives'],
          vocabulary: ['padre', 'madre', 'hermano', 'hermana', 'hijo', 'hija', 'abuelo', 'abuela', 'tío', 'tía', 'primo', 'prima', 'esposo', 'esposa', 'novio', 'novia', 'sobrino', 'sobrina', 'nieto', 'nieta'],
          grammarPoint: 'Possessive adjectives: mi/mis, tu/tus, su/sus, nuestro/a/os/as (agree with the thing possessed, not the possessor).',
          practicePrompt: 'Describe your family in Spanish. Who are the members? How old are they?',
          requiredScore: 70
        },
        {
          id: 'A1_05',
          title: 'El Tiempo y las Fechas — Time & Dates',
          description: 'Learn to tell time, days of the week, and months of the year.',
          objectives: ['Tell the time', 'Name days of the week and months', 'Talk about schedules and dates'],
          vocabulary: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', '¿qué hora es?', 'es la una', 'son las dos'],
          grammarPoint: 'Time uses "ser": Es la una (1:00), Son las dos (2:00). Days and months are NOT capitalized in Spanish.',
          practicePrompt: 'What time is it? What day is today? When is your birthday?',
          requiredScore: 70
        },
        {
          id: 'A1_06',
          title: 'Verbos en Presente — Present Tense Basics',
          description: 'Learn regular -ar, -er, -ir verb conjugations in the present tense.',
          objectives: ['Conjugate regular -ar verbs', 'Conjugate regular -er verbs', 'Conjugate regular -ir verbs'],
          vocabulary: ['hablar', 'caminar', 'estudiar', 'trabajar', 'comprar', 'comer', 'beber', 'leer', 'correr', 'aprender', 'vivir', 'escribir', 'abrir', 'recibir', 'decidir'],
          grammarPoint: '-AR: o, as, a, amos, áis, an. -ER: o, es, e, emos, éis, en. -IR: o, es, e, imos, ís, en.',
          practicePrompt: 'Practice conjugating "hablar", "comer", and "vivir" for all persons.',
          requiredScore: 70
        },
        {
          id: 'A1_07',
          title: 'Los Artículos — Articles',
          description: 'Master definite and indefinite articles in Spanish.',
          objectives: ['Use el/la/los/las correctly', 'Use un/una/unos/unas correctly', 'Know when to omit articles'],
          vocabulary: ['el libro', 'la mesa', 'los libros', 'las mesas', 'un perro', 'una casa', 'unos amigos', 'unas flores'],
          grammarPoint: 'Articles agree in gender and number. Use "el" before feminine nouns starting with stressed "a": el agua, el águila.',
          practicePrompt: 'Fill in the correct article: ___ libro, ___ mesa, ___ agua, ___ amigos.',
          requiredScore: 70
        },
        {
          id: 'A1_08',
          title: 'La Comida — Food & Drink',
          description: 'Vocabulary for food, beverages, and ordering at a restaurant.',
          objectives: ['Name common foods and drinks', 'Order food in a restaurant', 'Express likes and dislikes with food'],
          vocabulary: ['pan', 'arroz', 'pollo', 'carne', 'pescado', 'ensalada', 'fruta', 'verdura', 'queso', 'huevo', 'agua', 'café', 'leche', 'jugo', 'cerveza', 'vino', 'sopa', 'postre', 'cuenta', 'menú'],
          grammarPoint: 'Use "quiero" (I want) and "me gustaría" (I would like) for ordering. "Me gusta" to express likes.',
          practicePrompt: 'You are at a restaurant. Order a meal in Spanish including a drink, main course, and dessert.',
          requiredScore: 70
        },
        {
          id: 'A1_09',
          title: 'Las Direcciones — Asking for Directions',
          description: 'Learn to ask for and give directions.',
          objectives: ['Ask where something is', 'Understand direction words', 'Give simple directions'],
          vocabulary: ['derecha', 'izquierda', 'recto', 'cerca', 'lejos', 'al lado de', 'enfrente de', 'detrás de', '¿dónde está?', 'la calle', 'la esquina', 'la plaza', 'el semáforo', 'girar', 'seguir', 'cruzar'],
          grammarPoint: 'Location uses "estar": ¿Dónde está el banco? — El banco está a la derecha.',
          practicePrompt: 'Ask for directions to the hospital. Then give directions from the park to the school.',
          requiredScore: 70
        },
        {
          id: 'A1_10',
          title: 'De Compras — Shopping',
          description: 'Learn to shop, ask prices, and handle money transactions.',
          objectives: ['Ask how much something costs', 'Describe what you want to buy', 'Handle basic transactions'],
          vocabulary: ['¿cuánto cuesta?', '¿cuánto vale?', 'barato', 'caro', 'descuento', 'oferta', 'talla', 'grande', 'pequeño', 'mediano', 'pagar', 'efectivo', 'tarjeta', 'recibo', 'tienda', 'mercado'],
          grammarPoint: 'Demonstrative adjectives: este/esta (this near me), ese/esa (that near you), aquel/aquella (that over there).',
          practicePrompt: 'You are shopping for clothes. Ask the price, try on a different size, and pay.',
          requiredScore: 70
        }
      ]
    },
    {
      id: 'A2',
      name: 'A2 — Elementary',
      description: 'Everyday situations: past events, descriptions, hobbies, health, comparisons.',
      color: '#2196F3',
      icon: '🌿',
      lessons: [
        {
          id: 'A2_01',
          title: 'El Pretérito — Past Tense (Preterite)',
          description: 'Learn to talk about completed past actions.',
          objectives: ['Conjugate regular verbs in preterite', 'Know common irregular preterite forms', 'Tell a story about your weekend'],
          vocabulary: ['ayer', 'anoche', 'la semana pasada', 'el mes pasado', 'el año pasado', 'hace dos días', 'una vez', 'de repente', 'primero', 'luego', 'después', 'finalmente', 'por fin'],
          grammarPoint: 'Preterite endings: -AR: é, aste, ó, amos, asteis, aron. -ER/-IR: í, iste, ió, imos, isteis, ieron. Common irregulars: ir/ser→fui, hacer→hice, tener→tuve.',
          practicePrompt: 'Tell me what you did yesterday using at least 5 different verbs in the preterite.',
          requiredScore: 70
        },
        {
          id: 'A2_02',
          title: 'El Imperfecto — Imperfect Past',
          description: 'Describe how things used to be and ongoing past actions.',
          objectives: ['Conjugate regular verbs in imperfect', 'Know the 3 irregular imperfect verbs', 'Distinguish preterite from imperfect'],
          vocabulary: ['siempre', 'todos los días', 'a menudo', 'generalmente', 'normalmente', 'de niño', 'en aquella época', 'mientras', 'cuando era joven'],
          grammarPoint: 'Imperfect: -AR: aba, abas, aba, ábamos, abais, aban. -ER/-IR: ía, ías, ía, íamos, íais, ían. Only 3 irregulars: ser→era, ir→iba, ver→veía.',
          practicePrompt: 'Describe what your life was like when you were 10 years old. What did you used to do?',
          requiredScore: 70
        },
        {
          id: 'A2_03',
          title: 'Descripciones — Physical Descriptions',
          description: 'Describe people\'s appearance and personality.',
          objectives: ['Describe physical appearance', 'Describe personality traits', 'Use ser and estar correctly for descriptions'],
          vocabulary: ['alto', 'bajo', 'delgado', 'gordo', 'guapo', 'feo', 'joven', 'viejo', 'rubio', 'moreno', 'pelirrojo', 'calvo', 'simpático', 'antipático', 'amable', 'inteligente', 'divertido', 'serio', 'tímido', 'extrovertido'],
          grammarPoint: 'SER for permanent characteristics (es alto, es inteligente). ESTAR for temporary states (está cansado, está enfermo). Adjectives agree in gender and number.',
          practicePrompt: 'Describe your best friend: what do they look like and what is their personality like?',
          requiredScore: 70
        },
        {
          id: 'A2_04',
          title: 'Los Viajes — Travel Vocabulary',
          description: 'Essential vocabulary and phrases for traveling.',
          objectives: ['Book a hotel room', 'Navigate an airport', 'Handle travel situations'],
          vocabulary: ['aeropuerto', 'avión', 'vuelo', 'pasaporte', 'equipaje', 'maleta', 'boleto', 'reservación', 'hotel', 'habitación', 'llegada', 'salida', 'aduana', 'embarque', 'retraso', 'cancelado', 'ida y vuelta'],
          grammarPoint: 'Future with "ir + a + infinitive": Voy a viajar a España. — This is more common in spoken Spanish than the simple future.',
          practicePrompt: 'You are planning a trip. Book a flight, check into a hotel, and describe your itinerary.',
          requiredScore: 70
        },
        {
          id: 'A2_05',
          title: 'La Salud — Health & Body',
          description: 'Talk about health, body parts, and doctor visits.',
          objectives: ['Name body parts', 'Describe symptoms and illnesses', 'Communicate at a doctor\'s office'],
          vocabulary: ['cabeza', 'brazo', 'pierna', 'mano', 'pie', 'espalda', 'estómago', 'garganta', 'oído', 'ojo', 'dolor', 'fiebre', 'tos', 'gripe', 'resfriado', 'medicina', 'pastilla', 'receta', 'farmacia', 'me duele'],
          grammarPoint: '"Doler" works like "gustar": Me duele la cabeza (my head hurts). Me duelen los pies (my feet hurt).',
          practicePrompt: 'You feel sick. Describe your symptoms to a doctor and ask for advice.',
          requiredScore: 70
        },
        {
          id: 'A2_06',
          title: 'Comparaciones — Comparisons',
          description: 'Compare people, places, and things.',
          objectives: ['Make comparisons of superiority and inferiority', 'Make equal comparisons', 'Use irregular comparatives'],
          vocabulary: ['más ... que', 'menos ... que', 'tan ... como', 'tanto como', 'mejor', 'peor', 'mayor', 'menor', 'el más', 'el menos', 'igual'],
          grammarPoint: 'más/menos + adj + que (more/less than). tan + adj + como (as...as). Irregulars: bueno→mejor, malo→peor, grande→mayor, pequeño→menor.',
          practicePrompt: 'Compare two cities you know. Which is bigger, more beautiful, more expensive?',
          requiredScore: 70
        },
        {
          id: 'A2_07',
          title: 'El Futuro — Future Tense',
          description: 'Talk about future plans and predictions.',
          objectives: ['Conjugate regular verbs in future tense', 'Know irregular future stems', 'Make predictions and plans'],
          vocabulary: ['mañana', 'la próxima semana', 'el próximo año', 'algún día', 'en el futuro', 'pronto', 'dentro de', 'probablemente', 'seguramente'],
          grammarPoint: 'Future endings (same for all): é, ás, á, emos, éis, án. Added to FULL infinitive. Irregulars change the stem: tener→tendr-, salir→saldr-, hacer→har-, poder→podr-.',
          practicePrompt: 'What will you do next weekend? What will your life be like in 10 years?',
          requiredScore: 70
        },
        {
          id: 'A2_08',
          title: 'La Rutina Diaria — Daily Routine',
          description: 'Describe your daily routine using reflexive verbs.',
          objectives: ['Use reflexive verbs correctly', 'Describe a typical day', 'Tell time in context of daily activities'],
          vocabulary: ['despertarse', 'levantarse', 'ducharse', 'vestirse', 'peinarse', 'cepillarse', 'acostarse', 'dormirse', 'lavarse', 'afeitarse', 'maquillarse', 'prepararse', 'sentarse', 'divertirse'],
          grammarPoint: 'Reflexive pronouns: me, te, se, nos, os, se. They go before conjugated verbs (me despierto) or attached to infinitives/gerunds (voy a despertarme).',
          practicePrompt: 'Describe your typical weekday morning routine from waking up to leaving home.',
          requiredScore: 70
        },
        {
          id: 'A2_09',
          title: 'Los Pasatiempos — Hobbies & Free Time',
          description: 'Talk about hobbies, sports, and leisure activities.',
          objectives: ['Describe your hobbies', 'Ask about others\' interests', 'Use gustar and similar verbs'],
          vocabulary: ['jugar', 'practicar', 'nadar', 'correr', 'bailar', 'cantar', 'tocar', 'pintar', 'cocinar', 'leer', 'viajar', 'pasear', 'el fútbol', 'el baloncesto', 'la natación', 'la música', 'el cine', 'la fotografía'],
          grammarPoint: 'Verbs like gustar: encantar, interesar, fascinar, molestar, importar. Use with IO pronouns (me, te, le, nos, os, les).',
          practicePrompt: 'What are your hobbies? What sports do you play? What do you do on weekends?',
          requiredScore: 70
        },
        {
          id: 'A2_10',
          title: 'El Clima y las Opiniones — Weather & Opinions',
          description: 'Discuss weather and express opinions.',
          objectives: ['Describe the weather', 'Express opinions and preferences', 'Agree and disagree politely'],
          vocabulary: ['hace calor', 'hace frío', 'hace sol', 'hace viento', 'llueve', 'nieva', 'está nublado', 'hay tormenta', 'creo que', 'pienso que', 'en mi opinión', 'me parece que', 'estoy de acuerdo', 'no estoy de acuerdo', 'tiene razón'],
          grammarPoint: 'Weather uses "hacer" (hace calor), "haber" (hay niebla), "estar" (está nublado), or specific verbs (llueve, nieva). Opinions use "creo que + indicative".',
          practicePrompt: 'What is the weather like today? Do you prefer hot or cold weather? Give your opinion.',
          requiredScore: 70
        }
      ]
    },
    {
      id: 'B1',
      name: 'B1 — Intermediate',
      description: 'Complex topics: subjunctive, conditionals, reported speech, formal writing.',
      color: '#FF9800',
      icon: '🌳',
      lessons: [
        {
          id: 'B1_01',
          title: 'El Subjuntivo — Introduction to Subjunctive',
          description: 'Understand when and why to use the subjunctive mood.',
          objectives: ['Conjugate regular verbs in present subjunctive', 'Identify WEIRDO triggers', 'Use subjunctive in noun clauses'],
          vocabulary: ['quiero que', 'espero que', 'es importante que', 'dudo que', 'ojalá', 'tal vez', 'quizás', 'es posible que', 'es necesario que', 'prefiero que', 'recomiendo que', 'sugiero que'],
          grammarPoint: 'WEIRDO: Wishes, Emotions, Impersonal expressions, Recommendations, Doubt/Denial, Ojalá. Subjunctive goes in the subordinate clause after "que".',
          practicePrompt: 'Express 5 wishes or recommendations using the subjunctive: "Quiero que...", "Es importante que..."',
          requiredScore: 70
        },
        {
          id: 'B1_02',
          title: 'El Condicional — Conditional Tense',
          description: 'Express what you would do in hypothetical situations.',
          objectives: ['Conjugate verbs in conditional', 'Express hypothetical situations', 'Give polite advice'],
          vocabulary: ['me gustaría', 'podría', 'debería', 'querría', 'sería', 'tendría', 'haría', 'iría', 'diría', 'en tu lugar', 'yo que tú', 'si pudiera'],
          grammarPoint: 'Conditional = infinitive + ía, ías, ía, íamos, íais, ían. Same irregular stems as future tense. Used for politeness (¿Podría...?) and hypotheticals.',
          practicePrompt: 'If you won the lottery, what would you do? Use at least 5 conditional verbs.',
          requiredScore: 70
        },
        {
          id: 'B1_03',
          title: 'Estilo Indirecto — Reported Speech',
          description: 'Report what someone else said.',
          objectives: ['Convert direct speech to indirect speech', 'Shift tenses correctly', 'Use reporting verbs'],
          vocabulary: ['dijo que', 'contó que', 'explicó que', 'preguntó si', 'respondió que', 'añadió que', 'mencionó que', 'afirmó que', 'negó que', 'prometió que'],
          grammarPoint: 'Tense shifts: present→imperfect, preterite→pluperfect, future→conditional. "Dijo que vendría" (He said he would come).',
          practicePrompt: 'Your friend told you about their weekend. Report to me what they said using indirect speech.',
          requiredScore: 70
        },
        {
          id: 'B1_04',
          title: 'Pronombres Avanzados — Advanced Pronouns',
          description: 'Master direct/indirect object pronoun combinations.',
          objectives: ['Combine DO and IO pronouns', 'Know the le→se rule', 'Place pronouns correctly with various verb forms'],
          vocabulary: ['me lo', 'te la', 'se lo', 'se la', 'nos los', 'dámelo', 'dígaselo', 'estoy haciéndolo', 'quiero dártelo'],
          grammarPoint: 'IO before DO: me lo, te la. Le/les + lo/la → se lo/se la. Attach to infinitives, gerunds, and affirmative commands.',
          practicePrompt: 'Answer using pronouns: "¿Me das el libro?" → "Sí, te lo doy." Create 5 more examples.',
          requiredScore: 70
        },
        {
          id: 'B1_05',
          title: 'La Voz Pasiva — Passive Voice',
          description: 'Use passive constructions and impersonal "se".',
          objectives: ['Form the passive with ser + participle', 'Use passive se', 'Use impersonal se'],
          vocabulary: ['fue construido', 'fue escrito', 'se habla', 'se vende', 'se necesita', 'se dice', 'se puede', 'se prohíbe', 'se recomienda', 'se busca'],
          grammarPoint: 'True passive: ser + participle (participle agrees). Se pasiva: se + verb (verb agrees with subject). Se impersonal: se + 3rd singular.',
          practicePrompt: 'Rewrite these active sentences in passive form. Then write 3 "se" impersonal sentences.',
          requiredScore: 70
        },
        {
          id: 'B1_06',
          title: 'Oraciones Relativas — Relative Clauses',
          description: 'Build complex sentences with relative pronouns.',
          objectives: ['Use que, quien, el cual correctly', 'Use lo que for abstract ideas', 'Use donde, como, cuando as relatives'],
          vocabulary: ['que', 'quien', 'quienes', 'el cual', 'la cual', 'lo que', 'lo cual', 'cuyo', 'donde', 'como', 'cuando'],
          grammarPoint: '"Que" is the most common relative. Use "quien" after prepositions for people. "Lo que" = what/that which. "Cuyo" = whose (agrees with possessed noun).',
          practicePrompt: 'Combine pairs of simple sentences into complex ones using relative pronouns.',
          requiredScore: 70
        },
        {
          id: 'B1_07',
          title: 'Expresiones Idiomáticas — Idiomatic Expressions',
          description: 'Learn common Spanish idioms and figurative language.',
          objectives: ['Understand 20+ common idioms', 'Use idioms in context', 'Identify literal vs figurative meaning'],
          vocabulary: ['estar en las nubes', 'tomar el pelo', 'meter la pata', 'ser pan comido', 'no tener pelos en la lengua', 'echar de menos', 'dar en el clavo', 'ponerse las pilas'],
          grammarPoint: 'Idioms often cannot be translated literally. Learn them as complete phrases. Many use reflexive or pronominal verbs.',
          practicePrompt: 'Use 5 different Spanish idioms in sentences. Explain what each one means.',
          requiredScore: 70
        },
        {
          id: 'B1_08',
          title: 'Escritura Formal — Formal Writing',
          description: 'Write formal letters, emails, and short essays.',
          objectives: ['Write a formal email', 'Use formal register (usted)', 'Structure an essay with connectors'],
          vocabulary: ['Estimado/a', 'Le escribo para', 'Atentamente', 'En primer lugar', 'Por un lado', 'Sin embargo', 'En conclusión', 'Le saluda atentamente', 'Quedo a su disposición'],
          grammarPoint: 'Use usted/ustedes forms for formal writing. Formal closings. Discourse connectors for coherence: además, sin embargo, por lo tanto, en resumen.',
          practicePrompt: 'Write a formal email to a hotel in Spain making a reservation for 3 nights.',
          requiredScore: 70
        },
        {
          id: 'B1_09',
          title: 'Debates y Opiniones — Debates & Opinions',
          description: 'Express, support, and argue opinions on various topics.',
          objectives: ['State your opinion with supporting reasons', 'Agree and disagree respectfully', 'Use subjunctive with doubt/emotion expressions'],
          vocabulary: ['en mi opinión', 'desde mi punto de vista', 'creo firmemente que', 'no estoy de acuerdo porque', 'es verdad que... pero', 'por un lado... por otro', 'al contrario', 'sin duda', 'no cabe duda de que'],
          grammarPoint: 'Opinions: creo que + indicative (I believe that...). Doubt: no creo que + subjunctive (I don\'t believe that...). Emotion: me alegra que + subjunctive.',
          practicePrompt: 'Give your opinion on this topic: "Is technology good or bad for education?" Support both sides.',
          requiredScore: 70
        },
        {
          id: 'B1_10',
          title: 'La Literatura — Introduction to Literature',
          description: 'Read and discuss short literary texts.',
          objectives: ['Read a short story or poem in Spanish', 'Identify literary devices', 'Discuss themes and meaning'],
          vocabulary: ['cuento', 'novela', 'poema', 'personaje', 'argumento', 'tema', 'narrador', 'metáfora', 'símil', 'moraleja', 'desenlace', 'clímax', 'trama', 'género'],
          grammarPoint: 'Literary past tense: preterite for plot events, imperfect for descriptions/background. "Érase una vez" (Once upon a time).',
          practicePrompt: 'Read a short passage and answer: What is the main theme? Who are the characters? What happens?',
          requiredScore: 70
        }
      ]
    },
    {
      id: 'B2',
      name: 'B2 — Upper Intermediate',
      description: 'Advanced Spanish: nuanced grammar, academic language, regional variations, professional contexts.',
      color: '#9C27B0',
      icon: '🌲',
      lessons: [
        {
          id: 'B2_01',
          title: 'El Subjuntivo Avanzado — Advanced Subjunctive',
          description: 'Master imperfect subjunctive, pluperfect subjunctive, and complex triggers.',
          objectives: ['Form imperfect subjunctive (-ra/-se forms)', 'Use pluperfect subjunctive', 'Apply in conditional sentences'],
          vocabulary: ['si tuviera', 'como si fuera', 'ojalá pudiera', 'hubiera sabido', 'habría ido', 'quisiera', 'antes de que', 'a menos que', 'con tal de que', 'para que', 'sin que'],
          grammarPoint: 'Imperfect subjunctive from 3rd person preterite pluralpreterite: ellos hablaron → hablara/hablase. Si + imp. subj. + conditional. Pluperfect subj. = hubiera + participle.',
          practicePrompt: 'Write 5 hypothetical "si" sentences using imperfect and pluperfect subjunctive.',
          requiredScore: 70
        },
        {
          id: 'B2_02',
          title: 'Condicionales Complejas — Complex Conditionals',
          description: 'Master all three conditional sentence types.',
          objectives: ['Distinguish Types 1, 2, and 3', 'Use mixed conditionals', 'Express regrets about the past'],
          vocabulary: ['si hubiera', 'habría', 'ojalá hubiera', 'de haber sabido', 'en caso de que', 'a condición de que', 'siempre y cuando'],
          grammarPoint: 'Type 1: Si + present, future. Type 2: Si + imp. subj., conditional. Type 3: Si + pluperfect subj., conditional perfect. Mixed: Si + pluperfect subj., conditional.',
          practicePrompt: 'Create one sentence for each conditional type. Then one mixed conditional expressing a past condition with a present result.',
          requiredScore: 70
        },
        {
          id: 'B2_03',
          title: 'Vocabulario Matizado — Nuanced Vocabulary',
          description: 'Expand vocabulary with synonyms, register differences, and precise word choice.',
          objectives: ['Use precise synonyms instead of basic words', 'Distinguish formal/informal register', 'Use advanced adjectives and adverbs'],
          vocabulary: ['realizar (carry out)', 'lograr (achieve)', 'asombroso (astonishing)', 'imprescindible (essential)', 'paulatinamente (gradually)', 'no obstante (nevertheless)', 'a raíz de (as a result of)', 'en aras de (for the sake of)'],
          grammarPoint: 'Register awareness: "tener" → "poseer/contar con" (formal). "Decir" → "afirmar/sostener/manifestar" (formal). Choose words based on context.',
          practicePrompt: 'Rewrite these basic sentences using more sophisticated vocabulary and formal register.',
          requiredScore: 70
        },
        {
          id: 'B2_04',
          title: 'Variaciones Regionales — Regional Spanish',
          description: 'Understand differences between Spanish from Spain, Mexico, Argentina, Colombia, and others.',
          objectives: ['Recognize voseo (Argentine Spanish)', 'Know vocabulary differences between regions', 'Understand pronunciation variations'],
          vocabulary: ['vos (Argentina)', 'ordenador/computadora', 'coche/carro/auto', 'piso/departamento/apartamento', 'vale/órale/dale', 'móvil/celular', 'gafas/lentes/anteojos', 'zumo/jugo', 'patata/papa'],
          grammarPoint: 'Voseo: vos hablás, vos comés, vos vivís (present). Leísmo (Spain): le instead of lo for masculine DO. Ustedes (Latin America) vs vosotros (Spain).',
          practicePrompt: 'Translate this sentence into both Spanish (Spain) and Latin American Spanish, noting vocabulary differences.',
          requiredScore: 70
        },
        {
          id: 'B2_05',
          title: 'Español Académico — Academic Spanish',
          description: 'Write and understand academic texts.',
          objectives: ['Write a structured essay', 'Use academic vocabulary', 'Cite sources and present arguments'],
          vocabulary: ['según', 'de acuerdo con', 'cabe destacar', 'conviene señalar', 'a modo de conclusión', 'en lo que respecta a', 'dicho de otro modo', 'a grandes rasgos', 'en definitiva'],
          grammarPoint: 'Academic register: nominalizations (el desarrollo, la realización). Impersonal constructions (se ha demostrado, cabe mencionar). Hedging (parece que, podría ser).',
          practicePrompt: 'Write a short academic paragraph about the importance of learning languages.',
          requiredScore: 70
        },
        {
          id: 'B2_06',
          title: 'Español de Negocios — Business Spanish',
          description: 'Professional vocabulary and communication.',
          objectives: ['Write professional emails and reports', 'Conduct a business meeting', 'Negotiate and present proposals'],
          vocabulary: ['empresa', 'socio', 'inversión', 'beneficio', 'pérdida', 'presupuesto', 'plazo', 'factura', 'contrato', 'negociar', 'acordar', 'propuesta', 'proyecto', 'objetivo', 'rentable'],
          grammarPoint: 'Formal subjunctive uses: "Le agradecería que…" (I would appreciate if…). "Necesitamos que…" (We need you to…). Conditional for polite requests.',
          practicePrompt: 'Write a professional email proposing a business meeting to discuss a new project.',
          requiredScore: 70
        },
        {
          id: 'B2_07',
          title: 'Análisis Literario — Literary Analysis',
          description: 'Analyze Spanish-language literature at a deeper level.',
          objectives: ['Analyze narrative techniques', 'Discuss symbolism and themes', 'Write a literary commentary'],
          vocabulary: ['simbólico', 'alegórico', 'perspectiva narrativa', 'realismo mágico', 'stream of consciousness', 'punto de vista', 'flashback', 'presagio', 'ironía', 'sátira', 'género literario'],
          grammarPoint: 'Literary analysis uses present tense for describing what happens in a text ("El protagonista descubre…"). Formal register with academic vocabulary.',
          practicePrompt: 'Analyze a short passage: identify the narrative voice, the main themes, and one literary device used.',
          requiredScore: 70
        },
        {
          id: 'B2_08',
          title: 'Conversación Avanzada — Advanced Conversation',
          description: 'Handle complex social situations and abstract discussions.',
          objectives: ['Discuss abstract topics fluently', 'Handle conflicts and complaints', 'Use humor and sarcasm appropriately'],
          vocabulary: ['de hecho', 'en efecto', 'a propósito', 'por cierto', 'dicho sea de paso', 'cambiando de tema', 'volviendo al tema', 'no me digas', 'fíjate que', 'resulta que'],
          grammarPoint: 'Discourse markers for natural conversation. Subjunctive in relative clauses for unknown/nonexistent referents: "Busco a alguien que hable francés."',
          practicePrompt: 'Discuss the pros and cons of social media. Use discourse markers to sound natural.',
          requiredScore: 70
        }
      ]
    }
  ];

  // ── Initialization ─────────────────────────────────────────
  function load() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        progress = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LearningPaths: Could not load progress', e);
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LearningPaths: Could not save progress', e);
    }
  }

  // ── Core Functions ─────────────────────────────────────────

  /**
   * Get all available levels.
   */
  function getLevels() {
    return levels.map(function (level) {
      var completed = 0;
      for (var i = 0; i < level.lessons.length; i++) {
        if (progress[level.lessons[i].id] && progress[level.lessons[i].id].completed) {
          completed++;
        }
      }
      return {
        id: level.id,
        name: level.name,
        description: level.description,
        color: level.color,
        icon: level.icon,
        totalLessons: level.lessons.length,
        completedLessons: completed,
        percentComplete: Math.round((completed / level.lessons.length) * 100)
      };
    });
  }

  /**
   * Get a specific level with full lesson details.
   */
  function getLevel(levelId) {
    for (var i = 0; i < levels.length; i++) {
      if (levels[i].id === levelId) return levels[i];
    }
    return null;
  }

  /**
   * Get a specific lesson.
   */
  function getLesson(lessonId) {
    for (var i = 0; i < levels.length; i++) {
      for (var j = 0; j < levels[i].lessons.length; j++) {
        if (levels[i].lessons[j].id === lessonId) {
          return levels[i].lessons[j];
        }
      }
    }
    return null;
  }

  /**
   * Get the current (next uncompleted) lesson.
   */
  function getCurrentLesson() {
    for (var i = 0; i < levels.length; i++) {
      for (var j = 0; j < levels[i].lessons.length; j++) {
        var lesson = levels[i].lessons[j];
        if (!progress[lesson.id] || !progress[lesson.id].completed) {
          return { level: levels[i], lesson: lesson, levelIndex: i, lessonIndex: j };
        }
      }
    }
    return null; // All complete
  }

  /**
   * Mark a lesson as completed.
   */
  function completeLesson(lessonId, score) {
    progress[lessonId] = {
      completed: score >= 70,
      score: score,
      timestamp: Date.now(),
      attempts: (progress[lessonId] ? progress[lessonId].attempts || 0 : 0) + 1
    };
    save();
    return progress[lessonId];
  }

  /**
   * Check if a lesson is unlocked (previous lesson completed or first lesson).
   */
  function isLessonUnlocked(lessonId) {
    for (var i = 0; i < levels.length; i++) {
      for (var j = 0; j < levels[i].lessons.length; j++) {
        if (levels[i].lessons[j].id === lessonId) {
          if (j === 0) {
            // First lesson of level: check if previous level is complete (or first level)
            if (i === 0) return true;
            var prevLevel = levels[i - 1];
            var prevCompleted = 0;
            for (var k = 0; k < prevLevel.lessons.length; k++) {
              if (progress[prevLevel.lessons[k].id] && progress[prevLevel.lessons[k].id].completed) {
                prevCompleted++;
              }
            }
            return prevCompleted >= Math.floor(prevLevel.lessons.length * 0.7); // 70% of previous level
          }
          // Not first lesson: check previous lesson
          var prevLesson = levels[i].lessons[j - 1];
          return progress[prevLesson.id] && progress[prevLesson.id].completed;
        }
      }
    }
    return false;
  }

  /**
   * Get overall progress stats.
   */
  function getOverallProgress() {
    var totalLessons = 0;
    var completedLessons = 0;
    var totalScore = 0;
    var scoredLessons = 0;

    for (var i = 0; i < levels.length; i++) {
      totalLessons += levels[i].lessons.length;
      for (var j = 0; j < levels[i].lessons.length; j++) {
        var p = progress[levels[i].lessons[j].id];
        if (p && p.completed) {
          completedLessons++;
          totalScore += p.score;
          scoredLessons++;
        }
      }
    }

    return {
      totalLessons: totalLessons,
      completedLessons: completedLessons,
      percentComplete: Math.round((completedLessons / totalLessons) * 100),
      averageScore: scoredLessons > 0 ? Math.round(totalScore / scoredLessons) : 0,
      currentLevel: _getCurrentLevelId()
    };
  }

  // ── Formatting ─────────────────────────────────────────────

  /**
   * Format all levels as an overview HTML.
   */
  function formatLevelsOverview() {
    var levelData = getLevels();
    var html = '<div class="learning-path-overview">';
    html += '<div class="path-title">📚 Learning Path — Spanish CEFR Curriculum</div>';

    for (var i = 0; i < levelData.length; i++) {
      var l = levelData[i];
      var statusClass = l.percentComplete === 100 ? 'level-complete' :
        l.completedLessons > 0 ? 'level-active' : 'level-locked';
      html += '<div class="level-card ' + statusClass + '" style="border-left: 4px solid ' + l.color + '">';
      html += '<div class="level-header">';
      html += '<span class="level-icon">' + l.icon + '</span> ';
      html += '<strong>' + l.name + '</strong>';
      html += '<span class="level-progress">' + l.completedLessons + '/' + l.totalLessons + '</span>';
      html += '</div>';
      html += '<div class="level-desc">' + l.description + '</div>';
      html += '<div class="level-bar"><div class="level-bar-fill" style="width:' + l.percentComplete + '%;background:' + l.color + '"></div></div>';
      html += '</div>';
    }

    var current = getCurrentLesson();
    if (current) {
      html += '<div class="path-next">📍 <strong>Next:</strong> ' + current.lesson.title + ' (' + current.level.name + ')</div>';
      html += '<p>Type <strong>"start lesson"</strong> to begin!</p>';
    } else {
      html += '<div class="path-complete">🎉 Congratulations! You\'ve completed all lessons!</div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Format a single lesson overview.
   */
  function formatLessonOverview(lesson) {
    if (!lesson) return '<p>Lesson not found.</p>';

    var p = progress[lesson.id];
    var html = '<div class="lesson-overview">';
    html += '<div class="lesson-title">📖 ' + lesson.title + '</div>';
    html += '<p>' + lesson.description + '</p>';

    // Objectives
    html += '<div class="lesson-section"><strong>🎯 Objectives:</strong><ul>';
    for (var i = 0; i < lesson.objectives.length; i++) {
      html += '<li>' + lesson.objectives[i] + '</li>';
    }
    html += '</ul></div>';

    // Key vocabulary
    html += '<div class="lesson-section"><strong>📝 Key Vocabulary:</strong> ';
    html += '<span class="spanish-text">' + lesson.vocabulary.join(', ') + '</span>';
    html += '</div>';

    // Grammar point
    html += '<div class="lesson-section"><strong>📐 Grammar Focus:</strong> ' + lesson.grammarPoint + '</div>';

    // Practice prompt
    html += '<div class="lesson-section"><strong>✍️ Practice:</strong> ' + lesson.practicePrompt + '</div>';

    // Status
    if (p && p.completed) {
      html += '<div class="lesson-status lesson-passed">✅ Completed — Score: ' + p.score + '%</div>';
    } else if (p) {
      html += '<div class="lesson-status lesson-attempted">⏳ Attempted — Best score: ' + p.score + '% (need 70%)</div>';
    } else {
      html += '<div class="lesson-status lesson-new">🆕 Not started yet</div>';
    }

    html += '</div>';
    return html;
  }

  // ── Private Helpers ────────────────────────────────────────

  function _getCurrentLevelId() {
    for (var i = 0; i < levels.length; i++) {
      for (var j = 0; j < levels[i].lessons.length; j++) {
        if (!progress[levels[i].lessons[j].id] || !progress[levels[i].lessons[j].id].completed) {
          return levels[i].id;
        }
      }
    }
    return 'B2'; // All complete
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    load: load,
    save: save,
    getLevels: getLevels,
    getLevel: getLevel,
    getLesson: getLesson,
    getCurrentLesson: getCurrentLesson,
    completeLesson: completeLesson,
    isLessonUnlocked: isLessonUnlocked,
    getOverallProgress: getOverallProgress,
    formatLevelsOverview: formatLevelsOverview,
    formatLessonOverview: formatLessonOverview
  };
})();
