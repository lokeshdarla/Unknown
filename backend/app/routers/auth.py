from fastapi import APIRouter,status, HTTPException,Depends
from ..import models, schemas, oauth2,utils
from sqlalchemy.orm import Session
from ..database import get_db
from ..import utils

router=APIRouter(
    tags=["Authentication"]
)

@router.post("/auth", response_model=schemas.Token)
def login(user_cred: schemas.UserLogin, db: Session = Depends(get_db)):
    
    users = db.query(models.User).all()
    
    found_user = None
    for user in users:
        if utils.verfiy(user_cred.email, user.email):
            found_user = user
            break

    if not found_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User Not Found")

    if not utils.verfiy(user_cred.password, found_user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")

    access_token_data = {"id": found_user.id, "username": found_user.username, "email": found_user.email}
    access_token = oauth2.create_access_token(data=access_token_data)

    return {"access_token": access_token, "token_type": "Bearer"}
