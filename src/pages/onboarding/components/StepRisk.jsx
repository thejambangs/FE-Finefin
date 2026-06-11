 const StepRisk = ({
  formData,
  handleInputChange
}) => {
  return (<div className="flex flex-col gap-8 animate-fadeIn text-black pb-2">
                  {/* No 1 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">1. Berapa lama rencana Anda untuk menyimpan dana investasi ini sebelum dicairkan?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk1" className="radio radio-sm border-gray-400 animate-none" checked={formData.rencanaInvestasi === '1'} onChange={() => handleInputChange('rencanaInvestasi', '1')} />
                        <span>A. Kurang dari 1 tahun (Saya butuh uangnya dalam waktu dekat). (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk1" className="radio radio-sm border-gray-400 animate-none" checked={formData.rencanaInvestasi === '2'} onChange={() => handleInputChange('rencanaInvestasi', '2')} />
                        <span>B. 1 hingga 3 tahun (Untuk rencana jangka menengah). (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk1" className="radio radio-sm border-gray-400 animate-none" checked={formData.rencanaInvestasi === '3'} onChange={() => handleInputChange('rencanaInvestasi', '3')} />
                        <span>C. Lebih dari 3 tahun (Untuk jangka panjang). (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                  {/* No 2 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">2. Apa tujuan utama Anda dalam berinvestasi?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk2" className="radio radio-sm border-gray-400 animate-none" checked={formData.tujuanInvestasi === '1'} onChange={() => handleInputChange('tujuanInvestasi', '1')} />
                        <span>A. Mengamankan uang dari inflasi, yang penting uang saya tidak berkurang. (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk2" className="radio radio-sm border-gray-400 animate-none" checked={formData.tujuanInvestasi === '2'} onChange={() => handleInputChange('tujuanInvestasi', '2')} />
                        <span>B. Mendapatkan pertumbuhan yang stabil dan rutin, meskipun keuntungannya tidak terlalu besar. (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk2" className="radio radio-sm border-gray-400 animate-none" checked={formData.tujuanInvestasi === '3'} onChange={() => handleInputChange('tujuanInvestasi', '3')} />
                        <span>C. Mendapatkan keuntungan sebesar-besarnya, saya siap jika nilainya naik-turun secara drastis. (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                  {/* No 3 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">3. Seberapa jauh pengetahuan Anda tentang instrumen investasi?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk3" className="radio radio-sm border-gray-400 animate-none" checked={formData.pengetahuanInvestasi === '1'} onChange={() => handleInputChange('pengetahuanInvestasi', '1')} />
                        <span>A. Pemula, saya hanya tahu tabungan bank atau deposito. (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk3" className="radio radio-sm border-gray-400 animate-none" checked={formData.pengetahuanInvestasi === '2'} onChange={() => handleInputChange('pengetahuanInvestasi', '2')} />
                        <span>B. Menengah, saya cukup paham cara kerja instrumen seperti reksa dana atau obligasi pemerintah. (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk3" className="radio radio-sm border-gray-400 animate-none" checked={formData.pengetahuanInvestasi === '3'} onChange={() => handleInputChange('pengetahuanInvestasi', '3')} />
                        <span>C. Mahir, saya sudah terbiasa dengan instrumen berisiko tinggi seperti saham atau kripto. (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                  {/* No 4 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">4. Jika nilai portofolio investasi Anda tiba-tiba turun 15% dalam sebulan, apa yang akan Anda lakukan?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk4" className="radio radio-sm border-gray-400 animate-none" checked={formData.reaksiPasar === '1'} onChange={() => handleInputChange('reaksiPasar', '1')} />
                        <span>A. Panik dan segera mencairkan seluruh dana agar tidak rugi lebih banyak. (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk4" className="radio radio-sm border-gray-400 animate-none" checked={formData.reaksiPasar === '2'} onChange={() => handleInputChange('reaksiPasar', '2')} />
                        <span>B. Membiarkannya saja sambil memantau berita, karena saya yakin akan naik lagi. (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk4" className="radio radio-sm border-gray-400 animate-none" checked={formData.reaksiPasar === '3'} onChange={() => handleInputChange('reaksiPasar', '3')} />
                        <span>C. Menambah modal investasi (buy the dip) karena menganggap ini kesempatan membeli murah. (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                  {/* No 5 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">5. Dari sisa uang (surplus) yang Anda miliki setiap bulannya, berapa persen yang bersedia Anda alokasikan untuk investasi yang berisiko?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk5" className="radio radio-sm border-gray-400 animate-none" checked={formData.alokasiSurplus === '1'} onChange={() => handleInputChange('alokasiSurplus', '1')} />
                        <span>A. Kurang dari 20%, sebagian besar tetap saya simpan di tabungan biasa. (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk5" className="radio radio-sm border-gray-400 animate-none" checked={formData.alokasiSurplus === '2'} onChange={() => handleInputChange('alokasiSurplus', '2')} />
                        <span>B. Sekitar 20% - 50%. (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk5" className="radio radio-sm border-gray-400 animate-none" checked={formData.alokasiSurplus === '3'} onChange={() => handleInputChange('alokasiSurplus', '3')} />
                        <span>C. Lebih dari 50%, saya siap memaksimalkan sisa uang untuk diputar kembali. (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                </div>
  );
};


export default StepRisk;
