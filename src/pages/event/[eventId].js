'use client';  // 將這行加在文件的最頂部

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Card, CardContent, CardMedia, IconButton, Box, Snackbar, SnackbarContent, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';
// import { track } from '@vercel/analytics/server';
import ReactGA from "react-ga4";

ReactGA.initialize("G-HC0X0BZJR9");

export default function EventPage({ event, error }) {
    const router = useRouter();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    // track('Share Event Open: ', {'event_id': event['_id'], 'event_name': event['event_name'] });
    // Send a custom event
    ReactGA.event({
        category: "Share Event Open",
        action: "Share Event Open",
        label: event['_id'] + ' ' + event['event_name'],
    });


    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href); // 將當前 URL 複製到剪貼簿
        setSnackbarOpen(true); // 顯示提示訊息
        // track('Share Event: ', {'event_id': event['_id'], 'event_name': event['event_name'] });
        ReactGA.event({
            category: "Share Event",
            action: "Share Event",
            label: event['_id'] + ' ' + event['event_name'],
        });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleClose = () => {
        router.push('/'); // 導向網站根目錄
    };

    if (error) {
        return <Typography>錯誤：{error}</Typography>; // 顯示錯誤訊息
    }

    if (!event) {
        return <Typography>台灣最新兒童活動資訊</Typography>; // 顯示載入中訊息
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
                    <a href="/"><b>台灣最新兒童活動資訊</b></a>
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

            {/* 縮短活動連結，超出範圍顯示省略號 */}
            <Typography variant="body1" gutterBottom sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                活動連結: <a href={event.event_link} target="_blank" style={{ textDecoration: 'underline' }}>{event.event_link}</a>
            </Typography>

            <Typography variant="body1" gutterBottom>
                活動日期: {event.event_start_date} ~ {event.event_end_date}
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
                活動價格: {event.event_price}
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

            {/* 點擊圖片時在新窗口中打開 */}
            {event.event_img && event.event_img.trim() !== '' && (
                <a href={event.event_img} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                        component="img"
                        image={event.event_img}
                        alt={event.event_name}
                        sx={{ marginBottom: 2, maxWidth: '100%', height: 'auto' }}
                    />
                </a>
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
    try {
        const { eventId } = context.params;
        
        // 構建完整的 URL
        const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
        const host = context.req.headers.host;
        const baseUrl = `${protocol}://${host}`;
        const apiUrl = `${baseUrl}/api/events/online/${eventId}`;
        
        // 從 API 獲取事件詳情
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error('API Error Response:', errorText);
            throw new Error(`API responded with status: ${res.status}, body: ${errorText}`);
        }
        
        const event = await res.json();

        if (!event || event.error) {
            throw new Error(event?.error || 'Failed to fetch event data');
        }

        return {
            props: {
                event,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                error: error.message,
            },
        };
    }
}
