import React, { useState, useEffect } from 'react';
import { TextField, Box, MenuItem, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Masonry } from '@mui/lab';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import EventDetail from './EventDetail'; // 引入 EventDetail 組件

const regions = ['新竹市', '台中', '台北', '高雄'];
const ages = ['7', '8', '9'];
const categories = ['運動', '手作', '幼童', '科學'];
const events = [
  {
    "_id": "66dd5908d814535bb5411670",
    "event_content": "免費活動\n\n講者:  陳龍老師 (美國大學 博士候選人, 曾為中山大學附屬學院教師)\n\n芬蘭父母老師不追求 孩子成績, 為何國家數學成績常第一\n\n\n1. 芬蘭的教育\n\n2. 芬蘭的幸福指數\n\n3. 芬蘭的幸福 價值觀\n4. Q & A\n\n\n時間: 2024/9/9 星期一 晚上 7:30 (19:30) \n\n新竹市明湖路1200巷112號  (3F, 管理室 三樓)\n",
    "event_end_date": "2024-09-09",
    "event_img": "https://www.beclass.com/share/202409/294da0766d6c13a3ae1f0340r.jpg",
    "event_link": "https://www.beclass.com/rid=294da0766d6c13a3ae1f",
    "event_loc_detail": "新竹市明湖路1200巷112號  (3F, 管理室 三樓)",
    "event_loc_name": "新竹市",
    "event_max_age": '',
    "event_min_age": '',
    "event_name": "賺錢成績外的芬蘭幸福",
    "event_price": "100",
    "event_start_date": "2024-09-09",
    "event_tag_names": [
      "手作",
      "運動"
    ]
  },
  {
    "_id": "66dd5308d97689dc74a2e6ff",
    "event_content": "活動延伸：222\n\n老師現場會準備一個紙箱，讓學生發揮創意回答，紙箱可以變成什麼？另外一邊教顏色、形狀的英文，並讓學生動手參與故事的過程，合力將紙箱創作成火箭、潛水艇等作品，引導學生在生活上其實可以將現有資源再利用，達到永續環保的意義。",
    "event_end_date": "2024-09-11",
    "event_img": "https://cdn.prod.website-files.com/63305270d726c747d0ccb9a5/6363da39b397f1e64fadea5e_pexels-leeloo-thefirst-5561913-p-1080.webp",
    "event_link": "https://www.beclass.com/rid=294d9b866c94fd06a44e",
    "event_loc_detail": "B1多功能活動室：406台中市北屯區豐樂路二段158號111",
    "event_loc_name": "台中",
    "event_max_age": 11,
    "event_min_age": 6,
    "event_name": "夢幻雙語故事-Pete the Cat’s Groovy Imagination皮皮貓的奇幻想像力",
    "event_price": "0",
    "event_start_date": "2024-09-11",
    "event_tag_names": [
      "運動",
      "手作",
      "幼童"
    ]
  },
  {
    "_id": "66e68a030a3a8ff6f675d387",
    "event_content": "啟發學童從故事中培養自我感受力、表達力與創造力，讓每位孩子平等地享受英語閱讀、讓每個家庭透過閱讀豐富生活。\n\n\n\n故事導讀\n\n優良蛋是模範生、好孩子，時常看不慣別人不對的行為，結果反而導致自己越來越不開心。他以為做這些是為了別人好，事情也無法改變，最後他離開團體，經過各種抒壓方法找回了自己。\n\n活動延伸\n現場會準備各種情緒表情的面具，一邊教開心的、生氣的、害怕的等英文，並讓學生參與故事的過程，感受主角優良蛋現在面對到的情境，會是哪一種心情？",
    "event_end_date": "2024-09-15",
    "event_img": "",
    "event_link": "https://www.beclass.com/rid=294d9b766c81f9ced2d7",
    "event_loc_detail": "地點：台中市豐樂路二段158號 (總館) B1多功能活動室：406台中市北屯區豐樂路二段158號",
    "event_loc_name": "台中",
    "event_max_age": 11,
    "event_min_age": 6,
    "event_name": "夢幻雙語故事-The Good Egg 優良蛋",
    "event_price": "0",
    "event_start_date": "2024-09-15",
    "event_tag_names": [
      "手作"
    ]
  },
  {
    "_id": "66e68a470a3a8ff6f675d388",
    "event_content": "113年親職講座-心連心計畫-青少年(親子)心理健康講座-網癮停看聽\n\n講題：如何陪伴孩子脫\"癮\"而出？\n\n講師：張永安諮商師\n\n    ~~~孩子沈迷網路怎麼辦？~~~\n\n    怎麼辦?該不會一不注意就網路成癮了吧?\n\n    數位時代親子必修的課程，期待網路的世界裡，親子關係不迷路！家長與孩子溝通網路使用的時間及方式刻不容緩，如何訂立一個雙方都認可的網路使用規範，能平心靜氣且都能遵守是很重要的能力，請來專家為您解惑！\n\n\n\n●上課時間：113.9.15(日)10:00-11:30 \n\n●對象：一般民眾(成人)\n\n●招生名額：40人\n●地點：上楓分館三樓多功能室\n●電話：04-25662188\n\n●參加條件：請於報名後至開課日前，到上楓分館臨櫃借閱10本書籍。\n\n●對象：以家長為主，青少年為輔。\n\n\n請提前5分鐘上三樓多功能室報到。備取沒上不另外通知。\n\n若臨時有事，請於活動前一天來電請假，如無故曠課，下次報名將先列為備取。\n\n",
    "event_end_date": "2024-09-15",
    "event_img": "",
    "event_link": "https://www.beclass.com/rid=294d9b666c6dbc6063b0",
    "event_loc_detail": "地點：428009台中市大雅區樹德街255巷5號",
    "event_loc_name": "台中",
    "event_max_age": "14",
    "event_min_age": "12",
    "event_name": "親職講座-心連心計畫-青少年(親子)心理健康講座-網癮停看聽-如何陪伴孩子脫癮而出？",
    "event_price": "0",
    "event_start_date": "2024-09-15",
    "event_tag_names": [
      "運動"
    ]
  },
  {
    "_id": "66e7e3e3dba98f1853502cfe",
    "event_content": "9/16星期一出發.少請一日假. 玩嘉愛趣二萬坪2日$2299專案~住宿仁義潭湖畔飯店或商店等.嘉義幾米繪圖星空暢遊2日",
    "event_end_date": "2024-09-16",
    "event_img": "https://www.beclass.com/share/202406/284d8dd665fbe1ea37b10954r.jpg",
    "event_link": "https://www.beclass.com/rid=284d8dd665fbf9d89a56",
    "event_loc_detail": "",
    "event_loc_name": "新竹市",
    "event_max_age": 11,
    "event_min_age": 6,
    "event_name": "9/16星期一出發.少請一日假. 玩嘉愛趣二萬坪2日$2299專案~住宿仁義潭湖畔飯店或商店等.嘉義幾米繪圖星空暢遊2日",
    "event_price": "9/16玩嘉愛趣2日 一人一間 每人2299 、價格:2,299元 ",
    "event_start_date": "2024-09-16",
    "event_tag_names": [
      "幼童"
    ]
  },
  {
    "_id": "66e68ab80a3a8ff6f675d389",
    "event_content": "中秋節社區烤肉派對~\n這3天可以報名：\n\n9/14（六）、9/17(四)、9/21（六）\n\n下午16:00～21:00\n\n全程幫您準備好材料套餐:\n共有以下套餐，因報名系統篇幅限制請於line詢問:\n\n(A)歡樂烤澎湃套餐2000元(10人份)\n(B)歡樂烤滿意套餐1500元(9人份)\n(C)歡樂烤休閒套餐1000元(8人份)\n(D)澎湃素食套餐1500元(8人份)\n亦有單點項目，同樣受限報名系統篇幅請於line詢問~\n\n烤肉道具:每份250元(可供10人使用)\n\n行程報名聯繫及費用\n場地清潔費(每位):\n\n5歲以下免費\n\n滿5歲～10歲：50元\n滿10歲～家長：100元\n孩子的阿公阿嬤：50元\n每組務必選擇一份套餐，可以加帶自己的材料\n費用不包含保險\n請加line 聯繫報名及繳費，務必於活動前三天報名及繳費以準備食材\nLineID：0976676400\n\n如果直接google ，搜尋\"田尾食農農場   https://g.co/kgs/f2bamJs  可以定位導航",
    "event_end_date": "2024-09-17",
    "event_img": "https://www.beclass.com/share/202408/294d9b466c4b3ed6ab131159r.jpg",
    "event_link": "https://www.beclass.com/rid=294d9b466c4b9b923d87",
    "event_loc_detail": "地點：彰化縣田尾鄉柳鳳路150號 (田尾食農農場)",
    "event_loc_name": "彰化",
    "event_max_age": "21",
    "event_min_age": 6,
    "event_name": "田尾中秋節社區烤肉派對",
    "event_org": "田尾食農農場",
    "event_price": "1500",
    "event_start_date": "2024-09-17",
    "event_tag_names": [
      "科學",
      "手作"
    ]
  },
  {
    "_id": "66e9a95d00ef655c4623e87a",
    "event_content": "邀請台語專業講師水鹿老師講述台語繪本故事，內容包括自我介紹、[古錐的囡仔]、手指謠等。活動對象為10組親子組，讓小朋友們透過故事學習台語文化。",
    "event_end_date": "2024-09-17",
    "event_img": "",
    "event_link": "https://www.beclass.com/rid=294da0666d5284712da6",
    "event_loc_detail": "地點：新北市新莊區中港路350號 (新莊中港分館 6樓兒童室)",
    "event_loc_name": "台中",
    "event_max_age": 11,
    "event_min_age": "3",
    "event_name": "【中港分館】9/18「幸福的台灣囡仔」台語繪本說故事",
    "event_org": "中港分館",
    "event_price": "0",
    "event_start_date": "2024-09-17",
    "event_tag_names": [
      "幼童",
      "手作",
      "運動"
    ]
  },
  {
    "_id": "66eb06f18885fe13a64029f6",
    "event_content": "週末親子免費課程\n請各位爸爸媽媽們\n在自己的報名場次半小時前完成報到唷‼️\n若未於活動前報到將取消參加資格\n⚠️從缺名額將在十分鐘前開放現場報名參加⚠️\n請注意活動開放報名12歲以下小朋友參加",
    "event_end_date": "2024-09-20",
    "event_img": "",
    "event_link": "https://www.beclass.com/rid=294da1566e9957dcf55a",
    "event_loc_detail": "上課地點：台南市南區中華西路一段海洋星球樂園-台南旗艦店",
    "event_loc_name": "高雄",
    "event_max_age": "12",
    "event_min_age": 6,
    "event_name": "海洋星球台南旗艦店-手作教室0921",
    "event_org": "海洋星球",
    "event_price": "",
    "event_start_date": "2024-09-20",
    "event_tag_names": [
      "運動"
    ]
  },
  {
    "_id": "66e689bc0a3a8ff6f675d386",
    "event_content": "「探索未來體育新境界!」 #適合國小3年級以上  #適合國小3年級以上  \n\n加入我們的足球無人機活動，體驗無人機尖端技術與足球運動的激動人心 \n\n\n# 90分鐘  體驗活動同時也是測試您孩子有沒有興趣加入後續的團體課程\n\n( 以競賽為目標的課程 )\n\n\nhttps://youtu.be/bzqaEYi2Ts0\nhttps://drive.google.com/file/d/1XgpXbxE6z6mJ-CXq6diDDjgqj8_XRbRP/view?usp=drive_link\n\nhttps://www.youtube.com/watch?v=gh-I9qe4-0c\n\nhttps://youtu.be/kgvI7BprhH4?si=EULKxudw6nWj0ZSw\n\n\n\n這項獨特且充滿挑戰的運動,不僅考驗你的飛行技巧、進攻防守策略,\n\n還有你的快速反應和團隊合作能力。\n\n足球無人機已在歐美、南韓及中國漸風行,成為了一種新興而受歡迎的體育活動。\n\n不論是追求動態視覺敏感度、手指靈活度,還是想提升腦力和抗壓能力,\n\n我們的活動都能幫助您孩子達成目標。\n\n來吧!  與我們一起在空中展開一場場精彩無比的射門對決,\n\n開啟孩子的未來潛能之門!",
    "event_end_date": "2024-09-22",
    "event_img": "https://www.beclass.com/share/202403/284d7bd65f692106f9f10350r.jpg",
    "event_link": "https://www.beclass.com/rid=294da0666d5c90dcc837",
    "event_loc_detail": "地點：彰化縣員林市正興街50號 (Ai機器人創意基地 員林國小後門) Ai機器人創意基地 －員林國小後面：彰化縣員林市正興街50號",
    "event_loc_name": "彰化",
    "event_max_age": "14",
    "event_min_age": "8",
    "event_name": "[ 彰化-員林 ] 9月份_足球無人機 Drone Soccer 體驗活動",
    "event_price": "900",
    "event_start_date": "2024-09-21",
    "event_tag_names": [
      "運動",
      "手作"
    ]
  }
]

const MiddleLayer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { eventId } = useParams();

  // 過濾條件狀態
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 對話框狀態
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // 打開對話框
  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
    navigate(`/event/${event._id}`);
  };

  // 關閉對話框
  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    navigate('/');
  };

  // 當網址改變時，檢查是否有 eventId 來決定是否打開對話框
  useEffect(() => {
    if (eventId) {
      const event = events.find((e) => e._id === eventId);
      if (event) {
        setSelectedEvent(event);
        setOpen(true);
      }
    } else {
      setOpen(false);
      setSelectedEvent(null);
    }
  }, [eventId]);

  // 過濾活動
  const filteredEvents = events.filter((event) => {
    const matchesName = event.event_name.includes(searchText);
    const matchesRegion = selectedRegion ? event.event_loc_name === selectedRegion : true;
    const matchesAge = selectedAge ? (selectedAge >= event.event_min_age && selectedAge <= event.event_max_age) : true;
    const matchesCategories = selectedCategories.length > 0
      ? selectedCategories.some(category => event.event_tag_names.includes(category))
      : true;

    return matchesName && matchesRegion && matchesAge && matchesCategories;
  });

  return (
    <Box sx={{ padding: 2 }}>
      {/* 搜索框 */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="搜索..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
        }}
        sx={{ marginBottom: 2 }}
      />
      {/* 下拉選單 */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          select
          label="地區"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          fullWidth
        >
          <MenuItem value="">全部</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="年齡"
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          fullWidth
        >
          <MenuItem value="">全部</MenuItem>
          {ages.map((age) => (
            <MenuItem key={age} value={age}>
              {age}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* 活動分類按鈕 */}
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 4 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategories.includes(category) ? 'contained' : 'outlined'}
            onClick={() => toggleCategory(category)}
            sx={{
              borderRadius: 20,
              padding: '5px 15px',
              textTransform: 'none',
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* 過濾後的活動列表 */}
      <Masonry columns={isMobile ? 1 : 4} spacing={3}>
        {filteredEvents.map((event) => (
          <Card key={event._id} sx={{ borderRadius: 3, boxShadow: 3 }} onClick={() => handleOpen(event)}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="200"
                image={event.event_img ? event.event_img : '/noPic.webp'}
                alt={event.event_name}
              />
              {/* 顯示 event_org 的區塊 */}
              {event.event_org && event.event_org.trim() !== '' && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'lightyellow',
                    padding: '5px',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2">{event.event_org}</Typography>
                </Box>
              )}
            </Box>
            <CardContent sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                {event.event_name}
              </Typography>
              <Typography variant="body2">{event.event_loc_name} 日期：{event.event_start_date}</Typography>
              {(event.event_min_age || event.event_max_age) && (
                <Typography variant="body2">
                  年齡: {event.event_min_age} ~ {event.event_max_age}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Masonry>

      {/* 對話框 */}
      <EventDetail open={open} event={selectedEvent} onClose={handleClose} />
    </Box>
  );
};

export default MiddleLayer;
