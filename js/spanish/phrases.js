// ============================================================
// Situational Phrase Bank — common Spanish phrases organized
// by real-world situations, with translations & pronunciation
// ============================================================
var Phrases = (function () {
  'use strict';

  var data = {
    greetings: {
      title: 'Greetings & Introductions',
      phrases: [
        { es: '¡Hola! ¿Cómo estás?', en: 'Hi! How are you?', pronunciation: 'OH-lah KOH-moh ehs-TAHS' },
        { es: 'Estoy bien, gracias. ¿Y tú?', en: 'I\'m fine, thanks. And you?', pronunciation: 'ehs-TOY bee-EHN GRAH-see-ahs ee too' },
        { es: 'Me llamo...', en: 'My name is...', pronunciation: 'meh YAH-moh' },
        { es: '¿Cómo te llamas?', en: 'What\'s your name?', pronunciation: 'KOH-moh teh YAH-mahs' },
        { es: 'Mucho gusto.', en: 'Nice to meet you.', pronunciation: 'MOO-choh GOO-stoh' },
        { es: 'Encantado/a de conocerte.', en: 'Pleased to meet you.', pronunciation: 'ehn-kahn-TAH-doh deh koh-noh-SEHR-teh' },
        { es: '¿De dónde eres?', en: 'Where are you from?', pronunciation: 'deh DOHN-deh EH-rehs' },
        { es: 'Soy de...', en: 'I\'m from...', pronunciation: 'soy deh' },
        { es: '¿Qué tal?', en: 'How\'s it going?', pronunciation: 'keh tahl' },
        { es: '¿Cómo le va?', en: 'How are you doing? (formal)', pronunciation: 'KOH-moh leh vah' }
      ]
    },

    restaurant: {
      title: 'At a Restaurant',
      phrases: [
        { es: 'Una mesa para dos, por favor.', en: 'A table for two, please.', pronunciation: 'OO-nah MEH-sah PAH-rah dohs, por fah-VOR' },
        { es: '¿Puedo ver el menú?', en: 'Can I see the menu?', pronunciation: 'PWEH-doh vehr ehl meh-NOO' },
        { es: '¿Qué me recomienda?', en: 'What do you recommend?', pronunciation: 'keh meh reh-koh-mee-EHN-dah' },
        { es: 'Quisiera...', en: 'I would like...', pronunciation: 'kee-see-EH-rah' },
        { es: 'La cuenta, por favor.', en: 'The check, please.', pronunciation: 'lah KWEHN-tah por fah-VOR' },
        { es: '¿Está incluida la propina?', en: 'Is the tip included?', pronunciation: 'ehs-TAH een-kloo-EE-dah lah proh-PEE-nah' },
        { es: 'Soy alérgico/a a...', en: 'I\'m allergic to...', pronunciation: 'soy ah-LEHR-hee-koh ah' },
        { es: '¿Tiene platos vegetarianos?', en: 'Do you have vegetarian dishes?', pronunciation: 'tee-EH-neh PLAH-tohs veh-heh-tah-ree-AH-nohs' },
        { es: 'Está delicioso.', en: 'It\'s delicious.', pronunciation: 'ehs-TAH deh-lee-see-OH-soh' },
        { es: 'Un vaso de agua, por favor.', en: 'A glass of water, please.', pronunciation: 'oon VAH-soh deh AH-gwah por fah-VOR' }
      ]
    },

    shopping: {
      title: 'Shopping',
      phrases: [
        { es: '¿Cuánto cuesta?', en: 'How much does it cost?', pronunciation: 'KWAHN-toh KWEHS-tah' },
        { es: '¿Tiene esto en otra talla?', en: 'Do you have this in another size?', pronunciation: 'tee-EH-neh EHS-toh ehn OH-trah TAH-yah' },
        { es: '¿Puedo probármelo?', en: 'Can I try it on?', pronunciation: 'PWEH-doh proh-BAR-meh-loh' },
        { es: '¿Aceptan tarjetas de crédito?', en: 'Do you accept credit cards?', pronunciation: 'ah-SEHP-tahn tar-HEH-tahs deh KREH-dee-toh' },
        { es: 'Solo estoy mirando.', en: 'I\'m just looking.', pronunciation: 'SOH-loh ehs-TOY mee-RAHN-doh' },
        { es: 'Me lo llevo.', en: 'I\'ll take it.', pronunciation: 'meh loh YEH-voh' },
        { es: '¿Tiene algo más barato?', en: 'Do you have something cheaper?', pronunciation: 'tee-EH-neh AHL-goh mahs bah-RAH-toh' },
        { es: '¿Dónde están los probadores?', en: 'Where are the fitting rooms?', pronunciation: 'DOHN-deh ehs-TAHN lohs proh-bah-DOH-rehs' }
      ]
    },

    directions: {
      title: 'Asking for Directions',
      phrases: [
        { es: '¿Dónde está...?', en: 'Where is...?', pronunciation: 'DOHN-deh ehs-TAH' },
        { es: '¿Cómo llego a...?', en: 'How do I get to...?', pronunciation: 'KOH-moh YEH-goh ah' },
        { es: 'Gire a la izquierda.', en: 'Turn left.', pronunciation: 'HEE-reh ah lah ees-kee-EHR-dah' },
        { es: 'Gire a la derecha.', en: 'Turn right.', pronunciation: 'HEE-reh ah lah deh-REH-chah' },
        { es: 'Siga derecho.', en: 'Go straight.', pronunciation: 'SEE-gah deh-REH-choh' },
        { es: 'Está a dos cuadras.', en: 'It\'s two blocks away.', pronunciation: 'ehs-TAH ah dohs KWAH-drahs' },
        { es: 'Estoy perdido/a.', en: 'I\'m lost.', pronunciation: 'ehs-TOY pehr-DEE-doh' },
        { es: '¿Está lejos?', en: 'Is it far?', pronunciation: 'ehs-TAH LEH-hohs' },
        { es: '¿Puede mostrarme en el mapa?', en: 'Can you show me on the map?', pronunciation: 'PWEH-deh mohs-TRAR-meh ehn ehl MAH-pah' }
      ]
    },

    hotel: {
      title: 'At the Hotel',
      phrases: [
        { es: 'Tengo una reservación.', en: 'I have a reservation.', pronunciation: 'TEHN-goh OO-nah reh-sehr-vah-see-OHN' },
        { es: '¿Tiene habitaciones disponibles?', en: 'Do you have rooms available?', pronunciation: 'tee-EH-neh ah-bee-tah-see-OH-nehs dees-poh-NEE-blehs' },
        { es: '¿Cuánto cuesta por noche?', en: 'How much per night?', pronunciation: 'KWAHN-toh KWEHS-tah por NOH-cheh' },
        { es: '¿A qué hora es el check-out?', en: 'What time is checkout?', pronunciation: 'ah keh OH-rah ehs ehl check-out' },
        { es: '¿Tiene wifi?', en: 'Do you have wifi?', pronunciation: 'tee-EH-neh WEE-fee' },
        { es: 'Necesito una toalla más.', en: 'I need one more towel.', pronunciation: 'neh-seh-SEE-toh OO-nah toh-AH-yah mahs' },
        { es: '¿Dónde está el ascensor?', en: 'Where is the elevator?', pronunciation: 'DOHN-deh ehs-TAH ehl ah-sehn-SOR' },
        { es: 'Quisiera una habitación con vista.', en: 'I would like a room with a view.', pronunciation: 'kee-see-EH-rah OO-nah ah-bee-tah-see-OHN kohn VEES-tah' }
      ]
    },

    emergency: {
      title: 'Emergency Phrases',
      phrases: [
        { es: '¡Ayuda!', en: 'Help!', pronunciation: 'ah-YOO-dah' },
        { es: '¡Llame a la policía!', en: 'Call the police!', pronunciation: 'YAH-meh ah lah poh-lee-SEE-ah' },
        { es: 'Necesito un doctor.', en: 'I need a doctor.', pronunciation: 'neh-seh-SEE-toh oon dohk-TOR' },
        { es: '¿Dónde está el hospital?', en: 'Where is the hospital?', pronunciation: 'DOHN-deh ehs-TAH ehl ohs-pee-TAL' },
        { es: 'Me siento mal.', en: 'I feel sick.', pronunciation: 'meh see-EHN-toh mahl' },
        { es: 'Me duele aquí.', en: 'It hurts here.', pronunciation: 'meh DWEH-leh ah-KEE' },
        { es: '¡Es una emergencia!', en: 'It\'s an emergency!', pronunciation: 'ehs OO-nah eh-mehr-HEHN-see-ah' },
        { es: '¡Fuego!', en: 'Fire!', pronunciation: 'FWEH-goh' },
        { es: 'Necesito ayuda.', en: 'I need help.', pronunciation: 'neh-seh-SEE-toh ah-YOO-dah' }
      ]
    },

    smalltalk: {
      title: 'Small Talk & Opinions',
      phrases: [
        { es: '¿Qué te gusta hacer?', en: 'What do you like to do?', pronunciation: 'keh teh GOO-stah ah-SEHR' },
        { es: 'Me gusta mucho...', en: 'I really like...', pronunciation: 'meh GOO-stah MOO-choh' },
        { es: 'No me gusta...', en: 'I don\'t like...', pronunciation: 'noh meh GOO-stah' },
        { es: 'Creo que...', en: 'I think that...', pronunciation: 'KREH-oh keh' },
        { es: 'En mi opinión...', en: 'In my opinion...', pronunciation: 'ehn mee oh-pee-nee-OHN' },
        { es: '¡Qué interesante!', en: 'How interesting!', pronunciation: 'keh een-teh-reh-SAHN-teh' },
        { es: 'Estoy de acuerdo.', en: 'I agree.', pronunciation: 'ehs-TOY deh ah-KWEHR-doh' },
        { es: 'No estoy de acuerdo.', en: 'I disagree.', pronunciation: 'noh ehs-TOY deh ah-KWEHR-doh' },
        { es: '¿A qué te dedicas?', en: 'What do you do for a living?', pronunciation: 'ah keh teh deh-DEE-kahs' },
        { es: '¿Qué tiempo hace?', en: 'How\'s the weather?', pronunciation: 'keh tee-EHM-poh AH-seh' }
      ]
    },

    travel: {
      title: 'Travel & Transportation',
      phrases: [
        { es: '¿A qué hora sale el vuelo?', en: 'What time does the flight leave?', pronunciation: 'ah keh OH-rah SAH-leh ehl VWEH-loh' },
        { es: '¿Dónde está la parada de autobús?', en: 'Where is the bus stop?', pronunciation: 'DOHN-deh ehs-TAH lah pah-RAH-dah deh ow-toh-BOOS' },
        { es: 'Un boleto de ida y vuelta, por favor.', en: 'A round-trip ticket, please.', pronunciation: 'oon boh-LEH-toh deh EE-dah ee VWEHL-tah por fah-VOR' },
        { es: '¿Cuánto tarda en llegar?', en: 'How long does it take to get there?', pronunciation: 'KWAHN-toh TAR-dah ehn yeh-GAR' },
        { es: '¿Tiene un mapa de la ciudad?', en: 'Do you have a city map?', pronunciation: 'tee-EH-neh oon MAH-pah deh lah see-oo-DAHD' },
        { es: '¿A qué hora cierra?', en: 'What time does it close?', pronunciation: 'ah keh OH-rah see-EH-rrah' },
        { es: 'Quisiera alquilar un coche.', en: 'I would like to rent a car.', pronunciation: 'kee-see-EH-rah ahl-kee-LAR oon KOH-cheh' }
      ]
    },

    phone: {
      title: 'Phone Conversations',
      phrases: [
        { es: '¿Aló? / ¿Bueno? / ¿Diga?', en: 'Hello? (answering phone)', pronunciation: 'ah-LOH / BWEH-noh / DEE-gah' },
        { es: '¿Puedo hablar con...?', en: 'Can I speak with...?', pronunciation: 'PWEH-doh ah-BLAR kohn' },
        { es: 'Un momento, por favor.', en: 'One moment, please.', pronunciation: 'oon moh-MEHN-toh por fah-VOR' },
        { es: 'No está disponible.', en: 'He/She is not available.', pronunciation: 'noh ehs-TAH dees-poh-NEE-bleh' },
        { es: '¿Puede dejar un mensaje?', en: 'Can you leave a message?', pronunciation: 'PWEH-deh deh-HAR oon mehn-SAH-heh' },
        { es: 'Le devuelvo la llamada.', en: 'I\'ll call you back.', pronunciation: 'leh deh-VWEHL-voh lah yah-MAH-dah' }
      ]
    },

    weather: {
      title: 'Talking About Weather',
      phrases: [
        { es: 'Hace calor.', en: 'It\'s hot.', pronunciation: 'AH-seh kah-LOR' },
        { es: 'Hace frío.', en: 'It\'s cold.', pronunciation: 'AH-seh FREE-oh' },
        { es: 'Hace buen tiempo.', en: 'The weather is nice.', pronunciation: 'AH-seh bwehn tee-EHM-poh' },
        { es: 'Hace mal tiempo.', en: 'The weather is bad.', pronunciation: 'AH-seh mahl tee-EHM-poh' },
        { es: 'Está lloviendo.', en: 'It\'s raining.', pronunciation: 'ehs-TAH yoh-vee-EHN-doh' },
        { es: 'Está nevando.', en: 'It\'s snowing.', pronunciation: 'ehs-TAH neh-VAHN-doh' },
        { es: 'Hay mucho viento.', en: 'It\'s very windy.', pronunciation: 'eye MOO-choh vee-EHN-toh' },
        { es: 'Hace sol.', en: 'It\'s sunny.', pronunciation: 'AH-seh sohl' }
      ]
    }
  };

  /**
   * Get phrases for a situation.
   */
  function getSituation(situation) {
    var s = situation.toLowerCase().trim();
    if (data[s]) return data[s];
    // Fuzzy match
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf(s) !== -1 || s.indexOf(keys[i]) !== -1) {
        return data[keys[i]];
      }
      if (data[keys[i]].title.toLowerCase().indexOf(s) !== -1) {
        return data[keys[i]];
      }
    }
    return null;
  }

  /**
   * Get all situation categories.
   */
  function getSituations() {
    return Object.keys(data);
  }

  /**
   * Get a random phrase from any situation.
   */
  function getRandomPhrase() {
    var keys = Object.keys(data);
    var cat = keys[Math.floor(Math.random() * keys.length)];
    var phrases = data[cat].phrases;
    return {
      phrase: phrases[Math.floor(Math.random() * phrases.length)],
      situation: data[cat].title
    };
  }

  /**
   * Format a phrase set as HTML.
   */
  function formatPhrases(situationData, limit) {
    if (!situationData) return '<p>I don\'t have phrases for that situation yet.</p>';
    var phrases = situationData.phrases;
    var max = limit || phrases.length;
    var html = '<div class="phrase-list">';
    html += '<div class="phrase-title">📝 ' + situationData.title + '</div>';
    for (var i = 0; i < Math.min(max, phrases.length); i++) {
      var p = phrases[i];
      html += '<div class="phrase-item">';
      html += '<div class="phrase-spanish">' + p.es + '</div>';
      html += '<div class="phrase-english">' + p.en + '</div>';
      html += '<div class="phrase-pronunciation">🔊 ' + p.pronunciation + '</div>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  return {
    data: data,
    getSituation: getSituation,
    getSituations: getSituations,
    getRandomPhrase: getRandomPhrase,
    formatPhrases: formatPhrases
  };
})();
