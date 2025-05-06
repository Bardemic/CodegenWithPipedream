import axios from 'axios';

const baseURL = 'https://api.pipedream.com/v1'

export const getApps = async () => {
    try {
        const response = await axios.get('https://api.pipedream.com/v1/apps', {
            headers: {
                'Authorization': 'Bearer 6961e76d04b9aa07eb5e76bff01f5b1d'
            }
        })
        console.log('response: ', response.data);
        return response.data;
    } catch (e) {
        console.log('error,', e);
        return "";
    }
}

interface searchAppResponse {
    id: string;
    name_slug: string;
    name: string;
    auth_type: string;
    description: string;
    img_src: string;
    featured_weight: number;
    custom_fields_json: string;
    categories: string[];
}

export const searchApp = async (appName: string): Promise<searchAppResponse[] | null> => {
    try {
        const response = await axios.get('https://api.pipedream.com/v1/apps', {
            params: {
              q: appName
            },
            headers: {
                'Authorization': `Bearer ${process.env.PIPEDREAM_API_KEY}`,
            }
        })
        console.log('res: ', response.data.data);
        return response.data.data;
    } catch (e) {
        console.log('error,', e);
        return null;
    }
}

export const getAppData = async (appId: string) => {
    try {
        const response = await axios.get(`${baseURL}/apps/${appId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.PIPEDREAM_API_KEY}`,
            }
        })
        //console.log('res: ', response.data);
        return response.data;
    } catch (e) {
        console.log('error,', e);
        return "";
    }
}

export const getAppComponents = async (appNameSlug: string, query: string) => {
    try {
        const response = await axios.get(`${baseURL}/components/search`, {
            params: {
                'query': query,
                'app': appNameSlug
            },
            headers: {
                'Authorization': `Bearer ${process.env.PIPEDREAM_API_KEY}`,
            }
        })
        console.log('res: ', response.data);
        return response.data;
    } catch (e) {
        console.log('error,', e);
        return "";
    }
}