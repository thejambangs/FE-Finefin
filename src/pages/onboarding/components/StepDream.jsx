 const StepDream = ({
  formData,
  handleNumericInputChange,
  handleTextOnlyInputChange,
  handleInputChange
}) => {
  return (<div className="flex flex-col gap-4">
    <h2 className="text-xl font-bold text-black">6. Apa satu impian atau barang yang ingin kamu capai/beli dalam waktu dekat?</h2>
    <input 
    type="text" required placeholder="Input Teks: misal, Beli Laptop Baru, Rakit PC" 
    value={formData.impian} 
    onChange={(e) => handleInputChange('impian', e.target.value)}
    className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-1 focus:ring-black px-4"
    />
    <p className="text-sm text-gray-400">Target ini akan dipajang di Dasbor utamamu sebagai penyemangat!</p>
</div>
);
};

export default StepDream;