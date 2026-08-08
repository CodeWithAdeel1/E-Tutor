import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { becomeTutor } from '../api/apiService';
import { useAuth } from '../context/UserContext';

const BecomeTutorForm = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    city: '',
    country: '',
    highestQualification: '',
    institutionName: '',
    graduationYear: '',
    subjectsOfExpertise: '',
    experienceYears: '',
    pastInstitutions: '',
    certifications: '',
    availability: JSON.stringify({ days: [], timeSlots: [] }),
    hourlyRate: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);
  const [educationFiles, setEducationFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'pending', 'approved'

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '', // format date
        gender: user.gender ? user.gender.toLowerCase() : '', // Fixed optional check
        phoneNumber: user.phoneNumber || '',
        city: user.address?.city || '',
        country: user.address?.country || '',
        highestQualification: user.highestQualification || '',
        institutionName: user.institutionName || '',
        graduationYear: user.graduationYear || '',
        subjectsOfExpertise: user.subjectsOfExpertise?.join(', ') || '',
        experienceYears: user.experienceYears || '',
        pastInstitutions: user.pastInstitutions?.join(', ') || '',
        certifications: user.certifications?.join(', ') || '',
        hourlyRate: user.hourlyRate || '',
        availability: JSON.stringify(
          user.availability || { days: [], timeSlots: [] }
        ),
      }));

      if (user.role === 'Pending-Tutor') setStatus('pending');
      else if (user.role === 'Tutor') setStatus('approved');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'resumeUrl') setResumeFile(files[0]);
    else if (name === 'idProofUrl') setIdProofFile(files[0]);
    else if (name === 'educationCertificates')
      setEducationFiles(Array.from(files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();

      // Append all text fields
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });

      // Append files
      if (resumeFile) data.append('resumeUrl', resumeFile);
      if (idProofFile) data.append('idProofUrl', idProofFile);
      educationFiles.forEach((file) => {
        data.append('educationCertificates', file);
      });

      const response = await becomeTutor(data);
      setSuccess(response.message);
      setStatus('pending');

      if (response.user) updateUser(response.user);
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to submit tutor application'
      );
    } finally {
      setLoading(false);
    }
  };

  if (status === 'approved') {
    return (
      <Alert
        variant="success"
        className="mt-4 max-w-4xl mx-auto p-6 rounded-lg shadow-md"
      >
        <Alert.Heading>Your tutor request has been approved!</Alert.Heading>
        <p>
          You are now a tutor on our platform. You can start offering your
          tutoring services.
        </p>
      </Alert>
    );
  }

  if (status === 'pending') {
    return (
      <Alert
        variant="warning"
        className="mt-4 max-w-4xl mx-auto p-6 rounded-lg shadow-md"
      >
        <Alert.Heading>Your tutor application is pending review</Alert.Heading>
        <p>
          Your application has been submitted and is currently under review by
          our admin team.
        </p>
      </Alert>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Become a Tutor
      </h2>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Education */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="highestQualification"
          placeholder="Highest Qualification"
          value={formData.highestQualification}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="institutionName"
          placeholder="Institution Name"
          value={formData.institutionName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="graduationYear"
          placeholder="Graduation Year"
          value={formData.graduationYear}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="experienceYears"
          placeholder="Years of Experience"
          value={formData.experienceYears}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="subjectsOfExpertise"
          placeholder="Subjects of Expertise (comma separated)"
          value={formData.subjectsOfExpertise}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="pastInstitutions"
          placeholder="Past Institutions (comma separated)"
          value={formData.pastInstitutions}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="certifications"
          placeholder="Certifications (comma separated)"
          value={formData.certifications}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Uploads */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Resume (PDF)
          </label>
          <input
            type="file"
            name="resumeUrl"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            ID Proof (PDF, JPG, PNG)
          </label>
          <input
            type="file"
            name="idProofUrl"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Education Certificates (multiple allowed)
          </label>
          <input
            type="file"
            name="educationCertificates"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Tutoring Details */}
      <div>
        <input
          type="number"
          name="hourlyRate"
          placeholder="Hourly Rate ($)"
          value={formData.hourlyRate}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {error && (
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mt-2">
          {success}
        </Alert>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? (
          <span className="flex justify-center items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  );
};

export default BecomeTutorForm;