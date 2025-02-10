interface Country {
    value: string
    label: string
  }
  
  interface CountriesByContinent {
    Europe: Country[]
    Asia: Country[]
    'North America': Country[]
    'South America': Country[]
  }
  
  export const COUNTRIES_BY_CONTINENT: CountriesByContinent = {
    Europe: [
      { value: 'albania', label: 'Albania' },
      { value: 'andorra', label: 'Andorra' },
      { value: 'austria', label: 'Austria' },
      { value: 'belgium', label: 'Belgium' },
      { value: 'bulgaria', label: 'Bulgaria' },
      { value: 'croatia', label: 'Croatia' },
      { value: 'cyprus', label: 'Cyprus' },
      { value: 'czech-republic', label: 'Czech Republic' },
      { value: 'denmark', label: 'Denmark' },
      { value: 'estonia', label: 'Estonia' },
      { value: 'finland', label: 'Finland' },
      { value: 'france', label: 'France' },
      { value: 'germany', label: 'Germany' },
      { value: 'greece', label: 'Greece' },
      { value: 'hungary', label: 'Hungary' },
      { value: 'iceland', label: 'Iceland' },
      { value: 'ireland', label: 'Ireland' },
      { value: 'italy', label: 'Italy' },
      { value: 'latvia', label: 'Latvia' },
      { value: 'liechtenstein', label: 'Liechtenstein' },
      { value: 'lithuania', label: 'Lithuania' },
      { value: 'luxembourg', label: 'Luxembourg' },
      { value: 'malta', label: 'Malta' },
      { value: 'monaco', label: 'Monaco' },
      { value: 'netherlands', label: 'Netherlands' },
      { value: 'norway', label: 'Norway' },
      { value: 'poland', label: 'Poland' },
      { value: 'portugal', label: 'Portugal' },
      { value: 'romania', label: 'Romania' },
      { value: 'slovakia', label: 'Slovakia' },
      { value: 'slovenia', label: 'Slovenia' },
      { value: 'spain', label: 'Spain' },
      { value: 'sweden', label: 'Sweden' },
      { value: 'switzerland', label: 'Switzerland' },
      { value: 'united-kingdom', label: 'United Kingdom' }
    ],
    Asia: [
      { value: 'afghanistan', label: 'Afghanistan' },
      { value: 'bangladesh', label: 'Bangladesh' },
      { value: 'bhutan', label: 'Bhutan' },
      { value: 'brunei', label: 'Brunei' },
      { value: 'cambodia', label: 'Cambodia' },
      { value: 'china', label: 'China' },
      { value: 'india', label: 'India' },
      { value: 'indonesia', label: 'Indonesia' },
      { value: 'japan', label: 'Japan' },
      { value: 'kazakhstan', label: 'Kazakhstan' },
      { value: 'korea-north', label: 'Korea, North' },
      { value: 'korea-south', label: 'Korea, South' },
      { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
      { value: 'laos', label: 'Laos' },
      { value: 'malaysia', label: 'Malaysia' },
      { value: 'maldives', label: 'Maldives' },
      { value: 'mongolia', label: 'Mongolia' },
      { value: 'myanmar', label: 'Myanmar' },
      { value: 'nepal', label: 'Nepal' },
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'philippines', label: 'Philippines' },
      { value: 'singapore', label: 'Singapore' },
      { value: 'sri-lanka', label: 'Sri Lanka' },
      { value: 'taiwan', label: 'Taiwan' },
      { value: 'tajikistan', label: 'Tajikistan' },
      { value: 'thailand', label: 'Thailand' },
      { value: 'timor-leste', label: 'Timor-Leste' },
      { value: 'turkmenistan', label: 'Turkmenistan' },
      { value: 'uzbekistan', label: 'Uzbekistan' },
      { value: 'vietnam', label: 'Vietnam' }
    ],
    'North America': [
      { value: 'canada', label: 'Canada' },
      { value: 'mexico', label: 'Mexico' },
      { value: 'united-states', label: 'United States' },
      { value: 'costa-rica', label: 'Costa Rica' },
      { value: 'cuba', label: 'Cuba' },
      { value: 'dominican-republic', label: 'Dominican Republic' },
      { value: 'el-salvador', label: 'El Salvador' },
      { value: 'guatemala', label: 'Guatemala' },
      { value: 'haiti', label: 'Haiti' },
      { value: 'honduras', label: 'Honduras' },
      { value: 'jamaica', label: 'Jamaica' },
      { value: 'nicaragua', label: 'Nicaragua' },
      { value: 'panama', label: 'Panama' },
      { value: 'trinidad-and-tobago', label: 'Trinidad and Tobago' }
    ],
    'South America': [
      { value: 'argentina', label: 'Argentina' },
      { value: 'bolivia', label: 'Bolivia' },
      { value: 'brazil', label: 'Brazil' },
      { value: 'chile', label: 'Chile' },
      { value: 'colombia', label: 'Colombia' },
      { value: 'ecuador', label: 'Ecuador' },
      { value: 'guyana', label: 'Guyana' },
      { value: 'paraguay', label: 'Paraguay' },
      { value: 'peru', label: 'Peru' },
      { value: 'suriname', label: 'Suriname' },
      { value: 'uruguay', label: 'Uruguay' },
      { value: 'venezuela', label: 'Venezuela' }
    ]
  }
  
  // Helper function to get flat array of all countries
  export const getAllCountries = (): Country[] => {
    return Object.values(COUNTRIES_BY_CONTINENT).flat()
  }
  
  // Helper function to get country label by value
  export const getCountryLabel = (value: string): string => {
    const country = getAllCountries().find(country => country.value === value)
    return country?.label || value
  }
  
  export default COUNTRIES_BY_CONTINENT