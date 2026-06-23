export interface AirportGroup {
  id: string        // e.g. "BUC"
  label: string     // e.g. "București"
  country: string
  codes: string[]   // e.g. ["OTP", "BBU"]
}

export const AIRPORT_GROUPS: AirportGroup[] = [
  // Romania
  { id: 'BUC', label: 'București', country: 'România', codes: ['OTP', 'BBU'] },
  // UK
  { id: 'LON', label: 'Londra', country: 'Marea Britanie', codes: ['LHR', 'LGW', 'STN', 'LTN'] },
  // France
  { id: 'PAR', label: 'Paris', country: 'Franța', codes: ['CDG', 'ORY', 'BVA'] },
  // Italy
  { id: 'MIL', label: 'Milano', country: 'Italia', codes: ['MXP', 'BGY', 'LIN'] },
  { id: 'ROM', label: 'Roma', country: 'Italia', codes: ['FCO', 'CIA'] },
  // Germany
  { id: 'HAM-ALL', label: 'Hamburg', country: 'Germania', codes: ['HAM', 'LBC'] },
  // Spain
  { id: 'MAD-ALL', label: 'Madrid', country: 'Spania', codes: ['MAD', 'TOJ'] },
  // Belgium
  { id: 'BRU-ALL', label: 'Bruxelles', country: 'Belgia', codes: ['BRU', 'CRL'] },
  // Netherlands
  { id: 'AMS-ALL', label: 'Amsterdam', country: 'Olanda', codes: ['AMS', 'EIN', 'RTM'] },
  // Sweden
  { id: 'STO', label: 'Stockholm', country: 'Suedia', codes: ['ARN', 'BMA', 'NYO', 'VST'] },
  // Denmark
  { id: 'CPH-ALL', label: 'Copenhaga', country: 'Danemarca', codes: ['CPH', 'MMX'] },
  // USA
  { id: 'NYC', label: 'New York', country: 'SUA', codes: ['JFK', 'EWR', 'LGA'] },
  { id: 'CHI', label: 'Chicago', country: 'SUA', codes: ['ORD', 'MDW'] },
  { id: 'LAX-ALL', label: 'Los Angeles', country: 'SUA', codes: ['LAX', 'BUR', 'LGB', 'ONT', 'SNA'] },
  // Japan
  { id: 'TYO', label: 'Tokyo', country: 'Japonia', codes: ['NRT', 'HND'] },
  // Switzerland
  { id: 'BSL-ALL', label: 'Basel / Mulhouse', country: 'Elveția/Franța', codes: ['BSL', 'MLH'] },
]

// Map from any IATA code to its group(s)
export const CODE_TO_GROUPS: Record<string, AirportGroup[]> = {}
for (const g of AIRPORT_GROUPS) {
  for (const code of g.codes) {
    if (!CODE_TO_GROUPS[code]) CODE_TO_GROUPS[code] = []
    CODE_TO_GROUPS[code].push(g)
  }
}
