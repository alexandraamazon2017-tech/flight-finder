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
  { iataCode: 'CAG', city: 'Cagliari', name: 'Mario Mameli', country: 'Italia', aliases: ['sardinia', 'sardegna'] },
  { iataCode: 'OLB', city: 'Olbia', name: 'Costa Smeralda', country: 'Italia', aliases: ['sardinia', 'sardegna'] },
  { iataCode: 'AHO', city: 'Alghero', name: 'Fertilia', country: 'Italia', aliases: ['sardinia', 'sardegna'] },
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
  { iataCode: 'BSL', city: 'Basel', name: 'EuroAirport Basel-Mulhouse-Freiburg', country: 'Elveția', aliases: ['basel', 'mulhouse', 'freiburg', 'euroairport'] },
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
  // Israel
  { iataCode: 'TLV', city: 'Tel Aviv', name: 'Ben Gurion', country: 'Israel', aliases: ['telaviv'] },
  // Jordan
  { iataCode: 'AMM', city: 'Amman', name: 'Queen Alia', country: 'Iordania' },
  // Lebanon
  { iataCode: 'BEY', city: 'Beirut', name: 'Rafic Hariri', country: 'Liban' },
  // Saudi Arabia
  { iataCode: 'RUH', city: 'Riyadh', name: 'King Khalid', country: 'Arabia Saudită' },
  { iataCode: 'JED', city: 'Jeddah', name: 'King Abdulaziz', country: 'Arabia Saudită' },
  // Qatar
  { iataCode: 'DOH', city: 'Doha', name: 'Hamad', country: 'Qatar' },
  // Kuwait
  { iataCode: 'KWI', city: 'Kuwait City', name: 'Kuwait', country: 'Kuwait' },
  // Bahrain
  { iataCode: 'BAH', city: 'Manama', name: 'Bahrain', country: 'Bahrain' },
  // Oman
  { iataCode: 'MCT', city: 'Muscat', name: 'Muscat', country: 'Oman' },
  // Georgia
  { iataCode: 'TBS', city: 'Tbilisi', name: 'Shota Rustaveli', country: 'Georgia' },
  { iataCode: 'BUS', city: 'Batumi', name: 'Batumi', country: 'Georgia' },
  // Armenia
  { iataCode: 'EVN', city: 'Erevan', name: 'Zvartnots', country: 'Armenia' },
  // Azerbaijan
  { iataCode: 'GYD', city: 'Baku', name: 'Heydar Aliyev', country: 'Azerbaidjan' },
  // Kazakhstan
  { iataCode: 'ALA', city: 'Almaty', name: 'Almaty', country: 'Kazahstan' },
  { iataCode: 'NQZ', city: 'Astana', name: 'Nursultan Nazarbayev', country: 'Kazahstan', aliases: ['astana', 'nur-sultan'] },
  // Uzbekistan
  { iataCode: 'TAS', city: 'Tașkent', name: 'Islam Karimov', country: 'Uzbekistan' },
  // Iran
  { iataCode: 'IKA', city: 'Teheran', name: 'Imam Khomeini', country: 'Iran' },
  // Pakistan
  { iataCode: 'KHI', city: 'Karachi', name: 'Jinnah', country: 'Pakistan' },
  { iataCode: 'LHE', city: 'Lahore', name: 'Allama Iqbal', country: 'Pakistan' },
  { iataCode: 'ISB', city: 'Islamabad', name: 'Islamabad', country: 'Pakistan' },
  // India
  { iataCode: 'DEL', city: 'Delhi', name: 'Indira Gandhi', country: 'India', aliases: ['new delhi'] },
  { iataCode: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji', country: 'India', aliases: ['bombay'] },
  { iataCode: 'BLR', city: 'Bangalore', name: 'Kempegowda', country: 'India', aliases: ['bengaluru'] },
  { iataCode: 'MAA', city: 'Chennai', name: 'Chennai', country: 'India', aliases: ['madras'] },
  { iataCode: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose', country: 'India', aliases: ['calcutta'] },
  { iataCode: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi', country: 'India' },
  { iataCode: 'AMD', city: 'Ahmedabad', name: 'Sardar Vallabhbhai Patel', country: 'India' },
  { iataCode: 'GOI', city: 'Goa', name: 'Goa', country: 'India' },
  // Sri Lanka
  { iataCode: 'CMB', city: 'Colombo', name: 'Bandaranaike', country: 'Sri Lanka' },
  // Nepal
  { iataCode: 'KTM', city: 'Kathmandu', name: 'Tribhuvan', country: 'Nepal' },
  // Bangladesh
  { iataCode: 'DAC', city: 'Dhaka', name: 'Hazrat Shahjalal', country: 'Bangladesh' },
  // Thailand
  { iataCode: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi', country: 'Thailanda' },
  { iataCode: 'DMK', city: 'Bangkok', name: 'Don Mueang', country: 'Thailanda' },
  { iataCode: 'HKT', city: 'Phuket', name: 'Phuket', country: 'Thailanda' },
  { iataCode: 'CNX', city: 'Chiang Mai', name: 'Chiang Mai', country: 'Thailanda' },
  { iataCode: 'USM', city: 'Koh Samui', name: 'Samui', country: 'Thailanda' },
  // Vietnam
  { iataCode: 'SGN', city: 'Ho Chi Minh', name: 'Tan Son Nhat', country: 'Vietnam', aliases: ['saigon', 'hcmc'] },
  { iataCode: 'HAN', city: 'Hanoi', name: 'Noi Bai', country: 'Vietnam' },
  { iataCode: 'DAD', city: 'Da Nang', name: 'Da Nang', country: 'Vietnam' },
  // Cambodia
  { iataCode: 'PNH', city: 'Phnom Penh', name: 'Phnom Penh', country: 'Cambodgia' },
  { iataCode: 'REP', city: 'Siem Reap', name: 'Angkor', country: 'Cambodgia', aliases: ['angkor', 'angkor wat'] },
  // Myanmar
  { iataCode: 'RGN', city: 'Rangoon', name: 'Yangon', country: 'Myanmar', aliases: ['yangon'] },
  // Malaysia
  { iataCode: 'KUL', city: 'Kuala Lumpur', name: 'KLIA', country: 'Malaysia' },
  { iataCode: 'LGK', city: 'Langkawi', name: 'Langkawi', country: 'Malaysia' },
  { iataCode: 'PEN', city: 'Penang', name: 'Penang', country: 'Malaysia' },
  // Singapore
  { iataCode: 'SIN', city: 'Singapore', name: 'Changi', country: 'Singapore' },
  // Indonesia
  { iataCode: 'CGK', city: 'Jakarta', name: 'Soekarno-Hatta', country: 'Indonezia' },
  { iataCode: 'DPS', city: 'Bali', name: 'Ngurah Rai', country: 'Indonezia', aliases: ['denpasar'] },
  { iataCode: 'SUB', city: 'Surabaya', name: 'Juanda', country: 'Indonezia' },
  // Philippines
  { iataCode: 'MNL', city: 'Manila', name: 'Ninoy Aquino', country: 'Filipine' },
  { iataCode: 'CEB', city: 'Cebu', name: 'Mactan-Cebu', country: 'Filipine' },
  // Japan
  { iataCode: 'NRT', city: 'Tokyo', name: 'Narita', country: 'Japonia' },
  { iataCode: 'HND', city: 'Tokyo', name: 'Haneda', country: 'Japonia' },
  { iataCode: 'KIX', city: 'Osaka', name: 'Kansai', country: 'Japonia' },
  { iataCode: 'ITM', city: 'Osaka', name: 'Itami', country: 'Japonia' },
  { iataCode: 'NGO', city: 'Nagoya', name: 'Chubu Centrair', country: 'Japonia' },
  { iataCode: 'CTS', city: 'Sapporo', name: 'New Chitose', country: 'Japonia' },
  { iataCode: 'FUK', city: 'Fukuoka', name: 'Fukuoka', country: 'Japonia' },
  { iataCode: 'OKA', city: 'Okinawa', name: 'Naha', country: 'Japonia' },
  // South Korea
  { iataCode: 'ICN', city: 'Seoul', name: 'Incheon', country: 'Coreea de Sud' },
  { iataCode: 'GMP', city: 'Seoul', name: 'Gimpo', country: 'Coreea de Sud' },
  { iataCode: 'PUS', city: 'Busan', name: 'Gimhae', country: 'Coreea de Sud' },
  // China
  { iataCode: 'PEK', city: 'Beijing', name: 'Capital', country: 'China', aliases: ['peking'] },
  { iataCode: 'PKX', city: 'Beijing', name: 'Daxing', country: 'China' },
  { iataCode: 'PVG', city: 'Shanghai', name: 'Pudong', country: 'China' },
  { iataCode: 'SHA', city: 'Shanghai', name: 'Hongqiao', country: 'China' },
  { iataCode: 'CAN', city: 'Guangzhou', name: 'Baiyun', country: 'China' },
  { iataCode: 'SZX', city: 'Shenzhen', name: 'Bao\'an', country: 'China' },
  { iataCode: 'CTU', city: 'Chengdu', name: 'Shuangliu', country: 'China' },
  { iataCode: 'KMG', city: 'Kunming', name: 'Changshui', country: 'China' },
  // Hong Kong
  { iataCode: 'HKG', city: 'Hong Kong', name: 'Chek Lap Kok', country: 'Hong Kong' },
  // Taiwan
  { iataCode: 'TPE', city: 'Taipei', name: 'Taoyuan', country: 'Taiwan' },
  // Mongolia
  { iataCode: 'ULN', city: 'Ulaanbaatar', name: 'Chinggis Khaan', country: 'Mongolia' },
  // Australia
  { iataCode: 'SYD', city: 'Sydney', name: 'Kingsford Smith', country: 'Australia' },
  { iataCode: 'MEL', city: 'Melbourne', name: 'Tullamarine', country: 'Australia' },
  { iataCode: 'BNE', city: 'Brisbane', name: 'Brisbane', country: 'Australia' },
  { iataCode: 'PER', city: 'Perth', name: 'Perth', country: 'Australia' },
  { iataCode: 'ADL', city: 'Adelaide', name: 'Adelaide', country: 'Australia' },
  { iataCode: 'CNS', city: 'Cairns', name: 'Cairns', country: 'Australia' },
  // New Zealand
  { iataCode: 'AKL', city: 'Auckland', name: 'Auckland', country: 'Noua Zeelandă' },
  { iataCode: 'CHC', city: 'Christchurch', name: 'Christchurch', country: 'Noua Zeelandă' },
  // US
  { iataCode: 'JFK', city: 'New York', name: 'John F. Kennedy', country: 'SUA' },
  { iataCode: 'EWR', city: 'New York', name: 'Newark', country: 'SUA' },
  { iataCode: 'LGA', city: 'New York', name: 'LaGuardia', country: 'SUA' },
  { iataCode: 'LAX', city: 'Los Angeles', name: 'LAX', country: 'SUA' },
  { iataCode: 'ORD', city: 'Chicago', name: "O'Hare", country: 'SUA' },
  { iataCode: 'MDW', city: 'Chicago', name: 'Midway', country: 'SUA' },
  { iataCode: 'MIA', city: 'Miami', name: 'Miami', country: 'SUA' },
  { iataCode: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson', country: 'SUA' },
  { iataCode: 'SFO', city: 'San Francisco', name: 'San Francisco', country: 'SUA' },
  { iataCode: 'SEA', city: 'Seattle', name: 'Sea-Tac', country: 'SUA' },
  { iataCode: 'BOS', city: 'Boston', name: 'Logan', country: 'SUA' },
  { iataCode: 'DFW', city: 'Dallas', name: 'Fort Worth', country: 'SUA' },
  { iataCode: 'IAD', city: 'Washington', name: 'Dulles', country: 'SUA' },
  { iataCode: 'DCA', city: 'Washington', name: 'Reagan', country: 'SUA' },
  { iataCode: 'LAS', city: 'Las Vegas', name: 'Harry Reid', country: 'SUA' },
  { iataCode: 'DEN', city: 'Denver', name: 'Denver', country: 'SUA' },
  { iataCode: 'HNL', city: 'Honolulu', name: 'Daniel K. Inouye', country: 'SUA', aliases: ['hawaii'] },
  { iataCode: 'MCO', city: 'Orlando', name: 'Orlando', country: 'SUA' },
  { iataCode: 'PHX', city: 'Phoenix', name: 'Sky Harbor', country: 'SUA' },
  { iataCode: 'IAH', city: 'Houston', name: 'George Bush', country: 'SUA' },
  // Canada
  { iataCode: 'YYZ', city: 'Toronto', name: 'Pearson', country: 'Canada' },
  { iataCode: 'YUL', city: 'Montreal', name: 'Trudeau', country: 'Canada' },
  { iataCode: 'YVR', city: 'Vancouver', name: 'Vancouver', country: 'Canada' },
  { iataCode: 'YYC', city: 'Calgary', name: 'Calgary', country: 'Canada' },
  { iataCode: 'YEG', city: 'Edmonton', name: 'Edmonton', country: 'Canada' },
  // Mexico
  { iataCode: 'MEX', city: 'Mexico City', name: 'Benito Juárez', country: 'Mexic', aliases: ['ciudad de mexico'] },
  { iataCode: 'CUN', city: 'Cancún', name: 'Cancún', country: 'Mexic' },
  { iataCode: 'GDL', city: 'Guadalajara', name: 'Miguel Hidalgo', country: 'Mexic' },
  { iataCode: 'MTY', city: 'Monterrey', name: 'Mariano Escobedo', country: 'Mexic' },
  { iataCode: 'PVR', city: 'Puerto Vallarta', name: 'Licenciado Gustavo Díaz Ordaz', country: 'Mexic' },
  { iataCode: 'SJD', city: 'Los Cabos', name: 'Los Cabos', country: 'Mexic' },
  // Cuba
  { iataCode: 'HAV', city: 'Havana', name: 'José Martí', country: 'Cuba' },
  { iataCode: 'VRA', city: 'Varadero', name: 'Juan Gualberto Gómez', country: 'Cuba' },
  // Dominican Republic
  { iataCode: 'PUJ', city: 'Punta Cana', name: 'Punta Cana', country: 'Rep. Dominicană' },
  { iataCode: 'SDQ', city: 'Santo Domingo', name: 'Las Américas', country: 'Rep. Dominicană' },
  // Jamaica
  { iataCode: 'MBJ', city: 'Montego Bay', name: 'Sangster', country: 'Jamaica' },
  { iataCode: 'KIN', city: 'Kingston', name: 'Norman Manley', country: 'Jamaica' },
  // Barbados
  { iataCode: 'BGI', city: 'Bridgetown', name: 'Grantley Adams', country: 'Barbados' },
  // Trinidad
  { iataCode: 'POS', city: 'Port of Spain', name: 'Piarco', country: 'Trinidad și Tobago' },
  // Colombia
  { iataCode: 'BOG', city: 'Bogotá', name: 'El Dorado', country: 'Columbia' },
  { iataCode: 'MDE', city: 'Medellín', name: 'José María Córdova', country: 'Columbia' },
  { iataCode: 'CTG', city: 'Cartagena', name: 'Rafael Núñez', country: 'Columbia' },
  // Venezuela
  { iataCode: 'CCS', city: 'Caracas', name: 'Simón Bolívar', country: 'Venezuela' },
  // Peru
  { iataCode: 'LIM', city: 'Lima', name: 'Jorge Chávez', country: 'Peru' },
  { iataCode: 'CUZ', city: 'Cusco', name: 'Alejandro Velasco Astete', country: 'Peru', aliases: ['machu picchu', 'cuzco'] },
  // Brazil
  { iataCode: 'GRU', city: 'São Paulo', name: 'Guarulhos', country: 'Brazilia' },
  { iataCode: 'CGH', city: 'São Paulo', name: 'Congonhas', country: 'Brazilia' },
  { iataCode: 'GIG', city: 'Rio de Janeiro', name: 'Galeão', country: 'Brazilia' },
  { iataCode: 'SDU', city: 'Rio de Janeiro', name: 'Santos Dumont', country: 'Brazilia' },
  { iataCode: 'BSB', city: 'Brasília', name: 'Juscelino Kubitschek', country: 'Brazilia' },
  { iataCode: 'SSA', city: 'Salvador', name: 'Deputado Luís Eduardo Magalhães', country: 'Brazilia' },
  { iataCode: 'FOR', city: 'Fortaleza', name: 'Pinto Martins', country: 'Brazilia' },
  { iataCode: 'REC', city: 'Recife', name: 'Guararapes', country: 'Brazilia' },
  { iataCode: 'MAO', city: 'Manaus', name: 'Eduardo Gomes', country: 'Brazilia' },
  // Argentina
  { iataCode: 'EZE', city: 'Buenos Aires', name: 'Ezeiza', country: 'Argentina' },
  { iataCode: 'AEP', city: 'Buenos Aires', name: 'Jorge Newbery', country: 'Argentina' },
  { iataCode: 'COR', city: 'Córdoba', name: 'Ambrosio Taravella', country: 'Argentina' },
  { iataCode: 'MDZ', city: 'Mendoza', name: 'El Plumerillo', country: 'Argentina' },
  // Chile
  { iataCode: 'SCL', city: 'Santiago', name: 'Arturo Merino Benítez', country: 'Chile' },
  // Bolivia
  { iataCode: 'VVI', city: 'Santa Cruz', name: 'Viru Viru', country: 'Bolivia' },
  { iataCode: 'LPB', city: 'La Paz', name: 'El Alto', country: 'Bolivia' },
  // Ecuador
  { iataCode: 'UIO', city: 'Quito', name: 'Mariscal Sucre', country: 'Ecuador' },
  { iataCode: 'GYE', city: 'Guayaquil', name: 'José Joaquín de Olmedo', country: 'Ecuador' },
  // Paraguay
  { iataCode: 'ASU', city: 'Asunción', name: 'Silvio Pettirossi', country: 'Paraguay' },
  // Uruguay
  { iataCode: 'MVD', city: 'Montevideo', name: 'Carrasco', country: 'Uruguay' },
  // South Africa
  { iataCode: 'JNB', city: 'Johannesburg', name: 'O.R. Tambo', country: 'Africa de Sud' },
  { iataCode: 'CPT', city: 'Cape Town', name: 'Cape Town', country: 'Africa de Sud', aliases: ['capetown'] },
  { iataCode: 'DUR', city: 'Durban', name: 'King Shaka', country: 'Africa de Sud' },
  // Kenya
  { iataCode: 'NBO', city: 'Nairobi', name: 'Jomo Kenyatta', country: 'Kenya' },
  { iataCode: 'MBA', city: 'Mombasa', name: 'Moi', country: 'Kenya' },
  // Tanzania
  { iataCode: 'DAR', city: 'Dar es Salaam', name: 'Julius Nyerere', country: 'Tanzania' },
  { iataCode: 'ZNZ', city: 'Zanzibar', name: 'Abeid Amani Karume', country: 'Tanzania' },
  // Ethiopia
  { iataCode: 'ADD', city: 'Addis Ababa', name: 'Bole', country: 'Etiopia' },
  // Nigeria
  { iataCode: 'LOS', city: 'Lagos', name: 'Murtala Muhammed', country: 'Nigeria' },
  { iataCode: 'ABV', city: 'Abuja', name: 'Nnamdi Azikiwe', country: 'Nigeria' },
  // Ghana
  { iataCode: 'ACC', city: 'Accra', name: 'Kotoka', country: 'Ghana' },
  // Senegal
  { iataCode: 'DSS', city: 'Dakar', name: 'Blaise Diagne', country: 'Senegal' },
  // Ivory Coast
  { iataCode: 'ABJ', city: 'Abidjan', name: 'Félix Houphouët-Boigny', country: 'Coasta de Fildeș' },
  // Tunisia
  { iataCode: 'TUN', city: 'Tunis', name: 'Carthage', country: 'Tunisia' },
  { iataCode: 'DJE', city: 'Djerba', name: 'Zarzis', country: 'Tunisia' },
  // Algeria
  { iataCode: 'ALG', city: 'Alger', name: 'Houari Boumediene', country: 'Algeria' },
  // Libya
  { iataCode: 'TIP', city: 'Tripoli', name: 'Mitiga', country: 'Libia' },
  // Mozambique
  { iataCode: 'MPM', city: 'Maputo', name: 'Maputo', country: 'Mozambic' },
  // Madagascar
  { iataCode: 'TNR', city: 'Antananarivo', name: 'Ivato', country: 'Madagascar' },
  // Mauritius
  { iataCode: 'MRU', city: 'Mauritius', name: 'Sir Seewoosagur Ramgoolam', country: 'Mauritius' },
  // Reunion
  { iataCode: 'RUN', city: 'Saint-Denis', name: 'Roland Garros', country: 'Réunion' },
  // Maldives
  { iataCode: 'MLE', city: 'Malé', name: 'Velana', country: 'Maldive' },
  // Seychelles
  { iataCode: 'SEZ', city: 'Mahé', name: 'Seychelles', country: 'Seychelles' },
  // Rwanda
  { iataCode: 'KGL', city: 'Kigali', name: 'Kigali', country: 'Rwanda' },
  // Uganda
  { iataCode: 'EBB', city: 'Kampala', name: 'Entebbe', country: 'Uganda' },
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
