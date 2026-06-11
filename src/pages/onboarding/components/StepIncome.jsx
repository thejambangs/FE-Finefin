const StepIncome = ({
  formData,
  handleNumericInputChange
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-black">
        1. Berapa rata-rata pemasukan bersihmu setiap bulannya?
      </h2>

      <div className="relative flex items-center w-full">
        <span className="absolute left-4 text-lg font-bold text-black">
          Rp
        </span>

        <input
          type="text"
          required
          placeholder="0"
          inputMode="numeric"
          value={formData.pemasukan}
          onChange={(e) =>
            handleNumericInputChange(
              "pemasukan",
              e.target.value
            )
          }
          className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white pl-16"
        />
      </div>

      <p className="text-sm text-gray-400">
        Bisa diisi dari gaji tetap, uang saku,
        atau rata-rata fee freelance tiap bulan
      </p>
    </div>
  );
};

export default StepIncome;
