import { Box, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
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
    const [editedTodo, setEditedTodo] = useState<any>(todo)

    const handleSave = () => {
       if (editedTodo) {
            onSave(editedTodo);
            onClose();
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
                        onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                    />
                    {/* 他のTodoプロパティも編集フォームに追加 */}
                    <button onClick={handleSave}>保存</button>
                    <button onClick={onClose}>キャンセル</button>
                </>
            )}
        </ReactModal>
    );
};