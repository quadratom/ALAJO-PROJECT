// src/services/socketService.ts
import { io } from 'socket.io-client'

const SOCKET_URL = 'http://147.93.40.101:3332' // Adjust if needed
export const socket = io(SOCKET_URL, { transports: ['websocket'] })
