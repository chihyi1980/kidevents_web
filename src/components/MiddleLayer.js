import React, { useState } from 'react';
import { TextField, Box, MenuItem, Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// 下拉選單的示例資料
const regions = [
  { _id: '66dd5894d814535bb541166f', value: '新竹市' },
  { _id: '66dd520ed97689dc74a2e6f9', value: '台中' },
  { _id: '66dd4fe4c5bd9552bee9bd73', value: '台北' },
  { _id: '66dd5212d97689dc74a2e6fa', value: '高雄' },
];
const ages = ['7', '8', '9'];
const categories = [
  { _id: '66dd5235d97689dc74a2e6fe', value: '運動' },
  { _id: '66dd5229d97689dc74a2e6fb', value: '手作' },
  { _id: '66dd522dd97689dc74a2e6fc', value: '幼童' },
  { _id: '66dd5231d97689dc74a2e6fd', value: '科學' },
];

const MiddleLayer = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
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
          startAdornment: <SearchIcon />,
        }}
        sx={{ marginBottom: 2 }}
      />
      {/* 下拉選單 */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField select label="地區" fullWidth>
          {regions.map((region) => (
            <MenuItem key={region._id} value={region.value}>
              {region.value}
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
      {/* 活動分類按鈕 */}
      <Box>
        {categories.map((category) => (
          <IconButton
            key={category._id}
            onClick={() => toggleCategory(category.value)}
            color={selectedCategories.includes(category.value) ? 'primary' : 'default'}
          >
            {category.value}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default MiddleLayer;
