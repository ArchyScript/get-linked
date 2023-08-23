import { useAuthApi } from './api/auth';
import { useDealsApi } from './api/deals';
import { useKYCApi } from './api/kyc';
import { useCommonApi } from './api/common';

export { useAuthApi, useDealsApi, useKYCApi, useCommonApi };

/*
{
    "status": true,
    "data": {
        "profile": {
            "_id": "64d26799da57dd0b4507b374",
            "userRole": "Financier",
            "userType": "Non",
            "companyLogo": null,
            "status": true,
            "isKYC": false,
            "email": "script@mailinator.com",
            "ipaddress": "::1",
            "meta": {
                "payback_days": "60",
                "interest_rate": 0.05
            },
            "lastLogin": "2023-08-08T23:37:45.853Z",
            "createdAt": "2023-08-08T16:04:41.622Z",
            "updatedAt": "2023-08-09T00:18:54.162Z",
            "__v": 0,
            "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNjcmlwdEBtYWlsaW5hdG9yLmNvbSIsImlkIjoiNjRkMjY3OTlkYTU3ZGQwYjQ1MDdiMzc0IiwidHlwZSI6IkZpbmFuY2llciIsImlhdCI6MTY5MTU0MDMzNCwiZXhwIjoxNjkxNTgzNTM0fQ.THpArDITeEJJNjmmd46JQzu3LiPoamkcnwyhXcHLrv0",
            "two_factor": {},
            "userId": "64d26799da57dd0b4507b374"
        },
        "kyc": {},
        "pendingChats": [],
        "pendingContracts": [],
        "bank_accounts": [],
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNjcmlwdEBtYWlsaW5hdG9yLmNvbSIsImlkIjoiNjRkMjY3OTlkYTU3ZGQwYjQ1MDdiMzc0IiwidHlwZSI6IkZpbmFuY2llciIsImlhdCI6MTY5MTU0MDMzNCwiZXhwIjoxNjkxNTgzNTM0fQ.THpArDITeEJJNjmmd46JQzu3LiPoamkcnwyhXcHLrv0"
    },
    "code": "VT200"
} */
