import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import Button from '../components/common/Button';
import { colors } from '../constants/styles';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading, error } = useAuthStore();
  
  const [step, setStep] = useState(1);
  const [bmiResult, setBmiResult] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (step === 1 && !formData.age) {
      setValidationError('Mohon isi usia Anda');
      return;
    }
    if (step === 3 && !formData.height) {
      setValidationError('Mohon isi tinggi badan');
      return;
    }
    if (step === 4 && !formData.weight) {
      setValidationError('Mohon isi berat badan');
      return;
    }
    
    if (step === 4) {
      const heightInMeters = parseFloat(formData.height) / 100;
      const bmi = (parseFloat(formData.weight) / (heightInMeters * heightInMeters)).toFixed(1);
      setBmiResult(bmi);
    }
    
    setStep(prev => prev + 1);
    setValidationError('');
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password minimal 6 karakter');
      return;
    }

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: formData.age,
      gender: formData.gender,
      height: formData.height,
      weight: formData.weight,
      bmi: bmiResult,
    };

    await register(registerData);
    if (!error) {
      navigate('/login');
    }
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Kekurangan berat badan';
    if (bmi < 24.9) return 'Normal (Ideal)';
    if (bmi < 29.9) return 'Kelebihan berat badan :(';
    return 'Obesitas';
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Berapa usia Anda?</h3>
            <p className="text-gray-700 mb-6">Kami butuh informasi ini untuk rekomendasi yang tepat</p>
            
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Masukkan usia"
              required
              autoFocus
            />
            
            <Button
              type="button"
              onClick={nextStep}
              className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold mt-4"
              disabled={!formData.age}
            >
              Lanjutkan
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Jenis kelamin Anda?</h3>
            <p className="text-gray-700 mb-6">Pilih jenis kelamin untuk perhitungan yang akurat</p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Laki-laki', value: 'male' },
                { label: 'Perempuan', value: 'female' }
              ].map((gender) => (
                <button
                  key={gender.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({...prev, gender: gender.value}));
                    nextStep();
                  }}
                  className={`p-4 rounded-xl text-base font-semibold transition-all ${
                    formData.gender === gender.value
                      ? 'bg-yellow-400 text-gray-900 shadow-md'
                      : 'bg-white/40 text-gray-900 hover:bg-white/60'
                  }`}
                >
                  {gender.label}
                </button>
              ))}
            </div>
            
            <button
              type="button"
              onClick={prevStep}
              className="text-gray-900 text-sm hover:underline font-semibold mt-2"
            >
              Kembali
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tinggi badan Anda?</h3>
            <p className="text-gray-700 mb-6">Dalam centimeter (cm)</p>
            
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Masukkan tinggi badan anda"
              required
              autoFocus
            />
            
            <div className="flex space-x-3 mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold"
              >
                Kembali
              </button>
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
                disabled={!formData.height}
              >
                Lanjutkan
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Berat badan Anda?</h3>
            <p className="text-gray-700 mb-6">Dalam kilogram (kg)</p>
            
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              step="0.1"
              className="w-full px-4 py-3 text-lg rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Masukkan berat badan anda"
              required
              autoFocus
            />
            
            <div className="flex space-x-3 mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold"
              >
                Kembali
              </button>
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
                disabled={!formData.weight}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Hasil BMI Anda</h3>
            {/* <p className="text-gray-700 mb-6">Body Mass Index (BMI)</p> */}
            
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-xl border border-white/50">
              <div className="text-4xl font-black mb-2 text-gray-900">{bmiResult}</div>
              <div className="text-lg font-semibold text-gray-800">{getBmiCategory(parseFloat(bmiResult))}</div>
            </div>
            
            <p className="text-gray-700 text-sm">
              Kami akan membantu Anda mencapai berat badan ideal dengan program yang tepat.
            </p>
            
            <Button
              type="button"
              onClick={nextStep}
              className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
            >
              Buat Akun Saya
            </Button>
            
            <button
              type="button"
              onClick={prevStep}
              className="text-gray-900 text-sm hover:underline font-semibold"
            >
              Kembali
            </button>
          </div>
        );
      case 6:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Buat Akun Anda</h3>
              <p className="text-gray-700">Isi data berikut untuk bergabung</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Nama lengkap"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Alamat email"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Password (minimal 6 karakter)"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Konfirmasi password"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold"
              >
                Kembali
              </button>
              <Button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
                disabled={isLoading}
              >
                {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
              </Button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white relative overflow-hidden">
      {/* LEFT SIDE - SAMA */}
      <div className="w-full md:w-1/2 relative flex flex-col justify-center p-10 md:pl-20 md:pr-16 min-h-[40vh] md:min-h-screen bg-[#DDF8E2] overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#6CC384] rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl opacity-30"></div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            {step <= 5 
              ? <>Mari kita kenal<br /><span className="text-green-700">Anda lebih dekat</span></>
              : <>Buat akun Anda<br /><span className="text-green-700">untuk melanjutkan</span></>
            }
          </h1>

          <p className="mt-6 text-lg text-gray-700 font-medium">
            {step === 5 && bmiResult
              ? 'Kami akan membantu Anda mencapai berat badan ideal.'
              : 'Perjalanan sehat dimulai dengan satu langkah sederhana.'
            }
          </p>

          <p className="mt-2 text-gray-600">
            Bergabunglah dengan NutriGo dan raih hidup lebih sehat.
          </p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-visible">
          <motion.img
            src="/src/assets/food_1.png"
            className="absolute w-60 h-60 object-cover rounded-full shadow-2xl z-20"
            style={{ left: '60%', bottom: '19%', transform: 'translateX(-50%)' }}
            animate={{ y: [3, -6, 3] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="/src/assets/food_2.png"
            className="absolute w-90 h-90 object-cover rounded-full shadow-2xl z-10"
            style={{ left: '62%', top: '20%', transform: 'translateX(-50%)' }}
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="/src/assets/food_2.png"
            className="absolute w-64 h-64 object-cover rounded-full shadow-2xl z-20"
            style={{ left: '87%', top: '48%', transform: 'translate(-50%, -50%)' }}
            animate={{ y: [4, -5, 4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* WAVE DIVIDER */}
      <div className="hidden md:block absolute left-1/2 h-full w-56 -ml-28 z-20">
        <svg className="h-full w-full" viewBox="0 0 200 1000" preserveAspectRatio="none">
          <path
            d="
              M 0 0
              C 80 150, 140 250, 60 380
              C -20 510, 180 620, 40 760
              C -40 880, 160 950, 20 1100
              L 200 1100
              L 200 0
              Z
            "
            fill={colors.primary}
          />
        </svg>
      </div>

      {/* RIGHT SIDE - UKURAN CARD DIKEMBALIKAN SEPERTI SEMULA */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:pr-20 relative z-10 bg-[#6CC384]">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30">
          {validationError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
              {validationError}
            </div>
          )}

          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;