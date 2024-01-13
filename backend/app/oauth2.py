from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import status, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from . import database, models
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth')

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=settings.ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return token

def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("id")
        user_name = payload.get("username")
        user_email = payload.get("email")

        if user_id is None:
            raise credentials_exception

        token_data = {"id": user_id, "username": user_name, "email": user_email}
        return token_data
    except JWTError as e:
        raise credentials_exception

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token_data = verify_access_token(token, credentials_exception)
    user = db.query(models.User).filter(models.User.id == token_data["id"]).first()

    if user is None:
        raise credentials_exception

    return user
