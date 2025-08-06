// src/services/locationService.js

// Option 1: Using REST Countries API (Free, no API key needed)
const REST_COUNTRIES_BASE_URL = 'https://restcountries.com/v3.1';

// Option 2: Using GeoDB Cities API (Free tier available)
const GEODB_BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

// Option 3: Using Country State City API (requires API key)
// const CSC_BASE_URL = 'https://api.countrystatecity.in/v1';
// const CSC_API_KEY = process.env.REACT_APP_CSC_API_KEY;

// Option 4: Using Universal Tutorial API (Free, no key needed)
const UNIVERSAL_BASE_URL = 'https://www.universal-tutorial.com/api';

class LocationService {
  // Method 1: Using REST Countries API + Manual states data
  async getCountriesFromRestAPI() {
    try {
      const response = await fetch(`${REST_COUNTRIES_BASE_URL}/all?fields=name,cca2,flag`);
      const countries = await response.json();
      
      return countries.map(country => ({
        code: country.cca2,
        name: country.name.common,
        flag: country.flag
      })).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }

  // Method 2: Using GeoDB Cities API for states (Free tier)
  async getStatesFromGeoDB(countryCode) {
    try {
      // Note: This requires a RapidAPI key, but has a free tier
      // For now, we'll use static data as fallback
      throw new Error('GeoDB API not configured');
    } catch (error) {
      console.error('Error fetching states from GeoDB:', error);
      throw error;
    }
  }

  // Method 3: Using Country State City API (requires API key)
  async getCountriesFromCSC() {
    if (!CSC_API_KEY) {
      throw new Error('CSC API key not configured');
    }

    try {
      const response = await fetch(`${CSC_BASE_URL}/countries`, {
        headers: {
          'X-CSCAPI-KEY': CSC_API_KEY
        }
      });
      const countries = await response.json();
      
      return countries.map(country => ({
        code: country.iso2,
        name: country.name,
        flag: country.emoji
      }));
    } catch (error) {
      console.error('Error fetching countries from CSC:', error);
      throw error;
    }
  }

  async getStatesFromCSC(countryCode) {
    if (!CSC_API_KEY) {
      throw new Error('CSC API key not configured');
    }

    try {
      const response = await fetch(`${CSC_BASE_URL}/countries/${countryCode}/states`, {
        headers: {
          'X-CSCAPI-KEY': CSC_API_KEY
        }
      });
      const states = await response.json();
      
      return states.map(state => ({
        code: state.iso2,
        name: state.name
      }));
    } catch (error) {
      console.error('Error fetching states from CSC:', error);
      throw error;
    }
  }

  // Method 4: Using Universal Tutorial API (Free, but requires registration)
  async getUniversalToken() {
    try {
      // This requires registration at universal-tutorial.com
      // For now, we'll skip this and use static data
      throw new Error('Universal API not configured');
    } catch (error) {
      console.error('Error getting universal token:', error);
      throw error;
    }
  }

  async getCountriesFromUniversal() {
    try {
      const token = await this.getUniversalToken();
      const response = await fetch(`${UNIVERSAL_BASE_URL}/countries`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const countries = await response.json();
      
      return countries.map(country => ({
        code: country.country_short_name,
        name: country.country_name
      }));
    } catch (error) {
      console.error('Error fetching countries from Universal:', error);
      throw error;
    }
  }

  async getStatesFromUniversal(countryName, token) {
    try {
      const response = await fetch(`${UNIVERSAL_BASE_URL}/states/${countryName}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const states = await response.json();
      
      return states.map(state => ({
        name: state.state_name
      }));
    } catch (error) {
      console.error('Error fetching states from Universal:', error);
      throw error;
    }
  }

  // Method 5: Fallback with comprehensive static data
  getStaticCountriesData() {
    return [
      { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
      { code: 'US', name: 'United States', flag: '🇺🇸' },
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦' },
      { code: 'AU', name: 'Australia', flag: '🇦🇺' },
      { code: 'IN', name: 'India', flag: '🇮🇳' },
      { code: 'DE', name: 'Germany', flag: '🇩🇪' },
      { code: 'FR', name: 'France', flag: '🇫🇷' },
      { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
      { code: 'JP', name: 'Japan', flag: '🇯🇵' },
      { code: 'CN', name: 'China', flag: '🇨🇳' },
      { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
      { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
      { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    ].sort((a, b) => a.name.localeCompare(b.name));
  }

  getStaticStatesData() {
    return {
      'NG': [
        { name: 'Abia' }, { name: 'Adamawa' }, { name: 'Akwa Ibom' }, { name: 'Anambra' },
        { name: 'Bauchi' }, { name: 'Bayelsa' }, { name: 'Benue' }, { name: 'Borno' },
        { name: 'Cross River' }, { name: 'Delta' }, { name: 'Ebonyi' }, { name: 'Edo' },
        { name: 'Ekiti' }, { name: 'Enugu' }, { name: 'FCT - Abuja' }, { name: 'Gombe' },
        { name: 'Imo' }, { name: 'Jigawa' }, { name: 'Kaduna' }, { name: 'Kano' },
        { name: 'Katsina' }, { name: 'Kebbi' }, { name: 'Kogi' }, { name: 'Kwara' },
        { name: 'Lagos' }, { name: 'Nasarawa' }, { name: 'Niger' }, { name: 'Ogun' },
        { name: 'Ondo' }, { name: 'Osun' }, { name: 'Oyo' }, { name: 'Plateau' },
        { name: 'Rivers' }, { name: 'Sokoto' }, { name: 'Taraba' }, { name: 'Yobe' }, { name: 'Zamfara' }
      ],
      'US': [
        { name: 'Alabama' }, { name: 'Alaska' }, { name: 'Arizona' }, { name: 'Arkansas' },
        { name: 'California' }, { name: 'Colorado' }, { name: 'Connecticut' }, { name: 'Delaware' },
        { name: 'Florida' }, { name: 'Georgia' }, { name: 'Hawaii' }, { name: 'Idaho' },
        { name: 'Illinois' }, { name: 'Indiana' }, { name: 'Iowa' }, { name: 'Kansas' },
        { name: 'Kentucky' }, { name: 'Louisiana' }, { name: 'Maine' }, { name: 'Maryland' },
        { name: 'Massachusetts' }, { name: 'Michigan' }, { name: 'Minnesota' }, { name: 'Mississippi' },
        { name: 'Missouri' }, { name: 'Montana' }, { name: 'Nebraska' }, { name: 'Nevada' },
        { name: 'New Hampshire' }, { name: 'New Jersey' }, { name: 'New Mexico' }, { name: 'New York' },
        { name: 'North Carolina' }, { name: 'North Dakota' }, { name: 'Ohio' }, { name: 'Oklahoma' },
        { name: 'Oregon' }, { name: 'Pennsylvania' }, { name: 'Rhode Island' }, { name: 'South Carolina' },
        { name: 'South Dakota' }, { name: 'Tennessee' }, { name: 'Texas' }, { name: 'Utah' },
        { name: 'Vermont' }, { name: 'Virginia' }, { name: 'Washington' }, { name: 'West Virginia' },
        { name: 'Wisconsin' }, { name: 'Wyoming' }
      ],
      'GB': [
        { name: 'England' }, { name: 'Scotland' }, { name: 'Wales' }, { name: 'Northern Ireland' }
      ],
      'CA': [
        { name: 'Alberta' }, { name: 'British Columbia' }, { name: 'Manitoba' }, { name: 'New Brunswick' },
        { name: 'Newfoundland and Labrador' }, { name: 'Northwest Territories' }, { name: 'Nova Scotia' },
        { name: 'Nunavut' }, { name: 'Ontario' }, { name: 'Prince Edward Island' }, { name: 'Quebec' },
        { name: 'Saskatchewan' }, { name: 'Yukon' }
      ],
      'AU': [
        { name: 'Australian Capital Territory' }, { name: 'New South Wales' }, { name: 'Northern Territory' },
        { name: 'Queensland' }, { name: 'South Australia' }, { name: 'Tasmania' },
        { name: 'Victoria' }, { name: 'Western Australia' }
      ],
      'IN': [
        { name: 'Andhra Pradesh' }, { name: 'Arunachal Pradesh' }, { name: 'Assam' }, { name: 'Bihar' },
        { name: 'Chhattisgarh' }, { name: 'Goa' }, { name: 'Gujarat' }, { name: 'Haryana' },
        { name: 'Himachal Pradesh' }, { name: 'Jharkhand' }, { name: 'Karnataka' }, { name: 'Kerala' },
        { name: 'Madhya Pradesh' }, { name: 'Maharashtra' }, { name: 'Manipur' }, { name: 'Meghalaya' },
        { name: 'Mizoram' }, { name: 'Nagaland' }, { name: 'Odisha' }, { name: 'Punjab' },
        { name: 'Rajasthan' }, { name: 'Sikkim' }, { name: 'Tamil Nadu' }, { name: 'Telangana' },
        { name: 'Tripura' }, { name: 'Uttar Pradesh' }, { name: 'Uttarakhand' }, { name: 'West Bengal' }
      ],
      'DE': [
        { name: 'Baden-Württemberg' }, { name: 'Bavaria' }, { name: 'Berlin' }, { name: 'Brandenburg' },
        { name: 'Bremen' }, { name: 'Hamburg' }, { name: 'Hesse' }, { name: 'Lower Saxony' },
        { name: 'Mecklenburg-Vorpommern' }, { name: 'North Rhine-Westphalia' }, { name: 'Rhineland-Palatinate' },
        { name: 'Saarland' }, { name: 'Saxony' }, { name: 'Saxony-Anhalt' }, { name: 'Schleswig-Holstein' },
        { name: 'Thuringia' }
      ],
      'FR': [
        { name: 'Auvergne-Rhône-Alpes' }, { name: 'Bourgogne-Franche-Comté' }, { name: 'Bretagne' },
        { name: 'Centre-Val de Loire' }, { name: 'Corse' }, { name: 'Grand Est' },
        { name: 'Hauts-de-France' }, { name: 'Île-de-France' }, { name: 'Normandie' },
        { name: 'Nouvelle-Aquitaine' }, { name: 'Occitanie' }, { name: 'Pays de la Loire' },
        { name: 'Provence-Alpes-Côte d\'Azur' }
      ],
      'BR': [
        { name: 'Acre' }, { name: 'Alagoas' }, { name: 'Amapá' }, { name: 'Amazonas' },
        { name: 'Bahia' }, { name: 'Ceará' }, { name: 'Distrito Federal' }, { name: 'Espírito Santo' },
        { name: 'Goiás' }, { name: 'Maranhão' }, { name: 'Mato Grosso' }, { name: 'Mato Grosso do Sul' },
        { name: 'Minas Gerais' }, { name: 'Pará' }, { name: 'Paraíba' }, { name: 'Paraná' },
        { name: 'Pernambuco' }, { name: 'Piauí' }, { name: 'Rio de Janeiro' }, { name: 'Rio Grande do Norte' },
        { name: 'Rio Grande do Sul' }, { name: 'Rondônia' }, { name: 'Roraima' }, { name: 'Santa Catarina' },
        { name: 'São Paulo' }, { name: 'Sergipe' }, { name: 'Tocantins' }
      ],
      'JP': [
        { name: 'Aichi' }, { name: 'Akita' }, { name: 'Aomori' }, { name: 'Chiba' },
        { name: 'Ehime' }, { name: 'Fukui' }, { name: 'Fukuoka' }, { name: 'Fukushima' },
        { name: 'Gifu' }, { name: 'Gunma' }, { name: 'Hiroshima' }, { name: 'Hokkaido' },
        { name: 'Hyogo' }, { name: 'Ibaraki' }, { name: 'Ishikawa' }, { name: 'Iwate' },
        { name: 'Kagawa' }, { name: 'Kagoshima' }, { name: 'Kanagawa' }, { name: 'Kochi' },
        { name: 'Kumamoto' }, { name: 'Kyoto' }, { name: 'Mie' }, { name: 'Miyagi' },
        { name: 'Miyazaki' }, { name: 'Nagano' }, { name: 'Nagasaki' }, { name: 'Nara' },
        { name: 'Niigata' }, { name: 'Oita' }, { name: 'Okayama' }, { name: 'Okinawa' },
        { name: 'Osaka' }, { name: 'Saga' }, { name: 'Saitama' }, { name: 'Shiga' },
        { name: 'Shimane' }, { name: 'Shizuoka' }, { name: 'Tochigi' }, { name: 'Tokushima' },
        { name: 'Tokyo' }, { name: 'Tottori' }, { name: 'Toyama' }, { name: 'Wakayama' },
        { name: 'Yamagata' }, { name: 'Yamaguchi' }, { name: 'Yamanashi' }
      ],
      'CN': [
        { name: 'Anhui' }, { name: 'Beijing' }, { name: 'Chongqing' }, { name: 'Fujian' },
        { name: 'Gansu' }, { name: 'Guangdong' }, { name: 'Guangxi' }, { name: 'Guizhou' },
        { name: 'Hainan' }, { name: 'Hebei' }, { name: 'Heilongjiang' }, { name: 'Henan' },
        { name: 'Hubei' }, { name: 'Hunan' }, { name: 'Inner Mongolia' }, { name: 'Jiangsu' },
        { name: 'Jiangxi' }, { name: 'Jilin' }, { name: 'Liaoning' }, { name: 'Ningxia' },
        { name: 'Qinghai' }, { name: 'Shaanxi' }, { name: 'Shandong' }, { name: 'Shanghai' },
        { name: 'Shanxi' }, { name: 'Sichuan' }, { name: 'Tianjin' }, { name: 'Tibet' },
        { name: 'Xinjiang' }, { name: 'Yunnan' }, { name: 'Zhejiang' }
      ],
      'ZA': [
        { name: 'Eastern Cape' }, { name: 'Free State' }, { name: 'Gauteng' }, { name: 'KwaZulu-Natal' },
        { name: 'Limpopo' }, { name: 'Mpumalanga' }, { name: 'Northern Cape' }, { name: 'North West' },
        { name: 'Western Cape' }
      ],
      'GH': [
        { name: 'Ashanti' }, { name: 'Bono' }, { name: 'Central' }, { name: 'Eastern' },
        { name: 'Greater Accra' }, { name: 'Northern' }, { name: 'Savannah' }, { name: 'Upper East' },
        { name: 'Upper West' }, { name: 'Volta' }, { name: 'Western' }, { name: 'Western North' }
      ],
      'KE': [
        { name: 'Baringo' }, { name: 'Bomet' }, { name: 'Bungoma' }, { name: 'Busia' },
        { name: 'Elgeyo Marakwet' }, { name: 'Embu' }, { name: 'Garissa' }, { name: 'Homa Bay' },
        { name: 'Isiolo' }, { name: 'Kajiado' }, { name: 'Kakamega' }, { name: 'Kericho' },
        { name: 'Kiambu' }, { name: 'Kilifi' }, { name: 'Kirinyaga' }, { name: 'Kisii' },
        { name: 'Kisumu' }, { name: 'Kitui' }, { name: 'Kwale' }, { name: 'Laikipia' },
        { name: 'Lamu' }, { name: 'Machakos' }, { name: 'Makueni' }, { name: 'Mandera' },
        { name: 'Marsabit' }, { name: 'Meru' }, { name: 'Migori' }, { name: 'Mombasa' },
        { name: 'Murang\'a' }, { name: 'Nairobi' }, { name: 'Nakuru' }, { name: 'Nandi' },
        { name: 'Narok' }, { name: 'Nyamira' }, { name: 'Nyandarua' }, { name: 'Nyeri' },
        { name: 'Samburu' }, { name: 'Siaya' }, { name: 'Taita Taveta' }, { name: 'Tana River' },
        { name: 'Tharaka Nithi' }, { name: 'Trans Nzoia' }, { name: 'Turkana' }, { name: 'Uasin Gishu' },
        { name: 'Vihiga' }, { name: 'Wajir' }, { name: 'West Pokot' }
      ]
    };
  }

  // Main method that tries different approaches
  async getCountries() {
    try {
      // Try REST Countries API first (most reliable and free)
      return await this.getCountriesFromRestAPI();
    } catch (error) {
      console.warn('REST Countries API failed, using static data...');
      // Fallback to static data
      return this.getStaticCountriesData();
    }
  }

  async getStates(countryCode, countryName) {
    // For now, we'll use static data since the free APIs have limitations
    // and the paid APIs require configuration
    const staticData = this.getStaticStatesData();
    const states = staticData[countryCode] || [];
    
    if (states.length === 0) {
      console.log(`No states data available for ${countryCode} (${countryName}). Using empty array.`);
    }
    
    return states;
  }
}

export default new LocationService();