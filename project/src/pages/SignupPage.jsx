import React, { useState } from 'react';

function SignupPage({ onSignup }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        nid: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        motherName: '',
        fatherName: '',
        role: 'VOTER',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const res = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const msg = await res.text();
                setError(msg || 'Signup failed');
                setLoading(false);
                return;
            }
            setSuccess('Signup successful! You can now sign in.');
            setForm({
                email: '', password: '', nid: '', firstName: '', lastName: '', birthdate: '', motherName: '', fatherName: '', role: 'VOTER',
            });
            if (onSignup) onSignup();
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                {success && <div className="mb-4 text-green-600">{success}</div>}
                <div className="mb-3">
                    <label className="block mb-1">Email</label>
                    <input name="email" type="email" className="w-full border px-3 py-2 rounded" value={form.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">Password</label>
                    <input name="password" type="password" className="w-full border px-3 py-2 rounded" value={form.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">NID</label>
                    <input name="nid" className="w-full border px-3 py-2 rounded" value={form.nid} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">First Name</label>
                    <input name="firstName" className="w-full border px-3 py-2 rounded" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">Last Name</label>
                    <input name="lastName" className="w-full border px-3 py-2 rounded" value={form.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">Birthdate</label>
                    <input name="birthdate" type="date" className="w-full border px-3 py-2 rounded" value={form.birthdate} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">Mother's Name</label>
                    <input name="motherName" className="w-full border px-3 py-2 rounded" value={form.motherName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">Father's Name</label>
                    <input name="fatherName" className="w-full border px-3 py-2 rounded" value={form.fatherName} onChange={handleChange} required />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}

export default SignupPage;
