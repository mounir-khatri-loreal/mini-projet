from sqlalchemy import Boolean, Column, Integer, String
from backend.database import Base
from pydantic import BaseModel
from typing import Optional


class TodoItemdb(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    completed = Column(Boolean, default=False)
    date = Column(String, index=True)

class TodoItem(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    completed: bool
    date: str
