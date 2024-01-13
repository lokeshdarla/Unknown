"""Updated post relation

Revision ID: 8d9b1afcd086
Revises: a25a4804d7ea
Create Date: 2024-01-13 11:50:18.389608

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8d9b1afcd086'
down_revision: Union[str, None] = 'a25a4804d7ea'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'posts', 'post_images', ['image_id'], ['image_id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'posts', type_='foreignkey')
    # ### end Alembic commands ###
