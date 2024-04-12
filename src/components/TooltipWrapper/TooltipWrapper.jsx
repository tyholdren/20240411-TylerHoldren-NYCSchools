import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function TooltipWrapper({ message, children, open }) {
  const [arrowref, setArrowRef] = React.useState(null);

  return (
    <div>
      {open ? (
        <Tooltip
          title={message}
          placement="top"
          arrow
          PopperProps={{ disablePortal: true }}
          arrowref={setArrowRef}
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
