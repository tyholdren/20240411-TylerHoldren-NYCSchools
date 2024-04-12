import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SchoolCard({
  school_name,
  city,
  finalgrades,
  total_students,
  handleClick,
}) {
  const grades = finalgrades.length > 10 ? 'credit-based' : finalgrades;

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 0, borderBottom: 0, maxWidth: 2000 }}
      className="school-card"
    >
      <Box sx={{ p: 2 }}>
        <Stack direction="column" alignItems="center">
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ fontWeight: 'bold' }}
            component="div"
          >
            {school_name}
          </Typography>
          <Stack direction="row">
            <Typography variant="subtitle2" component="div">
              {`${city}, NY`}
            </Typography>
            <Typography variant="subtitle2" component="div">
              {`Grades: ${grades}`}
            </Typography>
            <Typography variant="subtitle2" component="div">
              {`Students: ${total_students}`}
            </Typography>
          </Stack>
        </Stack>
        <Button
          size="small"
          variant="text"
          sx={{ marginLeft: 0, marginTop: 1 }}
          onClick={handleClick}
        >
          See Details
        </Button>
      </Box>
    </Card>
  );
}
