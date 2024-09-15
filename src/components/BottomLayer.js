import React, { useState } from 'react';
import { Masonry } from '@mui/lab';
import { Box, Typography, Card, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const events = [
  {
    "_id": "66dd5308d97689dc74a2e6ff",
    "event_content": "活動延伸：222\n\n老師現場會準備一個紙箱，讓學生發揮創意回答，紙箱可以變成什麼？另外一邊教顏色、形狀的英文，並讓學生動手參與故事的過程，合力將紙箱創作成火箭、潛水艇等作品，引導學生在生活上其實可以將現有資源再利用，達到永續環保的意義。",
    "event_end_date": "2024-09-11T07:31:45.466Z",
    "event_img": "https://cdn.prod.website-files.com/63305270d726c747d0ccb9a5/6363daef601f1b234632a83d_pexels-ono-kosuki-5647617.webp",
    "event_link": "https://www.beclass.com/rid=294d9b866c94fd06a44e",
    "event_loc_detail": "B1多功能活動室：406台中市北屯區豐樂路二段158號111",
    "event_loc_name": "台中",
    "event_max_age": 11,
    "event_min_age": 6,
    "event_name": "夢幻雙語故事-Pete the Cat’s Groovy Imagination皮皮貓的奇幻想像力",
    "event_price": "0",
    "event_start_date": "2024-09-11T07:31:45.466Z",
    "event_tag_names": [
      "運動",
      "手作",
      "幼童"
    ]
  },
  {
    "_id": "66dd5908d814535bb5411670",
    "event_content": "免費活動\n\n講者:  陳龍老師 (美國大學 博士候選人, 曾為中山大學附屬學院教師)\n\n芬蘭父母老師不追求 孩子成績, 為何國家數學成績常第一\n\n\n1. 芬蘭的教育\n\n2. 芬蘭的幸福指數\n\n3. 芬蘭的幸福 價值觀\n4. Q & A\n\n\n時間: 2024/9/9 星期一 晚上 7:30 (19:30) \n\n新竹市明湖路1200巷112號  (3F, 管理室 三樓)\n",
    "event_end_date": "2024-09-09T07:57:27.863Z",
    "event_img": "https://www.beclass.com/share/202409/294da0766d6c13a3ae1f0340r.jpg",
    "event_link": "https://www.beclass.com/rid=294da0766d6c13a3ae1f",
    "event_loc_detail": "新竹市明湖路1200巷112號  (3F, 管理室 三樓)",
    "event_loc_name": "新竹市",
    "event_max_age": 11,
    "event_min_age": "9",
    "event_name": "賺錢成績外的芬蘭幸福",
    "event_price": "100",
    "event_start_date": "2024-09-09T07:57:27.863Z",
    "event_tag_names": [
      "手作",
      "運動"
    ]
  },
  {
    "_id": "66e689bc0a3a8ff6f675d386",
    "event_content": "「探索未來體育新境界!」 #適合國小3年級以上  #適合國小3年級以上  \n\n加入我們的足球無人機活動，體驗無人機尖端技術與足球運動的激動人心 \n\n\n# 90分鐘  體驗活動同時也是測試您孩子有沒有興趣加入後續的團體課程\n\n( 以競賽為目標的課程 )\n\n\nhttps://youtu.be/bzqaEYi2Ts0\nhttps://drive.google.com/file/d/1XgpXbxE6z6mJ-CXq6diDDjgqj8_XRbRP/view?usp=drive_link\n\nhttps://www.youtube.com/watch?v=gh-I9qe4-0c\n\nhttps://youtu.be/kgvI7BprhH4?si=EULKxudw6nWj0ZSw\n\n\n\n這項獨特且充滿挑戰的運動,不僅考驗你的飛行技巧、進攻防守策略,\n\n還有你的快速反應和團隊合作能力。\n\n足球無人機已在歐美、南韓及中國漸風行,成為了一種新興而受歡迎的體育活動。\n\n不論是追求動態視覺敏感度、手指靈活度,還是想提升腦力和抗壓能力,\n\n我們的活動都能幫助您孩子達成目標。\n\n來吧!  與我們一起在空中展開一場場精彩無比的射門對決,\n\n開啟孩子的未來潛能之門!",
    "event_end_date": "2024-09-22T07:14:13.683Z",
    "event_img": "https://www.beclass.com/share/202403/284d7bd65f692106f9f10350r.jpg",
    "event_link": "https://www.beclass.com/rid=294da0666d5c90dcc837",
    "event_loc_detail": "地點：彰化縣員林市正興街50號 (Ai機器人創意基地 員林國小後門) Ai機器人創意基地 －員林國小後面：彰化縣員林市正興街50號",
    "event_loc_name": "彰化",
    "event_max_age": "14",
    "event_min_age": "8",
    "event_name": "[ 彰化-員林 ] 9月份_足球無人機 Drone Soccer 體驗活動",
    "event_price": "900",
    "event_start_date": "2024-09-21T07:14:13.683Z",
    "event_tag_names": [
      "運動",
      "手作"
    ]
  },
  {
    "_id": "66e68a030a3a8ff6f675d387",
    "event_content": "啟發學童從故事中培養自我感受力、表達力與創造力，讓每位孩子平等地享受英語閱讀、讓每個家庭透過閱讀豐富生活。\n\n\n\n故事導讀\n\n優良蛋是模範生、好孩子，時常看不慣別人不對的行為，結果反而導致自己越來越不開心。他以為做這些是為了別人好，事情也無法改變，最後他離開團體，經過各種抒壓方法找回了自己。\n\n活動延伸\n現場會準備各種情緒表情的面具，一邊教開心的、生氣的、害怕的等英文，並讓學生參與故事的過程，感受主角優良蛋現在面對到的情境，會是哪一種心情？",
    "event_end_date": "2024-09-15T07:16:25.702Z",
    "event_img": "",
    "event_link": "https://www.beclass.com/rid=294d9b766c81f9ced2d7",
    "event_loc_detail": "地點：台中市豐樂路二段158號 (總館) B1多功能活動室：406台中市北屯區豐樂路二段158號",
    "event_loc_name": "台中",
    "event_max_age": 11,
    "event_min_age": 6,
    "event_name": "夢幻雙語故事-The Good Egg 優良蛋",
    "event_price": "0",
    "event_start_date": "2024-09-15T07:16:25.702Z",
    "event_tag_names": [
      "手作"
    ]
  },
  {
    "_id": "66e68a470a3a8ff6f675d388",
    "event_content": "113年親職講座-心連心計畫-青少年(親子)心理健康講座-網癮停看聽\n\n講題：如何陪伴孩子脫\"癮\"而出？\n\n講師：張永安諮商師\n\n    ~~~孩子沈迷網路怎麼辦？~~~\n\n    怎麼辦?該不會一不注意就網路成癮了吧?\n\n    數位時代親子必修的課程，期待網路的世界裡，親子關係不迷路！家長與孩子溝通網路使用的時間及方式刻不容緩，如何訂立一個雙方都認可的網路使用規範，能平心靜氣且都能遵守是很重要的能力，請來專家為您解惑！\n\n\n\n●上課時間：113.9.15(日)10:00-11:30 \n\n●對象：一般民眾(成人)\n\n●招生名額：40人\n●地點：上楓分館三樓多功能室\n●電話：04-25662188\n\n●參加條件：請於報名後至開課日前，到上楓分館臨櫃借閱10本書籍。\n\n●對象：以家長為主，青少年為輔。\n\n\n請提前5分鐘上三樓多功能室報到。備取沒上不另外通知。\n\n若臨時有事，請於活動前一天來電請假，如無故曠課，下次報名將先列為備取。\n\n",
    "event_end_date": "2024-09-15T07:17:37.082Z",
    "event_img": "",
    "event_link": "https://www.beclass.com/rid=294d9b666c6dbc6063b0",
    "event_loc_detail": "地點：428009台中市大雅區樹德街255巷5號",
    "event_loc_name": "台中",
    "event_max_age": "14",
    "event_min_age": "12",
    "event_name": "親職講座-心連心計畫-青少年(親子)心理健康講座-網癮停看聽-如何陪伴孩子脫癮而出？",
    "event_price": "0",
    "event_start_date": "2024-09-15T07:17:37.082Z",
    "event_tag_names": [
      "運動"
    ]
  },
  {
    "_id": "66e68ab80a3a8ff6f675d389",
    "event_content": "中秋節社區烤肉派對~\n這3天可以報名：\n\n9/14（六）、9/17(四)、9/21（六）\n\n下午16:00～21:00\n\n全程幫您準備好材料套餐:\n共有以下套餐，因報名系統篇幅限制請於line詢問:\n\n(A)歡樂烤澎湃套餐2000元(10人份)\n(B)歡樂烤滿意套餐1500元(9人份)\n(C)歡樂烤休閒套餐1000元(8人份)\n(D)澎湃素食套餐1500元(8人份)\n亦有單點項目，同樣受限報名系統篇幅請於line詢問~\n\n烤肉道具:每份250元(可供10人使用)\n\n行程報名聯繫及費用\n場地清潔費(每位):\n\n5歲以下免費\n\n滿5歲～10歲：50元\n滿10歲～家長：100元\n孩子的阿公阿嬤：50元\n每組務必選擇一份套餐，可以加帶自己的材料\n費用不包含保險\n請加line 聯繫報名及繳費，務必於活動前三天報名及繳費以準備食材\nLineID：0976676400\n\n如果直接google ，搜尋\"田尾食農農場   https://g.co/kgs/f2bamJs  可以定位導航",
    "event_end_date": "2024-09-17T07:18:34.704Z",
    "event_img": "https://www.beclass.com/share/202408/294d9b466c4b3ed6ab131159r.jpg",
    "event_link": "https://www.beclass.com/rid=294d9b466c4b9b923d87",
    "event_loc_detail": "地點：彰化縣田尾鄉柳鳳路150號 (田尾食農農場)",
    "event_loc_name": "彰化",
    "event_max_age": "21",
    "event_min_age": 6,
    "event_name": "田尾中秋節社區烤肉派對",
    "event_price": "1500",
    "event_start_date": "2024-09-17T07:18:34.704Z",
    "event_tag_names": [
      "科學",
      "手作"
    ]
  }
];

const BottomLayer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 判斷是否為手機螢幕
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 打開對話框
  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  // 關閉對話框
  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '400px', padding: 2 }}>
      <Masonry columns={isMobile ? 1 : 4} spacing={3}>
        {events.map((event) => (
          <Card key={event._id} sx={{ borderRadius: 3, boxShadow: 3 }} onClick={() => handleOpen(event)}>
            <CardMedia
              component="img"
              height="200"
              image={event.event_img ? event.event_img : '/noPic.webp'}
              alt={event.event_name}
            />
            <CardContent sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                {event.event_name}
              </Typography>
              <Typography variant="body2">台北市 日期：2024-09-09</Typography>
              <Typography variant="body2">年齡: 7 ~ 12</Typography>
            </CardContent>
          </Card>
        ))}
      </Masonry>

      {/* 對話框 */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: '90%' } }} // 設定對話框大小
      >
        <DialogTitle>
          {selectedEvent?.event_name}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              {/* 只有當 selectedEvent.event_img 不為空值或空字串時才顯示圖片 */}
              {selectedEvent.event_img && selectedEvent.event_img.trim() !== '' && (
                <CardMedia
                  component="img"
                  image={selectedEvent.event_img}
                  alt={selectedEvent.event_name}
                  sx={{ marginBottom: 2, maxWidth: '100%', height: 'auto' }} // 保持圖片原始比例
                />
              )}
              <Typography variant="body1" gutterBottom>
                活動連結: <a href={selectedEvent.event_link} target="_blank" rel="noopener noreferrer">{selectedEvent.event_link}</a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                活動日期: {new Date(selectedEvent.event_start_date).toLocaleDateString()} ~ {new Date(selectedEvent.event_end_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                適合年齡: {selectedEvent.event_min_age} ~ {selectedEvent.event_max_age} 歲
              </Typography>
              <Typography variant="body1" gutterBottom>
                活動地點: {selectedEvent.event_loc_detail}
              </Typography>
              <Typography variant="body1" gutterBottom>
                活動價格: {selectedEvent.event_price} 元
              </Typography>
              <Typography variant="body1" gutterBottom>
                活動類型: {selectedEvent.event_tag_names.join(', ')}
              </Typography>
              <Card>
                <CardContent variant="body2" gutterBottom>
                {selectedEvent.event_content}
                </CardContent>
              </Card>

            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BottomLayer;