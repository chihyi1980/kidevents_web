import React, { useState } from 'react';
import { TextField, Box, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const regions = ['新竹市', '台中', '台北', '高雄'];
const ages = ['7', '8', '9'];
const categories = ['運動', '手作', '幼童', '科學'];

const MiddleLayer = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* 搜索框 */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="搜索..."
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
        }}
        sx={{ marginBottom: 2 }}
      />
      {/* 下拉選單 */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField select label="地區" fullWidth>
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </TextField>
        <TextField select label="年齡" fullWidth>
          {ages.map((age) => (
            <MenuItem key={age} value={age}>
              {age}
            </MenuItem>
          ))}
        </TextField>
      </Box>
          {/* 分隔線和間距 */}
          <Box sx={{ marginY: 4 }}>

          </Box>
      
      {/* 活動分類按鈕 */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategories.includes(category) ? 'contained' : 'outlined'}
            onClick={() => toggleCategory(category)}
            sx={{
              borderRadius: 20, // 圓角
              padding: '5px 15px',
              textTransform: 'none', // 取消大寫
            }}
          >
            
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default MiddleLayer;
