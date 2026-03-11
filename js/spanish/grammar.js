// ============================================================
// Grammar Rules — explanations for key Spanish grammar topics
// ============================================================
var Grammar = (function () {
  'use strict';

  var rules = {
    'ser vs estar': {
      title: 'Ser vs. Estar — The Two "To Be" Verbs',
      explanation: 'Spanish has two verbs that both mean "to be": <strong>ser</strong> and <strong>estar</strong>. They are NOT interchangeable!',
      sections: [
        {
          heading: 'Use SER for:',
          points: [
            '<strong>Identity</strong> — Yo <span class="spanish-text">soy</span> María. (I am María.)',
            '<strong>Nationality/Origin</strong> — Ella <span class="spanish-text">es</span> de España. (She is from Spain.)',
            '<strong>Profession</strong> — Él <span class="spanish-text">es</span> doctor. (He is a doctor.)',
            '<strong>Characteristics</strong> (permanent qualities) — La casa <span class="spanish-text">es</span> grande. (The house is big.)',
            '<strong>Time/Date</strong> — <span class="spanish-text">Son</span> las tres. (It\'s three o\'clock.)',
            '<strong>Material</strong> — La mesa <span class="spanish-text">es</span> de madera. (The table is made of wood.)',
            '<strong>Relationships</strong> — Ella <span class="spanish-text">es</span> mi hermana. (She is my sister.)'
          ]
        },
        {
          heading: 'Use ESTAR for:',
          points: [
            '<strong>Location</strong> — El libro <span class="spanish-text">está</span> en la mesa. (The book is on the table.)',
            '<strong>Temporary states/conditions</strong> — <span class="spanish-text">Estoy</span> cansado. (I am tired.)',
            '<strong>Emotions</strong> — <span class="spanish-text">Está</span> feliz. (He/She is happy.)',
            '<strong>Progressive tenses</strong> — <span class="spanish-text">Estoy</span> comiendo. (I am eating.)',
            '<strong>Results of actions</strong> — La puerta <span class="spanish-text">está</span> abierta. (The door is open.)'
          ]
        },
        {
          heading: '💡 Memory trick: "For how you feel and where you are, always use the verb ESTAR!"',
          points: []
        }
      ]
    },

    'por vs para': {
      title: 'Por vs. Para — Two Meanings of "For"',
      explanation: 'Both <strong>por</strong> and <strong>para</strong> can translate to "for" in English, but they have distinct uses.',
      sections: [
        {
          heading: 'Use POR for:',
          points: [
            '<strong>Duration of time</strong> — Estudié <span class="spanish-text">por</span> dos horas. (I studied for two hours.)',
            '<strong>Exchange/substitution</strong> — Pagué diez dólares <span class="spanish-text">por</span> el libro. (I paid ten dollars for the book.)',
            '<strong>Movement through</strong> — Caminamos <span class="spanish-text">por</span> el parque. (We walked through the park.)',
            '<strong>Reason/cause</strong> — Lo hice <span class="spanish-text">por</span> ti. (I did it because of you.)',
            '<strong>Means of communication/transport</strong> — Te llamo <span class="spanish-text">por</span> teléfono. (I\'ll call you by phone.)',
            '<strong>"Per"</strong> — Tres veces <span class="spanish-text">por</span> semana. (Three times per week.)'
          ]
        },
        {
          heading: 'Use PARA for:',
          points: [
            '<strong>Destination</strong> — Salgo <span class="spanish-text">para</span> Madrid. (I\'m leaving for Madrid.)',
            '<strong>Deadline</strong> — Es <span class="spanish-text">para</span> mañana. (It\'s for/due tomorrow.)',
            '<strong>Purpose/goal</strong> — Estudio <span class="spanish-text">para</span> aprender. (I study to/in order to learn.)',
            '<strong>Recipient</strong> — El regalo es <span class="spanish-text">para</span> ti. (The gift is for you.)',
            '<strong>Opinion</strong> — <span class="spanish-text">Para</span> mí, es fácil. (For me, it\'s easy.)',
            '<strong>Comparison</strong> — <span class="spanish-text">Para</span> ser niño, es muy alto. (For a child, he\'s very tall.)'
          ]
        }
      ]
    },

    'gender': {
      title: 'Gender & Number Agreement',
      explanation: 'In Spanish, all nouns have a gender (masculine or feminine), and adjectives must agree with the noun in both gender and number.',
      sections: [
        {
          heading: 'General Rules:',
          points: [
            'Nouns ending in <strong>-o</strong> are usually masculine: <span class="spanish-text">el libro</span> (the book)',
            'Nouns ending in <strong>-a</strong> are usually feminine: <span class="spanish-text">la mesa</span> (the table)',
            'Nouns ending in <strong>-ción, -sión, -dad, -tad</strong> are usually feminine: <span class="spanish-text">la nación, la ciudad</span>',
            'Nouns ending in <strong>-ma</strong> (from Greek) are often masculine: <span class="spanish-text">el problema, el tema</span>'
          ]
        },
        {
          heading: 'Making Plurals:',
          points: [
            'Words ending in a vowel → add <strong>-s</strong>: <span class="spanish-text">libro → libros, mesa → mesas</span>',
            'Words ending in a consonant → add <strong>-es</strong>: <span class="spanish-text">ciudad → ciudades</span>',
            'Words ending in <strong>-z</strong> → change to <strong>-ces</strong>: <span class="spanish-text">lápiz → lápices</span>'
          ]
        },
        {
          heading: 'Adjective Agreement:',
          points: [
            'Masculine singular: <span class="spanish-text">El gato <strong>negro</strong></span> (The black cat)',
            'Feminine singular: <span class="spanish-text">La gata <strong>negra</strong></span> (The black cat)',
            'Masculine plural: <span class="spanish-text">Los gatos <strong>negros</strong></span> (The black cats)',
            'Feminine plural: <span class="spanish-text">Las gatas <strong>negras</strong></span> (The black cats)'
          ]
        }
      ]
    },

    'articles': {
      title: 'Definite & Indefinite Articles',
      explanation: 'Spanish articles change based on the gender and number of the noun they accompany.',
      sections: [
        {
          heading: 'Definite Articles ("the"):',
          points: [
            '<strong>el</strong> — masculine singular: <span class="spanish-text">el libro</span> (the book)',
            '<strong>la</strong> — feminine singular: <span class="spanish-text">la casa</span> (the house)',
            '<strong>los</strong> — masculine plural: <span class="spanish-text">los libros</span> (the books)',
            '<strong>las</strong> — feminine plural: <span class="spanish-text">las casas</span> (the houses)'
          ]
        },
        {
          heading: 'Indefinite Articles ("a/an/some"):',
          points: [
            '<strong>un</strong> — masculine singular: <span class="spanish-text">un libro</span> (a book)',
            '<strong>una</strong> — feminine singular: <span class="spanish-text">una casa</span> (a house)',
            '<strong>unos</strong> — masculine plural: <span class="spanish-text">unos libros</span> (some books)',
            '<strong>unas</strong> — feminine plural: <span class="spanish-text">unas casas</span> (some houses)'
          ]
        },
        {
          heading: '💡 Special case:',
          points: [
            'Before feminine nouns starting with stressed "a-" or "ha-", use <strong>el/un</strong> (but the noun is still feminine!): <span class="spanish-text">el agua fría</span> (the cold water), <span class="spanish-text">un águila grande</span> (a big eagle)'
          ]
        }
      ]
    },

    'adjectives': {
      title: 'Adjective Placement',
      explanation: 'Unlike English, most Spanish adjectives come AFTER the noun they describe.',
      sections: [
        {
          heading: 'Normal position (after the noun):',
          points: [
            '<span class="spanish-text">Un coche <strong>rojo</strong></span> (A red car)',
            '<span class="spanish-text">Una mujer <strong>inteligente</strong></span> (An intelligent woman)',
            '<span class="spanish-text">Un libro <strong>interesante</strong></span> (An interesting book)'
          ]
        },
        {
          heading: 'Adjectives that go BEFORE the noun:',
          points: [
            '<strong>bueno/malo</strong> → <span class="spanish-text">un <strong>buen</strong> libro</span> (a good book) — note: bueno shortens to buen before masc. singular nouns',
            '<strong>grande</strong> → <span class="spanish-text">un <strong>gran</strong> hombre</span> (a great man) — note: changes meaning! After = big, before = great',
            '<strong>Numbers</strong> → <span class="spanish-text"><strong>tres</strong> libros</span> (three books)',
            '<strong>Possessives</strong> → <span class="spanish-text"><strong>mi</strong> casa</span> (my house)',
            '<strong>Demonstratives</strong> → <span class="spanish-text"><strong>este</strong> gato</span> (this cat)'
          ]
        }
      ]
    },

    'pronouns': {
      title: 'Object Pronouns',
      explanation: 'Spanish uses direct and indirect object pronouns to replace nouns and avoid repetition.',
      sections: [
        {
          heading: 'Direct Object Pronouns (what/whom):',
          points: [
            '<strong>me</strong> — me',
            '<strong>te</strong> — you (informal)',
            '<strong>lo</strong> — him/it (masc.) / <strong>la</strong> — her/it (fem.)',
            '<strong>nos</strong> — us',
            '<strong>os</strong> — you all (Spain)',
            '<strong>los</strong> — them (masc.) / <strong>las</strong> — them (fem.)',
            'Example: <span class="spanish-text">Veo el libro → <strong>Lo</strong> veo.</span> (I see it.)'
          ]
        },
        {
          heading: 'Indirect Object Pronouns (to/for whom):',
          points: [
            '<strong>me</strong> — to me',
            '<strong>te</strong> — to you',
            '<strong>le</strong> — to him/her/you (formal)',
            '<strong>nos</strong> — to us',
            '<strong>os</strong> — to you all',
            '<strong>les</strong> — to them/you all (formal)',
            'Example: <span class="spanish-text"><strong>Le</strong> doy el libro.</span> (I give the book to him/her.)'
          ]
        },
        {
          heading: '💡 Placement rules:',
          points: [
            'Usually placed BEFORE the conjugated verb: <span class="spanish-text"><strong>Lo</strong> quiero.</span> (I want it.)',
            'Attached to infinitives: <span class="spanish-text">Quiero comer<strong>lo</strong>.</span> (I want to eat it.)',
            'Attached to present participles: <span class="spanish-text">Estoy leyéndo<strong>lo</strong>.</span> (I am reading it.)'
          ]
        }
      ]
    },

    'reflexive': {
      title: 'Reflexive Verbs',
      explanation: 'Reflexive verbs indicate that the subject performs the action on itself. They use reflexive pronouns.',
      sections: [
        {
          heading: 'Reflexive Pronouns:',
          points: [
            '<strong>me</strong> — myself (yo)',
            '<strong>te</strong> — yourself (tú)',
            '<strong>se</strong> — himself/herself/itself/yourself formal (él/ella/usted)',
            '<strong>nos</strong> — ourselves (nosotros)',
            '<strong>os</strong> — yourselves (vosotros)',
            '<strong>se</strong> — themselves/yourselves formal (ellos/ellas/ustedes)'
          ]
        },
        {
          heading: 'Common Reflexive Verbs:',
          points: [
            '<span class="spanish-text">levantarse</span> — to get up: <span class="spanish-text"><strong>Me levanto</strong> a las siete.</span> (I get up at seven.)',
            '<span class="spanish-text">ducharse</span> — to shower: <span class="spanish-text"><strong>Me ducho</strong> por la mañana.</span> (I shower in the morning.)',
            '<span class="spanish-text">vestirse</span> — to get dressed: <span class="spanish-text"><strong>Me visto</strong> rápido.</span> (I get dressed quickly.)',
            '<span class="spanish-text">acostarse</span> — to go to bed: <span class="spanish-text"><strong>Me acuesto</strong> a las diez.</span> (I go to bed at ten.)',
            '<span class="spanish-text">llamarse</span> — to be called: <span class="spanish-text"><strong>Me llamo</strong> Juan.</span> (My name is Juan.)',
            '<span class="spanish-text">sentirse</span> — to feel: <span class="spanish-text"><strong>Me siento</strong> bien.</span> (I feel good.)'
          ]
        }
      ]
    },

    'subjunctive': {
      title: 'The Subjunctive Mood',
      explanation: 'The subjunctive is used to express wishes, doubts, emotions, possibilities, and hypothetical situations. It\'s one of the trickiest topics for English speakers!',
      sections: [
        {
          heading: 'Triggers for the Subjunctive (WEIRDO):',
          points: [
            '<strong>W</strong>ishes — Quiero que <span class="spanish-text">vengas</span>. (I want you to come.)',
            '<strong>E</strong>motions — Me alegra que <span class="spanish-text">estés</span> aquí. (I\'m glad you\'re here.)',
            '<strong>I</strong>mpersonal expressions — Es importante que <span class="spanish-text">estudies</span>. (It\'s important that you study.)',
            '<strong>R</strong>ecommendations — Recomiendo que <span class="spanish-text">comas</span> más verduras. (I recommend you eat more vegetables.)',
            '<strong>D</strong>oubt/Denial — Dudo que <span class="spanish-text">llueva</span>. (I doubt it will rain.)',
            '<strong>O</strong>jalá (hopefully) — Ojalá que <span class="spanish-text">sea</span> verdad. (I hope it\'s true.)'
          ]
        },
        {
          heading: '💡 Key pattern:',
          points: [
            'Main clause (indicative) + <strong>que</strong> + subordinate clause (subjunctive)',
            'Two different subjects are required. If the same person does both actions, use infinitive instead.',
            'Correct: <span class="spanish-text">Quiero <strong>que tú vengas</strong>.</span> (I want you to come.)',
            'Not subjunctive: <span class="spanish-text">Quiero <strong>venir</strong>.</span> (I want to come.) — same subject, use infinitive.'
          ]
        }
      ]
    },

    'negation': {
      title: 'Negation in Spanish',
      explanation: 'Making sentences negative in Spanish is simple, but there are some key differences from English.',
      sections: [
        {
          heading: 'Basic Negation:',
          points: [
            'Place <strong>no</strong> before the verb: <span class="spanish-text"><strong>No</strong> hablo español.</span> (I don\'t speak Spanish.)',
            'With object pronouns, "no" goes before the pronoun: <span class="spanish-text"><strong>No</strong> lo tengo.</span> (I don\'t have it.)'
          ]
        },
        {
          heading: 'Negative Words:',
          points: [
            '<strong>nada</strong> — nothing: <span class="spanish-text">No tengo <strong>nada</strong>.</span> (I don\'t have anything.)',
            '<strong>nadie</strong> — nobody: <span class="spanish-text">No hay <strong>nadie</strong>.</span> (There\'s nobody.)',
            '<strong>nunca/jamás</strong> — never: <span class="spanish-text">No voy <strong>nunca</strong>.</span> (I never go.)',
            '<strong>tampoco</strong> — neither/not either: <span class="spanish-text">Yo <strong>tampoco</strong>.</span> (Me neither.)',
            '<strong>ninguno/a</strong> — none: <span class="spanish-text">No tengo <strong>ningún</strong> libro.</span> (I don\'t have any book.)'
          ]
        },
        {
          heading: '💡 Double negatives are CORRECT in Spanish!',
          points: [
            '<span class="spanish-text"><strong>No</strong> quiero <strong>nada</strong>.</span> = I don\'t want anything. (Literally: I don\'t want nothing.)',
            'Unlike English, Spanish requires the double negative.'
          ]
        }
      ]
    },

    'question words': {
      title: 'Question Words (Interrogatives)',
      explanation: 'Spanish question words always carry an accent mark when used in a question.',
      sections: [
        {
          heading: 'The Essential Question Words:',
          points: [
            '<strong>¿Qué?</strong> — What? <span class="spanish-text">¿Qué quieres?</span> (What do you want?)',
            '<strong>¿Quién? / ¿Quiénes?</strong> — Who? <span class="spanish-text">¿Quién es ella?</span> (Who is she?)',
            '<strong>¿Dónde?</strong> — Where? <span class="spanish-text">¿Dónde vives?</span> (Where do you live?)',
            '<strong>¿Cuándo?</strong> — When? <span class="spanish-text">¿Cuándo es la fiesta?</span> (When is the party?)',
            '<strong>¿Por qué?</strong> — Why? <span class="spanish-text">¿Por qué estudias español?</span> (Why do you study Spanish?)',
            '<strong>¿Cómo?</strong> — How? <span class="spanish-text">¿Cómo estás?</span> (How are you?)',
            '<strong>¿Cuánto/a? / ¿Cuántos/as?</strong> — How much/many? <span class="spanish-text">¿Cuánto cuesta?</span> (How much does it cost?)',
            '<strong>¿Cuál? / ¿Cuáles?</strong> — Which? <span class="spanish-text">¿Cuál prefieres?</span> (Which do you prefer?)'
          ]
        },
        {
          heading: '💡 Remember:',
          points: [
            'Spanish questions use both opening ¿ and closing ? marks.',
            'The answer to <strong>¿Por qué?</strong> (why?) uses <strong>porque</strong> (because) — one word, no accent!'
          ]
        }
      ]
    },

    'preterite vs imperfect': {
      title: 'Preterite vs. Imperfect Past Tenses',
      explanation: 'Spanish has two main past tenses. Choosing between them is one of the biggest challenges for learners!',
      sections: [
        {
          heading: 'Use PRETERITE for:',
          points: [
            '<strong>Completed actions</strong> — <span class="spanish-text"><strong>Comí</strong> una manzana.</span> (I ate an apple.)',
            '<strong>Actions with a specific time</strong> — <span class="spanish-text"><strong>Llegué</strong> a las ocho.</span> (I arrived at eight.)',
            '<strong>Sequential events</strong> — <span class="spanish-text">Me levanté, <strong>desayuné</strong> y salí.</span> (I got up, ate breakfast, and left.)',
            '<strong>Actions done a specific number of times</strong> — <span class="spanish-text">Fui al cine <strong>tres veces</strong>.</span> (I went to the movies three times.)'
          ]
        },
        {
          heading: 'Use IMPERFECT for:',
          points: [
            '<strong>Habitual/repeated actions</strong> — <span class="spanish-text"><strong>Comía</strong> manzanas todos los días.</span> (I used to eat apples every day.)',
            '<strong>Descriptions/background</strong> — <span class="spanish-text">El cielo <strong>estaba</strong> azul.</span> (The sky was blue.)',
            '<strong>Age/time</strong> — <span class="spanish-text"><strong>Tenía</strong> diez años.</span> (I was ten years old.) / <span class="spanish-text"><strong>Eran</strong> las tres.</span> (It was three o\'clock.)',
            '<strong>Ongoing actions interrupted</strong> — <span class="spanish-text"><strong>Dormía</strong> cuando llegaste.</span> (I was sleeping when you arrived.)',
            '<strong>Emotional/physical states</strong> — <span class="spanish-text"><strong>Estaba</strong> cansado.</span> (I was tired.)'
          ]
        },
        {
          heading: '💡 Think of it this way:',
          points: [
            'Preterite = a photograph (snapshot of a completed action)',
            'Imperfect = a video (ongoing, no defined start/end)'
          ]
        }
      ]
    },

    'prepositions': {
      title: 'Common Prepositions',
      explanation: 'Prepositions are small words that show relationships between other words. Here are the most important Spanish prepositions.',
      sections: [
        {
          heading: 'Key Prepositions:',
          points: [
            '<strong>a</strong> — to, at: <span class="spanish-text">Voy <strong>a</strong> la escuela.</span> (I go to school.)',
            '<strong>de</strong> — of, from: <span class="spanish-text">Soy <strong>de</strong> México.</span> (I\'m from Mexico.)',
            '<strong>en</strong> — in, on, at: <span class="spanish-text">Estoy <strong>en</strong> casa.</span> (I\'m at home.)',
            '<strong>con</strong> — with: <span class="spanish-text">Voy <strong>con</strong> mi amigo.</span> (I go with my friend.)',
            '<strong>sin</strong> — without: <span class="spanish-text">Café <strong>sin</strong> azúcar.</span> (Coffee without sugar.)',
            '<strong>entre</strong> — between: <span class="spanish-text"><strong>Entre</strong> tú y yo.</span> (Between you and me.)',
            '<strong>sobre</strong> — on, about: <span class="spanish-text">El libro <strong>sobre</strong> la mesa.</span> (The book on the table.)',
            '<strong>hacia</strong> — toward: <span class="spanish-text">Camina <strong>hacia</strong> allá.</span> (Walk toward there.)',
            '<strong>hasta</strong> — until: <span class="spanish-text"><strong>Hasta</strong> mañana.</span> (Until tomorrow.)',
            '<strong>desde</strong> — from, since: <span class="spanish-text"><strong>Desde</strong> las ocho.</span> (Since eight o\'clock.)'
          ]
        },
        {
          heading: '💡 Personal "a":',
          points: [
            'When a person is the direct object of a verb, you must add <strong>a</strong> before them:',
            '<span class="spanish-text">Veo <strong>a</strong> mi madre.</span> (I see my mother.) — NOT "Veo mi madre."'
          ]
        }
      ]
    },

    // ── NEW GRAMMAR TOPICS ──────────────────────────────────────

    'comparatives and superlatives': {
      title: 'Comparatives & Superlatives',
      explanation: 'Spanish uses specific structures to compare things (comparatives) and to express the highest degree (superlatives).',
      sections: [
        {
          heading: 'Comparatives of Superiority (more … than):',
          points: [
            '<strong>más + adjective + que</strong>: <span class="spanish-text">María es <strong>más alta que</strong> Juan.</span> (María is taller than Juan.)',
            '<strong>más + noun + que</strong>: <span class="spanish-text">Tengo <strong>más libros que</strong> tú.</span> (I have more books than you.)',
            '<strong>más + adverb + que</strong>: <span class="spanish-text">Corre <strong>más rápido que</strong> yo.</span> (He runs faster than me.)',
            'With numbers use <strong>más de</strong>: <span class="spanish-text">Tiene <strong>más de</strong> veinte años.</span> (She is more than twenty years old.)'
          ]
        },
        {
          heading: 'Comparatives of Inferiority (less … than):',
          points: [
            '<strong>menos + adjective + que</strong>: <span class="spanish-text">Este libro es <strong>menos interesante que</strong> ese.</span> (This book is less interesting than that one.)',
            '<strong>menos + noun + que</strong>: <span class="spanish-text">Hay <strong>menos gente que</strong> ayer.</span> (There are fewer people than yesterday.)'
          ]
        },
        {
          heading: 'Comparatives of Equality (as … as):',
          points: [
            '<strong>tan + adjective + como</strong>: <span class="spanish-text">Soy <strong>tan alto como</strong> mi padre.</span> (I am as tall as my father.)',
            '<strong>tanto/a(s) + noun + como</strong>: <span class="spanish-text">Tengo <strong>tantos amigos como</strong> tú.</span> (I have as many friends as you.)',
            'Note: <strong>tanto</strong> agrees in gender and number with the noun it modifies.'
          ]
        },
        {
          heading: 'Superlatives (the most / the least):',
          points: [
            '<strong>el/la/los/las + más/menos + adjective + de</strong>: <span class="spanish-text">Es <strong>el más inteligente de</strong> la clase.</span> (He is the most intelligent in the class.)',
            'Absolute superlative with <strong>-ísimo/a</strong>: <span class="spanish-text">La comida está <strong>riquísima</strong>.</span> (The food is extremely delicious.)',
            'Spelling changes: rico → riqu<strong>ísimo</strong>, largo → largu<strong>ísimo</strong>, feliz → felic<strong>ísimo</strong>'
          ]
        },
        {
          heading: 'Irregular Comparatives:',
          points: [
            '<strong>bueno → mejor</strong> (good → better): <span class="spanish-text">Esta película es <strong>mejor</strong> que esa.</span>',
            '<strong>malo → peor</strong> (bad → worse): <span class="spanish-text">El tiempo está <strong>peor</strong> hoy.</span>',
            '<strong>grande → mayor</strong> (big → bigger/older): <span class="spanish-text">Mi hermano es <strong>mayor</strong> que yo.</span>',
            '<strong>pequeño → menor</strong> (small → smaller/younger): <span class="spanish-text">Ella es la <strong>menor</strong> de la familia.</span>',
            '💡 These irregular forms do NOT use "más": say "mejor" NOT "más mejor"!'
          ]
        }
      ]
    },

    'imperfect subjunctive': {
      title: 'The Imperfect Subjunctive (Imperfecto de Subjuntivo)',
      explanation: 'The imperfect subjunctive is used for hypothetical situations, polite requests, past subjunctive triggers, and "if" clauses. It has two forms (-ra and -se), but the -ra form is far more common.',
      sections: [
        {
          heading: 'Formation (based on 3rd person plural preterite):',
          points: [
            'Take the <strong>ellos/ellas</strong> preterite form, drop <strong>-ron</strong>, add endings:',
            '<strong>-ra form</strong>: -ra, -ras, -ra, -ramos, -rais, -ran',
            '<strong>-se form</strong>: -se, -ses, -se, -semos, -seis, -sen',
            'Example: hablar → habla<strong>ron</strong> → habla- → yo hablara, tú hablaras, él hablara…',
            'Example: tener → tuvie<strong>ron</strong> → tuvie- → yo tuviera, tú tuvieras, él tuviera…'
          ]
        },
        {
          heading: 'Uses of the Imperfect Subjunctive:',
          points: [
            '<strong>After "si" (if) for hypothetical conditions</strong>: <span class="spanish-text">Si <strong>tuviera</strong> dinero, viajaría.</span> (If I had money, I would travel.)',
            '<strong>Past subjunctive triggers</strong>: <span class="spanish-text">Quería que <strong>vinieras</strong>.</span> (I wanted you to come.)',
            '<strong>Polite requests with "quisiera"</strong>: <span class="spanish-text"><strong>Quisiera</strong> un café, por favor.</span> (I would like a coffee, please.)',
            '<strong>After "como si" (as if)</strong>: <span class="spanish-text">Habla como si <strong>fuera</strong> español.</span> (He speaks as if he were Spanish.)',
            '<strong>After "ojalá" for unlikely wishes</strong>: <span class="spanish-text">Ojalá <strong>pudiera</strong> ir contigo.</span> (I wish I could go with you.)'
          ]
        },
        {
          heading: '💡 Key Pattern: Si + imperfect subjunctive + conditional',
          points: [
            '<span class="spanish-text">Si <strong>fuera</strong> rico, <strong>compraría</strong> una casa.</span> (If I were rich, I would buy a house.)',
            '<span class="spanish-text">Si <strong>hablara</strong> español, <strong>viviría</strong> en España.</span> (If I spoke Spanish, I would live in Spain.)',
            'This is equivalent to English "If I were…, I would…"'
          ]
        }
      ]
    },

    'conditional sentences': {
      title: 'Conditional Sentences (Si Clauses)',
      explanation: 'Spanish has three main types of conditional (if/then) sentences, each using different verb tenses depending on how likely the condition is.',
      sections: [
        {
          heading: 'Type 1 — Real/Possible Conditions (present):',
          points: [
            'Structure: <strong>Si + present indicative, present/future/imperative</strong>',
            '<span class="spanish-text">Si <strong>llueve</strong>, <strong>llevo</strong> paraguas.</span> (If it rains, I take an umbrella.)',
            '<span class="spanish-text">Si <strong>estudias</strong>, <strong>aprobarás</strong>.</span> (If you study, you will pass.)',
            '<span class="spanish-text">Si <strong>tienes</strong> hambre, <strong>come</strong> algo.</span> (If you\'re hungry, eat something.)'
          ]
        },
        {
          heading: 'Type 2 — Hypothetical/Unlikely Conditions (present):',
          points: [
            'Structure: <strong>Si + imperfect subjunctive, conditional</strong>',
            '<span class="spanish-text">Si <strong>tuviera</strong> tiempo, <strong>iría</strong> al cine.</span> (If I had time, I would go to the movies.)',
            '<span class="spanish-text">Si <strong>fuera</strong> tú, <strong>estudiaría</strong> más.</span> (If I were you, I would study more.)',
            'Used for things that are unlikely or imaginary in the present.'
          ]
        },
        {
          heading: 'Type 3 — Impossible/Past Conditions:',
          points: [
            'Structure: <strong>Si + pluperfect subjunctive, conditional perfect</strong>',
            '<span class="spanish-text">Si <strong>hubiera estudiado</strong>, <strong>habría aprobado</strong>.</span> (If I had studied, I would have passed.)',
            '<span class="spanish-text">Si <strong>hubiera sabido</strong>, <strong>habría venido</strong>.</span> (If I had known, I would have come.)',
            'Used for past situations that can no longer be changed.'
          ]
        },
        {
          heading: '⚠️ Common Mistake:',
          points: [
            'NEVER use present subjunctive after "si": ❌ "Si tenga" — ✅ "Si tengo" (Type 1) or "Si tuviera" (Type 2)',
            'The present subjunctive is NOT used in "si" clauses (unlike English "if I have").'
          ]
        }
      ]
    },

    'object pronoun combinations': {
      title: 'Direct & Indirect Object Pronoun Combinations',
      explanation: 'When a sentence has both a direct object pronoun (DO) and an indirect object pronoun (IO), they combine in a specific order. The indirect object always comes first.',
      sections: [
        {
          heading: 'Order: Indirect Object + Direct Object + Verb',
          points: [
            '<span class="spanish-text"><strong>Me lo</strong> da.</span> (He gives it to me.) — me=IO, lo=DO',
            '<span class="spanish-text"><strong>Te la</strong> envío.</span> (I send it to you.) — te=IO, la=DO',
            '<span class="spanish-text"><strong>Nos los</strong> traen.</span> (They bring them to us.) — nos=IO, los=DO'
          ]
        },
        {
          heading: 'The "Se" Rule (le/les → se):',
          points: [
            'When both pronouns start with "l" (le/les + lo/la/los/las), <strong>le/les → se</strong>:',
            '❌ <del>Le lo doy.</del> → ✅ <span class="spanish-text"><strong>Se lo</strong> doy.</span> (I give it to him/her.)',
            '❌ <del>Les las envío.</del> → ✅ <span class="spanish-text"><strong>Se las</strong> envío.</span> (I send them to them.)',
            'Since "se" is ambiguous, add <strong>a él / a ella / a usted / a ellos</strong> for clarity:',
            '<span class="spanish-text">Se lo doy <strong>a ella</strong>.</span> (I give it to her.)'
          ]
        },
        {
          heading: 'Placement with Infinitives, Gerunds & Commands:',
          points: [
            '<strong>Before conjugated verb</strong>: <span class="spanish-text"><strong>Se lo</strong> quiero dar.</span>',
            '<strong>Attached to infinitive</strong>: <span class="spanish-text">Quiero dár<strong>selo</strong>.</span> (note accent added)',
            '<strong>Attached to gerund</strong>: <span class="spanish-text">Estoy dándo<strong>selo</strong>.</span>',
            '<strong>Attached to affirmative command</strong>: <span class="spanish-text">¡Dá<strong>selo</strong>!</span> (Give it to him!)',
            '<strong>Before negative command</strong>: <span class="spanish-text">¡No <strong>se lo</strong> des!</span> (Don\'t give it to him!)'
          ]
        }
      ]
    },

    'possessives': {
      title: 'Possessive Adjectives & Pronouns',
      explanation: 'Spanish has two sets of possessives: short forms (adjectives placed before nouns) and long forms (pronouns or adjectives placed after nouns).',
      sections: [
        {
          heading: 'Short Forms (before the noun):',
          points: [
            '<strong>mi(s)</strong> — my: <span class="spanish-text"><strong>Mi</strong> casa es grande.</span> / <span class="spanish-text"><strong>Mis</strong> libros están aquí.</span>',
            '<strong>tu(s)</strong> — your (informal): <span class="spanish-text"><strong>Tu</strong> perro es bonito.</span>',
            '<strong>su(s)</strong> — his/her/your(formal)/their: <span class="spanish-text"><strong>Su</strong> madre es doctora.</span>',
            '<strong>nuestro/a(s)</strong> — our: <span class="spanish-text"><strong>Nuestra</strong> escuela es nueva.</span>',
            '<strong>vuestro/a(s)</strong> — your (plural, Spain): <span class="spanish-text"><strong>Vuestro</strong> coche es rojo.</span>',
            'Only nuestro and vuestro change for gender: nuestro libro / nuestra casa'
          ]
        },
        {
          heading: 'Long Forms (after the noun or standalone):',
          points: [
            '<strong>mío/a(s)</strong> — mine: <span class="spanish-text">El libro es <strong>mío</strong>.</span> (The book is mine.)',
            '<strong>tuyo/a(s)</strong> — yours: <span class="spanish-text">¿Es <strong>tuya</strong> esta bolsa?</span> (Is this bag yours?)',
            '<strong>suyo/a(s)</strong> — his/hers/yours/theirs: <span class="spanish-text">La idea fue <strong>suya</strong>.</span>',
            '<strong>nuestro/a(s)</strong> — ours: <span class="spanish-text">La victoria es <strong>nuestra</strong>.</span>',
            'Long forms agree in gender AND number with the noun they replace.'
          ]
        },
        {
          heading: 'Possessive Pronouns (with article):',
          points: [
            '<span class="spanish-text">Mi casa es grande. <strong>La tuya</strong> es pequeña.</span> (Mine is big. Yours is small.)',
            '<span class="spanish-text">Mis zapatos son negros. <strong>Los suyos</strong> son blancos.</span>',
            '💡 Use article + long form: el mío, la tuya, los nuestros, las suyas'
          ]
        }
      ]
    },

    'demonstratives': {
      title: 'Demonstrative Adjectives & Pronouns',
      explanation: 'Demonstratives point out specific things based on distance from the speaker. Spanish has THREE levels of distance (English only has two: this/that).',
      sections: [
        {
          heading: 'Three Levels of Distance:',
          points: [
            '<strong>este/esta/estos/estas</strong> — this/these (near speaker): <span class="spanish-text"><strong>Este</strong> libro es interesante.</span>',
            '<strong>ese/esa/esos/esas</strong> — that/those (near listener): <span class="spanish-text"><strong>Ese</strong> libro es tuyo.</span>',
            '<strong>aquel/aquella/aquellos/aquellas</strong> — that/those (far from both): <span class="spanish-text"><strong>Aquella</strong> montaña es hermosa.</span>'
          ]
        },
        {
          heading: 'As Pronouns (standalone, no accent needed):',
          points: [
            '<span class="spanish-text">Quiero <strong>este</strong>, no <strong>ese</strong>.</span> (I want this one, not that one.)',
            '<span class="spanish-text"><strong>Aquellos</strong> son más baratos.</span> (Those over there are cheaper.)'
          ]
        },
        {
          heading: 'Neuter Forms (for abstract ideas):',
          points: [
            '<strong>esto</strong> — this (abstract): <span class="spanish-text">¿Qué es <strong>esto</strong>?</span> (What is this?)',
            '<strong>eso</strong> — that (abstract): <span class="spanish-text"><strong>Eso</strong> es verdad.</span> (That is true.)',
            '<strong>aquello</strong> — that (abstract, far): <span class="spanish-text"><strong>Aquello</strong> fue increíble.</span> (That was incredible.)',
            '💡 Neuter forms are NEVER used with nouns — only to refer to ideas, statements, or unidentified things.'
          ]
        }
      ]
    },

    'relative pronouns': {
      title: 'Relative Pronouns (Pronombres Relativos)',
      explanation: 'Relative pronouns connect clauses and refer back to a noun mentioned earlier. They are essential for building complex sentences.',
      sections: [
        {
          heading: 'Common Relative Pronouns:',
          points: [
            '<strong>que</strong> — that/which/who (most common): <span class="spanish-text">El libro <strong>que</strong> leí es bueno.</span> (The book that I read is good.)',
            '<strong>quien(es)</strong> — who/whom (for people, after prepositions): <span class="spanish-text">La chica con <strong>quien</strong> hablé.</span> (The girl with whom I spoke.)',
            '<strong>el/la cual, los/las cuales</strong> — which/who (formal): <span class="spanish-text">La razón por <strong>la cual</strong> vine.</span> (The reason for which I came.)',
            '<strong>lo que</strong> — what/that which: <span class="spanish-text"><strong>Lo que</strong> dices es verdad.</span> (What you say is true.)',
            '<strong>lo cual</strong> — which (referring to a whole clause): <span class="spanish-text">Llegó tarde, <strong>lo cual</strong> me molestó.</span> (He arrived late, which bothered me.)'
          ]
        },
        {
          heading: 'Cuyo/a/os/as (whose):',
          points: [
            '<strong>cuyo</strong> agrees with the POSSESSED noun, not the possessor:',
            '<span class="spanish-text">El hombre <strong>cuya</strong> hija es doctora.</span> (The man whose daughter is a doctor.)',
            '<span class="spanish-text">La ciudad <strong>cuyos</strong> habitantes son amables.</span> (The city whose inhabitants are friendly.)'
          ]
        },
        {
          heading: 'Donde, como, cuando as relatives:',
          points: [
            '<strong>donde</strong> — where: <span class="spanish-text">La casa <strong>donde</strong> vivo.</span> (The house where I live.)',
            '<strong>como</strong> — how/the way: <span class="spanish-text">La forma <strong>como</strong> lo hizo.</span> (The way he did it.)',
            '<strong>cuando</strong> — when: <span class="spanish-text">El día <strong>cuando</strong> nos conocimos.</span> (The day when we met.)'
          ]
        }
      ]
    },

    'passive voice': {
      title: 'Passive Voice & "Se" Constructions',
      explanation: 'Spanish uses the passive voice less frequently than English, preferring "se" constructions instead. Understanding both forms is important.',
      sections: [
        {
          heading: 'True Passive (ser + past participle):',
          points: [
            'Structure: <strong>subject + ser + past participle (+ por + agent)</strong>',
            '<span class="spanish-text">El libro <strong>fue escrito</strong> por Cervantes.</span> (The book was written by Cervantes.)',
            '<span class="spanish-text">La casa <strong>fue construida</strong> en 1990.</span> (The house was built in 1990.)',
            'The past participle agrees in gender and number with the subject.',
            '⚠️ This form is mainly used in written/formal Spanish.'
          ]
        },
        {
          heading: 'Passive "Se" (se pasiva):',
          points: [
            'Structure: <strong>se + verb (3rd person) + subject</strong>',
            '<span class="spanish-text"><strong>Se habla</strong> español aquí.</span> (Spanish is spoken here.)',
            '<span class="spanish-text"><strong>Se venden</strong> casas.</span> (Houses are sold. / Houses for sale.)',
            '<span class="spanish-text"><strong>Se necesitan</strong> profesores.</span> (Teachers are needed.)',
            'The verb agrees with the subject (singular or plural). This is the most common passive form in everyday Spanish.'
          ]
        },
        {
          heading: 'Impersonal "Se" (se impersonal):',
          points: [
            'Used when there is no specific subject (like English "one" or "people"):',
            '<span class="spanish-text"><strong>Se come</strong> bien aquí.</span> (One eats well here. / The food is good here.)',
            '<span class="spanish-text"><strong>Se puede</strong> ver la montaña.</span> (One can see the mountain.)',
            '<span class="spanish-text">¿Cómo <strong>se dice</strong> "hello" en español?</span> (How does one say "hello" in Spanish?)',
            'Always uses 3rd person SINGULAR verb.'
          ]
        }
      ]
    },

    'diminutives and augmentatives': {
      title: 'Diminutives & Augmentatives',
      explanation: 'Spanish uses suffixes to make words smaller (cuter/affectionate) or bigger (larger/pejorative). These are VERY common in everyday speech.',
      sections: [
        {
          heading: 'Common Diminutive Suffixes:',
          points: [
            '<strong>-ito/-ita</strong> (most common): <span class="spanish-text">perro → perr<strong>ito</strong></span> (little dog/puppy), <span class="spanish-text">casa → cas<strong>ita</strong></span> (little house)',
            '<strong>-cito/-cita</strong> (after -e, -n, -r): <span class="spanish-text">café → cafe<strong>cito</strong></span>, <span class="spanish-text">joven → joven<strong>cito</strong></span>',
            '<strong>-illo/-illa</strong>: <span class="spanish-text">guerra → guerr<strong>illa</strong></span>, <span class="spanish-text">palo → pal<strong>illo</strong></span> (toothpick)',
            'Diminutives express: smallness, affection, endearment, or sometimes irony.'
          ]
        },
        {
          heading: 'Common Augmentative Suffixes:',
          points: [
            '<strong>-ón/-ona</strong>: <span class="spanish-text">silla → sill<strong>ón</strong></span> (armchair), <span class="spanish-text">hombre → hombr<strong>ón</strong></span> (big man)',
            '<strong>-azo/-aza</strong>: <span class="spanish-text">perro → perr<strong>azo</strong></span> (big dog), <span class="spanish-text">golpe → golp<strong>azo</strong></span> (heavy blow)',
            '<strong>-ote/-ota</strong>: <span class="spanish-text">grande → grand<strong>ote</strong></span> (really big), <span class="spanish-text">amigo → amig<strong>ote</strong></span> (buddy)',
            'Augmentatives can express: large size, emphasis, admiration, or sometimes a negative connotation.'
          ]
        },
        {
          heading: 'Pejorative Suffixes:',
          points: [
            '<strong>-ucho/-ucha</strong>: <span class="spanish-text">casa → cas<strong>ucha</strong></span> (shabby house)',
            '<strong>-ejo/-eja</strong>: <span class="spanish-text">pueblo → puebl<strong>ejo</strong></span> (small, insignificant town)',
            '💡 Be careful! Some diminutives/augmentatives have become completely new words: <span class="spanish-text">ventana → ventanilla</span> (window/ticket window), <span class="spanish-text">caja → cajón</span> (drawer).'
          ]
        }
      ]
    },

    'accent rules': {
      title: 'Spanish Accent Rules (Reglas de Acentuación)',
      explanation: 'Spanish accents (tildes) are not random — they follow strict rules based on which syllable is stressed and how the word ends.',
      sections: [
        {
          heading: 'Types of Words by Stress:',
          points: [
            '<strong>Aguda</strong> (stress on LAST syllable): ca-fé, ha-blar, co-ra-zón',
            '<strong>Llana/Grave</strong> (stress on SECOND-TO-LAST syllable): li-bro, ár-bol, ca-sa',
            '<strong>Esdrújula</strong> (stress on THIRD-TO-LAST syllable): mú-si-ca, te-lé-fo-no',
            '<strong>Sobresdrújula</strong> (stress on FOURTH-TO-LAST): dí-ga-me-lo, cóm-pra-se-lo'
          ]
        },
        {
          heading: 'When to Write the Accent Mark:',
          points: [
            '<strong>Agudas</strong>: write accent if word ends in <strong>vowel, -n, or -s</strong>: café, canción, jamás — but NOT hablar, reloj',
            '<strong>Llanas/Graves</strong>: write accent if word ends in anything OTHER than vowel, -n, or -s: árbol, lápiz, fácil — but NOT casa, examen',
            '<strong>Esdrújulas & sobresdrújulas</strong>: ALWAYS write accent: música, teléfono, dígamelo',
            '💡 These rules mean you can always know where to stress a Spanish word just by looking at it!'
          ]
        },
        {
          heading: 'Special Accent Cases:',
          points: [
            '<strong>Diacritical accents</strong> (distinguish meaning): <span class="spanish-text">el (the) vs. él (he)</span>, <span class="spanish-text">tu (your) vs. tú (you)</span>, <span class="spanish-text">si (if) vs. sí (yes)</span>, <span class="spanish-text">se (reflexive) vs. sé (I know)</span>',
            '<strong>Question/exclamation words</strong> always have accents: <span class="spanish-text">¿<strong>Qué</strong>? ¿<strong>Dónde</strong>? ¿<strong>Cuándo</strong>? ¡<strong>Cómo</strong>!</span>',
            '<strong>Hiatus breaking</strong>: accent on weak vowel (i, u) next to strong vowel (a, e, o): <span class="spanish-text">dí-a, pa-ís, ba-úl, rí-o</span>'
          ]
        }
      ]
    },

    'conjunctions': {
      title: 'Conjunctions & Connectors (Conjunciones)',
      explanation: 'Conjunctions connect words, phrases, and clauses. Mastering connectors makes your Spanish sound more natural and sophisticated.',
      sections: [
        {
          heading: 'Coordinating Conjunctions:',
          points: [
            '<strong>y (e before i-/hi-)</strong> — and: <span class="spanish-text">Juan <strong>y</strong> María.</span> <span class="spanish-text">Padre <strong>e</strong> hijo.</span>',
            '<strong>o (u before o-/ho-)</strong> — or: <span class="spanish-text">¿Café <strong>o</strong> té?</span> <span class="spanish-text">¿Siete <strong>u</strong> ocho?</span>',
            '<strong>pero</strong> — but: <span class="spanish-text">Quiero ir, <strong>pero</strong> no puedo.</span>',
            '<strong>sino</strong> — but rather (after negative): <span class="spanish-text">No es azul, <strong>sino</strong> verde.</span>',
            '<strong>ni…ni</strong> — neither…nor: <span class="spanish-text"><strong>Ni</strong> tú <strong>ni</strong> yo.</span>'
          ]
        },
        {
          heading: 'Subordinating Conjunctions:',
          points: [
            '<strong>que</strong> — that: <span class="spanish-text">Creo <strong>que</strong> sí.</span> (I think so.)',
            '<strong>porque</strong> — because: <span class="spanish-text">No voy <strong>porque</strong> estoy enfermo.</span>',
            '<strong>aunque</strong> — although/even though: <span class="spanish-text"><strong>Aunque</strong> llueva, salgo.</span>',
            '<strong>si</strong> — if: <span class="spanish-text"><strong>Si</strong> vienes, cenamos juntos.</span>',
            '<strong>cuando</strong> — when: <span class="spanish-text"><strong>Cuando</strong> llegues, llámame.</span>',
            '<strong>mientras</strong> — while: <span class="spanish-text"><strong>Mientras</strong> estudio, escucho música.</span>',
            '<strong>como</strong> — as/since: <span class="spanish-text"><strong>Como</strong> no vienes, me voy.</span> (Since you\'re not coming, I\'m leaving.)'
          ]
        },
        {
          heading: 'Discourse Connectors (for essays & conversation):',
          points: [
            '<strong>sin embargo</strong> — however: <span class="spanish-text"><strong>Sin embargo</strong>, no estoy de acuerdo.</span>',
            '<strong>además</strong> — furthermore/besides: <span class="spanish-text"><strong>Además</strong>, es muy caro.</span>',
            '<strong>por lo tanto / por eso</strong> — therefore: <span class="spanish-text"><strong>Por eso</strong> estoy aquí.</span>',
            '<strong>en primer lugar / en segundo lugar</strong> — first / second: for organizing arguments',
            '<strong>en conclusión / en resumen</strong> — in conclusion / in summary',
            '<strong>por un lado… por otro lado</strong> — on one hand… on the other hand',
            '<strong>es decir</strong> — that is to say: <span class="spanish-text"><strong>Es decir</strong>, no funciona.</span>'
          ]
        }
      ]
    },

    'adverbs': {
      title: 'Adverbs (Adverbios)',
      explanation: 'Adverbs modify verbs, adjectives, or other adverbs. Many are formed by adding <strong>-mente</strong> to the feminine form of an adjective.',
      sections: [
        {
          heading: 'Forming Adverbs with -mente:',
          points: [
            'Adjective (feminine form) + <strong>-mente</strong>:',
            'rápido → rápida → rápida<strong>mente</strong> (quickly)',
            'lento → lenta → lenta<strong>mente</strong> (slowly)',
            'fácil → fácil<strong>mente</strong> (easily) — no gender change for -e/-l adjectives',
            'When two -mente adverbs are used together, only the last gets -mente: <span class="spanish-text">clara <strong>y</strong> directa<strong>mente</strong></span>'
          ]
        },
        {
          heading: 'Common Adverbs of Time:',
          points: [
            '<strong>ahora</strong> — now, <strong>hoy</strong> — today, <strong>ayer</strong> — yesterday, <strong>mañana</strong> — tomorrow',
            '<strong>siempre</strong> — always, <strong>nunca/jamás</strong> — never, <strong>a veces</strong> — sometimes',
            '<strong>todavía/aún</strong> — still/yet, <strong>ya</strong> — already, <strong>pronto</strong> — soon',
            '<strong>antes</strong> — before, <strong>después</strong> — after, <strong>luego</strong> — then/later'
          ]
        },
        {
          heading: 'Common Adverbs of Place:',
          points: [
            '<strong>aquí/acá</strong> — here, <strong>allí/allá</strong> — there, <strong>ahí</strong> — there (near listener)',
            '<strong>arriba</strong> — up/above, <strong>abajo</strong> — down/below',
            '<strong>dentro</strong> — inside, <strong>fuera</strong> — outside',
            '<strong>cerca</strong> — near, <strong>lejos</strong> — far',
            '<strong>delante</strong> — in front, <strong>detrás</strong> — behind'
          ]
        },
        {
          heading: 'Common Adverbs of Manner & Quantity:',
          points: [
            '<strong>bien</strong> — well, <strong>mal</strong> — badly, <strong>así</strong> — like this/so',
            '<strong>despacio</strong> — slowly, <strong>deprisa</strong> — quickly',
            '<strong>muy</strong> — very, <strong>mucho</strong> — a lot, <strong>poco</strong> — a little, <strong>bastante</strong> — enough/quite',
            '<strong>demasiado</strong> — too much, <strong>casi</strong> — almost, <strong>apenas</strong> — barely'
          ]
        }
      ]
    },

    'gerund and progressive': {
      title: 'Gerund Usage & Progressive Tenses',
      explanation: 'The Spanish gerund (gerundio) is formed by adding <strong>-ando</strong> (ar verbs) or <strong>-iendo</strong> (er/ir verbs) to the stem. It\'s used to form progressive tenses and as an adverb.',
      sections: [
        {
          heading: 'Forming the Gerund:',
          points: [
            '<strong>-ar verbs</strong>: stem + <strong>-ando</strong>: hablar → habl<strong>ando</strong>, caminar → camin<strong>ando</strong>',
            '<strong>-er verbs</strong>: stem + <strong>-iendo</strong>: comer → com<strong>iendo</strong>, beber → beb<strong>iendo</strong>',
            '<strong>-ir verbs</strong>: stem + <strong>-iendo</strong>: vivir → viv<strong>iendo</strong>, escribir → escrib<strong>iendo</strong>',
            '<strong>Stem-changing -ir verbs</strong>: e→i or o→u: dormir → durm<strong>iendo</strong>, pedir → pid<strong>iendo</strong>, sentir → sint<strong>iendo</strong>',
            '<strong>Spelling changes</strong>: -iendo → -yendo after vowels: leer → le<strong>yendo</strong>, oír → o<strong>yendo</strong>, traer → tra<strong>yendo</strong>'
          ]
        },
        {
          heading: 'Progressive Tenses (estar + gerund):',
          points: [
            '<strong>Present progressive</strong>: <span class="spanish-text"><strong>Estoy hablando</strong>.</span> (I am speaking.) — action happening right now',
            '<strong>Past progressive</strong>: <span class="spanish-text"><strong>Estaba comiendo</strong> cuando llamaste.</span> (I was eating when you called.)',
            '<strong>Future progressive</strong>: <span class="spanish-text"><strong>Estaré trabajando</strong> a esa hora.</span> (I will be working at that time.)',
            'Other verbs can replace estar: <strong>seguir</strong> (keep doing), <strong>ir</strong> (gradually), <strong>llevar</strong> (duration): <span class="spanish-text"><strong>Sigo estudiando</strong>.</span> (I keep studying.)'
          ]
        },
        {
          heading: '⚠️ Differences from English -ing:',
          points: [
            'Do NOT use gerund as a noun — use infinitive instead: ❌ "Nadando es divertido" → ✅ <span class="spanish-text"><strong>Nadar</strong> es divertido.</span> (Swimming is fun.)',
            'Do NOT use gerund as an adjective: ❌ "agua hirviendo" as adjective → ✅ <span class="spanish-text">agua <strong>hirviente</strong></span> (boiling water)',
            'Pronoun placement: pronouns attach to end of gerund: <span class="spanish-text">Estoy <strong>haciéndolo</strong>.</span> OR before estar: <span class="spanish-text"><strong>Lo</strong> estoy haciendo.</span>'
          ]
        }
      ]
    },

    'perfect tenses': {
      title: 'Perfect Tenses (Tiempos Compuestos)',
      explanation: 'Perfect tenses use <strong>haber</strong> + past participle. The past participle is formed with <strong>-ado</strong> (ar verbs) or <strong>-ido</strong> (er/ir verbs).',
      sections: [
        {
          heading: 'Past Participle Formation:',
          points: [
            '<strong>-ar → -ado</strong>: hablar → habl<strong>ado</strong>, caminar → camin<strong>ado</strong>',
            '<strong>-er/-ir → -ido</strong>: comer → com<strong>ido</strong>, vivir → viv<strong>ido</strong>',
            '<strong>Irregular participles</strong>: abrir → <strong>abierto</strong>, decir → <strong>dicho</strong>, escribir → <strong>escrito</strong>, hacer → <strong>hecho</strong>, morir → <strong>muerto</strong>, poner → <strong>puesto</strong>, resolver → <strong>resuelto</strong>, romper → <strong>roto</strong>, ver → <strong>visto</strong>, volver → <strong>vuelto</strong>',
            '⚠️ In perfect tenses, the participle NEVER changes (always -o): <span class="spanish-text">Ella ha comid<strong>o</strong>.</span> (NOT comida)'
          ]
        },
        {
          heading: 'Present Perfect (Pretérito Perfecto):',
          points: [
            '<strong>he, has, ha, hemos, habéis, han</strong> + past participle',
            '<span class="spanish-text"><strong>He viajado</strong> a España.</span> (I have traveled to Spain.)',
            '<span class="spanish-text">¿<strong>Has comido</strong>?</span> (Have you eaten?)',
            'Used for past actions connected to the present, recent past, or experiences.'
          ]
        },
        {
          heading: 'Pluperfect (Pretérito Pluscuamperfecto):',
          points: [
            '<strong>había, habías, había, habíamos, habíais, habían</strong> + past participle',
            '<span class="spanish-text">Ya <strong>había comido</strong> cuando llegaste.</span> (I had already eaten when you arrived.)',
            'Used for past actions BEFORE another past action.'
          ]
        },
        {
          heading: 'Future Perfect & Conditional Perfect:',
          points: [
            '<strong>Future perfect</strong> (habré + p.p.): <span class="spanish-text">Para las cinco, <strong>habré terminado</strong>.</span> (By five, I will have finished.)',
            '<strong>Conditional perfect</strong> (habría + p.p.): <span class="spanish-text"><strong>Habría ido</strong> si hubiera podido.</span> (I would have gone if I could have.)',
            'NOTHING goes between haber and the past participle: ❌ "He no comido" → ✅ <span class="spanish-text"><strong>No</strong> he comido.</span>'
          ]
        }
      ]
    },

    'imperative mood': {
      title: 'Imperative Mood — Commands',
      explanation: 'The imperative is used to give orders, instructions, or advice. Spanish has different forms for tú, usted, nosotros, vosotros, and ustedes.',
      sections: [
        {
          heading: 'Affirmative Tú Commands:',
          points: [
            '<strong>Regular</strong>: same as 3rd person singular present: <span class="spanish-text">¡<strong>Habla</strong> más despacio!</span> (Speak more slowly!)',
            '<strong>Irregular tú commands</strong>: decir → <strong>di</strong>, hacer → <strong>haz</strong>, ir → <strong>ve</strong>, poner → <strong>pon</strong>, salir → <strong>sal</strong>, ser → <strong>sé</strong>, tener → <strong>ten</strong>, venir → <strong>ven</strong>',
            '<span class="spanish-text">¡<strong>Ven</strong> aquí!</span> (Come here!), <span class="spanish-text">¡<strong>Di</strong> la verdad!</span> (Tell the truth!)'
          ]
        },
        {
          heading: 'Negative Tú Commands:',
          points: [
            'Use <strong>no + present subjunctive</strong>:',
            '<span class="spanish-text">¡<strong>No hables</strong> tan rápido!</span> (Don\'t speak so fast!)',
            '<span class="spanish-text">¡<strong>No vayas</strong>!</span> (Don\'t go!), <span class="spanish-text">¡<strong>No digas</strong> eso!</span> (Don\'t say that!)'
          ]
        },
        {
          heading: 'Usted/Ustedes Commands:',
          points: [
            'Use <strong>present subjunctive</strong> for both affirmative and negative:',
            '<span class="spanish-text">¡<strong>Hable</strong> más despacio, por favor!</span> (Speak more slowly, please!)',
            '<span class="spanish-text">¡<strong>No coman</strong> aquí!</span> (Don\'t eat here!)',
            '<span class="spanish-text"><strong>Siéntense</strong>, por favor.</span> (Sit down, please.)'
          ]
        },
        {
          heading: 'Pronoun Placement with Commands:',
          points: [
            '<strong>Affirmative</strong>: pronouns ATTACH to end: <span class="spanish-text">¡<strong>Dímelo</strong>!</span> (Tell it to me!), <span class="spanish-text">¡<strong>Siéntate</strong>!</span> (Sit down!)',
            '<strong>Negative</strong>: pronouns go BEFORE verb: <span class="spanish-text">¡<strong>No me lo</strong> digas!</span> (Don\'t tell me!)',
            '💡 Add accent mark when attaching pronouns changes the stress: ¡Dígame! ¡Escríbelo!'
          ]
        }
      ]
    },

    'gustar type verbs': {
      title: 'Gustar-type Verbs (Verbs Like "To Like")',
      explanation: 'In Spanish, "gustar" literally means "to be pleasing to." The subject in English becomes the indirect object in Spanish, and the thing liked is the subject.',
      sections: [
        {
          heading: 'How Gustar Works:',
          points: [
            'English: I like pizza. → Spanish: <span class="spanish-text">A mí <strong>me gusta</strong> la pizza.</span> (Pizza is pleasing to me.)',
            'English: We like dogs. → Spanish: <span class="spanish-text">A nosotros <strong>nos gustan</strong> los perros.</span>',
            'The verb agrees with WHAT IS LIKED, not with the person: <strong>gusta</strong> (singular thing) vs. <strong>gustan</strong> (plural things)',
            'With infinitives, always use <strong>gusta</strong> (singular): <span class="spanish-text">Me <strong>gusta</strong> nadar y correr.</span>'
          ]
        },
        {
          heading: 'Indirect Object Pronouns Used:',
          points: [
            '<strong>me</strong> gusta — I like (to me is pleasing)',
            '<strong>te</strong> gusta — you like (informal)',
            '<strong>le</strong> gusta — he/she/you(formal) like(s)',
            '<strong>nos</strong> gusta — we like',
            '<strong>os</strong> gusta — you all like (Spain)',
            '<strong>les</strong> gusta — they/you all like',
            'Add <strong>a + person</strong> for clarity: <span class="spanish-text"><strong>A María le gusta</strong> bailar.</span>'
          ]
        },
        {
          heading: 'Other Verbs That Work Like Gustar:',
          points: [
            '<strong>encantar</strong> — to love/enchant: <span class="spanish-text">Me <strong>encanta</strong> la música.</span>',
            '<strong>molestar</strong> — to bother: <span class="spanish-text">Me <strong>molesta</strong> el ruido.</span>',
            '<strong>importar</strong> — to matter: <span class="spanish-text">No me <strong>importa</strong>.</span>',
            '<strong>fascinar</strong> — to fascinate: <span class="spanish-text">Me <strong>fascinan</strong> las estrellas.</span>',
            '<strong>interesar</strong> — to interest: <span class="spanish-text">Me <strong>interesa</strong> la historia.</span>',
            '<strong>faltar</strong> — to be lacking: <span class="spanish-text">Me <strong>faltan</strong> dos libros.</span>',
            '<strong>doler</strong> — to hurt: <span class="spanish-text">Me <strong>duele</strong> la cabeza.</span> (My head hurts.)',
            '<strong>quedar</strong> — to remain: <span class="spanish-text">Me <strong>quedan</strong> tres días.</span> (I have three days left.)'
          ]
        }
      ]
    },

    'tener expressions': {
      title: 'Idiomatic Expressions with Tener',
      explanation: 'While English uses "to be" for many states, Spanish uses <strong>tener</strong> (to have). These are among the most common expressions in everyday Spanish.',
      sections: [
        {
          heading: 'Physical States (English "to be" → Spanish "tener"):',
          points: [
            '<strong>tener hambre</strong> — to be hungry: <span class="spanish-text"><strong>Tengo hambre</strong>.</span> (I\'m hungry.) — literally "I have hunger"',
            '<strong>tener sed</strong> — to be thirsty: <span class="spanish-text"><strong>Tengo sed</strong>.</span>',
            '<strong>tener frío</strong> — to be cold: <span class="spanish-text"><strong>Tengo frío</strong>.</span>',
            '<strong>tener calor</strong> — to be hot: <span class="spanish-text"><strong>Tengo calor</strong>.</span>',
            '<strong>tener sueño</strong> — to be sleepy: <span class="spanish-text"><strong>Tengo sueño</strong>.</span>',
            '<strong>tener dolor de…</strong> — to have a …ache: <span class="spanish-text">Tengo <strong>dolor de cabeza</strong>.</span> (I have a headache.)'
          ]
        },
        {
          heading: 'Emotional/Mental States:',
          points: [
            '<strong>tener miedo (de)</strong> — to be afraid (of): <span class="spanish-text"><strong>Tengo miedo</strong> de las arañas.</span>',
            '<strong>tener razón</strong> — to be right: <span class="spanish-text"><strong>Tienes razón</strong>.</span>',
            '<strong>tener vergüenza</strong> — to be ashamed/embarrassed: <span class="spanish-text"><strong>Tiene vergüenza</strong>.</span>',
            '<strong>tener cuidado</strong> — to be careful: <span class="spanish-text">¡<strong>Ten cuidado</strong>!</span>',
            '<strong>tener celos</strong> — to be jealous: <span class="spanish-text"><strong>Tiene celos</strong> de su hermano.</span>',
            '<strong>tener prisa</strong> — to be in a hurry: <span class="spanish-text"><strong>Tengo prisa</strong>.</span>'
          ]
        },
        {
          heading: 'Other Important Tener Expressions:',
          points: [
            '<strong>tener … años</strong> — to be … years old: <span class="spanish-text"><strong>Tengo veinte años</strong>.</span> (I am 20 years old.)',
            '<strong>tener que + infinitive</strong> — to have to: <span class="spanish-text"><strong>Tengo que</strong> estudiar.</span> (I have to study.)',
            '<strong>tener ganas de</strong> — to feel like: <span class="spanish-text"><strong>Tengo ganas de</strong> bailar.</span> (I feel like dancing.)',
            '<strong>tener lugar</strong> — to take place: <span class="spanish-text">La fiesta <strong>tiene lugar</strong> el sábado.</span>',
            '<strong>tener éxito</strong> — to be successful: <span class="spanish-text">La empresa <strong>tiene éxito</strong>.</span>',
            '<strong>tener suerte</strong> — to be lucky: <span class="spanish-text">¡<strong>Qué suerte tienes</strong>!</span> (How lucky you are!)',
            '💡 Unlike English, these expressions use MUCHO/A (not MUY): <span class="spanish-text">Tengo <strong>mucha</strong> hambre.</span> (NOT muy hambre)'
          ]
        }
      ]
    },

    'false friends': {
      title: 'False Friends (Falsos Amigos)',
      explanation: 'False friends are words that look or sound similar in Spanish and English but have DIFFERENT meanings. These are some of the most common traps for English speakers learning Spanish.',
      sections: [
        {
          heading: 'The Most Dangerous False Friends:',
          points: [
            '<strong>embarazada</strong> ≠ embarrassed → means <strong>pregnant</strong>. Embarrassed = <span class="spanish-text">avergonzado/a</span>',
            '<strong>éxito</strong> ≠ exit → means <strong>success</strong>. Exit = <span class="spanish-text">salida</span>',
            '<strong>actualmente</strong> ≠ actually → means <strong>currently</strong>. Actually = <span class="spanish-text">en realidad</span>',
            '<strong>realizar</strong> ≠ to realize → means <strong>to carry out/accomplish</strong>. Realize = <span class="spanish-text">darse cuenta de</span>',
            '<strong>sensible</strong> ≠ sensible → means <strong>sensitive</strong>. Sensible = <span class="spanish-text">sensato/a</span>',
            '<strong>constipado</strong> ≠ constipated → means having a <strong>cold</strong>. Constipated = <span class="spanish-text">estreñido/a</span>'
          ]
        },
        {
          heading: 'More Common False Friends:',
          points: [
            '<strong>asistir</strong> ≠ to assist → means <strong>to attend</strong>. To assist = <span class="spanish-text">ayudar</span>',
            '<strong>carpeta</strong> ≠ carpet → means <strong>folder</strong>. Carpet = <span class="spanish-text">alfombra</span>',
            '<strong>colegio</strong> ≠ college → means <strong>school</strong> (K-12). College = <span class="spanish-text">universidad</span>',
            '<strong>contestar</strong> ≠ to contest → means <strong>to answer</strong>. To contest = <span class="spanish-text">disputar</span>',
            '<strong>desgracia</strong> ≠ disgrace → means <strong>misfortune</strong>. Disgrace = <span class="spanish-text">deshonra</span>',
            '<strong>fábrica</strong> ≠ fabric → means <strong>factory</strong>. Fabric = <span class="spanish-text">tela</span>',
            '<strong>largo</strong> ≠ large → means <strong>long</strong>. Large = <span class="spanish-text">grande</span>',
            '<strong>librería</strong> ≠ library → means <strong>bookstore</strong>. Library = <span class="spanish-text">biblioteca</span>'
          ]
        },
        {
          heading: 'More Tricky Pairs:',
          points: [
            '<strong>molestar</strong> ≠ to molest → means <strong>to bother/annoy</strong>. To molest = <span class="spanish-text">abusar</span>',
            '<strong>pariente</strong> ≠ parent → means <strong>relative</strong>. Parent = <span class="spanish-text">padre/madre</span>',
            '<strong>recordar</strong> ≠ to record → means <strong>to remember</strong>. To record = <span class="spanish-text">grabar</span>',
            '<strong>ropa</strong> ≠ rope → means <strong>clothing</strong>. Rope = <span class="spanish-text">cuerda</span>',
            '<strong>sopa</strong> ≠ soap → means <strong>soup</strong>. Soap = <span class="spanish-text">jabón</span>',
            '<strong>suceso</strong> ≠ success → means <strong>event</strong>. Success = <span class="spanish-text">éxito</span>',
            '<strong>vaso</strong> ≠ vase → means <strong>drinking glass</strong>. Vase = <span class="spanish-text">jarrón</span>',
            '💡 When in doubt, look it up! False friends are one of the biggest sources of miscommunication.'
          ]
        }
      ]
    }
  };

  /**
   * Get a grammar rule by topic.
   * Tries exact match first, then fuzzy match.
   */
  function getRule(topic) {
    var t = topic.toLowerCase().trim();
    if (rules[t]) return rules[t];
    // Fuzzy match
    var keys = Object.keys(rules);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf(t) !== -1 || t.indexOf(keys[i]) !== -1) {
        return rules[keys[i]];
      }
    }
    // Try matching keywords
    for (var i = 0; i < keys.length; i++) {
      var keywords = keys[i].split(/\s+/);
      for (var j = 0; j < keywords.length; j++) {
        if (t.indexOf(keywords[j]) !== -1) {
          return rules[keys[i]];
        }
      }
    }
    return null;
  }

  /**
   * Get all available grammar topic names.
   */
  function getTopics() {
    return Object.keys(rules);
  }

  /**
   * Format a grammar rule as HTML.
   */
  function formatRule(rule) {
    if (!rule) return '<p>I don\'t have information on that grammar topic yet. Try asking about: ' + getTopics().join(', ') + '</p>';
    var html = '<div class="grammar-explanation">';
    html += '<div class="grammar-title">' + rule.title + '</div>';
    html += '<p>' + rule.explanation + '</p>';
    for (var s = 0; s < rule.sections.length; s++) {
      var section = rule.sections[s];
      html += '<div class="grammar-section">';
      html += '<div class="grammar-heading">' + section.heading + '</div>';
      if (section.points.length > 0) {
        html += '<ul>';
        for (var p = 0; p < section.points.length; p++) {
          html += '<li>' + section.points[p] + '</li>';
        }
        html += '</ul>';
      }
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  return {
    rules: rules,
    getRule: getRule,
    getTopics: getTopics,
    formatRule: formatRule
  };
})();
