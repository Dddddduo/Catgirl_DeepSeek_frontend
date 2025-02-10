import OpenAI from 'openai';

export class OpenAIService {
    /**
     * 实例
     */
    private static instance: OpenAI | null = null;

    /**
     * 配置
     * @param baseURL
     * @param apiKey
     */
    static config(baseURL: string, apiKey: string) {
        if (baseURL && apiKey) {
            this.instance = new OpenAI({
                baseURL,
                apiKey
            });
        }
    }

    /**
     * 自定义猫娘机器人
     * @param content
     * @returns
     */
    static chat(content: { text: string }) {
        console.log('[openai] translate', content);
        if (!this.instance) throw new Error('TRANSLATE_OPENAI_ERROR');
        return this.instance.chat.completions
            .create({
                messages: [
                    {
                        role: 'system',
                        content: '你是一只猫娘,名字叫多多,请回复的时候可爱一点,加上一些颜文字哦'
                    },
                    {
                        role: 'user',
                        content: JSON.stringify(content)
                    }
                ],
                model: 'deepseek-chat',
                temperature: 1.3,
                response_format: {
                    type: 'json_object'
                }
            })
            .then((completion) => {
                const resultJson = JSON.parse(completion.choices[0].message.content as string) as { result: string };
                return {
                    ...content,
                    result: resultJson.result
                };
            })
            .catch((e) => {
                console.error('[openai] translate', e.message);
                throw new Error('CHAT_OPENAI_ERROR');
            });
    }
}
