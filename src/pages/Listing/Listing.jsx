import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Banner } from '../Banner/Banner';
import './Listing.css'
import { useAuth } from '../../hooks/useAuth';

export const Listing = () => {
  const [banners, setBanners] = useState([]);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchBanners();
  }, []);
  

  const fetchBanners = () => {
    axios.get('/banner',
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
        .then(response => {
          const data = response.data;
          setBanners(data);
        });
  }

  return (
    <div className="banner-container">
        {
            banners.map((banner, index) => {
                return <Banner banner={banner} isAdmin={isAdmin} user={user} key={index} />
            })
        }
    </div>
  );
};
