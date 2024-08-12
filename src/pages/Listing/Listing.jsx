import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Banner } from '../Banner/Banner';
import './Listing.css'
import { useAuth } from '../../hooks/useAuth';
import { Box, Button } from '@mui/material';

export const Listing = () => {
  const [banners, setBanners] = useState([]);
  const { user, isAdmin, setIsAdminn } = useAuth();


  console.log(isAdmin);
  

  useEffect(() => {
    fetchBanners(isAdmin);
  }, []);
  

  const fetchBanners = (isAdmin) => {
    axios.get('/banner',
        {
          headers: { 
            'Authorization': `Bearer ${isAdmin}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
        .then(response => {
          const data = response.data;
          setBanners(data);
        });
  }

  const changeView = async () => {
    fetchBanners(!isAdmin);
    await setIsAdminn();
  }

  return (
    <div className="banner-container">
      <Box sx={{ marginBottom: 2, alignItems: 'end' }}>
          <Button variant="contained" color="primary" onClick={() => changeView()}>
              {isAdmin ? "Change to General View" : "Change to Admin View"}
          </Button>
      </Box>
        {banners.length > 0 ?
          banners.map((banner, index) => {
              return <Banner banner={banner} isAdmin={isAdmin} user={user} key={index} />
          }) :
          'No Banner'
        }
    </div>
  );
};
