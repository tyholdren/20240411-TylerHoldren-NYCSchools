import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { grey } from '@mui/material/colors';

export default function SelectedSchool({
  school_name,
  zip,
  city,
  state_code,
  finalgrades,
  total_students,
  overview_paragraph,
  neighborhood,
  location,
  phone_number,
  school_email,
  website,
  academicopportunities1,
  academicopportunities2,
  school_sports,
  extracurricular_activities,
  attendance_rate,
  scores,
}) {
  const UNDEFINED_MESSAGE = 'N/A';
  const grey_300 = grey[300];
  const newLocation = location
    ? location.split(' ').slice(0, -2).join(' ')
    : location;

  const attendancePercentage = attendance_rate
    ? (attendance_rate * 100).toString().split('.')
    : UNDEFINED_MESSAGE;

  return (
    <article className="selected-school-container">
      <header className="school-header">
        <Typography variant="h5" className="selected-school__school-name">
          {school_name}
        </Typography>
        <Typography variant="subtitle2" sx={{ marginBottom: '15px' }}>
          {city}, {state_code}, {zip}
        </Typography>
      </header>
      <Stack className="selected-school__school-details">
        <Typography
          sx={{
            fontWeight: 'bold',
            borderBottom: `1px solid ${grey_300}`,
            marginBottom: 1,
          }}
          variant="subtitle1"
        >
          Basic Information
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ marginRight: 1 }} variant="subtitle2">
            Grades:
          </Typography>
          <Box variant="subtitle2">{finalgrades}</Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ marginRight: 1 }} variant="subtitle2">
            Students:
          </Typography>
          <Box variant="subtitle2">{total_students || UNDEFINED_MESSAGE}</Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ marginRight: 1 }} variant="subtitle2">
            Neighborhood:
          </Typography>
          <Box variant="subtitle2">{neighborhood || UNDEFINED_MESSAGE}</Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ marginRight: 1 }} variant="subtitle2">
            Location:
          </Typography>
          <Box variant="subtitle2">{newLocation}</Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ marginRight: 1 }} variant="subtitle2">
            Attendance rate:
          </Typography>
          <Box variant="subtitle2">{`${attendancePercentage[0]}.00 %`}</Box>
        </Stack>
      </Stack>
      <section className="selected-school__sat-scores">
        <Typography
          sx={{
            fontWeight: 'bold',
            borderBottom: `1px solid ${grey_300}`,
            marginBottom: 1,
            marginTop: 1,
          }}
          variant="subtitle1"
        >
          SAT Scores
        </Typography>
        <p>
          Number of Test Takers:{' '}
          {scores ? scores.num_of_sat_test_takers : UNDEFINED_MESSAGE}
        </p>
        <p>
          Reading Score:{' '}
          {scores ? scores.sat_critical_reading_avg_score : UNDEFINED_MESSAGE}
        </p>
        <p>
          Math Score: {scores ? scores.sat_math_avg_score : UNDEFINED_MESSAGE}
        </p>
        <p>
          Writing Score:{' '}
          {scores ? scores.sat_writing_avg_score : UNDEFINED_MESSAGE}
        </p>
      </section>
      <section className="selected-school__contact-info">
        <Typography
          sx={{
            fontWeight: 'bold',
            borderBottom: `1px solid ${grey_300}`,
            marginBottom: 1,
            marginTop: 1,
          }}
          variant="subtitle1"
        >
          Contact Information
        </Typography>
        <p>Phone: {phone_number || UNDEFINED_MESSAGE}</p>
        <p>Email: {school_email || UNDEFINED_MESSAGE}</p>
        <p>
          Website:{' '}
          {website ? (
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          ) : (
            UNDEFINED_MESSAGE
          )}
        </p>
      </section>
      <section className="selected-school__additional-info">
        <Typography
          sx={{
            fontWeight: 'bold',
            borderBottom: `1px solid ${grey_300}`,
            marginBottom: 1,
            marginTop: 1,
          }}
          variant="subtitle1"
        >
          Additional Opportunities
        </Typography>
        <ul className="selected-school__additional-info list">
          <li>{academicopportunities1 || UNDEFINED_MESSAGE}</li>
          <li>{academicopportunities2 || UNDEFINED_MESSAGE}</li>
        </ul>
        <p>Sports: {school_sports || UNDEFINED_MESSAGE}</p>
        <p>
          Extracurricular Activities:{' '}
          {extracurricular_activities || UNDEFINED_MESSAGE}
        </p>
      </section>
      <section className="school-overview">
        <Typography
          sx={{
            fontWeight: 'bold',
            borderBottom: `1px solid ${grey_300}`,
            marginBottom: 1,
            marginTop: 1,
          }}
          variant="subtitle1"
        >
          Who We Are
        </Typography>
        <p>{overview_paragraph || UNDEFINED_MESSAGE}</p>
      </section>
    </article>
  );
}
