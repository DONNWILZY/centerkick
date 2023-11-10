``
Primary url: https://centerkick.vercel.app/
``

# SIGN UP ROUTE
*ROUTE:* Method: POST /api/auth/register

Request
Method: POST
Endpoint: https://centerkick.vercel.app/api/auth/register
Headers: None

```
POST https://centerkick.vercel.app/api/auth/register
Content-Type: application/json

{
	"fullname": "effiong",
	"email": "godswill@gmail.com",
	"password": "********"
}

```
Response
Status Code: 200 OK on success
Content-Type: application/json

# SIGN IN ROUTE

*ROUTE:* Route: POST /api/auth/login

Request
Method: POST
Endpoint: https://centerkick.vercel.app/api/auth/login
Headers: None
```
POST https://centerkick.vercel.app/api/auth/login
Content-Type: application/json

{
	"email": "godswill@gmail.com",
	"password": "********"
}

```

# requestotp

*ROUTE:* Method: POST /api/auth/requestotp

Request
Method: POST
Endpoint: https://centerkick.vercel.app/api/auth/requestotp
Headers: None

```
POST https://centerkick.vercel.app/api/auth/requestotp
Content-Type: application/json

{
	
	"email": "godswill@gmail.com"

}

```


# verifyotp

*ROUTE:* Method: POST /api/auth/verifyotp

Request
Method: POST
Endpoint: https://centerkick.vercel.app/api/auth/verifyotp
Headers: None

```
POST https://centerkick.vercel.app/api/auth/verifyotp
Content-Type: application/json

{
	
	
  "userId": "64f7aab35803d3febaef01b9",
  "verificationCode": "896204" 


}

```

# changePassword


*ROUTE:* Method: PUT /api/auth/changePassword

Request
Method: PUT
Endpoint: https://centerkick.vercel.app/api/auth/changePassword
Headers: None

```
POST https://centerkick.vercel.app/api/auth/changePassword
Content-Type: application/json

{
	
    "currentPassword": "password123",
  "newPassword": "password1234"


}

```

# resetPasswordRequest


*ROUTE:* Method: PUT /api/auth/resetPasswordRequest

Request
Method: PUT
Endpoint: https://centerkick.vercel.app/api/auth/resetPasswordRequest
Headers: None

```
POST https://centerkick.vercel.app/api/auth/resetPasswordRequest
Content-Type: application/json

{
   "identifier": "godswilleffiongdev@gmail.cm"
}

```

# verifyPasswordOTP

# newPassword





# POST NEWS UPDATE
*ROUTE:* Method: PUT /api/news/createNews/:userId 


Request
Method: POST
Endpoint: https://centerkick.vercel.app/api/news/createNews/652d3cb74931e41941337093
Headers: Authorization - YES

```
{
  "title": "I MA TIRED",
  "content": "TINUBU has approved local league",
  "author": "John Doe",
  "publicationStatus": "approved",
  "featuredImage": "https://example.com/images/blog-feature.jpg",
  "tags": ["technology", "programming"],
  "summary": "A brief summary of the blog post.",
  "canonicalUrl": "https://example.com/blog/sample-post",
  "metaDescription": "Meta description for SEO",
  "isPopular": true,
  "isTrending": false,
  "featured": true,
  "images": [
    {
      "url": "https://example.com/images/image1.jpg",
      "caption": "Image 1"
    },
    {
      "url": "https://example.com/images/image2.jpg",
      "caption": "Image 2"
    }
  ]
}


```



