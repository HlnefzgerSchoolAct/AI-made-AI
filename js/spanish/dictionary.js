// ============================================================
// Spanish ↔ English Dictionary
// 500+ common words organized by category
// ============================================================
var Dictionary = (function () {
  'use strict';

  // Each entry: { en, es, pronunciation, example }
  // pronunciation = rough English phonetic guide
  var data = {
    greetings: [
      { en: 'hello', es: 'hola', pronunciation: 'OH-lah', example: '¡Hola! ¿Cómo estás?' },
      { en: 'goodbye', es: 'adiós', pronunciation: 'ah-dee-OHS', example: '¡Adiós, amigo!' },
      { en: 'good morning', es: 'buenos días', pronunciation: 'BWEH-nohs DEE-ahs', example: 'Buenos días, profesor.' },
      { en: 'good afternoon', es: 'buenas tardes', pronunciation: 'BWEH-nahs TAR-dehs', example: 'Buenas tardes, señora.' },
      { en: 'good evening', es: 'buenas noches', pronunciation: 'BWEH-nahs NOH-chehs', example: 'Buenas noches, ¿cómo estás?' },
      { en: 'please', es: 'por favor', pronunciation: 'por fah-VOR', example: 'Un café, por favor.' },
      { en: 'thank you', es: 'gracias', pronunciation: 'GRAH-see-ahs', example: '¡Muchas gracias!' },
      { en: 'you are welcome', es: 'de nada', pronunciation: 'deh NAH-dah', example: 'De nada, amigo.' },
      { en: 'yes', es: 'sí', pronunciation: 'see', example: 'Sí, me gusta.' },
      { en: 'no', es: 'no', pronunciation: 'noh', example: 'No, gracias.' },
      { en: 'excuse me', es: 'perdón', pronunciation: 'pehr-DOHN', example: 'Perdón, ¿dónde está el baño?' },
      { en: 'sorry', es: 'lo siento', pronunciation: 'loh see-EHN-toh', example: 'Lo siento mucho.' },
      { en: 'see you later', es: 'hasta luego', pronunciation: 'AH-stah LWEH-goh', example: '¡Hasta luego!' },
      { en: 'see you tomorrow', es: 'hasta mañana', pronunciation: 'AH-stah mah-NYAH-nah', example: 'Hasta mañana, clase.' },
      { en: 'nice to meet you', es: 'mucho gusto', pronunciation: 'MOO-choh GOO-stoh', example: 'Mucho gusto, soy María.' }
    ],

    numbers: [
      { en: 'zero', es: 'cero', pronunciation: 'SEH-roh' },
      { en: 'one', es: 'uno', pronunciation: 'OO-noh' },
      { en: 'two', es: 'dos', pronunciation: 'dohs' },
      { en: 'three', es: 'tres', pronunciation: 'trehs' },
      { en: 'four', es: 'cuatro', pronunciation: 'KWAH-troh' },
      { en: 'five', es: 'cinco', pronunciation: 'SEEN-koh' },
      { en: 'six', es: 'seis', pronunciation: 'says' },
      { en: 'seven', es: 'siete', pronunciation: 'see-EH-teh' },
      { en: 'eight', es: 'ocho', pronunciation: 'OH-choh' },
      { en: 'nine', es: 'nueve', pronunciation: 'NWEH-veh' },
      { en: 'ten', es: 'diez', pronunciation: 'dee-EHS' },
      { en: 'eleven', es: 'once', pronunciation: 'OHN-seh' },
      { en: 'twelve', es: 'doce', pronunciation: 'DOH-seh' },
      { en: 'thirteen', es: 'trece', pronunciation: 'TREH-seh' },
      { en: 'fourteen', es: 'catorce', pronunciation: 'kah-TOR-seh' },
      { en: 'fifteen', es: 'quince', pronunciation: 'KEEN-seh' },
      { en: 'sixteen', es: 'dieciséis', pronunciation: 'dee-eh-see-SAYS' },
      { en: 'seventeen', es: 'diecisiete', pronunciation: 'dee-eh-see-see-EH-teh' },
      { en: 'eighteen', es: 'dieciocho', pronunciation: 'dee-eh-see-OH-choh' },
      { en: 'nineteen', es: 'diecinueve', pronunciation: 'dee-eh-see-NWEH-veh' },
      { en: 'twenty', es: 'veinte', pronunciation: 'VAYN-teh' },
      { en: 'thirty', es: 'treinta', pronunciation: 'TRAYN-tah' },
      { en: 'forty', es: 'cuarenta', pronunciation: 'kwah-REN-tah' },
      { en: 'fifty', es: 'cincuenta', pronunciation: 'seen-KWEN-tah' },
      { en: 'sixty', es: 'sesenta', pronunciation: 'seh-SEN-tah' },
      { en: 'seventy', es: 'setenta', pronunciation: 'seh-TEN-tah' },
      { en: 'eighty', es: 'ochenta', pronunciation: 'oh-CHEN-tah' },
      { en: 'ninety', es: 'noventa', pronunciation: 'noh-VEN-tah' },
      { en: 'one hundred', es: 'cien', pronunciation: 'see-EHN' },
      { en: 'one thousand', es: 'mil', pronunciation: 'meel' },
      { en: 'one million', es: 'un millón', pronunciation: 'oon mee-YOHN' }
    ],

    colors: [
      { en: 'red', es: 'rojo', pronunciation: 'RROH-hoh', example: 'El coche es rojo.' },
      { en: 'blue', es: 'azul', pronunciation: 'ah-SOOL', example: 'El cielo es azul.' },
      { en: 'green', es: 'verde', pronunciation: 'VEHR-deh', example: 'La hierba es verde.' },
      { en: 'yellow', es: 'amarillo', pronunciation: 'ah-mah-REE-yoh', example: 'El sol es amarillo.' },
      { en: 'white', es: 'blanco', pronunciation: 'BLAHN-koh', example: 'La nieve es blanca.' },
      { en: 'black', es: 'negro', pronunciation: 'NEH-groh', example: 'El gato es negro.' },
      { en: 'orange', es: 'naranja', pronunciation: 'nah-RAHN-hah', example: 'La naranja es naranja.' },
      { en: 'purple', es: 'morado', pronunciation: 'moh-RAH-doh', example: 'La flor es morada.' },
      { en: 'pink', es: 'rosa', pronunciation: 'RROH-sah', example: 'La camisa es rosa.' },
      { en: 'brown', es: 'marrón', pronunciation: 'mah-RROHN', example: 'El perro es marrón.' },
      { en: 'gray', es: 'gris', pronunciation: 'grees', example: 'El cielo está gris.' },
      { en: 'gold', es: 'dorado', pronunciation: 'doh-RAH-doh', example: 'El anillo es dorado.' },
      { en: 'silver', es: 'plateado', pronunciation: 'plah-teh-AH-doh', example: 'El coche es plateado.' }
    ],

    food: [
      { en: 'water', es: 'agua', pronunciation: 'AH-gwah', example: 'Un vaso de agua, por favor.' },
      { en: 'bread', es: 'pan', pronunciation: 'pahn', example: 'Me gusta el pan fresco.' },
      { en: 'rice', es: 'arroz', pronunciation: 'ah-RROHS', example: 'El arroz con pollo es delicioso.' },
      { en: 'chicken', es: 'pollo', pronunciation: 'POH-yoh', example: 'Quiero pollo asado.' },
      { en: 'beef', es: 'carne de res', pronunciation: 'KAR-neh deh rehs', example: 'La carne de res está buena.' },
      { en: 'fish', es: 'pescado', pronunciation: 'pehs-KAH-doh', example: 'Me gusta el pescado fresco.' },
      { en: 'egg', es: 'huevo', pronunciation: 'WEH-voh', example: 'Quiero dos huevos.' },
      { en: 'milk', es: 'leche', pronunciation: 'LEH-cheh', example: 'Un vaso de leche.' },
      { en: 'cheese', es: 'queso', pronunciation: 'KEH-soh', example: 'El queso está delicioso.' },
      { en: 'fruit', es: 'fruta', pronunciation: 'FROO-tah', example: 'La fruta es saludable.' },
      { en: 'apple', es: 'manzana', pronunciation: 'mahn-SAH-nah', example: 'La manzana es roja.' },
      { en: 'banana', es: 'plátano', pronunciation: 'PLAH-tah-noh', example: 'El plátano es amarillo.' },
      { en: 'orange', es: 'naranja', pronunciation: 'nah-RAHN-hah', example: 'Quiero jugo de naranja.' },
      { en: 'strawberry', es: 'fresa', pronunciation: 'FREH-sah', example: 'Las fresas son dulces.' },
      { en: 'grape', es: 'uva', pronunciation: 'OO-vah', example: 'Las uvas son moradas.' },
      { en: 'vegetable', es: 'verdura', pronunciation: 'vehr-DOO-rah', example: 'Las verduras son saludables.' },
      { en: 'tomato', es: 'tomate', pronunciation: 'toh-MAH-teh', example: 'El tomate es rojo.' },
      { en: 'potato', es: 'papa', pronunciation: 'PAH-pah', example: 'Las papas fritas son ricas.' },
      { en: 'onion', es: 'cebolla', pronunciation: 'seh-BOH-yah', example: 'La cebolla me hace llorar.' },
      { en: 'salad', es: 'ensalada', pronunciation: 'ehn-sah-LAH-dah', example: 'Quiero una ensalada grande.' },
      { en: 'soup', es: 'sopa', pronunciation: 'SOH-pah', example: 'La sopa está caliente.' },
      { en: 'coffee', es: 'café', pronunciation: 'kah-FEH', example: 'Un café con leche, por favor.' },
      { en: 'tea', es: 'té', pronunciation: 'teh', example: '¿Quieres un té?' },
      { en: 'juice', es: 'jugo', pronunciation: 'HOO-goh', example: 'Un jugo de naranja.' },
      { en: 'beer', es: 'cerveza', pronunciation: 'sehr-VEH-sah', example: 'Una cerveza, por favor.' },
      { en: 'wine', es: 'vino', pronunciation: 'VEE-noh', example: 'Un vino tinto, por favor.' },
      { en: 'sugar', es: 'azúcar', pronunciation: 'ah-SOO-kar', example: '¿Quieres azúcar?' },
      { en: 'salt', es: 'sal', pronunciation: 'sahl', example: 'Pásame la sal, por favor.' },
      { en: 'pepper', es: 'pimienta', pronunciation: 'pee-mee-EHN-tah', example: '¿Quieres pimienta?' },
      { en: 'butter', es: 'mantequilla', pronunciation: 'mahn-teh-KEE-yah', example: 'Pan con mantequilla.' },
      { en: 'ice cream', es: 'helado', pronunciation: 'eh-LAH-doh', example: 'Quiero un helado de chocolate.' },
      { en: 'cake', es: 'pastel', pronunciation: 'pahs-TEL', example: 'El pastel de cumpleaños.' },
      { en: 'chocolate', es: 'chocolate', pronunciation: 'choh-koh-LAH-teh', example: 'Me encanta el chocolate.' }
    ],

    family: [
      { en: 'mother', es: 'madre', pronunciation: 'MAH-dreh', example: 'Mi madre es doctora.' },
      { en: 'mom', es: 'mamá', pronunciation: 'mah-MAH', example: '¡Hola, mamá!' },
      { en: 'father', es: 'padre', pronunciation: 'PAH-dreh', example: 'Mi padre trabaja mucho.' },
      { en: 'dad', es: 'papá', pronunciation: 'pah-PAH', example: 'Papá está en casa.' },
      { en: 'parents', es: 'padres', pronunciation: 'PAH-drehs', example: 'Mis padres son amables.' },
      { en: 'son', es: 'hijo', pronunciation: 'EE-hoh', example: 'Mi hijo tiene cinco años.' },
      { en: 'daughter', es: 'hija', pronunciation: 'EE-hah', example: 'Mi hija es inteligente.' },
      { en: 'brother', es: 'hermano', pronunciation: 'ehr-MAH-noh', example: 'Mi hermano es alto.' },
      { en: 'sister', es: 'hermana', pronunciation: 'ehr-MAH-nah', example: 'Mi hermana vive en Madrid.' },
      { en: 'grandfather', es: 'abuelo', pronunciation: 'ah-BWEH-loh', example: 'Mi abuelo tiene ochenta años.' },
      { en: 'grandmother', es: 'abuela', pronunciation: 'ah-BWEH-lah', example: 'Mi abuela cocina muy bien.' },
      { en: 'uncle', es: 'tío', pronunciation: 'TEE-oh', example: 'Mi tío vive en México.' },
      { en: 'aunt', es: 'tía', pronunciation: 'TEE-ah', example: 'Mi tía es profesora.' },
      { en: 'cousin', es: 'primo', pronunciation: 'PREE-moh', example: 'Mi primo tiene un perro.' },
      { en: 'husband', es: 'esposo', pronunciation: 'ehs-POH-soh', example: 'Mi esposo es ingeniero.' },
      { en: 'wife', es: 'esposa', pronunciation: 'ehs-POH-sah', example: 'Mi esposa es doctora.' },
      { en: 'boyfriend', es: 'novio', pronunciation: 'NOH-vee-oh', example: 'Mi novio es simpático.' },
      { en: 'girlfriend', es: 'novia', pronunciation: 'NOH-vee-ah', example: 'Mi novia es muy bonita.' },
      { en: 'baby', es: 'bebé', pronunciation: 'beh-BEH', example: 'El bebé está durmiendo.' },
      { en: 'family', es: 'familia', pronunciation: 'fah-MEE-lee-ah', example: 'Mi familia es grande.' }
    ],

    animals: [
      { en: 'dog', es: 'perro', pronunciation: 'PEH-rroh', example: 'El perro es grande.' },
      { en: 'cat', es: 'gato', pronunciation: 'GAH-toh', example: 'El gato duerme mucho.' },
      { en: 'bird', es: 'pájaro', pronunciation: 'PAH-hah-roh', example: 'El pájaro canta bonito.' },
      { en: 'horse', es: 'caballo', pronunciation: 'kah-BAH-yoh', example: 'El caballo es fuerte.' },
      { en: 'cow', es: 'vaca', pronunciation: 'VAH-kah', example: 'La vaca da leche.' },
      { en: 'pig', es: 'cerdo', pronunciation: 'SEHR-doh', example: 'El cerdo está en la granja.' },
      { en: 'fish', es: 'pez', pronunciation: 'pehs', example: 'El pez nada en el río.' },
      { en: 'chicken', es: 'gallina', pronunciation: 'gah-YEE-nah', example: 'La gallina pone huevos.' },
      { en: 'duck', es: 'pato', pronunciation: 'PAH-toh', example: 'El pato nada en el lago.' },
      { en: 'rabbit', es: 'conejo', pronunciation: 'koh-NEH-hoh', example: 'El conejo salta mucho.' },
      { en: 'bear', es: 'oso', pronunciation: 'OH-soh', example: 'El oso es grande y fuerte.' },
      { en: 'lion', es: 'león', pronunciation: 'leh-OHN', example: 'El león es el rey de la selva.' },
      { en: 'elephant', es: 'elefante', pronunciation: 'eh-leh-FAHN-teh', example: 'El elefante es enorme.' },
      { en: 'monkey', es: 'mono', pronunciation: 'MOH-noh', example: 'El mono come plátanos.' },
      { en: 'snake', es: 'serpiente', pronunciation: 'sehr-pee-EHN-teh', example: 'La serpiente es larga.' },
      { en: 'butterfly', es: 'mariposa', pronunciation: 'mah-ree-POH-sah', example: 'La mariposa es bonita.' },
      { en: 'turtle', es: 'tortuga', pronunciation: 'tor-TOO-gah', example: 'La tortuga camina despacio.' },
      { en: 'wolf', es: 'lobo', pronunciation: 'LOH-boh', example: 'El lobo aúlla en la noche.' },
      { en: 'mouse', es: 'ratón', pronunciation: 'rah-TOHN', example: 'El ratón es pequeño.' },
      { en: 'frog', es: 'rana', pronunciation: 'RRAH-nah', example: 'La rana salta en el agua.' }
    ],

    body: [
      { en: 'head', es: 'cabeza', pronunciation: 'kah-BEH-sah', example: 'Me duele la cabeza.' },
      { en: 'hair', es: 'pelo', pronunciation: 'PEH-loh', example: 'Tiene el pelo largo.' },
      { en: 'face', es: 'cara', pronunciation: 'KAH-rah', example: 'Tiene una cara bonita.' },
      { en: 'eye', es: 'ojo', pronunciation: 'OH-hoh', example: 'Tiene los ojos azules.' },
      { en: 'ear', es: 'oreja', pronunciation: 'oh-REH-hah', example: 'Me duele la oreja.' },
      { en: 'nose', es: 'nariz', pronunciation: 'nah-REES', example: 'Tiene la nariz pequeña.' },
      { en: 'mouth', es: 'boca', pronunciation: 'BOH-kah', example: 'Abre la boca.' },
      { en: 'tooth', es: 'diente', pronunciation: 'dee-EHN-teh', example: 'Me duele un diente.' },
      { en: 'tongue', es: 'lengua', pronunciation: 'LEHN-gwah', example: 'La lengua española es hermosa.' },
      { en: 'neck', es: 'cuello', pronunciation: 'KWEH-yoh', example: 'Me duele el cuello.' },
      { en: 'shoulder', es: 'hombro', pronunciation: 'OHM-broh', example: 'Me duele el hombro.' },
      { en: 'arm', es: 'brazo', pronunciation: 'BRAH-soh', example: 'Me rompí el brazo.' },
      { en: 'hand', es: 'mano', pronunciation: 'MAH-noh', example: 'Dame la mano.' },
      { en: 'finger', es: 'dedo', pronunciation: 'DEH-doh', example: 'Me corté el dedo.' },
      { en: 'chest', es: 'pecho', pronunciation: 'PEH-choh', example: 'Me duele el pecho.' },
      { en: 'stomach', es: 'estómago', pronunciation: 'ehs-TOH-mah-goh', example: 'Me duele el estómago.' },
      { en: 'back', es: 'espalda', pronunciation: 'ehs-PAHL-dah', example: 'Me duele la espalda.' },
      { en: 'leg', es: 'pierna', pronunciation: 'pee-EHR-nah', example: 'Me duele la pierna.' },
      { en: 'knee', es: 'rodilla', pronunciation: 'roh-DEE-yah', example: 'Me duele la rodilla.' },
      { en: 'foot', es: 'pie', pronunciation: 'pee-EH', example: 'Me duele el pie.' },
      { en: 'heart', es: 'corazón', pronunciation: 'koh-rah-SOHN', example: 'Mi corazón late rápido.' }
    ],

    clothing: [
      { en: 'shirt', es: 'camisa', pronunciation: 'kah-MEE-sah', example: 'La camisa es azul.' },
      { en: 't-shirt', es: 'camiseta', pronunciation: 'kah-mee-SEH-tah', example: 'Llevo una camiseta blanca.' },
      { en: 'pants', es: 'pantalones', pronunciation: 'pahn-tah-LOH-nehs', example: 'Los pantalones son negros.' },
      { en: 'dress', es: 'vestido', pronunciation: 'vehs-TEE-doh', example: 'El vestido es bonito.' },
      { en: 'skirt', es: 'falda', pronunciation: 'FAHL-dah', example: 'La falda es roja.' },
      { en: 'jacket', es: 'chaqueta', pronunciation: 'chah-KEH-tah', example: 'La chaqueta es de cuero.' },
      { en: 'coat', es: 'abrigo', pronunciation: 'ah-BREE-goh', example: 'Necesito un abrigo.' },
      { en: 'shoes', es: 'zapatos', pronunciation: 'sah-PAH-tohs', example: 'Los zapatos son nuevos.' },
      { en: 'boots', es: 'botas', pronunciation: 'BOH-tahs', example: 'Las botas son marrones.' },
      { en: 'hat', es: 'sombrero', pronunciation: 'sohm-BREH-roh', example: 'El sombrero es grande.' },
      { en: 'socks', es: 'calcetines', pronunciation: 'kahl-seh-TEE-nehs', example: 'Los calcetines son blancos.' },
      { en: 'underwear', es: 'ropa interior', pronunciation: 'RROH-pah een-teh-ree-OR', example: 'La ropa interior es de algodón.' },
      { en: 'scarf', es: 'bufanda', pronunciation: 'boo-FAHN-dah', example: 'La bufanda es de lana.' },
      { en: 'gloves', es: 'guantes', pronunciation: 'GWAHN-tehs', example: 'Necesito guantes para el frío.' },
      { en: 'belt', es: 'cinturón', pronunciation: 'seen-too-ROHN', example: 'El cinturón es de cuero.' }
    ],

    house: [
      { en: 'house', es: 'casa', pronunciation: 'KAH-sah', example: 'Mi casa es grande.' },
      { en: 'room', es: 'habitación', pronunciation: 'ah-bee-tah-see-OHN', example: 'La habitación es pequeña.' },
      { en: 'bedroom', es: 'dormitorio', pronunciation: 'dor-mee-TOH-ree-oh', example: 'El dormitorio tiene una cama grande.' },
      { en: 'kitchen', es: 'cocina', pronunciation: 'koh-SEE-nah', example: 'La cocina está limpia.' },
      { en: 'bathroom', es: 'baño', pronunciation: 'BAH-nyoh', example: '¿Dónde está el baño?' },
      { en: 'living room', es: 'sala', pronunciation: 'SAH-lah', example: 'Estamos en la sala.' },
      { en: 'dining room', es: 'comedor', pronunciation: 'koh-meh-DOR', example: 'Cenamos en el comedor.' },
      { en: 'door', es: 'puerta', pronunciation: 'PWEHR-tah', example: 'Abre la puerta.' },
      { en: 'window', es: 'ventana', pronunciation: 'vehn-TAH-nah', example: 'La ventana está abierta.' },
      { en: 'table', es: 'mesa', pronunciation: 'MEH-sah', example: 'El libro está en la mesa.' },
      { en: 'chair', es: 'silla', pronunciation: 'SEE-yah', example: 'Siéntate en la silla.' },
      { en: 'bed', es: 'cama', pronunciation: 'KAH-mah', example: 'La cama es cómoda.' },
      { en: 'floor', es: 'suelo', pronunciation: 'SWEH-loh', example: 'El suelo está limpio.' },
      { en: 'wall', es: 'pared', pronunciation: 'pah-REHD', example: 'La pared es blanca.' },
      { en: 'roof', es: 'techo', pronunciation: 'TEH-choh', example: 'El techo es alto.' },
      { en: 'garden', es: 'jardín', pronunciation: 'har-DEEN', example: 'El jardín tiene flores.' },
      { en: 'stairs', es: 'escaleras', pronunciation: 'ehs-kah-LEH-rahs', example: 'Sube las escaleras.' },
      { en: 'mirror', es: 'espejo', pronunciation: 'ehs-PEH-hoh', example: 'Me miro en el espejo.' }
    ],

    nature: [
      { en: 'sun', es: 'sol', pronunciation: 'sohl', example: 'El sol brilla mucho.' },
      { en: 'moon', es: 'luna', pronunciation: 'LOO-nah', example: 'La luna está llena.' },
      { en: 'star', es: 'estrella', pronunciation: 'ehs-TREH-yah', example: 'Las estrellas brillan.' },
      { en: 'sky', es: 'cielo', pronunciation: 'see-EH-loh', example: 'El cielo es azul.' },
      { en: 'cloud', es: 'nube', pronunciation: 'NOO-beh', example: 'Hay muchas nubes.' },
      { en: 'rain', es: 'lluvia', pronunciation: 'YOO-vee-ah', example: 'La lluvia es fuerte.' },
      { en: 'snow', es: 'nieve', pronunciation: 'nee-EH-veh', example: 'La nieve es blanca.' },
      { en: 'wind', es: 'viento', pronunciation: 'vee-EHN-toh', example: 'El viento sopla fuerte.' },
      { en: 'tree', es: 'árbol', pronunciation: 'AHR-bohl', example: 'El árbol es alto.' },
      { en: 'flower', es: 'flor', pronunciation: 'flohr', example: 'La flor es hermosa.' },
      { en: 'river', es: 'río', pronunciation: 'RREE-oh', example: 'El río es largo.' },
      { en: 'mountain', es: 'montaña', pronunciation: 'mohn-TAH-nyah', example: 'La montaña es alta.' },
      { en: 'sea', es: 'mar', pronunciation: 'mahr', example: 'El mar es azul.' },
      { en: 'beach', es: 'playa', pronunciation: 'PLAH-yah', example: 'Vamos a la playa.' },
      { en: 'lake', es: 'lago', pronunciation: 'LAH-goh', example: 'El lago es tranquilo.' },
      { en: 'forest', es: 'bosque', pronunciation: 'BOHS-keh', example: 'El bosque es verde.' },
      { en: 'earth', es: 'tierra', pronunciation: 'tee-EH-rrah', example: 'La Tierra es nuestro planeta.' },
      { en: 'fire', es: 'fuego', pronunciation: 'FWEH-goh', example: '¡Cuidado con el fuego!' },
      { en: 'ice', es: 'hielo', pronunciation: 'YEH-loh', example: 'El hielo está frío.' }
    ],

    weather: [
      { en: 'hot', es: 'caliente', pronunciation: 'kah-lee-EHN-teh', example: 'Hace mucho calor hoy.' },
      { en: 'cold', es: 'frío', pronunciation: 'FREE-oh', example: 'Hace mucho frío.' },
      { en: 'warm', es: 'cálido', pronunciation: 'KAH-lee-doh', example: 'El día está cálido.' },
      { en: 'cool', es: 'fresco', pronunciation: 'FREHS-koh', example: 'La noche está fresca.' },
      { en: 'sunny', es: 'soleado', pronunciation: 'soh-leh-AH-doh', example: 'El día está soleado.' },
      { en: 'cloudy', es: 'nublado', pronunciation: 'noo-BLAH-doh', example: 'El cielo está nublado.' },
      { en: 'rainy', es: 'lluvioso', pronunciation: 'yoo-vee-OH-soh', example: 'Es un día lluvioso.' },
      { en: 'snowy', es: 'nevado', pronunciation: 'neh-VAH-doh', example: 'Las montañas están nevadas.' },
      { en: 'windy', es: 'ventoso', pronunciation: 'vehn-TOH-soh', example: 'Hoy está ventoso.' },
      { en: 'stormy', es: 'tormentoso', pronunciation: 'tor-mehn-TOH-soh', example: 'La noche está tormentosa.' },
      { en: 'foggy', es: 'neblinoso', pronunciation: 'neh-blee-NOH-soh', example: 'La mañana está neblinosa.' },
      { en: 'temperature', es: 'temperatura', pronunciation: 'tehm-peh-rah-TOO-rah', example: 'La temperatura es de veinte grados.' }
    ],

    time: [
      { en: 'day', es: 'día', pronunciation: 'DEE-ah', example: '¡Buenos días!' },
      { en: 'night', es: 'noche', pronunciation: 'NOH-cheh', example: 'Buenas noches.' },
      { en: 'morning', es: 'mañana', pronunciation: 'mah-NYAH-nah', example: 'Estudio por la mañana.' },
      { en: 'afternoon', es: 'tarde', pronunciation: 'TAR-deh', example: 'Trabajo por la tarde.' },
      { en: 'today', es: 'hoy', pronunciation: 'oy', example: 'Hoy es lunes.' },
      { en: 'tomorrow', es: 'mañana', pronunciation: 'mah-NYAH-nah', example: 'Mañana vamos al parque.' },
      { en: 'yesterday', es: 'ayer', pronunciation: 'ah-YEHR', example: 'Ayer fue viernes.' },
      { en: 'week', es: 'semana', pronunciation: 'seh-MAH-nah', example: 'Esta semana tengo exámenes.' },
      { en: 'month', es: 'mes', pronunciation: 'mehs', example: 'Este mes es marzo.' },
      { en: 'year', es: 'año', pronunciation: 'AH-nyoh', example: 'El año tiene doce meses.' },
      { en: 'hour', es: 'hora', pronunciation: 'OH-rah', example: '¿Qué hora es?' },
      { en: 'minute', es: 'minuto', pronunciation: 'mee-NOO-toh', example: 'Espera un minuto.' },
      { en: 'second', es: 'segundo', pronunciation: 'seh-GOON-doh', example: 'Un segundo, por favor.' },
      { en: 'Monday', es: 'lunes', pronunciation: 'LOO-nehs', example: 'El lunes empiezo clases.' },
      { en: 'Tuesday', es: 'martes', pronunciation: 'MAR-tehs', example: 'El martes tengo español.' },
      { en: 'Wednesday', es: 'miércoles', pronunciation: 'mee-EHR-koh-lehs', example: 'El miércoles es mitad de semana.' },
      { en: 'Thursday', es: 'jueves', pronunciation: 'HWEH-vehs', example: 'El jueves voy al cine.' },
      { en: 'Friday', es: 'viernes', pronunciation: 'vee-EHR-nehs', example: '¡Por fin es viernes!' },
      { en: 'Saturday', es: 'sábado', pronunciation: 'SAH-bah-doh', example: 'El sábado descanso.' },
      { en: 'Sunday', es: 'domingo', pronunciation: 'doh-MEEN-goh', example: 'El domingo voy a la iglesia.' },
      { en: 'January', es: 'enero', pronunciation: 'eh-NEH-roh' },
      { en: 'February', es: 'febrero', pronunciation: 'feh-BREH-roh' },
      { en: 'March', es: 'marzo', pronunciation: 'MAR-soh' },
      { en: 'April', es: 'abril', pronunciation: 'ah-BREEL' },
      { en: 'May', es: 'mayo', pronunciation: 'MAH-yoh' },
      { en: 'June', es: 'junio', pronunciation: 'HOO-nee-oh' },
      { en: 'July', es: 'julio', pronunciation: 'HOO-lee-oh' },
      { en: 'August', es: 'agosto', pronunciation: 'ah-GOHS-toh' },
      { en: 'September', es: 'septiembre', pronunciation: 'sehp-tee-EHM-breh' },
      { en: 'October', es: 'octubre', pronunciation: 'ohk-TOO-breh' },
      { en: 'November', es: 'noviembre', pronunciation: 'noh-vee-EHM-breh' },
      { en: 'December', es: 'diciembre', pronunciation: 'dee-see-EHM-breh' }
    ],

    emotions: [
      { en: 'happy', es: 'feliz', pronunciation: 'feh-LEES', example: 'Estoy muy feliz.' },
      { en: 'sad', es: 'triste', pronunciation: 'TREES-teh', example: 'Estoy triste hoy.' },
      { en: 'angry', es: 'enojado', pronunciation: 'eh-noh-HAH-doh', example: 'Estoy enojado contigo.' },
      { en: 'scared', es: 'asustado', pronunciation: 'ah-soos-TAH-doh', example: 'Estoy asustado.' },
      { en: 'tired', es: 'cansado', pronunciation: 'kahn-SAH-doh', example: 'Estoy muy cansado.' },
      { en: 'excited', es: 'emocionado', pronunciation: 'eh-moh-see-oh-NAH-doh', example: '¡Estoy emocionado!' },
      { en: 'bored', es: 'aburrido', pronunciation: 'ah-boo-RREE-doh', example: 'Estoy aburrido.' },
      { en: 'nervous', es: 'nervioso', pronunciation: 'nehr-vee-OH-soh', example: 'Estoy nervioso por el examen.' },
      { en: 'surprised', es: 'sorprendido', pronunciation: 'sor-prehn-DEE-doh', example: '¡Estoy sorprendido!' },
      { en: 'proud', es: 'orgulloso', pronunciation: 'or-goo-YOH-soh', example: 'Estoy orgulloso de ti.' },
      { en: 'love', es: 'amor', pronunciation: 'ah-MOR', example: 'El amor es hermoso.' },
      { en: 'hungry', es: 'hambriento', pronunciation: 'ahm-bree-EHN-toh', example: 'Tengo hambre.' },
      { en: 'thirsty', es: 'sediento', pronunciation: 'seh-dee-EHN-toh', example: 'Tengo sed.' },
      { en: 'sick', es: 'enfermo', pronunciation: 'ehn-FEHR-moh', example: 'Estoy enfermo.' },
      { en: 'well', es: 'bien', pronunciation: 'bee-EHN', example: 'Estoy bien, gracias.' }
    ],

    travel: [
      { en: 'airport', es: 'aeropuerto', pronunciation: 'ah-eh-roh-PWEHR-toh', example: 'Vamos al aeropuerto.' },
      { en: 'hotel', es: 'hotel', pronunciation: 'oh-TEL', example: 'El hotel es bonito.' },
      { en: 'train', es: 'tren', pronunciation: 'trehn', example: 'El tren sale a las ocho.' },
      { en: 'bus', es: 'autobús', pronunciation: 'ow-toh-BOOS', example: 'El autobús llega tarde.' },
      { en: 'car', es: 'coche', pronunciation: 'KOH-cheh', example: 'Mi coche es azul.' },
      { en: 'airplane', es: 'avión', pronunciation: 'ah-vee-OHN', example: 'El avión despega a las seis.' },
      { en: 'ticket', es: 'boleto', pronunciation: 'boh-LEH-toh', example: 'Necesito un boleto.' },
      { en: 'passport', es: 'pasaporte', pronunciation: 'pah-sah-POR-teh', example: '¿Dónde está mi pasaporte?' },
      { en: 'suitcase', es: 'maleta', pronunciation: 'mah-LEH-tah', example: 'Mi maleta es pesada.' },
      { en: 'map', es: 'mapa', pronunciation: 'MAH-pah', example: 'Necesito un mapa.' },
      { en: 'street', es: 'calle', pronunciation: 'KAH-yeh', example: 'La calle es larga.' },
      { en: 'city', es: 'ciudad', pronunciation: 'see-oo-DAHD', example: 'La ciudad es grande.' },
      { en: 'country', es: 'país', pronunciation: 'pah-EES', example: 'España es un país bonito.' },
      { en: 'left', es: 'izquierda', pronunciation: 'ees-kee-EHR-dah', example: 'Gira a la izquierda.' },
      { en: 'right', es: 'derecha', pronunciation: 'deh-REH-chah', example: 'Gira a la derecha.' },
      { en: 'straight', es: 'derecho', pronunciation: 'deh-REH-choh', example: 'Sigue derecho.' },
      { en: 'near', es: 'cerca', pronunciation: 'SEHR-kah', example: 'El hotel está cerca.' },
      { en: 'far', es: 'lejos', pronunciation: 'LEH-hohs', example: 'La playa está lejos.' }
    ],

    school: [
      { en: 'school', es: 'escuela', pronunciation: 'ehs-KWEH-lah', example: 'Voy a la escuela.' },
      { en: 'teacher', es: 'profesor', pronunciation: 'proh-feh-SOR', example: 'El profesor es amable.' },
      { en: 'student', es: 'estudiante', pronunciation: 'ehs-too-dee-AHN-teh', example: 'Soy estudiante.' },
      { en: 'class', es: 'clase', pronunciation: 'KLAH-seh', example: 'La clase empieza a las nueve.' },
      { en: 'book', es: 'libro', pronunciation: 'LEE-broh', example: 'El libro es interesante.' },
      { en: 'pen', es: 'bolígrafo', pronunciation: 'boh-LEE-grah-foh', example: '¿Tienes un bolígrafo?' },
      { en: 'pencil', es: 'lápiz', pronunciation: 'LAH-pees', example: 'Necesito un lápiz.' },
      { en: 'paper', es: 'papel', pronunciation: 'pah-PEL', example: 'Dame un papel.' },
      { en: 'homework', es: 'tarea', pronunciation: 'tah-REH-ah', example: 'Tengo mucha tarea.' },
      { en: 'test', es: 'examen', pronunciation: 'ehk-SAH-mehn', example: 'Tengo un examen mañana.' },
      { en: 'question', es: 'pregunta', pronunciation: 'preh-GOON-tah', example: 'Tengo una pregunta.' },
      { en: 'answer', es: 'respuesta', pronunciation: 'rehs-PWEHS-tah', example: 'No sé la respuesta.' },
      { en: 'word', es: 'palabra', pronunciation: 'pah-LAH-brah', example: 'Es una palabra nueva.' },
      { en: 'sentence', es: 'oración', pronunciation: 'oh-rah-see-OHN', example: 'Escribe una oración.' },
      { en: 'language', es: 'idioma', pronunciation: 'ee-dee-OH-mah', example: 'El español es un idioma bonito.' }
    ],

    professions: [
      { en: 'doctor', es: 'doctor', pronunciation: 'dohk-TOR', example: 'El doctor me ayudó.' },
      { en: 'nurse', es: 'enfermero', pronunciation: 'ehn-fehr-MEH-roh', example: 'La enfermera es amable.' },
      { en: 'lawyer', es: 'abogado', pronunciation: 'ah-boh-GAH-doh', example: 'Mi padre es abogado.' },
      { en: 'engineer', es: 'ingeniero', pronunciation: 'een-heh-nee-EH-roh', example: 'Quiero ser ingeniero.' },
      { en: 'chef', es: 'chef', pronunciation: 'shef', example: 'El chef cocina muy bien.' },
      { en: 'police officer', es: 'policía', pronunciation: 'poh-lee-SEE-ah', example: 'El policía nos ayudó.' },
      { en: 'firefighter', es: 'bombero', pronunciation: 'bohm-BEH-roh', example: 'El bombero es valiente.' },
      { en: 'artist', es: 'artista', pronunciation: 'ar-TEES-tah', example: 'Ella es una artista famosa.' },
      { en: 'musician', es: 'músico', pronunciation: 'MOO-see-koh', example: 'El músico toca la guitarra.' },
      { en: 'writer', es: 'escritor', pronunciation: 'ehs-kree-TOR', example: 'Es un escritor famoso.' },
      { en: 'farmer', es: 'agricultor', pronunciation: 'ah-gree-kool-TOR', example: 'El agricultor trabaja mucho.' },
      { en: 'mechanic', es: 'mecánico', pronunciation: 'meh-KAH-nee-koh', example: 'El mecánico arregló mi coche.' }
    ],

    adjectives: [
      { en: 'big', es: 'grande', pronunciation: 'GRAHN-deh', example: 'La casa es grande.' },
      { en: 'small', es: 'pequeño', pronunciation: 'peh-KEH-nyoh', example: 'El gato es pequeño.' },
      { en: 'tall', es: 'alto', pronunciation: 'AHL-toh', example: 'Mi hermano es alto.' },
      { en: 'short', es: 'bajo', pronunciation: 'BAH-hoh', example: 'La mesa es baja.' },
      { en: 'young', es: 'joven', pronunciation: 'HOH-vehn', example: 'Es una mujer joven.' },
      { en: 'old', es: 'viejo', pronunciation: 'vee-EH-hoh', example: 'El abuelo es viejo.' },
      { en: 'new', es: 'nuevo', pronunciation: 'NWEH-voh', example: 'Tengo un coche nuevo.' },
      { en: 'good', es: 'bueno', pronunciation: 'BWEH-noh', example: 'El libro es bueno.' },
      { en: 'bad', es: 'malo', pronunciation: 'MAH-loh', example: 'El tiempo está malo.' },
      { en: 'beautiful', es: 'hermoso', pronunciation: 'ehr-MOH-soh', example: 'El paisaje es hermoso.' },
      { en: 'ugly', es: 'feo', pronunciation: 'FEH-oh', example: 'El edificio es feo.' },
      { en: 'fast', es: 'rápido', pronunciation: 'RRAH-pee-doh', example: 'El coche es rápido.' },
      { en: 'slow', es: 'lento', pronunciation: 'LEHN-toh', example: 'La tortuga es lenta.' },
      { en: 'easy', es: 'fácil', pronunciation: 'FAH-seel', example: 'El examen es fácil.' },
      { en: 'difficult', es: 'difícil', pronunciation: 'dee-FEE-seel', example: 'La lección es difícil.' },
      { en: 'important', es: 'importante', pronunciation: 'eem-por-TAHN-teh', example: 'Es una clase importante.' },
      { en: 'interesting', es: 'interesante', pronunciation: 'een-teh-reh-SAHN-teh', example: 'El libro es interesante.' },
      { en: 'expensive', es: 'caro', pronunciation: 'KAH-roh', example: 'El hotel es caro.' },
      { en: 'cheap', es: 'barato', pronunciation: 'bah-RAH-toh', example: 'La comida es barata.' },
      { en: 'clean', es: 'limpio', pronunciation: 'LEEM-pee-oh', example: 'La casa está limpia.' },
      { en: 'dirty', es: 'sucio', pronunciation: 'SOO-see-oh', example: 'La ropa está sucia.' },
      { en: 'open', es: 'abierto', pronunciation: 'ah-bee-EHR-toh', example: 'La tienda está abierta.' },
      { en: 'closed', es: 'cerrado', pronunciation: 'seh-RRAH-doh', example: 'La puerta está cerrada.' }
    ],

    verbs: [
      { en: 'to be (permanent)', es: 'ser', pronunciation: 'sehr', example: 'Soy estudiante.' },
      { en: 'to be (temporary)', es: 'estar', pronunciation: 'ehs-TAR', example: 'Estoy cansado.' },
      { en: 'to have', es: 'tener', pronunciation: 'teh-NEHR', example: 'Tengo un libro.' },
      { en: 'to go', es: 'ir', pronunciation: 'eer', example: 'Voy a la escuela.' },
      { en: 'to do/make', es: 'hacer', pronunciation: 'ah-SEHR', example: 'Hago la tarea.' },
      { en: 'to want', es: 'querer', pronunciation: 'keh-REHR', example: 'Quiero aprender español.' },
      { en: 'to eat', es: 'comer', pronunciation: 'koh-MEHR', example: 'Como una manzana.' },
      { en: 'to drink', es: 'beber', pronunciation: 'beh-BEHR', example: 'Bebo agua.' },
      { en: 'to speak', es: 'hablar', pronunciation: 'ah-BLAR', example: 'Hablo español.' },
      { en: 'to read', es: 'leer', pronunciation: 'leh-EHR', example: 'Leo un libro.' },
      { en: 'to write', es: 'escribir', pronunciation: 'ehs-kree-BEER', example: 'Escribo una carta.' },
      { en: 'to study', es: 'estudiar', pronunciation: 'ehs-too-dee-AHR', example: 'Estudio español.' },
      { en: 'to learn', es: 'aprender', pronunciation: 'ah-prehn-DEHR', example: 'Aprendo español.' },
      { en: 'to teach', es: 'enseñar', pronunciation: 'ehn-seh-NYAR', example: 'El profesor enseña español.' },
      { en: 'to live', es: 'vivir', pronunciation: 'vee-VEER', example: 'Vivo en Estados Unidos.' },
      { en: 'to work', es: 'trabajar', pronunciation: 'trah-bah-HAR', example: 'Trabajo en una oficina.' },
      { en: 'to sleep', es: 'dormir', pronunciation: 'dor-MEER', example: 'Duermo ocho horas.' },
      { en: 'to come', es: 'venir', pronunciation: 'veh-NEER', example: 'Vengo de España.' },
      { en: 'to know (facts)', es: 'saber', pronunciation: 'sah-BEHR', example: 'Sé la respuesta.' },
      { en: 'to know (people)', es: 'conocer', pronunciation: 'koh-noh-SEHR', example: 'Conozco a María.' },
      { en: 'to give', es: 'dar', pronunciation: 'dar', example: 'Doy un regalo.' },
      { en: 'to see', es: 'ver', pronunciation: 'vehr', example: 'Veo una película.' },
      { en: 'to be able to', es: 'poder', pronunciation: 'poh-DEHR', example: 'Puedo hablar español.' },
      { en: 'to put', es: 'poner', pronunciation: 'poh-NEHR', example: 'Pongo el libro en la mesa.' },
      { en: 'to say/tell', es: 'decir', pronunciation: 'deh-SEER', example: 'Digo la verdad.' },
      { en: 'to leave/go out', es: 'salir', pronunciation: 'sah-LEER', example: 'Salgo a las ocho.' },
      { en: 'to buy', es: 'comprar', pronunciation: 'kohm-PRAR', example: 'Compro comida.' },
      { en: 'to play', es: 'jugar', pronunciation: 'hoo-GAR', example: 'Juego al fútbol.' },
      { en: 'to sing', es: 'cantar', pronunciation: 'kahn-TAR', example: 'Canto una canción.' },
      { en: 'to dance', es: 'bailar', pronunciation: 'by-LAR', example: 'Bailo salsa.' },
      { en: 'to run', es: 'correr', pronunciation: 'koh-RREHR', example: 'Corro en el parque.' },
      { en: 'to walk', es: 'caminar', pronunciation: 'kah-mee-NAR', example: 'Camino a la escuela.' },
      { en: 'to swim', es: 'nadar', pronunciation: 'nah-DAR', example: 'Nado en la piscina.' },
      { en: 'to cook', es: 'cocinar', pronunciation: 'koh-see-NAR', example: 'Cocino pasta.' },
      { en: 'to open', es: 'abrir', pronunciation: 'ah-BREER', example: 'Abro la puerta.' },
      { en: 'to close', es: 'cerrar', pronunciation: 'seh-RRAR', example: 'Cierro la ventana.' },
      { en: 'to think', es: 'pensar', pronunciation: 'pehn-SAR', example: 'Pienso en español.' },
      { en: 'to believe', es: 'creer', pronunciation: 'kreh-EHR', example: 'Creo que es verdad.' },
      { en: 'to understand', es: 'entender', pronunciation: 'ehn-tehn-DEHR', example: 'Entiendo español.' },
      { en: 'to love', es: 'amar', pronunciation: 'ah-MAR', example: 'Amo a mi familia.' },
      { en: 'to like', es: 'gustar', pronunciation: 'goos-TAR', example: 'Me gusta el español.' },
      { en: 'to need', es: 'necesitar', pronunciation: 'neh-seh-see-TAR', example: 'Necesito ayuda.' },
      { en: 'to help', es: 'ayudar', pronunciation: 'ah-yoo-DAR', example: '¿Puedes ayudarme?' },
      { en: 'to wait', es: 'esperar', pronunciation: 'ehs-peh-RAR', example: 'Espero aquí.' },
      { en: 'to pay', es: 'pagar', pronunciation: 'pah-GAR', example: 'Pago la cuenta.' },
      { en: 'to look for', es: 'buscar', pronunciation: 'boos-KAR', example: 'Busco un restaurante.' },
      { en: 'to find', es: 'encontrar', pronunciation: 'ehn-kohn-TRAR', example: 'Encontré las llaves.' },
      { en: 'to take', es: 'tomar', pronunciation: 'toh-MAR', example: 'Tomo café por la mañana.' },
      { en: 'to ask', es: 'preguntar', pronunciation: 'preh-goon-TAR', example: 'Pregunto al profesor.' },
      { en: 'to answer', es: 'responder', pronunciation: 'rehs-pohn-DEHR', example: 'Respondo la pregunta.' }
    ],

    common: [
      { en: 'man', es: 'hombre', pronunciation: 'OHM-breh', example: 'El hombre es alto.' },
      { en: 'woman', es: 'mujer', pronunciation: 'moo-HEHR', example: 'La mujer es inteligente.' },
      { en: 'boy', es: 'niño', pronunciation: 'NEE-nyoh', example: 'El niño juega en el parque.' },
      { en: 'girl', es: 'niña', pronunciation: 'NEE-nyah', example: 'La niña lee un libro.' },
      { en: 'friend', es: 'amigo', pronunciation: 'ah-MEE-goh', example: 'Mi amigo es simpático.' },
      { en: 'person', es: 'persona', pronunciation: 'pehr-SOH-nah', example: 'Es una buena persona.' },
      { en: 'thing', es: 'cosa', pronunciation: 'KOH-sah', example: '¿Qué es esa cosa?' },
      { en: 'place', es: 'lugar', pronunciation: 'loo-GAR', example: 'Es un lugar bonito.' },
      { en: 'world', es: 'mundo', pronunciation: 'MOON-doh', example: 'El mundo es grande.' },
      { en: 'life', es: 'vida', pronunciation: 'VEE-dah', example: 'La vida es bella.' },
      { en: 'work', es: 'trabajo', pronunciation: 'trah-BAH-hoh', example: 'Tengo mucho trabajo.' },
      { en: 'money', es: 'dinero', pronunciation: 'dee-NEH-roh', example: 'No tengo dinero.' },
      { en: 'food', es: 'comida', pronunciation: 'koh-MEE-dah', example: 'La comida está lista.' },
      { en: 'water', es: 'agua', pronunciation: 'AH-gwah', example: 'El agua está fría.' },
      { en: 'name', es: 'nombre', pronunciation: 'NOHM-breh', example: '¿Cuál es tu nombre?' },
      { en: 'problem', es: 'problema', pronunciation: 'proh-BLEH-mah', example: 'No es un problema.' },
      { en: 'music', es: 'música', pronunciation: 'MOO-see-kah', example: 'Me gusta la música.' },
      { en: 'movie', es: 'película', pronunciation: 'peh-LEE-koo-lah', example: 'Vamos a ver una película.' },
      { en: 'game', es: 'juego', pronunciation: 'HWEH-goh', example: 'El juego es divertido.' },
      { en: 'phone', es: 'teléfono', pronunciation: 'teh-LEH-foh-noh', example: '¿Dónde está mi teléfono?' },
      { en: 'computer', es: 'computadora', pronunciation: 'kohm-poo-tah-DOH-rah', example: 'Uso la computadora.' },
      { en: 'store', es: 'tienda', pronunciation: 'tee-EHN-dah', example: 'Voy a la tienda.' },
      { en: 'hospital', es: 'hospital', pronunciation: 'ohs-pee-TAL', example: 'Voy al hospital.' },
      { en: 'church', es: 'iglesia', pronunciation: 'ee-GLEH-see-ah', example: 'La iglesia es bonita.' },
      { en: 'park', es: 'parque', pronunciation: 'PAR-keh', example: 'Vamos al parque.' }
    ],

    // ===================== NEW CATEGORIES =====================

    sports: [
      { en: 'soccer', es: 'fútbol', pronunciation: 'FOOT-bol', example: 'Me gusta jugar al fútbol.' },
      { en: 'basketball', es: 'baloncesto', pronunciation: 'bah-lon-SEHS-toh', example: 'Jugamos baloncesto los sábados.' },
      { en: 'tennis', es: 'tenis', pronunciation: 'TEH-nees', example: 'El tenis es un deporte individual.' },
      { en: 'swimming', es: 'natación', pronunciation: 'nah-tah-see-OHN', example: 'La natación es buena para la salud.' },
      { en: 'baseball', es: 'béisbol', pronunciation: 'BAYS-bol', example: 'El béisbol es popular en Cuba.' },
      { en: 'volleyball', es: 'voleibol', pronunciation: 'boh-lay-BOL', example: 'Jugamos voleibol en la playa.' },
      { en: 'boxing', es: 'boxeo', pronunciation: 'bohk-SEH-oh', example: 'El boxeo requiere mucha disciplina.' },
      { en: 'cycling', es: 'ciclismo', pronunciation: 'see-KLEES-moh', example: 'El ciclismo es popular en España.' },
      { en: 'running', es: 'carrera', pronunciation: 'kah-RREH-rah', example: 'La carrera empieza a las ocho.' },
      { en: 'skiing', es: 'esquí', pronunciation: 'ehs-KEE', example: 'Vamos a esquiar en invierno.' },
      { en: 'gymnastics', es: 'gimnasia', pronunciation: 'heem-NAH-see-ah', example: 'La gimnasia requiere flexibilidad.' },
      { en: 'wrestling', es: 'lucha', pronunciation: 'LOO-chah', example: 'La lucha libre es emocionante.' },
      { en: 'surfing', es: 'surf', pronunciation: 'soorf', example: 'El surf es popular en la costa.' },
      { en: 'rugby', es: 'rugby', pronunciation: 'ROOG-bee', example: 'El rugby es un deporte de contacto.' },
      { en: 'hockey', es: 'hockey', pronunciation: 'OH-kee', example: 'El hockey sobre hielo es rápido.' },
      { en: 'golf', es: 'golf', pronunciation: 'golf', example: 'Mi padre juega al golf.' },
      { en: 'athlete', es: 'atleta', pronunciation: 'aht-LEH-tah', example: 'El atleta entrena todos los días.' },
      { en: 'team', es: 'equipo', pronunciation: 'eh-KEE-poh', example: 'Nuestro equipo ganó el partido.' },
      { en: 'match', es: 'partido', pronunciation: 'par-TEE-doh', example: 'El partido empieza a las tres.' },
      { en: 'score', es: 'puntuación', pronunciation: 'poon-too-ah-see-OHN', example: 'La puntuación final fue tres a uno.' },
      { en: 'trophy', es: 'trofeo', pronunciation: 'troh-FEH-oh', example: 'Ganamos el trofeo de campeones.' },
      { en: 'coach', es: 'entrenador', pronunciation: 'ehn-treh-nah-DOR', example: 'El entrenador nos motiva mucho.' },
      { en: 'referee', es: 'árbitro', pronunciation: 'AR-bee-troh', example: 'El árbitro pitó una falta.' },
      { en: 'stadium', es: 'estadio', pronunciation: 'ehs-TAH-dee-oh', example: 'El estadio está lleno de gente.' },
      { en: 'championship', es: 'campeonato', pronunciation: 'kahm-peh-oh-NAH-toh', example: 'Ganamos el campeonato nacional.' },
      { en: 'medal', es: 'medalla', pronunciation: 'meh-DAH-yah', example: 'Ganó la medalla de oro.' },
      { en: 'to train', es: 'entrenar', pronunciation: 'ehn-treh-NAR', example: 'Entreno tres veces por semana.' },
      { en: 'to win', es: 'ganar', pronunciation: 'gah-NAR', example: '¡Vamos a ganar el partido!' },
      { en: 'to lose', es: 'perder', pronunciation: 'pehr-DEHR', example: 'No me gusta perder.' },
      { en: 'to compete', es: 'competir', pronunciation: 'kohm-peh-TEER', example: 'Voy a competir en la carrera.' },
      { en: 'to exercise', es: 'hacer ejercicio', pronunciation: 'ah-SEHR eh-hehr-SEE-see-oh', example: 'Hago ejercicio cada mañana.' },
      { en: 'ball', es: 'pelota', pronunciation: 'peh-LOH-tah', example: 'Pásame la pelota.' },
      { en: 'goal', es: 'gol', pronunciation: 'gol', example: '¡Gol! ¡Qué golazo!' },
      { en: 'race', es: 'carrera', pronunciation: 'kah-RREH-rah', example: 'La carrera de cien metros.' },
      { en: 'pool', es: 'piscina', pronunciation: 'pee-SEE-nah', example: 'Nado en la piscina del club.' }
    ],

    technology: [
      { en: 'computer', es: 'computadora', pronunciation: 'kohm-poo-tah-DOH-rah', example: 'Trabajo con la computadora.' },
      { en: 'laptop', es: 'portátil', pronunciation: 'por-TAH-teel', example: 'Llevo mi portátil a clase.' },
      { en: 'tablet', es: 'tableta', pronunciation: 'tah-BLEH-tah', example: 'Leo libros en mi tableta.' },
      { en: 'smartphone', es: 'teléfono inteligente', pronunciation: 'teh-LEH-foh-noh een-teh-lee-HEHN-teh', example: 'Todos tienen un teléfono inteligente.' },
      { en: 'screen', es: 'pantalla', pronunciation: 'pahn-TAH-yah', example: 'La pantalla es muy grande.' },
      { en: 'keyboard', es: 'teclado', pronunciation: 'teh-KLAH-doh', example: 'Escribo rápido en el teclado.' },
      { en: 'mouse', es: 'ratón', pronunciation: 'rah-TOHN', example: 'Haz clic con el ratón.' },
      { en: 'printer', es: 'impresora', pronunciation: 'eem-preh-SOH-rah', example: 'La impresora necesita papel.' },
      { en: 'internet', es: 'internet', pronunciation: 'een-tehr-NET', example: 'No tengo conexión a internet.' },
      { en: 'website', es: 'sitio web', pronunciation: 'SEE-tee-oh web', example: 'Visita nuestro sitio web.' },
      { en: 'email', es: 'correo electrónico', pronunciation: 'koh-RREH-oh eh-lehk-TROH-nee-koh', example: 'Te envío un correo electrónico.' },
      { en: 'password', es: 'contraseña', pronunciation: 'kohn-trah-SEH-nyah', example: 'No recuerdo mi contraseña.' },
      { en: 'software', es: 'software', pronunciation: 'SOFT-wehr', example: 'Instalé un nuevo software.' },
      { en: 'application', es: 'aplicación', pronunciation: 'ah-plee-kah-see-OHN', example: 'Descarga la aplicación.' },
      { en: 'download', es: 'descarga', pronunciation: 'dehs-KAR-gah', example: 'La descarga fue rápida.' },
      { en: 'upload', es: 'subir', pronunciation: 'soo-BEER', example: 'Voy a subir las fotos.' },
      { en: 'file', es: 'archivo', pronunciation: 'ar-CHEE-voh', example: 'Guarda el archivo.' },
      { en: 'folder', es: 'carpeta', pronunciation: 'kar-PEH-tah', example: 'Pon los documentos en la carpeta.' },
      { en: 'to search', es: 'buscar', pronunciation: 'boos-KAR', example: 'Busco información en internet.' },
      { en: 'to click', es: 'hacer clic', pronunciation: 'ah-SEHR kleek', example: 'Haz clic en el botón.' },
      { en: 'battery', es: 'batería', pronunciation: 'bah-teh-REE-ah', example: 'La batería está baja.' },
      { en: 'charger', es: 'cargador', pronunciation: 'kar-gah-DOR', example: '¿Tienes un cargador?' },
      { en: 'camera', es: 'cámara', pronunciation: 'KAH-mah-rah', example: 'La cámara tiene buena resolución.' },
      { en: 'video', es: 'vídeo', pronunciation: 'BEE-deh-oh', example: 'Grabé un vídeo.' },
      { en: 'network', es: 'red', pronunciation: 'rehd', example: 'La red wifi no funciona.' },
      { en: 'data', es: 'datos', pronunciation: 'DAH-tohs', example: 'Necesito más datos móviles.' },
      { en: 'to program', es: 'programar', pronunciation: 'proh-grah-MAR', example: 'Estoy aprendiendo a programar.' },
      { en: 'robot', es: 'robot', pronunciation: 'roh-BOT', example: 'Los robots son fascinantes.' },
      { en: 'artificial intelligence', es: 'inteligencia artificial', pronunciation: 'een-teh-lee-HEHN-see-ah ar-tee-fee-see-AHL', example: 'La inteligencia artificial avanza rápido.' },
      { en: 'to connect', es: 'conectar', pronunciation: 'koh-nehk-TAR', example: 'Necesito conectar el wifi.' }
    ],

    medicine: [
      { en: 'doctor', es: 'médico', pronunciation: 'MEH-dee-koh', example: 'Voy al médico mañana.' },
      { en: 'nurse', es: 'enfermero', pronunciation: 'ehn-fehr-MEH-roh', example: 'La enfermera me puso una inyección.' },
      { en: 'patient', es: 'paciente', pronunciation: 'pah-see-EHN-teh', example: 'El paciente está en la sala de espera.' },
      { en: 'hospital', es: 'hospital', pronunciation: 'ohs-pee-TAL', example: 'Lo llevaron al hospital.' },
      { en: 'pharmacy', es: 'farmacia', pronunciation: 'far-MAH-see-ah', example: 'Compré la medicina en la farmacia.' },
      { en: 'medicine', es: 'medicina', pronunciation: 'meh-dee-SEE-nah', example: 'Tomo la medicina dos veces al día.' },
      { en: 'pill', es: 'pastilla', pronunciation: 'pahs-TEE-yah', example: 'Toma una pastilla después de comer.' },
      { en: 'injection', es: 'inyección', pronunciation: 'een-yehk-see-OHN', example: 'Necesito una inyección.' },
      { en: 'fever', es: 'fiebre', pronunciation: 'fee-EH-breh', example: 'Tengo fiebre alta.' },
      { en: 'cough', es: 'tos', pronunciation: 'tohs', example: 'Tengo mucha tos.' },
      { en: 'cold', es: 'resfriado', pronunciation: 'rehs-free-AH-doh', example: 'Tengo un resfriado.' },
      { en: 'flu', es: 'gripe', pronunciation: 'GREE-peh', example: 'La gripe es contagiosa.' },
      { en: 'headache', es: 'dolor de cabeza', pronunciation: 'doh-LOR deh kah-BEH-sah', example: 'Tengo dolor de cabeza.' },
      { en: 'stomachache', es: 'dolor de estómago', pronunciation: 'doh-LOR deh ehs-TOH-mah-goh', example: 'Me duele el estómago.' },
      { en: 'allergy', es: 'alergia', pronunciation: 'ah-LEHR-hee-ah', example: 'Tengo alergia al polen.' },
      { en: 'bandage', es: 'vendaje', pronunciation: 'behn-DAH-heh', example: 'Necesito un vendaje para la herida.' },
      { en: 'surgery', es: 'cirugía', pronunciation: 'see-roo-HEE-ah', example: 'La cirugía fue exitosa.' },
      { en: 'ambulance', es: 'ambulancia', pronunciation: 'ahm-boo-LAHN-see-ah', example: 'Llama a la ambulancia.' },
      { en: 'emergency', es: 'emergencia', pronunciation: 'eh-mehr-HEHN-see-ah', example: 'Es una emergencia médica.' },
      { en: 'appointment', es: 'cita', pronunciation: 'SEE-tah', example: 'Tengo una cita con el médico.' },
      { en: 'symptom', es: 'síntoma', pronunciation: 'SEEN-toh-mah', example: '¿Cuáles son los síntomas?' },
      { en: 'diagnosis', es: 'diagnóstico', pronunciation: 'dee-ahg-NOHS-tee-koh', example: 'El diagnóstico fue positivo.' },
      { en: 'prescription', es: 'receta', pronunciation: 'reh-SEH-tah', example: 'El médico me dio una receta.' },
      { en: 'pain', es: 'dolor', pronunciation: 'doh-LOR', example: 'Siento un dolor fuerte.' },
      { en: 'wound', es: 'herida', pronunciation: 'eh-REE-dah', example: 'La herida necesita puntos.' },
      { en: 'healthy', es: 'sano', pronunciation: 'SAH-noh', example: 'Es importante estar sano.' },
      { en: 'sick', es: 'enfermo', pronunciation: 'ehn-FEHR-moh', example: 'Estoy enfermo hoy.' },
      { en: 'to heal', es: 'curar', pronunciation: 'koo-RAR', example: 'La herida va a curar pronto.' },
      { en: 'vaccine', es: 'vacuna', pronunciation: 'bah-KOO-nah', example: 'Necesito la vacuna contra la gripe.' },
      { en: 'blood', es: 'sangre', pronunciation: 'SAHN-greh', example: 'Necesitan una muestra de sangre.' }
    ],

    music: [
      { en: 'music', es: 'música', pronunciation: 'MOO-see-kah', example: 'Me encanta la música latina.' },
      { en: 'song', es: 'canción', pronunciation: 'kahn-see-OHN', example: 'Esa canción es muy bonita.' },
      { en: 'singer', es: 'cantante', pronunciation: 'kahn-TAHN-teh', example: 'El cantante tiene una voz increíble.' },
      { en: 'guitar', es: 'guitarra', pronunciation: 'gee-TAH-rrah', example: 'Toco la guitarra española.' },
      { en: 'piano', es: 'piano', pronunciation: 'pee-AH-noh', example: 'Estudio piano desde niño.' },
      { en: 'drums', es: 'batería', pronunciation: 'bah-teh-REE-ah', example: 'Juan toca la batería en el grupo.' },
      { en: 'violin', es: 'violín', pronunciation: 'bee-oh-LEEN', example: 'El violín suena hermoso.' },
      { en: 'trumpet', es: 'trompeta', pronunciation: 'trohm-PEH-tah', example: 'La trompeta es muy alegre.' },
      { en: 'flute', es: 'flauta', pronunciation: 'FLAH-oo-tah', example: 'Toco la flauta en la orquesta.' },
      { en: 'band', es: 'banda', pronunciation: 'BAHN-dah', example: 'La banda toca muy bien.' },
      { en: 'concert', es: 'concierto', pronunciation: 'kohn-see-EHR-toh', example: 'Vamos al concierto esta noche.' },
      { en: 'rhythm', es: 'ritmo', pronunciation: 'REET-moh', example: 'La salsa tiene un ritmo contagioso.' },
      { en: 'melody', es: 'melodía', pronunciation: 'meh-loh-DEE-ah', example: 'La melodía es muy pegajosa.' },
      { en: 'to sing', es: 'cantar', pronunciation: 'kahn-TAR', example: 'Me gusta cantar en la ducha.' },
      { en: 'to dance', es: 'bailar', pronunciation: 'bah-ee-LAR', example: '¡Vamos a bailar salsa!' },
      { en: 'to play (instrument)', es: 'tocar', pronunciation: 'toh-KAR', example: 'Toco el piano todas las tardes.' },
      { en: 'to listen', es: 'escuchar', pronunciation: 'ehs-koo-CHAR', example: 'Escucho música mientras estudio.' },
      { en: 'orchestra', es: 'orquesta', pronunciation: 'or-KEHS-tah', example: 'La orquesta sinfónica es magnífica.' },
      { en: 'lyrics', es: 'letra', pronunciation: 'LEH-trah', example: 'La letra de esta canción es profunda.' },
      { en: 'chorus', es: 'coro', pronunciation: 'KOH-roh', example: 'Canto en el coro de la iglesia.' },
      { en: 'genre', es: 'género', pronunciation: 'HEH-neh-roh', example: 'Mi género favorito es el rock.' },
      { en: 'album', es: 'álbum', pronunciation: 'AHL-boom', example: 'El nuevo álbum es excelente.' },
      { en: 'to compose', es: 'componer', pronunciation: 'kohm-poh-NEHR', example: 'Quiero componer una canción.' },
      { en: 'saxophone', es: 'saxofón', pronunciation: 'sahk-soh-FOHN', example: 'El saxofón tiene un sonido suave.' },
      { en: 'harmonica', es: 'armónica', pronunciation: 'ar-MOH-nee-kah', example: 'Aprendió a tocar la armónica.' }
    ],

    art: [
      { en: 'art', es: 'arte', pronunciation: 'AR-teh', example: 'El arte es una forma de expresión.' },
      { en: 'painting', es: 'pintura', pronunciation: 'peen-TOO-rah', example: 'La pintura es de Picasso.' },
      { en: 'drawing', es: 'dibujo', pronunciation: 'dee-BOO-hoh', example: 'Hizo un dibujo hermoso.' },
      { en: 'sculpture', es: 'escultura', pronunciation: 'ehs-kool-TOO-rah', example: 'La escultura está en el museo.' },
      { en: 'museum', es: 'museo', pronunciation: 'moo-SEH-oh', example: 'Visitamos el museo del Prado.' },
      { en: 'gallery', es: 'galería', pronunciation: 'gah-leh-REE-ah', example: 'La galería tiene obras modernas.' },
      { en: 'artist', es: 'artista', pronunciation: 'ar-TEES-tah', example: 'El artista es muy talentoso.' },
      { en: 'painter', es: 'pintor', pronunciation: 'peen-TOR', example: 'Frida Kahlo fue una gran pintora.' },
      { en: 'brush', es: 'pincel', pronunciation: 'peen-SEL', example: 'Necesito un pincel más fino.' },
      { en: 'canvas', es: 'lienzo', pronunciation: 'lee-EHN-soh', example: 'Pintó sobre un lienzo grande.' },
      { en: 'color', es: 'color', pronunciation: 'koh-LOR', example: 'Me gusta el color azul.' },
      { en: 'to paint', es: 'pintar', pronunciation: 'peen-TAR', example: 'Me gusta pintar paisajes.' },
      { en: 'to draw', es: 'dibujar', pronunciation: 'dee-boo-HAR', example: 'Dibuja retratos increíbles.' },
      { en: 'to create', es: 'crear', pronunciation: 'kreh-AR', example: 'Quiero crear algo nuevo.' },
      { en: 'exhibition', es: 'exposición', pronunciation: 'ehks-poh-see-see-OHN', example: 'La exposición abre mañana.' },
      { en: 'photograph', es: 'fotografía', pronunciation: 'foh-toh-grah-FEE-ah', example: 'La fotografía captura el momento.' },
      { en: 'portrait', es: 'retrato', pronunciation: 'reh-TRAH-toh', example: 'Pintó un retrato de su madre.' },
      { en: 'landscape', es: 'paisaje', pronunciation: 'pah-ee-SAH-heh', example: 'El paisaje es impresionante.' },
      { en: 'masterpiece', es: 'obra maestra', pronunciation: 'OH-brah mah-EHS-trah', example: 'El Guernica es una obra maestra.' },
      { en: 'pottery', es: 'cerámica', pronunciation: 'seh-RAH-mee-kah', example: 'La cerámica mexicana es colorida.' }
    ],

    science: [
      { en: 'science', es: 'ciencia', pronunciation: 'see-EHN-see-ah', example: 'La ciencia avanza cada día.' },
      { en: 'scientist', es: 'científico', pronunciation: 'see-ehn-TEE-fee-koh', example: 'El científico hizo un descubrimiento.' },
      { en: 'experiment', es: 'experimento', pronunciation: 'ehks-peh-ree-MEHN-toh', example: 'El experimento fue exitoso.' },
      { en: 'laboratory', es: 'laboratorio', pronunciation: 'lah-boh-rah-TOH-ree-oh', example: 'Trabajo en el laboratorio.' },
      { en: 'research', es: 'investigación', pronunciation: 'een-behs-tee-gah-see-OHN', example: 'La investigación es importante.' },
      { en: 'discovery', es: 'descubrimiento', pronunciation: 'dehs-koo-bree-mee-EHN-toh', example: 'Fue un gran descubrimiento.' },
      { en: 'theory', es: 'teoría', pronunciation: 'teh-oh-REE-ah', example: 'La teoría de la relatividad.' },
      { en: 'hypothesis', es: 'hipótesis', pronunciation: 'ee-POH-teh-sees', example: 'Necesitamos probar la hipótesis.' },
      { en: 'atom', es: 'átomo', pronunciation: 'AH-toh-moh', example: 'El átomo es la unidad básica.' },
      { en: 'molecule', es: 'molécula', pronunciation: 'moh-LEH-koo-lah', example: 'El agua es una molécula.' },
      { en: 'energy', es: 'energía', pronunciation: 'eh-nehr-HEE-ah', example: 'La energía solar es renovable.' },
      { en: 'gravity', es: 'gravedad', pronunciation: 'grah-beh-DAD', example: 'La gravedad nos mantiene en la tierra.' },
      { en: 'planet', es: 'planeta', pronunciation: 'plah-NEH-tah', example: 'La Tierra es nuestro planeta.' },
      { en: 'star', es: 'estrella', pronunciation: 'ehs-TREH-yah', example: 'El sol es una estrella.' },
      { en: 'moon', es: 'luna', pronunciation: 'LOO-nah', example: 'La luna llena es hermosa.' },
      { en: 'sun', es: 'sol', pronunciation: 'sol', example: 'El sol brilla con fuerza.' },
      { en: 'earth', es: 'tierra', pronunciation: 'tee-EH-rrah', example: 'La Tierra gira alrededor del sol.' },
      { en: 'chemistry', es: 'química', pronunciation: 'KEE-mee-kah', example: 'Estudio química en la universidad.' },
      { en: 'physics', es: 'física', pronunciation: 'FEE-see-kah', example: 'La física es fascinante.' },
      { en: 'biology', es: 'biología', pronunciation: 'bee-oh-loh-HEE-ah', example: 'La biología estudia los seres vivos.' },
      { en: 'mathematics', es: 'matemáticas', pronunciation: 'mah-teh-MAH-tee-kahs', example: 'Las matemáticas son universales.' },
      { en: 'evolution', es: 'evolución', pronunciation: 'eh-boh-loo-see-OHN', example: 'La teoría de la evolución.' },
      { en: 'cell', es: 'célula', pronunciation: 'SEH-loo-lah', example: 'La célula es la unidad de vida.' },
      { en: 'to investigate', es: 'investigar', pronunciation: 'een-behs-tee-GAR', example: 'Vamos a investigar el problema.' },
      { en: 'to discover', es: 'descubrir', pronunciation: 'dehs-koo-BREER', example: 'Descubrieron una nueva especie.' }
    ],

    business: [
      { en: 'company', es: 'empresa', pronunciation: 'ehm-PREH-sah', example: 'Trabajo en una empresa grande.' },
      { en: 'office', es: 'oficina', pronunciation: 'oh-fee-SEE-nah', example: 'La oficina está en el centro.' },
      { en: 'boss', es: 'jefe', pronunciation: 'HEH-feh', example: 'Mi jefe es muy amable.' },
      { en: 'employee', es: 'empleado', pronunciation: 'ehm-pleh-AH-doh', example: 'Somos cien empleados.' },
      { en: 'salary', es: 'salario', pronunciation: 'sah-LAH-ree-oh', example: 'El salario es mensual.' },
      { en: 'meeting', es: 'reunión', pronunciation: 'reh-oo-nee-OHN', example: 'Tenemos una reunión a las diez.' },
      { en: 'contract', es: 'contrato', pronunciation: 'kohn-TRAH-toh', example: 'Firmé el contrato ayer.' },
      { en: 'client', es: 'cliente', pronunciation: 'klee-EHN-teh', example: 'El cliente siempre tiene la razón.' },
      { en: 'market', es: 'mercado', pronunciation: 'mehr-KAH-doh', example: 'El mercado está creciendo.' },
      { en: 'price', es: 'precio', pronunciation: 'PREH-see-oh', example: '¿Cuál es el precio?' },
      { en: 'profit', es: 'ganancia', pronunciation: 'gah-NAHN-see-ah', example: 'La ganancia fue muy buena.' },
      { en: 'investment', es: 'inversión', pronunciation: 'een-behr-see-OHN', example: 'Es una buena inversión.' },
      { en: 'bank', es: 'banco', pronunciation: 'BAHN-koh', example: 'Voy al banco a depositar dinero.' },
      { en: 'account', es: 'cuenta', pronunciation: 'KWEHN-tah', example: 'Abrí una cuenta de ahorros.' },
      { en: 'tax', es: 'impuesto', pronunciation: 'eem-PWEHS-toh', example: 'Los impuestos son altos.' },
      { en: 'debt', es: 'deuda', pronunciation: 'DEH-oo-dah', example: 'Pagué toda mi deuda.' },
      { en: 'loan', es: 'préstamo', pronunciation: 'PREHS-tah-moh', example: 'Solicité un préstamo bancario.' },
      { en: 'to sell', es: 'vender', pronunciation: 'behn-DEHR', example: 'Vendemos productos de calidad.' },
      { en: 'to buy', es: 'comprar', pronunciation: 'kohm-PRAR', example: 'Quiero comprar un coche nuevo.' },
      { en: 'to negotiate', es: 'negociar', pronunciation: 'neh-goh-see-AR', example: 'Vamos a negociar el precio.' },
      { en: 'to manage', es: 'gestionar', pronunciation: 'hehs-tee-oh-NAR', example: 'Gestiono el departamento de ventas.' },
      { en: 'budget', es: 'presupuesto', pronunciation: 'preh-soo-PWEHS-toh', example: 'El presupuesto es limitado.' },
      { en: 'receipt', es: 'recibo', pronunciation: 'reh-SEE-boh', example: 'Guarda el recibo de compra.' },
      { en: 'invoice', es: 'factura', pronunciation: 'fak-TOO-rah', example: 'Necesito la factura, por favor.' },
      { en: 'economy', es: 'economía', pronunciation: 'eh-koh-noh-MEE-ah', example: 'La economía está mejorando.' }
    ],

    cooking: [
      { en: 'kitchen', es: 'cocina', pronunciation: 'koh-SEE-nah', example: 'La cocina está limpia.' },
      { en: 'recipe', es: 'receta', pronunciation: 'reh-SEH-tah', example: 'Esta receta es de mi abuela.' },
      { en: 'ingredient', es: 'ingrediente', pronunciation: 'een-greh-dee-EHN-teh', example: 'Necesito los ingredientes.' },
      { en: 'pot', es: 'olla', pronunciation: 'OH-yah', example: 'Pon el agua en la olla.' },
      { en: 'pan', es: 'sartén', pronunciation: 'sar-TEHN', example: 'Fríe el huevo en la sartén.' },
      { en: 'oven', es: 'horno', pronunciation: 'OR-noh', example: 'Precalienta el horno a 180 grados.' },
      { en: 'stove', es: 'estufa', pronunciation: 'ehs-TOO-fah', example: 'Cocina en la estufa a fuego lento.' },
      { en: 'knife', es: 'cuchillo', pronunciation: 'koo-CHEE-yoh', example: 'Corta las verduras con el cuchillo.' },
      { en: 'fork', es: 'tenedor', pronunciation: 'teh-neh-DOR', example: 'Usa el tenedor para comer.' },
      { en: 'spoon', es: 'cuchara', pronunciation: 'koo-CHAH-rah', example: 'Una cuchara de azúcar.' },
      { en: 'plate', es: 'plato', pronunciation: 'PLAH-toh', example: 'Sirve la comida en el plato.' },
      { en: 'cup', es: 'taza', pronunciation: 'TAH-sah', example: 'Una taza de café, por favor.' },
      { en: 'glass', es: 'vaso', pronunciation: 'BAH-soh', example: 'Un vaso de agua, por favor.' },
      { en: 'bowl', es: 'tazón', pronunciation: 'tah-SOHN', example: 'Sirve la sopa en el tazón.' },
      { en: 'to cook', es: 'cocinar', pronunciation: 'koh-see-NAR', example: 'Me encanta cocinar.' },
      { en: 'to boil', es: 'hervir', pronunciation: 'ehr-BEER', example: 'Hierve el agua primero.' },
      { en: 'to fry', es: 'freír', pronunciation: 'freh-EER', example: 'Fríe las papas en aceite.' },
      { en: 'to bake', es: 'hornear', pronunciation: 'or-neh-AR', example: 'Voy a hornear un pastel.' },
      { en: 'to mix', es: 'mezclar', pronunciation: 'mehs-KLAR', example: 'Mezcla los ingredientes.' },
      { en: 'to cut', es: 'cortar', pronunciation: 'kor-TAR', example: 'Corta la cebolla en trozos.' },
      { en: 'to taste', es: 'probar', pronunciation: 'proh-BAR', example: 'Prueba la sopa.' },
      { en: 'to serve', es: 'servir', pronunciation: 'sehr-BEER', example: 'Sirve la cena a las ocho.' },
      { en: 'salt', es: 'sal', pronunciation: 'sahl', example: 'Añade un poco de sal.' },
      { en: 'pepper', es: 'pimienta', pronunciation: 'pee-mee-EHN-tah', example: 'Un poco de pimienta, por favor.' },
      { en: 'oil', es: 'aceite', pronunciation: 'ah-SAY-teh', example: 'Usa aceite de oliva.' },
      { en: 'sugar', es: 'azúcar', pronunciation: 'ah-SOO-kar', example: 'No me gusta mucho azúcar.' },
      { en: 'flour', es: 'harina', pronunciation: 'ah-REE-nah', example: 'Necesito harina para la torta.' },
      { en: 'butter', es: 'mantequilla', pronunciation: 'mahn-teh-KEE-yah', example: 'Pon mantequilla en el pan.' },
      { en: 'garlic', es: 'ajo', pronunciation: 'AH-hoh', example: 'El ajo le da mucho sabor.' },
      { en: 'onion', es: 'cebolla', pronunciation: 'seh-BOH-yah', example: 'Corta la cebolla en rodajas.' }
    ],

    furniture: [
      { en: 'table', es: 'mesa', pronunciation: 'MEH-sah', example: 'Pon los libros en la mesa.' },
      { en: 'chair', es: 'silla', pronunciation: 'SEE-yah', example: 'Siéntate en la silla.' },
      { en: 'sofa', es: 'sofá', pronunciation: 'soh-FAH', example: 'Descansa en el sofá.' },
      { en: 'bed', es: 'cama', pronunciation: 'KAH-mah', example: 'La cama es muy cómoda.' },
      { en: 'desk', es: 'escritorio', pronunciation: 'ehs-kree-TOH-ree-oh', example: 'Estudio en mi escritorio.' },
      { en: 'wardrobe', es: 'armario', pronunciation: 'ar-MAH-ree-oh', example: 'La ropa está en el armario.' },
      { en: 'shelf', es: 'estante', pronunciation: 'ehs-TAHN-teh', example: 'Los libros están en el estante.' },
      { en: 'drawer', es: 'cajón', pronunciation: 'kah-HOHN', example: 'Guarda las llaves en el cajón.' },
      { en: 'mirror', es: 'espejo', pronunciation: 'ehs-PEH-hoh', example: 'Se mira en el espejo.' },
      { en: 'lamp', es: 'lámpara', pronunciation: 'LAHM-pah-rah', example: 'Enciende la lámpara, por favor.' },
      { en: 'carpet', es: 'alfombra', pronunciation: 'ahl-FOHM-brah', example: 'La alfombra es muy suave.' },
      { en: 'curtain', es: 'cortina', pronunciation: 'kor-TEE-nah', example: 'Cierra las cortinas.' },
      { en: 'pillow', es: 'almohada', pronunciation: 'ahl-moh-AH-dah', example: 'Necesito dos almohadas.' },
      { en: 'blanket', es: 'manta', pronunciation: 'MAHN-tah', example: 'Hace frío, trae una manta.' },
      { en: 'bookshelf', es: 'librería', pronunciation: 'lee-breh-REE-ah', example: 'La librería está llena de libros.' },
      { en: 'nightstand', es: 'mesita de noche', pronunciation: 'meh-SEE-tah deh NOH-cheh', example: 'Deja el vaso en la mesita de noche.' },
      { en: 'couch', es: 'diván', pronunciation: 'dee-BAHN', example: 'Lee un libro en el diván.' },
      { en: 'rug', es: 'tapete', pronunciation: 'tah-PEH-teh', example: 'El tapete decora la sala.' },
      { en: 'clock', es: 'reloj', pronunciation: 'reh-LOH', example: 'El reloj marca las cinco.' },
      { en: 'vase', es: 'jarrón', pronunciation: 'hah-RROHN', example: 'Pon las flores en el jarrón.' }
    ],

    garden: [
      { en: 'garden', es: 'jardín', pronunciation: 'har-DEEN', example: 'El jardín está lleno de flores.' },
      { en: 'flower', es: 'flor', pronunciation: 'flor', example: 'La flor es muy bonita.' },
      { en: 'tree', es: 'árbol', pronunciation: 'AR-bol', example: 'El árbol es muy alto.' },
      { en: 'plant', es: 'planta', pronunciation: 'PLAHN-tah', example: 'Riego las plantas cada día.' },
      { en: 'grass', es: 'césped', pronunciation: 'SEHS-pehd', example: 'El césped está verde.' },
      { en: 'seed', es: 'semilla', pronunciation: 'seh-MEE-yah', example: 'Planto semillas en primavera.' },
      { en: 'root', es: 'raíz', pronunciation: 'rah-EES', example: 'Las raíces son profundas.' },
      { en: 'leaf', es: 'hoja', pronunciation: 'OH-hah', example: 'Las hojas caen en otoño.' },
      { en: 'branch', es: 'rama', pronunciation: 'RAH-mah', example: 'El pájaro está en la rama.' },
      { en: 'bush', es: 'arbusto', pronunciation: 'ar-BOOS-toh', example: 'El arbusto necesita poda.' },
      { en: 'rose', es: 'rosa', pronunciation: 'ROH-sah', example: 'Le regalé una rosa roja.' },
      { en: 'sunflower', es: 'girasol', pronunciation: 'hee-rah-SOL', example: 'Los girasoles miran al sol.' },
      { en: 'to water', es: 'regar', pronunciation: 'reh-GAR', example: 'Necesito regar las plantas.' },
      { en: 'to plant', es: 'plantar', pronunciation: 'plahn-TAR', example: 'Vamos a plantar tomates.' },
      { en: 'to grow', es: 'crecer', pronunciation: 'kreh-SEHR', example: 'Las plantas crecen rápido.' },
      { en: 'soil', es: 'tierra', pronunciation: 'tee-EH-rrah', example: 'La tierra está húmeda.' },
      { en: 'fence', es: 'cerca', pronunciation: 'SEHR-kah', example: 'La cerca rodea el jardín.' },
      { en: 'to harvest', es: 'cosechar', pronunciation: 'koh-seh-CHAR', example: 'Es hora de cosechar los tomates.' },
      { en: 'fertilizer', es: 'abono', pronunciation: 'ah-BOH-noh', example: 'Usa abono orgánico.' },
      { en: 'hose', es: 'manguera', pronunciation: 'mahn-GEH-rah', example: 'Riega con la manguera.' }
    ],

    vehicles: [
      { en: 'car', es: 'coche', pronunciation: 'KOH-cheh', example: 'Mi coche es rojo.' },
      { en: 'bus', es: 'autobús', pronunciation: 'ah-oo-toh-BOOS', example: 'Tomo el autobús al trabajo.' },
      { en: 'train', es: 'tren', pronunciation: 'trehn', example: 'El tren llega a las cinco.' },
      { en: 'airplane', es: 'avión', pronunciation: 'ah-bee-OHN', example: 'El avión sale a las ocho.' },
      { en: 'bicycle', es: 'bicicleta', pronunciation: 'bee-see-KLEH-tah', example: 'Voy al trabajo en bicicleta.' },
      { en: 'motorcycle', es: 'motocicleta', pronunciation: 'moh-toh-see-KLEH-tah', example: 'Tiene una motocicleta rápida.' },
      { en: 'truck', es: 'camión', pronunciation: 'kah-mee-OHN', example: 'El camión lleva mercancías.' },
      { en: 'boat', es: 'barco', pronunciation: 'BAR-koh', example: 'El barco cruza el océano.' },
      { en: 'ship', es: 'nave', pronunciation: 'NAH-beh', example: 'La nave es enorme.' },
      { en: 'helicopter', es: 'helicóptero', pronunciation: 'eh-lee-KOHP-teh-roh', example: 'El helicóptero aterrizó en el tejado.' },
      { en: 'subway', es: 'metro', pronunciation: 'MEH-troh', example: 'El metro es rápido y barato.' },
      { en: 'taxi', es: 'taxi', pronunciation: 'TAHK-see', example: 'Tomamos un taxi al aeropuerto.' },
      { en: 'ambulance', es: 'ambulancia', pronunciation: 'ahm-boo-LAHN-see-ah', example: 'La ambulancia llegó rápido.' },
      { en: 'fire truck', es: 'camión de bomberos', pronunciation: 'kah-mee-OHN deh bohm-BEH-rohs', example: 'El camión de bomberos tiene sirena.' },
      { en: 'van', es: 'furgoneta', pronunciation: 'foor-goh-NEH-tah', example: 'La furgoneta es para mudanzas.' },
      { en: 'scooter', es: 'patinete', pronunciation: 'pah-tee-NEH-teh', example: 'Los niños montan en patinete.' },
      { en: 'tire', es: 'neumático', pronunciation: 'neh-oo-MAH-tee-koh', example: 'El neumático está desinflado.' },
      { en: 'engine', es: 'motor', pronunciation: 'moh-TOR', example: 'El motor hace un ruido raro.' },
      { en: 'steering wheel', es: 'volante', pronunciation: 'boh-LAHN-teh', example: 'Agarra bien el volante.' },
      { en: 'gas station', es: 'gasolinera', pronunciation: 'gah-soh-lee-NEH-rah', example: 'Necesito parar en la gasolinera.' }
    ],

    marine: [
      { en: 'ocean', es: 'océano', pronunciation: 'oh-SEH-ah-noh', example: 'El océano Pacífico es enorme.' },
      { en: 'sea', es: 'mar', pronunciation: 'mar', example: 'Me gusta nadar en el mar.' },
      { en: 'beach', es: 'playa', pronunciation: 'PLAH-yah', example: 'Vamos a la playa este verano.' },
      { en: 'fish', es: 'pez', pronunciation: 'pehs', example: 'El pez nada en el río.' },
      { en: 'whale', es: 'ballena', pronunciation: 'bah-YEH-nah', example: 'La ballena azul es el animal más grande.' },
      { en: 'dolphin', es: 'delfín', pronunciation: 'dehl-FEEN', example: 'Los delfines son muy inteligentes.' },
      { en: 'shark', es: 'tiburón', pronunciation: 'tee-boo-ROHN', example: 'El tiburón vive en aguas profundas.' },
      { en: 'turtle', es: 'tortuga', pronunciation: 'tor-TOO-gah', example: 'La tortuga marina pone huevos en la playa.' },
      { en: 'octopus', es: 'pulpo', pronunciation: 'POOL-poh', example: 'El pulpo tiene ocho tentáculos.' },
      { en: 'starfish', es: 'estrella de mar', pronunciation: 'ehs-TREH-yah deh mar', example: 'Encontré una estrella de mar.' },
      { en: 'coral', es: 'coral', pronunciation: 'koh-RAL', example: 'Los arrecifes de coral son coloridos.' },
      { en: 'seashell', es: 'concha', pronunciation: 'KOHN-chah', example: 'Colecciono conchas de la playa.' },
      { en: 'wave', es: 'ola', pronunciation: 'OH-lah', example: 'Las olas son muy grandes hoy.' },
      { en: 'island', es: 'isla', pronunciation: 'EES-lah', example: 'La isla es tropical.' },
      { en: 'lighthouse', es: 'faro', pronunciation: 'FAH-roh', example: 'El faro guía a los barcos.' },
      { en: 'sailor', es: 'marinero', pronunciation: 'mah-ree-NEH-roh', example: 'El marinero navega por el mundo.' },
      { en: 'anchor', es: 'ancla', pronunciation: 'AHN-klah', example: 'Levanta el ancla del barco.' },
      { en: 'jellyfish', es: 'medusa', pronunciation: 'meh-DOO-sah', example: 'Cuidado con las medusas.' },
      { en: 'crab', es: 'cangrejo', pronunciation: 'kahn-GREH-hoh', example: 'El cangrejo camina de lado.' },
      { en: 'lobster', es: 'langosta', pronunciation: 'lahn-GOHS-tah', example: 'La langosta es un manjar.' }
    ],

    insects: [
      { en: 'insect', es: 'insecto', pronunciation: 'een-SEHK-toh', example: 'Hay muchos insectos en el jardín.' },
      { en: 'butterfly', es: 'mariposa', pronunciation: 'mah-ree-POH-sah', example: 'La mariposa tiene alas coloridas.' },
      { en: 'bee', es: 'abeja', pronunciation: 'ah-BEH-hah', example: 'Las abejas producen miel.' },
      { en: 'ant', es: 'hormiga', pronunciation: 'or-MEE-gah', example: 'Las hormigas son muy trabajadoras.' },
      { en: 'mosquito', es: 'mosquito', pronunciation: 'mohs-KEE-toh', example: 'Los mosquitos pican mucho.' },
      { en: 'spider', es: 'araña', pronunciation: 'ah-RAH-nyah', example: 'La araña teje su red.' },
      { en: 'fly', es: 'mosca', pronunciation: 'MOHS-kah', example: 'La mosca es molesta.' },
      { en: 'beetle', es: 'escarabajo', pronunciation: 'ehs-kah-rah-BAH-hoh', example: 'El escarabajo es un insecto fuerte.' },
      { en: 'ladybug', es: 'mariquita', pronunciation: 'mah-ree-KEE-tah', example: 'La mariquita trae buena suerte.' },
      { en: 'dragonfly', es: 'libélula', pronunciation: 'lee-BEH-loo-lah', example: 'La libélula vuela sobre el lago.' },
      { en: 'grasshopper', es: 'saltamontes', pronunciation: 'sahl-tah-MOHN-tehs', example: 'El saltamontes salta muy alto.' },
      { en: 'caterpillar', es: 'oruga', pronunciation: 'oh-ROO-gah', example: 'La oruga se convierte en mariposa.' },
      { en: 'cockroach', es: 'cucaracha', pronunciation: 'koo-kah-RAH-chah', example: 'Hay una cucaracha en la cocina.' },
      { en: 'wasp', es: 'avispa', pronunciation: 'ah-BEES-pah', example: 'Cuidado con las avispas.' },
      { en: 'worm', es: 'gusano', pronunciation: 'goo-SAH-noh', example: 'El gusano vive en la tierra.' },
      { en: 'firefly', es: 'luciérnaga', pronunciation: 'loo-see-EHR-nah-gah', example: 'Las luciérnagas brillan de noche.' },
      { en: 'snail', es: 'caracol', pronunciation: 'kah-rah-KOL', example: 'El caracol es muy lento.' },
      { en: 'cricket', es: 'grillo', pronunciation: 'GREE-yoh', example: 'Los grillos cantan por la noche.' },
      { en: 'moth', es: 'polilla', pronunciation: 'poh-LEE-yah', example: 'La polilla vuela hacia la luz.' },
      { en: 'scorpion', es: 'escorpión', pronunciation: 'ehs-kor-pee-OHN', example: 'El escorpión es peligroso.' }
    ],

    geography: [
      { en: 'country', es: 'país', pronunciation: 'pah-EES', example: 'España es un país europeo.' },
      { en: 'city', es: 'ciudad', pronunciation: 'see-oo-DAD', example: 'Madrid es una ciudad grande.' },
      { en: 'town', es: 'pueblo', pronunciation: 'PWEH-bloh', example: 'El pueblo es muy tranquilo.' },
      { en: 'mountain', es: 'montaña', pronunciation: 'mohn-TAH-nyah', example: 'Las montañas están cubiertas de nieve.' },
      { en: 'river', es: 'río', pronunciation: 'RREE-oh', example: 'El río fluye hacia el mar.' },
      { en: 'lake', es: 'lago', pronunciation: 'LAH-goh', example: 'El lago es cristalino.' },
      { en: 'forest', es: 'bosque', pronunciation: 'BOHS-keh', example: 'El bosque está lleno de árboles.' },
      { en: 'desert', es: 'desierto', pronunciation: 'deh-see-EHR-toh', example: 'El desierto del Sahara es enorme.' },
      { en: 'valley', es: 'valle', pronunciation: 'BAH-yeh', example: 'El valle es muy fértil.' },
      { en: 'volcano', es: 'volcán', pronunciation: 'bol-KAHN', example: 'El volcán entró en erupción.' },
      { en: 'continent', es: 'continente', pronunciation: 'kohn-tee-NEHN-teh', example: 'América es un continente grande.' },
      { en: 'border', es: 'frontera', pronunciation: 'frohn-TEH-rah', example: 'La frontera entre los dos países.' },
      { en: 'capital', es: 'capital', pronunciation: 'kah-pee-TAL', example: 'Buenos Aires es la capital de Argentina.' },
      { en: 'coast', es: 'costa', pronunciation: 'KOHS-tah', example: 'La costa es muy hermosa.' },
      { en: 'hill', es: 'colina', pronunciation: 'koh-LEE-nah', example: 'Subimos la colina.' },
      { en: 'cave', es: 'cueva', pronunciation: 'KWEH-bah', example: 'Exploramos una cueva antigua.' },
      { en: 'waterfall', es: 'cascada', pronunciation: 'kahs-KAH-dah', example: 'La cascada es impresionante.' },
      { en: 'cliff', es: 'acantilado', pronunciation: 'ah-kahn-tee-LAH-doh', example: 'El acantilado tiene vista al mar.' },
      { en: 'peninsula', es: 'península', pronunciation: 'peh-NEEN-soo-lah', example: 'España está en la Península Ibérica.' },
      { en: 'jungle', es: 'selva', pronunciation: 'SEHL-bah', example: 'La selva amazónica es impresionante.' },
      { en: 'glacier', es: 'glaciar', pronunciation: 'glah-see-AR', example: 'El glaciar se está derritiendo.' },
      { en: 'earthquake', es: 'terremoto', pronunciation: 'teh-rreh-MOH-toh', example: 'El terremoto fue muy fuerte.' },
      { en: 'north', es: 'norte', pronunciation: 'NOR-teh', example: 'La brújula señala al norte.' },
      { en: 'south', es: 'sur', pronunciation: 'soor', example: 'Viajamos al sur del país.' },
      { en: 'east', es: 'este', pronunciation: 'EHS-teh', example: 'El sol sale por el este.' },
      { en: 'west', es: 'oeste', pronunciation: 'oh-EHS-teh', example: 'El sol se pone por el oeste.' },
      { en: 'map', es: 'mapa', pronunciation: 'MAH-pah', example: 'Mira el mapa para encontrar el camino.' }
    ],

    materials: [
      { en: 'wood', es: 'madera', pronunciation: 'mah-DEH-rah', example: 'La mesa es de madera.' },
      { en: 'metal', es: 'metal', pronunciation: 'meh-TAL', example: 'La puerta es de metal.' },
      { en: 'glass', es: 'vidrio', pronunciation: 'BEE-dree-oh', example: 'El vaso es de vidrio.' },
      { en: 'plastic', es: 'plástico', pronunciation: 'PLAHS-tee-koh', example: 'Reduce el uso de plástico.' },
      { en: 'paper', es: 'papel', pronunciation: 'pah-PEL', example: 'Necesito una hoja de papel.' },
      { en: 'stone', es: 'piedra', pronunciation: 'pee-EH-drah', example: 'La casa es de piedra.' },
      { en: 'gold', es: 'oro', pronunciation: 'OH-roh', example: 'El anillo es de oro.' },
      { en: 'silver', es: 'plata', pronunciation: 'PLAH-tah', example: 'La plata es un metal precioso.' },
      { en: 'iron', es: 'hierro', pronunciation: 'ee-EH-rroh', example: 'La reja es de hierro.' },
      { en: 'steel', es: 'acero', pronunciation: 'ah-SEH-roh', example: 'El puente es de acero.' },
      { en: 'cotton', es: 'algodón', pronunciation: 'ahl-goh-DOHN', example: 'La camisa es de algodón.' },
      { en: 'leather', es: 'cuero', pronunciation: 'KWEH-roh', example: 'Los zapatos son de cuero.' },
      { en: 'rubber', es: 'goma', pronunciation: 'GOH-mah', example: 'Las botas son de goma.' },
      { en: 'clay', es: 'arcilla', pronunciation: 'ar-SEE-yah', example: 'La vasija es de arcilla.' },
      { en: 'brick', es: 'ladrillo', pronunciation: 'lah-DREE-yoh', example: 'La pared es de ladrillo.' },
      { en: 'cement', es: 'cemento', pronunciation: 'seh-MEHN-toh', example: 'Mezcla el cemento con agua.' },
      { en: 'silk', es: 'seda', pronunciation: 'SEH-dah', example: 'El vestido es de seda.' },
      { en: 'wool', es: 'lana', pronunciation: 'LAH-nah', example: 'El suéter es de lana.' },
      { en: 'diamond', es: 'diamante', pronunciation: 'dee-ah-MAHN-teh', example: 'El diamante brilla mucho.' },
      { en: 'copper', es: 'cobre', pronunciation: 'KOH-breh', example: 'Los cables son de cobre.' }
    ],

    shapes: [
      { en: 'circle', es: 'círculo', pronunciation: 'SEER-koo-loh', example: 'Dibuja un círculo.' },
      { en: 'square', es: 'cuadrado', pronunciation: 'kwah-DRAH-doh', example: 'La caja tiene forma de cuadrado.' },
      { en: 'triangle', es: 'triángulo', pronunciation: 'tree-AHN-goo-loh', example: 'Un triángulo tiene tres lados.' },
      { en: 'rectangle', es: 'rectángulo', pronunciation: 'rehk-TAHN-goo-loh', example: 'La puerta es un rectángulo.' },
      { en: 'star', es: 'estrella', pronunciation: 'ehs-TREH-yah', example: 'Dibuja una estrella de cinco puntas.' },
      { en: 'heart', es: 'corazón', pronunciation: 'koh-rah-SOHN', example: 'Dibujó un corazón rojo.' },
      { en: 'diamond', es: 'rombo', pronunciation: 'ROHM-boh', example: 'Un rombo tiene cuatro lados iguales.' },
      { en: 'oval', es: 'óvalo', pronunciation: 'OH-bah-loh', example: 'El espejo tiene forma de óvalo.' },
      { en: 'sphere', es: 'esfera', pronunciation: 'ehs-FEH-rah', example: 'La Tierra es una esfera.' },
      { en: 'cube', es: 'cubo', pronunciation: 'KOO-boh', example: 'El cubo tiene seis caras.' },
      { en: 'cylinder', es: 'cilindro', pronunciation: 'see-LEEN-droh', example: 'La lata tiene forma de cilindro.' },
      { en: 'cone', es: 'cono', pronunciation: 'KOH-noh', example: 'El helado está en un cono.' },
      { en: 'pyramid', es: 'pirámide', pronunciation: 'pee-RAH-mee-deh', example: 'Las pirámides de Egipto son famosas.' },
      { en: 'line', es: 'línea', pronunciation: 'LEE-neh-ah', example: 'Dibuja una línea recta.' },
      { en: 'angle', es: 'ángulo', pronunciation: 'AHN-goo-loh', example: 'Un ángulo recto tiene 90 grados.' },
      { en: 'point', es: 'punto', pronunciation: 'POON-toh', example: 'Marca el punto en el mapa.' },
      { en: 'arrow', es: 'flecha', pronunciation: 'FLEH-chah', example: 'La flecha señala la dirección.' },
      { en: 'spiral', es: 'espiral', pronunciation: 'ehs-pee-RAL', example: 'La escalera tiene forma de espiral.' },
      { en: 'cross', es: 'cruz', pronunciation: 'kroos', example: 'La cruz roja ayuda a todos.' },
      { en: 'hexagon', es: 'hexágono', pronunciation: 'ehk-SAH-goh-noh', example: 'Un hexágono tiene seis lados.' }
    ],

    academics: [
      { en: 'school', es: 'escuela', pronunciation: 'ehs-KWEH-lah', example: 'Voy a la escuela todos los días.' },
      { en: 'university', es: 'universidad', pronunciation: 'oo-nee-behr-see-DAD', example: 'Estudio en la universidad.' },
      { en: 'classroom', es: 'aula', pronunciation: 'AH-oo-lah', example: 'El aula está en el segundo piso.' },
      { en: 'library', es: 'biblioteca', pronunciation: 'bee-blee-oh-TEH-kah', example: 'Estudio en la biblioteca.' },
      { en: 'homework', es: 'tarea', pronunciation: 'tah-REH-ah', example: 'Tengo mucha tarea hoy.' },
      { en: 'exam', es: 'examen', pronunciation: 'ehk-SAH-mehn', example: 'El examen es mañana.' },
      { en: 'grade', es: 'nota', pronunciation: 'NOH-tah', example: 'Saqué buena nota en el examen.' },
      { en: 'subject', es: 'asignatura', pronunciation: 'ah-seeg-nah-TOO-rah', example: 'Mi asignatura favorita es historia.' },
      { en: 'history', es: 'historia', pronunciation: 'ees-TOH-ree-ah', example: 'La historia de España es fascinante.' },
      { en: 'literature', es: 'literatura', pronunciation: 'lee-teh-rah-TOO-rah', example: 'Leemos literatura clásica.' },
      { en: 'philosophy', es: 'filosofía', pronunciation: 'fee-loh-soh-FEE-ah', example: 'La filosofía hace pensar.' },
      { en: 'geography', es: 'geografía', pronunciation: 'heh-oh-grah-FEE-ah', example: 'Aprendo geografía mundial.' },
      { en: 'notebook', es: 'cuaderno', pronunciation: 'kwah-DEHR-noh', example: 'Escribe en tu cuaderno.' },
      { en: 'pencil', es: 'lápiz', pronunciation: 'LAH-pees', example: 'Necesito un lápiz.' },
      { en: 'pen', es: 'bolígrafo', pronunciation: 'boh-LEE-grah-foh', example: 'Escribe con bolígrafo azul.' },
      { en: 'eraser', es: 'borrador', pronunciation: 'boh-rrah-DOR', example: 'Necesito el borrador.' },
      { en: 'ruler', es: 'regla', pronunciation: 'REH-glah', example: 'Mide con la regla.' },
      { en: 'dictionary', es: 'diccionario', pronunciation: 'deek-see-oh-NAH-ree-oh', example: 'Busca la palabra en el diccionario.' },
      { en: 'textbook', es: 'libro de texto', pronunciation: 'LEE-broh deh TEHKS-toh', example: 'Abre el libro de texto en la página diez.' },
      { en: 'lesson', es: 'lección', pronunciation: 'lehk-see-OHN', example: 'La lección de hoy es interesante.' },
      { en: 'to study', es: 'estudiar', pronunciation: 'ehs-too-dee-AR', example: 'Necesito estudiar más.' },
      { en: 'to learn', es: 'aprender', pronunciation: 'ah-prehn-DEHR', example: 'Quiero aprender español.' },
      { en: 'to teach', es: 'enseñar', pronunciation: 'ehn-seh-NYAR', example: 'La profesora enseña bien.' },
      { en: 'to read', es: 'leer', pronunciation: 'leh-EHR', example: 'Leo un libro cada semana.' },
      { en: 'to write', es: 'escribir', pronunciation: 'ehs-kree-BEER', example: 'Escribo un ensayo.' },
      { en: 'scholarship', es: 'beca', pronunciation: 'BEH-kah', example: 'Gané una beca para la universidad.' },
      { en: 'graduation', es: 'graduación', pronunciation: 'grah-doo-ah-see-OHN', example: 'Mi graduación es en junio.' },
      { en: 'degree', es: 'título', pronunciation: 'TEE-too-loh', example: 'Tiene un título en medicina.' }
    ],

    politics: [
      { en: 'government', es: 'gobierno', pronunciation: 'goh-bee-EHR-noh', example: 'El gobierno aprobó la nueva ley.' },
      { en: 'president', es: 'presidente', pronunciation: 'preh-see-DEHN-teh', example: 'El presidente dio un discurso.' },
      { en: 'election', es: 'elección', pronunciation: 'eh-lehk-see-OHN', example: 'Las elecciones son en noviembre.' },
      { en: 'vote', es: 'voto', pronunciation: 'BOH-toh', example: 'Mi voto es secreto.' },
      { en: 'law', es: 'ley', pronunciation: 'lay', example: 'La ley protege a los ciudadanos.' },
      { en: 'rights', es: 'derechos', pronunciation: 'deh-REH-chohs', example: 'Todos tenemos derechos humanos.' },
      { en: 'freedom', es: 'libertad', pronunciation: 'lee-behr-TAD', example: 'La libertad es un derecho fundamental.' },
      { en: 'democracy', es: 'democracia', pronunciation: 'deh-moh-KRAH-see-ah', example: 'Vivimos en una democracia.' },
      { en: 'constitution', es: 'constitución', pronunciation: 'kohns-tee-too-see-OHN', example: 'La constitución garantiza nuestros derechos.' },
      { en: 'party', es: 'partido', pronunciation: 'par-TEE-doh', example: 'El partido político ganó las elecciones.' },
      { en: 'congress', es: 'congreso', pronunciation: 'kohn-GREH-soh', example: 'El congreso debate la nueva ley.' },
      { en: 'minister', es: 'ministro', pronunciation: 'mee-NEES-troh', example: 'El ministro visitó la escuela.' },
      { en: 'citizen', es: 'ciudadano', pronunciation: 'see-oo-dah-DAH-noh', example: 'Soy ciudadano mexicano.' },
      { en: 'peace', es: 'paz', pronunciation: 'pahs', example: 'Queremos paz en el mundo.' },
      { en: 'war', es: 'guerra', pronunciation: 'GEH-rrah', example: 'La guerra destruye todo.' },
      { en: 'army', es: 'ejército', pronunciation: 'eh-HEHR-see-toh', example: 'El ejército defiende el país.' },
      { en: 'police', es: 'policía', pronunciation: 'poh-lee-SEE-ah', example: 'La policía protege a la comunidad.' },
      { en: 'judge', es: 'juez', pronunciation: 'hwes', example: 'El juez dictó la sentencia.' },
      { en: 'court', es: 'tribunal', pronunciation: 'tree-boo-NAL', example: 'El caso llegó al tribunal.' },
      { en: 'to vote', es: 'votar', pronunciation: 'boh-TAR', example: 'Voy a votar el domingo.' }
    ],

    tools: [
      { en: 'hammer', es: 'martillo', pronunciation: 'mar-TEE-yoh', example: 'Clava el clavo con el martillo.' },
      { en: 'screwdriver', es: 'destornillador', pronunciation: 'dehs-tor-nee-yah-DOR', example: 'Necesito un destornillador.' },
      { en: 'wrench', es: 'llave inglesa', pronunciation: 'YAH-beh een-GLEH-sah', example: 'Usa la llave inglesa para la tuerca.' },
      { en: 'saw', es: 'sierra', pronunciation: 'see-EH-rrah', example: 'Corta la madera con la sierra.' },
      { en: 'drill', es: 'taladro', pronunciation: 'tah-LAH-droh', example: 'Necesito el taladro para hacer un agujero.' },
      { en: 'nail', es: 'clavo', pronunciation: 'KLAH-boh', example: 'Necesito clavos y un martillo.' },
      { en: 'screw', es: 'tornillo', pronunciation: 'tor-NEE-yoh', example: 'Aprieta el tornillo.' },
      { en: 'pliers', es: 'alicates', pronunciation: 'ah-lee-KAH-tehs', example: 'Usa los alicates para cortar el cable.' },
      { en: 'tape measure', es: 'cinta métrica', pronunciation: 'SEEN-tah MEH-tree-kah', example: 'Mide con la cinta métrica.' },
      { en: 'paintbrush', es: 'brocha', pronunciation: 'BROH-chah', example: 'Pinta la pared con la brocha.' },
      { en: 'ladder', es: 'escalera', pronunciation: 'ehs-kah-LEH-rah', example: 'Sube por la escalera.' },
      { en: 'shovel', es: 'pala', pronunciation: 'PAH-lah', example: 'Cava con la pala.' },
      { en: 'axe', es: 'hacha', pronunciation: 'AH-chah', example: 'Corta la leña con el hacha.' },
      { en: 'rope', es: 'cuerda', pronunciation: 'KWEHR-dah', example: 'Ata la cuerda al poste.' },
      { en: 'glue', es: 'pegamento', pronunciation: 'peh-gah-MEHN-toh', example: 'Pega los pedazos con pegamento.' },
      { en: 'scissors', es: 'tijeras', pronunciation: 'tee-HEH-rahs', example: 'Corta el papel con tijeras.' },
      { en: 'level', es: 'nivel', pronunciation: 'nee-BEL', example: 'Usa el nivel para que quede recto.' },
      { en: 'toolbox', es: 'caja de herramientas', pronunciation: 'KAH-hah deh eh-rrah-mee-EHN-tahs', example: 'Las herramientas están en la caja.' },
      { en: 'bolt', es: 'perno', pronunciation: 'PEHR-noh', example: 'Aprieta el perno con la llave.' },
      { en: 'sandpaper', es: 'papel de lija', pronunciation: 'pah-PEL deh LEE-hah', example: 'Lija la madera con papel de lija.' }
    ],

    religion: [
      { en: 'church', es: 'iglesia', pronunciation: 'ee-GLEH-see-ah', example: 'Vamos a la iglesia el domingo.' },
      { en: 'temple', es: 'templo', pronunciation: 'TEHM-ploh', example: 'El templo es muy antiguo.' },
      { en: 'prayer', es: 'oración', pronunciation: 'oh-rah-see-OHN', example: 'Rezamos una oración.' },
      { en: 'faith', es: 'fe', pronunciation: 'feh', example: 'La fe es importante para muchos.' },
      { en: 'soul', es: 'alma', pronunciation: 'AHL-mah', example: 'El alma es eterna.' },
      { en: 'heaven', es: 'cielo', pronunciation: 'see-EH-loh', example: 'Mira las estrellas en el cielo.' },
      { en: 'angel', es: 'ángel', pronunciation: 'AHN-hehl', example: 'El ángel protege a los niños.' },
      { en: 'saint', es: 'santo', pronunciation: 'SAHN-toh', example: 'San Francisco es un santo famoso.' },
      { en: 'cross', es: 'cruz', pronunciation: 'kroos', example: 'La cruz está en la iglesia.' },
      { en: 'candle', es: 'vela', pronunciation: 'BEH-lah', example: 'Enciende una vela.' },
      { en: 'to pray', es: 'rezar', pronunciation: 'reh-SAR', example: 'Rezo antes de dormir.' },
      { en: 'to believe', es: 'creer', pronunciation: 'kreh-EHR', example: 'Creo en la bondad.' },
      { en: 'blessing', es: 'bendición', pronunciation: 'behn-dee-see-OHN', example: 'Es una bendición.' },
      { en: 'ceremony', es: 'ceremonia', pronunciation: 'seh-reh-MOH-nee-ah', example: 'La ceremonia fue hermosa.' },
      { en: 'tradition', es: 'tradición', pronunciation: 'trah-dee-see-OHN', example: 'Es una tradición familiar.' }
    ],

    entertainment: [
      { en: 'movie', es: 'película', pronunciation: 'peh-LEE-koo-lah', example: 'Vamos a ver una película.' },
      { en: 'theater', es: 'teatro', pronunciation: 'teh-AH-troh', example: 'Fuimos al teatro anoche.' },
      { en: 'show', es: 'espectáculo', pronunciation: 'ehs-pehk-TAH-koo-loh', example: 'El espectáculo fue increíble.' },
      { en: 'actor', es: 'actor', pronunciation: 'ahk-TOR', example: 'El actor ganó un premio.' },
      { en: 'actress', es: 'actriz', pronunciation: 'ahk-TREES', example: 'La actriz es muy talentosa.' },
      { en: 'director', es: 'director', pronunciation: 'dee-rehk-TOR', example: 'El director filmó una gran película.' },
      { en: 'ticket', es: 'entrada', pronunciation: 'ehn-TRAH-dah', example: 'Compré las entradas en línea.' },
      { en: 'comedy', es: 'comedia', pronunciation: 'koh-MEH-dee-ah', example: 'Me gustan las comedias.' },
      { en: 'drama', es: 'drama', pronunciation: 'DRAH-mah', example: 'El drama fue muy emotivo.' },
      { en: 'series', es: 'serie', pronunciation: 'SEH-ree-eh', example: 'Estoy viendo una serie nueva.' },
      { en: 'episode', es: 'episodio', pronunciation: 'eh-pee-SOH-dee-oh', example: 'El último episodio fue genial.' },
      { en: 'novel', es: 'novela', pronunciation: 'noh-BEH-lah', example: 'Estoy leyendo una novela.' },
      { en: 'poem', es: 'poema', pronunciation: 'poh-EH-mah', example: 'Escribió un poema hermoso.' },
      { en: 'story', es: 'cuento', pronunciation: 'KWEHN-toh', example: 'Cuenta un cuento a los niños.' },
      { en: 'character', es: 'personaje', pronunciation: 'pehr-soh-NAH-heh', example: 'Mi personaje favorito es el héroe.' },
      { en: 'scene', es: 'escena', pronunciation: 'ehs-SEH-nah', example: 'Esa escena es muy dramática.' },
      { en: 'stage', es: 'escenario', pronunciation: 'ehs-seh-NAH-ree-oh', example: 'Los actores están en el escenario.' },
      { en: 'to act', es: 'actuar', pronunciation: 'ahk-too-AR', example: 'Quiero actuar en una obra.' },
      { en: 'to watch', es: 'ver', pronunciation: 'behr', example: 'Vamos a ver el partido.' },
      { en: 'to enjoy', es: 'disfrutar', pronunciation: 'dees-froo-TAR', example: 'Disfruto la música en vivo.' },
      { en: 'circus', es: 'circo', pronunciation: 'SEER-koh', example: 'Los niños adoran el circo.' },
      { en: 'magic', es: 'magia', pronunciation: 'MAH-hee-ah', example: 'El mago hace trucos de magia.' },
      { en: 'carnival', es: 'carnaval', pronunciation: 'kar-nah-BAL', example: 'El carnaval es muy divertido.' },
      { en: 'festival', es: 'festival', pronunciation: 'fehs-tee-BAL', example: 'El festival de cine empieza hoy.' },
      { en: 'party', es: 'fiesta', pronunciation: 'fee-EHS-tah', example: '¡Vamos a la fiesta!' }
    ],

    law: [
      { en: 'lawyer', es: 'abogado', pronunciation: 'ah-boh-GAH-doh', example: 'Necesito un abogado.' },
      { en: 'judge', es: 'juez', pronunciation: 'hwes', example: 'El juez escuchó los argumentos.' },
      { en: 'trial', es: 'juicio', pronunciation: 'HWEE-see-oh', example: 'El juicio empieza mañana.' },
      { en: 'crime', es: 'crimen', pronunciation: 'KREE-mehn', example: 'El crimen fue resuelto.' },
      { en: 'prison', es: 'cárcel', pronunciation: 'KAR-sehl', example: 'Fue enviado a la cárcel.' },
      { en: 'witness', es: 'testigo', pronunciation: 'tehs-TEE-goh', example: 'El testigo declaró en el juicio.' },
      { en: 'evidence', es: 'evidencia', pronunciation: 'eh-bee-DEHN-see-ah', example: 'La evidencia es clara.' },
      { en: 'guilty', es: 'culpable', pronunciation: 'kool-PAH-bleh', example: 'El acusado es culpable.' },
      { en: 'innocent', es: 'inocente', pronunciation: 'ee-noh-SEHN-teh', example: 'Es inocente del crimen.' },
      { en: 'justice', es: 'justicia', pronunciation: 'hoos-TEE-see-ah', example: 'La justicia debe prevalecer.' },
      { en: 'to arrest', es: 'arrestar', pronunciation: 'ah-rrehs-TAR', example: 'La policía lo arrestó.' },
      { en: 'to accuse', es: 'acusar', pronunciation: 'ah-koo-SAR', example: 'Lo acusan de robo.' },
      { en: 'to defend', es: 'defender', pronunciation: 'deh-fehn-DEHR', example: 'El abogado lo defiende.' },
      { en: 'to judge', es: 'juzgar', pronunciation: 'hoos-GAR', example: 'No debes juzgar a los demás.' },
      { en: 'sentence', es: 'sentencia', pronunciation: 'sehn-TEHN-see-ah', example: 'La sentencia fue de cinco años.' }
    ],

    environment: [
      { en: 'environment', es: 'medio ambiente', pronunciation: 'MEH-dee-oh ahm-bee-EHN-teh', example: 'Debemos cuidar el medio ambiente.' },
      { en: 'pollution', es: 'contaminación', pronunciation: 'kohn-tah-mee-nah-see-OHN', example: 'La contaminación es un problema grave.' },
      { en: 'recycling', es: 'reciclaje', pronunciation: 'reh-see-KLAH-heh', example: 'El reciclaje es importante.' },
      { en: 'climate', es: 'clima', pronunciation: 'KLEE-mah', example: 'El clima está cambiando.' },
      { en: 'nature', es: 'naturaleza', pronunciation: 'nah-too-rah-LEH-sah', example: 'La naturaleza es hermosa.' },
      { en: 'solar energy', es: 'energía solar', pronunciation: 'eh-nehr-HEE-ah soh-LAR', example: 'La energía solar es renovable.' },
      { en: 'forest fire', es: 'incendio forestal', pronunciation: 'een-SEHN-dee-oh foh-rehs-TAL', example: 'El incendio forestal destruyó miles de hectáreas.' },
      { en: 'drought', es: 'sequía', pronunciation: 'seh-KEE-ah', example: 'La sequía afecta a los agricultores.' },
      { en: 'flood', es: 'inundación', pronunciation: 'ee-noon-dah-see-OHN', example: 'La inundación causó muchos daños.' },
      { en: 'species', es: 'especie', pronunciation: 'ehs-PEH-see-eh', example: 'Muchas especies están en peligro.' },
      { en: 'to recycle', es: 'reciclar', pronunciation: 'reh-see-KLAR', example: 'Reciclamos el papel y el plástico.' },
      { en: 'to protect', es: 'proteger', pronunciation: 'proh-teh-HEHR', example: 'Debemos proteger los bosques.' },
      { en: 'to conserve', es: 'conservar', pronunciation: 'kohn-sehr-BAR', example: 'Hay que conservar el agua.' },
      { en: 'renewable', es: 'renovable', pronunciation: 'reh-noh-BAH-bleh', example: 'Necesitamos más energía renovable.' },
      { en: 'endangered', es: 'en peligro', pronunciation: 'ehn peh-LEE-groh', example: 'El panda está en peligro de extinción.' },
      { en: 'deforestation', es: 'deforestación', pronunciation: 'deh-foh-rehs-tah-see-OHN', example: 'La deforestación destruye hábitats.' },
      { en: 'ecosystem', es: 'ecosistema', pronunciation: 'eh-koh-sees-TEH-mah', example: 'El ecosistema marino es frágil.' },
      { en: 'carbon', es: 'carbono', pronunciation: 'kar-BOH-noh', example: 'Debemos reducir las emisiones de carbono.' },
      { en: 'to pollute', es: 'contaminar', pronunciation: 'kohn-tah-mee-NAR', example: 'Las fábricas contaminan el aire.' },
      { en: 'trash', es: 'basura', pronunciation: 'bah-SOO-rah', example: 'No tires basura al suelo.' }
    ],

    relationships: [
      { en: 'love', es: 'amor', pronunciation: 'ah-MOR', example: 'El amor es lo más importante.' },
      { en: 'friendship', es: 'amistad', pronunciation: 'ah-mees-TAD', example: 'La amistad es un tesoro.' },
      { en: 'partner', es: 'pareja', pronunciation: 'pah-REH-hah', example: 'Mi pareja es maravillosa.' },
      { en: 'husband', es: 'esposo', pronunciation: 'ehs-POH-soh', example: 'Mi esposo cocina muy bien.' },
      { en: 'wife', es: 'esposa', pronunciation: 'ehs-POH-sah', example: 'Mi esposa es profesora.' },
      { en: 'boyfriend', es: 'novio', pronunciation: 'NOH-bee-oh', example: 'Mi novio me llama cada día.' },
      { en: 'girlfriend', es: 'novia', pronunciation: 'NOH-bee-ah', example: 'Mi novia estudia medicina.' },
      { en: 'neighbor', es: 'vecino', pronunciation: 'beh-SEE-noh', example: 'Mi vecino es muy amable.' },
      { en: 'colleague', es: 'colega', pronunciation: 'koh-LEH-gah', example: 'Mi colega me ayudó con el proyecto.' },
      { en: 'to love', es: 'amar', pronunciation: 'ah-MAR', example: 'Te amo con todo mi corazón.' },
      { en: 'to miss', es: 'extrañar', pronunciation: 'ehks-trah-NYAR', example: 'Te extraño mucho.' },
      { en: 'to hug', es: 'abrazar', pronunciation: 'ah-brah-SAR', example: 'Quiero abrazarte.' },
      { en: 'to kiss', es: 'besar', pronunciation: 'beh-SAR', example: 'Le besó en la mejilla.' },
      { en: 'to marry', es: 'casarse', pronunciation: 'kah-SAR-seh', example: 'Se casaron en la playa.' },
      { en: 'wedding', es: 'boda', pronunciation: 'BOH-dah', example: 'La boda fue hermosa.' },
      { en: 'anniversary', es: 'aniversario', pronunciation: 'ah-nee-behr-SAH-ree-oh', example: 'Hoy es nuestro aniversario.' },
      { en: 'trust', es: 'confianza', pronunciation: 'kohn-fee-AHN-sah', example: 'La confianza es la base.' },
      { en: 'respect', es: 'respeto', pronunciation: 'rehs-PEH-toh', example: 'El respeto es fundamental.' },
      { en: 'to forgive', es: 'perdonar', pronunciation: 'pehr-doh-NAR', example: 'Es importante saber perdonar.' },
      { en: 'to argue', es: 'discutir', pronunciation: 'dees-koo-TEER', example: 'No quiero discutir contigo.' }
    ]
  };

  // Build flat lookup maps
  var enToEs = {};
  var esToEn = {};
  var allEntries = [];

  function buildIndex() {
    enToEs = {};
    esToEn = {};
    allEntries = [];
    var cats = Object.keys(data);
    for (var c = 0; c < cats.length; c++) {
      var entries = data[cats[c]];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        e.category = cats[c];
        allEntries.push(e);
        enToEs[e.en.toLowerCase()] = e;
        esToEn[e.es.toLowerCase()] = e;
      }
    }
  }

  buildIndex();

  /**
   * Look up an English word → Spanish entry.
   */
  function lookupEnglish(word) {
    return enToEs[word.toLowerCase()] || null;
  }

  /**
   * Look up a Spanish word → entry.
   */
  function lookupSpanish(word) {
    return esToEn[word.toLowerCase()] || null;
  }

  /**
   * Search both directions. Returns entry or null.
   */
  function lookup(word) {
    var w = word.toLowerCase();
    return enToEs[w] || esToEn[w] || null;
  }

  /**
   * Get all words for a category.
   */
  function getCategory(cat) {
    var key = cat.toLowerCase();
    // Normalize some aliases
    var aliases = {
      'colour': 'colors', 'color': 'colors',
      'body parts': 'body', 'clothes': 'clothing',
      'home': 'house', 'jobs': 'professions',
      'feelings': 'emotions', 'days': 'time', 'months': 'time',
      'seasons': 'nature', 'education': 'academics',
      'transportation': 'vehicles', 'transport': 'vehicles',
      'animal': 'animals', 'emotion': 'emotions',
      'number': 'numbers', 'greeting': 'greetings',
      'drink': 'food', 'drinks': 'food',
      'profession': 'professions', 'weather': 'weather',
      'sport': 'sports', 'tech': 'technology',
      'health': 'medicine', 'medical': 'medicine',
      'song': 'music', 'songs': 'music', 'instruments': 'music',
      'painting': 'art', 'arts': 'art',
      'finance': 'business', 'money': 'business', 'work': 'business',
      'kitchen': 'cooking', 'food preparation': 'cooking',
      'plants': 'garden', 'gardening': 'garden', 'flowers': 'garden',
      'cars': 'vehicles', 'car': 'vehicles', 'automobile': 'vehicles',
      'ocean': 'marine', 'sea': 'marine', 'sea life': 'marine',
      'bugs': 'insects', 'bug': 'insects', 'insect': 'insects',
      'countries': 'geography', 'maps': 'geography', 'places': 'geography',
      'material': 'materials', 'fabric': 'materials',
      'shape': 'shapes', 'geometry': 'shapes',
      'school': 'academics', 'studies': 'academics', 'study': 'academics',
      'government': 'politics', 'political': 'politics',
      'tool': 'tools', 'hardware': 'tools',
      'faith': 'religion', 'spiritual': 'religion',
      'movies': 'entertainment', 'cinema': 'entertainment', 'tv': 'entertainment',
      'legal': 'law', 'crime': 'law', 'justice': 'law',
      'ecology': 'environment', 'nature': 'environment', 'green': 'environment',
      'love': 'relationships', 'family': 'family', 'romance': 'relationships',
      'home furnishing': 'furniture', 'furnishing': 'furniture',
      'bed': 'furniture', 'chair': 'furniture'
    };
    key = aliases[key] || key;
    return data[key] || null;
  }

  /**
   * Get random entries, optionally from a specific category.
   */
  function getRandom(count, category) {
    var pool = category ? (data[category] || allEntries) : allEntries;
    var result = [];
    var used = {};
    var max = Math.min(count, pool.length);
    while (result.length < max) {
      var idx = Math.floor(Math.random() * pool.length);
      if (!used[idx]) {
        used[idx] = true;
        result.push(pool[idx]);
      }
    }
    return result;
  }

  /**
   * Get all category names.
   */
  function getCategories() {
    return Object.keys(data);
  }

  /**
   * Get word of the day (deterministic per date).
   */
  function getWordOfTheDay() {
    var now = new Date();
    var dayIndex = (now.getFullYear() * 366 + now.getMonth() * 31 + now.getDate()) % allEntries.length;
    return allEntries[dayIndex];
  }

  /**
   * Fuzzy search — find entries where en or es contains the substring.
   */
  function search(query) {
    var q = query.toLowerCase();
    var results = [];
    for (var i = 0; i < allEntries.length; i++) {
      var e = allEntries[i];
      if (e.en.toLowerCase().indexOf(q) !== -1 || e.es.toLowerCase().indexOf(q) !== -1) {
        results.push(e);
      }
    }
    return results;
  }

  return {
    data: data,
    lookupEnglish: lookupEnglish,
    lookupSpanish: lookupSpanish,
    lookup: lookup,
    getCategory: getCategory,
    getRandom: getRandom,
    getCategories: getCategories,
    getWordOfTheDay: getWordOfTheDay,
    search: search,
    allEntries: allEntries,
    buildIndex: buildIndex
  };
})();
