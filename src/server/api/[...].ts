// import { createError, useBody, appendHeader } from 'h3';

// export default defineEventHandler(async (event) => {
//   const config = useRuntimeConfig();

//   if (!config.apiBaseUrl) {
//     throw new Error('Missing `runtimeConfig.apiBaseUrl` configuration.');
//   }

//   const { method, url, headers } = event.req;
//   const body = method !== 'GET' && method !== 'HEAD' ? await useBody(event) : undefined;

//   try {
//     const response = await $fetch.raw(url, {
//       method,
//       baseURL: config.apiBaseUrl,
//       headers: {
//         'content-type': 'application/json',
//         cookie: headers.cookie,
//       },
//       body,
//     });

//     for (const header of ['set-cookie', 'cache-control']) {
//       if (response.headers.has(header)) {
//         appendHeader(event, header, response.headers.get(header));
//       }
//     }

//     return response._data;
//   } catch (error) {
//     return createError({
//       statusCode: error.response.status,
//       statusMessage: error.message,
//       data: error.data,
//     });
//   }
// });