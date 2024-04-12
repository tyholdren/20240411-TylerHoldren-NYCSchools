import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
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
  const grey_300 = grey[300];
  const StyledTypography = styled(Typography)`
    margin-right: 0.5em;
  `;

  const StyledTypographySubtitle = styled(Typography)`
    font-weight: bold;
    border-bottom: 1px solid ${grey_300};
    margin-bottom: 1em;
    margin-top: 1em;
  `;

  const StyledBox = styled(Box)`
    font-size: 15px;
    font-weight: light;
  `;

  const ListTitle = styled(Typography)`
    font-weight: bold;
    border-bottom: 1px solid ${grey_300};
    margin-bottom: 1em;
    margin-top: 0.75em;
  `;

  const ListItem = styled.li`
    margin-top: 1em;
    font-size: 15px;
  `;

  const OverviewParagraph = styled(Typography)`
    margin-top: 1em;
  `;

  const UNDEFINED_MESSAGE = 'N/A';

  const newLocation = location
    ? location.split(' ').slice(0, -2).join(' ')
    : location;

  const attendancePercentage = attendance_rate
    ? (attendance_rate * 100).toString().split('.')
    : UNDEFINED_MESSAGE;

  return (
    <Box sx={{ padding: '15px' }}>
      <header className="school-header">
        <Typography variant="h5" className="selected-school__school-name">
          {school_name}
        </Typography>
        <Typography variant="subtitle2" sx={{ marginBottom: '15px' }}>
          {city}, {state_code}, {zip}
        </Typography>
      </header>
      <Stack className="selected-school__school-details">
        <StyledTypographySubtitle>Basic Information</StyledTypographySubtitle>
        <Stack direction="row" alignItems="center">
          <StyledTypography>Grades:</StyledTypography>
          <StyledBox>{finalgrades}</StyledBox>
        </Stack>
        <Stack direction="row" alignItems="center">
          <StyledTypography>Students:</StyledTypography>
          <StyledBox>{total_students || UNDEFINED_MESSAGE}</StyledBox>
        </Stack>
        <Stack direction="row" alignItems="center">
          <StyledTypography>Neighborhood:</StyledTypography>
          <StyledBox>{neighborhood || UNDEFINED_MESSAGE}</StyledBox>
        </Stack>
        <Stack direction="row" alignItems="center">
          <StyledTypography>Location:</StyledTypography>
          <StyledBox>{newLocation}</StyledBox>
        </Stack>
        <Stack direction="row" alignItems="center">
          <StyledTypography>Attendance rate:</StyledTypography>
          <StyledBox>{`${attendancePercentage[0]}.00 %`}</StyledBox>
        </Stack>
      </Stack>
      <section>
        <StyledTypographySubtitle>SAT Scores</StyledTypographySubtitle>
        <StyledTypography>
          Number of Test Takers:{' '}
          {scores ? scores.num_of_sat_test_takers : UNDEFINED_MESSAGE}
        </StyledTypography>
        <StyledTypography>
          Reading Score:{' '}
          {scores ? scores.sat_critical_reading_avg_score : UNDEFINED_MESSAGE}
        </StyledTypography>
        <StyledTypography>
          Math Score: {scores ? scores.sat_math_avg_score : UNDEFINED_MESSAGE}
        </StyledTypography>
        <StyledTypography>
          Writing Score:{' '}
          {scores ? scores.sat_writing_avg_score : UNDEFINED_MESSAGE}
        </StyledTypography>
      </section>
      <section>
        <StyledTypographySubtitle>Contact Information</StyledTypographySubtitle>
        <StyledTypography>
          Phone: {phone_number || UNDEFINED_MESSAGE}
        </StyledTypography>
        <StyledTypography>
          Email: {school_email || UNDEFINED_MESSAGE}
        </StyledTypography>
        <StyledTypography>
          Website:{' '}
          {website ? (
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          ) : (
            UNDEFINED_MESSAGE
          )}
        </StyledTypography>
      </section>
      <section>
        <ListTitle>Additional Opportunities</ListTitle>
        <Box component="ul">
          <Stack direction="column">
            <ListItem>{academicopportunities1 || UNDEFINED_MESSAGE}</ListItem>
            <ListItem>{academicopportunities2 || UNDEFINED_MESSAGE}</ListItem>
            <ListItem>Sports: {school_sports || UNDEFINED_MESSAGE}</ListItem>
            <ListItem>
              Extracurricular Activities:{' '}
              {extracurricular_activities || UNDEFINED_MESSAGE}
            </ListItem>
          </Stack>
        </Box>
      </section>
      <section className="school-overview">
        <ListTitle>Who We Are</ListTitle>
        <OverviewParagraph>
          {overview_paragraph || UNDEFINED_MESSAGE}
        </OverviewParagraph>
      </section>
    </Box>
  );
}
