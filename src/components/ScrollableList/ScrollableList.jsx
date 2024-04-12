import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SchoolCard from '../SchoolCard/SchoolCard';

export default function ScrollableList({ schools, handleSelectedSchool }) {
  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '60vh',
        marginRight: 0,
        marginTop: '30px',
        width: 1000,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {schools.map((school, index) => (
        <SchoolCard
          key={school.dbn}
          {...school}
          handleClick={() => handleSelectedSchool(index, false)}
        />
      ))}
    </List>
  );
}
