const inputClass =
  "border border-stone-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent";
const labelClass =
  "text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block";

export default function AddressForm({ title, prefix }: any) {
  function addPrefix(field: string) {
    return `${prefix}.${field}`;
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6">
      <h2 className="text-base font-semibold text-stone-800 mb-4">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name *</label>
          <input name={addPrefix("firstName")} className={inputClass} placeholder="John" required />
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <input name={addPrefix("lastName")} className={inputClass} placeholder="Doe" required />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input name={addPrefix("email")} type="email" className={inputClass} placeholder="john@example.com" required />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input name={addPrefix("phone")} type="tel" className={inputClass} placeholder="+1 234 567 890" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Street Address *</label>
          <input name={addPrefix("address")} className={inputClass} placeholder="123 Main St" required />
        </div>
        <div>
          <label className={labelClass}>City *</label>
          <input name={addPrefix("city")} className={inputClass} placeholder="New York" required />
        </div>
        <div>
          <label className={labelClass}>ZIP / Postal Code *</label>
          <input name={addPrefix("zip")} className={inputClass} placeholder="10001" required />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Country *</label>
          <select name={addPrefix("country")} className={inputClass} defaultValue="" required>
            <option value="" disabled>Select a country</option>
            <option>United States</option>
            <option>France</option>
            <option>Germany</option>
            <option>United Kingdom</option>
            <option>Tunisia</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>
      </div>
    </div>
  );
}
