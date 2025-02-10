import Api, { Controller, Param, Post } from 'koa-api-plus';
import { OpenAIService } from '@/chat';
/**
 * 接口
 */
@Controller('/chat')
export class PostController {
    @Post('/v1')
    async v1(@Param.Body() content: { text: string;}): Promise<{ text: string; result: string }> {
        console.log('[translate] v1', content);
        return OpenAIService.chat(content);
    }
}

// 创建实例
// 访问node.js的端口
const api = new Api({ port: 3000 });

// 配置
OpenAIService.config('https://api.deepseek.com', 'sk-3960ec06576f4e32b262811a470f191c');

api.on('http', (...args) => {
    console.log('[http]', ...args);
});

api.on('log', (...args) => {
    console.log('[log]', ...args);
});
api.on('start', () => {
    console.log('[start]');
});

api.on('error', (e) => {
    console.error('[error]', e);
});

// 启动
api.start();
