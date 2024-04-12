import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function TooltipWrapper({ message, children, open }) {
  const [arrowRef, setArrowRef] = useState(null);

  const styledMessage = (
    <Box direction="row" alignItems="center">
      <ReportProblemIcon color="error" sx={{ fontSize: '1rem', mr: 0.5 }} />
      <span style={{ color: 'red', fontSize: '1rem' }}>{message}</span>
    </Box>
  );

  return (
    <div>
      {open ? (
        <Tooltip
          title={styledMessage}
          placement="top"
          arrow
          PopperProps={{ disablePortal: true, arrowRef }}
          arrowref={setArrowRef}
          sx={{ color: 'red' }}
        >
          <Typography variant="subtitle2" component="div">
            {children}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="subtitle2" component="div">
          {children}
        </Typography>
      )}
    </div>
  );
}
