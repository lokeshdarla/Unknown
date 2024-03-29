from fastapi import FastAPI
from .routers import user,auth,post
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "*"
]

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(post.router)


