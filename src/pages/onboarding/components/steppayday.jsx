const StepPayday = ({
  formData,
  handleInputChange
}) => {
  return (<div className="flex flex-col gap-4">
    <h2 className="text-xl font-bold text-black">2. Setiap tanggal berapa biasanya siklus keuanganmu dimulai (Tanggal Gajian)?</h2>
    <select 
    required value={formData.tanggalGajian} onChange={(e) => handleInputChange('tanggalGajian', e.target.value)}
    className="select select-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-1 focus:ring-black px-4"
    >
    <option value="">1-31 (dropdown)</option>
    {[...Array(31)].map((_, i) => (
        <option key={i + 1} value={i + 1}>Tanggal {i + 1}</option>
    ))}
    </select>
    <p className="text-sm text-gray-400">Sistem akan me-reset perhitungan kas bulananmu setiap tanggal ini</p>
</div>
);
};

export default StepPayday;