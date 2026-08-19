import React, { useState, useEffect } from 'react';
import { 
  fetchPricingConfig, 
  savePricingConfig, 
  DEFAULT_PRICING_OPTIONS, 
  type ServicePricingOption, 
  type PropertyTypeKey 
} from '../lib/pricing';
import { Calculator, Save, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export const PricingManager: React.FC = () => {
  const [pricing, setPricing] = useState<ServicePricingOption[]>(DEFAULT_PRICING_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string>('cockroach-control');

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = async () => {
    setLoading(true);
    try {
      const data = await fetchPricingConfig();
      setPricing(data);
      if (data.length > 0) {
        setActiveServiceId(data[0].id);
      }
    } catch (err) {
      console.error('Failed to load pricing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (
    serviceId: string, 
    propertyType: PropertyTypeKey, 
    field: 'min' | 'max', 
    value: string
  ) => {
    const num = parseInt(value, 10) || 0;
    setPricing((prev) =>
      prev.map((service) => {
        if (service.id !== serviceId) return service;
        return {
          ...service,
          rates: {
            ...service.rates,
            [propertyType]: {
              ...service.rates[propertyType],
              [field]: num
            }
          }
        };
      })
    );
  };

  const handleTextChange = (
    serviceId: string,
    field: 'duration' | 'guarantee',
    value: string
  ) => {
    setPricing((prev) =>
      prev.map((service) => {
        if (service.id !== serviceId) return service;
        return {
          ...service,
          [field]: value
        };
      })
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      await savePricingConfig(pricing);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      alert('Failed to save pricing configuration.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all rates back to system defaults?')) {
      setPricing(DEFAULT_PRICING_OPTIONS);
    }
  };

  const activeService = pricing.find((s) => s.id === activeServiceId) || pricing[0];
  const propertyTypes: PropertyTypeKey[] = ['Studio', '1 BHK', '2 BHK', '3+ BHK', 'Villa', 'Commercial'];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-neutral-400 font-mono text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mr-2 text-[#E8871E]" />
        Loading pricing configurations from database...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
      
      {/* Header & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#171717] border border-[#2A2A2A] p-5 rounded-xl shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#E8871E]" />
            <h2 className="text-lg font-bold font-['Montserrat'] text-white">
              Instant Rate Calculator Manager
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Update standard starting price ranges (AED). Changes will immediately reflect on the live website calculator.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-[#E8871E] hover:bg-[#d47817] text-white text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-[#E8871E]/20 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Saving...' : 'Save & Publish Rates'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-600 rounded-xl text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold">
            Pricing updated successfully! Live website calculator is now synced with these new rates.
          </span>
        </div>
      )}

      {/* Services Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {pricing.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveServiceId(service.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold font-['Montserrat'] whitespace-nowrap transition-all cursor-pointer border ${
              activeServiceId === service.id
                ? 'bg-[#E8871E] border-[#E8871E] text-white shadow-lg shadow-[#E8871E]/20'
                : 'bg-[#171717] border-[#2A2A2A] text-neutral-400 hover:text-white hover:border-neutral-600'
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Active Service Rates Editor */}
      {activeService && (
        <div className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-6 space-y-6 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-2">
            <div>
              <span className="text-[10px] font-mono text-[#E8871E] font-bold uppercase tracking-wider">
                {activeService.category === 'cleaning' ? 'Cleaning Service' : 'Pest Control Service'}
              </span>
              <h3 className="text-xl font-bold font-['Montserrat'] text-white">
                {activeService.name}
              </h3>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              Editing: <span className="text-white font-bold">{activeService.id}</span>
            </div>
          </div>

          {/* Rates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {propertyTypes.map((type) => {
              const rate = activeService.rates[type] || { min: 149, max: 249 };

              return (
                <div 
                  key={type}
                  className="bg-[#0A0A0A] border border-neutral-800 p-4 rounded-xl space-y-3 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs font-mono text-[#E8871E] uppercase">
                      {type}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">AED</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Min Price (AED)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={rate.min}
                        onChange={(e) => handlePriceChange(activeService.id, type, 'min', e.target.value)}
                        className="w-full bg-[#171717] border border-neutral-700 focus:border-[#E8871E] rounded px-3 py-2 text-white font-mono text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Max Price (AED)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={rate.max}
                        onChange={(e) => handlePriceChange(activeService.id, type, 'max', e.target.value)}
                        className="w-full bg-[#171717] border border-neutral-700 focus:border-[#E8871E] rounded px-3 py-2 text-white font-mono text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Service Specs Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-300 mb-2">
                Estimated Duration Text
              </label>
              <input
                type="text"
                value={activeService.duration}
                onChange={(e) => handleTextChange(activeService.id, 'duration', e.target.value)}
                placeholder="e.g. 45 - 60 mins"
                className="w-full bg-[#0A0A0A] border border-neutral-700 focus:border-[#E8871E] rounded-lg px-4 py-2.5 text-white text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-300 mb-2">
                Warranty / Guarantee Label
              </label>
              <input
                type="text"
                value={activeService.guarantee}
                onChange={(e) => handleTextChange(activeService.id, 'guarantee', e.target.value)}
                placeholder="e.g. 4-Month Warranty Included"
                className="w-full bg-[#0A0A0A] border border-neutral-700 focus:border-[#E8871E] rounded-lg px-4 py-2.5 text-white text-xs outline-none"
              />
            </div>
          </div>

        </div>
      )}

      {/* Info Tip */}
      <div className="p-4 bg-[#171717] border border-[#2A2A2A] rounded-xl flex items-start gap-3 text-neutral-400 text-xs leading-relaxed">
        <AlertCircle className="w-4 h-4 text-[#E8871E] shrink-0 mt-0.5" />
        <span>
          <strong>Pro-Tip:</strong> The Instant Rate Calculator on the homepage reads these exact rates dynamically. Whenever you click <strong>"Save & Publish Rates"</strong>, the new pricing is instantly stored in your cloud database and shown to all visitors.
        </span>
      </div>

    </div>
  );
};
