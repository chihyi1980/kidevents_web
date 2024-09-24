import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const url = process.env.REACT_APP_API_HOST + '/api/events/' + id;

    // 發送 GET 請求到外部 API
    const response = await axios.get(url);

    // 返回外部 API 的響應數據
    res.status(200).json(response.data);
  } catch (error) {
    // 處理請求錯誤
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
} 