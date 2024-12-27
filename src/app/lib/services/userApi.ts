import axios from 'axios';


// ユーザー情報を取得する関数
export const fetchPageData = async (pageId: string = ""): Promise<any> => {
    let endpoint: string = `${process.env.NEXT_PUBLIC_API_URL}`;
    try {
        // 外部APIエンドポイント
        if (pageId !== "") { endpoint = `${endpoint}/${pageId}` }
        else {
            endpoint = `${endpoint}?limit=100`;
        }
        // console.log(endpoint);
        // console.log(`endpoint ${process.env.NEXT_PUBLIC_API_URL} KEY ${process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY}`)
        const response = await axios.get(
            `${endpoint}`,
            {
                headers: {
                    'X-API-KEY': process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY
                }
            }
        );
        return response.data;
    } catch (error) {
        // エラーハンドリング
        console.error('APIリクエストに失敗しました:', error);
        throw new Error('データの取得に失敗しました');
    }
};
