import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (err) {
        console.error('Failed to fetch user info:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const userAvatar = userInfo.avatar || `https://ui-avatars.com/api/?name=${userInfo.username}&background=333&color=f1c40f&size=128`;

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="profile-card">
        <div className="avatar-container">
          <img src={userAvatar} alt="User Avatar" className="avatar" />
        </div>
        <div className="profile-info">
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Member Since:</strong> {new Date(userInfo.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="profile-actions">
        <Link to="/bookmarks" className="bookmark-link btn">Go to Bookmarks</Link>
      </div>
    </div>
  );
};

export default ProfilePage;
