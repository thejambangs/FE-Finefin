const StepYearlyExpense = ({
  formData,
  handleNumericInputChange,
  handleTextOnlyInputChange
}) => {
  return (<div className="flex flex-col gap-4">
    <h2 className="text-xl font-bold text-black">4. Ada pengeluaran besar tahunan yang mau dicicil dari sekarang? (Opsional)</h2>
    <input 
        type="text" placeholder="Nama Pengeluaran: misal, UKT Kampus / Pajak Kendaraan" 
        value={formData.cicilanNama} 
        onChange={(e) => handleTextOnlyInputChange('cicilanNama', e.target.value)}
        className="input input-bordered w-full rounded-md border-gray-300 h-14 text-base text-black bg-white focus:border-black focus:ring-1 focus:ring-black mb-2 px-4"
    />
    <div className="relative flex items-center w-full">
        <span className="absolute left-4 text-lg font-bold text-black select-none z-10">Rp</span>
        <input 
        type="text" placeholder="0" inputMode="numeric"
        value={formData.cicilanNominal} 
        onChange={(e) => handleNumericInputChange('cicilanNominal', e.target.value)}
        className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-1 focus:ring-black pl-16 font-medium"
        />
    </div>
</div>
);
};

export default StepYearlyExpense;
