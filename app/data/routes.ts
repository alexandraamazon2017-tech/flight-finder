export interface Route {
  code: string
  city: string
  country: string
}

export const RYANAIR_ROUTES: Record<string, Route[]> = {
  OTP: [
    { code: 'AGP', city: 'Malaga', country: 'Spain' },
    { code: 'AMM', city: 'Amman', country: 'Jordan' },
    { code: 'BER', city: 'Berlin', country: 'Germany' },
    { code: 'BGY', city: 'Milano Bergamo', country: 'Italy' },
    { code: 'BHX', city: 'Birmingham', country: 'United Kingdom' },
    { code: 'BLQ', city: 'Bologna', country: 'Italy' },
    { code: 'BRS', city: 'Bristol', country: 'United Kingdom' },
    { code: 'BVA', city: 'Paris Beauvais', country: 'France' },
    { code: 'CFU', city: 'Corfu', country: 'Greece' },
    { code: 'CHQ', city: 'Chania', country: 'Greece' },
    { code: 'CIA', city: 'Roma Ciampino', country: 'Italy' },
    { code: 'CRL', city: 'Bruxelles Charleroi', country: 'Belgium' },
    { code: 'CTA', city: 'Catania', country: 'Italy' },
    { code: 'DUB', city: 'Dublin', country: 'Ireland' },
    { code: 'EDI', city: 'Edinburgh', country: 'United Kingdom' },
    { code: 'GDN', city: 'Gdansk', country: 'Poland' },
    { code: 'GOA', city: 'Genova', country: 'Italy' },
    { code: 'JSI', city: 'Skiathos', country: 'Greece' },
    { code: 'LBA', city: 'Leeds', country: 'United Kingdom' },
    { code: 'MAD', city: 'Madrid', country: 'Spain' },
    { code: 'MAN', city: 'Manchester', country: 'United Kingdom' },
    { code: 'MLA', city: 'Malta', country: 'Malta' },
    { code: 'MRS', city: 'Marseille', country: 'France' },
    { code: 'MXP', city: 'Milano Malpensa', country: 'Italy' },
    { code: 'NAP', city: 'Naples', country: 'Italy' },
    { code: 'PEG', city: 'Perugia', country: 'Italy' },
    { code: 'PFO', city: 'Paphos', country: 'Cyprus' },
    { code: 'PMI', city: 'Palma de Mallorca', country: 'Spain' },
    { code: 'PMO', city: 'Palermo', country: 'Italy' },
    { code: 'PSA', city: 'Pisa', country: 'Italy' },
    { code: 'PSR', city: 'Pescara', country: 'Italy' },
    { code: 'SKG', city: 'Thessaloniki', country: 'Greece' },
    { code: 'STN', city: 'Londra Stansted', country: 'United Kingdom' },
    { code: 'SUF', city: 'Lamezia', country: 'Italy' },
    { code: 'TIA', city: 'Tirana', country: 'Albania' },
    { code: 'TSF', city: 'Veneția', country: 'Italy' },
    { code: 'VIE', city: 'Viena', country: 'Austria' },
    { code: 'ZAD', city: 'Zadar', country: 'Croatia' },
  ],
  CLJ: [
    { code: 'BGY', city: 'Milano Bergamo', country: 'Italy' },
    { code: 'BVA', city: 'Paris Beauvais', country: 'France' },
    { code: 'CRL', city: 'Bruxelles Charleroi', country: 'Belgium' },
    { code: 'DUB', city: 'Dublin', country: 'Ireland' },
    { code: 'STN', city: 'Londra Stansted', country: 'United Kingdom' },
  ],
  IAS: [
    { code: 'BGY', city: 'Milano Bergamo', country: 'Italy' },
    { code: 'BVA', city: 'Paris Beauvais', country: 'France' },
    { code: 'CRL', city: 'Bruxelles Charleroi', country: 'Belgium' },
    { code: 'DUB', city: 'Dublin', country: 'Ireland' },
  ],
}

export function getRoutes(origin: string): Route[] {
  return RYANAIR_ROUTES[origin] || []
}
