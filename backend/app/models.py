from sqlalchemy import Column, String, Boolean, Integer, TIMESTAMP, text, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from .database import Base

class ProfileImage(Base):
    __tablename__ = "profile_images"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    image = Column(LargeBinary)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False, unique=True)
    password = Column(String)
    image_id = Column(Integer, unique=True)  # Assuming this links to a ProfileImage
    created_at = Column(TIMESTAMP, nullable=False, server_default=text('now()'))
    
class PostImage(Base):
    __tablename__ = 'post_images'

    image_id = Column(Integer, primary_key=True, autoincrement=True)
    image = Column(LargeBinary)

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    content = Column(String, nullable=False)
    image_id = Column(Integer,ForeignKey('post_images.image_id'))
    published = Column(Boolean, server_default='True', nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    owner = relationship("User")

class Vote(Base):
    __tablename__ = "votes"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
