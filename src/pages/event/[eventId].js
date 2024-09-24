import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Card, CardContent, CardMedia, IconButton, Box, Snackbar, SnackbarContent, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';

export default function EventPage({ eventId }) {
    const router = useRouter();
    const [event, setEvent] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        // 使用 useEffect 來在頁面載入時取得事件詳情
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`/api/events/online/${eventId}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Failed to fetch event details:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href); // 將當前 URL 複製到剪貼簿
        setSnackbarOpen(true); // 顯示提示訊息
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleClose = () => {
        router.push('/'); // 導向網站根目錄
    };

    if (!event) {
        return <Typography>Loading...</Typography>; // 顯示載入中訊息
    }

    return (
        <Box sx={{ padding: 3, maxWidth: '800px', margin: '0 auto' }}>
            <Box>
                <Typography
                    variant="h4"
                    sx={{ flexGrow: 1, color: '#757575' }}
                >
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="home" sx={{ marginRight: 1 }}>
                        <HomeIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <b>台灣最新兒童活動資訊</b>
                </Typography>
            </Box>
            {/* 分隔線和間距 */}
            <Box sx={{ marginY: 4 }}>
                <Divider />
            </Box>

            {/* 將 IconButton 放在一行 */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <IconButton edge="end" color="inherit" onClick={handleShare} aria-label="share" sx={{ marginRight: 1 }}>
                    <ShareIcon />
                </IconButton>
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* 將活動名稱放在下一行 */}
            <Typography variant="h4" gutterBottom align="center">
                {event.event_name}
            </Typography>

            <Typography variant="body1" gutterBottom>
                活動連結: <a href={event.event_link} target="_blank" style={{ textDecoration: 'underline' }}>{event.event_link}</a>
            </Typography>

            <Typography variant="body1" gutterBottom>
                活動日期: {new Date(event.event_start_date).toLocaleDateString()} ~ {new Date(event.event_end_date).toLocaleDateString()}
            </Typography>

            {(event.event_min_age || event.event_max_age) && (
                <Typography variant="body1" gutterBottom>
                    適合年齡: {event.event_min_age} ~ {event.event_max_age} 歲
                </Typography>
            )}

            <Typography variant="body1" gutterBottom>
                活動地點: {event.event_loc_detail}
            </Typography>

            <Typography variant="body1" gutterBottom>
                活動價格: {event.event_price} 元
            </Typography>

            <Typography variant="body1" gutterBottom>
                活動類型: {event.event_tag_names.join(', ')}
            </Typography>

            <Card>
                <CardContent>
                    <Typography variant="body1">
                        {event.event_content}
                    </Typography>
                </CardContent>
            </Card>

            {event.event_img && event.event_img.trim() !== '' && (
                <CardMedia
                    component="img"
                    image={event.event_img}
                    alt={event.event_name}
                    sx={{ marginBottom: 2, maxWidth: '100%', height: 'auto' }}
                />
            )}

            {/* 提示訊息 */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // 3秒後自動關閉
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }} // 設定提示訊息在畫面正中央
            >
                <SnackbarContent
                    message="活動連結已複製"
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 半透明白色背景
                        color: '#000', // 黑色文字
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                />
            </Snackbar>
        </Box>
    );
}

// 使用 getServerSideProps 來獲取 eventId
export async function getServerSideProps(context) {
    const { eventId } = context.params; // 从 context.params 中获取 eventId

    return {
        props: {
            eventId, // 将 eventId 作为 props 传递给组件
        },
    };
}
