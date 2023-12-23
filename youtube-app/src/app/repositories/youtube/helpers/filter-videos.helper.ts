import type { VideoItem } from '../models/video/video-item.model'

export const filterVideos = (videos: VideoItem[], query?: string): VideoItem[] => {
  return query ? videos.filter(({ title }) => title.toLowerCase().includes(query)) : videos
}
