import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm.jsx';
import UserList from '../components/UserList.jsx';
import { createUser, getAllUsers } from '../api/userApi.js';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const userData = await getAllUsers();
      setUsers(userData || []);
    } catch (error) {
      console.error('Error loading users:', error);
      alert('Failed to load users. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    setFormLoading(true);
    try {
      await createUser(userData);
      alert('User created successfully!');
      loadUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Creation Form */}
        <div>
          <UserForm onSubmit={handleCreateUser} loading={formLoading} />
        </div>
        
        {/* User List */}
        <div>
          <UserList users={users} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;