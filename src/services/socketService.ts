// src/services/socketService.ts
import { io } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3000' // Adjust if needed
export const socket = io(SOCKET_URL, { transports: ['websocket'] })
