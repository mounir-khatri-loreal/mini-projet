from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from ..models.todo import TodoItem, TodoItemdb
from ..database import get_db

router_todo = APIRouter()
@router_todo.get("/todos/", response_model=List[TodoItem])
async def get_todo_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TodoItemdb))
    todos = result.scalars().all()
    return todos
@router_todo.post("/todos/", response_model=TodoItem)
async def create_todo_item(todo: TodoItem, db: AsyncSession = Depends(get_db)):
    todo_db = TodoItemdb(**todo.dict())
    db.add(todo_db)
    await db.commit()
    await db.refresh(todo_db)
    return todo_db

@router_todo.get("/todos/{todo_id}", response_model=TodoItem)
async def get_todo_item(todo_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TodoItemdb).where(TodoItemdb.id == todo_id))
    todo = result.scalar_one_or_none()
    if todo is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return todo

@router_todo.put("/todos/{todo_id}", response_model=TodoItem)
async def update_todo_item(todo_id: int, updated_todo: TodoItem, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TodoItemdb).where(TodoItemdb.id == todo_id))
    todo = result.scalar_one_or_none()
    if todo is None:
        raise HTTPException(status_code=404, detail="Item not found")

    todo.title = updated_todo.title
    todo.description = updated_todo.description
    todo.completed = updated_todo.completed
    todo.date = updated_todo.date

    await db.commit()
    await db.refresh(todo)
    return todo

@router_todo.delete("/todos/{todo_id}")
async def delete_todo_item(todo_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TodoItemdb).where(TodoItemdb.id == todo_id))
    todo = result.scalar_one_or_none()
    if todo is None:
        raise HTTPException(status_code=404, detail="Item not found")

    await db.delete(todo)
    await db.commit()
    return {"message": "Item deleted successfully"}