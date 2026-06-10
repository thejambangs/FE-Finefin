const StepTarget = ({
  formData,
  handleNumericInputChange
}) => {
  return (<div className="flex flex-col gap-4">
    <h2 className="text-xl font-bold text-black">5. Berapa target minimal yang ingin kamu sisihkan untuk ditabung/investasi setiap bulannya?</h2>
    <div className="relative flex items-center w-full">
    <span className="absolute left-4 text-lg font-bold text-black select-none z-10">Rp</span>
    <input 
        type="text" required placeholder="0" inputMode="numeric"
        value={formData.targetTabungan} 
        onChange={(e) => handleNumericInputChange('targetTabungan', e.target.value)}
        className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-1 focus:ring-black pl-16 font-medium"
    />
    </div>
</div>
);
};

export default StepTarget;