import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function DropDown({ onChange, value, data, text, label }) {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label2"
          className="mt-2"
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select2"
          value={value}
          onChange={onChange}
        >
          <MenuItem value={value}>{text}</MenuItem>

          {data?.length != 0 ? (
            data?.map((item, index) => {
              return (
                <MenuItem key={index} value={item.data}>
                  {item.name}
                </MenuItem>
              );
            })
          ) : (
            <div>katman yok</div>
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default DropDown;
