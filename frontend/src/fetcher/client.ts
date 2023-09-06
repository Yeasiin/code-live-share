import { baseUrl } from '$lib/utils/apiEndPoints';
import { Client } from '@hyper-fetch/core';

export const client = new Client({ url: baseUrl });

type RequestType = { fullName: string; email: string; message: string };
type ResponseType = { success: boolean; data: { message: string } };

export const sendContactMail = client.createRequest<ResponseType, RequestType>()({
	method: 'POST',
	endpoint: '/v1/util/contact'
});
