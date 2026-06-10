const StepExpenses = ({
  formData,
  handleNumericInputChange,
  handleTextOnlyInputChange
}) => {
  return (<div className="flex flex-col gap-4">
    <h2 className="text-xl font-bold text-black">3. Yuk, catat tagihan bulanan yang nominalnya pasti dan wajib dibayar!</h2>
    <input 
        type="text" required placeholder="Nama Pengeluaran: misal, Bayar Kosan / Token Listrik" 
        value={formData.tagihanNama} 
        onChange={(e) => handleTextOnlyInputChange('tagihanNama', e.target.value)}
        className="input input-bordered w-full rounded-md border-gray-300 h-14 text-base text-black bg-white focus:border-black focus:ring-1 focus:ring-black mb-2 px-4"
    />
    <div className="relative flex items-center w-full">
        <span className="absolute left-4 text-lg font-bold text-black select-none z-10">Rp</span>
        <input 
        type="text" required placeholder="0" inputMode="numeric"
        value={formData.tagihanNominal} 
        onChange={(e) => handleNumericInputChange('tagihanNominal', e.target.value)}
        className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-1 focus:ring-black pl-16 font-medium"
        />
    </div>
</div>
);
};

export default StepExpenses;