// src/components/cart/ShippingTaxEstimator.js
import React, { useState, useEffect, useCallback } from 'react';
import locationService from '../shared/locationServices';

export const ShippingTaxEstimator = ({ onShippingChange }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('NG'); // Default to Nigeria
  const [selectedState, setSelectedState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('pickup');
  const [shippingCost, setShippingCost] = useState(0);
  const [error, setError] = useState(null);

  // Load countries on component mount
  useEffect(() => {
    loadCountries();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      loadStates(selectedCountry);
    }
  }, [selectedCountry]);

  // Calculate shipping when location or method changes
  useEffect(() => {
    calculateShipping();
  }, [selectedCountry, selectedState, shippingMethod, postalCode]);

  const loadCountries = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const countriesData = await locationService.getCountries();
      setCountries(countriesData);
      
      // Load states for default country (Nigeria)
      if (countriesData.length > 0) {
        loadStates('NG');
      }
    } catch (err) {
      console.error('Failed to load countries:', err);
      setError('Failed to load countries. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadStates = useCallback(async (countryCode) => {
    if (!countryCode) return;
    
    setLoadingStates(true);
    setSelectedState(''); // Reset state selection
    setStates([]);
    
    try {
      const countryName = countries.find(c => c.code === countryCode)?.name || '';
      const statesData = await locationService.getStates(countryCode, countryName);
      setStates(statesData);
    } catch (err) {
      console.error('Failed to load states:', err);
      setStates([]); // Set empty array on error
    } finally {
      setLoadingStates(false);
    }
  }, [countries]);

  const calculateShipping = useCallback(() => {
    let cost = 0;
    
    // Shipping calculation logic based on country and method
    if (shippingMethod === 'pickup') {
      cost = 0; // Free pickup
    } else if (shippingMethod === 'standard') {
      // Different costs for different countries
      const shippingRates = {
        'NG': 1500,  // ₦1,500 for Nigeria
        'US': 25,    // $25 for US
        'GB': 20,    // £20 for UK
        'CA': 30,    // $30 CAD for Canada
        'AU': 35,    // $35 AUD for Australia
      };
      cost = shippingRates[selectedCountry] || 50; // Default international shipping
    } else if (shippingMethod === 'express') {
      const expressRates = {
        'NG': 3000,  // ₦3,000 for Nigeria
        'US': 50,    // $50 for US
        'GB': 40,    // £40 for UK
        'CA': 60,    // $60 CAD for Canada
        'AU': 70,    // $70 AUD for Australia
      };
      cost = expressRates[selectedCountry] || 100; // Default international express
    }
    
    setShippingCost(cost);
    
    // Notify parent component about shipping cost change
    if (onShippingChange) {
      const currency = getCurrencyForCountry(selectedCountry);
      onShippingChange({
        cost,
        currency,
        method: shippingMethod,
        country: selectedCountry,
        state: selectedState
      });
    }
  }, [selectedCountry, selectedState, shippingMethod, postalCode, onShippingChange]);

  const getCurrencyForCountry = useCallback((countryCode) => {
    const currencies = {
      'NG': 'NGN',
      'US': 'USD',
      'GB': 'GBP',
      'CA': 'CAD',
      'AU': 'AUD',
      'IN': 'INR',
      'DE': 'EUR',
      'FR': 'EUR',
    };
    return currencies[countryCode] || 'USD';
  }, []);

  const handleCountryChange = useCallback((e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
  }, []);

  const handleStateChange = useCallback((e) => {
    setSelectedState(e.target.value);
  }, []);

  const handleShippingMethodChange = useCallback((e) => {
    setShippingMethod(e.target.value);
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-[#213721] mb-4">Estimate Shipping and Tax</h3>
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#617C5F]"></div>
          <span className="ml-2 text-gray-600">Loading countries...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#213721] mb-4">Estimate Shipping and Tax</h3>
      <p className="text-gray-600 text-sm mb-4">Enter your destination to get a shipping estimate.</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Country Selection */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <select
            id="country"
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#617C5F] focus:border-[#617C5F] sm:text-sm rounded-md transition-colors"
            required
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag ? `${country.flag} ` : ''}{country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State/Province Selection */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State/Province
          </label>
          <select
            id="state"
            name="state"
            value={selectedState}
            onChange={handleStateChange}
            disabled={loadingStates || states.length === 0}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#617C5F] focus:border-[#617C5F] sm:text-sm rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          >
            <option value="">
              {loadingStates 
                ? 'Loading states...' 
                : states.length === 0 
                  ? 'No states available' 
                  : 'Please select a state/province'
              }
            </option>
            {states.map((state) => (
              <option key={state.code || state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
            Zip/Postal Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#617C5F] focus:border-[#617C5F] transition-colors"
            placeholder="Enter postal code"
          />
        </div>

        {/* Shipping Methods */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Shipping Method</h4>
          
          <div className="space-y-3">
            <div className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <input
                id="store-pickup"
                name="shipping-method"
                type="radio"
                value="pickup"
                checked={shippingMethod === 'pickup'}
                onChange={handleShippingMethodChange}
                className="focus:ring-[#617C5F] h-4 w-4 text-[#617C5F] border-gray-300"
              />
              <label htmlFor="store-pickup" className="ml-3 block text-sm text-gray-900 flex-1">
                <span className="font-medium">Store Pickup</span>
                <span className="text-gray-500 block">Free pickup at our location</span>
              </label>
              <span className="text-sm font-bold text-green-600">Free</span>
            </div>

            <div className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <input
                id="standard-shipping"
                name="shipping-method"
                type="radio"
                value="standard"
                checked={shippingMethod === 'standard'}
                onChange={handleShippingMethodChange}
                className="focus:ring-[#617C5F] h-4 w-4 text-[#617C5F] border-gray-300"
              />
              <label htmlFor="standard-shipping" className="ml-3 block text-sm text-gray-900 flex-1">
                <span className="font-medium">Standard Shipping</span>
                <span className="text-gray-500 block">5-7 business days</span>
              </label>
              <span className="text-sm font-bold text-gray-900">
                {getCurrencyForCountry(selectedCountry)} {
                  selectedCountry === 'NG' 
                    ? '1,500.00'
                    : '25.00'
                }
              </span>
            </div>

            <div className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <input
                id="express-shipping"
                name="shipping-method"
                type="radio"
                value="express"
                checked={shippingMethod === 'express'}
                onChange={handleShippingMethodChange}
                className="focus:ring-[#617C5F] h-4 w-4 text-[#617C5F] border-gray-300"
              />
              <label htmlFor="express-shipping" className="ml-3 block text-sm text-gray-900 flex-1">
                <span className="font-medium">Express Shipping</span>
                <span className="text-gray-500 block">2-3 business days</span>
              </label>
              <span className="text-sm font-bold text-gray-900">
                {getCurrencyForCountry(selectedCountry)} {
                  selectedCountry === 'NG' 
                    ? '3,000.00'
                    : '50.00'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Summary */}
        {shippingCost !== null && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">
                Estimated Shipping Cost:
              </span>
              <span className="text-sm font-bold text-green-900">
                {getCurrencyForCountry(selectedCountry)} {
                  selectedCountry === 'NG' 
                    ? shippingCost.toLocaleString() 
                    : shippingCost.toFixed(2)
                }
              </span>
            </div>
            {selectedState && (
              <p className="text-xs text-green-700 mt-1">
                Shipping to {selectedState}, {countries.find(c => c.code === selectedCountry)?.name}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};