from pydantic import BaseModel,conint
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username:str
    password:str

class UserCreate(BaseModel):
    email:str
    username:str
    password:str
    image_id: Optional[int]

class UserUpdate(BaseModel):
    username:str
    password:str
    imageURL:str
    
class UserImageUpdate(BaseModel):
    imageURL:str

class UserOut(BaseModel):
    id: int
    username: str
    created_at: datetime
    imageURL :str


class UserLogin(BaseModel):
    email:str
    password:str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
     username: str

class postBase(BaseModel):
    content: str
    published: bool = True


class PostCreate(postBase):
    content: str
    published: bool = True
    image_id: Optional [int]
    
class PostCreateOut(postBase):
    content: str
    published: bool = True
    owner_id:int
  
class postImageOut(BaseModel):
    image_id:int
    image:bytes
    

class PostUpdate(postBase):
    title: str
    content: str
    published: bool = True

class PostOut(BaseModel):
    id: int
    content: str
    created_at: datetime # Adjust the type based on your specific requirements
    username: str
    userProfile:str
    image: Optional[postImageOut]  # Make the image attribute optional
    votes: int

class PostView(BaseModel):
    Post:PostOut
    votes:int
    
    
class Vote(BaseModel):
    post_id:int
    dir:conint(le=1)

   
