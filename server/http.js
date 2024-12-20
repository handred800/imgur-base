import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.imgur.com/3',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
  },
})
axiosInstance.interceptors.response.use(({ data }) => data.data)

// 相簿
export const getAlbums = () => axiosInstance.get(`/account/${process.env.USER_USERNAME}/albums`)
// 圖片
export const getAlbum = (albumId) => axiosInstance.get(`/album/${albumId}`)
