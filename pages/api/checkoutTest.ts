import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

type RedirectUrlsResponse = {
    cart_url: string;
    checkout_url: string;
    embedded_checkout_url: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const url = `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/carts/${req.body.cartId}/redirect_urls`;
    
        try {
            const resp = await axios.post<any, AxiosResponse<RedirectUrlsResponse>>(
                url,
                {},
                {
                    headers: {
                        'X-Auth-Client': process.env.BIGCOMMERCE_STORE_API_CLIENT_ID,
                        'X-Auth-Token': process.env.BIGCOMMERCE_STORE_API_TOKEN,
                    },
                },
            );
    
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};