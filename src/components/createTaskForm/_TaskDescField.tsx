import React, { FC, ReactElement } from 'react';
import { TextField } from '@mui/material';
import { ITextField } from './interfaces/ITextField';
import PropTypes from 'prop-types';
export const TaskDescField: FC<ITextField> = (props): ReactElement => {
  const { onChange = (e) => console.log(e), disabled = false } = props;
  return (
    <TextField
      id="description"
      label="Task Description"
      variant="outlined"
      size="small"
      name="description"
      fullWidth
      multiline
      rows={4}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

TaskDescField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
