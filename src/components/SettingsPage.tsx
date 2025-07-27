import React, { useState } from 'react';

interface LocationItem {
  id: string;
  name: string;
  coordinates: string;
  icon: string;
}

export const SettingsPage: React.FC = () => {
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const locations: LocationItem[] = [
    {
      id: '1',
      name: 'Charles River',
      coordinates: '42.3601° N, 71.0589° W',
      icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/7c7516b37982fd08a85f2818b4f8ff66711b9dde?placeholderIfAbsent=true'
    },
    {
      id: '2',
      name: 'Santa Monica Bay',
      coordinates: '34.0522° N, 118.2437° W',
      icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/abb37c16479dd95e0d15cc70522f789f619ce1ec?placeholderIfAbsent=true'
    },
    {
      id: '3',
      name: 'Hudson River',
      coordinates: '40.7128° N, 74.0060° W',
      icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/fe85b0ac3137322fe3adfff489cce6def3063a8f?placeholderIfAbsent=true'
    }
  ];

  const handleAccountUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Account updated:', accountData);
  };

  const handleAddLocation = () => {
    console.log('Add new location');
  };

  return (
    <main className="min-w-60 overflow-hidden flex-1 shrink basis-[0%] max-w-[960px]">
      <header className="flex w-full gap-[12px_0px] text-[32px] text-white font-bold whitespace-nowrap leading-none justify-between flex-wrap p-4">
        <h1 className="min-w-72 w-72">Settings</h1>
      </header>
      
      <section className="w-full text-lg text-white font-bold whitespace-nowrap leading-none pt-4 pb-2 px-4">
        <h2>Account</h2>
      </section>
      
      <form onSubmit={handleAccountUpdate}>
        <div className="flex w-[480px] max-w-full gap-4 text-base text-white font-medium whitespace-nowrap flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full pb-2 block">Name</label>
            <input
              type="text"
              value={accountData.name}
              onChange={(e) => setAccountData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-[rgba(28,33,38,1)] border flex min-h-8 w-full rounded-lg border-[rgba(61,74,84,1)] border-solid p-2 outline-none text-white"
            />
          </div>
        </div>
        
        <div className="flex w-[480px] max-w-full gap-4 text-base text-white font-medium whitespace-nowrap flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full pb-2 block">Email</label>
            <input
              type="email"
              value={accountData.email}
              onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-[rgba(28,33,38,1)] border flex min-h-8 w-full rounded-lg border-[rgba(61,74,84,1)] border-solid p-2 outline-none text-white"
            />
          </div>
        </div>
        
        <div className="flex w-[480px] max-w-full gap-4 text-base text-white font-medium whitespace-nowrap flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full pb-2 block">Password</label>
            <input
              type="password"
              value={accountData.password}
              onChange={(e) => setAccountData(prev => ({ ...prev, password: e.target.value }))}
              className="bg-[rgba(28,33,38,1)] border flex min-h-8 w-full rounded-lg border-[rgba(61,74,84,1)] border-solid p-2 outline-none text-white"
            />
          </div>
        </div>
        
        <div className="flex w-full text-sm text-white font-bold whitespace-nowrap text-center px-4 py-3">
          <button
            type="submit"
            className="bg-[rgba(26,148,229,1)] flex min-w-[84px] min-h-10 w-[84px] items-center overflow-hidden justify-center max-w-[480px] px-4 rounded-lg hover:bg-[rgba(26,148,229,0.9)] transition-colors"
          >
            Update
          </button>
        </div>
      </form>
      
      <section className="w-full text-lg text-white font-bold whitespace-nowrap leading-none pt-4 pb-2 px-4">
        <h2>Locations</h2>
      </section>
      
      <div className="space-y-0">
        {locations.map((location) => (
          <article
            key={location.id}
            className="bg-[rgba(18,20,23,1)] flex min-h-[72px] w-full items-center gap-4 flex-wrap px-4 py-3 hover:bg-[rgba(41,51,56,0.3)] transition-colors"
          >
            <div className="bg-[rgba(41,51,56,1)] self-stretch flex min-h-12 items-center justify-center w-12 h-12 my-auto rounded-lg">
              <img
                src={location.icon}
                className="aspect-[1] object-contain w-6 self-stretch my-auto"
                alt={location.name}
              />
            </div>
            <div className="self-stretch flex flex-col items-stretch justify-center my-auto">
              <h3 className="overflow-hidden text-base text-white font-medium">
                {location.name}
              </h3>
              <p className="overflow-hidden text-sm text-[rgba(158,173,184,1)] font-normal">
                {location.coordinates}
              </p>
            </div>
          </article>
        ))}
      </div>
      
      <div className="flex w-full text-sm text-white font-bold text-center px-4 py-3">
        <button
          onClick={handleAddLocation}
          className="bg-[rgba(41,51,56,1)] flex min-w-[84px] min-h-10 w-[121px] max-w-[480px] items-center overflow-hidden justify-center px-4 rounded-lg hover:bg-[rgba(41,51,56,0.8)] transition-colors"
        >
          Add Location
        </button>
      </div>
    </main>
  );
};
