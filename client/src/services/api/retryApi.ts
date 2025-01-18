// // Use this kind of retry for api calls in production

// import axios from "axios";
// export const makeRequestWithRetry = async (
//     requestFn: () => Promise<any>,
//     maxRetries: number = 3,
//     delayMs: number = 1000
//   ) => {
//     let lastError;
    
//     for (let attempt = 0; attempt < maxRetries; attempt++) {
//       try {
//         return await requestFn();
//       } catch (error) {
//         lastError = error;
        
//         if (axios.isAxiosError(error)) {
//           // Don't retry on client errors (4xx)
//           if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
//             throw error;
//           }
          
//           // Don't retry on CORS or network errors
//           if (!error.response) {
//             throw error;
//           }
          
//           console.log(`Attempt ${attempt + 1} failed. Retrying...`);
//           // Wait before retrying (exponential backoff)
//           await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, attempt)));
//           continue;
//         }
        
//         throw error;
//       }
//     }
    
//     throw lastError;
//   };

//   // Using the retry wrapper
// export const fetchData = async () => {
//     try {
//       const response = await makeRequestWithRetry(
//         () => axios.get('https://api.example.com/data'),
//         3,  // max retries
//         1000 // base delay in ms
//       );
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         switch (error.response?.status) {
//           case 400:
//             throw new Error('Invalid request');
//           case 401:
//             // Handle unauthorized
//             //await refreshToken();
//             break;
//           case 404:
//             throw new Error('Resource not found');
//           case 429:
//             // Handle rate limiting
//             throw new Error('Too many requests');
//           default:
//             throw new Error('An unexpected error occurred');
//         }
//       }
//       throw error;
//     }
//   };