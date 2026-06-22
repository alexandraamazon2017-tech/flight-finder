export interface Airport {
  iataCode: string
  city: string
  name: string
  country: string
  aliases?: string[]
}

export const AIRPORTS: Airport[] = [
  // Romania
  { iataCode: 'OTP', city: 'București', name: 'Henri Coandă', country: 'România' },
  { iataCode: 'BBU', city: 'București', name: 'Băneasa', country: 'România' },
  { iataCode: 'CLJ', city: 'Cluj-Napoca', name: 'Avram Iancu', country: 'România' },
  { iataCode: 'IAS', city: 'Iași', name: 'Iași', country: 'România' },
  { iataCode: 'TSR', city: 'Timișoara', name: 'Traian Vuia', country: 'România' },
  { iataCode: 'SBZ', city: 'Sibiu', name: 'Sibiu', country: 'România' },
  { iataCode: 'CND', city: 'Constanța', name: 'Mihail Kogălniceanu', country: 'România' },
  { iataCode: 'OMR', city: 'Oradea', name: 'Oradea', country: 'România' },
  { iataCode: 'SUJ', city: 'Satu Mare', name: 'Satu Mare', country: 'România' },
  { iataCode: 'BAY', city: 'Baia Mare', name: 'Baia Mare', country: 'România' },
  { iataCode: 'TGM', city: 'Târgu Mureș', name: 'Târgu Mureș', country: 'România' },
  { iataCode: 'CRA', city: 'Craiova', name: 'Craiova', country: 'România' },
  { iataCode: 'BCM', city: 'Bacău', name: 'George Enescu', country: 'România' },
  // UK
  { iataCode: 'LHR', city: 'Londra', name: 'Heathrow', country: 'Marea Britanie', aliases: ['london', 'londres'] },
  { iataCode: 'LGW', city: 'Londra', name: 'Gatwick', country: 'Marea Britanie', aliases: ['london', 'londres'] },
  { iataCode: 'STN', city: 'Londra', name: 'Stansted', country: 'Marea Britanie', aliases: ['london', 'londres'] },
  { iataCode: 'LTN', city: 'Londra', name: 'Luton', country: 'Marea Britanie', aliases: ['london', 'londres'] },
  { iataCode: 'MAN', city: 'Manchester', name: 'Manchester', country: 'Marea Britanie' },
  { iataCode: 'EDI', city: 'Edinburgh', name: 'Edinburgh', country: 'Marea Britanie' },
  { iataCode: 'BRS', city: 'Bristol', name: 'Bristol', country: 'Marea Britanie' },
  // Spain
  { iataCode: 'MAD', city: 'Madrid', name: 'Barajas', country: 'Spania' },
  { iataCode: 'BCN', city: 'Barcelona', name: 'El Prat', country: 'Spania' },
  { iataCode: 'ALC', city: 'Alicante', name: 'Alicante', country: 'Spania' },
  { iataCode: 'AGP', city: 'Malaga', name: 'Costa del Sol', country: 'Spania' },
  { iataCode: 'VLC', city: 'Valencia', name: 'Valencia', country: 'Spania' },
  { iataCode: 'SVQ', city: 'Sevilla', name: 'Sevilla', country: 'Spania' },
  { iataCode: 'PMI', city: 'Palma de Mallorca', name: 'Son Sant Joan', country: 'Spania' },
  { iataCode: 'TFS', city: 'Tenerife', name: 'Sur Reina Sofía', country: 'Spania' },
  { iataCode: 'LPA', city: 'Gran Canaria', name: 'Las Palmas', country: 'Spania' },
  { iataCode: 'IBZ', city: 'Ibiza', name: 'Ibiza', country: 'Spania' },
  // Italy
  { iataCode: 'FCO', city: 'Roma', name: 'Fiumicino', country: 'Italia', aliases: ['rome', 'rom'] },
  { iataCode: 'CIA', city: 'Roma', name: 'Ciampino', country: 'Italia', aliases: ['rome', 'rom'] },
  { iataCode: 'MXP', city: 'Milano', name: 'Malpensa', country: 'Italia' },
  { iataCode: 'BGY', city: 'Milano', name: 'Bergamo', country: 'Italia' },
  { iataCode: 'VCE', city: 'Veneția', name: 'Marco Polo', country: 'Italia' },
  { iataCode: 'NAP', city: 'Napoli', name: 'Capodichino', country: 'Italia' },
  { iataCode: 'BLQ', city: 'Bologna', name: 'Guglielmo Marconi', country: 'Italia' },
  { iataCode: 'PSA', city: 'Pisa', name: 'Galileo Galilei', country: 'Italia' },
  { iataCode: 'CTA', city: 'Catania', name: 'Fontanarossa', country: 'Italia' },
  // France
  { iataCode: 'CDG', city: 'Paris', name: 'Charles de Gaulle', country: 'Franța' },
  { iataCode: 'ORY', city: 'Paris', name: 'Orly', country: 'Franța' },
  { iataCode: 'NCE', city: 'Nisa', name: 'Côte d\'Azur', country: 'Franța' },
  { iataCode: 'MRS', city: 'Marsilia', name: 'Provence', country: 'Franța' },
  { iataCode: 'LYS', city: 'Lyon', name: 'Saint-Exupéry', country: 'Franța' },
  // Germany
  { iataCode: 'FRA', city: 'Frankfurt', name: 'Frankfurt', country: 'Germania' },
  { iataCode: 'MUC', city: 'München', name: 'Franz Josef Strauss', country: 'Germania' },
  { iataCode: 'BER', city: 'Berlin', name: 'Brandenburg', country: 'Germania' },
  { iataCode: 'DUS', city: 'Düsseldorf', name: 'Düsseldorf', country: 'Germania' },
  { iataCode: 'HAM', city: 'Hamburg', name: 'Hamburg', country: 'Germania' },
  { iataCode: 'CGN', city: 'Köln', name: 'Köln/Bonn', country: 'Germania' },
  // Netherlands
  { iataCode: 'AMS', city: 'Amsterdam', name: 'Schiphol', country: 'Olanda' },
  { iataCode: 'EIN', city: 'Eindhoven', name: 'Eindhoven', country: 'Olanda' },
  // Belgium
  { iataCode: 'BRU', city: 'Bruxelles', name: 'Zaventem', country: 'Belgia' },
  { iataCode: 'CRL', city: 'Bruxelles', name: 'Charleroi', country: 'Belgia' },
  // Greece
  { iataCode: 'ATH', city: 'Atena', name: 'Eleftherios Venizelos', country: 'Grecia' },
  { iataCode: 'SKG', city: 'Thessaloniki', name: 'Macedonia', country: 'Grecia' },
  { iataCode: 'HER', city: 'Creta', name: 'Heraklion', country: 'Grecia' },
  { iataCode: 'RHO', city: 'Rodos', name: 'Diagoras', country: 'Grecia' },
  { iataCode: 'CFU', city: 'Corfu', name: 'Ioannis Kapodistrias', country: 'Grecia' },
  { iataCode: 'MYK', city: 'Mykonos', name: 'Mykonos', country: 'Grecia' },
  { iataCode: 'JTR', city: 'Santorini', name: 'Thira', country: 'Grecia' },
  // Portugal
  { iataCode: 'LIS', city: 'Lisabona', name: 'Humberto Delgado', country: 'Portugalia' },
  { iataCode: 'OPO', city: 'Porto', name: 'Francisco Sá Carneiro', country: 'Portugalia' },
  { iataCode: 'FAO', city: 'Algarve', name: 'Faro', country: 'Portugalia' },
  // Turkey
  { iataCode: 'IST', city: 'Istanbul', name: 'Istanbul', country: 'Turcia' },
  { iataCode: 'SAW', city: 'Istanbul', name: 'Sabiha Gökçen', country: 'Turcia' },
  { iataCode: 'AYT', city: 'Antalya', name: 'Antalya', country: 'Turcia' },
  { iataCode: 'DLM', city: 'Dalaman', name: 'Dalaman', country: 'Turcia' },
  { iataCode: 'BJV', city: 'Bodrum', name: 'Milas-Bodrum', country: 'Turcia' },
  // Austria
  { iataCode: 'VIE', city: 'Viena', name: 'Schwechat', country: 'Austria' },
  { iataCode: 'SZG', city: 'Salzburg', name: 'Salzburg', country: 'Austria' },
  // Czech Republic
  { iataCode: 'PRG', city: 'Praga', name: 'Václav Havel', country: 'Cehia' },
  // Hungary
  { iataCode: 'BUD', city: 'Budapesta', name: 'Ferenc Liszt', country: 'Ungaria' },
  // Poland
  { iataCode: 'WAW', city: 'Varșovia', name: 'Chopin', country: 'Polonia' },
  { iataCode: 'KRK', city: 'Cracovia', name: 'John Paul II', country: 'Polonia' },
  { iataCode: 'WMI', city: 'Varșovia', name: 'Modlin', country: 'Polonia' },
  // Croatia
  { iataCode: 'ZAG', city: 'Zagreb', name: 'Zagreb', country: 'Croatia' },
  { iataCode: 'SPU', city: 'Split', name: 'Split', country: 'Croatia' },
  { iataCode: 'DBV', city: 'Dubrovnik', name: 'Dubrovnik', country: 'Croatia' },
  // Bulgaria
  { iataCode: 'SOF', city: 'Sofia', name: 'Sofia', country: 'Bulgaria' },
  { iataCode: 'BOJ', city: 'Burgas', name: 'Burgas', country: 'Bulgaria' },
  { iataCode: 'VAR', city: 'Varna', name: 'Varna', country: 'Bulgaria' },
  // Ireland
  { iataCode: 'DUB', city: 'Dublin', name: 'Dublin', country: 'Irlanda' },
  // Switzerland
  { iataCode: 'ZRH', city: 'Zürich', name: 'Kloten', country: 'Elveția' },
  { iataCode: 'GVA', city: 'Geneva', name: 'Cointrin', country: 'Elveția' },
  // Denmark
  { iataCode: 'CPH', city: 'Copenhaga', name: 'Kastrup', country: 'Danemarca' },
  // Sweden
  { iataCode: 'ARN', city: 'Stockholm', name: 'Arlanda', country: 'Suedia' },
  { iataCode: 'NYO', city: 'Stockholm', name: 'Skavsta', country: 'Suedia' },
  // Norway
  { iataCode: 'OSL', city: 'Oslo', name: 'Gardermoen', country: 'Norvegia' },
  // Cyprus
  { iataCode: 'LCA', city: 'Larnaca', name: 'Larnaca', country: 'Cipru' },
  { iataCode: 'PFO', city: 'Paphos', name: 'Paphos', country: 'Cipru' },
  // Malta
  { iataCode: 'MLA', city: 'Malta', name: 'Malta', country: 'Malta' },
  // Morocco
  { iataCode: 'CMN', city: 'Casablanca', name: 'Mohammed V', country: 'Maroc' },
  { iataCode: 'RAK', city: 'Marrakech', name: 'Menara', country: 'Maroc' },
  { iataCode: 'TNG', city: 'Tanger', name: 'Ibn Battouta', country: 'Maroc' },
  { iataCode: 'AGA', city: 'Agadir', name: 'Al Massira', country: 'Maroc' },
  // Cape Verde
  { iataCode: 'RAI', city: 'Praia', name: 'Nelson Mandela', country: 'Capul Verde', aliases: ['cape verde', 'cabo verde', 'praia'] },
  { iataCode: 'SID', city: 'Sal', name: 'Amílcar Cabral', country: 'Capul Verde', aliases: ['cape verde', 'cabo verde', 'sal', 'santa maria'] },
  { iataCode: 'VXE', city: 'São Vicente', name: 'Cesária Évora', country: 'Capul Verde', aliases: ['cape verde', 'cabo verde', 'mindelo'] },
  // Egypt
  { iataCode: 'HRG', city: 'Hurghada', name: 'Hurghada', country: 'Egipt' },
  { iataCode: 'SSH', city: 'Sharm el-Sheikh', name: 'Sharm el-Sheikh', country: 'Egipt' },
  { iataCode: 'CAI', city: 'Cairo', name: 'Cairo', country: 'Egipt' },
  // UAE
  { iataCode: 'DXB', city: 'Dubai', name: 'Dubai', country: 'Emirate' },
  { iataCode: 'AUH', city: 'Abu Dhabi', name: 'Zayed', country: 'Emirate' },
  // Serbia
  { iataCode: 'BEG', city: 'Belgrad', name: 'Nikola Tesla', country: 'Serbia' },
  // Albania
  { iataCode: 'TIA', city: 'Tirana', name: 'Nënë Tereza', country: 'Albania' },
  // Moldova
  { iataCode: 'KIV', city: 'Chișinău', name: 'Chișinău', country: 'Moldova' },
  // Ukraine
  { iataCode: 'KBP', city: 'Kyiv', name: 'Boryspil', country: 'Ucraina' },
  // Slovakia
  { iataCode: 'BTS', city: 'Bratislava', name: 'M. R. Štefánik', country: 'Slovacia' },
  // Luxembourg
  { iataCode: 'LUX', city: 'Luxemburg', name: 'Findel', country: 'Luxemburg' },
  // Finland
  { iataCode: 'HEL', city: 'Helsinki', name: 'Vantaa', country: 'Finlanda' },
  // Latvia
  { iataCode: 'RIX', city: 'Riga', name: 'Riga', country: 'Latvia' },
  // Lithuania
  { iataCode: 'VNO', city: 'Vilnius', name: 'Vilnius', country: 'Lituania' },
  // Estonia
  { iataCode: 'TLL', city: 'Tallinn', name: 'Lennart Meri', country: 'Estonia' },
  // Thailand
  { iataCode: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi', country: 'Thailanda' },
  // Japan
  { iataCode: 'NRT', city: 'Tokyo', name: 'Narita', country: 'Japonia' },
  // US
  { iataCode: 'JFK', city: 'New York', name: 'John F. Kennedy', country: 'SUA' },
  { iataCode: 'LAX', city: 'Los Angeles', name: 'LAX', country: 'SUA' },
]

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function searchAirports(query: string): Airport[] {
  if (query.length < 2) return []
  const q = normalize(query.trim())

  const primary: Airport[] = []   // IATA / city / alias match
  const secondary: Airport[] = [] // name / country match

  for (const a of AIRPORTS) {
    const cityMatch = normalize(a.city).includes(q)
    const iataMatch = a.iataCode.toLowerCase().startsWith(q)
    const aliasMatch = a.aliases?.some(al => al.includes(q)) ?? false
    const nameMatch = normalize(a.name).includes(q)

    if (cityMatch || iataMatch || aliasMatch) {
      primary.push(a)
    } else if (nameMatch) {
      secondary.push(a)
    }
  }

  return [...primary, ...secondary].slice(0, 8)
}
