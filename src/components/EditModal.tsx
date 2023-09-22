import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Todo } from "../types/Todo";
import ReactModal from 'react-modal';

interface EditTodoProps {
    isEdit: boolean;
    onClose: () => void;
    todo: Todo | null;
    onSave: (editedTodo: Todo) => void;
}


export const EditModal: React.FC<EditTodoProps> = 
    ({ isEdit, onClose, todo, onSave}) => {
    //TODO型をつける
    const [editedTodo, setEditedTodo] = useState<any>(todo)
    
    //Prppsのtodoが変わったらeditedTodoを更新 
    useEffect (() => {
        setEditedTodo(todo);
    },[todo])

    const handleSave = () => {
       if (editedTodo) {
            onSave(editedTodo);
        }
    };


    return (
        <ReactModal isOpen={isEdit} onRequestClose={onClose}>
            <h2>Todoの編集</h2>
            {editedTodo && (
                <>
                    <input
                        type="text"
                        value={editedTodo.title}
                        onChange={(e) => 
                            setEditedTodo({ ...editedTodo, title: e.target.value })
                        }
                    />
                    <select
                        value={editedTodo.status}
                        onChange={(e) => 
                            setEditedTodo({ ...editedTodo, status: e.target.value})
                        }
                    >
                        <option value='未着手'>未着手</option>
                        <option value='作業中'>作業中</option>
                        <option value='完了'>完了</option>
                    </select>
                    <button onClick={handleSave}>保存</button>
                    <button onClick={onClose}>キャンセル</button>
                </>
            )}
        </ReactModal>
    );
};