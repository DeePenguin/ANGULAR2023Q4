export const videosMock = [
  {
    id: 'Ata9cSC2WpM',
    statistics: {
      viewCount: 640620,
      likeCount: 19746,
      commentCount: 537,
      favoriteCount: 0,
    },
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/Ata9cSC2WpM/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/Ata9cSC2WpM/mqdefault.jpg',
        width: 320,
        height: 180,
      },
    },
    title: 'Angular in 100 Seconds',
    channelTitle: 'Fireship',
    description: 'Angular is arguably the most advanced frontend JavaScript framework ever created.',
    publishedAt: '2020-09-09T17:54:21Z',
    tags: ['webDev'],
  },
  {
    id: 'fX5T2CGSwns',
    statistics: {
      viewCount: 85538,
      likeCount: 2641,
      commentCount: 297,
      favoriteCount: 0,
    },
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/fX5T2CGSwns/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/fX5T2CGSwns/mqdefault.jpg',
        width: 320,
        height: 180,
      },
    },
    title: 'This New Angular Release Is Wild',
    channelTitle: 'Theo',
    description: "Oh no, I'm talking about Angular again.",
    publishedAt: '2023-11-11T02:02:52Z',
    tags: ['web development', 'full stack'],
  },
]

export const paginationMock = {
  length: 1000,
  pageSize: 20,
  nextPageToken: 'token',
}

export const getVideosMock = {
  items: videosMock,
  pagination: paginationMock,
}

export const getVideoByIdMock = videosMock[0]

export const customVideosMock = [
  {
    id: 'video1',
    title: 'Pivo',
    description: 'knljnl',
    imageLink: 'link',
    videoLink: 'fdbvgs',
    publishedAt: '2023-11-20T13:52:28.096Z',
    tags: ['dgbgdsn'],
  },
  {
    id: 'video2',
    title: 'Sardelka',
    description: '',
    imageLink: 'link',
    videoLink: 'fbsff',
    publishedAt: '2023-11-20T13:54:06.051Z',
    tags: ['gdbdgn'],
  },
]
