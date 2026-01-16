# Important Note

You need to add **.env** files to the defined location to get project up running

## DB Project

PATH: /packages/db

```js
DATABASE_URL =
  "postgresql://neondb_owner:npg_Z9tUoHfz3dPG@ep-hidden-field-ahuaz9sg-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
```

## Backend Project

PATH: /apps/backend

```js
# Node setup
APP_ENV=development
APP_PORT=4000

DEV_FRONTEND_URL="http://localhost:3000"
PROD_FRONTEND_URL=""

####################################################

DATABASE_URL="postgresql://neondb_owner:npg_Z9tUoHfz3dPG@ep-hidden-field-ahuaz9sg-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

####################################################

UPLOAD_PATH="http://localhost:4000/public/"

####################################################

# hash keys
HASH_SALT=10

####################################################

# Jwt secret key
JWT_SECRET_KEY_PUBLIC=qwersdfzxcv789456123
JWT_SECRET_KEY_PRIVATE=qwersdfzxcv789456125
JWT_ALGORITHM=HS256
JWT_EXPIRES_IN_PUBLIC=3d
JWT_EXPIRES_IN_PRIVATE=30d

###################################################

PUBLIC_UPLOAD_FOLDER="public"


###################################################

THROTTLER_TTL=60000
THROTTLER_LIMIT=10
THROTTLER_BLOCK_DURATION=300000

###################################################

REDIS_HOST="localhost"
REDIS_PORT="6379"
REDIS_URL="redis://default:vkIEVH0Idy5Y1XVGjdIWSjFXkWQb7Hm6@redis-15819.c311.eu-central-1-1.ec2.cloud.redislabs.com:15819"
```

## Frontend Project

PATH: /apps/frontend

```js
NEXT_PUBLIC_LOCAL_BACKEND_URL = "http://localhost:4000/api";
NEXT_PUBLIC_REMOTE_BACKEND_URL = "";

APP_ENV = "development";
```
