from fastapi import Body, HTTPException, status, Depends, APIRouter, UploadFile, File
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, oauth2
from typing import List,Optional
from sqlalchemy import func
import base64
from sqlalchemy.orm import aliased


router = APIRouter(
    prefix="/posts",
    tags=["posts"]
)


from fastapi import HTTPException, UploadFile

@router.post("/uploadImage", status_code=status.HTTP_201_CREATED)
async def upload_image(image: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        contents = await image.read()
        
        db_image = models.PostImage(image=contents)
        db.add(db_image)
        db.commit()
        db.refresh(db_image)

        return {"image_id": db_image.image_id}
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


def post_out(post: models.Post, image: models.PostImage, user: models.User, votes: int) -> schemas.PostOut:
    if image:
        image_data = schemas.postImageOut(image_id=image.image_id, image=base64.b64encode(image.image).decode('utf-8'))
    else:
        image_data = None

    return schemas.PostOut(
        id=post.id,
        content=post.content,
        created_at=post.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        username=user.username,
        image=image_data,
        votes=votes
    )


from sqlalchemy.orm import aliased

@router.get('/', response_model=List[schemas.PostOut])
def get_posts(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search: Optional[str] = ""):

    image_alias = aliased(models.PostImage)

    posts = (
        db.query(models.Post, models.User, image_alias, func.count(models.Vote.post_id).label("votes"))
        .join(models.User, models.User.id == models.Post.owner_id)
        .outerjoin(models.Vote, models.Vote.post_id == models.Post.id)
        .outerjoin(image_alias, models.Post.image_id == image_alias.image_id)
        .group_by(models.Post.id, models.User.id, image_alias.image_id)
        .order_by(models.Post.created_at.desc())
        .limit(limit)
        .offset(skip)
        .all()
    )

    print(posts)

    result = [
        post_out(post, image, user, votes)
        for post, user, image, votes in posts
    ]

    return result


@router.get('/myposts', response_model=List[schemas.PostOut])
def get_my_posts(db: Session = Depends(get_db),current_user:dict=Depends(oauth2.get_current_user)):
    posts = db.query(models.Post).filter(models.Post.owner_id==current_user.id).all()
    return posts

@router.get('/images', response_model=List[schemas.postImageOut])
def get_images(db: Session = Depends(get_db)):
    images = db.query(models.PostImage).all()

    data = []

    for image in images:
        image_data = schemas.postImageOut(
            image_id=image.image_id,
            image=base64.b64encode(image.image).decode('utf-8')
        )
        data.append(image_data)

    return data

@router.get('/{id}', response_model=schemas.PostView)
def get_post(id: int, db: Session = Depends(get_db),current_user:dict=Depends(oauth2.get_current_user)):
    post=db.query(models.Post,func.count(models.Vote.post_id).label("votes")).join(models.Vote,models.Vote.post_id==models.Post.id,isouter=True).group_by(models.Post.id).filter(models.Post.id == id).first()
    if post:
        return post
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

@router.post('/', response_model=schemas.PostCreateOut, status_code=status.HTTP_201_CREATED)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), current_user:dict  = Depends(oauth2.get_current_user)):
    new_post = models.Post(**post.dict())
    new_post.owner_id=current_user.id
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db),current_user:dict = Depends(oauth2.get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == id)
    post_=post.first()
    if post_.owner_name!=current_user.username:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Not authorized to do this operation")
    if post.first():
        post.delete(synchronize_session=False)
        db.commit()
        return {"detail": "Post deleted"}

    raise HTTPException(status_code=404, detail="No post with the given id")

@router.put("/{id}", response_model=schemas.PostOut)
def update_post(id: int, new_post: schemas.PostUpdate, db: Session = Depends(get_db),current_user:dict  = Depends(oauth2.get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if post.owner_name!=current_user.username:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Not authorized to do this operation")
    if post:
        for field, value in new_post.dict().items():
            setattr(post, field, value)
        db.commit()
        db.refresh(post)
        return post
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No post with the given id")
