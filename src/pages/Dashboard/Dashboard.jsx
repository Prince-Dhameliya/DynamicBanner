import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from '../../api/axios';
import { TextField, Checkbox, FormControlLabel, Button, Box, Typography, Paper } from '@mui/material';

export const Dashboard = () => {
  const [bannerData, setBannerData] = useState({
    description: '',
    timer: 60, // Default timer in seconds (used to calculate endTime)
    link: '',
    isVisible: true,
  });
  const [message, setMessage] = useState('');
  const [years, setYears] = useState(0);

  // Time Picker
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getCurrentTimer = () => {
      const daysInYear = 365;
      const leapYearDays = 366;
      let totalDays = 0;
      let currentYear = dayjs().year();
      for (let i = 0; i < years; i++) {
          totalDays += isLeapYear(currentYear + i) ? leapYearDays : daysInYear;
      }
      totalDays += days;
      const totalSeconds = (totalDays * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
      return totalSeconds;
  };

  const isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData({
      ...bannerData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = dayjs();
    const endTime = currentTime.add(getCurrentTimer(), 'second').toISOString();

    axios.post('banner', {
      description: bannerData.description,
      endTime: endTime, // Save calculated endTime
      link: bannerData.link,
      isVisible: bannerData.isVisible,
    })
    .then(response => {
      setMessage('Banner successfully saved!');
    })
    .catch(error => {
      console.error('Error saving banner:', error);
      setMessage('Failed to save the banner.');
    });
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Banner Dashboard
            </Typography>
            {message && <Typography color="error">{message}</Typography>}
            <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={bannerData.description}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={4}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6">Timer</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Years"
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            label="Days"
                            type="number"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            InputProps={{ inputProps: { min: 0, max: 364 } }}
                        />
                        <TextField
                            label="Hours"
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                            InputProps={{ inputProps: { min: 0, max: 23 } }}
                        />
                        <TextField
                            label="Minutes"
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(Number(e.target.value))}
                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                        />
                        <TextField
                            label="Seconds"
                            type="number"
                            value={seconds}
                            onChange={(e) => setSeconds(Number(e.target.value))}
                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                        />
                    </Box>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Link"
                        type="url"
                        name="link"
                        value={bannerData.link}
                        onChange={handleInputChange}
                        required
                    />
                </Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isVisible"
                            checked={bannerData.isVisible}
                            onChange={handleInputChange}
                        />
                    }
                    label="Visible"
                />
                <Box sx={{ marginTop: 2 }}>
                    <Button variant="contained" color="primary" type="submit">
                        Create Banner
                    </Button>
                </Box>
            </form>
        </Paper>
  );
};
