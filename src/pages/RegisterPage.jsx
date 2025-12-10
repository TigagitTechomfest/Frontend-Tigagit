import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import Button from '../components/common/Button';
import { colors } from '../constants/styles';
import { FaBaby, FaWeightHanging } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import { BsPersonStanding } from 'react-icons/bs';
import { IoMale, IoFemale } from 'react-icons/io5';
import { Weight } from 'lucide-react';
import sadKhalisha from '../assets/images/sad_khalisha.png';
import happyRico from '../assets/images/happy_rico.png';
import sadAldi from '../assets/images/sad_aldi.png';

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
  const [genderSelected, setGenderSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

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
    if (validationError) setValidationError('');
    if (apiError) setApiError('');
  };

  const nextStep = () => {
    if (step === 1 && !formData.age) {
      setValidationError('Mohon isi usia Anda');
      return;
    }
    if (step === 2 && !genderSelected) {
      setValidationError('Mohon pilih jenis kelamin');
      return;
    }
    if (step === 3) {
      if (!formData.height) {
        setValidationError('Mohon isi tinggi badan');
        return;
      }
      if (parseFloat(formData.height) < 100) {
        setValidationError('Tinggi badan minimal 100 cm');
        return;
      }
    }
    if (step === 4) {
      if (!formData.weight) {
        setValidationError('Mohon isi berat badan');
        return;
      }
      if (parseFloat(formData.weight) < 10) {
        setValidationError('Berat badan minimal 10 kg');
        return;
      }
      
      const heightInMeters = parseFloat(formData.height) / 100;
      const bmi = (parseFloat(formData.weight) / (heightInMeters * heightInMeters)).toFixed(1);
      setBmiResult(bmi);
    }
    
    setStep(prev => prev + 1);
    setValidationError('');
    setApiError('');
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setValidationError('');
    setApiError('');
  };

  const saveAssessment = async (token, userId) => {
    try {
      const heightInMeters = parseFloat(formData.height) / 100;
      const bmi = (parseFloat(formData.weight) / (heightInMeters * heightInMeters)).toFixed(1);

      const assessmentData = {
        user_id: userId,
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(bmi),
        activity_level: "Moderate",
        health_goal: "Maintain", 
        dietary_preference: "Halal",
        daily_calorie_target: 2000,
        daily_protein_target: 50,
        daily_carbs_target: 250,
        daily_fat_target: 67
      };

      const response = await api.post('/assessment', assessmentData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Assessment error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setApiError('');
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Password dan konfirmasi password tidak cocok');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password minimal 6 karakter');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      });

      const { user, authorization } = response.data;
      const token = authorization.token;

      if (!token) {
        throw new Error('Gagal mendapatkan token autentikasi');
      }

      await saveAssessment(token, user.id);
      navigate('/dashboard');
    } catch (error) {
      setApiError(error.response?.data?.message || error.message || 'Terjadi kesalahan saat registrasi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Kekurangan berat badan';
    if (bmi < 24.9) return 'Normal (Ideal)';
    if (bmi < 29.9) return 'Kelebihan berat badan';
    return 'Obesitas';
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <FaBaby className="text-2xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Berapa Usia Anda?</h3>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaBaby className="text-green-500" />
              </div>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${inputNumberClass}`}
                placeholder="Masukkan usia"
                min="1"
                max="120"
                required
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-green-600 font-medium">tahun</span>
              </div>
            </div>
            
            <Button
              type="button"
              onClick={nextStep}
              className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold mt-4"
              disabled={!formData.age}
            >
              Selanjutnya
            </Button>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <BsPersonStanding className="text-2xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Jenis Kelamin</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Laki-laki', value: 'male', icon: <IoMale className="text-3xl mb-1" /> },
                { label: 'Perempuan', value: 'female', icon: <IoFemale className="text-3xl mb-1" /> }
              ].map((gender) => (
                <button
                  key={gender.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, gender: gender.value }));
                    setGenderSelected(true);
                  }}
                  className={`p-6 rounded-xl text-center transition-all border-2 ${
                    formData.gender === gender.value
                      ? 'border-yellow-400 bg-yellow-50 shadow-md'
                      : 'border-green-300 hover:border-green-400 bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`p-3 rounded-full mb-2 ${
                      formData.gender === gender.value 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {gender.icon}
                    </div>
                    <span className="font-semibold text-gray-800">{gender.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {validationError && (
              <div className="text-red-500 text-sm mt-2 text-center">{validationError}</div>
            )}
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!genderSelected}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <GiBodyHeight className="text-2xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tinggi Badan</h3>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <GiBodyHeight className="text-green-500" />
              </div>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${inputNumberClass}`}
                placeholder="Masukkan Tinggi Badan"
                min="100"
                max="250"
                required
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-green-600 font-medium">cm</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-1">
              {formData.height && parseFloat(formData.height) < 100 && (
                <span className="text-red-500">Tinggi badan minimal 100 cm</span>
              )}
              {formData.height && parseFloat(formData.height) > 250 && (
                <span className="text-yellow-600">Tinggi badan maksimal 250 cm</span>
              )}
            </div>

            {validationError && (
              <div className="text-red-500 text-sm mt-2">{validationError}</div>
            )}
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.height || parseFloat(formData.height) < 100}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Weight className="text-2xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Berat Badan</h3>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaWeightHanging className="text-green-500" />
              </div>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                min="10"
                max="300"
                className={`w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-green-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${inputNumberClass}`}
                placeholder="Masukkan Berat Badan"
                required
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-green-600 font-medium">kg</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-1">
              {formData.weight && parseFloat(formData.weight) < 10 && (
                <span className="text-red-500">Berat badan minimal 10 kg</span>
              )}
              {formData.weight && parseFloat(formData.weight) > 300 && (
                <span className="text-yellow-600">Berat badan maksimal 300 kg</span>
              )}
            </div>

            {validationError && (
              <div className="text-red-500 text-sm mt-2">{validationError}</div>
            )}
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.weight || parseFloat(formData.weight) < 10}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        );
      
      case 5:
        const bmiValue = parseFloat(bmiResult);
        const bmiCategory = getBmiCategory(bmiValue);
        
        let statusColor, statusBg, statusText, statusMessage, statusImage;
        
        if (bmiValue < 18.5) {
          statusColor = 'bg-blue-50 text-blue-700';
          statusBg = 'from-blue-50 to-blue-100';
          statusText = 'Kekurangan Berat Badan';
          statusMessage = 'Sepertinya berat badanmu masih sedikit di bawah rata-rata :( tapi nggak apa-apa! Kita bisa pelan-pelan naik bareng-bareng. Kamu pasti bisa mencapai berat idealmu dengan cara yang sehat!';
          statusImage = sadKhalisha;
        } else if (bmiValue < 24.9) {
          statusColor = 'bg-green-50 text-green-700';
          statusBg = 'from-green-50 to-emerald-100';
          statusText = 'Normal (Ideal)';
          statusMessage = 'Wah, luar biasa! Berat badanmu sudah ideal! Mari pertahankan dengan pola hidup sehat dan seimbang. Kamu keren!';
          statusImage = happyRico;
        } else {
          statusColor = 'bg-red-50 text-red-700';
          statusBg = 'from-red-50 to-pink-100';
          statusText = 'Obesitas';
          statusMessage = 'Sepertinya tubuhmu butuh sedikit perhatian nih :( Tapi nggak apa-apa, kita perbaiki pelan-pelan bareng ya. Kamu pasti bisa mencapai kondisi terbaikmu!';
          statusImage = sadAldi;
        }

        return (
          <motion.div 
            className="space-y-4 px-4 py-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-3 flex items-center justify-center">
                <img 
                  src={statusImage} 
                  alt={statusText}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Hasil BMI Kamu</h2>
            </div>
            
            <motion.div 
              className="relative bg-white rounded-xl p-3 shadow-lg overflow-hidden border-2 border-green-100"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-green-200 rounded-full opacity-20"></div>
              <div className="relative z-10">
                <div className="text-center mb-2">
                  <div className="text-4xl font-black text-gray-900 mb-2">{bmiResult}</div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColor} border border-green-200`}>
                    {statusText}
                  </div>
                </div>
                
                <div className="mt-4 mb-3">
                  <div className="h-2.5 bg-green-100 rounded-full overflow-hidden border border-green-200">
                    <div 
                      className={`h-full bg-gradient-to-r from-green-400 to-emerald-500`}
                      style={{
                        width: `${Math.min(100, Math.max(5, (bmiValue / 40) * 100))}%`,
                        transition: 'width 1s ease-in-out'
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1.5 px-1 font-medium">
                    <span className="text-blue-500">Kurus</span>
                    <span className="text-green-500">Normal</span>
                    <span className="text-red-500">Obesitas</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className={`p-3 rounded-lg bg-gradient-to-r ${statusBg} border border-green-100`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-center text-gray-800 text-xs leading-relaxed">
                {statusMessage}
              </p>
            </motion.div>
            
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold transition-colors border border-gray-200 text-sm"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white font-semibold transition-all shadow-md hover:shadow-lg text-sm"
              >
                Selanjutnya
              </button>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Buat Akun Anda</h3>
              <p className="text-gray-700">Isi data berikut untuk bergabung</p>
            </div>

            {(validationError || apiError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {validationError || apiError}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
              </Button>
            </div>
          </form>
        );
      
      default:
        return null;
    }
  };

  const inputNumberClass = "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white relative overflow-hidden">
      {/* LEFT SIDE - TETAP SAMA */}
      <div
        className="hidden md:flex w-1/2 relative items-center justify-center p-10 lg:p-16 min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/src/assets/images/bg_food.png')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-lg text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Investasi terbaik adalah investasi pada
            <span className="text-[#4CAF87]"> kesehatan Anda.</span>
          </h1>
          <p className="mt-4 text-lg">
            Mulai langkah sehatmu bersama NutriGo. Satu pilihan baik, setiap harinya.
          </p>
        </div>
      </div>

      {/* WAVE DIVIDER - TETAP SAMA */}
      <div className="hidden md:block absolute left-1/2 h-full w-56 -ml-28 z-20">
        <svg
          className="h-full w-full"
          viewBox="0 0 200 1000"
          preserveAspectRatio="none"
          style={{ filter: 'drop-shadow(-4px 0 4px rgba(0, 0, 0, 0.15))' }}
        >
          <path
            d="M 0 0 C 80 150, 140 250, 60 380 C -20 510, 180 620, 40 760 C -40 880, 160 950, 20 1100 L 200 1100 L 200 0 Z"
            fill="#0D5C3D"
          />
        </svg>
      </div>

      {/* RIGHT SIDE - GANTI WARNA BACKGROUND MENJADI #0D5C3D (sama dengan wave) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12 relative z-10 bg-[#0D5C3D]">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30">
          {validationError && step !== 6 && (
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