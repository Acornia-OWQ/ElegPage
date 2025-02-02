// ElegPage
// https://ioioi.lol
// https://github.com/Acornia-OWQ/ElegPage
// Copyright 2024 Acornia < hi@kisou.cn >
// Released under the MIT license
! function () {
    console.log('%cTemplate: %cElegPage%cBy Acornia', 'color: rgba(255,255,255,.6); background: #5e72e4; font-size: 15px;border-radius:5px 0 0 5px;padding:10px 0 10px 20px;', 'color: rgba(255,255,255,1); background: #5e72e4; font-size: 15px;border-radius:0;padding:10px 15px 10px 0px;', 'color: #fff; background: #92A1F4; font-size: 15px;border-radius:0 5px 5px 0;padding:10px 20px 10px 15px;');
    console.log('%cVersion%c 1.0.0', 'color:#fff; background: #5e72e4;font-size: 12px;border-radius:5px 0 0 5px;padding:3px 10px 3px 10px;', 'color:#fff; background: #92a1f4;font-size: 12px;border-radius:0 5px 5px 0;padding:3px 10px 3px 10px;');
    console.log('%chttps://github.com/Acornia-OWQ/ElegPage', 'font-size: 12px;border-radius:5px;padding:3px 10px 3px 10px;border:1px solid #5e72e4;');
    console.log('%chttps://ioioi.lol', 'font-size: 12px;border-radius:5px;padding:3px 10px 3px 10px;border:1px solid #5e72e4;');
}();

// 主题切换功能
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// 检查本地存储中的主题设置
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
}
// 音乐播放器相关变量
const audio = document.getElementById('audio');
const progressBar = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current');
const durationTime = document.getElementById('duration');
const playIcon = document.getElementById('playIcon');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');
const volumeSliderContainer = document.querySelector('.volume-slider-container');
const volumeIcon = document.querySelector('.volume-icon');
const musicCover = document.getElementById('musicCover');
const musicTitle = document.getElementById('musicTitle');
const musicArtist = document.getElementById('musicArtist');
const playlistToggle = document.getElementById('playlistToggleBtn');
const playlistContent = document.querySelector('.playlist-content');
const playlistCount = document.querySelector('.playlist-count');

let isPlaylistVisible = false;
let isPlaying = false;
let isVolumeVisible = false;
let currentPlaylist = [];
let currentTrackIndex = 0;

// 获取可用的API端点
async function getWorkingAPI() {
    for (const api of METING_APIS) {
        try {
            const response = await fetch(`${api}?server=netease&type=url&id=33894312`);
            if (response.ok) {
                const text = await response.text();
                if (text && text.length > 0) {
                    return api;
                }
            }
        } catch (error) {
            console.warn(`API ${api} 不可用:`, error);
        }
    }
    throw new Error('没有可用的API端点');
}

// 播放列表配置
const PLAYLIST_CONFIG = {
    server: 'netease',
    type: 'playlist',
    id: PLATFORM_CONFIG.netease.defaultPlaylist
};

// 播放/暂停切换
async function togglePlay() {
    try {
        if (audio.paused) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    playIcon.className = 'ri-pause-line';
                    isPlaying = true;
                    // 恢复滚动动画
                    const titleElement = document.getElementById('musicTitle');
                    titleElement.style.transform = ''; // 清除transform
                    if (titleElement.offsetWidth > titleElement.parentElement.offsetWidth) {
                        titleElement.classList.add('scroll');
                    }
                }).catch(error => {
                    console.error('播放失败:', error);
                    playIcon.className = 'ri-play-line';
                    isPlaying = false;
                });
            }
        } else {
            audio.pause();
            playIcon.className = 'ri-play-line';
            isPlaying = false;
            // 暂停时重置文本位置
            const titleElement = document.getElementById('musicTitle');
            titleElement.classList.remove('scroll');
            titleElement.style.transform = 'translateX(0)';
        }
    } catch (error) {
        console.error('切换播放状态失败:', error);
        playIcon.className = 'ri-play-line';
        isPlaying = false;
    }
}

// 音量控制显示切换
function toggleVolumeSlider() {
    isVolumeVisible = !isVolumeVisible;
    volumeSliderContainer.classList.toggle('show', isVolumeVisible);
}

// 点击其他地方关闭音量控制
document.addEventListener('click', (e) => {
    if (!volumeBtn.contains(e.target) && !volumeSliderContainer.contains(e.target)) {
        isVolumeVisible = false;
        volumeSliderContainer.classList.remove('show');
    }
});

// 音量控制
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audio.volume = volume;
    updateVolumeIcon(volume);
});

function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.className = 'ri-volume-mute-line';
    } else if (volume < 0.5) {
        volumeIcon.className = 'ri-volume-down-line';
    } else {
        volumeIcon.className = 'ri-volume-up-line';
    }
}

// 进度条点击跳转
progressBar.addEventListener('click', (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// 防止点击音量滑块时触发父元素的点击事件
volumeSliderContainer.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 检查标题是否需要滚动
function checkTitleScroll() {
    const titleElement = document.getElementById('musicTitle');
    const container = document.querySelector('.music-title-container');

    // 重置动画和位置
    titleElement.classList.remove('scroll');
    titleElement.style.transform = 'translateX(0)';

    // 确保data-text属性与当前文本相同
    titleElement.setAttribute('data-text', titleElement.textContent);

    // 如果内容超出容器且正在播放，添加滚动动画
    if (titleElement.offsetWidth > container.offsetWidth && isPlaying) {
        titleElement.classList.add('scroll');
    }
}

// 在窗口大小改变时重新检查滚动
window.addEventListener('resize', checkTitleScroll);

// 修改加载音乐数据函数
async function loadMusicData(id, server = PLAYLIST_CONFIG.server) {
    try {
        if (!id) {
            throw new Error('无效的歌曲ID');
        }

        // 处理QQ音乐的歌曲ID格式
        let songId = id.toString();
        if (server === 'tencent') {
            // QQ音乐的歌曲ID需要补全到完整格式
            songId = songId.padStart(12, '0');
        }

        // console.log('加载音乐:', { songId, server });

        // 从当前播放列表中查找歌曲信息
        const currentSong = currentPlaylist.find(song => song.id === id.toString());
        if (!currentSong) {
            throw new Error('找不到歌曲信息');
        }

        // console.log('当前歌曲信息:', currentSong);

        // 获取音乐URL
        let musicUrl = currentSong.url;
        if (!musicUrl || !await isValidAudioUrl(musicUrl)) {
            // console.log('尝试重新获取音乐URL');

            // 尝试所有API端点
            let lastError = null;
            for (const api of METING_APIS) {
                try {
                    const response = await fetch(`${api}?server=${server}&type=url&id=${songId}`);
                    if (!response.ok) continue;

                    const text = await response.text();
                    if (!text) continue;

                    let urlData;
                    try {
                        urlData = JSON.parse(text);
                    } catch (e) {
                        continue;
                    }

                    if (urlData && urlData.url) {
                        musicUrl = urlData.url;
                        // 检查新获取的URL是否有效
                        if (await isValidAudioUrl(musicUrl)) {
                            currentSong.url = musicUrl;
                            break;
                        }
                    }
                } catch (error) {
                    lastError = error;
                    continue;
                }
            }

            if (!musicUrl) {
                throw lastError || new Error('无法获取音乐链接');
            }
        }

        // 设置音频源
        audio.src = musicUrl;

        // 更新封面
        if (currentSong.pic) {
            musicCover.innerHTML = `<img src="${currentSong.pic}" alt="${currentSong.name || ''}" onerror="this.onerror=null; this.src='assets/images/default-cover.jpg'; this.parentElement.innerHTML='<i class=\'ri-music-2-line\'></i>';">`;
        } else {
            musicCover.innerHTML = `<i class="ri-music-2-line"></i>`;
        }

        // 更新标题和艺术家
        musicTitle.textContent = `${currentSong.name || '未知歌曲'} - ${currentSong.artist || '未知歌手'}`;
        musicTitle.setAttribute('data-text', musicTitle.textContent);

        // 检查标题是否需要滚动
        checkTitleScroll();

        // 加载歌词
        if (currentSong.lrc) {
            loadLyrics(currentSong.lrc);
        } else {
            document.getElementById('currentLyric').textContent = '暂无歌词';
        }

        // 准备播放
        audio.load();

        // 尝试播放
        try {
            if (isPlaying) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        playIcon.className = 'ri-pause-line';
                    }).catch(error => {
                        console.warn('需要用户交互才能播放:', error);
                        isPlaying = false;
                        playIcon.className = 'ri-play-line';
                    });
                }
            }
        } catch (error) {
            console.warn('播放失败，等待用户交互:', error);
            isPlaying = false;
            playIcon.className = 'ri-play-line';
        }
    } catch (error) {
        console.error('加载音乐数据失败:', error);
        musicTitle.textContent = '加载失败';
        musicArtist.textContent = error.message || '请稍后重试';
        isPlaying = false;
        playIcon.className = 'ri-play-line';
        throw error;
    }
}

// 修改歌词解析和显示
function parseLRC(lrc) {
    if (!lrc || typeof lrc !== 'string') {
        return [];
    }

    const lines = lrc.split('\n');
    const parsedLyrics = [];

    for (const line of lines) {
        const timeMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
        if (timeMatch) {
            const minutes = parseInt(timeMatch[1]);
            const seconds = parseInt(timeMatch[2]);
            const milliseconds = parseInt(timeMatch[3]);
            const time = minutes * 60 + seconds + milliseconds / 1000;
            const text = timeMatch[4].trim();
            if (text) {
                parsedLyrics.push({ time, text });
            }
        }
    }

    return parsedLyrics.sort((a, b) => a.time - b.time);
}

let currentLyrics = [];

async function loadLyrics(lrcText) {
    try {
        if (!lrcText) {
            throw new Error('无歌词数据');
        }

        // 如果是 URL，则获取歌词内容
        if (lrcText.startsWith('http')) {
            const response = await fetch(lrcText);
            lrcText = await response.text();
        }

        currentLyrics = parseLRC(lrcText);
        // console.log('解析的歌词:', currentLyrics);

        if (currentLyrics.length === 0) {
            document.getElementById('currentLyric').textContent = '暂无歌词';
        } else {
            updateCurrentLyric(0);
            if (isLyricsVisible) {
                document.getElementById('currentLyric').classList.add('show');
            }
        }
    } catch (error) {
        console.error('加载歌词失败:', error);
        document.getElementById('currentLyric').textContent = '暂无歌词';
        currentLyrics = [];
    }
}

function updateCurrentLyric(currentTime) {
    const currentLyricElement = document.getElementById('currentLyric');

    if (currentLyrics.length === 0) {
        currentLyricElement.textContent = '暂无歌词';
        return;
    }

    // 查找当前时间对应的歌词
    let currentLyric = null;
    for (let i = currentLyrics.length - 1; i >= 0; i--) {
        if (currentLyrics[i].time <= currentTime) {
            currentLyric = currentLyrics[i];
            break;
        }
    }

    if (currentLyric) {
        currentLyricElement.textContent = currentLyric.text;
    } else {
        currentLyricElement.textContent = '暂无歌词';
    }
}

// 更新进度条和歌词显示
audio.addEventListener('timeupdate', () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;

    const durationMinutes = Math.floor(audio.duration / 60) || 0;
    const durationSeconds = Math.floor(audio.duration % 60) || 0;
    durationTime.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;

    const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;
    progress.style.width = `${progressPercent}%`;

    // 更新当前歌词
    updateCurrentLyric(Math.floor(audio.currentTime));
});

// 初始化播放器
async function initPlayer() {
    try {
        // 初始化播放列表状态
        isPlaylistVisible = false;
        const playlistIcon = document.getElementById('playlistIcon');
        playlistIcon.className = 'ri-play-list-2-fill';
        document.getElementById('playlist').style.display = 'none';
        document.getElementById('lyrics').style.display = 'block';

        // 确保默认使用网易云音乐
        PLAYLIST_CONFIG.server = 'netease';
        PLAYLIST_CONFIG.id = PLATFORM_CONFIG.netease.defaultPlaylist;

        // 设置网易云按钮为激活状态
        const buttons = document.querySelectorAll('.server-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes(PLATFORM_CONFIG.netease.name)) {
                btn.classList.add('active');
            }
        });

        // 加载网易云歌单
        const songs = await loadPlaylist();

        // 如果歌单加载成功且有歌曲，加载第一首但不自动播放
        if (songs.length > 0) {
            const firstSong = songs[0];
            if (firstSong.id) {
                isPlaying = false; // 确保不自动播放
                await loadMusicData(firstSong.id.toString(), PLAYLIST_CONFIG.server);
            }
        }
    } catch (error) {
        console.error('初始化播放器失败:', error);
    }
}

// 修改歌单显示切换函数
function togglePlaylist() {
    isPlaylistVisible = !isPlaylistVisible;
    const playlistIcon = document.getElementById('playlistIcon');
    playlistIcon.className = isPlaylistVisible ? 'ri-sort-asc' : 'ri-play-list-2-fill';

    // 切换显示歌单/歌词
    const lyrics = document.getElementById('lyrics');
    const playlist = document.getElementById('playlist');

    lyrics.style.display = isPlaylistVisible ? 'none' : 'block';
    playlist.style.display = isPlaylistVisible ? 'block' : 'none';
}

// 启动播放器
initPlayer();

// 修改加载歌单函数
async function loadPlaylist(server = PLAYLIST_CONFIG.server, id = PLAYLIST_CONFIG.id) {
    try {
        let lastError = null;
        // 尝试所有API端点
        for (const api of METING_APIS) {
            try {
                // 获取歌单详情
                const response = await fetch(`${api}?server=${server}&type=playlist&id=${id}`);
                if (!response.ok) continue;

                const text = await response.text();
                if (!text) continue;

                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    continue;
                }

                if (data.error) {
                    lastError = new Error(data.error);
                    continue;
                }

                // 处理可能的数据格式
                let songs = Array.isArray(data) ? data : (data.data || []);

                if (!Array.isArray(songs) || songs.length === 0) {
                    lastError = new Error('歌单为空或数据格式错误');
                    continue;
                }

                // 每首歌必要的信息
                songs = songs.map(song => {
                    // 尝试从不同的属性中获取歌曲ID
                    let songId = song.id || song.songid || '';

                    // 如果没有直接的ID，尝试从URL中提取
                    if (!songId && song.url) {
                        const urlMatch = song.url.match(/[?&]id=(\d+)/);
                        if (urlMatch) {
                            songId = urlMatch[1];
                        }
                    }

                    // 处理QQ音乐的歌曲ID
                    if (server === 'tencent' && songId) {
                        // 移除前导零，保存最原始的ID
                        songId = parseInt(songId).toString();
                    }

                    // console.log('处理歌曲:', { song, songId });

                    if (!songId) {
                        console.warn('歌曲缺少ID:', song);
                        return null;
                    }

                    return {
                        id: songId.toString(), // 确保ID是字符串类型
                        name: song.name || song.title || '未知歌曲',
                        artist: song.artist || song.author || '未知歌手',
                        pic: song.pic || song.cover || null,
                        url: song.url || null,
                        lrc: song.lrc || null
                    };
                }).filter(song => song && song.id); // 过滤掉没有ID的歌曲

                if (songs.length === 0) {
                    lastError = new Error('没有有效的歌曲');
                    continue;
                }

                // 更新当前播放列表
                currentPlaylist = songs;

                // 更新歌单数量显示
                playlistCount.textContent = `${songs.length} 首歌曲`;

                // 渲染歌单
                renderPlaylist(songs);

                return songs;
            } catch (error) {
                lastError = error;
                continue;
            }
        }

        // 如果所有API都失败了处理
        throw lastError || new Error('无法加载歌单');
    } catch (error) {
        console.error('加载歌单失败:', error);
        playlistContent.innerHTML = `<div class="playlist-error">加载失败: ${error.message}</div>`;
        throw error;
    }
}

// 修改渲染歌单函数
function renderPlaylist(songs) {
    playlistContent.innerHTML = songs.map((song, index) => {
        const isActive = index === currentTrackIndex;
        // 确保歌曲ID存在且为字符串类型
        const songId = song.id ? song.id.toString() : '';
        if (!songId) {
            console.warn('渲染歌单时发现无效的歌曲ID:', song);
            return '';
        }
        return `
                <div class="playlist-item ${isActive ? 'active' : ''}" onclick="playSong('${songId}', ${index})">
                    <div class="playlist-item-info">
                        <div class="playlist-item-title">${song.name}</div>
                        <div class="playlist-item-artist">${song.artist}</div>
                    </div>
                </div>
            `;
    }).join('');
}

// 修改播放选中的歌曲函数
async function playSong(songId, index) {
    try {
        if (!songId) {
            throw new Error('无效的歌曲ID');
        }

        if (index >= 0 && index < currentPlaylist.length) {
            currentTrackIndex = index;
            const song = currentPlaylist[index];

            // 输出播放信息用于调试
            // console.log('播放歌曲:', {
            //     index,
            //     songId,
            //     song,
            //     server: PLAYLIST_CONFIG.server
            // });

            // 更新活动项
            const items = playlistContent.querySelectorAll('.playlist-item');
            items.forEach(item => item.classList.remove('active'));
            if (items[index]) {
                items[index].classList.add('active');
            }

            // 加载并播放歌曲
            await loadMusicData(songId, PLAYLIST_CONFIG.server);
            isPlaying = true;
            playIcon.className = 'ri-pause-line';
        }
    } catch (error) {
        console.error('播放歌曲失败:', error, '歌曲ID:', songId);
        musicTitle.textContent = '播放失败';
        musicArtist.textContent = '请尝试其他歌曲';
        isPlaying = false;
        playIcon.className = 'ri-play-line';
    }
}

// 修改上一首函数
function prevTrack() {
    if (currentPlaylist.length > 0) {
        currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        const song = currentPlaylist[currentTrackIndex];
        const songId = (song.id || song.songid || '').toString();
        playSong(songId, currentTrackIndex);
    }
}

function nextTrack() {
    if (currentPlaylist.length > 0) {
        currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
        const song = currentPlaylist[currentTrackIndex];
        const songId = (song.id || song.songid || '').toString();
        playSong(songId, currentTrackIndex);
    }
}

// 歌曲播放结束时自动播放下一首
audio.addEventListener('ended', () => {
    nextTrack();
});

// 切换音乐平台
async function switchMusicServer(server) {
    try {
        if (server === PLAYLIST_CONFIG.server) {
            return; // 如果是同一个平台，不需要切换
        }

        // 更新按钮状态
        const buttons = document.querySelectorAll('.server-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'var(--surface)';
            btn.style.color = 'var(--text-secondary)';
            btn.style.borderColor = 'var(--border)';
            if ((server === 'netease' && btn.textContent === '网易云') ||
                (server === 'tencent' && btn.textContent === 'QQ音乐')) {
                btn.classList.add('active');
                btn.style.background = 'var(--primary)';
                btn.style.color = 'var(--surface)';
                btn.style.borderColor = 'var(--primary)';
            }
        });

        // 更新配置
        PLAYLIST_CONFIG.server = server;
        PLAYLIST_CONFIG.id = PLATFORM_CONFIG[server].defaultPlaylist;

        // 重新加载歌单
        const songs = await loadPlaylist(server, PLAYLIST_CONFIG.id);

        // 确保有歌曲且第一首歌有ID
        if (songs.length > 0 && songs[0].id) {
            await playSong(songs[0].id.toString(), 0);
        } else {
            console.error('切换平台后没有可播放的歌曲');
            musicTitle.textContent = '无可播放的歌曲';
            musicArtist.textContent = '请尝试其他平台';
        }
    } catch (error) {
        console.error('切换音乐平台失败:', error);
        // 切换失败时恢复到网易云音乐
        PLAYLIST_CONFIG.server = 'netease';
        PLAYLIST_CONFIG.id = PLATFORM_CONFIG.netease.defaultPlaylist;
        // 更新按钮状态
        const buttons = document.querySelectorAll('.server-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'var(--surface)';
            btn.style.color = 'var(--text-secondary)';
            btn.style.borderColor = 'var(--border)';
            if (btn.textContent === '网易云') {
                btn.classList.add('active');
                btn.style.background = 'var(--primary)';
                btn.style.color = 'var(--surface)';
                btn.style.borderColor = 'var(--primary)';
            }
        });
        await loadPlaylist();
    }
}

// 添加用户交互检测
let hasUserInteraction = false;
document.addEventListener('click', () => {
    hasUserInteraction = true;
}, { once: true });

// 添加URL有效性检查函数
async function isValidAudioUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) return false;

        const contentType = response.headers.get('content-type');
        return contentType && (
            contentType.includes('audio') ||
            contentType.includes('application/octet-stream') ||
            contentType.includes('application/x-www-form-urlencoded')
        );
    } catch (error) {
        console.warn('URL检查失败:', error);
        return false;
    }
}

// 添加歌词显示/隐藏功能
let isLyricsVisible = false;

function toggleLyrics() {
    isLyricsVisible = !isLyricsVisible;
    const currentLyric = document.getElementById('currentLyric');
    const lyricsBtn = document.querySelector('.lyrics-btn');

    currentLyric.classList.toggle('show', isLyricsVisible);
    lyricsBtn.classList.toggle('active', isLyricsVisible);
}

// 更新实时时间显示

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.querySelector('.hours').textContent = hours;
    document.querySelector('.minutes').textContent = minutes;
    document.querySelector('.seconds').textContent = seconds;
}

// 每秒更新一次时间
setInterval(updateTime, 1000);
updateTime(); // 立即显示时间

// 启动播放器
initPlayer();

//一言获取
fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
        const hitokotoElement = document.getElementById('hitokoto');
        const fromElement = document.getElementById('from');

        hitokotoElement.href = 'https://hitokoto.cn/?uuid=' + data.uuid;
        hitokotoElement.innerText = data.hitokoto;

        fromElement.innerText = '—— ' + data.from;
    })
    .catch(error => {
        console.error('获取一言失败:', error);
        const hitokotoElement = document.getElementById('hitokoto');
        const fromElement = document.getElementById('from');

        hitokotoElement.innerText = '一言获取失败 ';
        fromElement.innerText = '请刷新页面重试';
    });