import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
// @WebSocketGateway(4002, {
//     namespace: 'events', // Định nghĩa namespace cho gateway
//     path: 'ws/chat', // Đường dẫn mà gateway sẽ lắng nghe
//     serveClient: true, // Quyết định xem thử client có được phục vụ từ server hay không
//     pingInterval: 10000, // Định nghĩa thời gian chờ của ping-pong. Ping mỗi 10s
//     pingTimeout: 5000, // Định nghĩa thời gian chờ của ping-pong. Timeout sau 5s
//     transports: ['websocket'], // Các phương tiện giao tiếp. đang sử dụng websocket
//     cors: {  // Cấu hình CORS cho dự án
//         origin: '*' // chấp nhận mọi port từ client kết nối đến server
//     }
// })
@WebSocketGateway(8080, {
    cors: {
        origin: '*'
    }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log(`User id ${client.id} connection!!!`)
        const handshake = client.handshake
        console.log("handshake: ", handshake)
        client.broadcast.emit('user-joined', {
            message: `New User joined the chat: ${client.id}`
        })
    }
    handleDisconnect(client: Socket) {
        console.log(`User id ${client.id} disconnection!!!`)
        this.server.emit('user-left', {
            message: `New User Left the chat: ${client.id}`
        })
    }
    @SubscribeMessage('newMessage')
    handleNewMessage(client: Socket, message: any, @ConnectedSocket() clientNest: Socket) {
        this.server.emit('reply', 'broadcasting....')
    }
}